/**
 * NOESIS Seed: Daily News — 2026-02-22 06:00 (Week 8, 2026)
 * Namespace: news.week8.day-2026-02-22
 * Built by seed-factory on 2026-02-22
 * Auto-gathered news: 8 stories, 2026-02-22 to 2026-02-22
 * Entities: 8 | Relations: 0 | Sources: 8
 */
module.exports = async function seed_news_week8_day_2026_02_22_hour_06(client) {
  console.log('  \u2192 Seeding: news-week8-day-2026-02-22-hour-06');

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
    ('more-than-1-500-venezuelan-political-pri-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'More than 1,500 Venezuelan political prisoners apply for amnesty', NULL, '{"category":"geopolitics","description":"The announcement by the head of Venezuela''s National Assembly comes amid US pressure following the capture of ex-President Nicolás Maduro."}'::jsonb, '{"timestamp":"2026-02-22T05:04:57.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('willie-col-n-trombonist-who-pioneered-s-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'Willie Colón, trombonist who pioneered salsa music, dies aged 75', NULL, '{"category":"geopolitics","description":"His career spanned 60 years and dozens of albums and had been named among the most influential Latino artists of all time."}'::jsonb, '{"timestamp":"2026-02-22T01:49:42.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('thailand-moves-to-cut-sugar-in-popular-d-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'Thailand moves to cut sugar in popular drinks amid health drive', NULL, '{"category":"finance","description":"<p>Major chains agree to halve default sweetness, but street vendors and cafes remain outside sugar tax rules</p><p>A crowd of customers, holding phones aloft, watch intently as Auntie Nid mixes up her bestseller: an iced Thai tea.</p><p>Condensed milk is poured into a glass, followed by three heape"}'::jsonb, '{"timestamp":"2026-02-22T05:00:27.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('eight-bodies-found-in-libya-greece-as-t-2026-02-22', 'news.week8.day-2026-02-22', 'Fact', 'Eight bodies found in Libya, Greece as the toll in the Mediterranean rises', NULL, '{"category":"geopolitics","description":"Bodies of five asylum seekers wash ashore in Libya as three others die in a separate incident off the coast of Greece."}'::jsonb, '{"timestamp":"2026-02-22T05:00:52.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('russia-ukraine-war-list-of-key-events-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'Russia-Ukraine war: List of key events, day 1,459', NULL, '{"category":"geopolitics","description":"These are the key developments from day 1,459 of Russia’s war on Ukraine."}'::jsonb, '{"timestamp":"2026-02-22T03:33:05.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('trump-to-raise-us-global-tariff-from-10-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'Trump to raise US global tariff from 10 to 15% after Supreme Court ruling', NULL, '{"category":"geopolitics","description":"Move comes as businesses seek repayment for the estimated $133bn the Trump administration has already collected."}'::jsonb, '{"timestamp":"2026-02-22T03:00:32.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('pakistan-carries-out-strikes-in-afghanis-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'Pakistan carries out strikes in Afghanistan, ‘killing and wounding dozens’', NULL, '{"category":"geopolitics","description":"Afghan Defence Ministry says the strikes hit a school and homes, killing and wounding dozens of people."}'::jsonb, '{"timestamp":"2026-02-22T01:04:28.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('copper-unlikely-to-follow-near-term-gold-2026-02-22', 'news.week8.day-2026-02-22', 'Event', 'Copper Unlikely to Follow Near-Term Gold Rally', NULL, '{"category":"finance.energy","description":"Copper prices rallied to a record high of over $13,000 per ton last month, but retreated to about $12,700 this week as expectations of long-term demand strength collided with massive stockpiling at the key exchange hubs in the U.S. and China. Despite an unchanged outlook of soaring copper demand in "}'::jsonb, '{"timestamp":"2026-02-22T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 8');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('more-than-1-500-venezuelan-political-pri-2026-02-22', 'article', 'More than 1,500 Venezuelan political prisoners apply for amnesty', 'https://www.bbc.com/news/articles/c93w9g2dvn5o', 'The announcement by the head of Venezuela''s National Assembly comes amid US pressure following the capture of ex-President Nicolás Maduro.', 'BBC News', '2026-02-22T05:04:57.000Z'),
    ('willie-col-n-trombonist-who-pioneered-s-2026-02-22', 'article', 'Willie Colón, trombonist who pioneered salsa music, dies aged 75', 'https://www.bbc.com/news/articles/c98qjed249do', 'His career spanned 60 years and dozens of albums and had been named among the most influential Latino artists of all time.', 'BBC News', '2026-02-22T01:49:42.000Z'),
    ('thailand-moves-to-cut-sugar-in-popular-d-2026-02-22', 'article', 'Thailand moves to cut sugar in popular drinks amid health drive', 'https://www.theguardian.com/world/2026/feb/22/thailand-moves-to-cut-sugar-in-popular-drinks-amid-health-drive', '<p>Major chains agree to halve default sweetness, but street vendors and cafes remain outside sugar tax rules</p><p>A crowd of customers, holding phones aloft, watch intently as Auntie Nid mixes up he', 'The Guardian', '2026-02-22T05:00:27.000Z'),
    ('eight-bodies-found-in-libya-greece-as-t-2026-02-22', 'article', 'Eight bodies found in Libya, Greece as the toll in the Mediterranean rises', 'https://www.aljazeera.com/news/2026/2/22/eight-bodies-found-in-libya-and-greece-as-mediterranean-crossings-continue', 'Bodies of five asylum seekers wash ashore in Libya as three others die in a separate incident off the coast of Greece.', 'Al Jazeera', '2026-02-22T05:00:52.000Z'),
    ('russia-ukraine-war-list-of-key-events-2026-02-22', 'article', 'Russia-Ukraine war: List of key events, day 1,459', 'https://www.aljazeera.com/news/2026/2/22/russia-ukraine-war-list-of-key-events-day-1459', 'These are the key developments from day 1,459 of Russia’s war on Ukraine.', 'Al Jazeera', '2026-02-22T03:33:05.000Z'),
    ('trump-to-raise-us-global-tariff-from-10-2026-02-22', 'article', 'Trump to raise US global tariff from 10 to 15% after Supreme Court ruling', 'https://www.aljazeera.com/news/2026/2/22/trump-to-raise-us-global-tariff-from-ten-to-fifteen-percent-after-supreme-court-ruling', 'Move comes as businesses seek repayment for the estimated $133bn the Trump administration has already collected.', 'Al Jazeera', '2026-02-22T03:00:32.000Z'),
    ('pakistan-carries-out-strikes-in-afghanis-2026-02-22', 'article', 'Pakistan carries out strikes in Afghanistan, ‘killing and wounding dozens’', 'https://www.aljazeera.com/news/2026/2/22/pakistan-carries-out-strikes-in-afghanistan-after-islamabad-suicide-attack', 'Afghan Defence Ministry says the strikes hit a school and homes, killing and wounding dozens of people.', 'Al Jazeera', '2026-02-22T01:04:28.000Z'),
    ('copper-unlikely-to-follow-near-term-gold-2026-02-22', 'article', 'Copper Unlikely to Follow Near-Term Gold Rally', 'https://oilprice.com/Energy/Energy-General/Copper-Unlikely-to-Follow-Near-Term-Gold-Rally.html', 'Copper prices rallied to a record high of over $13,000 per ton last month, but retreated to about $12,700 this week as expectations of long-term demand strength collided with massive stockpiling at th', 'OilPrice.com', '2026-02-22T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 8');

  console.log('  \u2713 news-week8-day-2026-02-22-hour-06: 8 entities, 0 relations, 8 sources');
};
