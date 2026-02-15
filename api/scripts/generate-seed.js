#!/usr/bin/env node
/**
 * NOESIS Seed Generator
 * 
 * Takes gathered news JSON and produces a seed JS file for init-db.
 * Automatically groups stories into narratives by category/topic clustering.
 * 
 * Usage:
 *   node generate-seed.js --input data.json --name news-week7 --ns news.week7
 */

const fs = require('fs');
const path = require('path');

// ======= NARRATIVE CLUSTERING =======
// Keywords → narrative context mapping
const NARRATIVE_RULES = [
  // Order matters — more specific rules first to avoid false positives
  { keywords: ['bitcoin', 'btc', 'crypto', 'coinbase', 'defi', 'ethereum', 'stablecoin', 'musk\'s x to launch crypto'], context: 'Crypto Markets', category: 'finance.crypto' },
  { keywords: ['gold price', 'gold reclaim', 'gold rally', 'gold surge', 'silver rally', 'precious metal', 'commodities', 'kitco', 'gold/oz', 'gold at $', 'gold settl', 'silver settl', '/oz'], context: 'Precious Metals Rally', category: 'finance' },
  { keywords: ['ukraine', 'zelenskyy', 'zelensky', 'kyiv', 'kremlin', 'munich security'], context: 'Ukraine Peace Process', category: 'geopolitics' },
  { keywords: ['iran', 'nuclear deal', 'tehran', 'netanyahu', 'iranian oil'], context: 'Iran Tensions', category: 'geopolitics' },
  { keywords: ['gaza', 'israeli strike', 'palestinian', 'hamas', 'west bank'], context: 'Israel-Palestine Conflict', category: 'geopolitics' },
  { keywords: ['sudan', 'rsf', 'el-fasher', 'darfur', 'khartoum', 'rapid support forces'], context: 'Sudan Crisis', category: 'geopolitics' },
  { keywords: ['navalny', 'dart frog toxin'], context: 'Russia & Opposition', category: 'geopolitics' },
  { keywords: ['deportee', 'deportation', 'ice agent', 'ice shooting', 'alien enemies act', 'immigration raid'], context: 'US Immigration Policy', category: 'geopolitics' },
  { keywords: ['openai', 'gpt-4', 'gpt-5', 'xai safety', 'sycophancy', 'seedance', 'ai video generat', 'ai features', 'ai customer support', 'ai model', 'talent walking away', 'ai race', 'computer science exodus'], context: 'AI Race', category: 'technology.ai' },
  { keywords: ['olympic', 'winter games', 'curling', 'skeleton', 'giant slalom', 'milan-cortina', 'bobsleigh'], context: 'Winter Olympics 2026', category: 'sports' },
  { keywords: ['climate', 'carbon', 'emissions', 'renewable', 'energy transition'], context: 'Climate & Energy', category: 'finance' },
];

function assignNarrative(story) {
  const text = ` ${story.name} ${story.description} `.toLowerCase();
  for (const rule of NARRATIVE_RULES) {
    if (rule.keywords.some(kw => {
      // For short keywords (<=4 chars), require word boundaries
      if (kw.length <= 4) {
        const re = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return re.test(text);
      }
      return text.includes(kw);
    })) {
      return rule.context;
    }
  }
  return null; // Standalone, no narrative
}

// ======= RELATION INFERENCE =======
function inferRelations(stories) {
  const relations = [];
  const narrativeGroups = {};

  // Group stories by narrative
  for (const s of stories) {
    if (s._narrative) {
      if (!narrativeGroups[s._narrative]) narrativeGroups[s._narrative] = [];
      narrativeGroups[s._narrative].push(s);
    }
  }

  // Within each narrative, create sequential relations
  for (const [context, group] of Object.entries(narrativeGroups)) {
    // Sort by date
    group.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    for (let i = 0; i < group.length - 1; i++) {
      const from = group[i];
      const to = group[i + 1];

      // Determine relation type based on entity types
      let relType = 'follows';
      if (from.type === 'Decision' || from.type === 'Event') {
        if (to.type === 'Event') relType = 'causes';
        if (to.type === 'Claim') relType = 'supports';
      }
      if (from.type === 'Claim' && to.type === 'Decision') relType = 'enables';

      relations.push({
        from_entity: from.id,
        to_entity: to.id,
        type: relType,
        context,
        narrative_sequence: i + 1,
        metadata: {},
      });
    }
  }

  return relations;
}

// ======= SQL ESCAPING =======
function esc(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function escJson(obj) {
  // Clean strings: remove chars that break SQL/JSON nesting
  function clean(o) {
    if (typeof o === 'string') {
      return o
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '') // control chars
        .replace(/\\/g, '')       // remove backslashes (avoid escaping hell)
        .replace(/"/g, "");        // strip double quotes (they conflict with JSON structure)
    }
    if (Array.isArray(o)) return o.map(clean);
    if (o && typeof o === 'object') {
      const out = {};
      for (const [k, v] of Object.entries(o)) out[k] = clean(v);
      return out;
    }
    return o;
  }
  const cleaned = clean(obj);
  // JSON.stringify produces valid JSON; then escape single quotes for SQL string
  const jsonStr = JSON.stringify(cleaned).replace(/'/g, "''");
  return "'" + jsonStr + "'::jsonb";
}

// ======= SEED FILE GENERATION =======
function generateSeed(stories, relations, options) {
  const { name, ns, label } = options;
  const dateRange = `${stories[0]?.date || 'unknown'} to ${stories[stories.length - 1]?.date || 'unknown'}`;

  // Count narratives
  const narratives = [...new Set(stories.map(s => s._narrative).filter(Boolean))];

  let out = `/**
 * NOESIS Seed: ${label || name}
 * 
 * Auto-generated by generate-seed.js on ${new Date().toISOString().split('T')[0]}
 * Source: gather-news.js → RSS feeds (BBC, Guardian, Al Jazeera, CoinDesk, TechCrunch, Google News)
 * Period: ${dateRange}
 * Stories: ${stories.length} | Relations: ${relations.length} | Narratives: ${narratives.length}
 * 
 * To regenerate:
 *   node scripts/gather-news.js --limit 8 --out /tmp/raw.json
 *   node scripts/generate-seed.js --input /tmp/raw.json --name ${name} --ns ${ns}
 */

module.exports = async function seed_${name.replace(/-/g, '_')}(client) {
  console.log('  → Seeding: ${name}');

  // === NAMESPACE ===
  await client.query(\`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('${ns}', 'news', '{}'::jsonb)
    ON CONFLICT (namespace) DO UPDATE SET config = EXCLUDED.config
  \`);

  // === ENTITIES ===
  await client.query(\`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
`;

  // Entity rows
  const entityRows = stories.map(s => {
    const meta = {
      description: s.description.slice(0, 300),
      category: s.category,
    };
    const temporal = {
      timestamp: s.timestamp,
      precision: 'day',
    };
    const cred = {
      confidence: s.confidence,
      sources_count: 1,
    };

    return `    (${esc(s.id)}, ${esc(ns)}, ${esc(s.type)}, ${esc(s.name)}, ${s.key ? esc(s.key) : 'NULL'}, ${escJson(meta)}, ${escJson(temporal)}, ${escJson(cred)})`;
  });

  out += entityRows.join(',\n');
  out += `
    ON CONFLICT (id, version_number) DO NOTHING
  \`);
  console.log('    Entities: ${stories.length}');

`;

  // === RELATIONS ===
  if (relations.length > 0) {
    out += `  // === RELATIONS ===
  await client.query(\`
    INSERT INTO relations (from_entity, to_entity, type, context, narrative_sequence, metadata) VALUES
`;

    const relRows = relations.map(r => {
      return `    (${esc(r.from_entity)}, ${esc(r.to_entity)}, ${esc(r.type)}, ${r.context ? esc(r.context) : 'NULL'}, ${r.narrative_sequence || 'NULL'}, ${escJson(r.metadata)})`;
    });

    out += relRows.join(',\n');
    out += `
    ON CONFLICT DO NOTHING
  \`);
  console.log('    Relations: ${relations.length} (${narratives.length} narratives)');

`;
  }

  // === DATALAYER ===
  out += `  // === DATALAYER ===
  await client.query(\`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
`;

  const dlRows = stories.map(s => {
    const src = s.source;
    return `    (${esc(s.id)}, ${esc(src.type)}, ${esc(src.title)}, ${esc(src.url)}, ${esc(src.excerpt)}, ${esc(src.source_name)}, ${esc(s.timestamp)})`;
  });

  out += dlRows.join(',\n');
  out += `
    ON CONFLICT DO NOTHING
  \`);
  console.log('    Datalayer: ${stories.length} sources');

  console.log('    Done: ${name} seed complete.');
};
`;

  return out;
}

// ======= MAIN =======
function main() {
  const args = process.argv.slice(2);
  let inputFile, name = 'news-week7', ns = 'news.week7', label, outFile;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input') inputFile = args[++i];
    if (args[i] === '--name') name = args[++i];
    if (args[i] === '--ns') ns = args[++i];
    if (args[i] === '--label') label = args[++i];
    if (args[i] === '--out') outFile = args[++i];
    if (args[i] === '--help') {
      console.log('Usage: node generate-seed.js --input data.json --name news-week7 --ns news.week7');
      process.exit(0);
    }
  }

  if (!inputFile) {
    console.error('Error: --input required');
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  console.error(`Loaded ${raw.length} stories from ${inputFile}`);

  // Filter out Google News redirect URLs (unusable as real URLs)
  const stories = raw.filter(s => !s.source.url.includes('news.google.com/rss/articles'));
  console.error(`After filtering Google redirect URLs: ${stories.length} stories`);

  // Assign narratives
  for (const s of stories) {
    s._narrative = assignNarrative(s);
  }

  const withNarrative = stories.filter(s => s._narrative);
  const standalone = stories.filter(s => !s._narrative);
  console.error(`Narrative-linked: ${withNarrative.length}, Standalone: ${standalone.length}`);

  // Infer relations
  const relations = inferRelations(stories);
  console.error(`Inferred ${relations.length} relations`);

  // Generate seed
  const seed = generateSeed(stories, relations, { name, ns, label: label || `News Week 7 (auto-gathered)` });

  const outPath = outFile || path.join(__dirname, 'seeds', `${name}.js`);
  fs.writeFileSync(outPath, seed);
  console.error(`\nSeed written to ${outPath}`);

  // Summary
  const narratives = [...new Set(stories.map(s => s._narrative).filter(Boolean))];
  console.error(`\n=== SUMMARY ===`);
  console.error(`Stories: ${stories.length}`);
  console.error(`Relations: ${relations.length}`);
  console.error(`Narratives: ${narratives.length}`);
  narratives.forEach(n => {
    const count = stories.filter(s => s._narrative === n).length;
    console.error(`  📖 ${n} (${count} stories)`);
  });
}

main();
