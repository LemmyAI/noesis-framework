/**
 * NOESIS Seed: Daily News — 2026-02-22 12:00 (Week 8, 2026)
 * Namespace: news.week8.day-2026-02-22
 * Built by seed-factory on 2026-02-22
 * Auto-gathered news: 14 stories, 2026-02-22 to 2026-02-22
 * Entities: 14 | Relations: 1 | Sources: 14
 * Narratives: Energy Markets
 */
module.exports = async function seed_news_week8_day_2026_02_22_hour_12(client) {
  console.log('  \u2192 Seeding: news-week8-day-2026-02-22-hour-12');

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
    ('news.week8.day-2026-02-22', 'news.week8', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('pakistan-launches-deadly-strikes-on-afgh-2026-02-22', 'news.week8.day-2026-02-22', 'Decision', 'Pakistan launches deadly strikes on Afghanistan', NULL, '{"category":"geopolitics","description":"Pakistan says the strikes were retaliation for recent suicide bombings in the country."}'::jsonb, '{"timestamp":"2026-02-22T10:59:05.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('us-ambassadors-israel-comments-condemne-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'US ambassador''s Israel comments condemned by Arab and Muslim nations', NULL, '{"category":"geopolitics","description":"Mike Huckabee suggested Israel would be justified in taking much of the Middle East on Biblical grounds."}'::jsonb, '{"timestamp":"2026-02-22T11:23:20.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('more-than-1-500-venezuelan-political-pri-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'More than 1,500 Venezuelan political prisoners apply for amnesty', NULL, '{"category":"geopolitics","description":"The announcement by the head of Venezuela''s National Assembly comes amid US pressure following the capture of ex-President Nicolás Maduro."}'::jsonb, '{"timestamp":"2026-02-22T05:04:57.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('willie-col-n-trombonist-who-pioneered-s-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'Willie Colón, trombonist who pioneered salsa music, dies aged 75', NULL, '{"category":"geopolitics","description":"His career spanned 60 years and dozens of albums and had been named among the most influential Latino artists of all time."}'::jsonb, '{"timestamp":"2026-02-22T01:49:42.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('final-missing-lake-tahoe-skier-found-dea-2026-02-22', 'news.week8.day-2026-02-22', 'Fact', 'Final missing Lake Tahoe skier found dead 5 days after avalanche', NULL, '{"category":"geopolitics","description":"Authorities released the names of the six women and three guides who died in the worst avalanche in state history."}'::jsonb, '{"timestamp":"2026-02-22T02:06:23.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('trump-says-he-will-increase-his-new-glob-2026-02-22', 'news.week8.day-2026-02-22', 'Claim', 'Trump says he will increase his new global tariffs to 15%', NULL, '{"category":"finance","description":"After most of his tariffs were outlawed on Friday, Trump announced new global tariffs of 10% - which he says he has now increased to 15%."}'::jsonb, '{"timestamp":"2026-02-22T08:08:24.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('mps-to-discuss-inquiry-into-trade-envoy-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'MPs to discuss inquiry into trade envoy role after Andrew arrest', NULL, '{"category":"finance","description":"A cross-party committee will also look into the appointment and accountability of UK trade envoys."}'::jsonb, '{"timestamp":"2026-02-22T06:00:54.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('high-energy-prices-threaten-uk-s-status-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'High energy prices threaten UK’s status as manufacturing power, business groups say', NULL, '{"category":"finance","description":"<p>CBI and Energy UK report finds 40% of firms have cut investment as electricity costs remain far above pre-Ukraine levels</p><ul><li><p><a href=\\"https://www.theguardian.com/business/2026/feb/22/food-production-hike-in-energy-standing-charges-inflation\\">‘It’s a ticking timebomb’: food producers sou"}'::jsonb, '{"timestamp":"2026-02-22T07:00:32.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('china-overtakes-us-as-germany-s-top-trad-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'China overtakes US as Germany’s top trading partner', NULL, '{"category":"finance","description":"<p>Friedrich Merz to meet Xi Jinping in Beijing as China overtakes US as country’s leading export destination</p><p>China has overtaken the US as Germany’s top trading partner, figures have shown, as the chancellor, Friedrich Merz, prepares for his first visit to Beijing since taking office.</p><p>M"}'::jsonb, '{"timestamp":"2026-02-22T10:51:40.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('it-s-a-ticking-timebomb-food-producer-2026-02-22', 'news.week8.day-2026-02-22', 'Event', '‘It’s a ticking timebomb’: food producers sound alarm on rise in energy charges', NULL, '{"category":"finance","description":"<p>Indoor growers warn April price jump will hinder sector’s competitiveness and drive up costs for consumers</p><ul><li><p><a href=\\"https://www.theguardian.com/business/2026/feb/22/high-energy-prices-threaten-uks-status-as-manufacturing-power-business-groups-say\\">High energy prices threaten UK’s st"}'::jsonb, '{"timestamp":"2026-02-22T10:25:54.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('romance-fraud-warning-over-scam-that-tu-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'Romance fraud: warning over scam that turns victims into insurance cheats', NULL, '{"category":"finance","description":"<p>Insurers say cases of scammers manipulating people into staging crashes and filing bogus claims are under-reported</p><p>Romance fraud typically evokes images of people being <a href=\\"https://www.theguardian.com/lifeandstyle/2025/nov/11/seven-sly-savage-stages-of-a-romance-scam\\">tricked out of th"}'::jsonb, '{"timestamp":"2026-02-22T07:00:31.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('thailand-moves-to-cut-sugar-in-popular-d-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'Thailand moves to cut sugar in popular drinks amid health drive', NULL, '{"category":"finance","description":"<p>Major chains agree to halve default sweetness, but street vendors and cafes remain outside sugar tax rules</p><p>A crowd of customers, holding phones aloft, watch intently as Auntie Nid mixes up her bestseller: an iced Thai tea.</p><p>Condensed milk is poured into a glass, followed by three heape"}'::jsonb, '{"timestamp":"2026-02-22T05:00:27.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('mentioning-bitcoin-or-crypto-on-ai-age-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'Mentioning ''bitcoin'' or crypto on AI agent OpenClaw''s Discord will get you banned', NULL, '{"category":"finance.crypto","description":"The project''s creator nearly deleted the viral AI agent after crypto scammers hijacked his accounts, launched a fake token that hit $16 million, and harassed him for weeks."}'::jsonb, '{"timestamp":"2026-02-22T05:37:18.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('copper-unlikely-to-follow-near-term-gold-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'Copper Unlikely to Follow Near-Term Gold Rally', NULL, '{"category":"finance.energy","description":"Copper prices rallied to a record high of over $13,000 per ton last month, but retreated to about $12,700 this week as expectations of long-term demand strength collided with massive stockpiling at the key exchange hubs in the U.S. and China. Despite an unchanged outlook of soaring copper demand in "}'::jsonb, '{"timestamp":"2026-02-22T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 14');

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('high-energy-prices-threaten-uk-s-status-2026-02-22', 'it-s-a-ticking-timebomb-food-producer-2026-02-22', 'causes', 1, 'Energy Markets', '{}'::jsonb)
    ON CONFLICT DO NOTHING
  `);
  console.log('    Relations: 1');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('pakistan-launches-deadly-strikes-on-afgh-2026-02-22', 'article', 'Pakistan launches deadly strikes on Afghanistan', 'https://www.bbc.com/news/articles/cdxgln3gnd6o', 'Pakistan says the strikes were retaliation for recent suicide bombings in the country.', 'BBC News', '2026-02-22T10:59:05.000Z'),
    ('us-ambassadors-israel-comments-condemne-2026-02-22', 'article', 'US ambassador''s Israel comments condemned by Arab and Muslim nations', 'https://www.bbc.com/news/articles/cn5gkkgdzkyo', 'Mike Huckabee suggested Israel would be justified in taking much of the Middle East on Biblical grounds.', 'BBC News', '2026-02-22T11:23:20.000Z'),
    ('more-than-1-500-venezuelan-political-pri-2026-02-22', 'article', 'More than 1,500 Venezuelan political prisoners apply for amnesty', 'https://www.bbc.com/news/articles/c93w9g2dvn5o', 'The announcement by the head of Venezuela''s National Assembly comes amid US pressure following the capture of ex-President Nicolás Maduro.', 'BBC News', '2026-02-22T05:04:57.000Z'),
    ('willie-col-n-trombonist-who-pioneered-s-2026-02-22', 'article', 'Willie Colón, trombonist who pioneered salsa music, dies aged 75', 'https://www.bbc.com/news/articles/c98qjed249do', 'His career spanned 60 years and dozens of albums and had been named among the most influential Latino artists of all time.', 'BBC News', '2026-02-22T01:49:42.000Z'),
    ('final-missing-lake-tahoe-skier-found-dea-2026-02-22', 'article', 'Final missing Lake Tahoe skier found dead 5 days after avalanche', 'https://www.bbc.com/news/articles/cp9m0zp04xyo', 'Authorities released the names of the six women and three guides who died in the worst avalanche in state history.', 'BBC News', '2026-02-22T02:06:23.000Z'),
    ('trump-says-he-will-increase-his-new-glob-2026-02-22', 'article', 'Trump says he will increase his new global tariffs to 15%', 'https://www.bbc.com/news/articles/cn8z48xwqn3o', 'After most of his tariffs were outlawed on Friday, Trump announced new global tariffs of 10% - which he says he has now increased to 15%.', 'BBC Business', '2026-02-22T08:08:24.000Z'),
    ('mps-to-discuss-inquiry-into-trade-envoy-2026-02-22', 'article', 'MPs to discuss inquiry into trade envoy role after Andrew arrest', 'https://www.bbc.com/news/articles/cqxde59d3gwo', 'A cross-party committee will also look into the appointment and accountability of UK trade envoys.', 'BBC Business', '2026-02-22T06:00:54.000Z'),
    ('high-energy-prices-threaten-uk-s-status-2026-02-22', 'article', 'High energy prices threaten UK’s status as manufacturing power, business groups say', 'https://www.theguardian.com/business/2026/feb/22/high-energy-prices-threaten-uks-status-as-manufacturing-power-business-groups-say', '<p>CBI and Energy UK report finds 40% of firms have cut investment as electricity costs remain far above pre-Ukraine levels</p><ul><li><p><a href="https://www.theguardian.com/business/2026/feb/22/food', 'The Guardian', '2026-02-22T07:00:32.000Z'),
    ('china-overtakes-us-as-germany-s-top-trad-2026-02-22', 'article', 'China overtakes US as Germany’s top trading partner', 'https://www.theguardian.com/business/2026/feb/22/china-overtakes-us-as-germany-top-trading-partner', '<p>Friedrich Merz to meet Xi Jinping in Beijing as China overtakes US as country’s leading export destination</p><p>China has overtaken the US as Germany’s top trading partner, figures have shown, as ', 'The Guardian', '2026-02-22T10:51:40.000Z'),
    ('it-s-a-ticking-timebomb-food-producer-2026-02-22', 'article', '‘It’s a ticking timebomb’: food producers sound alarm on rise in energy charges', 'https://www.theguardian.com/business/2026/feb/22/food-production-hike-in-energy-standing-charges-inflation', '<p>Indoor growers warn April price jump will hinder sector’s competitiveness and drive up costs for consumers</p><ul><li><p><a href="https://www.theguardian.com/business/2026/feb/22/high-energy-prices', 'The Guardian', '2026-02-22T10:25:54.000Z'),
    ('romance-fraud-warning-over-scam-that-tu-2026-02-22', 'article', 'Romance fraud: warning over scam that turns victims into insurance cheats', 'https://www.theguardian.com/money/2026/feb/22/romance-fraud-scam-insurance-claims', '<p>Insurers say cases of scammers manipulating people into staging crashes and filing bogus claims are under-reported</p><p>Romance fraud typically evokes images of people being <a href="https://www.t', 'The Guardian', '2026-02-22T07:00:31.000Z'),
    ('thailand-moves-to-cut-sugar-in-popular-d-2026-02-22', 'article', 'Thailand moves to cut sugar in popular drinks amid health drive', 'https://www.theguardian.com/world/2026/feb/22/thailand-moves-to-cut-sugar-in-popular-drinks-amid-health-drive', '<p>Major chains agree to halve default sweetness, but street vendors and cafes remain outside sugar tax rules</p><p>A crowd of customers, holding phones aloft, watch intently as Auntie Nid mixes up he', 'The Guardian', '2026-02-22T05:00:27.000Z'),
    ('mentioning-bitcoin-or-crypto-on-ai-age-2026-02-22', 'article', 'Mentioning ''bitcoin'' or crypto on AI agent OpenClaw''s Discord will get you banned', 'https://www.coindesk.com/tech/2026/02/22/mentioning-bitcoin-or-crypto-on-ai-agent-openclaw-s-discord-will-get-you-banned', 'The project''s creator nearly deleted the viral AI agent after crypto scammers hijacked his accounts, launched a fake token that hit $16 million, and harassed him for weeks.', 'CoinDesk', '2026-02-22T05:37:18.000Z'),
    ('copper-unlikely-to-follow-near-term-gold-2026-02-22', 'article', 'Copper Unlikely to Follow Near-Term Gold Rally', 'https://oilprice.com/Energy/Energy-General/Copper-Unlikely-to-Follow-Near-Term-Gold-Rally.html', 'Copper prices rallied to a record high of over $13,000 per ton last month, but retreated to about $12,700 this week as expectations of long-term demand strength collided with massive stockpiling at th', 'OilPrice.com', '2026-02-22T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 14');

  console.log('  \u2713 news-week8-day-2026-02-22-hour-12: 14 entities, 1 relations, 14 sources');
};
