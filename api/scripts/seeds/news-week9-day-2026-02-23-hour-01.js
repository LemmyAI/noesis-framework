/**
 * NOESIS Seed: Daily News — 2026-02-23 01:00 (Week 9, 2026)
 * Namespace: news.week9.day-2026-02-23
 * Built by seed-factory on 2026-02-23
 * Auto-gathered news: 5 stories, 2026-02-23 to 2026-02-23
 * Entities: 5 | Relations: 0 | Sources: 5
 */
module.exports = async function seed_news_week9_day_2026_02_23_hour_01(client) {
  console.log('  \u2192 Seeding: news-week9-day-2026-02-23-hour-01');

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
    ('news.week9.day-2026-02-23', 'news.week9', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('are-you-cut-out-for-living-and-working-i-2026-02-23', 'news.week9.day-2026-02-23', 'Event', 'Are you cut out for living and working in Antarctica?', NULL, '{"category":"finance","description":"Jobs are available on the icy continent for chefs, plumbers, carpenters and even hairdressers."}'::jsonb, '{"timestamp":"2026-02-23T00:01:56.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('uk-job-vacancies-fall-to-lowest-level-s-2026-02-23', 'news.week9.day-2026-02-23', 'Event', 'UK job vacancies ‘fall to lowest level since pandemic’', NULL, '{"category":"finance","description":"<p>Advertised roles dropped 3% last month to 695,000 – first dip below 700,000 since January 2021, job site Adzuna says</p><p>The number of job vacancies in the UK has tumbled to the lowest level in five years, research suggests, falling to levels not seen since the pandemic.</p><p>The number of job"}'::jsonb, '{"timestamp":"2026-02-23T00:01:51.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('my-wife-x2019-s-credit-card-payment-is-2026-02-23', 'news.week9.day-2026-02-23', 'Event', 'My wife&#x2019;s credit-card payment is three months overdue. As an authorized user, am I in trouble?', NULL, '{"category":"finance.markets","description":"&#x201c;All correspondence regarding the account was sent to my wife&#x2019;s email.&#x201d;"}'::jsonb, '{"timestamp":"2026-02-23T00:26:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('u-s-stock-futures-dip-as-investors-awai-2026-02-23', 'news.week9.day-2026-02-23', 'Event', 'U.S. stock futures dip as investors await clarity on Trump&#x2019;s latest tariff plans', NULL, '{"category":"finance.markets","description":"U.S. stock-market futures declined Sunday, as investors grappled with the implications of Friday&#x2019;s Supreme Court ruling that overturned most of President Donald Trump&#x2019;s tariffs."}'::jsonb, '{"timestamp":"2026-02-23T00:26:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('oil-traders-may-be-pricing-iran-risk-too-2026-02-23', 'news.week9.day-2026-02-23', 'Claim', 'Oil Traders May Be Pricing Iran Risk Too Lightly', NULL, '{"category":"finance.energy","description":"Crude oil prices on Thursday settled at the highest in six months, with Brent crude topping $71 per barrel and WTI over $66. However, this may be just the start of a much stronger rally—it all depends on developments between the United States and Iran. The latest round of negotiations between the tw"}'::jsonb, '{"timestamp":"2026-02-23T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 5');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('are-you-cut-out-for-living-and-working-i-2026-02-23', 'article', 'Are you cut out for living and working in Antarctica?', 'https://www.bbc.com/news/articles/cn0e30d9wj9o', 'Jobs are available on the icy continent for chefs, plumbers, carpenters and even hairdressers.', 'BBC Business', '2026-02-23T00:01:56.000Z'),
    ('uk-job-vacancies-fall-to-lowest-level-s-2026-02-23', 'article', 'UK job vacancies ‘fall to lowest level since pandemic’', 'https://www.theguardian.com/business/2026/feb/23/uk-job-vacancies-fall-to-lowest-level-since-pandemic', '<p>Advertised roles dropped 3% last month to 695,000 – first dip below 700,000 since January 2021, job site Adzuna says</p><p>The number of job vacancies in the UK has tumbled to the lowest level in f', 'The Guardian', '2026-02-23T00:01:51.000Z'),
    ('my-wife-x2019-s-credit-card-payment-is-2026-02-23', 'article', 'My wife&#x2019;s credit-card payment is three months overdue. As an authorized user, am I in trouble?', 'https://www.marketwatch.com/story/my-wifes-credit-card-payment-is-three-months-overdue-as-an-authorized-user-am-i-in-trouble-9094513f?mod=mw_rss_topstories', '&#x201c;All correspondence regarding the account was sent to my wife&#x2019;s email.&#x201d;', 'MarketWatch', '2026-02-23T00:26:00.000Z'),
    ('u-s-stock-futures-dip-as-investors-awai-2026-02-23', 'article', 'U.S. stock futures dip as investors await clarity on Trump&#x2019;s latest tariff plans', 'https://www.marketwatch.com/story/u-s-stock-futures-flat-as-investors-await-clarity-on-trumps-latest-tariff-plans-ae774ba0?mod=mw_rss_topstories', 'U.S. stock-market futures declined Sunday, as investors grappled with the implications of Friday&#x2019;s Supreme Court ruling that overturned most of President Donald Trump&#x2019;s tariffs.', 'MarketWatch', '2026-02-23T00:26:00.000Z'),
    ('oil-traders-may-be-pricing-iran-risk-too-2026-02-23', 'article', 'Oil Traders May Be Pricing Iran Risk Too Lightly', 'https://oilprice.com/Energy/Crude-Oil/Oil-Traders-May-Be-Pricing-Iran-Risk-Too-Lightly.html', 'Crude oil prices on Thursday settled at the highest in six months, with Brent crude topping $71 per barrel and WTI over $66. However, this may be just the start of a much stronger rally—it all depends', 'OilPrice.com', '2026-02-23T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 5');

  console.log('  \u2713 news-week9-day-2026-02-23-hour-01: 5 entities, 0 relations, 5 sources');
};
