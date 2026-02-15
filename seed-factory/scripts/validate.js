#!/usr/bin/env node
/**
 * NOESIS Seed Factory — Validate
 *
 * Validates narrative YAML files against the schema and checks
 * referential integrity, uniqueness, and consistency.
 *
 * Usage:
 *   node scripts/validate.js narratives/battle-of-harrisburg.yaml
 *   node scripts/validate.js --all
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const FACTORY_ROOT = path.resolve(__dirname, '..');
const NARRATIVES_DIR = path.join(FACTORY_ROOT, 'narratives');

// Default entity types from the NOESIS default namespace
const DEFAULT_TYPES = new Set([
  'Event', 'Decision', 'Fact', 'Claim', 'System',
  'Goal', 'Concept', 'Person', 'Organization',
]);

// Default relation types
const VALID_RELATIONS = new Set([
  'causes', 'enables', 'prevents', 'part_of', 'follows',
  'depends_on', 'contradicts', 'supports',
]);

// Valid confidence levels
const VALID_CONFIDENCE = new Set([
  'verified', 'high', 'medium', 'low', 'disputed',
]);

// Valid temporal precision
const VALID_PRECISION = new Set([
  'second', 'minute', 'hour', 'day', 'month', 'year',
]);

function validate(file) {
  const errors = [];
  const warnings = [];
  const basename = path.basename(file);

  const warn = (msg) => warnings.push(`⚠  ${msg}`);
  const fail = (msg) => errors.push(`✗  ${msg}`);

  // --- Parse ---
  let data;
  try {
    const raw = fs.readFileSync(file, 'utf8');
    data = yaml.load(raw);
  } catch (err) {
    fail(`YAML parse error: ${err.message}`);
    return { errors, warnings };
  }

  if (!data || typeof data !== 'object') {
    fail('File does not contain a valid YAML object');
    return { errors, warnings };
  }

  // --- Seed metadata ---
  if (!data.seed) {
    fail('Missing required field: seed');
  } else {
    if (!data.seed.name) fail('Missing required field: seed.name');
    else if (!/^[a-z0-9][a-z0-9-]*$/.test(data.seed.name)) fail(`seed.name must be kebab-case: "${data.seed.name}"`);
    if (!data.seed.namespace) fail('Missing required field: seed.namespace');
    if (!data.seed.label) warn('Missing seed.label (recommended for documentation)');
  }

  // --- Namespace chain ---
  const allTypes = new Set(DEFAULT_TYPES);
  if (data.namespace_chain) {
    for (const ns of data.namespace_chain) {
      if (!ns.namespace) fail('Namespace entry missing "namespace" field');
      if (!ns.extends) fail(`Namespace "${ns.namespace}" missing "extends" field`);
      if (ns.added_types) {
        for (const [typeName, def] of Object.entries(ns.added_types)) {
          if (!def.parent) fail(`Type "${typeName}" in namespace "${ns.namespace}" missing parent`);
          else if (!allTypes.has(def.parent)) fail(`Type "${typeName}" parent "${def.parent}" does not exist in namespace chain`);
          if (def.color && !/^#[0-9A-Fa-f]{6}$/.test(def.color)) fail(`Type "${typeName}" has invalid color: "${def.color}"`);
          allTypes.add(typeName);
        }
      }
    }
  }

  // --- Entities ---
  const entityIds = new Set();
  const entityKeys = new Set();

  if (!data.entities || data.entities.length === 0) {
    fail('No entities defined');
  } else {
    for (let i = 0; i < data.entities.length; i++) {
      const e = data.entities[i];
      const prefix = `Entity[${i}]`;

      if (!e.id) { fail(`${prefix}: missing id`); continue; }
      if (!/^[a-z0-9][a-z0-9._-]*$/.test(e.id)) fail(`${prefix}: id must be lowercase kebab-case: "${e.id}"`);
      if (entityIds.has(e.id)) fail(`${prefix}: duplicate id "${e.id}"`);
      entityIds.add(e.id);

      if (!e.type) fail(`${prefix} "${e.id}": missing type`);
      else if (!allTypes.has(e.type)) fail(`${prefix} "${e.id}": type "${e.type}" not in namespace chain or defaults`);

      if (!e.name) fail(`${prefix} "${e.id}": missing name`);
      else if (e.name.length > 200) warn(`${prefix} "${e.id}": name exceeds 200 chars`);

      if (!e.category) fail(`${prefix} "${e.id}": missing category (required for UI grouping)`);

      if (e.confidence && !VALID_CONFIDENCE.has(e.confidence)) {
        fail(`${prefix} "${e.id}": invalid confidence "${e.confidence}"`);
      }

      if (e.temporal && typeof e.temporal === 'object' && e.temporal.precision) {
        if (!VALID_PRECISION.has(e.temporal.precision)) {
          fail(`${prefix} "${e.id}": invalid temporal precision "${e.temporal.precision}"`);
        }
      }

      if (e.key) {
        if (entityKeys.has(e.key)) warn(`${prefix} "${e.id}": duplicate key "${e.key}" (OK if intentional cross-namespace IDR)`);
        entityKeys.add(e.key);
      }

      if (!e.description) warn(`${prefix} "${e.id}": no description (recommended)`);
    }
  }

  // --- Relations ---
  if (data.relations) {
    for (let i = 0; i < data.relations.length; i++) {
      const r = data.relations[i];
      const prefix = `Relation[${i}]`;

      if (!r.from) fail(`${prefix}: missing "from"`);
      else if (!entityIds.has(r.from)) fail(`${prefix}: from "${r.from}" references unknown entity`);

      if (!r.to) fail(`${prefix}: missing "to"`);
      else if (!entityIds.has(r.to)) fail(`${prefix}: to "${r.to}" references unknown entity`);

      if (!r.type) fail(`${prefix}: missing "type"`);
      else if (!VALID_RELATIONS.has(r.type)) fail(`${prefix}: invalid relation type "${r.type}"`);

      if (r.from === r.to) warn(`${prefix}: self-referencing relation on "${r.from}"`);
      if (!r.description) warn(`${prefix} ${r.from}→${r.to}: no description (recommended)`);
    }
  }

  // --- Narratives ---
  if (data.narratives) {
    const narrativeNames = new Set();
    for (let i = 0; i < data.narratives.length; i++) {
      const n = data.narratives[i];
      const prefix = `Narrative[${i}]`;

      if (!n.name) fail(`${prefix}: missing name`);
      else if (narrativeNames.has(n.name)) fail(`${prefix}: duplicate narrative name "${n.name}"`);
      else narrativeNames.add(n.name);

      if (!n.steps || n.steps.length === 0) {
        fail(`${prefix} "${n.name}": no steps defined`);
      } else {
        for (let j = 0; j < n.steps.length; j++) {
          const step = n.steps[j];
          const sp = `${prefix} "${n.name}" step[${j + 1}]`;

          if (!step.from) fail(`${sp}: missing "from"`);
          else if (!entityIds.has(step.from)) fail(`${sp}: from "${step.from}" references unknown entity`);

          if (!step.to) fail(`${sp}: missing "to"`);
          else if (!entityIds.has(step.to)) fail(`${sp}: to "${step.to}" references unknown entity`);

          if (!step.type) fail(`${sp}: missing "type"`);
          else if (!VALID_RELATIONS.has(step.type)) fail(`${sp}: invalid relation type "${step.type}"`);

          if (!step.description) warn(`${sp}: no description (recommended for narrative steps)`);
        }
      }
    }
  }

  // --- Sources ---
  if (data.sources) {
    for (let i = 0; i < data.sources.length; i++) {
      const s = data.sources[i];
      const prefix = `Source[${i}]`;

      if (!s.entity) fail(`${prefix}: missing entity`);
      else if (!entityIds.has(s.entity)) fail(`${prefix}: entity "${s.entity}" references unknown entity`);

      if (!s.type) fail(`${prefix}: missing type`);
      if (!s.title && !s.url) warn(`${prefix}: neither title nor url provided`);
    }
  } else {
    warn('No sources defined (datalayer will be empty)');
  }

  return { errors, warnings };
}

// ============================================================
// MAIN
// ============================================================

function main() {
  const args = process.argv.slice(2);
  let files = [];

  if (args.includes('--all') || args.length === 0) {
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
    console.error('No YAML files found to validate.');
    process.exit(1);
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of files) {
    const basename = path.basename(file);
    console.log(`\n━━━ Validating: ${basename} ━━━`);

    const { errors, warnings } = validate(file);
    totalErrors += errors.length;
    totalWarnings += warnings.length;

    if (errors.length === 0 && warnings.length === 0) {
      console.log('  ✓ All checks passed');
    }
    for (const w of warnings) console.log(`  ${w}`);
    for (const e of errors) console.log(`  ${e}`);

    if (errors.length > 0) {
      console.log(`  → ${errors.length} error(s), ${warnings.length} warning(s)`);
    } else if (warnings.length > 0) {
      console.log(`  → ${warnings.length} warning(s), 0 errors`);
    }
  }

  console.log(`\n${'═'.repeat(40)}`);
  console.log(`Total: ${totalErrors} error(s), ${totalWarnings} warning(s)`);

  if (totalErrors > 0) {
    console.log('FAILED — fix errors before building.');
    process.exit(1);
  } else {
    console.log('PASSED');
  }
}

main();
