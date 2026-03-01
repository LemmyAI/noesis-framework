/**
 * NOESIS Seed: Daily News — 2026-03-01 01:00 (Week 9, 2026)
 * Namespace: news.week9.day-2026-03-01
 * Built by seed-factory on 2026-03-01
 * Auto-gathered news: 4 stories, 2026-03-01 to 2026-03-01
 * Entities: 4 | Relations: 0 | Sources: 4
 */
module.exports = async function seed_news_week9_day_2026_03_01_hour_01(client) {
  console.log('  \u2192 Seeding: news-week9-day-2026-03-01-hour-01');

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
    ('why-is-whatsapps-privacy-policy-facing-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'Why is WhatsApp''s privacy policy facing a legal challenge in India?', NULL, '{"category":"geopolitics","description":"A 2021 policy update requires users to share data with Meta for ads purposes to continue using the app."}'::jsonb, '{"timestamp":"2026-03-01T00:21:43.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('hundreds-of-thousands-of-travellers-stra-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'Hundreds of thousands of travellers stranded or diverted amid air space closures in Middle East', NULL, '{"category":"finance","description":"<p>Chaos as key transit hubs in Dubai, Abu Dhabi and Doha close, and more than 1,000 flights by major Middle Eastern airlines cancelled</p><ul><li><p><a href=\\"https://www.theguardian.com/us-news/2026/feb/28/khamenei-likely-killed-us-israel-iran-strikes\\">Full report: US president announces death of t"}'::jsonb, '{"timestamp":"2026-03-01T00:09:27.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('iranian-ambassador-to-un-calls-us-israel-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'Iranian Ambassador to UN calls US-Israeli attacks a ‘war crime’', NULL, '{"category":"geopolitics","description":"Iranian Ambassador to the United Nations, Amir-Saeid Iravani denounced US-Israeli military strikes across the country."}'::jsonb, '{"timestamp":"2026-03-01T00:05:38.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('the-trap-anthropic-built-for-itself-2026-03-01', 'news.week9.day-2026-03-01', 'Event', 'The trap Anthropic built for itself', NULL, '{"category":"technology.ai","description":"Anthropic, OpenAI, Google DeepMind and others have long promised to govern themselves responsibly. Now, in the absence of rules, there''s not a lot to protect them."}'::jsonb, '{"timestamp":"2026-03-01T00:08:58.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 4');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('why-is-whatsapps-privacy-policy-facing-2026-03-01', 'article', 'Why is WhatsApp''s privacy policy facing a legal challenge in India?', 'https://www.bbc.com/news/articles/cp81wegj123o', 'A 2021 policy update requires users to share data with Meta for ads purposes to continue using the app.', 'BBC News', '2026-03-01T00:21:43.000Z'),
    ('hundreds-of-thousands-of-travellers-stra-2026-03-01', 'article', 'Hundreds of thousands of travellers stranded or diverted amid air space closures in Middle East', 'https://www.theguardian.com/us-news/2026/mar/01/hundreds-of-thousands-of-travellers-stranded-or-diverted-amid-air-space-closures-in-middle-east', '<p>Chaos as key transit hubs in Dubai, Abu Dhabi and Doha close, and more than 1,000 flights by major Middle Eastern airlines cancelled</p><ul><li><p><a href="https://www.theguardian.com/us-news/2026/', 'The Guardian', '2026-03-01T00:09:27.000Z'),
    ('iranian-ambassador-to-un-calls-us-israel-2026-03-01', 'article', 'Iranian Ambassador to UN calls US-Israeli attacks a ‘war crime’', 'https://www.aljazeera.com/video/newsfeed/2026/3/1/iranian-ambassador-to-un-calls-us-israeli-attacks-a-war', 'Iranian Ambassador to the United Nations, Amir-Saeid Iravani denounced US-Israeli military strikes across the country.', 'Al Jazeera', '2026-03-01T00:05:38.000Z'),
    ('the-trap-anthropic-built-for-itself-2026-03-01', 'article', 'The trap Anthropic built for itself', 'https://techcrunch.com/2026/02/28/the-trap-anthropic-built-for-itself/', 'Anthropic, OpenAI, Google DeepMind and others have long promised to govern themselves responsibly. Now, in the absence of rules, there''s not a lot to protect them.', 'TechCrunch', '2026-03-01T00:08:58.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 4');

  console.log('  \u2713 news-week9-day-2026-03-01-hour-01: 4 entities, 0 relations, 4 sources');
};
