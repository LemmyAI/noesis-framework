#!/usr/bin/env node
/**
 * NOESIS News Gatherer
 * 
 * Fetches real news from RSS feeds and outputs structured JSON
 * for seed generation. Fully reproducible — run again for fresh data.
 * 
 * Usage:
 *   node gather-news.js                    # Fetch from all sources
 *   node gather-news.js --limit 10         # Limit per source
 *   node gather-news.js --out data.json    # Write to file
 *   node gather-news.js --source bbc       # Single source
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

// ======= RSS SOURCES =======
const SOURCES = {
  'bbc-world': {
    name: 'BBC News',
    url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    category: 'geopolitics',
  },
  'bbc-business': {
    name: 'BBC Business',
    url: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    category: 'finance',
  },
  'guardian-world': {
    name: 'The Guardian',
    url: 'https://www.theguardian.com/world/rss',
    category: 'geopolitics',
  },
  'guardian-business': {
    name: 'The Guardian',
    url: 'https://www.theguardian.com/business/rss',
    category: 'finance',
  },
  'aljazeera': {
    name: 'Al Jazeera',
    url: 'https://www.aljazeera.com/xml/rss/all.xml',
    category: 'geopolitics',
  },
  'coindesk': {
    name: 'CoinDesk',
    url: 'https://www.coindesk.com/arc/outboundfeeds/rss/',
    category: 'finance.crypto',
  },
  'techcrunch-ai': {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    category: 'technology.ai',
  },
  'google-news': {
    name: 'Google News',
    url: 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en',
    category: 'general',
    // Google News wraps links — needs special handling
    googleRedirect: true,
  },
};

// ======= HTTP FETCH =======
function fetchUrl(url, redirects = 3) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;

    const req = client.request(parsedUrl, {
      headers: { 'User-Agent': 'NOESIS-Gatherer/1.0' },
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

  // Handle CDATA
  const clean = xml.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (_, content) => {
    return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  });

  // Extract items
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];

    const getText = (tag) => {
      // Try CDATA first
      const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, 'i');
      const cdataMatch = block.match(cdataRe);
      if (cdataMatch) return cdataMatch[1].trim();

      // Plain text
      const plainRe = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
      const plainMatch = block.match(plainRe);
      if (plainMatch) return plainMatch[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();

      return '';
    };

    const title = getText('title');
    let link = getText('link') || getText('guid');

    // Clean tracking params from URLs
    if (link) {
      try {
        const u = new URL(link);
        u.searchParams.delete('at_medium');
        u.searchParams.delete('at_campaign');
        u.searchParams.delete('utm_source');
        u.searchParams.delete('utm_medium');
        u.searchParams.delete('utm_campaign');
        link = u.href;
      } catch (_) {}
    }

    const description = getText('description');
    const pubDate = getText('pubDate');

    // Extract source from Google News (source tag)
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

function classifyConfidence(sourceName) {
  const verified = ['BBC', 'Reuters', 'AP News', 'Associated Press'];
  const high = ['The Guardian', 'Al Jazeera', 'Bloomberg', 'Financial Times', 'CoinDesk', 'Politico', 'Axios'];
  if (verified.some(s => sourceName.includes(s))) return 'verified';
  if (high.some(s => sourceName.includes(s))) return 'high';
  return 'medium';
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
  const limit = options.limit || 15;
  const sourceFilter = options.source;

  const allStories = [];
  const sourceKeys = sourceFilter ? [sourceFilter] : Object.keys(SOURCES);

  for (const key of sourceKeys) {
    const source = SOURCES[key];
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
        const confidence = classifyConfidence(sourceName);

        allStories.push({
          id,
          type,
          name: item.title.slice(0, 150),
          description: (item.description || item.title).slice(0, 300),
          category: source.category,
          namespace: 'news.week7',
          confidence,
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

      // Small delay between requests
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      process.stderr.write(`ERROR: ${err.message}\n`);
    }
  }

  // Deduplicate by similar titles (fuzzy)
  const seen = new Set();
  const deduped = allStories.filter(s => {
    const key = s.name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 40);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped;
}

// ======= CLI =======
async function main() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--limit') options.limit = parseInt(args[++i]);
    if (args[i] === '--source') options.source = args[++i];
    if (args[i] === '--out') options.out = args[++i];
    if (args[i] === '--help') {
      console.log('Usage: node gather-news.js [--limit N] [--source KEY] [--out FILE]');
      console.log('\nSources:', Object.keys(SOURCES).join(', '));
      process.exit(0);
    }
  }

  const stories = await gather(options);

  const output = JSON.stringify(stories, null, 2);

  if (options.out) {
    require('fs').writeFileSync(options.out, output);
    process.stderr.write(`\nWrote ${stories.length} stories to ${options.out}\n`);
  } else {
    console.log(output);
  }

  process.stderr.write(`\nTotal: ${stories.length} unique stories gathered\n`);
}

if (require.main === module) {
  main().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { gather, SOURCES };
