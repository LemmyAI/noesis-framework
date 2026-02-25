/**
 * NOESIS Seed: Daily News — 2026-02-25 01:00 (Week 9, 2026)
 * Namespace: news.week9.day-2026-02-25
 * Built by seed-factory on 2026-02-25
 * Auto-gathered news: 6 stories, 2026-02-25 to 2026-02-25
 * Entities: 6 | Relations: 0 | Sources: 6
 */
module.exports = async function seed_news_week9_day_2026_02_25_hour_01(client) {
  console.log('  \u2192 Seeding: news-week9-day-2026-02-25-hour-01');

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
    ('us-department-of-justice-sues-ucla-over-2026-02-25', 'news.week9.day-2026-02-25', 'Event', 'US Department of Justice sues UCLA over anti-Semitism allegations', NULL, '{"category":"geopolitics","description":"Trump administration has sought to penalise pro-Palestine political activity and deport foreign-born student activists."}'::jsonb, '{"timestamp":"2026-02-25T00:00:31.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('could-stripe-x2018-salvage-x2019-pay-2026-02-25', 'news.week9.day-2026-02-25', 'Claim', 'Could Stripe &#x2018;salvage&#x2019; PayPal? What Wall Street has to say about the latest takeover talk.', NULL, '{"category":"finance.markets","description":"PayPal has underinvested in its consumer business, an analyst says. But Stripe could still find value in it."}'::jsonb, '{"timestamp":"2026-02-25T00:13:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('lamborghini-scraps-lanzador-as-ev-superc-2026-02-25', 'news.week9.day-2026-02-25', 'Event', 'Lamborghini Scraps Lanzador as EV Supercar Demand Fizzles', NULL, '{"category":"finance.energy","description":"Big legacy U.S. and European automakers are frantically dialing back their electric vehicle bets, scaling back once-hyped roadmaps to full electrification as demand for these vehicles implodes. The latest automaker to reverse course is not a mass-market sedan or SUV maker, but a luxury supercar bran"}'::jsonb, '{"timestamp":"2026-02-25T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 6');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('energy-bills-to-fall-in-april-after-char-2026-02-25', 'article', 'Energy bills to fall in April after charges shake-up', 'https://www.bbc.com/news/articles/cx2lpl9lxw2o', 'Changes announced in the Budget mean domestic energy prices should fall sharply in April.', 'BBC Business', '2026-02-25T00:04:55.000Z'),
    ('paramount-boosts-warner-bros-offer-to-ri-2026-02-25', 'article', 'Paramount boosts Warner Bros offer to rival Netflix in takeover bid', 'https://www.bbc.com/news/articles/c24dz0683dyo', 'Warner Bros says the latest proposal could convince it to abandon the deal it struck with Netflix.', 'BBC Business', '2026-02-25T00:01:02.000Z'),
    ('what-is-the-uks-new-travel-system-and-h-2026-02-25', 'article', 'What is the UK''s new travel system and how are dual nationals affected?', 'https://www.bbc.com/news/articles/cy57p1v61d1o', 'From 25 February, a new system will come into force which will affect many people, including British dual nationals.', 'BBC Business', '2026-02-25T00:05:49.000Z'),
    ('us-department-of-justice-sues-ucla-over-2026-02-25', 'article', 'US Department of Justice sues UCLA over anti-Semitism allegations', 'https://www.aljazeera.com/news/2026/2/25/us-department-of-justice-sues-ucla-over-anti-semitism-allegations', 'Trump administration has sought to penalise pro-Palestine political activity and deport foreign-born student activists.', 'Al Jazeera', '2026-02-25T00:00:31.000Z'),
    ('could-stripe-x2018-salvage-x2019-pay-2026-02-25', 'article', 'Could Stripe &#x2018;salvage&#x2019; PayPal? What Wall Street has to say about the latest takeover talk.', 'https://www.marketwatch.com/story/could-stripe-salvage-paypal-what-wall-street-has-to-say-about-the-latest-takeover-talk-815c4e9a?mod=mw_rss_topstories', 'PayPal has underinvested in its consumer business, an analyst says. But Stripe could still find value in it.', 'MarketWatch', '2026-02-25T00:13:00.000Z'),
    ('lamborghini-scraps-lanzador-as-ev-superc-2026-02-25', 'article', 'Lamborghini Scraps Lanzador as EV Supercar Demand Fizzles', 'https://oilprice.com/Energy/Energy-General/Lamborghini-Scraps-Lanzador-as-EV-Supercar-Demand-Fizzles.html', 'Big legacy U.S. and European automakers are frantically dialing back their electric vehicle bets, scaling back once-hyped roadmaps to full electrification as demand for these vehicles implodes. The la', 'OilPrice.com', '2026-02-25T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 6');

  console.log('  \u2713 news-week9-day-2026-02-25-hour-01: 6 entities, 0 relations, 6 sources');
};
