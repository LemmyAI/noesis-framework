#!/usr/bin/env node
/**
 * NOESIS Seed Factory — Gather
 *
 * Fetches news from RSS feeds defined in sources.yaml.
 * Outputs structured JSON for the narrate step.
 *
 * Usage:
 *   node scripts/gather.js                          # All sources
 *   node scripts/gather.js --limit 10               # Limit per source
 *   node scripts/gather.js --source bbc-world       # Single source
 *   node scripts/gather.js --out /tmp/raw.json      # Write to file
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const yaml = require('js-yaml');

const FACTORY_ROOT = path.resolve(__dirname, '..');

// ======= LOAD SOURCES =======

function loadSources() {
  const file = path.join(FACTORY_ROOT, 'sources.yaml');
  if (!fs.existsSync(file)) {
    console.error('sources.yaml not found. Create it first.');
    process.exit(1);
  }
  return yaml.load(fs.readFileSync(file, 'utf8'));
}

// ======= HTTP FETCH =======

function fetchUrl(url, redirects = 3) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;

    const req = client.request(parsedUrl, {
      headers: { 'User-Agent': 'NOESIS-Gatherer/2.0' },
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects > 0) {
        const next = new URL(res.headers.location, url).href;
        resolve(fetchUrl(next, redirects - 1));
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.end();
  });
}

// ======= XML PARSER (no deps) =======

function parseRSSItems(xml) {
  const items = [];
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];

    const getText = (tag) => {
      // CDATA
      const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, 'i');
      const cdataMatch = block.match(cdataRe);
      if (cdataMatch) return cdataMatch[1].trim();

      // Plain text
      const plainRe = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
      const plainMatch = block.match(plainRe);
      if (plainMatch) {
        return plainMatch[1]
          .replace(/<[^>]+>/g, '')
          .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
          .trim();
      }
      return '';
    };

    const title = getText('title');
    let link = getText('link') || getText('guid');

    // Strip tracking params
    if (link) {
      try {
        const u = new URL(link);
        for (const p of ['at_medium', 'at_campaign', 'utm_source', 'utm_medium', 'utm_campaign', 'traffic_source']) {
          u.searchParams.delete(p);
        }
        link = u.href;
      } catch (_) {}
    }

    const description = getText('description');
    const pubDate = getText('pubDate');

    // Source tag (Google News style)
    const sourceMatch = block.match(/<source[^>]*>([^<]+)<\/source>/i);
    const source = sourceMatch ? sourceMatch[1].trim() : '';

    if (title && link) {
      items.push({ title, link, description, pubDate, source });
    }
  }

  return items;
}

// ======= ENTITY CLASSIFICATION =======

function classifyType(title) {
  const t = title.toLowerCase();
  const decisionWords = ['approves', 'rules', 'agrees', 'signs', 'passes', 'bans', 'orders', 'announces', 'launches', 'seeks', 'proposes'];
  const claimWords = ['claims', 'says', 'warns', 'tells', 'urges', 'may', 'could', 'rumored', 'forecast', 'predicts'];
  const factWords = ['killed', 'dead', 'confirmed', 'found', 'report shows', 'data shows', 'according to'];

  if (decisionWords.some(w => t.includes(w))) return 'Decision';
  if (factWords.some(w => t.includes(w))) return 'Fact';
  if (claimWords.some(w => t.includes(w))) return 'Claim';
  return 'Event';
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

// ======= MAIN =======

async function gather(options = {}) {
  const config = loadSources();
  const feeds = config.feeds || {};
  const limit = options.limit || 15;
  const sourceFilter = options.source;

  const allStories = [];
  const sourceKeys = sourceFilter ? [sourceFilter] : Object.keys(feeds);

  for (const key of sourceKeys) {
    const source = feeds[key];
    if (!source) {
      console.error(`Unknown source: ${key}`);
      continue;
    }

    try {
      process.stderr.write(`Fetching ${source.name} (${key})... `);
      const xml = await fetchUrl(source.url);
      const items = parseRSSItems(xml);
      process.stderr.write(`${items.length} items\n`);

      for (const item of items.slice(0, limit)) {
        const date = item.pubDate ? new Date(item.pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        const id = `${slugify(item.title.slice(0, 40))}-${date}`;
        const sourceName = item.source || source.name;
        const type = classifyType(item.title);

        allStories.push({
          id,
          type,
          name: item.title.slice(0, 150),
          description: (item.description || item.title).slice(0, 300),
          category: source.category,
          confidence: source.confidence || 'medium',
          date,
          timestamp: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
          source: {
            type: 'article',
            title: item.title.slice(0, 200),
            url: item.link,
            excerpt: (item.description || '').slice(0, 200),
            source_name: sourceName,
          },
          _feed: key,
        });
      }

      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      process.stderr.write(`ERROR: ${err.message}\n`);
    }
  }

  // Deduplicate
  const seen = new Set();
  return allStories.filter(s => {
    const key = s.name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 40);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function main() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--limit') options.limit = parseInt(args[++i]);
    if (args[i] === '--source') options.source = args[++i];
    if (args[i] === '--out') options.out = args[++i];
    if (args[i] === '--help') {
      const config = loadSources();
      console.log('Usage: node scripts/gather.js [--limit N] [--source KEY] [--out FILE]');
      console.log('\nSources:', Object.keys(config.feeds || {}).join(', '));
      process.exit(0);
    }
  }

  const stories = await gather(options);
  const output = JSON.stringify(stories, null, 2);

  if (options.out) {
    fs.writeFileSync(options.out, output);
    process.stderr.write(`\nWrote ${stories.length} stories to ${options.out}\n`);
  } else {
    console.log(output);
  }

  process.stderr.write(`\nTotal: ${stories.length} unique stories gathered\n`);
}

if (require.main === module) {
  main().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { gather };
