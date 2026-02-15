#!/usr/bin/env node
/**
 * NOESIS Seed Factory — Daily News
 *
 * One-command wrapper that gathers today's news from RSS feeds,
 * clusters them into narratives, validates, and builds a seed file.
 *
 * Output seed goes into: api/scripts/seeds/news-week{W}-day-{YYYY-MM-DD}.js
 * Namespace structure:   news → news.week{W} → news.week{W}.day-{YYYY-MM-DD}
 *
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  USAGE (just run this — no other steps needed):             ║
 * ║                                                             ║
 * ║  cd seed-factory                                            ║
 * ║  npm install        (first time only)                       ║
 * ║  node scripts/daily-news.js                                 ║
 * ║                                                             ║
 * ║  OPTIONS:                                                   ║
 * ║  --date YYYY-MM-DD     Override date (default: today)       ║
 * ║  --limit N             Max stories per feed (default: 10)   ║
 * ║  --dry-run             Show what would happen, don't write  ║
 * ║  --keep-tmp            Don't delete intermediate files      ║
 * ║  --help                Show this help                       ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * WHAT IT DOES:
 * 1. Gathers RSS from all feeds in sources.yaml
 * 2. Filters to only today's stories (by pubDate)
 * 3. Clusters into narratives using keyword rules
 * 4. Validates the YAML (catches errors before build)
 * 5. Builds the .js seed file into api/scripts/seeds/
 *
 * NAMESPACE HIERARCHY:
 *   news                          (parent — shows all news)
 *     news.week8                  (aggregates that week's dailies)
 *       news.week8.day-2026-02-15 (today's stories)
 *
 * The week number is ISO week (Mon–Sun). Parent namespaces are
 * created automatically by the namespace_chain in the YAML.
 *
 * AFTER RUNNING:
 * The seed file is at api/scripts/seeds/news-week{W}-day-{YYYY-MM-DD}.js
 * To deploy: commit, push to main, Render auto-deploys.
 *
 * NO AI REQUIRED — everything is rule-based.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FACTORY_ROOT = path.resolve(__dirname, '..');
const SCRIPTS_DIR = path.join(FACTORY_ROOT, 'scripts');
const NARRATIVES_DIR = path.join(FACTORY_ROOT, 'narratives');
const TMP_DIR = path.join(FACTORY_ROOT, '.tmp');
const SEED_OUTPUT_DIR = path.resolve(FACTORY_ROOT, '..', 'api', 'scripts', 'seeds');

// ========== ARGUMENT PARSING ==========

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    date: null,
    limit: 10,
    dryRun: false,
    keepTmp: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--date':
        opts.date = args[++i];
        if (!/^\d{4}-\d{2}-\d{2}$/.test(opts.date)) {
          console.error('ERROR: --date must be YYYY-MM-DD format');
          process.exit(1);
        }
        break;
      case '--limit':
        opts.limit = parseInt(args[++i], 10);
        if (isNaN(opts.limit) || opts.limit < 1) {
          console.error('ERROR: --limit must be a positive number');
          process.exit(1);
        }
        break;
      case '--dry-run':
        opts.dryRun = true;
        break;
      case '--keep-tmp':
        opts.keepTmp = true;
        break;
      case '--help':
        // Print the top-of-file usage block
        const self = fs.readFileSync(__filename, 'utf8');
        const usage = self.match(/╔[\s\S]*?╚[^\n]*/);
        if (usage) console.log(usage[0]);
        else console.log('Usage: node scripts/daily-news.js [--date YYYY-MM-DD] [--limit N] [--dry-run]');
        process.exit(0);
      default:
        console.error(`Unknown option: ${args[i]}`);
        process.exit(1);
    }
  }

  return opts;
}

// ========== DATE HELPERS ==========

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getDateString(date) {
  return date.toISOString().split('T')[0];
}

// ========== MAIN ==========

function main() {
  const opts = parseArgs();

  // Determine the target date
  const targetDate = opts.date ? new Date(opts.date + 'T12:00:00Z') : new Date();
  const dateStr = opts.date || getDateString(targetDate);
  const weekNum = getISOWeek(targetDate);
  const year = targetDate.getFullYear();

  // Build identifiers
  const weekLabel = `week${weekNum}`;
  const dayLabel = `day-${dateStr}`;
  const seedName = `news-${weekLabel}-${dayLabel}`;
  const nsDay = `news.${weekLabel}.${dayLabel}`;
  const nsWeek = `news.${weekLabel}`;
  const humanLabel = `Daily News — ${dateStr} (Week ${weekNum}, ${year})`;

  console.log('');
  console.log('╔══════════════════════════════════════════╗');
  console.log('║   NOESIS Daily News Pipeline             ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log('');
  console.log(`  Date:       ${dateStr}`);
  console.log(`  Week:       ${weekNum} (ISO)`);
  console.log(`  Seed name:  ${seedName}`);
  console.log(`  Namespace:  ${nsDay}`);
  console.log(`  Parent NS:  ${nsWeek} → news`);
  console.log('');

  if (opts.dryRun) {
    console.log('  [DRY RUN] Would create:');
    console.log(`    YAML:  ${path.join(NARRATIVES_DIR, seedName + '.yaml')}`);
    console.log(`    Seed:  ${path.join(SEED_OUTPUT_DIR, seedName + '.js')}`);
    console.log('');
    console.log('  [DRY RUN] Exiting without changes.');
    return;
  }

  // Ensure tmp dir exists
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

  const rawJsonPath = path.join(TMP_DIR, `raw-${dateStr}.json`);
  const yamlPath = path.join(NARRATIVES_DIR, `${seedName}.yaml`);

  // ── STEP 1: Gather ──────────────────────────────────────────
  console.log('STEP 1/4 — Gathering RSS feeds...');
  try {
    execSync(
      `node "${path.join(SCRIPTS_DIR, 'gather.js')}" --limit ${opts.limit} --out "${rawJsonPath}"`,
      { stdio: ['pipe', 'pipe', 'inherit'], cwd: FACTORY_ROOT }
    );
  } catch (err) {
    console.error('FAILED: gather.js exited with error');
    process.exit(1);
  }

  if (!fs.existsSync(rawJsonPath)) {
    console.error(`FAILED: gather output not found at ${rawJsonPath}`);
    process.exit(1);
  }

  // ── STEP 1.5: Filter to today only ─────────────────────────
  console.log(`\nFiltering to stories from ${dateStr}...`);
  const allStories = JSON.parse(fs.readFileSync(rawJsonPath, 'utf8'));
  const todayStories = allStories.filter(s => {
    // Match stories whose date matches the target date
    return s.date === dateStr;
  });

  console.log(`  Total gathered: ${allStories.length}`);
  console.log(`  Today's stories: ${todayStories.length}`);

  if (todayStories.length === 0) {
    console.log('');
    console.log('⚠ No stories found for this date.');
    console.log('  This can happen if:');
    console.log('  - RSS feeds haven\'t published yet today (try later)');
    console.log('  - The date is in the past and feeds only show recent items');
    console.log('  - All feeds are down (check network)');
    console.log('');
    console.log('  To include ALL gathered stories regardless of date:');
    console.log('  Use the manual pipeline instead:');
    console.log(`    node scripts/gather.js --out /tmp/raw.json`);
    console.log(`    node scripts/narrate.js --input /tmp/raw.json --name ${seedName} --ns ${nsDay}`);
    console.log(`    node scripts/build.js narratives/${seedName}.yaml`);

    // Clean up
    if (!opts.keepTmp) {
      try { fs.unlinkSync(rawJsonPath); } catch (_) {}
    }
    process.exit(0);
  }

  // Write filtered JSON back
  fs.writeFileSync(rawJsonPath, JSON.stringify(todayStories, null, 2));

  // ── STEP 2: Narrate ────────────────────────────────────────
  console.log('\nSTEP 2/4 — Clustering into narratives...');
  try {
    execSync(
      `node "${path.join(SCRIPTS_DIR, 'narrate.js')}" --input "${rawJsonPath}" --name "${seedName}" --ns "${nsDay}" --label "${humanLabel}"`,
      { stdio: ['pipe', 'pipe', 'inherit'], cwd: FACTORY_ROOT }
    );
  } catch (err) {
    console.error('FAILED: narrate.js exited with error');
    process.exit(1);
  }

  if (!fs.existsSync(yamlPath)) {
    console.error(`FAILED: YAML not found at ${yamlPath}`);
    process.exit(1);
  }

  // ── STEP 3: Validate ───────────────────────────────────────
  console.log('\nSTEP 3/4 — Validating YAML...');
  try {
    execSync(
      `node "${path.join(SCRIPTS_DIR, 'validate.js')}" "${yamlPath}"`,
      { stdio: 'inherit', cwd: FACTORY_ROOT }
    );
  } catch (err) {
    console.error('FAILED: Validation errors found. Fix the YAML and re-run.');
    console.error(`  YAML file: ${yamlPath}`);
    process.exit(1);
  }

  // ── STEP 4: Build ──────────────────────────────────────────
  console.log('\nSTEP 4/4 — Building .js seed...');
  try {
    execSync(
      `node "${path.join(SCRIPTS_DIR, 'build.js')}" "${yamlPath}"`,
      { stdio: 'inherit', cwd: FACTORY_ROOT }
    );
  } catch (err) {
    console.error('FAILED: build.js exited with error');
    process.exit(1);
  }

  const seedPath = path.join(SEED_OUTPUT_DIR, `${seedName}.js`);
  if (!fs.existsSync(seedPath)) {
    console.error(`FAILED: Seed file not found at ${seedPath}`);
    process.exit(1);
  }

  // ── CLEANUP ─────────────────────────────────────────────────
  if (!opts.keepTmp) {
    try { fs.unlinkSync(rawJsonPath); } catch (_) {}
    try { fs.rmdirSync(TMP_DIR); } catch (_) {}
  }

  // ── DONE ────────────────────────────────────────────────────
  console.log('');
  console.log('╔══════════════════════════════════════════╗');
  console.log('║   ✅ DONE                                ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log('');
  console.log(`  YAML:   ${yamlPath}`);
  console.log(`  Seed:   ${seedPath}`);
  console.log(`  Stories: ${todayStories.length}`);
  console.log('');
  console.log('  NEXT STEPS:');
  console.log('  To deploy to production:');
  console.log('');
  console.log('    cd ~/projects/noesis-framework');
  console.log(`    git add api/scripts/seeds/${seedName}.js`);
  console.log(`    git add seed-factory/narratives/${seedName}.yaml`);
  console.log(`    git commit -m "seed: daily news ${dateStr}"`);
  console.log('    git push origin main');
  console.log('');
  console.log('  Render auto-deploys from main branch.');
  console.log('');
}

main();
