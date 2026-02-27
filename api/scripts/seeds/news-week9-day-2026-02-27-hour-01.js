/**
 * NOESIS Seed: Daily News — 2026-02-27 01:00 (Week 9, 2026)
 * Namespace: news.week9.day-2026-02-27
 * Built by seed-factory on 2026-02-27
 * Auto-gathered news: 5 stories, 2026-02-27 to 2026-02-27
 * Entities: 5 | Relations: 0 | Sources: 5
 */
module.exports = async function seed_news_week9_day_2026_02_27_hour_01(client) {
  console.log('  \u2192 Seeding: news-week9-day-2026-02-27-hour-01');

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
    ('jack-dorseys-block-cuts-thousands-of-jo-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'Jack Dorsey''s Block cuts thousands of jobs as it embraces AI', NULL, '{"category":"finance","description":"The Twitter co-founder says artificial intelligence \\"fundamentally changes what it means to build and run a company.\\""}'::jsonb, '{"timestamp":"2026-02-27T00:06:40.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('why-you-cant-get-a-signal-at-festivals-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'Why you can''t get a signal at festivals and sports matches', NULL, '{"category":"finance","description":"Connecting up music and sports events to the internet is a massive undertaking."}'::jsonb, '{"timestamp":"2026-02-27T00:03:10.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('trump-allies-david-and-larry-ellison-win-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'Trump allies David and Larry Ellison win battle for Warner Bros. Discovery after Netflix bows out', NULL, '{"category":"finance.markets","description":"The streaming giant said countering Paramount&#x2019;s bid was &#x201c;no longer financially attractive.&#x201d;"}'::jsonb, '{"timestamp":"2026-02-27T00:14:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('cloud-seeding-moves-from-fringe-science-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'Cloud Seeding Moves From Fringe Science to Water Strategy', NULL, '{"category":"finance.energy","description":"When the UAE experienced severe floods two years ago, many questioned the country’s practice of so-called cloud seeding—the dispersion of certain chemicals in the air to basically squeeze more rain from clouds—as a possible cause of the floods. Officially, that explanation was rejected, yet cloud-se"}'::jsonb, '{"timestamp":"2026-02-27T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('trump-s-secret-weapon-in-the-rare-earth-2026-02-27', 'news.week9.day-2026-02-27', 'Event', 'Trump’s Secret Weapon in the Rare Earth War', NULL, '{"category":"finance.energy","description":"Long before trade wars and tariffs, China secured manufacturing dominance by controlling rare earths - a reality so consequential that the United States and its allies are now pledging more than $8.5 billion just to claw back some control of the supply chain. As global manufacturing expanded over th"}'::jsonb, '{"timestamp":"2026-02-27T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 5');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('jack-dorseys-block-cuts-thousands-of-jo-2026-02-27', 'article', 'Jack Dorsey''s Block cuts thousands of jobs as it embraces AI', 'https://www.bbc.com/news/articles/cq570d12y9do', 'The Twitter co-founder says artificial intelligence "fundamentally changes what it means to build and run a company."', 'BBC Business', '2026-02-27T00:06:40.000Z'),
    ('why-you-cant-get-a-signal-at-festivals-2026-02-27', 'article', 'Why you can''t get a signal at festivals and sports matches', 'https://www.bbc.com/news/articles/c3rzq8d24y9o', 'Connecting up music and sports events to the internet is a massive undertaking.', 'BBC Business', '2026-02-27T00:03:10.000Z'),
    ('trump-allies-david-and-larry-ellison-win-2026-02-27', 'article', 'Trump allies David and Larry Ellison win battle for Warner Bros. Discovery after Netflix bows out', 'https://www.marketwatch.com/story/warner-bros-discovery-deems-paramounts-bid-superior-putting-netflix-in-the-hot-seat-a1fcea7c?mod=mw_rss_topstories', 'The streaming giant said countering Paramount&#x2019;s bid was &#x201c;no longer financially attractive.&#x201d;', 'MarketWatch', '2026-02-27T00:14:00.000Z'),
    ('cloud-seeding-moves-from-fringe-science-2026-02-27', 'article', 'Cloud Seeding Moves From Fringe Science to Water Strategy', 'https://oilprice.com/Energy/Energy-General/Cloud-Seeding-Moves-From-Fringe-Science-to-Water-Strategy.html', 'When the UAE experienced severe floods two years ago, many questioned the country’s practice of so-called cloud seeding—the dispersion of certain chemicals in the air to basically squeeze more rain fr', 'OilPrice.com', '2026-02-27T00:00:00.000Z'),
    ('trump-s-secret-weapon-in-the-rare-earth-2026-02-27', 'article', 'Trump’s Secret Weapon in the Rare Earth War', 'https://oilprice.com/Energy/Energy-General/Trumps-Secret-Weapon-in-the-Rare-Earth-War.html', 'Long before trade wars and tariffs, China secured manufacturing dominance by controlling rare earths - a reality so consequential that the United States and its allies are now pledging more than $8.5 ', 'OilPrice.com', '2026-02-27T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 5');

  console.log('  \u2713 news-week9-day-2026-02-27-hour-01: 5 entities, 0 relations, 5 sources');
};
