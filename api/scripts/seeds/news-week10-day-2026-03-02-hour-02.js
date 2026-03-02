/**
 * NOESIS Seed: Daily News — 2026-03-02 02:00 (Week 10, 2026)
 * Namespace: news.week10.day-2026-03-02
 * Built by seed-factory on 2026-03-02
 * Auto-gathered news: 13 stories, 2026-03-02 to 2026-03-02
 * Entities: 13 | Relations: 1 | Sources: 13
 * Narratives: Energy Markets
 */
module.exports = async function seed_news_week10_day_2026_03_02_hour_02(client) {
  console.log('  \u2192 Seeding: news-week10-day-2026-03-02-hour-02');

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
    ('oil-prices-jump-after-ships-attacked-nea-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Oil prices jump after ships attacked near Strait of Hormuz', NULL, '{"category":"geopolitics","description":"Experts have warned that a prolonged conflict could push global energy prices even higher."}'::jsonb, '{"timestamp":"2026-03-02T00:36:19.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('kidnapping-of-foreigners-soars-in-africa-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Kidnapping of foreigners soars in Africa''s lawless Sahel region', NULL, '{"category":"geopolitics","description":"Growing insecurity in the Sahel made 2025 one of the worst years on record for the abduction of foreigners in Africa."}'::jsonb, '{"timestamp":"2026-03-02T00:02:10.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('fury-on-pakistan-streets-20-dead-after-2026-03-02', 'news.week10.day-2026-03-02', 'Fact', 'Fury on Pakistan streets, 20 dead, after US-Israel strike kills Khamenei', NULL, '{"category":"geopolitics","description":"At least 20 people killed across Pakistan as demonstrations over strike on Tehran spiral into violence."}'::jsonb, '{"timestamp":"2026-03-02T01:02:36.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('israel-bombs-beirut-after-hezbollah-laun-2026-03-02', 'news.week10.day-2026-03-02', 'Decision', 'Israel bombs Beirut after Hezbollah launches rocket attack', NULL, '{"category":"geopolitics","description":"This is a breaking news story."}'::jsonb, '{"timestamp":"2026-03-02T00:58:41.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('dramatic-moment-iran-s-retaliatory-missi-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Dramatic moment Iran’s retaliatory missile barrage hits Israel', NULL, '{"category":"geopolitics","description":"Israelis filmed the moment an Iranian missile broke through Israel’s air defence systems to strike a target."}'::jsonb, '{"timestamp":"2026-03-02T00:44:01.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('uk-pm-starmer-says-us-can-use-uk-bases-f-2026-03-02', 'news.week10.day-2026-03-02', 'Claim', 'UK PM Starmer says US can use UK bases for ‘defensive strikes’ on Iran', NULL, '{"category":"geopolitics","description":"UK Prime Minister Keir Starmer says he’s accepted a request from the US to let his country’s military bases be used."}'::jsonb, '{"timestamp":"2026-03-02T00:42:33.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('iranian-ballistic-missile-strike-on-west-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Iranian ballistic missile strike on West Jerusalem', NULL, '{"category":"geopolitics","description":"Several people have been injured after an Iranian ballistic missile struck a road in West Jerusalem."}'::jsonb, '{"timestamp":"2026-03-02T00:21:16.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('trump-says-likely-more-us-casualties-at-2026-03-02', 'news.week10.day-2026-03-02', 'Claim', 'Trump says likely more US casualties, attacks on Iran will continue', NULL, '{"category":"geopolitics","description":"President Donald Trump has ⁠warned combat ⁠operations against Iran will continue until ‘all objectives ‌are achieved’."}'::jsonb, '{"timestamp":"2026-03-02T00:12:18.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('baby-and-patients-evacuated-as-israel-at-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Baby and patients evacuated as Israel attacks Tehran hospital', NULL, '{"category":"geopolitics","description":"A baby in an incubator was evacuated along with patients from the Gandhi Hospital in northern Tehran after strikes."}'::jsonb, '{"timestamp":"2026-03-02T00:05:20.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('hezbollah-promises-to-confront-us-israe-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Hezbollah promises to confront US, Israel over Khamenei killing', NULL, '{"category":"geopolitics","description":"The Lebanese armed group has not taken action against Israel or US assets since the attacks on Iran began on Saturday."}'::jsonb, '{"timestamp":"2026-03-02T00:03:31.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('us-israel-attack-iran-live-trump-vows-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'US, Israel attack Iran live: Trump vows to continue attacks, avenge troops', NULL, '{"category":"geopolitics","description":"Trump says attacks on Iran will continue until all of his objectives are met, as Tehran keeps up raids on US assets."}'::jsonb, '{"timestamp":"2026-03-02T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('how-china-s-rare-earth-ban-backfired-int-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'How China’s Rare Earth Ban Backfired into a U.S. Tech Breakthrough', NULL, '{"category":"finance.energy","description":"In a typical Chinese rare earth processing plant, 200 workers move through a maze of massive chemical tanks, risking life and limb to produce the materials that power everything from fighter jets and missile components to cellphones. Hundreds of these facilities operate across China, and they give B"}'::jsonb, '{"timestamp":"2026-03-02T01:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('china-s-oil-buying-spree-may-be-running-2026-03-02', 'news.week10.day-2026-03-02', 'Claim', 'China’s Oil Buying Spree May Be Running Out of Steam', NULL, '{"category":"finance.energy","description":"China''s imports last year broke yet another record, despite talk of waning oil demand. Since the start of this year, the world’s biggest oil importer has continued buying crude at elevated rates, but this may be about to change as prices extend their rally. Brent crude has been hovering around "}'::jsonb, '{"timestamp":"2026-03-02T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 13');

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('china-s-oil-buying-spree-may-be-running-2026-03-02', 'oil-prices-jump-after-ships-attacked-nea-2026-03-02', 'follows', 1, 'Energy Markets', '{}'::jsonb)
    ON CONFLICT DO NOTHING
  `);
  console.log('    Relations: 1');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('oil-prices-jump-after-ships-attacked-nea-2026-03-02', 'article', 'Oil prices jump after ships attacked near Strait of Hormuz', 'https://www.bbc.com/news/articles/c75evve6l63o', 'Experts have warned that a prolonged conflict could push global energy prices even higher.', 'BBC News', '2026-03-02T00:36:19.000Z'),
    ('kidnapping-of-foreigners-soars-in-africa-2026-03-02', 'article', 'Kidnapping of foreigners soars in Africa''s lawless Sahel region', 'https://www.bbc.com/news/articles/c0lj18d5lx3o', 'Growing insecurity in the Sahel made 2025 one of the worst years on record for the abduction of foreigners in Africa.', 'BBC News', '2026-03-02T00:02:10.000Z'),
    ('fury-on-pakistan-streets-20-dead-after-2026-03-02', 'article', 'Fury on Pakistan streets, 20 dead, after US-Israel strike kills Khamenei', 'https://www.aljazeera.com/news/2026/3/2/fury-on-pakistan-streets-20-dead-after-us-israel-strike-kills-khamenei', 'At least 20 people killed across Pakistan as demonstrations over strike on Tehran spiral into violence.', 'Al Jazeera', '2026-03-02T01:02:36.000Z'),
    ('israel-bombs-beirut-after-hezbollah-laun-2026-03-02', 'article', 'Israel bombs Beirut after Hezbollah launches rocket attack', 'https://www.aljazeera.com/news/2026/3/2/israel-bombs-beirut-after-hezbollah-launches-rocket-attack', 'This is a breaking news story.', 'Al Jazeera', '2026-03-02T00:58:41.000Z'),
    ('dramatic-moment-iran-s-retaliatory-missi-2026-03-02', 'article', 'Dramatic moment Iran’s retaliatory missile barrage hits Israel', 'https://www.aljazeera.com/video/newsfeed/2026/3/2/dramatic-moment-irans-retaliatory-missile-barrage-hits-israel', 'Israelis filmed the moment an Iranian missile broke through Israel’s air defence systems to strike a target.', 'Al Jazeera', '2026-03-02T00:44:01.000Z'),
    ('uk-pm-starmer-says-us-can-use-uk-bases-f-2026-03-02', 'article', 'UK PM Starmer says US can use UK bases for ‘defensive strikes’ on Iran', 'https://www.aljazeera.com/video/newsfeed/2026/3/2/uk-pm-starmer-says-us-can-use-uk-bases-for-defensive-strikes-on-iran', 'UK Prime Minister Keir Starmer says he’s accepted a request from the US to let his country’s military bases be used.', 'Al Jazeera', '2026-03-02T00:42:33.000Z'),
    ('iranian-ballistic-missile-strike-on-west-2026-03-02', 'article', 'Iranian ballistic missile strike on West Jerusalem', 'https://www.aljazeera.com/video/newsfeed/2026/3/2/iranian-ballistic-missile-strike-on-west-jerusalem', 'Several people have been injured after an Iranian ballistic missile struck a road in West Jerusalem.', 'Al Jazeera', '2026-03-02T00:21:16.000Z'),
    ('trump-says-likely-more-us-casualties-at-2026-03-02', 'article', 'Trump says likely more US casualties, attacks on Iran will continue', 'https://www.aljazeera.com/video/newsfeed/2026/3/2/trump-says-likely-more-us-casualties-attacks-on-iran-will-continue', 'President Donald Trump has ⁠warned combat ⁠operations against Iran will continue until ‘all objectives ‌are achieved’.', 'Al Jazeera', '2026-03-02T00:12:18.000Z'),
    ('baby-and-patients-evacuated-as-israel-at-2026-03-02', 'article', 'Baby and patients evacuated as Israel attacks Tehran hospital', 'https://www.aljazeera.com/video/newsfeed/2026/3/2/baby-and-patients-evacuated-as-israel-attacks-tehran-hospital', 'A baby in an incubator was evacuated along with patients from the Gandhi Hospital in northern Tehran after strikes.', 'Al Jazeera', '2026-03-02T00:05:20.000Z'),
    ('hezbollah-promises-to-confront-us-israe-2026-03-02', 'article', 'Hezbollah promises to confront US, Israel over Khamenei killing', 'https://www.aljazeera.com/news/2026/3/2/hezbollah-promises-to-confront-us-israel-over-khamenei-killing', 'The Lebanese armed group has not taken action against Israel or US assets since the attacks on Iran began on Saturday.', 'Al Jazeera', '2026-03-02T00:03:31.000Z'),
    ('us-israel-attack-iran-live-trump-vows-2026-03-02', 'article', 'US, Israel attack Iran live: Trump vows to continue attacks, avenge troops', 'https://www.aljazeera.com/news/liveblog/2026/3/2/us-israel-attack-iran-live', 'Trump says attacks on Iran will continue until all of his objectives are met, as Tehran keeps up raids on US assets.', 'Al Jazeera', '2026-03-02T00:00:00.000Z'),
    ('how-china-s-rare-earth-ban-backfired-int-2026-03-02', 'article', 'How China’s Rare Earth Ban Backfired into a U.S. Tech Breakthrough', 'https://oilprice.com/Energy/Energy-General/How-Chinas-Rare-Earth-Ban-Backfired-into-a-US-Tech-Breakthrough.html', 'In a typical Chinese rare earth processing plant, 200 workers move through a maze of massive chemical tanks, risking life and limb to produce the materials that power everything from fighter jets and ', 'OilPrice.com', '2026-03-02T01:00:00.000Z'),
    ('china-s-oil-buying-spree-may-be-running-2026-03-02', 'article', 'China’s Oil Buying Spree May Be Running Out of Steam', 'https://oilprice.com/Energy/Energy-General/Chinas-Oil-Buying-Spree-May-Be-Running-Out-of-Steam.html', 'China''s imports last year broke yet another record, despite talk of waning oil demand. Since the start of this year, the world’s biggest oil importer has continued buying crude at elevated rates,', 'OilPrice.com', '2026-03-02T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 13');

  console.log('  \u2713 news-week10-day-2026-03-02-hour-02: 13 entities, 1 relations, 13 sources');
};
