/**
 * NOESIS Seed: US Politics - Cross-Daily Analysis
 * Namespace: news.narratives
 * Built by seed-factory on 2026-02-15
 * Cross-daily narrative tracking "US Politics" across 2 days
(2026-02-13 to 2026-02-14), capturing 4 related events.

 * Entities: 4 | Relations: 3 | Sources: 0
 */
module.exports = async function seed_cross_daily_us_politics_2026_02_13(client) {
  console.log('  \u2192 Seeding: cross-daily-us-politics-2026-02-13');

  // === NAMESPACE ===
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news', 'default', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news.narratives', 'news', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('trump-linked-truth-social-seeks-sec-appr-2026-02-13', 'news.week7', 'Decision', 'Trump-linked Truth Social seeks SEC approval for two crypto ETFs', NULL, '{"category":"finance.crypto","credibility":{"confidence":"high"},"metadata":{"cross_daily_topic":"US Politics"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb),
    ('crypto-group-counters-wall-street-banker-2026-02-13', 'news.week7', 'Event', 'Crypto group counters Wall Street bankers with its own stablecoin principles for bill', NULL, '{"category":"finance.crypto","credibility":{"confidence":"high"},"metadata":{"cross_daily_topic":"US Politics"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb),
    ('obama-addresses-racist-video-shared-by-t-2026-02-14', 'news.week7', 'Event', 'Obama addresses racist video shared by Trump depicting him as an ape', NULL, '{"category":"geopolitics","credibility":{"confidence":"verified"},"metadata":{"cross_daily_topic":"US Politics"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb),
    ('rubio-says-us-and-europe-belong-togethe-2026-02-14', 'news.week7', 'Claim', 'Rubio says US and Europe ''belong together'' despite tensions', NULL, '{"category":"geopolitics","credibility":{"confidence":"verified"},"metadata":{"cross_daily_topic":"US Politics"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 4');

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('crypto-group-counters-wall-street-banker-2026-02-13', 'trump-linked-truth-social-seeks-sec-appr-2026-02-13', 'follows', 0, NULL, '{}'::jsonb),
    ('trump-linked-truth-social-seeks-sec-appr-2026-02-13', 'rubio-says-us-and-europe-belong-togethe-2026-02-14', 'follows', 0, NULL, '{}'::jsonb),
    ('rubio-says-us-and-europe-belong-togethe-2026-02-14', 'obama-addresses-racist-video-shared-by-t-2026-02-14', 'follows', 0, NULL, '{}'::jsonb)
    ON CONFLICT DO NOTHING
  `);
  console.log('    Relations: 3');

  console.log('  \u2713 cross-daily-us-politics-2026-02-13: 4 entities, 3 relations, 0 sources');
};
