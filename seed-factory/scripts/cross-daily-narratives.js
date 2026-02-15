#!/usr/bin/env node
/**
 * NOESIS Cross-Daily Narrative Generator
 * 
 * Scans news entities from the past month, finds clusters of 4+ entities
 * that span multiple days, and generates narrative YAML files.
 * 
 * Usage:
 *   node cross-daily-narratives.js [--dry-run] [--output-dir ../narratives]
 * 
 * Environment:
 *   NOESIS_API_URL - Base URL for Noesis API (default: https://noesis-api.onrender.com)
 *   ANTHROPIC_API_KEY - For narrative synthesis (optional, uses simple extraction if not set)
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration
const NOESIS_API_URL = process.env.NOESIS_API_URL || 'https://noesis-api.onrender.com';
const MIN_ENTITIES = 4;
const MIN_DAYS = 2;  // Must span at least 2 different days
const DAYS_LOOKBACK = 30;  // Last month
const DRY_RUN = process.argv.includes('--dry-run');
const OUTPUT_DIR = process.argv.includes('--output-dir') 
  ? process.argv[process.argv.indexOf('--output-dir') + 1]
  : path.join(__dirname, '../narratives');

// Entity extraction keywords for clustering
const TOPIC_KEYWORDS = {
  // Geopolitics
  'Israel-Palestine': ['israel', 'gaza', 'palestinian', 'hamas', 'idf', 'netanyahu', 'west bank', 'jerusalem'],
  'Iran Nuclear': ['iran', 'nuclear', 'tehran', 'sanctions', 'jcpoa', 'uranium'],
  'Russia': ['russia', 'putin', 'navalny', 'kremlin', 'moscow', 'russian'],
  'Sudan Conflict': ['sudan', 'rsf', 'darfur', 'khartoum'],
  'Nigeria': ['nigeria', 'niger state', 'abuja', 'lagos'],
  'Venezuela': ['venezuela', 'maduro', 'caracas'],
  'Cuba': ['cuba', 'havana', 'cuban'],
  'US Politics': ['trump', 'biden', 'congress', 'senate', 'white house', 'republican', 'democrat'],
  
  // Finance/Crypto
  'Crypto Markets': ['bitcoin', 'btc', 'crypto', 'ethereum', 'ether', 'defi', 'coinbase', 'binance', 'etf'],
  'Banking': ['bank', 'jpmorgan', 'barclays', 'federal reserve', 'fed', 'interest rate'],
  'Markets': ['stock', 'market', 'trading', 'wall street', 's&p', 'dow'],
  
  // Technology/AI
  'AI Race': ['ai', 'artificial intelligence', 'openai', 'anthropic', 'claude', 'gpt', 'chatbot', 'llm', 'musk', 'xai', 'grok'],
  'Tech Industry': ['google', 'apple', 'microsoft', 'amazon', 'meta', 'tech'],
  
  // Sports
  'Winter Olympics': ['olympics', 'winter olympics', 'gold medal', 'skiing', 'skating'],
  'Cricket': ['cricket', 't20', 'world cup', 'india vs pakistan', 'west indies'],
  
  // Other
  'Migration': ['migrant', 'migration', 'refugee', 'border', 'deport'],
  'Climate': ['climate', 'storm', 'flood', 'weather', 'renewable', 'wind', 'solar'],
};

// HTTP request helper
function fetch(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`JSON parse error: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

// Extract date from timestamp
function getDate(ts) {
  if (!ts) return null;
  const d = new Date(ts);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

// Check if text matches any keyword in a topic
function matchTopic(text, topicKeywords) {
  if (!text) return null;
  const lower = text.toLowerCase();
  
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    for (const kw of keywords) {
      // Word boundary check for short keywords
      if (kw.length <= 4) {
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        if (regex.test(lower)) return topic;
      } else {
        if (lower.includes(kw)) return topic;
      }
    }
  }
  return null;
}

// Main function
async function main() {
  console.log('🔍 NOESIS Cross-Daily Narrative Generator');
  console.log('=========================================\n');
  
  console.log(`API: ${NOESIS_API_URL}`);
  console.log(`Lookback: ${DAYS_LOOKBACK} days`);
  console.log(`Min entities: ${MIN_ENTITIES}`);
  console.log(`Min days span: ${MIN_DAYS}`);
  console.log(`Dry run: ${DRY_RUN}`);
  console.log('');
  
  // Step 1: Fetch all entities from news namespace
  console.log('📦 Fetching entities from Noesis API...');
  let entities;
  try {
    const data = await fetch(`${NOESIS_API_URL}/api/entities?namespace=news.week7&limit=200`);
    entities = data.entities || [];
    console.log(`   Found ${entities.length} entities\n`);
  } catch (e) {
    console.error(`❌ Failed to fetch entities: ${e.message}`);
    process.exit(1);
  }
  
  // Step 2: Group entities by topic
  console.log('🏷️  Grouping entities by topic...');
  const topicGroups = {};
  const entityDates = {};
  
  for (const entity of entities) {
    // Get date
    const date = getDate(entity.temporal?.timestamp);
    if (!date) continue;
    
    // Match topic from name + description
    const text = `${entity.name} ${entity.metadata?.description || ''}`;
    const topic = matchTopic(text, TOPIC_KEYWORDS);
    
    if (topic) {
      if (!topicGroups[topic]) {
        topicGroups[topic] = [];
      }
      topicGroups[topic].push({
        ...entity,
        matchedDate: date
      });
      
      // Track dates per topic
      if (!entityDates[topic]) {
        entityDates[topic] = new Set();
      }
      entityDates[topic].add(date);
    }
  }
  
  console.log(`   Found ${Object.keys(topicGroups).length} potential topics\n`);
  
  // Step 3: Filter to valid clusters (4+ entities, 2+ days)
  console.log('🔎 Finding valid narrative clusters...');
  const validClusters = [];
  
  for (const [topic, topicEntities] of Object.entries(topicGroups)) {
    const uniqueDates = entityDates[topic];
    const daySpan = uniqueDates.size;
    
    if (topicEntities.length >= MIN_ENTITIES && daySpan >= MIN_DAYS) {
      validClusters.push({
        topic,
        entities: topicEntities,
        entityCount: topicEntities.length,
        daySpan,
        dates: Array.from(uniqueDates).sort()
      });
    }
  }
  
  // Sort by entity count descending
  validClusters.sort((a, b) => b.entityCount - a.entityCount);
  
  console.log(`   Found ${validClusters.length} valid clusters:\n`);
  
  for (const cluster of validClusters) {
    console.log(`   ✓ "${cluster.topic}": ${cluster.entityCount} entities across ${cluster.daySpan} days (${cluster.dates[0]} to ${cluster.dates[cluster.dates.length - 1]})`);
  }
  console.log('');
  
  if (validClusters.length === 0) {
    console.log('⚠️  No valid narrative clusters found. Try lowering MIN_ENTITIES or MIN_DAYS.');
    process.exit(0);
  }
  
  // Step 4: Generate narrative YAML for each cluster
  console.log('📝 Generating narrative files...\n');
  
  for (const cluster of validClusters) {
    const narrative = generateNarrativeYAML(cluster);
    const filename = `cross-daily-${cluster.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${cluster.dates[0]}.yaml`;
    const filepath = path.join(OUTPUT_DIR, filename);
    
    console.log(`   📄 ${filename}`);
    console.log(`      Title: ${narrative.title}`);
    console.log(`      Entities: ${cluster.entityCount}`);
    console.log(`      Days: ${cluster.daySpan}`);
    
    if (!DRY_RUN) {
      // Ensure output directory exists
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      }
      
      fs.writeFileSync(filepath, narrative.yaml);
      console.log(`      Saved: ${filepath}`);
    } else {
      console.log(`      (dry run - not saved)`);
    }
    console.log('');
  }
  
  // Summary
  console.log('✅ Done!');
  console.log(`   Generated ${validClusters.length} narrative files`);
  if (DRY_RUN) {
    console.log('   (Dry run - no files were written)');
  }
}

// Generate narrative YAML from cluster (format compatible with build.js)
function generateNarrativeYAML(cluster) {
  const { topic, entities, dates } = cluster;
  
  // Create seed name from topic
  const seedName = `cross-daily-${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${dates[0]}`;
  const namespace = 'news.narratives';
  
  // Build relations (sequential by timestamp)
  const relations = [];
  const sortedEntities = [...entities].sort((a, b) => 
    new Date(a.temporal?.timestamp) - new Date(b.temporal?.timestamp)
  );
  
  for (let i = 0; i < sortedEntities.length - 1; i++) {
    relations.push({
      from: sortedEntities[i].id,
      to: sortedEntities[i + 1].id,
      type: 'follows',
      context: topic,
      sequence: i + 1
    });
  }
  
  // Generate YAML in format expected by build.js
  const yaml = `# NOESIS Cross-Daily Narrative
# Auto-generated by cross-daily-narratives.js on ${new Date().toISOString()}
# Topic: ${topic}
# Entities: ${entities.length}
# Days spanned: ${dates.length}

seed:
  name: ${seedName}
  label: "${topic} - Cross-Daily Analysis"
  namespace: ${namespace}
  description: |
    Cross-daily narrative tracking "${topic}" across ${dates.length} days
    (${dates[0]} to ${dates[dates.length - 1]}), capturing ${entities.length} related events.

namespace_chain:
  - namespace: news
    extends: default
  - namespace: news.narratives
    extends: news

entities:
${entities.map(e => `  - id: ${e.id}
    type: ${e.type}
    name: "${(e.name || '').replace(/"/g, '\\"')}"
    category: ${(e.metadata?.category || 'general')}
    namespace: ${e.namespace}
    temporal:
      timestamp: "${e.temporal?.timestamp || e.matchedDate + 'T00:00:00Z'}"
      precision: day
    credibility:
      confidence: ${e.credibility?.confidence || 'medium'}
    metadata:
      cross_daily_topic: "${topic}"`).join('\n')}

relations:
${relations.map(r => `  - from: ${r.from}
    to: ${r.to}
    type: ${r.type}
    context: "${r.context}"
    narrative_sequence: ${r.sequence}`).join('\n')}
`;

  return {
    title: `${topic} - Cross-Daily Analysis`,
    yaml,
    seedName
  };
}

// Run
main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
