/**
 * NOESIS Seed: Daily News — 2026-02-21 01:00 (Week 8, 2026)
 * Namespace: news.week8.day-2026-02-21
 * Built by seed-factory on 2026-02-21
 * Auto-gathered news: 2 stories, 2026-02-21 to 2026-02-21
 * Entities: 2 | Relations: 0 | Sources: 2
 */
module.exports = async function seed_news_week8_day_2026_02_21_hour_01(client) {
  console.log('  \u2192 Seeding: news-week8-day-2026-02-21-hour-01');

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
    ('news.week8.day-2026-02-21', 'news.week8', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('trump-imposes-global-10-tariff-and-rail-2026-02-21', 'news.week8.day-2026-02-21', 'Event', 'Trump imposes global 10% tariff and rails against supreme court justices', NULL, '{"category":"finance","description":"<p>President calls decision a ‘disgrace to the nation’ while praising three justices who dissented</p><ul><li><p><a href=\\"https://www.theguardian.com/us-news/live/2026/feb/20/us-iran-nuclear-deal-trump-agreement-strikes-latest-news-live-updates\\">US politics live – latest updates</a></p></li></ul><p>"}'::jsonb, '{"timestamp":"2026-02-21T00:04:01.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('the-quiet-revolution-reshaping-america-2026-02-21', 'news.week8.day-2026-02-21', 'Event', 'The Quiet Revolution Reshaping America''s Energy Future', NULL, '{"category":"finance.energy","description":"A geothermal revolution is unfolding around the United States in ways both flashy and quiet. As Big Tech becomes increasingly involved in developing alternative energy sources to meet skyrocketing energy demand driven by the AI boom, innovative and advanced geothermal technologies have been taking o"}'::jsonb, '{"timestamp":"2026-02-21T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 2');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('trump-imposes-global-10-tariff-and-rail-2026-02-21', 'article', 'Trump imposes global 10% tariff and rails against supreme court justices', 'https://www.theguardian.com/us-news/2026/feb/20/trump-tariff-scotus-response', '<p>President calls decision a ‘disgrace to the nation’ while praising three justices who dissented</p><ul><li><p><a href="https://www.theguardian.com/us-news/live/2026/feb/20/us-iran-nuclear-deal-trum', 'The Guardian', '2026-02-21T00:04:01.000Z'),
    ('the-quiet-revolution-reshaping-america-2026-02-21', 'article', 'The Quiet Revolution Reshaping America''s Energy Future', 'https://oilprice.com/Energy/Energy-General/The-Quiet-Revolution-Reshaping-Americas-Energy-Future.html', 'A geothermal revolution is unfolding around the United States in ways both flashy and quiet. As Big Tech becomes increasingly involved in developing alternative energy sources to meet skyrocketing ene', 'OilPrice.com', '2026-02-21T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 2');

  console.log('  \u2713 news-week8-day-2026-02-21-hour-01: 2 entities, 0 relations, 2 sources');
};
