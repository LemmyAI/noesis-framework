/**
 * NOESIS Seed: Daily News — 2026-02-17 06:00 (Week 8, 2026)
 * Namespace: news.week8.day-2026-02-17
 * Built by seed-factory on 2026-02-17
 * Auto-gathered news: 13 stories, 2026-02-17 to 2026-02-17
 * Entities: 13 | Relations: 0 | Sources: 13
 */
module.exports = async function seed_news_week8_day_2026_02_17_hour_06(client) {
  console.log('  \u2192 Seeding: news-week8-day-2026-02-17-hour-06');

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
    ('news.week8.day-2026-02-17', 'news.week8', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('hyatt-hotels-chairman-steps-down-over-je-2026-02-17', 'news.week8.day-2026-02-17', 'Event', 'Hyatt Hotels chairman steps down over Jeffrey Epstein ties', NULL, '{"category":"finance","description":"Billionaire Thomas Pritzker said he had exercised \\"terrible judgement\\" in keeping contact with Epstein."}'::jsonb, '{"timestamp":"2026-02-17T04:16:40.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('the-tech-bros-might-show-more-humility-i-2026-02-17', 'news.week8.day-2026-02-17', 'Event', 'The tech bros might show more humility in Delhi – but will they make AI any safer?', NULL, '{"category":"finance","description":"As global tech leaders meet Delhi, India hopes to level the playing field for countries outside the US and China."}'::jsonb, '{"timestamp":"2026-02-17T00:12:58.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('reddits-human-content-wins-amid-the-ai-2026-02-17', 'news.week8.day-2026-02-17', 'Event', 'Reddit''s human content wins amid the AI flood', NULL, '{"category":"finance","description":"Reddit says its human contributors are valued amid an internet awash with AI-generated content."}'::jsonb, '{"timestamp":"2026-02-17T00:03:10.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('train-derails-in-switzerland-injuring-f-2026-02-17', 'news.week8.day-2026-02-17', 'Event', 'Train derails in Switzerland, injuring five amid avalanches in the Alps', NULL, '{"category":"geopolitics","description":"The accident happened as the region is under its second-highest avalanche warning, a level four out of five."}'::jsonb, '{"timestamp":"2026-02-17T04:02:43.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('australian-pm-albanese-says-no-help-for-2026-02-17', 'news.week8.day-2026-02-17', 'Claim', 'Australian PM Albanese says no help for ISIL relatives held in Syria camp', NULL, '{"category":"geopolitics","description":"Group of 34 women and children with Australian passports forced to return to Roj detention camp for ISIL relatives."}'::jsonb, '{"timestamp":"2026-02-17T03:33:34.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('trump-says-he-will-be-involved-indirect-2026-02-17', 'news.week8.day-2026-02-17', 'Claim', 'Trump says he will be involved ‘indirectly’ in Iran nuclear talks', NULL, '{"category":"geopolitics","description":"The US president''s comments come ahead of a second round of high-stakes talks in Geneva on Tuesday."}'::jsonb, '{"timestamp":"2026-02-17T03:10:14.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('hyatt-hotels-chairman-thomas-pritzker-st-2026-02-17', 'news.week8.day-2026-02-17', 'Event', 'Hyatt Hotels chairman Thomas Pritzker steps down over Epstein ties', NULL, '{"category":"geopolitics","description":"Pritzker steps down as Hyatt executive chairman, effective immediately, over his relationship with the sex offender."}'::jsonb, '{"timestamp":"2026-02-17T02:24:31.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('lebanon-sets-four-months-for-second-phas-2026-02-17', 'news.week8.day-2026-02-17', 'Event', 'Lebanon sets four months for second phase of Hezbollah disarmament', NULL, '{"category":"geopolitics","description":"Hezbollah rejects calls to dismantle its arsenals north of Litani River, describing pressure to do so as a ''grave sin''."}'::jsonb, '{"timestamp":"2026-02-17T01:53:05.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('rhode-island-shooting-2-killed-3-criti-2026-02-17', 'news.week8.day-2026-02-17', 'Fact', 'Rhode Island shooting: 2 killed, 3 critically injured at Pawtucket ice rink', NULL, '{"category":"geopolitics","description":"The attacker has also died from a self-inflicted gunshot wound after opening fire at an ice hockey rink in the US."}'::jsonb, '{"timestamp":"2026-02-17T01:41:32.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('russia-ukraine-war-list-of-key-events-2026-02-17', 'news.week8.day-2026-02-17', 'Event', 'Russia-Ukraine war: List of key events, day 1,454', NULL, '{"category":"geopolitics","description":"These are the key developments from day 1,454 of Russia’s war on Ukraine."}'::jsonb, '{"timestamp":"2026-02-17T01:26:50.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('u-s-stock-futures-slump-as-investors-di-2026-02-17', 'news.week8.day-2026-02-17', 'Event', 'U.S. stock futures slump as investors digest ongoing tech selloff', NULL, '{"category":"finance.markets","description":"U.S. stock futures turned lower Monday night, following another brutal week for tech stocks."}'::jsonb, '{"timestamp":"2026-02-17T04:01:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('oil-bears-are-dangerously-underestimatin-2026-02-17', 'news.week8.day-2026-02-17', 'Event', 'Oil Bears Are Dangerously Underestimating Geopolitical Risk', NULL, '{"category":"finance.energy","description":"For decades, oil prices could swing wildly on even the distant prospect of war in the Middle East. With U.S. shale, that changed, leading many to assume that anything short of an oil blockade in the Strait of Hormuz will leave oil markets cold—and such a blockade is highly unlikely. This, however, i"}'::jsonb, '{"timestamp":"2026-02-17T01:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('china-hits-renewable-milestone-but-coal-2026-02-17', 'news.week8.day-2026-02-17', 'Event', 'China Hits Renewable Milestone, But Coal Isn’t Going Anywhere', NULL, '{"category":"finance.energy","description":"For the first time ever, China now has more operating power capacity from clean energy sources than capacity running on fossil fuels, thanks to a decade of booming solar and wind installations.     China, the undisputed global leader in clean energy investment, has 52% of operating power capacity co"}'::jsonb, '{"timestamp":"2026-02-17T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 13');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('hyatt-hotels-chairman-steps-down-over-je-2026-02-17', 'article', 'Hyatt Hotels chairman steps down over Jeffrey Epstein ties', 'https://www.bbc.com/news/articles/c93wk4d7x19o', 'Billionaire Thomas Pritzker said he had exercised "terrible judgement" in keeping contact with Epstein.', 'BBC Business', '2026-02-17T04:16:40.000Z'),
    ('the-tech-bros-might-show-more-humility-i-2026-02-17', 'article', 'The tech bros might show more humility in Delhi – but will they make AI any safer?', 'https://www.bbc.com/news/articles/cr5l6gnen72o', 'As global tech leaders meet Delhi, India hopes to level the playing field for countries outside the US and China.', 'BBC Business', '2026-02-17T00:12:58.000Z'),
    ('reddits-human-content-wins-amid-the-ai-2026-02-17', 'article', 'Reddit''s human content wins amid the AI flood', 'https://www.bbc.com/news/articles/c5y4zl0w062o', 'Reddit says its human contributors are valued amid an internet awash with AI-generated content.', 'BBC Business', '2026-02-17T00:03:10.000Z'),
    ('train-derails-in-switzerland-injuring-f-2026-02-17', 'article', 'Train derails in Switzerland, injuring five amid avalanches in the Alps', 'https://www.aljazeera.com/news/2026/2/17/train-derails-in-switzerland-injuring-five-amid-avalanches-in-the-alps', 'The accident happened as the region is under its second-highest avalanche warning, a level four out of five.', 'Al Jazeera', '2026-02-17T04:02:43.000Z'),
    ('australian-pm-albanese-says-no-help-for-2026-02-17', 'article', 'Australian PM Albanese says no help for ISIL relatives held in Syria camp', 'https://www.aljazeera.com/news/2026/2/17/australian-pm-albanese-says-no-help-for-isil-relatives-held-in-syria-camp', 'Group of 34 women and children with Australian passports forced to return to Roj detention camp for ISIL relatives.', 'Al Jazeera', '2026-02-17T03:33:34.000Z'),
    ('trump-says-he-will-be-involved-indirect-2026-02-17', 'article', 'Trump says he will be involved ‘indirectly’ in Iran nuclear talks', 'https://www.aljazeera.com/news/2026/2/17/trump-says-he-will-be-involved-indirectly-in-iran-nuclear-talks', 'The US president''s comments come ahead of a second round of high-stakes talks in Geneva on Tuesday.', 'Al Jazeera', '2026-02-17T03:10:14.000Z'),
    ('hyatt-hotels-chairman-thomas-pritzker-st-2026-02-17', 'article', 'Hyatt Hotels chairman Thomas Pritzker steps down over Epstein ties', 'https://www.aljazeera.com/news/2026/2/17/hyatt-hotels-chairman-thomas-pritzker-steps-down-over-epstein-ties', 'Pritzker steps down as Hyatt executive chairman, effective immediately, over his relationship with the sex offender.', 'Al Jazeera', '2026-02-17T02:24:31.000Z'),
    ('lebanon-sets-four-months-for-second-phas-2026-02-17', 'article', 'Lebanon sets four months for second phase of Hezbollah disarmament', 'https://www.aljazeera.com/news/2026/2/17/lebanon-says-four-months-needed-for-second-phase-of-hezbollah-disarmament', 'Hezbollah rejects calls to dismantle its arsenals north of Litani River, describing pressure to do so as a ''grave sin''.', 'Al Jazeera', '2026-02-17T01:53:05.000Z'),
    ('rhode-island-shooting-2-killed-3-criti-2026-02-17', 'article', 'Rhode Island shooting: 2 killed, 3 critically injured at Pawtucket ice rink', 'https://www.aljazeera.com/news/2026/2/17/rhode-island-shooting-2-killed-3-critically-injured-at-pawtucket-ice-rink', 'The attacker has also died from a self-inflicted gunshot wound after opening fire at an ice hockey rink in the US.', 'Al Jazeera', '2026-02-17T01:41:32.000Z'),
    ('russia-ukraine-war-list-of-key-events-2026-02-17', 'article', 'Russia-Ukraine war: List of key events, day 1,454', 'https://www.aljazeera.com/news/2026/2/17/russia-ukraine-war-list-of-key-events-day-1454', 'These are the key developments from day 1,454 of Russia’s war on Ukraine.', 'Al Jazeera', '2026-02-17T01:26:50.000Z'),
    ('u-s-stock-futures-slump-as-investors-di-2026-02-17', 'article', 'U.S. stock futures slump as investors digest ongoing tech selloff', 'https://www.marketwatch.com/story/u-s-stock-futures-flat-as-investors-digest-ongoing-tech-selloff-over-holiday-weekend-765f3c5c?mod=mw_rss_topstories', 'U.S. stock futures turned lower Monday night, following another brutal week for tech stocks.', 'MarketWatch', '2026-02-17T04:01:00.000Z'),
    ('oil-bears-are-dangerously-underestimatin-2026-02-17', 'article', 'Oil Bears Are Dangerously Underestimating Geopolitical Risk', 'https://oilprice.com/Energy/Energy-General/Oil-Bears-Are-Dangerously-Underestimating-Geopolitical-Risk.html', 'For decades, oil prices could swing wildly on even the distant prospect of war in the Middle East. With U.S. shale, that changed, leading many to assume that anything short of an oil blockade in the S', 'OilPrice.com', '2026-02-17T01:00:00.000Z'),
    ('china-hits-renewable-milestone-but-coal-2026-02-17', 'article', 'China Hits Renewable Milestone, But Coal Isn’t Going Anywhere', 'https://oilprice.com/Energy/Coal/China-Hits-Renewable-Milestone-But-Coal-Isnt-Going-Anywhere.html', 'For the first time ever, China now has more operating power capacity from clean energy sources than capacity running on fossil fuels, thanks to a decade of booming solar and wind installations.     Ch', 'OilPrice.com', '2026-02-17T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 13');

  console.log('  \u2713 news-week8-day-2026-02-17-hour-06: 13 entities, 0 relations, 13 sources');
};
