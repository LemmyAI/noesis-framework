#!/usr/bin/env node
/**
 * NOESIS Seed Factory — Build
 *
 * Transforms narrative YAML files into validated .js seed files.
 * The .js files are build artifacts — YAML is the source of truth.
 *
 * Usage:
 *   node scripts/build.js narratives/battle-of-harrisburg.yaml
 *   node scripts/build.js narratives/*.yaml
 *   node scripts/build.js --all
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const FACTORY_ROOT = path.resolve(__dirname, '..');
const NARRATIVES_DIR = path.join(FACTORY_ROOT, 'narratives');
const OUTPUT_DIR = path.resolve(FACTORY_ROOT, '..', 'api', 'scripts', 'seeds');

// ============================================================
// SQL ESCAPING — the whole reason this factory exists
// ============================================================

/** Fields that are NOT stored in metadata JSONB */
const ENTITY_RESERVED = new Set([
  'id', 'type', 'name', 'key', 'namespace',
  'temporal', 'confidence', 'sources_count', 'confidence_note',
]);

/** Decode common HTML entities from RSS data */
function decodeHtml(str) {
  if (!str) return str;
  return String(str)
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—')
    .replace(/&#160;/g, ' ').replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'").replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"').replace(/&ldquo;/g, '"')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"');
}

/** Strip chars that break SQL strings or JS template literals */
function sanitize(str) {
  if (typeof str !== 'string') return str;
  return decodeHtml(str)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')  // control chars
    .replace(/`/g, "'")                                // backticks → safe
    .replace(/\$\{/g, '(');                            // template injection → safe
}

/** Escape a value for SQL single-quoted string */
function escSql(val) {
  if (val === null || val === undefined) return 'NULL';
  return "'" + sanitize(String(val)).replace(/'/g, "''") + "'";
}

/** Deep-clean an object and produce escaped JSONB literal */
function escJsonb(obj) {
  function clean(o) {
    if (typeof o === 'string') return sanitize(o);
    if (Array.isArray(o)) return o.map(clean);
    if (o && typeof o === 'object') {
      const out = {};
      for (const [k, v] of Object.entries(o)) out[k] = clean(v);
      return out;
    }
    return o;
  }
  const cleaned = clean(obj);
  const json = JSON.stringify(cleaned);
  // Double-escape backslashes for PostgreSQL: \" → \\"
  // Without this, PostgreSQL's JSON parser sees unescaped quotes
  const pgSafe = json.replace(/\\/g, '\\\\');
  return "'" + pgSafe.replace(/'/g, "''") + "'::jsonb";
}

// ============================================================
// NORMALIZATION — YAML convenience → DB format
// ============================================================

/** Normalize a date/timestamp string to full ISO */
function normalizeTimestamp(s) {
  if (!s) return undefined;
  s = String(s);
  if (/^\d{4}$/.test(s)) return `${s}-01-01T00:00:00Z`;
  if (/^\d{4}-\d{2}$/.test(s)) return `${s}-01T00:00:00Z`;
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return `${s}T00:00:00Z`;
  if (!s.endsWith('Z') && !s.includes('+') && !s.includes('-', 10)) return s + 'Z';
  return s;
}

/** Infer precision from a date string */
function inferPrecision(s) {
  if (!s) return 'day';
  s = String(s);
  if (/^\d{4}$/.test(s)) return 'year';
  if (/^\d{4}-\d{2}$/.test(s)) return 'month';
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return 'day';
  if (/T\d{2}:\d{2}:\d{2}/.test(s)) return 'second';
  if (/T\d{2}:\d{2}/.test(s)) return 'minute';
  if (/T\d{2}/.test(s)) return 'hour';
  return 'day';
}

/** Normalize temporal field (string or object → DB JSONB) */
function normalizeTemporal(t) {
  if (!t) return { precision: 'day' };
  if (typeof t === 'string') {
    return {
      timestamp: normalizeTimestamp(t),
      precision: inferPrecision(t),
    };
  }
  const result = {};
  if (t.start) result.timestamp = normalizeTimestamp(t.start);
  if (t.end) result.end_timestamp = normalizeTimestamp(t.end);
  result.precision = t.precision || inferPrecision(t.start);
  return result;
}

/** Build credibility JSONB from entity fields */
function buildCredibility(entity) {
  const cred = {};
  cred.confidence = entity.confidence || 'medium';
  if (entity.sources_count != null) cred.sources_count = entity.sources_count;
  if (entity.confidence_note) cred.note = entity.confidence_note;
  return cred;
}

/** Build metadata JSONB from all non-reserved entity fields */
function buildMetadata(entity) {
  const meta = {};
  for (const [k, v] of Object.entries(entity)) {
    if (!ENTITY_RESERVED.has(k)) {
      meta[k] = v;
    }
  }
  return meta;
}

/** Build namespace config JSONB from added_types shorthand */
function buildNamespaceConfig(ns) {
  if (!ns.added_types || Object.keys(ns.added_types).length === 0) {
    return {};
  }
  const config = {
    added_types: Object.keys(ns.added_types),
    type_hierarchy: {},
    colors: { types: {} },
  };
  for (const [typeName, def] of Object.entries(ns.added_types)) {
    if (def.parent) config.type_hierarchy[typeName] = { parent: def.parent };
    if (def.color) config.colors.types[typeName] = def.color;
  }
  return config;
}

// ============================================================
// CODE GENERATION — YAML data → .js seed file
// ============================================================

function generateSeedFile(data) {
  const { seed, namespace_chain, entities, relations, narratives, sources } = data;
  const name = seed.name;
  const ns = seed.namespace;
  const funcName = name.replace(/-/g, '_');

  // Merge all relations: structural + narrative steps
  const allRelations = [];

  if (relations) {
    for (const r of relations) {
      allRelations.push({
        from_entity: r.from,
        to_entity: r.to,
        type: r.type,
        narrative_sequence: 0,
        context: null,
        metadata: r.description ? { description: r.description } : {},
      });
    }
  }

  if (narratives) {
    for (const narr of narratives) {
      for (let i = 0; i < narr.steps.length; i++) {
        const step = narr.steps[i];
        allRelations.push({
          from_entity: step.from,
          to_entity: step.to,
          type: step.type,
          narrative_sequence: i + 1,
          context: narr.name,
          metadata: step.description ? { description: step.description } : {},
        });
      }
    }
  }

  const entityCount = (entities || []).length;
  const relationCount = allRelations.length;
  const sourceCount = (sources || []).length;
  const narrativeNames = (narratives || []).map(n => n.name);

  // --- Build the output string ---
  let out = '';

  // Header comment
  out += `/**\n`;
  out += ` * NOESIS Seed: ${seed.label || name}\n`;
  out += ` * Namespace: ${ns}\n`;
  out += ` * Built by seed-factory on ${new Date().toISOString().split('T')[0]}\n`;
  if (seed.description) out += ` * ${seed.description}\n`;
  out += ` * Entities: ${entityCount} | Relations: ${relationCount} | Sources: ${sourceCount}\n`;
  if (narrativeNames.length > 0) out += ` * Narratives: ${narrativeNames.join(', ')}\n`;
  out += ` */\n`;
  out += `module.exports = async function seed_${funcName}(client) {\n`;
  out += `  console.log('  \\u2192 Seeding: ${name}');\n\n`;

  // --- Namespace chain ---
  if (namespace_chain && namespace_chain.length > 0) {
    out += `  // === NAMESPACE ===\n`;
    for (const nsConf of namespace_chain) {
      const config = buildNamespaceConfig(nsConf);
      const configStr = Object.keys(config).length > 0
        ? escJsonb(config)
        : "'{}'::jsonb";
      out += `  await client.query(\`\n`;
      out += `    INSERT INTO namespace_configs (namespace, extends, config) VALUES\n`;
      out += `    (${escSql(nsConf.namespace)}, ${escSql(nsConf.extends)}, ${configStr})\n`;
      out += `    ON CONFLICT (namespace) DO NOTHING\n`;
      out += `  \`);\n`;
    }
    out += `\n`;
  }

  // --- Entities ---
  if (entities && entities.length > 0) {
    out += `  // === ENTITIES ===\n`;
    out += `  await client.query(\`\n`;
    out += `    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES\n`;

    const rows = entities.map(e => {
      const metadata = buildMetadata(e);
      const temporal = normalizeTemporal(e.temporal);
      const credibility = buildCredibility(e);
      const entityNs = e.namespace || ns;

      return `    (${escSql(e.id)}, ${escSql(entityNs)}, ${escSql(e.type)}, ${escSql(e.name)}, ${e.key ? escSql(e.key) : 'NULL'}, ${escJsonb(metadata)}, ${escJsonb(temporal)}, ${escJsonb(credibility)})`;
    });

    out += rows.join(',\n') + '\n';
    out += `    ON CONFLICT (id, version_number) DO NOTHING\n`;
    out += `  \`);\n`;
    out += `  console.log('    Entities: ${entityCount}');\n\n`;
  }

  // --- Relations ---
  if (allRelations.length > 0) {
    out += `  // === RELATIONS ===\n`;
    out += `  await client.query(\`\n`;
    out += `    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES\n`;

    const rows = allRelations.map(r => {
      return `    (${escSql(r.from_entity)}, ${escSql(r.to_entity)}, ${escSql(r.type)}, ${r.narrative_sequence}, ${r.context ? escSql(r.context) : 'NULL'}, ${escJsonb(r.metadata)})`;
    });

    out += rows.join(',\n') + '\n';
    out += `    ON CONFLICT DO NOTHING\n`;
    out += `  \`);\n`;
    out += `  console.log('    Relations: ${relationCount}');\n\n`;
  }

  // --- Datalayer ---
  if (sources && sources.length > 0) {
    out += `  // === DATALAYER ===\n`;
    out += `  await client.query(\`\n`;
    out += `    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES\n`;

    const rows = sources.map(s => {
      const pubAt = s.published ? normalizeTimestamp(s.published) : null;
      return `    (${escSql(s.entity)}, ${escSql(s.type)}, ${s.title ? escSql(s.title) : 'NULL'}, ${s.url ? escSql(s.url) : 'NULL'}, ${s.excerpt ? escSql(s.excerpt) : 'NULL'}, ${s.source_name ? escSql(s.source_name) : 'NULL'}, ${pubAt ? escSql(pubAt) : 'NULL'})`;
    });

    out += rows.join(',\n') + '\n';
    out += `    ON CONFLICT DO NOTHING\n`;
    out += `  \`);\n`;
    out += `  console.log('    Sources: ${sourceCount}');\n\n`;
  }

  // Footer
  out += `  console.log('  \\u2713 ${name}: ${entityCount} entities, ${relationCount} relations, ${sourceCount} sources');\n`;
  out += `};\n`;

  return out;
}

// ============================================================
// MAIN
// ============================================================

function main() {
  const args = process.argv.slice(2);
  let files = [];

  if (args.includes('--all') || args.length === 0) {
    // Build all YAML files in narratives/
    if (!fs.existsSync(NARRATIVES_DIR)) {
      console.error(`Narratives directory not found: ${NARRATIVES_DIR}`);
      process.exit(1);
    }
    files = fs.readdirSync(NARRATIVES_DIR)
      .filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))
      .map(f => path.join(NARRATIVES_DIR, f));
  } else {
    files = args.filter(a => !a.startsWith('--'));
  }

  if (files.length === 0) {
    console.error('No YAML files found to build.');
    console.error('Usage: node scripts/build.js narratives/my-seed.yaml');
    console.error('       node scripts/build.js --all');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let success = 0;
  let failed = 0;

  for (const file of files) {
    const basename = path.basename(file, path.extname(file));
    try {
      console.log(`Building: ${basename}`);

      const raw = fs.readFileSync(file, 'utf8');
      const data = yaml.load(raw);

      if (!data || !data.seed || !data.seed.name) {
        throw new Error('Missing required field: seed.name');
      }
      if (!data.entities || data.entities.length === 0) {
        throw new Error('No entities defined');
      }

      // Quick validation
      const entityIds = new Set();
      for (const e of data.entities) {
        if (!e.id) throw new Error(`Entity missing id: ${JSON.stringify(e).slice(0, 80)}`);
        if (!e.type) throw new Error(`Entity "${e.id}" missing type`);
        if (!e.name) throw new Error(`Entity "${e.id}" missing name`);
        if (!e.category) throw new Error(`Entity "${e.id}" missing category`);
        if (entityIds.has(e.id)) throw new Error(`Duplicate entity id: ${e.id}`);
        entityIds.add(e.id);
      }

      // Check relation referential integrity
      const checkRef = (from, to, ctx) => {
        if (!entityIds.has(from)) throw new Error(`${ctx}: from_entity "${from}" not found in entities`);
        if (!entityIds.has(to)) throw new Error(`${ctx}: to_entity "${to}" not found in entities`);
      };

      if (data.relations) {
        for (const r of data.relations) {
          checkRef(r.from, r.to, `Relation ${r.from}→${r.to}`);
        }
      }
      if (data.narratives) {
        for (const n of data.narratives) {
          for (const step of n.steps) {
            checkRef(step.from, step.to, `Narrative "${n.name}" step ${step.from}→${step.to}`);
          }
        }
      }
      if (data.sources) {
        for (const s of data.sources) {
          if (!entityIds.has(s.entity)) {
            throw new Error(`Source references unknown entity: "${s.entity}"`);
          }
        }
      }

      // Generate
      const output = generateSeedFile(data);
      const outPath = path.join(OUTPUT_DIR, `${data.seed.name}.js`);
      fs.writeFileSync(outPath, output);
      console.log(`  ✓ → ${path.relative(FACTORY_ROOT, outPath)} (${data.entities.length} entities, ${(data.relations || []).length + (data.narratives || []).reduce((a, n) => a + n.steps.length, 0)} relations)`);
      success++;

    } catch (err) {
      console.error(`  ✗ ${basename}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${success} built, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main();
