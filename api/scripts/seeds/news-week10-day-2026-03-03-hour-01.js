/**
 * NOESIS Seed: Daily News — 2026-03-03 01:00 (Week 10, 2026)
 * Namespace: news.week10.day-2026-03-03
 * Built by seed-factory on 2026-03-03
 * Auto-gathered news: 10 stories, 2026-03-03 to 2026-03-03
 * Entities: 10 | Relations: 0 | Sources: 10
 */
module.exports = async function seed_news_week10_day_2026_03_03_hour_01(client) {
  console.log('  \u2192 Seeding: news-week10-day-2026-03-03-hour-01');

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
    ('news.week10.day-2026-03-03', 'news.week10', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('ive-given-up-on-hospitality-the-15-0-2026-03-03', 'news.week10.day-2026-03-03', 'Event', '''I''ve given up on hospitality. The £15,000 pay isn''t worth the stress''', NULL, '{"category":"finance","description":"People in their 20s and 30s tell the BBC how they feel about their finances ahead of the chancellor''s Spring Statement."}'::jsonb, '{"timestamp":"2026-03-03T00:10:14.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('us-s-rubio-tries-to-justify-attacks-on-i-2026-03-03', 'news.week10.day-2026-03-03', 'Event', 'US’s Rubio tries to justify attacks on Iran as driven by self-defence', NULL, '{"category":"geopolitics","description":"Marco Rubio has tried to justify the coordinated attacks with Israel on Iran since Saturday as driven by self-defence."}'::jsonb, '{"timestamp":"2026-03-03T00:13:57.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('us-urges-citizens-to-immediately-leave-o-2026-03-03', 'news.week10.day-2026-03-03', 'Claim', 'US urges citizens to immediately leave over a dozen Middle East countries', NULL, '{"category":"geopolitics","description":"The latest advisory includes Egypt, Israel, Saudi Arabia and Qatar, according to a State Department official."}'::jsonb, '{"timestamp":"2026-03-03T00:07:30.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('iran-live-news-israel-bombs-tehran-bei-2026-03-03', 'news.week10.day-2026-03-03', 'Event', 'Iran live news: Israel bombs Tehran, Beirut; Strait of Hormuz ‘closed’', NULL, '{"category":"geopolitics","description":"Iran strikes energy infrastructure across the Gulf as IRGC announces closure of Strait of Hormuz."}'::jsonb, '{"timestamp":"2026-03-03T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('u-s-senate-housing-bill-includes-cbdc-b-2026-03-03', 'news.week10.day-2026-03-03', 'Event', 'U.S. Senate housing bill includes CBDC ban', NULL, '{"category":"finance.crypto","description":"The Senate Banking Committee''s bipartisan \\"ROAD to Housing Act\\" includes a provision banning the Fed from issuing a CBDC before 2031."}'::jsonb, '{"timestamp":"2026-03-03T00:04:04.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('apple-launches-new-iphone-and-ipad-air-a-2026-03-03', 'news.week10.day-2026-03-03', 'Decision', 'Apple launches new iPhone and iPad Air as it gears up for a major AI push', NULL, '{"category":"finance.markets","description":"The company is boosting the storage capacity of its devices, a move thought to be a prelude to expected Siri enhancements later this year."}'::jsonb, '{"timestamp":"2026-03-03T00:16:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('x2018-i-don-x2019-t-earn-enough-to-su-2026-03-03', 'news.week10.day-2026-03-03', 'Event', '&#x2018;I don&#x2019;t earn enough to support us and our baby&#x2019;: My unemployed husband lost $22,000 trading sports cards. What now?', NULL, '{"category":"finance.markets","description":"&#x201c;I intervened, shut the business down and got him into therapy and support for gambling-type behaviors.&#x201d;"}'::jsonb, '{"timestamp":"2026-03-03T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('first-phosphate-lands-conditional-12-2m-2026-03-03', 'news.week10.day-2026-03-03', 'Event', 'First Phosphate lands conditional $12.2M grant to advance LFP processing plans', NULL, '{"category":"finance.mining","description":"The financial contribution is granted for the completion of a study of the company''s integrated phosphate concentrate project in Saguenay-Lac-Saint-Jean, Quebec."}'::jsonb, '{"timestamp":"2026-03-03T00:29:26.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('qatar-s-latest-lng-mega-award-signals-a-2026-03-03', 'news.week10.day-2026-03-03', 'Event', 'Qatar’s Latest LNG Mega-award Signals a Full Strategic Turn to the West', NULL, '{"category":"finance.energy","description":"From the moment that Russia invaded Ukraine on 24 February 2022, liquefied natural gas (LNG) became the key global emergency energy source. Unlike pipelined energy that requires time-consuming infrastructure build-out and contract negotiations before it can be moved anywhere, LNG can be bought in th"}'::jsonb, '{"timestamp":"2026-03-03T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('chatgpt-uninstalls-surged-by-295-after-2026-03-03', 'news.week10.day-2026-03-03', 'Event', 'ChatGPT uninstalls surged by 295% after DoD deal', NULL, '{"category":"technology.ai","description":"Many consumers ditched ChatGPT''s app after news of its DoD deal went live, while Claude''s downloads grew."}'::jsonb, '{"timestamp":"2026-03-03T00:03:37.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 10');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('ive-given-up-on-hospitality-the-15-0-2026-03-03', 'article', '''I''ve given up on hospitality. The £15,000 pay isn''t worth the stress''', 'https://www.bbc.com/news/articles/c20lz7rkqv4o', 'People in their 20s and 30s tell the BBC how they feel about their finances ahead of the chancellor''s Spring Statement.', 'BBC Business', '2026-03-03T00:10:14.000Z'),
    ('us-s-rubio-tries-to-justify-attacks-on-i-2026-03-03', 'article', 'US’s Rubio tries to justify attacks on Iran as driven by self-defence', 'https://www.aljazeera.com/video/newsfeed/2026/3/3/uss-rubio-tries-to-justify-attacks-on-iran-as-driven-by-self-defence', 'Marco Rubio has tried to justify the coordinated attacks with Israel on Iran since Saturday as driven by self-defence.', 'Al Jazeera', '2026-03-03T00:13:57.000Z'),
    ('us-urges-citizens-to-immediately-leave-o-2026-03-03', 'article', 'US urges citizens to immediately leave over a dozen Middle East countries', 'https://www.aljazeera.com/news/2026/3/3/us-urges-citizens-to-immediately-leave-over-a-dozen-middle-east-countries', 'The latest advisory includes Egypt, Israel, Saudi Arabia and Qatar, according to a State Department official.', 'Al Jazeera', '2026-03-03T00:07:30.000Z'),
    ('iran-live-news-israel-bombs-tehran-bei-2026-03-03', 'article', 'Iran live news: Israel bombs Tehran, Beirut; Strait of Hormuz ‘closed’', 'https://www.aljazeera.com/news/liveblog/2026/3/3/iran-live-news-israel-bombs-tehran-beirut-trump-says-war-to-last-4-weeks', 'Iran strikes energy infrastructure across the Gulf as IRGC announces closure of Strait of Hormuz.', 'Al Jazeera', '2026-03-03T00:00:00.000Z'),
    ('u-s-senate-housing-bill-includes-cbdc-b-2026-03-03', 'article', 'U.S. Senate housing bill includes CBDC ban', 'https://www.coindesk.com/policy/2026/03/02/u-s-senate-housing-bill-includes-cbdc-ban', 'The Senate Banking Committee''s bipartisan "ROAD to Housing Act" includes a provision banning the Fed from issuing a CBDC before 2031.', 'CoinDesk', '2026-03-03T00:04:04.000Z'),
    ('apple-launches-new-iphone-and-ipad-air-a-2026-03-03', 'article', 'Apple launches new iPhone and iPad Air as it gears up for a major AI push', 'https://www.marketwatch.com/story/apple-launches-new-iphone-and-ipad-air-as-it-gears-up-for-a-major-ai-push-570b24ae?mod=mw_rss_topstories', 'The company is boosting the storage capacity of its devices, a move thought to be a prelude to expected Siri enhancements later this year.', 'MarketWatch', '2026-03-03T00:16:00.000Z'),
    ('x2018-i-don-x2019-t-earn-enough-to-su-2026-03-03', 'article', '&#x2018;I don&#x2019;t earn enough to support us and our baby&#x2019;: My unemployed husband lost $22,000 trading sports cards. What now?', 'https://www.marketwatch.com/story/i-dont-earn-enough-to-support-us-and-our-baby-my-husband-is-unemployed-and-lost-22-000-trading-sports-cards-what-now-200c1438?mod=mw_rss_topstories', '&#x201c;I intervened, shut the business down and got him into therapy and support for gambling-type behaviors.&#x201d;', 'MarketWatch', '2026-03-03T00:00:00.000Z'),
    ('first-phosphate-lands-conditional-12-2m-2026-03-03', 'article', 'First Phosphate lands conditional $12.2M grant to advance LFP processing plans', 'https://www.mining.com/first-phosphate-lands-conditional-12-2m-grant-to-advance-lfp-processing-plans/', 'The financial contribution is granted for the completion of a study of the company''s integrated phosphate concentrate project in Saguenay-Lac-Saint-Jean, Quebec.', 'Mining.com', '2026-03-03T00:29:26.000Z'),
    ('qatar-s-latest-lng-mega-award-signals-a-2026-03-03', 'article', 'Qatar’s Latest LNG Mega-award Signals a Full Strategic Turn to the West', 'https://oilprice.com/Energy/Natural-Gas/Qatars-Latest-LNG-Mega-award-Signals-a-Full-Strategic-Turn-to-the-West.html', 'From the moment that Russia invaded Ukraine on 24 February 2022, liquefied natural gas (LNG) became the key global emergency energy source. Unlike pipelined energy that requires time-consuming infrast', 'OilPrice.com', '2026-03-03T00:00:00.000Z'),
    ('chatgpt-uninstalls-surged-by-295-after-2026-03-03', 'article', 'ChatGPT uninstalls surged by 295% after DoD deal', 'https://techcrunch.com/2026/03/02/chatgpt-uninstalls-surged-by-295-after-dod-deal/', 'Many consumers ditched ChatGPT''s app after news of its DoD deal went live, while Claude''s downloads grew.', 'TechCrunch', '2026-03-03T00:03:37.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 10');

  console.log('  \u2713 news-week10-day-2026-03-03-hour-01: 10 entities, 0 relations, 10 sources');
};
