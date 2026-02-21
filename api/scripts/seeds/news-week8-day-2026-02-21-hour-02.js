/**
 * NOESIS Seed: Daily News — 2026-02-21 02:00 (Week 8, 2026)
 * Namespace: news.week8.day-2026-02-21
 * Built by seed-factory on 2026-02-21
 * Auto-gathered news: 7 stories, 2026-02-21 to 2026-02-21
 * Entities: 7 | Relations: 0 | Sources: 7
 */
module.exports = async function seed_news_week8_day_2026_02_21_hour_02(client) {
  console.log('  \u2192 Seeding: news-week8-day-2026-02-21-hour-02');

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
    ('news.week8.day-2026-02-21', 'news.week8', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('trump-lashes-out-at-supreme-court-justic-2026-02-21', 'news.week8.day-2026-02-21', 'Event', 'Trump lashes out at Supreme Court justices over tariffs ruling', NULL, '{"category":"geopolitics","description":"The six justices who voted against the tariffs, dealing a major blow to his signature economic policy, should be \\"absolutely ashamed\\", Trump said."}'::jsonb, '{"timestamp":"2026-02-21T00:49:09.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('trump-imposes-global-10-tariff-and-rail-2026-02-21', 'news.week8.day-2026-02-21', 'Event', 'Trump imposes global 10% tariff and rails against supreme court justices', NULL, '{"category":"finance","description":"<p>President calls decision a ‘disgrace to the nation’ while praising three justices who dissented</p><ul><li><p><a href=\\"https://www.theguardian.com/us-news/live/2026/feb/20/us-iran-nuclear-deal-trump-agreement-strikes-latest-news-live-updates\\">US politics live – latest updates</a></p></li></ul><p>"}'::jsonb, '{"timestamp":"2026-02-21T00:04:01.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('us-military-says-it-attacked-vessel-in-p-2026-02-21', 'news.week8.day-2026-02-21', 'Claim', 'US military says it attacked vessel in Pacific Ocean, killing three people', NULL, '{"category":"geopolitics","description":"US military''s Southern Command (SOUTHCOM) claimed the vessel was involved in drug trafficking without providing proof."}'::jsonb, '{"timestamp":"2026-02-21T01:04:15.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('don-x2019-t-expect-lower-prices-now-tha-2026-02-21', 'news.week8.day-2026-02-21', 'Event', 'Don&#x2019;t expect lower prices now that the Supreme Court has ruled against Trump&#x2019;s tariffs', NULL, '{"category":"finance.markets","description":"The Supreme Court&#x2019;s decision to strike down many of President Donald Trump&#x2019;s tariffs is a massive blow to the president&#x2019;s agenda. But for cost-conscious consumers, the immediate impact could be further economic uncertainty, with few price cuts in store."}'::jsonb, '{"timestamp":"2026-02-21T01:05:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('x2018-am-i-crazy-x2019-my-boyfriend-2026-02-21', 'news.week8.day-2026-02-21', 'Event', '&#x2018;Am I crazy?&#x2019; My boyfriend&#x2019;s parents say he shouldn&#x2019;t marry me until he earns $50K a year. Who is to blame here?', NULL, '{"category":"finance.markets","description":"&#x201c;Am I crazy, or are these &#x2018;real&#x2019; concerns from his parents?&#x201d;"}'::jsonb, '{"timestamp":"2026-02-21T00:31:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('the-quiet-revolution-reshaping-america-2026-02-21', 'news.week8.day-2026-02-21', 'Event', 'The Quiet Revolution Reshaping America''s Energy Future', NULL, '{"category":"finance.energy","description":"A geothermal revolution is unfolding around the United States in ways both flashy and quiet. As Big Tech becomes increasingly involved in developing alternative energy sources to meet skyrocketing energy demand driven by the AI boom, innovative and advanced geothermal technologies have been taking o"}'::jsonb, '{"timestamp":"2026-02-21T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('india-8217-s-sarvam-launches-indus-ai-c-2026-02-21', 'news.week8.day-2026-02-21', 'Decision', 'India''s Sarvam launches Indus AI chat app as competition heats up', NULL, '{"category":"technology.ai","description":"Sarvam''s Indus chat app is currently available in beta."}'::jsonb, '{"timestamp":"2026-02-21T01:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 7');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('trump-lashes-out-at-supreme-court-justic-2026-02-21', 'article', 'Trump lashes out at Supreme Court justices over tariffs ruling', 'https://www.bbc.com/news/articles/cd9g0e7zd8wo', 'The six justices who voted against the tariffs, dealing a major blow to his signature economic policy, should be "absolutely ashamed", Trump said.', 'BBC News', '2026-02-21T00:49:09.000Z'),
    ('trump-imposes-global-10-tariff-and-rail-2026-02-21', 'article', 'Trump imposes global 10% tariff and rails against supreme court justices', 'https://www.theguardian.com/us-news/2026/feb/20/trump-tariff-scotus-response', '<p>President calls decision a ‘disgrace to the nation’ while praising three justices who dissented</p><ul><li><p><a href="https://www.theguardian.com/us-news/live/2026/feb/20/us-iran-nuclear-deal-trum', 'The Guardian', '2026-02-21T00:04:01.000Z'),
    ('us-military-says-it-attacked-vessel-in-p-2026-02-21', 'article', 'US military says it attacked vessel in Pacific Ocean, killing three people', 'https://www.aljazeera.com/news/2026/2/21/us-military-says-it-attacked-vessel-in-pacific-ocean-killing-three-people', 'US military''s Southern Command (SOUTHCOM) claimed the vessel was involved in drug trafficking without providing proof.', 'Al Jazeera', '2026-02-21T01:04:15.000Z'),
    ('don-x2019-t-expect-lower-prices-now-tha-2026-02-21', 'article', 'Don&#x2019;t expect lower prices now that the Supreme Court has ruled against Trump&#x2019;s tariffs', 'https://www.marketwatch.com/story/dont-expect-lower-prices-now-that-the-supreme-court-ruled-against-trumps-tariffs-7334f6c9?mod=mw_rss_topstories', 'The Supreme Court&#x2019;s decision to strike down many of President Donald Trump&#x2019;s tariffs is a massive blow to the president&#x2019;s agenda. But for cost-conscious consumers, the immediate i', 'MarketWatch', '2026-02-21T01:05:00.000Z'),
    ('x2018-am-i-crazy-x2019-my-boyfriend-2026-02-21', 'article', '&#x2018;Am I crazy?&#x2019; My boyfriend&#x2019;s parents say he shouldn&#x2019;t marry me until he earns $50K a year. Who is to blame here?', 'https://www.marketwatch.com/story/weve-been-dating-for-5-years-my-boyfriends-parents-say-he-doesnt-earn-enough-to-marry-should-i-speak-to-his-father-44b48700?mod=mw_rss_topstories', '&#x201c;Am I crazy, or are these &#x2018;real&#x2019; concerns from his parents?&#x201d;', 'MarketWatch', '2026-02-21T00:31:00.000Z'),
    ('the-quiet-revolution-reshaping-america-2026-02-21', 'article', 'The Quiet Revolution Reshaping America''s Energy Future', 'https://oilprice.com/Energy/Energy-General/The-Quiet-Revolution-Reshaping-Americas-Energy-Future.html', 'A geothermal revolution is unfolding around the United States in ways both flashy and quiet. As Big Tech becomes increasingly involved in developing alternative energy sources to meet skyrocketing ene', 'OilPrice.com', '2026-02-21T00:00:00.000Z'),
    ('india-8217-s-sarvam-launches-indus-ai-c-2026-02-21', 'article', 'India''s Sarvam launches Indus AI chat app as competition heats up', 'https://techcrunch.com/2026/02/20/indias-sarvam-launches-indus-ai-chat-app-as-competition-heats-up/', 'Sarvam''s Indus chat app is currently available in beta.', 'TechCrunch', '2026-02-21T01:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 7');

  console.log('  \u2713 news-week8-day-2026-02-21-hour-02: 7 entities, 0 relations, 7 sources');
};
