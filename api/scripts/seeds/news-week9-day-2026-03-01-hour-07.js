/**
 * NOESIS Seed: Daily News — 2026-03-01 07:00 (Week 9, 2026)
 * Namespace: news.week9.day-2026-03-01
 * Built by seed-factory on 2026-03-01
 * Auto-gathered news: 13 stories, 2026-03-01 to 2026-03-01
 * Entities: 13 | Relations: 0 | Sources: 13
 */
module.exports = async function seed_news_week9_day_2026_03_01_hour_07(client) {
  console.log('  \u2192 Seeding: news-week9-day-2026-03-01-hour-07');

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
    ('news.week9.day-2026-03-01', 'news.week9', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('ayatollah-khameneis-iron-grip-on-power-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'Ayatollah Khamenei''s iron grip on power in Iran comes to an end', NULL, '{"category":"geopolitics","description":"Iranian state TV confirms the supreme leader has been killed on the first day of massive US and Israeli air strikes on the country."}'::jsonb, '{"timestamp":"2026-03-01T01:47:42.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('what-we-know-so-far-supreme-leader-kham-2026-03-01', 'news.week9.day-2026-03-01', 'Decision', 'What we know so far: Supreme Leader Khamenei killed, as Iran launches retaliatory strikes', NULL, '{"category":"geopolitics","description":"Iran responds by launching missiles and drones towards Israel and four Gulf Arab countries that host US military bases."}'::jsonb, '{"timestamp":"2026-03-01T03:57:42.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('iran-says-us-and-israel-strikes-hit-scho-2026-03-01', 'news.week9.day-2026-03-01', 'Claim', 'Iran says US and Israel strikes hit school killing 108', NULL, '{"category":"geopolitics","description":"There is no confirmation by the US or Israel of the strike on the school located near elite military troops."}'::jsonb, '{"timestamp":"2026-03-01T02:34:04.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('wellness-peptide-craze-why-people-are-i-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'Wellness peptide craze: Why people are injecting drugs ''not for human consumption''', NULL, '{"category":"geopolitics","description":"Growing numbers of people are injecting unregulated peptides for health reasons - but one expert says they are \\"lab rats\\"."}'::jsonb, '{"timestamp":"2026-03-01T00:51:29.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('why-is-whatsapps-privacy-policy-facing-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'Why is WhatsApp''s privacy policy facing a legal challenge in India?', NULL, '{"category":"geopolitics","description":"A 2021 policy update requires users to share data with Meta for ads purposes to continue using the app."}'::jsonb, '{"timestamp":"2026-03-01T00:21:43.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('hundreds-of-thousands-of-travellers-stra-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'Hundreds of thousands of travellers stranded or diverted amid air space closures in Middle East', NULL, '{"category":"finance","description":"<p>Chaos as key transit hubs in Dubai, Abu Dhabi and Doha close, and more than 1,000 flights by major Middle Eastern airlines cancelled</p><ul><li><p><a href=\\"https://www.theguardian.com/us-news/2026/feb/28/khamenei-likely-killed-us-israel-iran-strikes\\">Full report: Iran state media confirms killing"}'::jsonb, '{"timestamp":"2026-03-01T04:24:36.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('netanyahu-s-war-analysts-say-trump-s-ir-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'Netanyahu’s war? Analysts say Trump’s Iran strikes benefit Israel, not US', NULL, '{"category":"geopolitics","description":"War with Iran contradicts the US president''s own criticism of regime change policies in the Middle East, analysts say."}'::jsonb, '{"timestamp":"2026-03-01T02:14:32.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('us-strikes-on-iran-lead-to-renewed-deman-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'US strikes on Iran lead to renewed demands for war powers legislation', NULL, '{"category":"geopolitics","description":"Democratic lawmakers have largely condemned the strikes on Iran, emphasising the lack of congressional approval."}'::jsonb, '{"timestamp":"2026-03-01T01:48:20.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('new-yorkers-protest-us-strikes-on-iran-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'New Yorkers protest US strikes on Iran', NULL, '{"category":"geopolitics","description":"New Yorkers protested Saturday hours after US President Donald Trump ordered a wave of deadly strikes on Iran."}'::jsonb, '{"timestamp":"2026-03-01T00:33:46.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('iranian-ambassador-to-un-calls-us-israel-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'Iranian Ambassador to UN calls US-Israeli attacks a ‘war crime’', NULL, '{"category":"geopolitics","description":"Iranian Ambassador to the United Nations, Amir-Saeid Iravani denounced US-Israeli military strikes across the country."}'::jsonb, '{"timestamp":"2026-03-01T00:05:38.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('u-s-iran-war-attracts-600-million-bets-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'U.S.-Iran war attracts $600 million bets on Polymarket', NULL, '{"category":"finance.crypto","description":"The prediction market has spun up over a dozen Iran-related contracts since Saturday''s strikes, with the Khamenei removal market alone pulling in $45 million in volume."}'::jsonb, '{"timestamp":"2026-03-01T04:19:51.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('bitcoin-tops-68-000-after-iran-confirms-2026-03-01', 'news.week9.day-2026-03-01', 'Fact', 'Bitcoin tops $68,000 after Iran confirms leader killed in U.S., Israel airstrikes', NULL, '{"category":"finance.crypto","description":"The death of Iran''s supreme leader opens the door to regime change, and markets are pricing in a shorter period of tension."}'::jsonb, '{"timestamp":"2026-03-01T03:36:02.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('the-trap-anthropic-built-for-itself-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'The trap Anthropic built for itself', NULL, '{"category":"technology.ai","description":"Anthropic, OpenAI, Google DeepMind and others have long promised to govern themselves responsibly. Now, in the absence of rules, there''s not a lot to protect them."}'::jsonb, '{"timestamp":"2026-03-01T00:08:58.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 13');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('ayatollah-khameneis-iron-grip-on-power-2026-03-01', 'article', 'Ayatollah Khamenei''s iron grip on power in Iran comes to an end', 'https://www.bbc.com/news/articles/c3gdnpjvj4ko', 'Iranian state TV confirms the supreme leader has been killed on the first day of massive US and Israeli air strikes on the country.', 'BBC News', '2026-03-01T01:47:42.000Z'),
    ('what-we-know-so-far-supreme-leader-kham-2026-03-01', 'article', 'What we know so far: Supreme Leader Khamenei killed, as Iran launches retaliatory strikes', 'https://www.bbc.com/news/articles/cx2dyz6p3weo', 'Iran responds by launching missiles and drones towards Israel and four Gulf Arab countries that host US military bases.', 'BBC News', '2026-03-01T03:57:42.000Z'),
    ('iran-says-us-and-israel-strikes-hit-scho-2026-03-01', 'article', 'Iran says US and Israel strikes hit school killing 108', 'https://www.bbc.com/news/articles/c1l7rvqq51eo', 'There is no confirmation by the US or Israel of the strike on the school located near elite military troops.', 'BBC News', '2026-03-01T02:34:04.000Z'),
    ('wellness-peptide-craze-why-people-are-i-2026-03-01', 'article', 'Wellness peptide craze: Why people are injecting drugs ''not for human consumption''', 'https://www.bbc.com/news/articles/cdr268m5pxro', 'Growing numbers of people are injecting unregulated peptides for health reasons - but one expert says they are "lab rats".', 'BBC News', '2026-03-01T00:51:29.000Z'),
    ('why-is-whatsapps-privacy-policy-facing-2026-03-01', 'article', 'Why is WhatsApp''s privacy policy facing a legal challenge in India?', 'https://www.bbc.com/news/articles/cp81wegj123o', 'A 2021 policy update requires users to share data with Meta for ads purposes to continue using the app.', 'BBC News', '2026-03-01T00:21:43.000Z'),
    ('hundreds-of-thousands-of-travellers-stra-2026-03-01', 'article', 'Hundreds of thousands of travellers stranded or diverted amid air space closures in Middle East', 'https://www.theguardian.com/us-news/2026/mar/01/hundreds-of-thousands-of-travellers-stranded-or-diverted-amid-air-space-closures-in-middle-east', '<p>Chaos as key transit hubs in Dubai, Abu Dhabi and Doha close, and more than 1,000 flights by major Middle Eastern airlines cancelled</p><ul><li><p><a href="https://www.theguardian.com/us-news/2026/', 'The Guardian', '2026-03-01T04:24:36.000Z'),
    ('netanyahu-s-war-analysts-say-trump-s-ir-2026-03-01', 'article', 'Netanyahu’s war? Analysts say Trump’s Iran strikes benefit Israel, not US', 'https://www.aljazeera.com/news/2026/3/1/netanyahus-war-analysts-say-trumps-iran-strikes-benefit-israel-not-us', 'War with Iran contradicts the US president''s own criticism of regime change policies in the Middle East, analysts say.', 'Al Jazeera', '2026-03-01T02:14:32.000Z'),
    ('us-strikes-on-iran-lead-to-renewed-deman-2026-03-01', 'article', 'US strikes on Iran lead to renewed demands for war powers legislation', 'https://www.aljazeera.com/news/2026/3/1/us-strikes-on-iran-lead-to-renewed-demands-for-war-powers-legislation', 'Democratic lawmakers have largely condemned the strikes on Iran, emphasising the lack of congressional approval.', 'Al Jazeera', '2026-03-01T01:48:20.000Z'),
    ('new-yorkers-protest-us-strikes-on-iran-2026-03-01', 'article', 'New Yorkers protest US strikes on Iran', 'https://www.aljazeera.com/video/newsfeed/2026/3/1/new-yorkers-protest-us-strikes-on-iran', 'New Yorkers protested Saturday hours after US President Donald Trump ordered a wave of deadly strikes on Iran.', 'Al Jazeera', '2026-03-01T00:33:46.000Z'),
    ('iranian-ambassador-to-un-calls-us-israel-2026-03-01', 'article', 'Iranian Ambassador to UN calls US-Israeli attacks a ‘war crime’', 'https://www.aljazeera.com/video/newsfeed/2026/3/1/iranian-ambassador-to-un-calls-us-israeli-attacks-a-war', 'Iranian Ambassador to the United Nations, Amir-Saeid Iravani denounced US-Israeli military strikes across the country.', 'Al Jazeera', '2026-03-01T00:05:38.000Z'),
    ('u-s-iran-war-attracts-600-million-bets-2026-03-01', 'article', 'U.S.-Iran war attracts $600 million bets on Polymarket', 'https://www.coindesk.com/markets/2026/03/01/iran-war-becomes-usd50-million-betting-frenzy-on-polymarket', 'The prediction market has spun up over a dozen Iran-related contracts since Saturday''s strikes, with the Khamenei removal market alone pulling in $45 million in volume.', 'CoinDesk', '2026-03-01T04:19:51.000Z'),
    ('bitcoin-tops-68-000-after-iran-confirms-2026-03-01', 'article', 'Bitcoin tops $68,000 after Iran confirms leader killed in U.S., Israel airstrikes', 'https://www.coindesk.com/markets/2026/03/01/bitcoin-tops-usd68-000-after-iran-confirms-leader-killed-in-u-s-israel-airstrikes', 'The death of Iran''s supreme leader opens the door to regime change, and markets are pricing in a shorter period of tension.', 'CoinDesk', '2026-03-01T03:36:02.000Z'),
    ('the-trap-anthropic-built-for-itself-2026-03-01', 'article', 'The trap Anthropic built for itself', 'https://techcrunch.com/2026/02/28/the-trap-anthropic-built-for-itself/', 'Anthropic, OpenAI, Google DeepMind and others have long promised to govern themselves responsibly. Now, in the absence of rules, there''s not a lot to protect them.', 'TechCrunch', '2026-03-01T00:08:58.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 13');

  console.log('  \u2713 news-week9-day-2026-03-01-hour-07: 13 entities, 0 relations, 13 sources');
};
