/**
 * NOESIS Seed: Daily News — 2026-02-25 02:00 (Week 9, 2026)
 * Namespace: news.week9.day-2026-02-25
 * Built by seed-factory on 2026-02-25
 * Auto-gathered news: 12 stories, 2026-02-25 to 2026-02-25
 * Entities: 12 | Relations: 1 | Sources: 12
 * Narratives: Energy Markets
 */
module.exports = async function seed_news_week9_day_2026_02_25_hour_02(client) {
  console.log('  \u2192 Seeding: news-week9-day-2026-02-25-hour-02');

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
    ('news.week9.day-2026-02-25', 'news.week9', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('energy-bills-to-fall-in-april-after-char-2026-02-25', 'news.week9.day-2026-02-25', 'Event', 'Energy bills to fall in April after charges shake-up', NULL, '{"category":"finance","description":"Changes announced in the Budget mean domestic energy prices should fall sharply in April."}'::jsonb, '{"timestamp":"2026-02-25T00:04:55.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('paramount-boosts-warner-bros-offer-to-ri-2026-02-25', 'news.week9.day-2026-02-25', 'Event', 'Paramount boosts Warner Bros offer to rival Netflix in takeover bid', NULL, '{"category":"finance","description":"Warner Bros says the latest proposal could convince it to abandon the deal it struck with Netflix."}'::jsonb, '{"timestamp":"2026-02-25T00:01:02.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('what-is-the-uks-new-travel-system-and-h-2026-02-25', 'news.week9.day-2026-02-25', 'Event', 'What is the UK''s new travel system and how are dual nationals affected?', NULL, '{"category":"finance","description":"From 25 February, a new system will come into force which will affect many people, including British dual nationals."}'::jsonb, '{"timestamp":"2026-02-25T00:05:49.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('russia-ukraine-war-list-of-key-events-2026-02-25', 'news.week9.day-2026-02-25', 'Event', 'Russia-Ukraine war: List of key events, day 1,462', NULL, '{"category":"geopolitics","description":"These are the key developments from day 1,462 of Russia''s war on Ukraine."}'::jsonb, '{"timestamp":"2026-02-25T00:54:48.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('suspect-four-victims-dead-after-stabbin-2026-02-25', 'news.week9.day-2026-02-25', 'Fact', 'Suspect, four victims dead after stabbing attack in US state of Washington', NULL, '{"category":"geopolitics","description":"A 32-year-old suspect stabbed four people to death before being shot by a sheriff’s deputy near Tacoma, Washington."}'::jsonb, '{"timestamp":"2026-02-25T00:26:56.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('us-department-of-justice-sues-ucla-over-2026-02-25', 'news.week9.day-2026-02-25', 'Event', 'US Department of Justice sues UCLA over anti-Semitism allegations', NULL, '{"category":"geopolitics","description":"Trump administration has sought to penalise pro-Palestine political activity and deport foreign-born student activists."}'::jsonb, '{"timestamp":"2026-02-25T00:00:31.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('cava-says-diners-are-doing-better-this-y-2026-02-25', 'news.week9.day-2026-02-25', 'Claim', 'Cava says diners are doing better this year &#x2014; and may be getting tired of chasing meal deals', NULL, '{"category":"finance.markets","description":"Cava issued an upbeat sales forecast for this year, as cautious customers shook off the effects of snowstorms and last year&#x2019;s government shutdown to return to the Mediterranean fast-casual chain for bowls and salads."}'::jsonb, '{"timestamp":"2026-02-25T01:26:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('workday-x2019-s-stock-dives-as-earnings-2026-02-25', 'news.week9.day-2026-02-25', 'Event', 'Workday&#x2019;s stock dives as earnings reveal the cost of competing in AI', NULL, '{"category":"finance.markets","description":"Workday&#x2019;s margin outlook came up short of expectations as the company steps up AI investments."}'::jsonb, '{"timestamp":"2026-02-25T01:24:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('could-stripe-x2018-salvage-x2019-pay-2026-02-25', 'news.week9.day-2026-02-25', 'Claim', 'Could Stripe &#x2018;salvage&#x2019; PayPal? What Wall Street has to say about the latest takeover talk.', NULL, '{"category":"finance.markets","description":"PayPal has underinvested in its consumer business, an analyst says. But Stripe could still find value in it."}'::jsonb, '{"timestamp":"2026-02-25T00:13:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('canada-s-oil-patch-swept-up-in-record-3-2026-02-25', 'news.week9.day-2026-02-25', 'Event', 'Canada’s Oil Patch Swept Up in Record $38B Consolidation Wave', NULL, '{"category":"finance.energy","description":"Previously, we reported that the U.S. Shale Patch has witnessed a big slump in corporate buyouts in recent years as premium acreage depletes and volatile energy prices keep buyers on the sidelines. Following a record $192 billion in mergers and acquisitions announced in 2023 and $105 billion in 2024"}'::jsonb, '{"timestamp":"2026-02-25T01:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('lamborghini-scraps-lanzador-as-ev-superc-2026-02-25', 'news.week9.day-2026-02-25', 'Event', 'Lamborghini Scraps Lanzador as EV Supercar Demand Fizzles', NULL, '{"category":"finance.energy","description":"Big legacy U.S. and European automakers are frantically dialing back their electric vehicle bets, scaling back once-hyped roadmaps to full electrification as demand for these vehicles implodes. The latest automaker to reverse course is not a mass-market sedan or SUV maker, but a luxury supercar bran"}'::jsonb, '{"timestamp":"2026-02-25T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('nvidia-challenger-ai-chip-startup-matx-r-2026-02-25', 'news.week9.day-2026-02-25', 'Event', 'Nvidia challenger AI chip startup MatX raised $500M', NULL, '{"category":"technology.ai","description":"The startup was founded by former Google TPU engineers in 2023."}'::jsonb, '{"timestamp":"2026-02-25T00:45:47.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 12');

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('energy-bills-to-fall-in-april-after-char-2026-02-25', 'canada-s-oil-patch-swept-up-in-record-3-2026-02-25', 'causes', 1, 'Energy Markets', '{}'::jsonb)
    ON CONFLICT DO NOTHING
  `);
  console.log('    Relations: 1');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('energy-bills-to-fall-in-april-after-char-2026-02-25', 'article', 'Energy bills to fall in April after charges shake-up', 'https://www.bbc.com/news/articles/cx2lpl9lxw2o', 'Changes announced in the Budget mean domestic energy prices should fall sharply in April.', 'BBC Business', '2026-02-25T00:04:55.000Z'),
    ('paramount-boosts-warner-bros-offer-to-ri-2026-02-25', 'article', 'Paramount boosts Warner Bros offer to rival Netflix in takeover bid', 'https://www.bbc.com/news/articles/c24dz0683dyo', 'Warner Bros says the latest proposal could convince it to abandon the deal it struck with Netflix.', 'BBC Business', '2026-02-25T00:01:02.000Z'),
    ('what-is-the-uks-new-travel-system-and-h-2026-02-25', 'article', 'What is the UK''s new travel system and how are dual nationals affected?', 'https://www.bbc.com/news/articles/cy57p1v61d1o', 'From 25 February, a new system will come into force which will affect many people, including British dual nationals.', 'BBC Business', '2026-02-25T00:05:49.000Z'),
    ('russia-ukraine-war-list-of-key-events-2026-02-25', 'article', 'Russia-Ukraine war: List of key events, day 1,462', 'https://www.aljazeera.com/news/2026/2/25/russia-ukraine-war-list-of-key-events-day-1462', 'These are the key developments from day 1,462 of Russia''s war on Ukraine.', 'Al Jazeera', '2026-02-25T00:54:48.000Z'),
    ('suspect-four-victims-dead-after-stabbin-2026-02-25', 'article', 'Suspect, four victims dead after stabbing attack in US state of Washington', 'https://www.aljazeera.com/news/2026/2/25/suspect-four-victims-dead-after-stabbing-attack-in-us-state-of-washington', 'A 32-year-old suspect stabbed four people to death before being shot by a sheriff’s deputy near Tacoma, Washington.', 'Al Jazeera', '2026-02-25T00:26:56.000Z'),
    ('us-department-of-justice-sues-ucla-over-2026-02-25', 'article', 'US Department of Justice sues UCLA over anti-Semitism allegations', 'https://www.aljazeera.com/news/2026/2/25/us-department-of-justice-sues-ucla-over-anti-semitism-allegations', 'Trump administration has sought to penalise pro-Palestine political activity and deport foreign-born student activists.', 'Al Jazeera', '2026-02-25T00:00:31.000Z'),
    ('cava-says-diners-are-doing-better-this-y-2026-02-25', 'article', 'Cava says diners are doing better this year &#x2014; and may be getting tired of chasing meal deals', 'https://www.marketwatch.com/story/cava-says-diners-are-doing-better-this-year-and-could-be-getting-tired-of-chasing-meal-deals-25d062fe?mod=mw_rss_topstories', 'Cava issued an upbeat sales forecast for this year, as cautious customers shook off the effects of snowstorms and last year&#x2019;s government shutdown to return to the Mediterranean fast-casual chai', 'MarketWatch', '2026-02-25T01:26:00.000Z'),
    ('workday-x2019-s-stock-dives-as-earnings-2026-02-25', 'article', 'Workday&#x2019;s stock dives as earnings reveal the cost of competing in AI', 'https://www.marketwatch.com/story/workdays-stock-dives-as-earnings-reveal-the-cost-of-competing-in-ai-3578985b?mod=mw_rss_topstories', 'Workday&#x2019;s margin outlook came up short of expectations as the company steps up AI investments.', 'MarketWatch', '2026-02-25T01:24:00.000Z'),
    ('could-stripe-x2018-salvage-x2019-pay-2026-02-25', 'article', 'Could Stripe &#x2018;salvage&#x2019; PayPal? What Wall Street has to say about the latest takeover talk.', 'https://www.marketwatch.com/story/could-stripe-salvage-paypal-what-wall-street-has-to-say-about-the-latest-takeover-talk-815c4e9a?mod=mw_rss_topstories', 'PayPal has underinvested in its consumer business, an analyst says. But Stripe could still find value in it.', 'MarketWatch', '2026-02-25T00:13:00.000Z'),
    ('canada-s-oil-patch-swept-up-in-record-3-2026-02-25', 'article', 'Canada’s Oil Patch Swept Up in Record $38B Consolidation Wave', 'https://oilprice.com/Energy/Crude-Oil/Canadas-Oil-Patch-Swept-Up-in-Record-38B-Consolidation-Wave.html', 'Previously, we reported that the U.S. Shale Patch has witnessed a big slump in corporate buyouts in recent years as premium acreage depletes and volatile energy prices keep buyers on the sidelines. Fo', 'OilPrice.com', '2026-02-25T01:00:00.000Z'),
    ('lamborghini-scraps-lanzador-as-ev-superc-2026-02-25', 'article', 'Lamborghini Scraps Lanzador as EV Supercar Demand Fizzles', 'https://oilprice.com/Energy/Energy-General/Lamborghini-Scraps-Lanzador-as-EV-Supercar-Demand-Fizzles.html', 'Big legacy U.S. and European automakers are frantically dialing back their electric vehicle bets, scaling back once-hyped roadmaps to full electrification as demand for these vehicles implodes. The la', 'OilPrice.com', '2026-02-25T00:00:00.000Z'),
    ('nvidia-challenger-ai-chip-startup-matx-r-2026-02-25', 'article', 'Nvidia challenger AI chip startup MatX raised $500M', 'https://techcrunch.com/2026/02/24/nvidia-challenger-ai-chip-startup-matx-raised-500m/', 'The startup was founded by former Google TPU engineers in 2023.', 'TechCrunch', '2026-02-25T00:45:47.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 12');

  console.log('  \u2713 news-week9-day-2026-02-25-hour-02: 12 entities, 1 relations, 12 sources');
};
