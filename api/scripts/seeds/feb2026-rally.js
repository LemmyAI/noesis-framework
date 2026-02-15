/**
 * Seed: February 2026 Gold & Crypto Rally
 * Namespaces: news.rally, finance, finance.crypto, geopolitics
 * A real-world market narrative with entities, relations, and source evidence
 */
module.exports = async function seed(client) {
  console.log('  Seeding: February 2026 Rally...');

  // === NAMESPACES ===
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news', 'default', '{
      "added_types": ["Article", "Source", "Topic", "Report"],
      "type_hierarchy": { "Article": {"parent": "Fact"}, "Report": {"parent": "Fact"}, "Source": {"parent": "Organization"}, "Topic": {"parent": "Concept"} },
      "colors": { "types": { "Article": "#E8913A", "Source": "#3AE891", "Topic": "#913AE8", "Report": "#E83A91" } }
    }'::jsonb),
    ('news.rally', 'news', '{
      "description": "February 2026 Gold & Crypto Rally coverage",
      "colors": {}
    }'::jsonb),
    ('finance', 'default', '{
      "added_types": ["Asset", "Trade", "EarningsReport", "Indicator", "Sector"],
      "type_hierarchy": { "Asset": {"parent": "Concept"}, "Trade": {"parent": "Event"}, "EarningsReport": {"parent": "Fact"}, "Indicator": {"parent": "Fact"}, "Sector": {"parent": "Concept"} },
      "colors": { "types": { "Asset": "#FFD700", "Trade": "#00C853", "EarningsReport": "#FF6D00", "Indicator": "#2979FF", "Sector": "#AA00FF" } }
    }'::jsonb),
    ('finance.crypto', 'finance', '{
      "added_types": ["Token", "Protocol", "DEX", "Chain"],
      "type_hierarchy": { "Token": {"parent": "Asset"}, "Protocol": {"parent": "System"}, "DEX": {"parent": "System"}, "Chain": {"parent": "System"} },
      "colors": { "types": { "Token": "#F7931A", "Protocol": "#627EEA", "DEX": "#00D395", "Chain": "#8247E5" } }
    }'::jsonb),
    ('geopolitics', 'default', '{
      "added_types": ["Policy", "Treaty", "Conflict", "Sanction", "Alliance"],
      "type_hierarchy": { "Policy": {"parent": "Decision"}, "Treaty": {"parent": "Decision"}, "Conflict": {"parent": "Event"}, "Sanction": {"parent": "Decision"}, "Alliance": {"parent": "Organization"} },
      "colors": { "types": { "Policy": "#C62828", "Treaty": "#1565C0", "Conflict": "#FF8F00", "Sanction": "#6A1B9A", "Alliance": "#2E7D32" } }
    }'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('fin-gold', 'finance', 'Asset', 'Gold (XAU/USD)', 'COMMODITY:GOLD', '{"category": "commodities.precious_metals", "ticker": "XAU", "unit": "USD/oz"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('fin-silver', 'finance', 'Asset', 'Silver (XAG/USD)', 'COMMODITY:SILVER', '{"category": "commodities.precious_metals", "ticker": "XAG", "unit": "USD/oz"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('fin-btc', 'finance.crypto', 'Token', 'Bitcoin (BTC)', 'CRYPTO:BTC', '{"category": "finance.crypto", "ticker": "BTC", "market_cap_rank": 1}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('fin-eth', 'finance.crypto', 'Token', 'Ethereum (ETH)', 'CRYPTO:ETH', '{"category": "finance.crypto", "ticker": "ETH", "market_cap_rank": 2}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('fin-oil', 'finance', 'Asset', 'Crude Oil (WTI)', 'COMMODITY:WTI', '{"category": "commodities.energy", "ticker": "CL", "unit": "USD/bbl"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('fin-uranium', 'finance', 'Asset', 'Uranium (U3O8)', 'COMMODITY:URANIUM', '{"category": "commodities.energy", "ticker": "UX", "unit": "USD/lb"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('sector-precious', 'finance', 'Sector', 'Precious Metals Sector', 'SECTOR:PRECIOUS', '{"category": "sectors"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('sector-crypto', 'finance', 'Sector', 'Cryptocurrency Sector', 'SECTOR:CRYPTO', '{"category": "sectors"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('sector-energy', 'finance', 'Sector', 'Energy Sector', 'SECTOR:ENERGY', '{"category": "sectors"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('person-fed-chair', 'default', 'Person', 'Jerome Powell', 'PERSON:POWELL', '{"category": "people.central_banking", "role": "Federal Reserve Chair"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('org-fed', 'default', 'Organization', 'Federal Reserve', 'ORG:FED', '{"category": "organizations.central_banks", "country": "US"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('org-ecb', 'default', 'Organization', 'European Central Bank', 'ORG:ECB', '{"category": "organizations.central_banks", "country": "EU"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('org-strategy', 'default', 'Organization', 'Strategy Inc (MSTR)', 'TICKER:MSTR', '{"category": "organizations.companies", "sector": "Bitcoin Treasury", "formerly": "MicroStrategy"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('evt-fed-hold', 'default', 'Event', 'Fed Holds Rates at 4.25-4.50%', 'EVENT:FED-JAN26', '{"category": "events.monetary_policy", "impact": "high"}', '{"timestamp": "2026-01-29T19:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('evt-gold-ath', 'default', 'Event', 'Gold Breaks All-Time High Above $2,900', 'EVENT:GOLD-ATH-FEB26', '{"category": "events.market_moves", "impact": "high", "price": "$2,900+"}', '{"timestamp": "2026-02-10T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('evt-btc-volatility', 'default', 'Event', 'Bitcoin Drops to $95K on Tariff Fears', 'EVENT:BTC-DROP-FEB26', '{"category": "events.market_moves", "impact": "medium", "price": "$95,000"}', '{"timestamp": "2026-02-03T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('evt-tariff-announce', 'geopolitics', 'Policy', 'US Announces 25% Tariffs on Canada/Mexico', 'EVENT:TARIFF-FEB26', '{"category": "geopolitics.trade", "impact": "high", "countries": ["US", "CA", "MX"]}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('evt-ecb-cut', 'default', 'Event', 'ECB Cuts Rates to 2.75%', 'EVENT:ECB-CUT-JAN26', '{"category": "events.monetary_policy", "impact": "high", "rate": "2.75%"}', '{"timestamp": "2026-01-30T13:15:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('evt-silver-surge', 'default', 'Event', 'Silver Rallies Past $33 on Industrial Demand', 'EVENT:SILVER-SURGE-FEB26', '{"category": "events.market_moves", "impact": "medium", "price": "$33+"}', '{"timestamp": "2026-02-12T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('evt-inflation-data', 'default', 'Event', 'US CPI Comes in Hot at 3.0%', 'EVENT:CPI-JAN26', '{"category": "events.economic_data", "impact": "high", "value": "3.0% YoY"}', '{"timestamp": "2026-02-12T13:30:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('claim-gold-3000', 'default', 'Claim', 'Gold Will Reach $3,000 by Q2 2026', NULL, '{"category": "analysis.price_targets", "target": "$3,000", "timeframe": "Q2 2026"}', '{"timestamp": "2026-02-10T00:00:00Z", "precision": "day"}', '{"confidence": "medium", "source_count": 3}'),
    ('claim-btc-safe-haven', 'default', 'Claim', 'Bitcoin is Becoming a Digital Safe Haven', NULL, '{"category": "analysis.narratives"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "disputed", "source_count": 5}'),
    ('fact-gold-demand', 'default', 'Fact', 'Central Bank Gold Buying at Record Levels', 'FACT:CB-GOLD-BUYING', '{"category": "fundamentals.demand", "value": "1,136 tonnes in 2025"}', '{"timestamp": "2026-01-15T00:00:00Z", "precision": "month"}', '{"confidence": "verified", "source_count": 2}'),
    ('fact-btc-halving', 'finance.crypto', 'Token', 'Bitcoin Post-Halving Cycle (2024)', 'FACT:BTC-HALVING', '{"category": "finance.crypto.cycles", "halving_date": "2024-04-20", "block": 840000}', '{"timestamp": "2024-04-20T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('decision-fed-pause', 'default', 'Decision', 'Fed Signals Extended Rate Pause', 'DECISION:FED-PAUSE-26', '{"category": "decisions.monetary_policy"}', '{"timestamp": "2026-01-29T19:30:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('goal-inflation-target', 'default', 'Goal', 'Fed 2% Inflation Target', 'GOAL:FED-2PCT', '{"category": "goals.monetary_policy", "target": "2.0%", "current": "3.0%"}', '{"timestamp": "2026-01-01T00:00:00Z", "precision": "year"}', '{"confidence": "verified"}'),
    ('news-gold-rally', 'news.rally', 'Article', 'Gold Surges to Record High as Investors Flee Risk', 'URL:bloomberg.com/gold-feb26', '{"category": "news.markets.commodities", "source": "Bloomberg"}', '{"timestamp": "2026-02-10T08:30:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('news-btc-tariff', 'news.rally', 'Article', 'Bitcoin Tumbles as Trump Tariff Threats Shake Markets', 'URL:coindesk.com/btc-tariff-feb26', '{"category": "news.markets.crypto", "source": "CoinDesk"}', '{"timestamp": "2026-02-03T10:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('news-fed-decision', 'news.rally', 'Article', 'Fed Holds Steady, Powell Warns of Inflation Uncertainty', 'URL:reuters.com/fed-jan26', '{"category": "news.monetary_policy", "source": "Reuters"}', '{"timestamp": "2026-01-29T20:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('news-silver-demand', 'news.rally', 'Article', 'Silver Demand Boosted by Solar Panel Manufacturing Boom', 'URL:mining.com/silver-solar-feb26', '{"category": "news.markets.commodities", "source": "Mining.com"}', '{"timestamp": "2026-02-12T14:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('news-ecb-rate', 'news.rally', 'Article', 'ECB Cuts Rates Again as European Growth Falters', 'URL:ft.com/ecb-jan26', '{"category": "news.monetary_policy", "source": "Financial Times"}', '{"timestamp": "2026-01-30T15:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('news-cpi-report', 'news.rally', 'Article', 'US Inflation Ticks Up to 3.0%, Complicating Fed Outlook', 'URL:wsj.com/cpi-feb26', '{"category": "news.economic_data", "source": "Wall Street Journal"}', '{"timestamp": "2026-02-12T14:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('src-bloomberg', 'news.rally', 'Source', 'Bloomberg', 'SOURCE:BLOOMBERG', '{"category": "sources.financial", "url": "https://bloomberg.com", "type": "wire_service"}', '{"timestamp": "2020-01-01T00:00:00Z", "precision": "year"}', '{"confidence": "verified"}'),
    ('src-coindesk', 'news.rally', 'Source', 'CoinDesk', 'SOURCE:COINDESK', '{"category": "sources.crypto", "url": "https://coindesk.com", "type": "trade_publication"}', '{"timestamp": "2020-01-01T00:00:00Z", "precision": "year"}', '{"confidence": "verified"}'),
    ('src-reuters', 'news.rally', 'Source', 'Reuters', 'SOURCE:REUTERS', '{"category": "sources.financial", "url": "https://reuters.com", "type": "wire_service"}', '{"timestamp": "2020-01-01T00:00:00Z", "precision": "year"}', '{"confidence": "verified"}'),
    ('topic-safe-haven', 'news.rally', 'Topic', 'Safe Haven Assets', 'TOPIC:SAFE-HAVEN', '{"category": "topics.investment_themes"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}'),
    ('topic-tariff-war', 'news.rally', 'Topic', 'US Trade War / Tariffs', 'TOPIC:TARIFFS', '{"category": "topics.geopolitics"}', '{"timestamp": "2026-02-01T00:00:00Z", "precision": "month"}', '{"confidence": "verified"}')
  `);

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('evt-tariff-announce', 'evt-btc-volatility', 'causes', 1, 'February 2026 Rally', '{"description": "Tariff announcement triggers risk-off sentiment, BTC drops"}'),
    ('evt-tariff-announce', 'evt-gold-ath', 'causes', 2, 'February 2026 Rally', '{"description": "Trade war fears drive safe-haven buying into gold"}'),
    ('evt-fed-hold', 'evt-gold-ath', 'enables', 3, 'February 2026 Rally', '{"description": "Fed rate pause removes headwind for non-yielding gold"}'),
    ('evt-ecb-cut', 'evt-gold-ath', 'enables', 4, 'February 2026 Rally', '{"description": "ECB rate cut weakens euro, strengthens gold in EUR terms"}'),
    ('fact-gold-demand', 'evt-gold-ath', 'supports', 5, 'February 2026 Rally', '{"description": "Record central bank buying provides fundamental support"}'),
    ('evt-gold-ath', 'evt-silver-surge', 'causes', 6, 'February 2026 Rally', '{"description": "Gold breakout pulls silver higher as precious metals rally"}'),
    ('evt-inflation-data', 'decision-fed-pause', 'supports', 7, 'February 2026 Rally', '{"description": "Hot CPI validates Fed decision to hold rates"}'),
    ('evt-inflation-data', 'evt-gold-ath', 'supports', 8, 'February 2026 Rally', '{"description": "Inflation above target makes gold attractive as hedge"}'),
    ('evt-inflation-data', 'claim-gold-3000', 'supports', 9, 'February 2026 Rally', '{"description": "Persistent inflation fuels $3k gold predictions"}'),
    ('fin-gold', 'sector-precious', 'part_of', 0, NULL, '{}'),
    ('fin-silver', 'sector-precious', 'part_of', 0, NULL, '{}'),
    ('fin-btc', 'sector-crypto', 'part_of', 0, NULL, '{}'),
    ('fin-eth', 'sector-crypto', 'part_of', 0, NULL, '{}'),
    ('fin-oil', 'sector-energy', 'part_of', 0, NULL, '{}'),
    ('fin-uranium', 'sector-energy', 'part_of', 0, NULL, '{}'),
    ('person-fed-chair', 'org-fed', 'part_of', 0, NULL, '{"role": "Chair"}'),
    ('org-fed', 'evt-fed-hold', 'causes', 0, NULL, '{}'),
    ('org-ecb', 'evt-ecb-cut', 'causes', 0, NULL, '{}'),
    ('news-gold-rally', 'evt-gold-ath', 'supports', 0, NULL, '{}'),
    ('news-btc-tariff', 'evt-btc-volatility', 'supports', 0, NULL, '{}'),
    ('news-fed-decision', 'evt-fed-hold', 'supports', 0, NULL, '{}'),
    ('news-silver-demand', 'evt-silver-surge', 'supports', 0, NULL, '{}'),
    ('news-ecb-rate', 'evt-ecb-cut', 'supports', 0, NULL, '{}'),
    ('news-cpi-report', 'evt-inflation-data', 'supports', 0, NULL, '{}'),
    ('evt-gold-ath', 'claim-gold-3000', 'supports', 0, NULL, '{"description": "New ATH lends credibility to bullish target"}'),
    ('evt-btc-volatility', 'claim-btc-safe-haven', 'contradicts', 0, NULL, '{"description": "BTC dropping on risk events undermines safe-haven thesis"}'),
    ('fact-gold-demand', 'claim-gold-3000', 'supports', 0, NULL, '{"description": "Central bank demand provides structural floor"}'),
    ('fin-gold', 'topic-safe-haven', 'part_of', 0, NULL, '{}'),
    ('fin-btc', 'topic-safe-haven', 'part_of', 0, NULL, '{}'),
    ('evt-tariff-announce', 'topic-tariff-war', 'part_of', 0, NULL, '{}'),
    ('evt-fed-hold', 'evt-ecb-cut', 'follows', 0, NULL, '{}'),
    ('evt-btc-volatility', 'evt-gold-ath', 'follows', 0, NULL, '{}'),
    ('evt-gold-ath', 'evt-silver-surge', 'follows', 0, NULL, '{}'),
    ('evt-silver-surge', 'evt-inflation-data', 'follows', 0, NULL, '{}'),
    ('fact-btc-halving', 'fin-btc', 'enables', 0, NULL, '{"description": "Post-halving supply reduction historically bullish for BTC price"}')
  `);

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('evt-gold-ath', 'article', 'Gold Surges to Record High as Investors Flee Risk', 'https://bloomberg.com/news/gold-record-feb-2026', 'Gold prices surged past $2,900 an ounce for the first time, as escalating trade tensions and persistent inflation drove investors toward safe-haven assets.', 'Bloomberg', '2026-02-10T08:30:00Z'),
    ('evt-gold-ath', 'article', 'Gold Price Forecast: New All-Time High Opens Path to $3,000', 'https://kitco.com/news/gold-ath-analysis-feb26', 'With gold breaking decisively above $2,900, technical analysts see a clear path to the psychologically important $3,000 level.', 'Kitco News', '2026-02-10T12:00:00Z'),
    ('evt-btc-volatility', 'article', 'Bitcoin Tumbles as Trump Tariff Threats Shake Markets', 'https://coindesk.com/markets/btc-tariff-drop-feb26', 'Bitcoin fell sharply to $95,000 after President Trump confirmed 25% tariffs on Canadian and Mexican imports, triggering a broad risk-off move across crypto markets.', 'CoinDesk', '2026-02-03T10:00:00Z'),
    ('evt-fed-hold', 'article', 'Fed Holds Steady, Powell Warns of Inflation Uncertainty', 'https://reuters.com/business/fed-holds-rates-jan26', 'The Federal Reserve held interest rates at 4.25-4.50% as expected, with Chair Powell emphasizing the need for more progress on inflation before considering cuts.', 'Reuters', '2026-01-29T20:00:00Z'),
    ('evt-ecb-cut', 'article', 'ECB Cuts Rates Again as European Growth Falters', 'https://ft.com/content/ecb-rate-cut-jan26', 'The European Central Bank reduced its deposit rate to 2.75%, the fifth consecutive cut, as the eurozone economy continues to stagnate.', 'Financial Times', '2026-01-30T15:00:00Z'),
    ('evt-tariff-announce', 'article', 'Trump Confirms 25% Tariffs on Canada and Mexico', 'https://nytimes.com/2026/02/01/tariffs-canada-mexico', 'President Trump followed through on threats to impose 25% tariffs on imports from Canada and Mexico, sparking fears of a broader trade war.', 'New York Times', '2026-02-01T06:00:00Z'),
    ('evt-silver-surge', 'article', 'Silver Demand Boosted by Solar Panel Manufacturing Boom', 'https://mining.com/silver-solar-demand-feb26', 'Silver prices rallied past $33 per ounce as industrial demand surged, driven by record solar panel production and growing photovoltaic capacity.', 'Mining.com', '2026-02-12T14:00:00Z'),
    ('evt-inflation-data', 'article', 'US Inflation Ticks Up to 3.0%, Complicating Fed Outlook', 'https://wsj.com/economy/cpi-january-2026', 'The consumer price index rose 3.0% year-over-year in January, above expectations of 2.9%, dimming hopes for near-term rate cuts.', 'Wall Street Journal', '2026-02-12T14:00:00Z'),
    ('fact-gold-demand', 'report', 'World Gold Council: 2025 Gold Demand Trends', 'https://gold.org/goldhub/research/gold-demand-trends/2025', 'Central banks purchased 1,136 tonnes of gold in 2025, the third consecutive year above 1,000 tonnes, driven by diversification away from USD reserves.', 'World Gold Council', '2026-01-15T00:00:00Z'),
    ('claim-gold-3000', 'article', 'Goldman Sachs Raises Gold Target to $3,000', 'https://goldmansachs.com/insights/gold-forecast-q1-26', 'Goldman Sachs analysts raised their year-end gold price target to $3,000 per ounce, citing central bank demand and geopolitical uncertainty.', 'Goldman Sachs Research', '2026-02-08T09:00:00Z'),
    ('claim-gold-3000', 'article', 'UBS Sees Gold at $3,000 by Mid-2026', 'https://ubs.com/research/gold-q2-outlook', 'UBS raised its 6-month gold forecast to $3,000, pointing to sticky inflation and continued central bank buying as key drivers.', 'UBS Research', '2026-02-07T10:00:00Z'),
    ('org-strategy', 'article', 'Strategy Inc Continues Bitcoin Buying Spree', 'https://coindesk.com/business/strategy-btc-purchase-feb26', 'Strategy Inc (formerly MicroStrategy) announced another Bitcoin purchase, bringing its total holdings to over 450,000 BTC.', 'CoinDesk', '2026-02-05T16:00:00Z')
  `);

  console.log('  ✓ February 2026 Rally: 37 entities, 35 relations, 12 sources');
};
