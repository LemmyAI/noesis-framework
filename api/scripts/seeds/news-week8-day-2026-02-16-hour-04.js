/**
 * NOESIS Seed: Daily News — 2026-02-16 04:00 (Week 8, 2026)
 * Namespace: news.week8.day-2026-02-16
 * Built by seed-factory on 2026-02-16
 * Auto-gathered news: 7 stories, 2026-02-16 to 2026-02-16
 * Entities: 7 | Relations: 0 | Sources: 7
 */
module.exports = async function seed_news_week8_day_2026_02_16_hour_04(client) {
  console.log('  \u2192 Seeding: news-week8-day-2026-02-16-hour-04');

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
    ('news.week8.day-2026-02-16', 'news.week8', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('fbi-analysing-recovered-glove-that-appea-2026-02-16', 'news.week8.day-2026-02-16', 'Event', 'FBI analysing recovered glove that appears to match those worn in Guthrie suspect video', NULL, '{"category":"geopolitics","description":"The FBI says it recovered a DNA sample from the glove, which was found in a field a few miles from Guthrie''s home."}'::jsonb, '{"timestamp":"2026-02-16T01:34:28.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('bedding-firm-backs-down-on-swift-home-2026-02-16', 'news.week8.day-2026-02-16', 'Event', 'Bedding firm backs down on ''Swift Home'' trademark after Taylor Swift appeal', NULL, '{"category":"finance","description":"Swift’s team had flagged similarities between her trademark and the company’s contested design."}'::jsonb, '{"timestamp":"2026-02-16T01:44:55.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('how-an-undercover-cop-foiled-an-is-plot-2026-02-16', 'news.week8.day-2026-02-16', 'Event', 'How an undercover cop foiled an IS plot to massacre Britain’s Jews – podcast', NULL, '{"category":"geopolitics","description":"<p>The Guardian’s community affairs correspondent, <strong>Chris Osuh</strong>,<strong> </strong>reports on the plot by two IS terrorists to massacre Jews in Manchester, and how it was thwarted by an undercover sting</p><p>Walid Saadaoui had once worked as a holiday entertainer, organising dance sho"}'::jsonb, '{"timestamp":"2026-02-16T03:00:39.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('russia-ukraine-war-list-of-key-events-2026-02-16', 'news.week8.day-2026-02-16', 'Event', 'Russia-Ukraine war: List of key events, day 1,453', NULL, '{"category":"geopolitics","description":"These are the key developments from day 1,453 of Russia’s war on Ukraine."}'::jsonb, '{"timestamp":"2026-02-16T01:35:27.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('can-the-u-k-still-save-its-oil-and-gas-2026-02-16', 'news.week8.day-2026-02-16', 'Event', 'Can the U.K. Still Save Its Oil and Gas Industry?', NULL, '{"category":"finance.energy","description":"When the UK’s government slapped a 25% windfall tax on oil and gas producers in 2022, the industry warned this could be the death knell for local oil and gas production. Four years later, the UK’s oil and gas industry is being described as “irrelevant”. The UK’s oil and gas production has slumped fr"}'::jsonb, '{"timestamp":"2026-02-16T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('as-ai-data-centers-hit-power-limits-pea-2026-02-16', 'news.week8.day-2026-02-16', 'Event', 'As AI data centers hit power limits, Peak XV backs Indian startup C2i to fix the bottleneck', NULL, '{"category":"technology.ai","description":"C2i has raised $15 million as it tests a grid-to-GPU approach to reducing power losses in AI data centers."}'::jsonb, '{"timestamp":"2026-02-16T01:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('blackstone-backs-neysa-in-up-to-1-2b-fi-2026-02-16', 'news.week8.day-2026-02-16', 'Event', 'Blackstone backs Neysa in up to $1.2B financing as India pushes to build domestic AI infrastructure', NULL, '{"category":"technology.ai","description":"Neysa is targeting deployments of more than 20,000 GPUs over time as demand for local AI compute accelerates."}'::jsonb, '{"timestamp":"2026-02-16T00:30:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 7');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('fbi-analysing-recovered-glove-that-appea-2026-02-16', 'article', 'FBI analysing recovered glove that appears to match those worn in Guthrie suspect video', 'https://www.bbc.com/news/articles/c5yrv2g16e2o', 'The FBI says it recovered a DNA sample from the glove, which was found in a field a few miles from Guthrie''s home.', 'BBC News', '2026-02-16T01:34:28.000Z'),
    ('bedding-firm-backs-down-on-swift-home-2026-02-16', 'article', 'Bedding firm backs down on ''Swift Home'' trademark after Taylor Swift appeal', 'https://www.bbc.com/news/articles/crm87109l3wo', 'Swift’s team had flagged similarities between her trademark and the company’s contested design.', 'BBC Business', '2026-02-16T01:44:55.000Z'),
    ('how-an-undercover-cop-foiled-an-is-plot-2026-02-16', 'article', 'How an undercover cop foiled an IS plot to massacre Britain’s Jews – podcast', 'https://www.theguardian.com/news/audio/2026/feb/16/how-an-undercover-cop-foiled-an-is-plot-to-massacre-britains-jews-podcast', '<p>The Guardian’s community affairs correspondent, <strong>Chris Osuh</strong>,<strong> </strong>reports on the plot by two IS terrorists to massacre Jews in Manchester, and how it was thwarted by an ', 'The Guardian', '2026-02-16T03:00:39.000Z'),
    ('russia-ukraine-war-list-of-key-events-2026-02-16', 'article', 'Russia-Ukraine war: List of key events, day 1,453', 'https://www.aljazeera.com/news/2026/2/16/russia-ukraine-war-list-of-key-events-day-1453', 'These are the key developments from day 1,453 of Russia’s war on Ukraine.', 'Al Jazeera', '2026-02-16T01:35:27.000Z'),
    ('can-the-u-k-still-save-its-oil-and-gas-2026-02-16', 'article', 'Can the U.K. Still Save Its Oil and Gas Industry?', 'https://oilprice.com/Energy/Energy-General/Can-the-UK-Still-Save-Its-Oil-and-Gas-Industry.html', 'When the UK’s government slapped a 25% windfall tax on oil and gas producers in 2022, the industry warned this could be the death knell for local oil and gas production. Four years later, the UK’s oil', 'OilPrice.com', '2026-02-16T00:00:00.000Z'),
    ('as-ai-data-centers-hit-power-limits-pea-2026-02-16', 'article', 'As AI data centers hit power limits, Peak XV backs Indian startup C2i to fix the bottleneck', 'https://techcrunch.com/2026/02/15/as-ai-data-centers-hit-power-limits-peak-xv-backs-indian-startup-c2i-to-fix-the-bottleneck/', 'C2i has raised $15 million as it tests a grid-to-GPU approach to reducing power losses in AI data centers.', 'TechCrunch', '2026-02-16T01:00:00.000Z'),
    ('blackstone-backs-neysa-in-up-to-1-2b-fi-2026-02-16', 'article', 'Blackstone backs Neysa in up to $1.2B financing as India pushes to build domestic AI infrastructure', 'https://techcrunch.com/2026/02/15/blackstone-backs-neysa-in-up-to-1-2b-financing-as-india-pushes-to-build-domestic-ai-compute/', 'Neysa is targeting deployments of more than 20,000 GPUs over time as demand for local AI compute accelerates.', 'TechCrunch', '2026-02-16T00:30:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 7');

  console.log('  \u2713 news-week8-day-2026-02-16-hour-04: 7 entities, 0 relations, 7 sources');
};
