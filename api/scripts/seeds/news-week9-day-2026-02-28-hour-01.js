/**
 * NOESIS Seed: Daily News — 2026-02-28 01:00 (Week 9, 2026)
 * Namespace: news.week9.day-2026-02-28
 * Built by seed-factory on 2026-02-28
 * Auto-gathered news: 4 stories, 2026-02-28 to 2026-02-28
 * Entities: 4 | Relations: 0 | Sources: 4
 */
module.exports = async function seed_news_week9_day_2026_02_28_hour_01(client) {
  console.log('  \u2192 Seeding: news-week9-day-2026-02-28-hour-01');

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
    ('a-delicate-balance-for-canada-and-a-w-2026-02-28', 'news.week9.day-2026-02-28', 'Event', 'A ''delicate'' balance for Canada and a ''win-win'' for Modi as Carney visits India', NULL, '{"category":"geopolitics","description":"The two countries are repairing a strained relationship as they also seek to reduce their trade reliance on the US."}'::jsonb, '{"timestamp":"2026-02-28T00:03:55.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('pakistan-afghanistan-live-calls-for-dia-2026-02-28', 'news.week9.day-2026-02-28', 'Fact', 'Pakistan-Afghanistan live: Calls for dialogue amid deadly border clashes', NULL, '{"category":"geopolitics","description":"Pakistan said it targeted Taliban forces in Afghanistan''s Kabul, border regions; UN chief says civilians also impacted."}'::jsonb, '{"timestamp":"2026-02-28T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('my-brother-is-paranoid-alone-and-has-fo-2026-02-28', 'news.week9.day-2026-02-28', 'Event', 'My brother is paranoid, alone and has forgotten that he sold his house. How can we help?', NULL, '{"category":"finance.markets","description":"His lawyer said, &#x201c;He&#x2019;s gone off the deep end.&#x201d;"}'::jsonb, '{"timestamp":"2026-02-28T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('how-america-s-action-in-venezuela-guaran-2026-02-28', 'news.week9.day-2026-02-28', 'Event', 'How America’s Action in Venezuela Guaranteed Guyana’s Oil Future', NULL, '{"category":"finance.energy","description":"Once one of South America’s poorest countries, Guyana is now ranked among the world’s richest because of the vast petroleum wealth contained in its territorial waters. A swath of major oil discoveries in the offshore Stabroek Block by operator ExxonMobil, with partners Chevron and CNOOC, saw Guyana "}'::jsonb, '{"timestamp":"2026-02-28T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 4');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('a-delicate-balance-for-canada-and-a-w-2026-02-28', 'article', 'A ''delicate'' balance for Canada and a ''win-win'' for Modi as Carney visits India', 'https://www.bbc.com/news/articles/c1l7q871gnro', 'The two countries are repairing a strained relationship as they also seek to reduce their trade reliance on the US.', 'BBC News', '2026-02-28T00:03:55.000Z'),
    ('pakistan-afghanistan-live-calls-for-dia-2026-02-28', 'article', 'Pakistan-Afghanistan live: Calls for dialogue amid deadly border clashes', 'https://www.aljazeera.com/news/liveblog/2026/2/28/pakistan-afghanistan-live-calls-for-dialogue-amid-deadly-border-clashes', 'Pakistan said it targeted Taliban forces in Afghanistan''s Kabul, border regions; UN chief says civilians also impacted.', 'Al Jazeera', '2026-02-28T00:00:00.000Z'),
    ('my-brother-is-paranoid-alone-and-has-fo-2026-02-28', 'article', 'My brother is paranoid, alone and has forgotten that he sold his house. How can we help?', 'https://www.marketwatch.com/story/my-sister-and-i-are-his-only-family-my-brother-is-paranoid-and-forgot-he-sold-his-house-what-can-i-do-006a8d3a?mod=mw_rss_topstories', 'His lawyer said, &#x201c;He&#x2019;s gone off the deep end.&#x201d;', 'MarketWatch', '2026-02-28T00:00:00.000Z'),
    ('how-america-s-action-in-venezuela-guaran-2026-02-28', 'article', 'How America’s Action in Venezuela Guaranteed Guyana’s Oil Future', 'https://oilprice.com/Energy/Energy-General/How-Americas-Action-in-Venezuela-Guaranteed-Guyanas-Oil-Future.html', 'Once one of South America’s poorest countries, Guyana is now ranked among the world’s richest because of the vast petroleum wealth contained in its territorial waters. A swath of major oil discoveries', 'OilPrice.com', '2026-02-28T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 4');

  console.log('  \u2713 news-week9-day-2026-02-28-hour-01: 4 entities, 0 relations, 4 sources');
};
