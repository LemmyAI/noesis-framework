/**
 * NOESIS Seed: Daily News — 2026-02-22 01:00 (Week 8, 2026)
 * Namespace: news.week8.day-2026-02-22
 * Built by seed-factory on 2026-02-22
 * Auto-gathered news: 1 stories, 2026-02-22 to 2026-02-22
 * Entities: 1 | Relations: 0 | Sources: 1
 */
module.exports = async function seed_news_week8_day_2026_02_22_hour_01(client) {
  console.log('  \u2192 Seeding: news-week8-day-2026-02-22-hour-01');

  // === NAMESPACE ===
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news', 'default', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news.week8', 'news', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news.week8.day-2026-02-22', 'news.week8', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('copper-unlikely-to-follow-near-term-gold-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'Copper Unlikely to Follow Near-Term Gold Rally', NULL, '{"category":"finance.energy","description":"Copper prices rallied to a record high of over $13,000 per ton last month, but retreated to about $12,700 this week as expectations of long-term demand strength collided with massive stockpiling at the key exchange hubs in the U.S. and China. Despite an unchanged outlook of soaring copper demand in "}'::jsonb, '{"timestamp":"2026-02-22T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 1');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('copper-unlikely-to-follow-near-term-gold-2026-02-22', 'article', 'Copper Unlikely to Follow Near-Term Gold Rally', 'https://oilprice.com/Energy/Energy-General/Copper-Unlikely-to-Follow-Near-Term-Gold-Rally.html', 'Copper prices rallied to a record high of over $13,000 per ton last month, but retreated to about $12,700 this week as expectations of long-term demand strength collided with massive stockpiling at th', 'OilPrice.com', '2026-02-22T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 1');

  console.log('  \u2713 news-week8-day-2026-02-22-hour-01: 1 entities, 0 relations, 1 sources');
};
