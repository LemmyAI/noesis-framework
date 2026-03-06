/**
 * NOESIS Seed: Daily News — 2026-03-06 01:00 (Week 10, 2026)
 * Namespace: news.week10.day-2026-03-06
 * Built by seed-factory on 2026-03-06
 * Auto-gathered news: 7 stories, 2026-03-06 to 2026-03-06
 * Entities: 7 | Relations: 0 | Sources: 7
 */
module.exports = async function seed_news_week10_day_2026_03_06_hour_01(client) {
  console.log('  \u2192 Seeding: news-week10-day-2026-03-06-hour-01');

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
    ('news.week10.day-2026-03-06', 'news.week10', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('one-in-7-shops-in-uk-has-turned-cashless-2026-03-06', 'news.week10.day-2026-03-06', 'Event', 'One in 7 shops in UK has turned cashless in the past year, survey finds', NULL, '{"category":"finance","description":"Some 14% of small High Street traders have gone card-only in the last year, a survey suggests."}'::jsonb, '{"timestamp":"2026-03-06T00:05:41.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('five-ways-the-iran-war-could-affect-you-2026-03-06', 'news.week10.day-2026-03-06', 'Claim', 'Five ways the Iran war could affect you - in charts', NULL, '{"category":"finance","description":"With fuel and gas prices having risen in recent days, here are some ways the conflict could affect households."}'::jsonb, '{"timestamp":"2026-03-06T00:05:31.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('can-snacks-help-you-sleep-2026-03-06', 'news.week10.day-2026-03-06', 'Event', 'Can snacks help you sleep?', NULL, '{"category":"finance","description":"Chocolates, bars, gummies and drinks promise to help you sleep, but is the science behind them sound?"}'::jsonb, '{"timestamp":"2026-03-06T00:05:51.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('iran-live-trump-says-iran-being-demoli-2026-03-06', 'news.week10.day-2026-03-06', 'Claim', 'Iran live: Trump says Iran being ‘demolished’; Tehran keeps up Gulf attacks', NULL, '{"category":"geopolitics","description":"Iran Foreign Minister Abbas Araghchi says ''no reason why we should negotiate with the US'' as Washington is untrustworthy"}'::jsonb, '{"timestamp":"2026-03-06T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('here-x2019-s-what-x2019-s-worth-stream-2026-03-06', 'news.week10.day-2026-03-06', 'Event', 'Here&#x2019;s what&#x2019;s worth streaming in March 2026 on Netflix, Hulu, HBO Max and more', NULL, '{"category":"finance.markets","description":"Shows like HBO&#x2019;s &#x2018;DTF St. Louis&#x2019; and &#x2018;Rooster,&#x2019; Paramount&#x2019;s &#x2018;The Madison&#x2019; and Netflix&#x2019;s &#x2018;Peaky Blinders&#x2019; movie jump out of the gate as Emmy season gets underway"}'::jsonb, '{"timestamp":"2026-03-06T00:30:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('why-broadcom-x2019-s-earnings-report-ha-2026-03-06', 'news.week10.day-2026-03-06', 'Event', 'Why Broadcom&#x2019;s earnings report has Wall Street so upbeat on a bad day for chip stocks', NULL, '{"category":"finance.markets","description":"The chip maker said it has visibility into more than $100 billion in AI chip revenue in 2027, and some analysts see even more upside."}'::jsonb, '{"timestamp":"2026-03-06T00:19:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('u-s-shale-won-t-replace-lost-middle-eas-2026-03-06', 'news.week10.day-2026-03-06', 'Event', 'U.S. Shale Won’t Replace Lost Middle East Oil', NULL, '{"category":"finance.energy","description":"The U.S. shale patch cannot and will not come to the rescue of a potentially catastrophic loss of crude supply from the Middle East as the war in Iran set fire to the world’s most important oil-producing region. The escalating war and the de facto closing of the Strait of Hormuz is threatening to ho"}'::jsonb, '{"timestamp":"2026-03-06T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 7');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('one-in-7-shops-in-uk-has-turned-cashless-2026-03-06', 'article', 'One in 7 shops in UK has turned cashless in the past year, survey finds', 'https://www.bbc.com/news/articles/cm211jnz568o', 'Some 14% of small High Street traders have gone card-only in the last year, a survey suggests.', 'BBC Business', '2026-03-06T00:05:41.000Z'),
    ('five-ways-the-iran-war-could-affect-you-2026-03-06', 'article', 'Five ways the Iran war could affect you - in charts', 'https://www.bbc.com/news/articles/c4g5574pwreo', 'With fuel and gas prices having risen in recent days, here are some ways the conflict could affect households.', 'BBC Business', '2026-03-06T00:05:31.000Z'),
    ('can-snacks-help-you-sleep-2026-03-06', 'article', 'Can snacks help you sleep?', 'https://www.bbc.com/news/articles/cd6znvjvw3wo', 'Chocolates, bars, gummies and drinks promise to help you sleep, but is the science behind them sound?', 'BBC Business', '2026-03-06T00:05:51.000Z'),
    ('iran-live-trump-says-iran-being-demoli-2026-03-06', 'article', 'Iran live: Trump says Iran being ‘demolished’; Tehran keeps up Gulf attacks', 'https://www.aljazeera.com/news/liveblog/2026/3/6/iran-live-trump-says-iran-being-demolished-tehran-keeps-up-gulf-attacks', 'Iran Foreign Minister Abbas Araghchi says ''no reason why we should negotiate with the US'' as Washington is untrustworthy', 'Al Jazeera', '2026-03-06T00:00:00.000Z'),
    ('here-x2019-s-what-x2019-s-worth-stream-2026-03-06', 'article', 'Here&#x2019;s what&#x2019;s worth streaming in March 2026 on Netflix, Hulu, HBO Max and more', 'https://www.marketwatch.com/story/heres-whats-worth-streaming-in-march-2026-on-netflix-hulu-hbo-max-and-more-83f5b64d?mod=mw_rss_topstories', 'Shows like HBO&#x2019;s &#x2018;DTF St. Louis&#x2019; and &#x2018;Rooster,&#x2019; Paramount&#x2019;s &#x2018;The Madison&#x2019; and Netflix&#x2019;s &#x2018;Peaky Blinders&#x2019; movie jump out of ', 'MarketWatch', '2026-03-06T00:30:00.000Z'),
    ('why-broadcom-x2019-s-earnings-report-ha-2026-03-06', 'article', 'Why Broadcom&#x2019;s earnings report has Wall Street so upbeat on a bad day for chip stocks', 'https://www.marketwatch.com/story/why-broadcoms-earnings-report-has-wall-street-so-upbeat-on-a-bad-day-for-chip-stocks-8ff9306e?mod=mw_rss_topstories', 'The chip maker said it has visibility into more than $100 billion in AI chip revenue in 2027, and some analysts see even more upside.', 'MarketWatch', '2026-03-06T00:19:00.000Z'),
    ('u-s-shale-won-t-replace-lost-middle-eas-2026-03-06', 'article', 'U.S. Shale Won’t Replace Lost Middle East Oil', 'https://oilprice.com/Energy/Crude-Oil/US-Shale-Wont-Replace-Lost-Middle-East-Oil.html', 'The U.S. shale patch cannot and will not come to the rescue of a potentially catastrophic loss of crude supply from the Middle East as the war in Iran set fire to the world’s most important oil-produc', 'OilPrice.com', '2026-03-06T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 7');

  console.log('  \u2713 news-week10-day-2026-03-06-hour-01: 7 entities, 0 relations, 7 sources');
};
