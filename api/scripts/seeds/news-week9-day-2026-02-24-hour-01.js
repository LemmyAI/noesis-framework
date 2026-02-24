/**
 * NOESIS Seed: Daily News — 2026-02-24 01:00 (Week 9, 2026)
 * Namespace: news.week9.day-2026-02-24
 * Built by seed-factory on 2026-02-24
 * Auto-gathered news: 4 stories, 2026-02-24 to 2026-02-24
 * Entities: 4 | Relations: 0 | Sources: 4
 */
module.exports = async function seed_news_week9_day_2026_02_24_hour_01(client) {
  console.log('  \u2192 Seeding: news-week9-day-2026-02-24-hour-01');

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
    ('news.week9.day-2026-02-24', 'news.week9', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('chocolate-kept-in-anti-theft-boxes-as-re-2026-02-24', 'news.week9.day-2026-02-24', 'Event', 'Chocolate kept in anti-theft boxes as retailers warn it''s being stolen to order', NULL, '{"category":"finance","description":"Retailers and police forces tell the BBC that thieves are targeting chocolate and selling it on."}'::jsonb, '{"timestamp":"2026-02-24T00:07:42.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('orbital-space-race-heats-up-in-arctic-no-2026-02-24', 'news.week9.day-2026-02-24', 'Event', 'Orbital space race heats up in Arctic north', NULL, '{"category":"finance","description":"Europe lags far behind the US and China in orbital space launches, but new facilities are opening up."}'::jsonb, '{"timestamp":"2026-02-24T00:10:05.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('progress-on-gender-equality-at-top-of-uk-2026-02-24', 'news.week9.day-2026-02-24', 'Event', 'Progress on gender equality at top of UK’s biggest firms ‘achingly slow’', NULL, '{"category":"finance","description":"<p>Average number of female FTSE 100 CEOs stalled at nine last year, the same number as 2024, review says</p><p>Campaigners have bemoaned the “achingly slow” progress made on gender equality at the top of Britain’s biggest businesses, as research showed blue-chip firms had missed key targets and the"}'::jsonb, '{"timestamp":"2026-02-24T00:01:54.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('u-s-energy-dominance-push-collides-with-2026-02-24', 'news.week9.day-2026-02-24', 'Decision', 'U.S. Energy Dominance Push Collides with EU Methane Rules', NULL, '{"category":"finance.energy","description":"Last week, U.S. Energy Secretary Chris Wright called on the International Energy Agency to stop fixating on climate change and instead return to its original focus on energy security. The call came in the context of plans by the U.S. federal government to significantly increase the amount of oil and"}'::jsonb, '{"timestamp":"2026-02-24T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 4');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('chocolate-kept-in-anti-theft-boxes-as-re-2026-02-24', 'article', 'Chocolate kept in anti-theft boxes as retailers warn it''s being stolen to order', 'https://www.bbc.com/news/articles/ce3gqr7p0lqo', 'Retailers and police forces tell the BBC that thieves are targeting chocolate and selling it on.', 'BBC Business', '2026-02-24T00:07:42.000Z'),
    ('orbital-space-race-heats-up-in-arctic-no-2026-02-24', 'article', 'Orbital space race heats up in Arctic north', 'https://www.bbc.com/news/articles/c4g0201rj8go', 'Europe lags far behind the US and China in orbital space launches, but new facilities are opening up.', 'BBC Business', '2026-02-24T00:10:05.000Z'),
    ('progress-on-gender-equality-at-top-of-uk-2026-02-24', 'article', 'Progress on gender equality at top of UK’s biggest firms ‘achingly slow’', 'https://www.theguardian.com/business/2026/feb/24/progress-gender-equality-uk-biggest-firms-achingly-slow-ftse-100', '<p>Average number of female FTSE 100 CEOs stalled at nine last year, the same number as 2024, review says</p><p>Campaigners have bemoaned the “achingly slow” progress made on gender equality at the to', 'The Guardian', '2026-02-24T00:01:54.000Z'),
    ('u-s-energy-dominance-push-collides-with-2026-02-24', 'article', 'U.S. Energy Dominance Push Collides with EU Methane Rules', 'https://oilprice.com/Energy/Natural-Gas/US-Energy-Dominance-Push-Collides-with-EU-Methane-Rules.html', 'Last week, U.S. Energy Secretary Chris Wright called on the International Energy Agency to stop fixating on climate change and instead return to its original focus on energy security. The call came in', 'OilPrice.com', '2026-02-24T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 4');

  console.log('  \u2713 news-week9-day-2026-02-24-hour-01: 4 entities, 0 relations, 4 sources');
};
