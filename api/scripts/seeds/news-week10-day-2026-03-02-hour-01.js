/**
 * NOESIS Seed: Daily News — 2026-03-02 01:00 (Week 10, 2026)
 * Namespace: news.week10.day-2026-03-02
 * Built by seed-factory on 2026-03-02
 * Auto-gathered news: 6 stories, 2026-03-02 to 2026-03-02
 * Entities: 6 | Relations: 0 | Sources: 6
 */
module.exports = async function seed_news_week10_day_2026_03_02_hour_01(client) {
  console.log('  \u2192 Seeding: news-week10-day-2026-03-02-hour-01');

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
    ('news.week10.day-2026-03-02', 'news.week10', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('kidnapping-of-foreigners-soars-in-africa-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Kidnapping of foreigners soars in Africa''s lawless Sahel region', NULL, '{"category":"geopolitics","description":"Growing insecurity in the Sahel made 2025 one of the worst years on record for the abduction of foreigners in Africa."}'::jsonb, '{"timestamp":"2026-03-02T00:02:10.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('trump-says-likely-more-us-casualties-at-2026-03-02', 'news.week10.day-2026-03-02', 'Claim', 'Trump says likely more US casualties, attacks on Iran will continue', NULL, '{"category":"geopolitics","description":"President Donald Trump has ⁠warned combat ⁠operations against Iran will continue until ‘all objectives ‌are achieved’."}'::jsonb, '{"timestamp":"2026-03-02T00:12:18.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('baby-and-patients-evacuated-as-israel-at-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Baby and patients evacuated as Israel attacks Tehran hospital', NULL, '{"category":"geopolitics","description":"A baby in an incubator was evacuated along with patients from the Gandhi Hospital in northern Tehran after strikes."}'::jsonb, '{"timestamp":"2026-03-02T00:05:20.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('hezbollah-promises-to-confront-us-israe-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Hezbollah promises to confront US, Israel over Khamenei killing', NULL, '{"category":"geopolitics","description":"The Lebanese armed group has not taken action against Israel or US assets since the attacks on Iran began on Saturday."}'::jsonb, '{"timestamp":"2026-03-02T00:03:31.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('us-israel-attack-iran-live-trump-vows-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'US, Israel attack Iran live: Trump vows to avenge 3 American soldiers', NULL, '{"category":"geopolitics","description":"Trump says attacks on Iran will continue until all of his objectives are met, as Tehran keeps up raids on US assets."}'::jsonb, '{"timestamp":"2026-03-02T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('china-s-oil-buying-spree-may-be-running-2026-03-02', 'news.week10.day-2026-03-02', 'Claim', 'China’s Oil Buying Spree May Be Running Out of Steam', NULL, '{"category":"finance.energy","description":"China''s imports last year broke yet another record, despite talk of waning oil demand. Since the start of this year, the world’s biggest oil importer has continued buying crude at elevated rates, but this may be about to change as prices extend their rally. Brent crude has been hovering around "}'::jsonb, '{"timestamp":"2026-03-02T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 6');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('kidnapping-of-foreigners-soars-in-africa-2026-03-02', 'article', 'Kidnapping of foreigners soars in Africa''s lawless Sahel region', 'https://www.bbc.com/news/articles/c0lj18d5lx3o', 'Growing insecurity in the Sahel made 2025 one of the worst years on record for the abduction of foreigners in Africa.', 'BBC News', '2026-03-02T00:02:10.000Z'),
    ('trump-says-likely-more-us-casualties-at-2026-03-02', 'article', 'Trump says likely more US casualties, attacks on Iran will continue', 'https://www.aljazeera.com/video/newsfeed/2026/3/2/trump-says-likely-more-us-casualties-attacks-on-iran-will-continue', 'President Donald Trump has ⁠warned combat ⁠operations against Iran will continue until ‘all objectives ‌are achieved’.', 'Al Jazeera', '2026-03-02T00:12:18.000Z'),
    ('baby-and-patients-evacuated-as-israel-at-2026-03-02', 'article', 'Baby and patients evacuated as Israel attacks Tehran hospital', 'https://www.aljazeera.com/video/newsfeed/2026/3/2/baby-and-patients-evacuated-as-israel-attacks-tehran-hospital', 'A baby in an incubator was evacuated along with patients from the Gandhi Hospital in northern Tehran after strikes.', 'Al Jazeera', '2026-03-02T00:05:20.000Z'),
    ('hezbollah-promises-to-confront-us-israe-2026-03-02', 'article', 'Hezbollah promises to confront US, Israel over Khamenei killing', 'https://www.aljazeera.com/news/2026/3/2/hezbollah-promises-to-confront-us-israel-over-khamenei-killing', 'The Lebanese armed group has not taken action against Israel or US assets since the attacks on Iran began on Saturday.', 'Al Jazeera', '2026-03-02T00:03:31.000Z'),
    ('us-israel-attack-iran-live-trump-vows-2026-03-02', 'article', 'US, Israel attack Iran live: Trump vows to avenge 3 American soldiers', 'https://www.aljazeera.com/news/liveblog/2026/3/2/us-israel-attack-iran-live', 'Trump says attacks on Iran will continue until all of his objectives are met, as Tehran keeps up raids on US assets.', 'Al Jazeera', '2026-03-02T00:00:00.000Z'),
    ('china-s-oil-buying-spree-may-be-running-2026-03-02', 'article', 'China’s Oil Buying Spree May Be Running Out of Steam', 'https://oilprice.com/Energy/Energy-General/Chinas-Oil-Buying-Spree-May-Be-Running-Out-of-Steam.html', 'China''s imports last year broke yet another record, despite talk of waning oil demand. Since the start of this year, the world’s biggest oil importer has continued buying crude at elevated rates,', 'OilPrice.com', '2026-03-02T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 6');

  console.log('  \u2713 news-week10-day-2026-03-02-hour-01: 6 entities, 0 relations, 6 sources');
};
