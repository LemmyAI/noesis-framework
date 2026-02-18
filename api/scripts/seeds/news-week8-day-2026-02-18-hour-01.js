/**
 * NOESIS Seed: Daily News — 2026-02-18 01:00 (Week 8, 2026)
 * Namespace: news.week8.day-2026-02-18
 * Built by seed-factory on 2026-02-18
 * Auto-gathered news: 4 stories, 2026-02-18 to 2026-02-18
 * Entities: 4 | Relations: 0 | Sources: 4
 */
module.exports = async function seed_news_week8_day_2026_02_18_hour_01(client) {
  console.log('  \u2192 Seeding: news-week8-day-2026-02-18-hour-01');

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
    ('no-dna-matches-on-glove-found-in-nancy-g-2026-02-18', 'news.week8.day-2026-02-18', 'Fact', 'No DNA matches on glove found in Nancy Guthrie case, police say', NULL, '{"category":"geopolitics","description":"It''s been two weeks since the 84 year old''s disappearance and authorities say there have not been any arrests"}'::jsonb, '{"timestamp":"2026-02-18T00:14:44.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('illegal-skin-lightening-cream-being-sold-2026-02-18', 'news.week8.day-2026-02-18', 'Claim', 'Illegal skin lightening cream being sold in UK butchers, watchdog warns', NULL, '{"category":"finance","description":"A trade body has warned illegal skin bleaching products are being sold in an increasingly wide range of places."}'::jsonb, '{"timestamp":"2026-02-18T00:00:38.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('this-auto-parts-maker-is-jumping-on-the-2026-02-18', 'news.week8.day-2026-02-18', 'Event', 'This auto-parts maker is jumping on the breakup bandwagon. Here&#x2019;s why the stock is tanking.', NULL, '{"category":"finance.markets","description":"Genuine Parts shares tumbled Tuesday after a big earnings miss overshadowed breakup plans."}'::jsonb, '{"timestamp":"2026-02-18T00:10:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('super-tanker-rates-soar-amid-sanctions-2026-02-18', 'news.week8.day-2026-02-18', 'Event', 'Super Tanker Rates Soar Amid Sanctions, Supply Shifts, and Strategic Hoarding', NULL, '{"category":"finance.energy","description":"Geopolitics, growing oil supply, longer voyages, and disruptions due to sanctions and altered shipping lanes pushed crude oil tanker rates to multi-year highs at the end of 2025. After a dip in January, rates started climbing again this month in what shipping executives described as a fundamental sh"}'::jsonb, '{"timestamp":"2026-02-18T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 4');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('no-dna-matches-on-glove-found-in-nancy-g-2026-02-18', 'article', 'No DNA matches on glove found in Nancy Guthrie case, police say', 'https://www.bbc.com/news/articles/cj0dqp9pleeo', 'It''s been two weeks since the 84 year old''s disappearance and authorities say there have not been any arrests', 'BBC News', '2026-02-18T00:14:44.000Z'),
    ('illegal-skin-lightening-cream-being-sold-2026-02-18', 'article', 'Illegal skin lightening cream being sold in UK butchers, watchdog warns', 'https://www.bbc.com/news/articles/c3rzn1pxr3qo', 'A trade body has warned illegal skin bleaching products are being sold in an increasingly wide range of places.', 'BBC Business', '2026-02-18T00:00:38.000Z'),
    ('this-auto-parts-maker-is-jumping-on-the-2026-02-18', 'article', 'This auto-parts maker is jumping on the breakup bandwagon. Here&#x2019;s why the stock is tanking.', 'https://www.marketwatch.com/story/this-auto-parts-maker-is-jumping-on-the-breakup-bandwagon-heres-why-the-stock-is-tanking-8d7da703?mod=mw_rss_topstories', 'Genuine Parts shares tumbled Tuesday after a big earnings miss overshadowed breakup plans.', 'MarketWatch', '2026-02-18T00:10:00.000Z'),
    ('super-tanker-rates-soar-amid-sanctions-2026-02-18', 'article', 'Super Tanker Rates Soar Amid Sanctions, Supply Shifts, and Strategic Hoarding', 'https://oilprice.com/Energy/Energy-General/Super-Tanker-Rates-Soar-Amid-Sanctions-Supply-Shifts-and-Strategic-Hoarding.html', 'Geopolitics, growing oil supply, longer voyages, and disruptions due to sanctions and altered shipping lanes pushed crude oil tanker rates to multi-year highs at the end of 2025. After a dip in Januar', 'OilPrice.com', '2026-02-18T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 4');

  console.log('  \u2713 news-week8-day-2026-02-18-hour-01: 4 entities, 0 relations, 4 sources');
};
