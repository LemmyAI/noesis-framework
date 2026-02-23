/**
 * NOESIS Seed: Daily News — 2026-02-23 03:00 (Week 9, 2026)
 * Namespace: news.week9.day-2026-02-23
 * Built by seed-factory on 2026-02-23
 * Auto-gathered news: 11 stories, 2026-02-23 to 2026-02-23
 * Entities: 11 | Relations: 1 | Sources: 11
 * Narratives: Crypto Markets
 */
module.exports = async function seed_news_week9_day_2026_02_23_hour_03(client) {
  console.log('  \u2192 Seeding: news-week9-day-2026-02-23-hour-03');

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
    ('mexicos-most-wanted-drug-lord-el-mench-2026-02-23', 'news.week9.day-2026-02-23', 'Fact', 'Mexico''s most wanted drug lord ''El Mencho'' killed in military operation', NULL, '{"category":"geopolitics","description":"Nemesio Oseguera Cervantes, known as \\"El Mencho\\", headed one of Mexico''s most powerful drug cartels."}'::jsonb, '{"timestamp":"2026-02-23T00:55:41.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('how-budget-fast-fashion-is-taking-small-2026-02-23', 'news.week9.day-2026-02-23', 'Event', 'How budget fast fashion is taking small-town India by storm', NULL, '{"category":"finance","description":"More Indians in small towns are now shopping for affordable brands instead of unlabelled goods in the bazaars."}'::jsonb, '{"timestamp":"2026-02-23T00:40:05.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('are-you-cut-out-for-living-and-working-i-2026-02-23', 'news.week9.day-2026-02-23', 'Event', 'Are you cut out for living and working in Antarctica?', NULL, '{"category":"finance","description":"Jobs are available on the icy continent for chefs, plumbers, carpenters and even hairdressers."}'::jsonb, '{"timestamp":"2026-02-23T00:01:56.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('violence-erupts-after-mexican-security-f-2026-02-23', 'news.week9.day-2026-02-23', 'Event', 'Violence erupts after Mexican security forces kill drug cartel boss ‘El Mencho’', NULL, '{"category":"geopolitics","description":"<p>Death of Nemesio Oseguera Cervantes, one of world’s most wanted drug traffickers, sets off wave of disorder across several Mexican states</p><p>One of the world’s most wanted drug traffickers, the <a href=\\"https://www.theguardian.com/world/mexico\\">Mexican</a> cartel boss known as “El Mencho”, has"}'::jsonb, '{"timestamp":"2026-02-23T00:39:49.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('uk-job-vacancies-fall-to-lowest-level-s-2026-02-23', 'news.week9.day-2026-02-23', 'Event', 'UK job vacancies ‘fall to lowest level since pandemic’', NULL, '{"category":"finance","description":"<p>Advertised roles dropped 3% last month to 695,000 – first dip below 700,000 since January 2021, job site Adzuna says</p><p>The number of job vacancies in the UK has tumbled to the lowest level in five years, research suggests, falling to levels not seen since the pandemic.</p><p>The number of job"}'::jsonb, '{"timestamp":"2026-02-23T00:01:51.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('russia-ukraine-war-list-of-key-events-2026-02-23', 'news.week9.day-2026-02-23', 'Event', 'Russia-Ukraine war: List of key events, day 1,460', NULL, '{"category":"geopolitics","description":"These are the key developments from day 1,460 of Russia’s war on Ukraine."}'::jsonb, '{"timestamp":"2026-02-23T02:02:59.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('bitcoin-slides-5-tumbling-below-65-0-2026-02-23', 'news.week9.day-2026-02-23', 'Event', 'Bitcoin slides 5%,  tumbling below $65,000 as whale selling grows and recent buyers lock in losses', NULL, '{"category":"finance.crypto","description":"On-chain data from Glassnode and CryptoQuant shows large holders dominating exchange inflows while short-term investors continue to sell at a loss, pointing to a fragile base-building phase."}'::jsonb, '{"timestamp":"2026-02-23T01:49:11.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('u-s-stock-futures-dollar-and-bitcoin-d-2026-02-23', 'news.week9.day-2026-02-23', 'Event', 'U.S. stock futures, dollar and bitcoin drop as investors await clarity on Trump&#x2019;s latest tariff plans', NULL, '{"category":"finance.markets","description":"U.S. stock-index futures declined Sunday, as investors grappled with the implications of Friday&#x2019;s Supreme Court ruling that overturned most of President Donald Trump&#x2019;s tariffs."}'::jsonb, '{"timestamp":"2026-02-23T02:17:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('tariff-costs-and-refunds-take-the-spotli-2026-02-23', 'news.week9.day-2026-02-23', 'Event', 'Tariff costs and refunds take the spotlight as Home Depot, TJX and other retailers report earnings this week', NULL, '{"category":"finance.markets","description":"The Supreme Court struck down most of the Trump administration&#x2019;s tariffs, but uncertainty remains for store chains."}'::jsonb, '{"timestamp":"2026-02-23T01:57:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('my-wife-x2019-s-credit-card-payment-is-2026-02-23', 'news.week9.day-2026-02-23', 'Event', 'My wife&#x2019;s credit-card payment is three months overdue. As an authorized user, am I in trouble?', NULL, '{"category":"finance.markets","description":"&#x201c;All correspondence regarding the account was sent to my wife&#x2019;s email.&#x201d;"}'::jsonb, '{"timestamp":"2026-02-23T00:26:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('oil-traders-may-be-pricing-iran-risk-too-2026-02-23', 'news.week9.day-2026-02-23', 'Claim', 'Oil Traders May Be Pricing Iran Risk Too Lightly', NULL, '{"category":"finance.energy","description":"Crude oil prices on Thursday settled at the highest in six months, with Brent crude topping $71 per barrel and WTI over $66. However, this may be just the start of a much stronger rally—it all depends on developments between the United States and Iran. The latest round of negotiations between the tw"}'::jsonb, '{"timestamp":"2026-02-23T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 11');

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('bitcoin-slides-5-tumbling-below-65-0-2026-02-23', 'u-s-stock-futures-dollar-and-bitcoin-d-2026-02-23', 'causes', 1, 'Crypto Markets', '{}'::jsonb)
    ON CONFLICT DO NOTHING
  `);
  console.log('    Relations: 1');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('mexicos-most-wanted-drug-lord-el-mench-2026-02-23', 'article', 'Mexico''s most wanted drug lord ''El Mencho'' killed in military operation', 'https://www.bbc.com/news/articles/cy4wywnrdd8o', 'Nemesio Oseguera Cervantes, known as "El Mencho", headed one of Mexico''s most powerful drug cartels.', 'BBC News', '2026-02-23T00:55:41.000Z'),
    ('how-budget-fast-fashion-is-taking-small-2026-02-23', 'article', 'How budget fast fashion is taking small-town India by storm', 'https://www.bbc.com/news/articles/c15xvy7k2q5o', 'More Indians in small towns are now shopping for affordable brands instead of unlabelled goods in the bazaars.', 'BBC Business', '2026-02-23T00:40:05.000Z'),
    ('are-you-cut-out-for-living-and-working-i-2026-02-23', 'article', 'Are you cut out for living and working in Antarctica?', 'https://www.bbc.com/news/articles/cn0e30d9wj9o', 'Jobs are available on the icy continent for chefs, plumbers, carpenters and even hairdressers.', 'BBC Business', '2026-02-23T00:01:56.000Z'),
    ('violence-erupts-after-mexican-security-f-2026-02-23', 'article', 'Violence erupts after Mexican security forces kill drug cartel boss ‘El Mencho’', 'https://www.theguardian.com/world/2026/feb/22/mexican-security-forces-reportedly-kill-drug-cartel-boss-el-mencho', '<p>Death of Nemesio Oseguera Cervantes, one of world’s most wanted drug traffickers, sets off wave of disorder across several Mexican states</p><p>One of the world’s most wanted drug traffickers, the ', 'The Guardian', '2026-02-23T00:39:49.000Z'),
    ('uk-job-vacancies-fall-to-lowest-level-s-2026-02-23', 'article', 'UK job vacancies ‘fall to lowest level since pandemic’', 'https://www.theguardian.com/business/2026/feb/23/uk-job-vacancies-fall-to-lowest-level-since-pandemic', '<p>Advertised roles dropped 3% last month to 695,000 – first dip below 700,000 since January 2021, job site Adzuna says</p><p>The number of job vacancies in the UK has tumbled to the lowest level in f', 'The Guardian', '2026-02-23T00:01:51.000Z'),
    ('russia-ukraine-war-list-of-key-events-2026-02-23', 'article', 'Russia-Ukraine war: List of key events, day 1,460', 'https://www.aljazeera.com/news/2026/2/23/russia-ukraine-war-list-of-key-events-day-1460', 'These are the key developments from day 1,460 of Russia’s war on Ukraine.', 'Al Jazeera', '2026-02-23T02:02:59.000Z'),
    ('bitcoin-slides-5-tumbling-below-65-0-2026-02-23', 'article', 'Bitcoin slides 5%,  tumbling below $65,000 as whale selling grows and recent buyers lock in losses', 'https://www.coindesk.com/markets/2026/02/23/bitcoin-slides-4-to-usd65-000-as-whale-selling-grows-and-recent-buyers-lock-in-losses', 'On-chain data from Glassnode and CryptoQuant shows large holders dominating exchange inflows while short-term investors continue to sell at a loss, pointing to a fragile base-building phase.', 'CoinDesk', '2026-02-23T01:49:11.000Z'),
    ('u-s-stock-futures-dollar-and-bitcoin-d-2026-02-23', 'article', 'U.S. stock futures, dollar and bitcoin drop as investors await clarity on Trump&#x2019;s latest tariff plans', 'https://www.marketwatch.com/story/u-s-stock-futures-flat-as-investors-await-clarity-on-trumps-latest-tariff-plans-ae774ba0?mod=mw_rss_topstories', 'U.S. stock-index futures declined Sunday, as investors grappled with the implications of Friday&#x2019;s Supreme Court ruling that overturned most of President Donald Trump&#x2019;s tariffs.', 'MarketWatch', '2026-02-23T02:17:00.000Z'),
    ('tariff-costs-and-refunds-take-the-spotli-2026-02-23', 'article', 'Tariff costs and refunds take the spotlight as Home Depot, TJX and other retailers report earnings this week', 'https://www.marketwatch.com/story/tariffs-costs-and-refunds-take-the-spotlight-as-home-depot-tjx-and-other-retailers-report-earnings-this-week-7f2a144a?mod=mw_rss_topstories', 'The Supreme Court struck down most of the Trump administration&#x2019;s tariffs, but uncertainty remains for store chains.', 'MarketWatch', '2026-02-23T01:57:00.000Z'),
    ('my-wife-x2019-s-credit-card-payment-is-2026-02-23', 'article', 'My wife&#x2019;s credit-card payment is three months overdue. As an authorized user, am I in trouble?', 'https://www.marketwatch.com/story/my-wifes-credit-card-payment-is-three-months-overdue-as-an-authorized-user-am-i-in-trouble-9094513f?mod=mw_rss_topstories', '&#x201c;All correspondence regarding the account was sent to my wife&#x2019;s email.&#x201d;', 'MarketWatch', '2026-02-23T00:26:00.000Z'),
    ('oil-traders-may-be-pricing-iran-risk-too-2026-02-23', 'article', 'Oil Traders May Be Pricing Iran Risk Too Lightly', 'https://oilprice.com/Energy/Crude-Oil/Oil-Traders-May-Be-Pricing-Iran-Risk-Too-Lightly.html', 'Crude oil prices on Thursday settled at the highest in six months, with Brent crude topping $71 per barrel and WTI over $66. However, this may be just the start of a much stronger rally—it all depends', 'OilPrice.com', '2026-02-23T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 11');

  console.log('  \u2713 news-week9-day-2026-02-23-hour-03: 11 entities, 1 relations, 11 sources');
};
