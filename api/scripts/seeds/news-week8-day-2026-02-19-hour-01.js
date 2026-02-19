/**
 * NOESIS Seed: Daily News — 2026-02-19 01:00 (Week 8, 2026)
 * Namespace: news.week8.day-2026-02-19
 * Built by seed-factory on 2026-02-19
 * Auto-gathered news: 5 stories, 2026-02-19 to 2026-02-19
 * Entities: 5 | Relations: 0 | Sources: 5
 */
module.exports = async function seed_news_week8_day_2026_02_19_hour_01(client) {
  console.log('  \u2192 Seeding: news-week8-day-2026-02-19-hour-01');

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
    ('news.week8.day-2026-02-19', 'news.week8', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('hamas-is-reasserting-control-in-gaza-des-2026-02-19', 'news.week8.day-2026-02-19', 'Event', 'Hamas is reasserting control in Gaza despite its heavy losses fighting Israel', NULL, '{"category":"geopolitics","description":"Gazans say Hamas is again extending its control over security, tax revenue and government services."}'::jsonb, '{"timestamp":"2026-02-19T00:04:44.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('the-two-farms-in-senegal-that-supply-man-2026-02-19', 'news.week8.day-2026-02-19', 'Event', 'The two farms in Senegal that supply many of the UK''s vegetables', NULL, '{"category":"finance","description":"During winter in Britain fresh produce is sent by cargo ship from the West African nation every week."}'::jsonb, '{"timestamp":"2026-02-19T00:16:54.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('south-korea-s-hanwha-makes-a-13-million-2026-02-19', 'news.week8.day-2026-02-19', 'Event', 'South Korea’s Hanwha makes a $13 million bet on ‘seedless’ crypto wallets', NULL, '{"category":"finance.crypto","description":"The South Korean financial firm backs the U.S.-based blockchain company to accelerate enterprise wallet technology and real-world asset tokenization."}'::jsonb, '{"timestamp":"2026-02-19T00:20:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('x2018-the-world-feels-unpredictable-x-2026-02-19', 'news.week8.day-2026-02-19', 'Event', '&#x2018;The world feels unpredictable&#x2019;: I&#x2019;m 56. My husband is 64. Our mortgage costs $17K a month. Do we pay it off?', NULL, '{"category":"finance.markets","description":"&#x201c;We paid $3.1 million for the house and owe $1.3 million on the loan.&#x201d;"}'::jsonb, '{"timestamp":"2026-02-19T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('guyana-emerges-as-the-clear-winner-in-ve-2026-02-19', 'news.week8.day-2026-02-19', 'Event', 'Guyana Emerges as the Clear Winner in Venezuela’s Oil Reset', NULL, '{"category":"finance.energy","description":"One of the biggest winners from the new oil order in Venezuela is its neighbor to the east, Guyana, the country that turned into the newest oil producer in the world thanks to ExxonMobil’s massive oil discoveries.  Since Exxon first found oil in Guyana’s offshore Stabroek block a decade ago, one of "}'::jsonb, '{"timestamp":"2026-02-19T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 5');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('hamas-is-reasserting-control-in-gaza-des-2026-02-19', 'article', 'Hamas is reasserting control in Gaza despite its heavy losses fighting Israel', 'https://www.bbc.com/news/articles/c98g1klxnpxo', 'Gazans say Hamas is again extending its control over security, tax revenue and government services.', 'BBC News', '2026-02-19T00:04:44.000Z'),
    ('the-two-farms-in-senegal-that-supply-man-2026-02-19', 'article', 'The two farms in Senegal that supply many of the UK''s vegetables', 'https://www.bbc.com/news/articles/cwy6171wvppo', 'During winter in Britain fresh produce is sent by cargo ship from the West African nation every week.', 'BBC Business', '2026-02-19T00:16:54.000Z'),
    ('south-korea-s-hanwha-makes-a-13-million-2026-02-19', 'article', 'South Korea’s Hanwha makes a $13 million bet on ‘seedless’ crypto wallets', 'https://www.coindesk.com/business/2026/02/18/south-korea-s-hanwhamakes-a-usd13-million-bet-on-seedless-crypto-wallets', 'The South Korean financial firm backs the U.S.-based blockchain company to accelerate enterprise wallet technology and real-world asset tokenization.', 'CoinDesk', '2026-02-19T00:20:00.000Z'),
    ('x2018-the-world-feels-unpredictable-x-2026-02-19', 'article', '&#x2018;The world feels unpredictable&#x2019;: I&#x2019;m 56. My husband is 64. Our mortgage costs $17K a month. Do we pay it off?', 'https://www.marketwatch.com/story/the-world-feels-unpredictable-im-56-my-husband-is-64-our-mortgage-costs-17-000-a-month-do-we-pay-it-off-c8a454d8?mod=mw_rss_topstories', '&#x201c;We paid $3.1 million for the house and owe $1.3 million on the loan.&#x201d;', 'MarketWatch', '2026-02-19T00:00:00.000Z'),
    ('guyana-emerges-as-the-clear-winner-in-ve-2026-02-19', 'article', 'Guyana Emerges as the Clear Winner in Venezuela’s Oil Reset', 'https://oilprice.com/Energy/Crude-Oil/Guyana-Emerges-as-the-Clear-Winner-in-Venezuelas-Oil-Reset.html', 'One of the biggest winners from the new oil order in Venezuela is its neighbor to the east, Guyana, the country that turned into the newest oil producer in the world thanks to ExxonMobil’s massive oil', 'OilPrice.com', '2026-02-19T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 5');

  console.log('  \u2713 news-week8-day-2026-02-19-hour-01: 5 entities, 0 relations, 5 sources');
};
