/**
 * NOESIS Seed: Daily News — 2026-03-02 07:00 (Week 10, 2026)
 * Namespace: news.week10.day-2026-03-02
 * Built by seed-factory on 2026-03-02
 * Auto-gathered news: 11 stories, 2026-03-02 to 2026-03-02
 * Entities: 11 | Relations: 5 | Sources: 11
 * Narratives: Energy Markets, Crypto Markets
 */
module.exports = async function seed_news_week10_day_2026_03_02_hour_07(client) {
  console.log('  \u2192 Seeding: news-week10-day-2026-03-02-hour-07');

  // === NAMESPACE ===
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news', 'default', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news.week10', 'news', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news.week10.day-2026-03-02', 'news.week10', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('oil-prices-rise-after-ships-attacked-nea-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Oil prices rise after ships attacked near Strait of Hormuz', NULL, '{"category":"geopolitics","description":"Experts have warned that a prolonged conflict could push global energy prices even higher."}'::jsonb, '{"timestamp":"2026-03-02T02:12:41.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('kidnapping-of-foreigners-soars-in-africa-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Kidnapping of foreigners soars in Africa''s lawless Sahel region', NULL, '{"category":"geopolitics","description":"Growing insecurity in the Sahel made 2025 one of the worst years on record for the abduction of foreigners in Africa."}'::jsonb, '{"timestamp":"2026-03-02T00:02:10.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('michael-b-jordan-upends-oscars-race-as-s-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Michael B Jordan upends Oscars race as Sinners wins big at Actor Awards', NULL, '{"category":"geopolitics","description":"The US star''s best actor win for Sinners leaves the Oscars race too close to call."}'::jsonb, '{"timestamp":"2026-03-02T05:08:35.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('over-9-billion-flees-bitcoin-and-ether-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Over $9 billion flees bitcoin and ether ETFs in four months', NULL, '{"category":"finance.crypto","description":"Record outflows indicate that institutional appetite for digital assets has collapsed."}'::jsonb, '{"timestamp":"2026-03-02T05:55:17.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('bitcoin-cryptos-under-pressure-as-oil-s-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Bitcoin, cryptos under pressure as oil spikes 6% and global markets price in U.S.-Iran conflict', NULL, '{"category":"finance.crypto","description":"Bitcoin fell back to $66,700 as traditional markets opened to their first chance to price the weekend''s military escalation, with oil surging to $77 and Asian equities dropping 1.4%."}'::jsonb, '{"timestamp":"2026-03-02T05:26:20.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('hyperliquids-hype-token-jumps-5-as-ira-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Hyperliquid''s HYPE token jumps 5% as Iran war brings windfall revenue, JUP gains on supply freeze', NULL, '{"category":"finance.crypto","description":"Traders lean into supply compression stories in altcoins as Hyperliquid ramps up token burns and Jupiter freezes new emissions, even as bitcoin churns between $60,000 and $69,000 with muted flow."}'::jsonb, '{"timestamp":"2026-03-02T04:34:10.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('anthropic-x2019-s-claude-tops-app-store-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Anthropic&#x2019;s Claude tops App Store charts as backlash builds against OpenAI&#x2019;s ChatGPT', NULL, '{"category":"finance.markets","description":"OpenAI faces some user criticism over its new deal with the Department of Defense."}'::jsonb, '{"timestamp":"2026-03-02T01:32:00.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('analysts-see-100-oil-on-strait-of-hormu-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Analysts See $100 Oil on Strait of Hormuz Disruption', NULL, '{"category":"finance.energy","description":"Following the escalation of the conflict in the Middle East, energy analysts and investment banks expect oil prices to surge this week to $90 with chances of hitting $100 per barrel if disruptions to traffic in the crucial Strait of Hormuz persist.  Early on Monday in Asian trade, oil prices had alr"}'::jsonb, '{"timestamp":"2026-03-02T06:22:08.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('oil-prices-soar-amid-escalating-middle-e-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'Oil Prices Soar Amid Escalating Middle East Conflict', NULL, '{"category":"finance.energy","description":"Oil prices surged on Monday as the fallout from U.S. and Israeli military strikes on Iran rippled through global energy markets, with tanker traffic through the Strait of Hormuz already heavily impacted and military strikes continuing across the region. In early Asian trade, Brent futures broke the "}'::jsonb, '{"timestamp":"2026-03-02T01:58:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('how-china-s-rare-earth-ban-backfired-int-2026-03-02', 'news.week10.day-2026-03-02', 'Event', 'How China’s Rare Earth Ban Backfired into a U.S. Tech Breakthrough', NULL, '{"category":"finance.energy","description":"In a typical Chinese rare earth processing plant, 200 workers move through a maze of massive chemical tanks, risking life and limb to produce the materials that power everything from fighter jets and missile components to cellphones. Hundreds of these facilities operate across China, and they give B"}'::jsonb, '{"timestamp":"2026-03-02T01:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb),
    ('china-s-oil-buying-spree-may-be-running-2026-03-02', 'news.week10.day-2026-03-02', 'Claim', 'China’s Oil Buying Spree May Be Running Out of Steam', NULL, '{"category":"finance.energy","description":"China''s imports last year broke yet another record, despite talk of waning oil demand. Since the start of this year, the world’s biggest oil importer has continued buying crude at elevated rates, but this may be about to change as prices extend their rally. Brent crude has been hovering around "}'::jsonb, '{"timestamp":"2026-03-02T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 11');

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('china-s-oil-buying-spree-may-be-running-2026-03-02', 'oil-prices-soar-amid-escalating-middle-e-2026-03-02', 'follows', 1, 'Energy Markets', '{}'::jsonb),
    ('oil-prices-soar-amid-escalating-middle-e-2026-03-02', 'oil-prices-rise-after-ships-attacked-nea-2026-03-02', 'causes', 2, 'Energy Markets', '{}'::jsonb),
    ('oil-prices-rise-after-ships-attacked-nea-2026-03-02', 'analysts-see-100-oil-on-strait-of-hormu-2026-03-02', 'causes', 3, 'Energy Markets', '{}'::jsonb),
    ('hyperliquids-hype-token-jumps-5-as-ira-2026-03-02', 'bitcoin-cryptos-under-pressure-as-oil-s-2026-03-02', 'causes', 1, 'Crypto Markets', '{}'::jsonb),
    ('bitcoin-cryptos-under-pressure-as-oil-s-2026-03-02', 'over-9-billion-flees-bitcoin-and-ether-2026-03-02', 'causes', 2, 'Crypto Markets', '{}'::jsonb)
    ON CONFLICT DO NOTHING
  `);
  console.log('    Relations: 5');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('oil-prices-rise-after-ships-attacked-nea-2026-03-02', 'article', 'Oil prices rise after ships attacked near Strait of Hormuz', 'https://www.bbc.com/news/articles/c75evve6l63o', 'Experts have warned that a prolonged conflict could push global energy prices even higher.', 'BBC News', '2026-03-02T02:12:41.000Z'),
    ('kidnapping-of-foreigners-soars-in-africa-2026-03-02', 'article', 'Kidnapping of foreigners soars in Africa''s lawless Sahel region', 'https://www.bbc.com/news/articles/c0lj18d5lx3o', 'Growing insecurity in the Sahel made 2025 one of the worst years on record for the abduction of foreigners in Africa.', 'BBC News', '2026-03-02T00:02:10.000Z'),
    ('michael-b-jordan-upends-oscars-race-as-s-2026-03-02', 'article', 'Michael B Jordan upends Oscars race as Sinners wins big at Actor Awards', 'https://www.bbc.com/news/articles/clyzklvk79yo', 'The US star''s best actor win for Sinners leaves the Oscars race too close to call.', 'BBC News', '2026-03-02T05:08:35.000Z'),
    ('over-9-billion-flees-bitcoin-and-ether-2026-03-02', 'article', 'Over $9 billion flees bitcoin and ether ETFs in four months', 'https://www.coindesk.com/markets/2026/03/02/over-usd9-billion-flees-bitcoin-and-ether-etfs-in-four-months', 'Record outflows indicate that institutional appetite for digital assets has collapsed.', 'CoinDesk', '2026-03-02T05:55:17.000Z'),
    ('bitcoin-cryptos-under-pressure-as-oil-s-2026-03-02', 'article', 'Bitcoin, cryptos under pressure as oil spikes 6% and global markets price in U.S.-Iran conflict', 'https://www.coindesk.com/markets/2026/03/02/bitcoin-cryptos-under-pressure-as-oil-spikes-6-and-global-markets-price-in-u-s-iran-conflict', 'Bitcoin fell back to $66,700 as traditional markets opened to their first chance to price the weekend''s military escalation, with oil surging to $77 and Asian equities dropping 1.4%.', 'CoinDesk', '2026-03-02T05:26:20.000Z'),
    ('hyperliquids-hype-token-jumps-5-as-ira-2026-03-02', 'article', 'Hyperliquid''s HYPE token jumps 5% as Iran war brings windfall revenue, JUP gains on supply freeze', 'https://www.coindesk.com/markets/2026/03/02/hype-jumps-5-as-token-burn-offsets-usd316-million-unlock-jup-gains-weekly-on-supply-freeze', 'Traders lean into supply compression stories in altcoins as Hyperliquid ramps up token burns and Jupiter freezes new emissions, even as bitcoin churns between $60,000 and $69,000 with muted flow.', 'CoinDesk', '2026-03-02T04:34:10.000Z'),
    ('anthropic-x2019-s-claude-tops-app-store-2026-03-02', 'article', 'Anthropic&#x2019;s Claude tops App Store charts as backlash builds against OpenAI&#x2019;s ChatGPT', 'https://www.marketwatch.com/story/anthropics-claude-tops-app-store-charts-as-backlash-builds-against-openais-chatgpt-3fdce792?mod=mw_rss_topstories', 'OpenAI faces some user criticism over its new deal with the Department of Defense.', 'MarketWatch', '2026-03-02T01:32:00.000Z'),
    ('analysts-see-100-oil-on-strait-of-hormu-2026-03-02', 'article', 'Analysts See $100 Oil on Strait of Hormuz Disruption', 'https://oilprice.com/Latest-Energy-News/World-News/Analysts-See-100-Oil-on-Strait-of-Hormuz-Disruption.html', 'Following the escalation of the conflict in the Middle East, energy analysts and investment banks expect oil prices to surge this week to $90 with chances of hitting $100 per barrel if disruptions to ', 'OilPrice.com', '2026-03-02T06:22:08.000Z'),
    ('oil-prices-soar-amid-escalating-middle-e-2026-03-02', 'article', 'Oil Prices Soar Amid Escalating Middle East Conflict', 'https://oilprice.com/Latest-Energy-News/World-News/Oil-Prices-Soar-Amid-Escalating-Middle-East-Conflict.html', 'Oil prices surged on Monday as the fallout from U.S. and Israeli military strikes on Iran rippled through global energy markets, with tanker traffic through the Strait of Hormuz already heavily impact', 'OilPrice.com', '2026-03-02T01:58:00.000Z'),
    ('how-china-s-rare-earth-ban-backfired-int-2026-03-02', 'article', 'How China’s Rare Earth Ban Backfired into a U.S. Tech Breakthrough', 'https://oilprice.com/Energy/Energy-General/How-Chinas-Rare-Earth-Ban-Backfired-into-a-US-Tech-Breakthrough.html', 'In a typical Chinese rare earth processing plant, 200 workers move through a maze of massive chemical tanks, risking life and limb to produce the materials that power everything from fighter jets and ', 'OilPrice.com', '2026-03-02T01:00:00.000Z'),
    ('china-s-oil-buying-spree-may-be-running-2026-03-02', 'article', 'China’s Oil Buying Spree May Be Running Out of Steam', 'https://oilprice.com/Energy/Energy-General/Chinas-Oil-Buying-Spree-May-Be-Running-Out-of-Steam.html', 'China''s imports last year broke yet another record, despite talk of waning oil demand. Since the start of this year, the world’s biggest oil importer has continued buying crude at elevated rates,', 'OilPrice.com', '2026-03-02T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 11');

  console.log('  \u2713 news-week10-day-2026-03-02-hour-07: 11 entities, 5 relations, 11 sources');
};
