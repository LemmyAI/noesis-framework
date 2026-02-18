/**
 * NOESIS Seed: Daily News — 2026-02-18 02:00 (Week 8, 2026)
 * Namespace: news.week8.day-2026-02-18
 * Built by seed-factory on 2026-02-18
 * Auto-gathered news: 13 stories, 2026-02-18 to 2026-02-18
 * Entities: 13 | Relations: 0 | Sources: 13
 */
module.exports = async function seed_news_week8_day_2026_02_18_hour_02(client) {
  console.log('  \u2192 Seeding: news-week8-day-2026-02-18-hour-02');

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
    ('news.week8.day-2026-02-18', 'news.week8', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('stephen-colbert-says-cbs-spiked-intervie-2026-02-18', 'news.week8.day-2026-02-18', 'Claim', 'Stephen Colbert says CBS spiked interview with Democrat over FCC fears', NULL, '{"category":"geopolitics","description":"The network denies it stopped the interview with a Texas Democrat from airing but warned it could run afoul of the US broadcast media watchdog."}'::jsonb, '{"timestamp":"2026-02-18T00:12:01.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('i-would-scream-in-my-sleep-women-from-s-2026-02-18', 'news.week8.day-2026-02-18', 'Event', 'I would scream in my sleep: Women from Syria''s Alawite minority tell of kidnap and rape', NULL, '{"category":"geopolitics","description":"The BBC hears harrowing accounts of assaults appearing to target the sect of former President Assad."}'::jsonb, '{"timestamp":"2026-02-18T00:20:03.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('under-pressure-from-trump-venezuelas-n-2026-02-18', 'news.week8.day-2026-02-18', 'Event', 'Under pressure from Trump, Venezuela''s new president has aces up her sleeve', NULL, '{"category":"geopolitics","description":"Delcy Rodriguez knows its in America''s interests for her to be a success"}'::jsonb, '{"timestamp":"2026-02-18T00:48:22.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('climber-on-trial-for-leaving-girlfriend-2026-02-18', 'news.week8.day-2026-02-18', 'Event', 'Climber on trial for leaving girlfriend to die on Austria''s highest mountain', NULL, '{"category":"geopolitics","description":"Kerstin G''s boyfriend is accused of leaving her unprotected and exhausted close to the summit during a blizzard."}'::jsonb, '{"timestamp":"2026-02-18T00:41:52.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('no-dna-matches-on-glove-found-in-nancy-g-2026-02-18', 'news.week8.day-2026-02-18', 'Fact', 'No DNA matches on glove found in Nancy Guthrie case, police say', NULL, '{"category":"geopolitics","description":"It''s been two weeks since the 84 year old''s disappearance and authorities say there have not been any arrests"}'::jsonb, '{"timestamp":"2026-02-18T00:14:44.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('illegal-skin-lightening-cream-being-sold-2026-02-18', 'news.week8.day-2026-02-18', 'Claim', 'Illegal skin lightening cream being sold in UK butchers, watchdog warns', NULL, '{"category":"finance","description":"A trade body has warned illegal skin bleaching products are being sold in an increasingly wide range of places."}'::jsonb, '{"timestamp":"2026-02-18T00:00:38.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('how-jesse-jackson-helped-empower-us-arab-2026-02-18', 'news.week8.day-2026-02-18', 'Event', 'How Jesse Jackson helped empower US Arabs and lift up the Palestinian cause', NULL, '{"category":"geopolitics","description":"Arab American advocates eulogise Jackson as a civil rights giant who embraced their communities and defended Palestine."}'::jsonb, '{"timestamp":"2026-02-18T01:09:54.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('russia-ukraine-war-list-of-key-events-2026-02-18', 'news.week8.day-2026-02-18', 'Event', 'Russia-Ukraine war: List of key events, day 1,455', NULL, '{"category":"geopolitics","description":"These are the key developments from day 1,455 of Russia’s war on Ukraine."}'::jsonb, '{"timestamp":"2026-02-18T01:04:50.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('nvidia-x2019-s-new-meta-deal-may-not-be-2026-02-18', 'news.week8.day-2026-02-18', 'Claim', 'Nvidia&#x2019;s new Meta deal may not be great news for these other tech stocks', NULL, '{"category":"finance.markets","description":"Shares of Broadcom, AMD and Arista fell after Nvidia and Meta announced an expansion of their partnership."}'::jsonb, '{"timestamp":"2026-02-18T01:01:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('palo-alto-networks-x2019-stock-slides-2026-02-18', 'news.week8.day-2026-02-18', 'Event', 'Palo Alto Networks&#x2019; stock slides as underwhelming outlook overshadows AI messaging', NULL, '{"category":"finance.markets","description":"The cybersecurity company says it&#x2019;s poised to benefit as AI creates &#x201c;new classes of risks.&#x201d;"}'::jsonb, '{"timestamp":"2026-02-18T00:38:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('this-auto-parts-maker-is-jumping-on-the-2026-02-18', 'news.week8.day-2026-02-18', 'Event', 'This auto-parts maker is jumping on the breakup bandwagon. Here&#x2019;s why the stock is tanking.', NULL, '{"category":"finance.markets","description":"Genuine Parts shares tumbled Tuesday after a big earnings miss overshadowed breakup plans."}'::jsonb, '{"timestamp":"2026-02-18T00:10:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('can-big-oil-succeed-where-diplomacy-has-2026-02-18', 'news.week8.day-2026-02-18', 'Event', 'Can Big Oil Succeed Where Diplomacy Has Failed in Libya?', NULL, '{"category":"finance.energy","description":"Libya’s first oil field licensing round since the removal of Muammar Gaddafi as leader in 2011 has seen a slew of major Western international oil companies (IOCs) choose to either re-enter the country after a long absence or bolster their existing operations in a stunning success for Tripoli. As par"}'::jsonb, '{"timestamp":"2026-02-18T01:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('super-tanker-rates-soar-amid-sanctions-2026-02-18', 'news.week8.day-2026-02-18', 'Event', 'Super Tanker Rates Soar Amid Sanctions, Supply Shifts, and Strategic Hoarding', NULL, '{"category":"finance.energy","description":"Geopolitics, growing oil supply, longer voyages, and disruptions due to sanctions and altered shipping lanes pushed crude oil tanker rates to multi-year highs at the end of 2025. After a dip in January, rates started climbing again this month in what shipping executives described as a fundamental sh"}'::jsonb, '{"timestamp":"2026-02-18T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 13');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('stephen-colbert-says-cbs-spiked-intervie-2026-02-18', 'article', 'Stephen Colbert says CBS spiked interview with Democrat over FCC fears', 'https://www.bbc.com/news/articles/cze0dk3yd5eo', 'The network denies it stopped the interview with a Texas Democrat from airing but warned it could run afoul of the US broadcast media watchdog.', 'BBC News', '2026-02-18T00:12:01.000Z'),
    ('i-would-scream-in-my-sleep-women-from-s-2026-02-18', 'article', 'I would scream in my sleep: Women from Syria''s Alawite minority tell of kidnap and rape', 'https://www.bbc.com/news/articles/cn5g751pl7lo', 'The BBC hears harrowing accounts of assaults appearing to target the sect of former President Assad.', 'BBC News', '2026-02-18T00:20:03.000Z'),
    ('under-pressure-from-trump-venezuelas-n-2026-02-18', 'article', 'Under pressure from Trump, Venezuela''s new president has aces up her sleeve', 'https://www.bbc.com/news/articles/cn87rv0jdy1o', 'Delcy Rodriguez knows its in America''s interests for her to be a success', 'BBC News', '2026-02-18T00:48:22.000Z'),
    ('climber-on-trial-for-leaving-girlfriend-2026-02-18', 'article', 'Climber on trial for leaving girlfriend to die on Austria''s highest mountain', 'https://www.bbc.com/news/articles/c5yv9plyjgpo', 'Kerstin G''s boyfriend is accused of leaving her unprotected and exhausted close to the summit during a blizzard.', 'BBC News', '2026-02-18T00:41:52.000Z'),
    ('no-dna-matches-on-glove-found-in-nancy-g-2026-02-18', 'article', 'No DNA matches on glove found in Nancy Guthrie case, police say', 'https://www.bbc.com/news/articles/cj0dqp9pleeo', 'It''s been two weeks since the 84 year old''s disappearance and authorities say there have not been any arrests', 'BBC News', '2026-02-18T00:14:44.000Z'),
    ('illegal-skin-lightening-cream-being-sold-2026-02-18', 'article', 'Illegal skin lightening cream being sold in UK butchers, watchdog warns', 'https://www.bbc.com/news/articles/c3rzn1pxr3qo', 'A trade body has warned illegal skin bleaching products are being sold in an increasingly wide range of places.', 'BBC Business', '2026-02-18T00:00:38.000Z'),
    ('how-jesse-jackson-helped-empower-us-arab-2026-02-18', 'article', 'How Jesse Jackson helped empower US Arabs and lift up the Palestinian cause', 'https://www.aljazeera.com/news/2026/2/18/jesse-jackson-helped-empower-us-arabs-and-raise-palestinian-cause', 'Arab American advocates eulogise Jackson as a civil rights giant who embraced their communities and defended Palestine.', 'Al Jazeera', '2026-02-18T01:09:54.000Z'),
    ('russia-ukraine-war-list-of-key-events-2026-02-18', 'article', 'Russia-Ukraine war: List of key events, day 1,455', 'https://www.aljazeera.com/news/2026/2/18/russia-ukraine-war-list-of-key-events-day-1455', 'These are the key developments from day 1,455 of Russia’s war on Ukraine.', 'Al Jazeera', '2026-02-18T01:04:50.000Z'),
    ('nvidia-x2019-s-new-meta-deal-may-not-be-2026-02-18', 'article', 'Nvidia&#x2019;s new Meta deal may not be great news for these other tech stocks', 'https://www.marketwatch.com/story/nvidias-new-meta-deal-may-not-be-great-news-for-these-other-tech-stocks-82b6e4d1?mod=mw_rss_topstories', 'Shares of Broadcom, AMD and Arista fell after Nvidia and Meta announced an expansion of their partnership.', 'MarketWatch', '2026-02-18T01:01:00.000Z'),
    ('palo-alto-networks-x2019-stock-slides-2026-02-18', 'article', 'Palo Alto Networks&#x2019; stock slides as underwhelming outlook overshadows AI messaging', 'https://www.marketwatch.com/story/palo-alto-networks-stock-slides-as-underwhelming-outlook-overshadows-ai-messaging-7bb6ad12?mod=mw_rss_topstories', 'The cybersecurity company says it&#x2019;s poised to benefit as AI creates &#x201c;new classes of risks.&#x201d;', 'MarketWatch', '2026-02-18T00:38:00.000Z'),
    ('this-auto-parts-maker-is-jumping-on-the-2026-02-18', 'article', 'This auto-parts maker is jumping on the breakup bandwagon. Here&#x2019;s why the stock is tanking.', 'https://www.marketwatch.com/story/this-auto-parts-maker-is-jumping-on-the-breakup-bandwagon-heres-why-the-stock-is-tanking-8d7da703?mod=mw_rss_topstories', 'Genuine Parts shares tumbled Tuesday after a big earnings miss overshadowed breakup plans.', 'MarketWatch', '2026-02-18T00:10:00.000Z'),
    ('can-big-oil-succeed-where-diplomacy-has-2026-02-18', 'article', 'Can Big Oil Succeed Where Diplomacy Has Failed in Libya?', 'https://oilprice.com/Energy/Energy-General/Can-Big-Oil-Succeed-Where-Diplomacy-Has-Failed-in-Libya.html', 'Libya’s first oil field licensing round since the removal of Muammar Gaddafi as leader in 2011 has seen a slew of major Western international oil companies (IOCs) choose to either re-enter the country', 'OilPrice.com', '2026-02-18T01:00:00.000Z'),
    ('super-tanker-rates-soar-amid-sanctions-2026-02-18', 'article', 'Super Tanker Rates Soar Amid Sanctions, Supply Shifts, and Strategic Hoarding', 'https://oilprice.com/Energy/Energy-General/Super-Tanker-Rates-Soar-Amid-Sanctions-Supply-Shifts-and-Strategic-Hoarding.html', 'Geopolitics, growing oil supply, longer voyages, and disruptions due to sanctions and altered shipping lanes pushed crude oil tanker rates to multi-year highs at the end of 2025. After a dip in Januar', 'OilPrice.com', '2026-02-18T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 13');

  console.log('  \u2713 news-week8-day-2026-02-18-hour-02: 13 entities, 0 relations, 13 sources');
};
