/**
 * NOESIS Seed: Daily News — 2026-03-07 01:00 (Week 10, 2026)
 * Namespace: news.week10.day-2026-03-07
 * Built by seed-factory on 2026-03-07
 * Auto-gathered news: 3 stories, 2026-03-07 to 2026-03-07
 * Entities: 3 | Relations: 0 | Sources: 3
 */
module.exports = async function seed_news_week10_day_2026_03_07_hour_01(client) {
  console.log('  \u2192 Seeding: news-week10-day-2026-03-07-hour-01');

  // === NAMESPACE ===
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news', 'default', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news.week10', 'news', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news.week10.day-2026-03-07', 'news.week10', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('cuba-announces-fifth-death-after-shootou-2026-03-07', 'news.week10.day-2026-03-07', 'Decision', 'Cuba announces fifth death after shootout with Florida-tagged speedboat', NULL, '{"category":"geopolitics","description":"The government in Havana has claimed that the 10 people on board speedboat planned to ''unleash terrorism'' in Cuba."}'::jsonb, '{"timestamp":"2026-03-07T00:09:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('iran-war-live-trump-says-no-deal-with-i-2026-03-07', 'news.week10.day-2026-03-07', 'Claim', 'Iran war live: Trump says no deal with Iran until ‘unconditional surrender’', NULL, '{"category":"geopolitics","description":"US-Israeli attacks on Iran continue as Israel''s bombing of Lebanon kills at least 217 people, injures almost 800."}'::jsonb, '{"timestamp":"2026-03-07T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('falling-energy-per-capita-is-the-world-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Falling Energy Per Capita Is the World''s Biggest Problem', NULL, '{"category":"finance.energy","description":"A few years ago, I analyzed the growth of world energy consumption, breaking it down into (a) the growth in energy consumption needed to support the growth in world population, and (b) the growth in energy consumption available to support higher standards of living. This analysis covered the period "}'::jsonb, '{"timestamp":"2026-03-07T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 3');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('cuba-announces-fifth-death-after-shootou-2026-03-07', 'article', 'Cuba announces fifth death after shootout with Florida-tagged speedboat', 'https://www.aljazeera.com/news/2026/3/7/cuba-announces-fifth-death-after-shootout-with-florida-tagged-speedboat', 'The government in Havana has claimed that the 10 people on board speedboat planned to ''unleash terrorism'' in Cuba.', 'Al Jazeera', '2026-03-07T00:09:00.000Z'),
    ('iran-war-live-trump-says-no-deal-with-i-2026-03-07', 'article', 'Iran war live: Trump says no deal with Iran until ‘unconditional surrender’', 'https://www.aljazeera.com/news/liveblog/2026/3/7/iran-war-live-trump-says-no-deal-with-iran-until-unconditional-surrender', 'US-Israeli attacks on Iran continue as Israel''s bombing of Lebanon kills at least 217 people, injures almost 800.', 'Al Jazeera', '2026-03-07T00:00:00.000Z'),
    ('falling-energy-per-capita-is-the-world-2026-03-07', 'article', 'Falling Energy Per Capita Is the World''s Biggest Problem', 'https://oilprice.com/Energy/Energy-General/Falling-Energy-Per-Capita-Is-the-Worlds-Biggest-Problem.html', 'A few years ago, I analyzed the growth of world energy consumption, breaking it down into (a) the growth in energy consumption needed to support the growth in world population, and (b) the growth in e', 'OilPrice.com', '2026-03-07T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 3');

  console.log('  \u2713 news-week10-day-2026-03-07-hour-01: 3 entities, 0 relations, 3 sources');
};
