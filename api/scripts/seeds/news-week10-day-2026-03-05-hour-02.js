/**
 * NOESIS Seed: Daily News — 2026-03-05 02:00 (Week 10, 2026)
 * Namespace: news.week10.day-2026-03-05
 * Built by seed-factory on 2026-03-05
 * Auto-gathered news: 9 stories, 2026-03-05 to 2026-03-05
 * Entities: 9 | Relations: 2 | Sources: 9
 * Narratives: Energy Markets
 */
module.exports = async function seed_news_week10_day_2026_03_05_hour_02(client) {
  console.log('  \u2192 Seeding: news-week10-day-2026-03-05-hour-02');

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
    ('news.week10.day-2026-03-05', 'news.week10', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('trade-court-orders-tariff-refunds-in-set-2026-03-05', 'news.week10.day-2026-03-05', 'Decision', 'Trade court orders tariff refunds in setback for Trump administration', NULL, '{"category":"geopolitics","description":"A trade court has cleared the way for businesses to receive refunds for tariffs that the Supreme Court struck down last month."}'::jsonb, '{"timestamp":"2026-03-05T00:13:16.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('we-have-more-privacy-controls-yet-less-p-2026-03-05', 'news.week10.day-2026-03-05', 'Event', 'We have more privacy controls yet less privacy than ever', NULL, '{"category":"finance","description":"Has online privacy become  \\"a luxury not a right\\" for us all in 2026?"}'::jsonb, '{"timestamp":"2026-03-05T00:04:26.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('venezuela-s-president-vows-mining-reform-2026-03-05', 'news.week10.day-2026-03-05', 'Event', 'Venezuela’s president vows mining reform amid visit from US cabinet member', NULL, '{"category":"geopolitics","description":"US Interior Secretary Doug Burgum has met with Venezuela’s interim President Delcy Rodriguez in Caracas."}'::jsonb, '{"timestamp":"2026-03-05T00:29:26.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('iran-live-senate-fails-to-curb-trump-s-2026-03-05', 'news.week10.day-2026-03-05', 'Event', 'Iran live: Senate fails to curb Trump’s war powers; Israel pounds Lebanon', NULL, '{"category":"geopolitics","description":"US and Israel bombard Iran as Israeli forces hammer Lebanon and the widening conflict causes energy prices to spike."}'::jsonb, '{"timestamp":"2026-03-05T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('broadcom-says-ai-is-not-disrupting-its-s-2026-03-05', 'news.week10.day-2026-03-05', 'Claim', 'Broadcom says AI is not disrupting its software business, and its stock climbs', NULL, '{"category":"finance.markets","description":"The chip maker sees sales growth in its infrastructure software accelerating, showing that it&#x2019;s focused on and investing in that business."}'::jsonb, '{"timestamp":"2026-03-05T01:19:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('okta-x2019-s-stock-rises-as-momentum-in-2026-03-05', 'news.week10.day-2026-03-05', 'Event', 'Okta&#x2019;s stock rises as momentum in AI agents fuels an earnings beat', NULL, '{"category":"finance.markets","description":"Okta beat earnings expectations for the latest quarter, but guidance for the current quarter was below forecasts."}'::jsonb, '{"timestamp":"2026-03-05T01:17:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('stanchart-hikes-oil-price-forecast-to-7-2026-03-05', 'news.week10.day-2026-03-05', 'Claim', 'StanChart Hikes Oil Price Forecast To $74 Per Barrel Amid Iran Conflict', NULL, '{"category":"finance.energy","description":"Iran has launched a massive retaliatory campaign following joint U.S. and Israeli airstrikes, sending an unprecedented barrage of more than 500 ballistic missiles and 2,000 drones across targets in Israel and several Gulf states. A drone strike on a command center killed six U.S. service members in "}'::jsonb, '{"timestamp":"2026-03-05T01:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('tanker-squeeze-adds-insult-to-oil-injury-2026-03-05', 'news.week10.day-2026-03-05', 'Event', 'Tanker Squeeze Adds Insult to Oil Injury amid Iran War', NULL, '{"category":"finance.energy","description":"Tanker rates are through the roof, movement through the Strait of Hormuz is severely reduced because of war cover cancellations by insurers, and the combination of these developments has sent oil prices flying. Now, there’s a third factor that would likely aggravate the situation further: there are "}'::jsonb, '{"timestamp":"2026-03-05T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('jensen-huang-says-nvidia-is-pulling-back-2026-03-05', 'news.week10.day-2026-03-05', 'Claim', 'Jensen Huang says Nvidia is pulling back from OpenAI and Anthropic, but his explanation raises more questions than it answers', NULL, '{"category":"technology.ai","description":"Nvidia CEO Jensen Huang said Wednesday that his company''s investments in OpenAI and Anthropic will likely be its last — but his explanation may not tell the whole story."}'::jsonb, '{"timestamp":"2026-03-05T01:08:28.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 9');

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('iran-live-senate-fails-to-curb-trump-s-2026-03-05', 'tanker-squeeze-adds-insult-to-oil-injury-2026-03-05', 'causes', 1, 'Energy Markets', '{}'::jsonb),
    ('tanker-squeeze-adds-insult-to-oil-injury-2026-03-05', 'stanchart-hikes-oil-price-forecast-to-7-2026-03-05', 'supports', 2, 'Energy Markets', '{}'::jsonb)
    ON CONFLICT DO NOTHING
  `);
  console.log('    Relations: 2');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('trade-court-orders-tariff-refunds-in-set-2026-03-05', 'article', 'Trade court orders tariff refunds in setback for Trump administration', 'https://www.bbc.com/news/articles/c1d66k5r1x4o', 'A trade court has cleared the way for businesses to receive refunds for tariffs that the Supreme Court struck down last month.', 'BBC News', '2026-03-05T00:13:16.000Z'),
    ('we-have-more-privacy-controls-yet-less-p-2026-03-05', 'article', 'We have more privacy controls yet less privacy than ever', 'https://www.bbc.com/news/articles/c4gj39zk1k0o', 'Has online privacy become  "a luxury not a right" for us all in 2026?', 'BBC Business', '2026-03-05T00:04:26.000Z'),
    ('venezuela-s-president-vows-mining-reform-2026-03-05', 'article', 'Venezuela’s president vows mining reform amid visit from US cabinet member', 'https://www.aljazeera.com/news/2026/3/5/venezuelas-president-vows-mining-reform-amid-visit-from-us-cabinet-member', 'US Interior Secretary Doug Burgum has met with Venezuela’s interim President Delcy Rodriguez in Caracas.', 'Al Jazeera', '2026-03-05T00:29:26.000Z'),
    ('iran-live-senate-fails-to-curb-trump-s-2026-03-05', 'article', 'Iran live: Senate fails to curb Trump’s war powers; Israel pounds Lebanon', 'https://www.aljazeera.com/news/liveblog/2026/3/5/iran-live-us-senate-backs-trumps-attacks-on-tehran-israel-pounds-lebanon', 'US and Israel bombard Iran as Israeli forces hammer Lebanon and the widening conflict causes energy prices to spike.', 'Al Jazeera', '2026-03-05T00:00:00.000Z'),
    ('broadcom-says-ai-is-not-disrupting-its-s-2026-03-05', 'article', 'Broadcom says AI is not disrupting its software business, and its stock climbs', 'https://www.marketwatch.com/story/broadcoms-stock-climbs-after-it-says-ai-is-not-disrupting-its-software-business-09b06f3f?mod=mw_rss_topstories', 'The chip maker sees sales growth in its infrastructure software accelerating, showing that it&#x2019;s focused on and investing in that business.', 'MarketWatch', '2026-03-05T01:19:00.000Z'),
    ('okta-x2019-s-stock-rises-as-momentum-in-2026-03-05', 'article', 'Okta&#x2019;s stock rises as momentum in AI agents fuels an earnings beat', 'https://www.marketwatch.com/story/oktas-stock-rallies-as-momentum-in-ai-agents-fuels-an-earnings-beat-4b3983ec?mod=mw_rss_topstories', 'Okta beat earnings expectations for the latest quarter, but guidance for the current quarter was below forecasts.', 'MarketWatch', '2026-03-05T01:17:00.000Z'),
    ('stanchart-hikes-oil-price-forecast-to-7-2026-03-05', 'article', 'StanChart Hikes Oil Price Forecast To $74 Per Barrel Amid Iran Conflict', 'https://oilprice.com/Energy/Energy-General/StanChart-Hikes-Oil-Price-Forecast-To-74-Per-Barrel-Amid-Iran-Conflict.html', 'Iran has launched a massive retaliatory campaign following joint U.S. and Israeli airstrikes, sending an unprecedented barrage of more than 500 ballistic missiles and 2,000 drones across targets in Is', 'OilPrice.com', '2026-03-05T01:00:00.000Z'),
    ('tanker-squeeze-adds-insult-to-oil-injury-2026-03-05', 'article', 'Tanker Squeeze Adds Insult to Oil Injury amid Iran War', 'https://oilprice.com/Energy/Energy-General/Tanker-Squeeze-Adds-Insult-to-Oil-Injury-amid-Iran-War.html', 'Tanker rates are through the roof, movement through the Strait of Hormuz is severely reduced because of war cover cancellations by insurers, and the combination of these developments has sent oil pric', 'OilPrice.com', '2026-03-05T00:00:00.000Z'),
    ('jensen-huang-says-nvidia-is-pulling-back-2026-03-05', 'article', 'Jensen Huang says Nvidia is pulling back from OpenAI and Anthropic, but his explanation raises more questions than it answers', 'https://techcrunch.com/2026/03/04/jensen-huang-says-nvidia-is-pulling-back-from-openai-and-anthropic-but-his-explanation-raises-more-questions-than-it-answers/', 'Nvidia CEO Jensen Huang said Wednesday that his company''s investments in OpenAI and Anthropic will likely be its last — but his explanation may not tell the whole story.', 'TechCrunch', '2026-03-05T01:08:28.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 9');

  console.log('  \u2713 news-week10-day-2026-03-05-hour-02: 9 entities, 2 relations, 9 sources');
};
