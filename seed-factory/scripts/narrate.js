#!/usr/bin/env node
/**
 * NOESIS Seed Factory — Narrate
 *
 * Takes gathered news JSON and produces a narrative YAML file.
 * Applies clustering rules from sources.yaml to group stories
 * into narratives and infer relations.
 *
 * Usage:
 *   node scripts/narrate.js --input /tmp/raw.json --name news-week7 --ns news.week7
 *   node scripts/narrate.js --input /tmp/raw.json --name news-week7 --ns news.week7 --label "News Week 7"
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const FACTORY_ROOT = path.resolve(__dirname, '..');

// ======= LOAD NARRATIVE RULES =======

function loadRules() {
  const file = path.join(FACTORY_ROOT, 'sources.yaml');
  const config = yaml.load(fs.readFileSync(file, 'utf8'));
  return config.narrative_rules || [];
}

// ======= NARRATIVE ASSIGNMENT =======

function assignNarrative(story, rules) {
  const text = ` ${story.name} ${story.description} `.toLowerCase();
  for (const rule of rules) {
    const match = rule.keywords.some(kw => {
      // Short keywords need word boundaries
      if (kw.length <= 4) {
        const re = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return re.test(text);
      }
      return text.includes(kw);
    });
    if (match) return rule.context;
  }
  return null;
}

// ======= RELATION INFERENCE =======

function inferRelationType(from, to) {
  if (from.type === 'Decision' || from.type === 'Event') {
    if (to.type === 'Event') return 'causes';
    if (to.type === 'Claim') return 'supports';
  }
  if (from.type === 'Claim' && to.type === 'Decision') return 'enables';
  if (from.type === 'Fact') return 'causes';
  return 'follows';
}

// ======= YAML GENERATION =======

function buildYaml(stories, options, rules) {
  const { name, ns, label } = options;

  // Assign narratives
  for (const s of stories) {
    s._narrative = assignNarrative(s, rules);
  }

  // Build namespace chain
  const nsParts = ns.split('.');
  const nsChain = [];
  for (let i = 1; i <= nsParts.length; i++) {
    const current = nsParts.slice(0, i).join('.');
    const parent = i === 1 ? 'default' : nsParts.slice(0, i - 1).join('.');
    nsChain.push({ namespace: current, extends: parent });
  }

  // Build entities
  const entities = stories.map(s => {
    const e = {
      id: s.id,
      type: s.type,
      name: s.name,
      category: s.category,
      description: s.description,
      confidence: s.confidence,
      sources_count: 1,
      temporal: {
        start: s.timestamp,
        precision: 'day',
      },
    };
    return e;
  });

  // Build narratives
  const narrativeGroups = {};
  for (const s of stories) {
    if (s._narrative) {
      if (!narrativeGroups[s._narrative]) narrativeGroups[s._narrative] = [];
      narrativeGroups[s._narrative].push(s);
    }
  }

  const narratives = [];
  for (const [context, group] of Object.entries(narrativeGroups)) {
    group.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const steps = [];
    for (let i = 0; i < group.length - 1; i++) {
      steps.push({
        from: group[i].id,
        to: group[i + 1].id,
        type: inferRelationType(group[i], group[i + 1]),
      });
    }

    if (steps.length > 0) {
      narratives.push({ name: context, steps });
    }
  }

  // Build sources (datalayer)
  const sources = stories.map(s => ({
    entity: s.id,
    type: s.source.type,
    title: s.source.title,
    url: s.source.url,
    excerpt: s.source.excerpt,
    source_name: s.source.source_name,
    published: s.timestamp,
  }));

  // Build date range for label
  const dates = stories.map(s => s.date).sort();
  const dateRange = dates.length > 0 ? `${dates[0]} to ${dates[dates.length - 1]}` : 'unknown';

  // Assemble YAML structure
  const doc = {
    seed: {
      name,
      label: label || `News ${name} (auto-gathered)`,
      namespace: ns,
      description: `Auto-gathered news: ${stories.length} stories, ${dateRange}`,
    },
    namespace_chain: nsChain,
    entities,
    narratives: narratives.length > 0 ? narratives : undefined,
    sources,
  };

  return doc;
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
      console.log('Usage: node scripts/narrate.js --input data.json --name news-week7 --ns news.week7');
      console.log('Options:');
      console.log('  --input FILE    Gathered JSON from gather.js');
      console.log('  --name NAME     Seed name (kebab-case)');
      console.log('  --ns NAMESPACE  Target namespace (e.g. news.week7)');
      console.log('  --label TEXT    Human-readable label');
      console.log('  --out FILE      Output file (default: narratives/<name>.yaml)');
      process.exit(0);
    }
  }

  if (!inputFile) {
    console.error('Error: --input required');
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  console.error(`Loaded ${raw.length} stories from ${inputFile}`);

  // Filter out Google News redirect URLs
  const stories = raw.filter(s => !s.source.url.includes('news.google.com/rss/articles'));
  console.error(`After filtering Google redirect URLs: ${stories.length} stories`);

  const rules = loadRules();
  const doc = buildYaml(stories, { name, ns, label }, rules);

  // Serialize to YAML
  const yamlStr = yaml.dump(doc, {
    lineWidth: 120,
    noRefs: true,
    sortKeys: false,
    quotingType: '"',
    forceQuotes: false,
  });

  const outPath = outFile || path.join(FACTORY_ROOT, 'narratives', `${name}.yaml`);

  // Ensure dir exists
  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(outPath, yamlStr);
  console.error(`\nNarrative YAML written to ${outPath}`);

  // Summary
  const withNarrative = stories.filter(s => s._narrative);
  const narrativeNames = [...new Set(stories.map(s => s._narrative).filter(Boolean))];
  console.error(`\n=== SUMMARY ===`);
  console.error(`Stories: ${stories.length}`);
  console.error(`Narrative-linked: ${withNarrative.length}`);
  console.error(`Standalone: ${stories.length - withNarrative.length}`);
  console.error(`Narratives: ${narrativeNames.length}`);
  for (const n of narrativeNames) {
    const count = stories.filter(s => s._narrative === n).length;
    console.error(`  📖 ${n} (${count} stories)`);
  }
}

main();
