/**
 * NOESIS Seed: Daily News — 2026-02-27 02:00 (Week 9, 2026)
 * Namespace: news.week9.day-2026-02-27
 * Built by seed-factory on 2026-02-27
 * Auto-gathered news: 10 stories, 2026-02-27 to 2026-02-27
 * Entities: 10 | Relations: 0 | Sources: 10
 */
module.exports = async function seed_news_week9_day_2026_02_27_hour_02(client) {
  console.log('  \u2192 Seeding: news-week9-day-2026-02-27-hour-02');

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
    ('news.week9.day-2026-02-27', 'news.week9', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('pakistan-strikes-afghan-cities-as-cross-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'Pakistan strikes Afghan cities as cross-border attacks escalate', NULL, '{"category":"geopolitics","description":"The Afghan Taliban said it had responded to the Pakistani strikes, which targeted Afghan cities including Kabul and Kandahar."}'::jsonb, '{"timestamp":"2026-02-27T01:13:53.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('netflix-drops-bid-for-warner-bros-clear-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'Netflix drops bid for Warner Bros, clearing way for Paramount takeover', NULL, '{"category":"finance","description":"Netflix''s decision to back down from the bidding war clears the path for Paramount to win the takeover battle."}'::jsonb, '{"timestamp":"2026-02-27T01:28:14.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('anthropic-boss-rejects-pentagon-demand-t-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'Anthropic boss rejects Pentagon demand to drop AI safeguards', NULL, '{"category":"finance","description":"Defense Secretary Pete Hegseth previously threatened to remove the firm from the department''s supply chain."}'::jsonb, '{"timestamp":"2026-02-27T01:16:07.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('jack-dorseys-block-cuts-thousands-of-jo-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'Jack Dorsey''s Block cuts thousands of jobs as it embraces AI', NULL, '{"category":"finance","description":"The Twitter co-founder says artificial intelligence \\"fundamentally changes what it means to build and run a company.\\""}'::jsonb, '{"timestamp":"2026-02-27T00:06:40.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('why-you-cant-get-a-signal-at-festivals-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'Why you can''t get a signal at festivals and sports matches', NULL, '{"category":"finance","description":"Connecting up music and sports events to the internet is a massive undertaking."}'::jsonb, '{"timestamp":"2026-02-27T00:03:10.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('us-tax-agency-broke-privacy-law-approxi-2026-02-27', 'news.week9.day-2026-02-27', 'Claim', 'US tax agency broke privacy law ‘approximately 42,695 times’, judge says', NULL, '{"category":"geopolitics","description":"Federal judge rules that the Internal Revenue Service violated its code by giving immigration agency confidential data."}'::jsonb, '{"timestamp":"2026-02-27T00:55:31.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('trump-allies-david-and-larry-ellison-win-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'Trump allies David and Larry Ellison win battle for Warner Bros. Discovery after Netflix bows out', NULL, '{"category":"finance.markets","description":"The streaming giant said countering Paramount&#x2019;s bid was &#x201c;no longer financially attractive.&#x201d;"}'::jsonb, '{"timestamp":"2026-02-27T00:14:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('india-s-solar-manufacturers-slapped-with-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'India’s Solar Manufacturers Slapped With 126% U.S. Tariff', NULL, '{"category":"finance.energy","description":"The U.S. Department of Commerce has imposed a 126% preliminary countervailing duty on Indian solar cells and modules, effectively closing off the lucrative U.S. market and exacerbating overcapacity issues for India’s burgeoning solar sector. The levies follow a complaint by the Alliance for American"}'::jsonb, '{"timestamp":"2026-02-27T01:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('cloud-seeding-moves-from-fringe-science-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'Cloud Seeding Moves From Fringe Science to Water Strategy', NULL, '{"category":"finance.energy","description":"When the UAE experienced severe floods two years ago, many questioned the country’s practice of so-called cloud seeding—the dispersion of certain chemicals in the air to basically squeeze more rain from clouds—as a possible cause of the floods. Officially, that explanation was rejected, yet cloud-se"}'::jsonb, '{"timestamp":"2026-02-27T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('trump-s-secret-weapon-in-the-rare-earth-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'Trump’s Secret Weapon in the Rare Earth War', NULL, '{"category":"finance.energy","description":"Long before trade wars and tariffs, China secured manufacturing dominance by controlling rare earths - a reality so consequential that the United States and its allies are now pledging more than $8.5 billion just to claw back some control of the supply chain. As global manufacturing expanded over th"}'::jsonb, '{"timestamp":"2026-02-27T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 10');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('pakistan-strikes-afghan-cities-as-cross-2026-02-27', 'article', 'Pakistan strikes Afghan cities as cross-border attacks escalate', 'https://www.bbc.com/news/articles/c0j5qx9n887o', 'The Afghan Taliban said it had responded to the Pakistani strikes, which targeted Afghan cities including Kabul and Kandahar.', 'BBC News', '2026-02-27T01:13:53.000Z'),
    ('netflix-drops-bid-for-warner-bros-clear-2026-02-27', 'article', 'Netflix drops bid for Warner Bros, clearing way for Paramount takeover', 'https://www.bbc.com/news/articles/c5y6p5ypgmzo', 'Netflix''s decision to back down from the bidding war clears the path for Paramount to win the takeover battle.', 'BBC Business', '2026-02-27T01:28:14.000Z'),
    ('anthropic-boss-rejects-pentagon-demand-t-2026-02-27', 'article', 'Anthropic boss rejects Pentagon demand to drop AI safeguards', 'https://www.bbc.com/news/articles/cvg3vlzzkqeo', 'Defense Secretary Pete Hegseth previously threatened to remove the firm from the department''s supply chain.', 'BBC Business', '2026-02-27T01:16:07.000Z'),
    ('jack-dorseys-block-cuts-thousands-of-jo-2026-02-27', 'article', 'Jack Dorsey''s Block cuts thousands of jobs as it embraces AI', 'https://www.bbc.com/news/articles/cq570d12y9do', 'The Twitter co-founder says artificial intelligence "fundamentally changes what it means to build and run a company."', 'BBC Business', '2026-02-27T00:06:40.000Z'),
    ('why-you-cant-get-a-signal-at-festivals-2026-02-27', 'article', 'Why you can''t get a signal at festivals and sports matches', 'https://www.bbc.com/news/articles/c3rzq8d24y9o', 'Connecting up music and sports events to the internet is a massive undertaking.', 'BBC Business', '2026-02-27T00:03:10.000Z'),
    ('us-tax-agency-broke-privacy-law-approxi-2026-02-27', 'article', 'US tax agency broke privacy law ‘approximately 42,695 times’, judge says', 'https://www.aljazeera.com/news/2026/2/27/us-tax-agency-broke-privacy-law-approximately-42695-times-judge-says', 'Federal judge rules that the Internal Revenue Service violated its code by giving immigration agency confidential data.', 'Al Jazeera', '2026-02-27T00:55:31.000Z'),
    ('trump-allies-david-and-larry-ellison-win-2026-02-27', 'article', 'Trump allies David and Larry Ellison win battle for Warner Bros. Discovery after Netflix bows out', 'https://www.marketwatch.com/story/warner-bros-discovery-deems-paramounts-bid-superior-putting-netflix-in-the-hot-seat-a1fcea7c?mod=mw_rss_topstories', 'The streaming giant said countering Paramount&#x2019;s bid was &#x201c;no longer financially attractive.&#x201d;', 'MarketWatch', '2026-02-27T00:14:00.000Z'),
    ('india-s-solar-manufacturers-slapped-with-2026-02-27', 'article', 'India’s Solar Manufacturers Slapped With 126% U.S. Tariff', 'https://oilprice.com/Alternative-Energy/Solar-Energy/Indias-Solar-Manufacturers-Slapped-With-126-US-Tariff.html', 'The U.S. Department of Commerce has imposed a 126% preliminary countervailing duty on Indian solar cells and modules, effectively closing off the lucrative U.S. market and exacerbating overcapacity is', 'OilPrice.com', '2026-02-27T01:00:00.000Z'),
    ('cloud-seeding-moves-from-fringe-science-2026-02-27', 'article', 'Cloud Seeding Moves From Fringe Science to Water Strategy', 'https://oilprice.com/Energy/Energy-General/Cloud-Seeding-Moves-From-Fringe-Science-to-Water-Strategy.html', 'When the UAE experienced severe floods two years ago, many questioned the country’s practice of so-called cloud seeding—the dispersion of certain chemicals in the air to basically squeeze more rain fr', 'OilPrice.com', '2026-02-27T00:00:00.000Z'),
    ('trump-s-secret-weapon-in-the-rare-earth-2026-02-27', 'article', 'Trump’s Secret Weapon in the Rare Earth War', 'https://oilprice.com/Energy/Energy-General/Trumps-Secret-Weapon-in-the-Rare-Earth-War.html', 'Long before trade wars and tariffs, China secured manufacturing dominance by controlling rare earths - a reality so consequential that the United States and its allies are now pledging more than $8.5 ', 'OilPrice.com', '2026-02-27T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 10');

  console.log('  \u2713 news-week9-day-2026-02-27-hour-02: 10 entities, 0 relations, 10 sources');
};
