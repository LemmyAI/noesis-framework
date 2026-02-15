/**
 * NOESIS Seed: AI Race - Cross-Daily Analysis
 * Namespace: news.narratives
 * Built by seed-factory on 2026-02-15
 * Cross-daily narrative tracking "AI Race" across 2 days
(2026-02-13 to 2026-02-14), capturing 6 related events.

 * Entities: 6 | Relations: 5 | Sources: 0
 */
module.exports = async function seed_cross_daily_ai_race_2026_02_13(client) {
  console.log('  \u2192 Seeding: cross-daily-ai-race-2026-02-13');

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
    ('hollywood-isn-8217-t-happy-about-the-ne-2026-02-14', 'news.week7', 'Event', 'Hollywood isn''t happy about the new Seedance 2.0 video generator', NULL, '{"category":"technology.ai","credibility":{"confidence":"medium"},"metadata":{"cross_daily_topic":"AI Race"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb),
    ('airbnb-plans-to-bake-in-ai-features-for-2026-02-14', 'news.week7', 'Event', 'Airbnb plans to bake in AI features for search, discovery and support', NULL, '{"category":"technology.ai","credibility":{"confidence":"medium"},"metadata":{"cross_daily_topic":"AI Race"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb),
    ('why-top-talent-is-walking-away-from-open-2026-02-13', 'news.week7', 'Event', 'Why top talent is walking away from OpenAI and xAI', NULL, '{"category":"technology.ai","credibility":{"confidence":"medium"},"metadata":{"cross_daily_topic":"AI Race"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb),
    ('openai-removes-access-to-sycophancy-pron-2026-02-13', 'news.week7', 'Event', 'OpenAI removes access to sycophancy-prone GPT-4o model', NULL, '{"category":"technology.ai","credibility":{"confidence":"medium"},"metadata":{"cross_daily_topic":"AI Race"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb),
    ('is-safety-dead-at-xai-2026-02-14', 'news.week7', 'Fact', 'Is safety ‘dead’ at xAI?', NULL, '{"category":"technology.ai","credibility":{"confidence":"medium"},"metadata":{"cross_daily_topic":"AI Race"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb),
    ('airbnb-says-a-third-of-its-customer-supp-2026-02-13', 'news.week7', 'Claim', 'Airbnb says a third of its customer support is now handled by AI in the US and Canada', NULL, '{"category":"technology.ai","credibility":{"confidence":"medium"},"metadata":{"cross_daily_topic":"AI Race"}}'::jsonb, '{"precision":"day"}'::jsonb, '{"confidence":"medium"}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 6');

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('openai-removes-access-to-sycophancy-pron-2026-02-13', 'why-top-talent-is-walking-away-from-open-2026-02-13', 'follows', 0, NULL, '{}'::jsonb),
    ('why-top-talent-is-walking-away-from-open-2026-02-13', 'airbnb-says-a-third-of-its-customer-supp-2026-02-13', 'follows', 0, NULL, '{}'::jsonb),
    ('airbnb-says-a-third-of-its-customer-supp-2026-02-13', 'airbnb-plans-to-bake-in-ai-features-for-2026-02-14', 'follows', 0, NULL, '{}'::jsonb),
    ('airbnb-plans-to-bake-in-ai-features-for-2026-02-14', 'hollywood-isn-8217-t-happy-about-the-ne-2026-02-14', 'follows', 0, NULL, '{}'::jsonb),
    ('hollywood-isn-8217-t-happy-about-the-ne-2026-02-14', 'is-safety-dead-at-xai-2026-02-14', 'follows', 0, NULL, '{}'::jsonb)
    ON CONFLICT DO NOTHING
  `);
  console.log('    Relations: 5');

  console.log('  \u2713 cross-daily-ai-race-2026-02-13: 6 entities, 5 relations, 0 sources');
};
