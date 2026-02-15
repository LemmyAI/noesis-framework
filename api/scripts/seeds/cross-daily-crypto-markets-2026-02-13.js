/**
 * NOESIS Seed: Crypto Markets - Cross-Daily Analysis
 * Namespace: news.narratives
 * Built by seed-factory on 2026-02-15
 * Cross-daily narrative tracking "Crypto Markets" across 2 days
(2026-02-13 to 2026-02-14), capturing 5 related events.

 * Entities: 5 | Relations: 4 | Sources: 0
 */
module.exports = async function seed_cross_daily_crypto_markets_2026_02_13(client) {
  console.log('  \u2192 Seeding: cross-daily-crypto-markets-2026-02-13');

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
    ('galaxy-s-steve-kurz-sees-great-converge-2026-02-14', 'news.week7', 'Event', 'Galaxy’s Steve Kurz sees ‘great convergence’ driving crypto’s long-term outlook', NULL, '{"category":"finance.crypto","credibility":{"confidence":"high"},"metadata":{"cross_daily_topic":"Crypto Markets"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb),
    ('bitcoin-claws-back-to-70-000-on-cooling-2026-02-14', 'news.week7', 'Event', 'Bitcoin claws back to $70,000 on cooling inflation after $8.7 billion wipeout', NULL, '{"category":"finance.crypto","credibility":{"confidence":"high"},"metadata":{"cross_daily_topic":"Crypto Markets"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb),
    ('wall-street-analysts-slash-coinbase-pric-2026-02-13', 'news.week7', 'Event', 'Wall Street analysts slash Coinbase price targets after Q4 miss — but shares rally', NULL, '{"category":"finance.crypto","credibility":{"confidence":"high"},"metadata":{"cross_daily_topic":"Crypto Markets"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb),
    ('elon-musks-x-to-launch-crypto-and-stock-2026-02-14', 'news.week7', 'Event', 'Elon Musk''s X to launch crypto and stock trading in ‘couple weeks’', NULL, '{"category":"finance.crypto","credibility":{"confidence":"high"},"metadata":{"cross_daily_topic":"Crypto Markets"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb),
    ('u-s-based-defi-group-urges-uk-fca-to-an-2026-02-13', 'news.week7', 'Decision', 'U.S.-based DeFi group urges UK FCA to anchor crypto rules to ''unilateral control''', NULL, '{"category":"finance.crypto","credibility":{"confidence":"high"},"metadata":{"cross_daily_topic":"Crypto Markets"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 5');

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('u-s-based-defi-group-urges-uk-fca-to-an-2026-02-13', 'wall-street-analysts-slash-coinbase-pric-2026-02-13', 'follows', 0, NULL, '{}'::jsonb),
    ('wall-street-analysts-slash-coinbase-pric-2026-02-13', 'bitcoin-claws-back-to-70-000-on-cooling-2026-02-14', 'follows', 0, NULL, '{}'::jsonb),
    ('bitcoin-claws-back-to-70-000-on-cooling-2026-02-14', 'galaxy-s-steve-kurz-sees-great-converge-2026-02-14', 'follows', 0, NULL, '{}'::jsonb),
    ('galaxy-s-steve-kurz-sees-great-converge-2026-02-14', 'elon-musks-x-to-launch-crypto-and-stock-2026-02-14', 'follows', 0, NULL, '{}'::jsonb)
    ON CONFLICT DO NOTHING
  `);
  console.log('    Relations: 4');

  console.log('  \u2713 cross-daily-crypto-markets-2026-02-13: 5 entities, 4 relations, 0 sources');
};
