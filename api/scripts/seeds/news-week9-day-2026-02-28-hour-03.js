/**
 * NOESIS Seed: Daily News — 2026-02-28 03:00 (Week 9, 2026)
 * Namespace: news.week9.day-2026-02-28
 * Built by seed-factory on 2026-02-28
 * Auto-gathered news: 9 stories, 2026-02-28 to 2026-02-28
 * Entities: 9 | Relations: 0 | Sources: 9
 */
module.exports = async function seed_news_week9_day_2026_02_28_hour_03(client) {
  console.log('  \u2192 Seeding: news-week9-day-2026-02-28-hour-03');

  // === NAMESPACE ===
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news', 'default', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news.week9', 'news', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news.week9.day-2026-02-28', 'news.week9', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('bill-clinton-asked-about-hot-tub-photo-a-2026-02-28', 'news.week9.day-2026-02-28', 'Event', 'Bill Clinton asked about hot tub photo and testifies he knew ''nothing'' of Epstein crimes', NULL, '{"category":"geopolitics","description":"The former president told the committe that he would never have flown on Epstein''s plane if he \\"had any inkling of what he was doing\\"."}'::jsonb, '{"timestamp":"2026-02-28T01:32:28.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('at-least-11-killed-after-military-plane-2026-02-28', 'news.week9.day-2026-02-28', 'Fact', 'At least 11 killed after military plane carrying banknotes crashes in Bolivia', NULL, '{"category":"geopolitics","description":"The cargo plane crashed while landing in the city of El Alto, reportedly hitting vehicles on a motorway."}'::jsonb, '{"timestamp":"2026-02-28T02:21:31.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('a-delicate-balance-for-canada-and-a-w-2026-02-28', 'news.week9.day-2026-02-28', 'Event', 'A ''delicate'' balance for Canada and a ''win-win'' for Modi as Carney visits India', NULL, '{"category":"geopolitics","description":"The two countries are repairing a strained relationship as they also seek to reduce their trade reliance on the US."}'::jsonb, '{"timestamp":"2026-02-28T00:03:55.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('trump-administration-charges-30-more-peo-2026-02-28', 'news.week9.day-2026-02-28', 'Event', 'Trump administration charges 30 more people for Minnesota church protest', NULL, '{"category":"geopolitics","description":"The expanded indictment targets protesters who rallied at Cities Church in St Paul against Trump''s immigration surge."}'::jsonb, '{"timestamp":"2026-02-28T01:06:22.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('trump-iran-and-geopolitical-mind-games-2026-02-28', 'news.week9.day-2026-02-28', 'Event', 'Trump, Iran and geopolitical mind games', NULL, '{"category":"geopolitics","description":"Incoherent messaging and inconsistent policy positions - Trump’s chaotic Iran gambit."}'::jsonb, '{"timestamp":"2026-02-28T00:30:16.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('pakistan-afghanistan-live-iran-eu-urge-2026-02-28', 'news.week9.day-2026-02-28', 'Fact', 'Pakistan-Afghanistan live: Iran, EU urge dialogue amid deadly clashes', NULL, '{"category":"geopolitics","description":"Pakistan said it targeted Taliban forces in Afghanistan''s Kabul, border regions; UN chief says civilians also impacted."}'::jsonb, '{"timestamp":"2026-02-28T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('my-brother-is-paranoid-alone-and-has-fo-2026-02-28', 'news.week9.day-2026-02-28', 'Event', 'My brother is paranoid, alone and has forgotten that he sold his house. How can we help?', NULL, '{"category":"finance.markets","description":"His lawyer said, &#x201c;He&#x2019;s gone off the deep end.&#x201d;"}'::jsonb, '{"timestamp":"2026-02-28T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('how-america-s-action-in-venezuela-guaran-2026-02-28', 'news.week9.day-2026-02-28', 'Event', 'How America’s Action in Venezuela Guaranteed Guyana’s Oil Future', NULL, '{"category":"finance.energy","description":"Once one of South America’s poorest countries, Guyana is now ranked among the world’s richest because of the vast petroleum wealth contained in its territorial waters. A swath of major oil discoveries in the offshore Stabroek Block by operator ExxonMobil, with partners Chevron and CNOOC, saw Guyana "}'::jsonb, '{"timestamp":"2026-02-28T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('the-air-forces-new-icbm-is-nearly-ready-2026-02-28', 'news.week9.day-2026-02-28', 'Event', 'The Air Force''s new ICBM is nearly ready to fly, but there’s nowhere to put it', NULL, '{"category":"technology","description":"The Air Force''s new ICBM is nearly ready to fly, but there’s nowhere to put it"}'::jsonb, '{"timestamp":"2026-02-28T00:32:24.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 9');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('bill-clinton-asked-about-hot-tub-photo-a-2026-02-28', 'article', 'Bill Clinton asked about hot tub photo and testifies he knew ''nothing'' of Epstein crimes', 'https://www.bbc.com/news/articles/cvg345qvld5o', 'The former president told the committe that he would never have flown on Epstein''s plane if he "had any inkling of what he was doing".', 'BBC News', '2026-02-28T01:32:28.000Z'),
    ('at-least-11-killed-after-military-plane-2026-02-28', 'article', 'At least 11 killed after military plane carrying banknotes crashes in Bolivia', 'https://www.bbc.com/news/articles/c0rjpxxpp49o', 'The cargo plane crashed while landing in the city of El Alto, reportedly hitting vehicles on a motorway.', 'BBC News', '2026-02-28T02:21:31.000Z'),
    ('a-delicate-balance-for-canada-and-a-w-2026-02-28', 'article', 'A ''delicate'' balance for Canada and a ''win-win'' for Modi as Carney visits India', 'https://www.bbc.com/news/articles/c1l7q871gnro', 'The two countries are repairing a strained relationship as they also seek to reduce their trade reliance on the US.', 'BBC News', '2026-02-28T00:03:55.000Z'),
    ('trump-administration-charges-30-more-peo-2026-02-28', 'article', 'Trump administration charges 30 more people for Minnesota church protest', 'https://www.aljazeera.com/news/2026/2/28/trump-administration-charges-30-more-people-for-minnesota-church-protest', 'The expanded indictment targets protesters who rallied at Cities Church in St Paul against Trump''s immigration surge.', 'Al Jazeera', '2026-02-28T01:06:22.000Z'),
    ('trump-iran-and-geopolitical-mind-games-2026-02-28', 'article', 'Trump, Iran and geopolitical mind games', 'https://www.aljazeera.com/video/the-listening-post/2026/2/28/trump-iran-and-geopolitical-mind-games', 'Incoherent messaging and inconsistent policy positions - Trump’s chaotic Iran gambit.', 'Al Jazeera', '2026-02-28T00:30:16.000Z'),
    ('pakistan-afghanistan-live-iran-eu-urge-2026-02-28', 'article', 'Pakistan-Afghanistan live: Iran, EU urge dialogue amid deadly clashes', 'https://www.aljazeera.com/news/liveblog/2026/2/28/pakistan-afghanistan-live-calls-for-dialogue-amid-deadly-border-clashes', 'Pakistan said it targeted Taliban forces in Afghanistan''s Kabul, border regions; UN chief says civilians also impacted.', 'Al Jazeera', '2026-02-28T00:00:00.000Z'),
    ('my-brother-is-paranoid-alone-and-has-fo-2026-02-28', 'article', 'My brother is paranoid, alone and has forgotten that he sold his house. How can we help?', 'https://www.marketwatch.com/story/my-sister-and-i-are-his-only-family-my-brother-is-paranoid-and-forgot-he-sold-his-house-what-can-i-do-006a8d3a?mod=mw_rss_topstories', 'His lawyer said, &#x201c;He&#x2019;s gone off the deep end.&#x201d;', 'MarketWatch', '2026-02-28T00:00:00.000Z'),
    ('how-america-s-action-in-venezuela-guaran-2026-02-28', 'article', 'How America’s Action in Venezuela Guaranteed Guyana’s Oil Future', 'https://oilprice.com/Energy/Energy-General/How-Americas-Action-in-Venezuela-Guaranteed-Guyanas-Oil-Future.html', 'Once one of South America’s poorest countries, Guyana is now ranked among the world’s richest because of the vast petroleum wealth contained in its territorial waters. A swath of major oil discoveries', 'OilPrice.com', '2026-02-28T00:00:00.000Z'),
    ('the-air-forces-new-icbm-is-nearly-ready-2026-02-28', 'article', 'The Air Force''s new ICBM is nearly ready to fly, but there’s nowhere to put it', 'https://arstechnica.com/space/2026/02/the-air-forces-new-icbm-is-nearly-ready-to-fly-but-theres-nowhere-to-put-them/', NULL, 'Ars Technica', '2026-02-28T00:32:24.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 9');

  console.log('  \u2713 news-week9-day-2026-02-28-hour-03: 9 entities, 0 relations, 9 sources');
};
