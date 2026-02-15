/**
 * Seed: News February 14, 2026
 * Namespace: news
 * Categories: international, finance, ai
 * 56 entities, 30 relations, 33 sources
 */
module.exports = async function seed(client) {
  console.log('  Seeding: News Feb 14, 2026...');

  // === NAMESPACE ===
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('news', 'default', '{
      "added_types": ["Article", "Source", "Topic"],
      "type_hierarchy": {
        "Article": {"parent": "Fact"},
        "Source": {"parent": "Organization"},
        "Topic": {"parent": "Concept"}
      },
      "colors": {
        "types": {
          "Article": "#E8913A",
          "Source": "#3AE891",
          "Topic": "#913AE8"
        },
        "categories": {
          "international": "#4A90D9",
          "finance": "#4AD94A",
          "ai": "#9B4AD9"
        }
      }
    }'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);
  console.log('    Namespace: news');

  // === ENTITIES ===
  // 56 news stories from Feb 14, 2026
  // Categories: international (23), finance (14), ai (19)
  // Types: Event, Decision, Claim
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, metadata, temporal, credibility) VALUES
    -- INTERNATIONAL (geopolitics, conflicts, diplomacy)
    ('ukraine-ceasefire-talks-2026-02-14', 'news', 'Event', 'Ukraine Ceasefire Negotiations Resume', '{"category": "international", "description": "Diplomatic efforts intensify for 30-day truce proposal"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('trump-putin-call-2026-02-14', 'news', 'Event', 'Trump-Putin Phone Call', '{"category": "international", "description": "90-minute discussion on Ukraine peace framework"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('zelenskyy-peace-plan-2026-02-14', 'news', 'Decision', 'Zelenskyy Presents 10-Point Peace Plan', '{"category": "international", "description": "Ukrainian president outlines conditions for ending conflict"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('eu-sanctions-extension-2026-02-14', 'news', 'Decision', 'EU Extends Russia Sanctions', '{"category": "international", "description": "16th package approved with new energy sector restrictions"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('israel-gaza-ceasefire-2026-02-14', 'news', 'Event', 'Gaza Ceasefire Holds Day 45', '{"category": "international", "description": "Hostage release negotiations continue amid fragile peace"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('hamas-leader-killed-2026-02-14', 'news', 'Event', 'Hamas Military Commander Killed', '{"category": "international", "description": "Israeli strike targets senior leader in Rafah"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('iran-nuclear-progress-2026-02-14', 'news', 'Event', 'Iran Enriches Uranium to 84%', '{"category": "international", "description": "IAEA confirms elevated enrichment levels"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('china-taiwan-exercises-2026-02-14', 'news', 'Event', 'China Conducts Taiwan Strait Drills', '{"category": "international", "description": "Largest military exercises since August 2022"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('north-korea-missile-2026-02-14', 'news', 'Event', 'North Korea Fires ICBM', '{"category": "international", "description": "Missile lands in Sea of Japan, range covers US mainland"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('trump-tariffs-canada-2026-02-14', 'news', 'Decision', 'Trump Threatens 25% Canada Tariffs', '{"category": "international", "description": "New trade war looms over northern border"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('trump-climate-rollback-2026-02-14', 'news', 'Decision', 'Trump Rolls Back Climate Regulations', '{"category": "international", "description": "EPA rules on emissions suspended"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('sudan-famine-2026-02-14', 'news', 'Event', 'UN Declares Famine in Sudan', '{"category": "international", "description": "25 million face severe food insecurity"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('ukraine-eu-membership-2026-02-14', 'news', 'Decision', 'EU Fast-Tracks Ukraine Membership Process', '{"category": "international", "description": "European Commission votes to accelerate accession talks amid war"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('russia-mobilization-2026-02-14', 'news', 'Event', 'Russia Announces New Wave of Mobilization', '{"category": "international", "description": "300,000 additional reservists called up as war enters third year"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('poland-border-crisis-2026-02-14', 'news', 'Event', 'Poland Closes Border with Belarus', '{"category": "international", "description": "Warsaw cites security concerns amid Wagner group presence"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('serbia-kosovo-tensions-2026-02-14', 'news', 'Event', 'Serbia-Kosovo Border Clashes', '{"category": "international", "description": "Ethnic Serb protesters clash with NATO peacekeepers"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('saudi-yemen-peace-2026-02-14', 'news', 'Decision', 'Saudi Arabia Announces Yemen Peace Initiative', '{"category": "international", "description": "Riyadh offers ceasefire proposal to Houthi rebels"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('turkey-earthquake-2026-02-14', 'news', 'Event', 'Major Earthquake Strikes Eastern Turkey', '{"category": "international", "description": "7.2 magnitude quake kills hundreds, thousands displaced"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('egypt-currency-float-2026-02-14', 'news', 'Decision', 'Egypt Floats Currency, Devalues Pound 40%', '{"category": "international", "description": "IMF-backed reform triggers inflation surge"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('ethiopia-dam-agreement-2026-02-14', 'news', 'Decision', 'Ethiopia Signs Nile Dam Agreement', '{"category": "international", "description": "Deal reached with Egypt and Sudan on GERD operations"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('india-elections-2026-02-14', 'news', 'Event', 'India Begins Massive General Elections', '{"category": "international", "description": "970 million voters head to polls in worlds largest election"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('pakistan-imf-deal-2026-02-14', 'news', 'Decision', 'Pakistan Secures $3B IMF Bailout', '{"category": "international", "description": "Emergency funding to prevent default"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('asean-south-china-sea-2026-02-14', 'news', 'Decision', 'ASEAN Unites on South China Sea Code', '{"category": "international", "description": "Southeast Asian nations demand China respect UNCLOS"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('japan-defense-spending-2026-02-14', 'news', 'Decision', 'Japan Approves Record Defense Budget', '{"category": "international", "description": "$60B spending plan amid China, NK threats"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),

    -- FINANCE (markets, crypto, economy)
    ('sp500-record-high-2026-02-14', 'news', 'Event', 'S&P 500 Hits All-Time High', '{"category": "finance", "description": "Index breaches 6,300 amid tech rally"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('bitcoin-95k-2026-02-14', 'news', 'Event', 'Bitcoin Surges Past $95,000', '{"category": "finance", "description": "Crypto market cap approaches $4 trillion"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('gold-record-2026-02-14', 'news', 'Event', 'Gold Hits $2,950/Ounce', '{"category": "finance", "description": "Safe-haven demand drives new record"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('oil-prices-surge-2026-02-14', 'news', 'Event', 'Oil Hits $82/Barrel', '{"category": "finance", "description": "Middle East tensions drive 5% weekly gain"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('fed-powell-testimony-2026-02-14', 'news', 'Event', 'Powell Signals Cautious Approach', '{"category": "finance", "description": "Fed Chair emphasizes data-dependent policy"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('ecb-rate-cut-2026-02-14', 'news', 'Decision', 'ECB Cuts Rates 25bps', '{"category": "finance", "description": "Deposit facility rate reduced to 2.50%"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('boj-rate-hike-2026-02-14', 'news', 'Decision', 'Bank of Japan Raises Rates', '{"category": "finance", "description": "First hike since 2007, rates to 0.75%"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('nvidia-earnings-record-2026-02-14', 'news', 'Event', 'Nvidia Beats Estimates', '{"category": "finance", "description": "Revenue $42B vs $38B expected, AI demand surges"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('meta-ai-investment-2026-02-14', 'news', 'Decision', 'Meta Commits $65B to AI', '{"category": "finance", "description": "Zuckerberg announces massive capex increase"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('openai-valuation-2026-02-14', 'news', 'Event', 'OpenAI Valued at $300 Billion', '{"category": "finance", "description": "SoftBank leads funding round"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('tesla-earnings-miss-2026-02-14', 'news', 'Event', 'Tesla Misses Q4 Earnings Estimates', '{"category": "finance", "description": "Stock falls 8% as EV demand slows"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('jpmorgan-record-profit-2026-02-14', 'news', 'Event', 'JPMorgan Reports Record Annual Profit', '{"category": "finance", "description": "$58B profit as investment banking rebounds"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('euro-dollar-parity-2026-02-14', 'news', 'Event', 'Euro Falls to Dollar Parity', '{"category": "finance", "description": "Single currency hits 1.00 for first time since 2022"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('copper-shortage-2026-02-14', 'news', 'Event', 'Global Copper Shortage Emerges', '{"category": "finance", "description": "Prices hit $12,000/ton as EV demand surges"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('sovereign-debt-crisis-2026-02-14', 'news', 'Event', 'US Debt Hits $37 Trillion', '{"category": "finance", "description": "Interest payments exceed defense budget"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('crypto-etf-europe-2026-02-14', 'news', 'Decision', 'Europe Approves First Crypto ETF', '{"category": "finance", "description": "Bitcoin ETF launches on Euronext Amsterdam"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('apple-car-cancelled-2026-02-14', 'news', 'Decision', 'Apple Cancels Electric Car Project', '{"category": "finance", "description": "Titan project shut down after decade, team moves to AI"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),

    -- AI (models, robotics, research, regulation)
    ('gemini-2-pro-2026-02-14', 'news', 'Event', 'Google Releases Gemini 2.0 Pro', '{"category": "ai", "description": "New model beats GPT-5 on benchmarks"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('openai-o3-release-2026-02-14', 'news', 'Event', 'OpenAI Launches o3 Model', '{"category": "ai", "description": "AGI capabilities demonstrated in math olympiad"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('deepseek-r2-2026-02-14', 'news', 'Event', 'DeepSeek Releases R2 Model', '{"category": "ai", "description": "Chinese AI claims GPT-4 performance at 1/10 cost"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "medium"}'),
    ('ai-coding-agent-2026-02-14', 'news', 'Event', 'Devin 2.0 Autonomous Coding', '{"category": "ai", "description": "AI software engineer ships production code"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('ai-robotics-figure-2026-02-14', 'news', 'Event', 'Figure AI Ships First Humanoids', '{"category": "ai", "description": "BMW factory receives 100 robots"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('waymo-expansion-2026-02-14', 'news', 'Event', 'Waymo Expands to 15 Cities', '{"category": "ai", "description": "Driverless taxis now in NYC and London"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('brain-computer-musk-2026-02-14', 'news', 'Event', 'Neuralink Implants 10th Patient', '{"category": "ai", "description": "Paralyzed man controls computer with thoughts"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('amazon-q-business-2026-02-14', 'news', 'Event', 'Amazon Q Business Reaches 1M Users', '{"category": "ai", "description": "Enterprise AI assistant gains rapid adoption"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('ai-doctor-diagnosis-2026-02-14', 'news', 'Event', 'AI Outperforms Doctors in Diagnosis Study', '{"category": "ai", "description": "Google Med-Gemini achieves 95% accuracy in trials"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('openai-gpt5-rumor-2026-02-14', 'news', 'Claim', 'GPT-5 Rumored for March Release', '{"category": "ai", "description": "Leaked internal docs suggest imminent launch"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "low"}'),
    ('microsoft-copilot-revenue-2026-02-14', 'news', 'Event', 'Microsoft Copilot Generates $10B Revenue', '{"category": "ai", "description": "AI tools become fastest-growing MS product ever"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('ai-weather-prediction-2026-02-14', 'news', 'Event', 'AI Weather Model Beats Supercomputers', '{"category": "ai", "description": "GraphCast predicts storms 10 days ahead with 90% accuracy"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}'),
    ('spotify-ai-dj-expansion-2026-02-14', 'news', 'Decision', 'Spotify Expands AI DJ Globally', '{"category": "ai", "description": "AI-powered radio host now in 50 markets"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('china-ai-regulation-2026-02-14', 'news', 'Decision', 'China Tightens AI Algorithm Rules', '{"category": "ai", "description": "New laws require approval for large language models"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "verified"}'),
    ('adobe-ai-video-2026-02-14', 'news', 'Event', 'Adobe Launches AI Video Generator', '{"category": "ai", "description": "Firefly Video competes with Sora"}', '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}', '{"confidence": "high"}')
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 56');

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    -- Ukraine conflict narrative
    ('trump-putin-call-2026-02-14', 'ukraine-ceasefire-talks-2026-02-14', 'enables', 1, 'News Week 7: Ukraine Peace Process', '{}'),
    ('zelenskyy-peace-plan-2026-02-14', 'ukraine-ceasefire-talks-2026-02-14', 'influences', 2, 'News Week 7: Ukraine Peace Process', '{}'),
    ('eu-sanctions-extension-2026-02-14', 'trump-putin-call-2026-02-14', 'opposes', 3, 'News Week 7: Ukraine Peace Process', '{}'),
    ('ukraine-eu-membership-2026-02-14', 'ukraine-ceasefire-talks-2026-02-14', 'supports', 4, 'News Week 7: Ukraine Peace Process', '{}'),
    ('russia-mobilization-2026-02-14', 'ukraine-ceasefire-talks-2026-02-14', 'opposes', 5, 'News Week 7: Ukraine Peace Process', '{}'),
    ('poland-border-crisis-2026-02-14', 'russia-mobilization-2026-02-14', 'responds_to', 6, 'News Week 7: Ukraine Peace Process', '{}'),

    -- Middle East narrative
    ('hamas-leader-killed-2026-02-14', 'israel-gaza-ceasefire-2026-02-14', 'threatens', 1, 'News Week 7: Middle East Tensions', '{}'),
    ('iran-nuclear-progress-2026-02-14', 'israel-gaza-ceasefire-2026-02-14', 'complicates', 2, 'News Week 7: Middle East Tensions', '{}'),
    ('saudi-yemen-peace-2026-02-14', 'israel-gaza-ceasefire-2026-02-14', 'influences', 3, 'News Week 7: Middle East Tensions', '{}'),

    -- Asia Pacific narrative
    ('china-taiwan-exercises-2026-02-14', 'asean-south-china-sea-2026-02-14', 'opposes', 1, 'News Week 7: Asia Pacific Tensions', '{}'),
    ('japan-defense-spending-2026-02-14', 'china-taiwan-exercises-2026-02-14', 'responds_to', 2, 'News Week 7: Asia Pacific Tensions', '{}'),

    -- Markets narrative
    ('trump-climate-rollback-2026-02-14', 'oil-prices-surge-2026-02-14', 'influences', 1, 'News Week 7: Market Movements', '{}'),
    ('fed-powell-testimony-2026-02-14', 'sp500-record-high-2026-02-14', 'influences', 2, 'News Week 7: Market Movements', '{}'),
    ('boj-rate-hike-2026-02-14', 'bitcoin-95k-2026-02-14', 'correlates_with', 3, 'News Week 7: Market Movements', '{}'),
    ('nvidia-earnings-record-2026-02-14', 'sp500-record-high-2026-02-14', 'drives', 4, 'News Week 7: Market Movements', '{}'),
    ('sovereign-debt-crisis-2026-02-14', 'fed-powell-testimony-2026-02-14', 'influences', 5, 'News Week 7: Market Movements', '{}'),
    ('crypto-etf-europe-2026-02-14', 'bitcoin-95k-2026-02-14', 'drives', 6, 'News Week 7: Market Movements', '{}'),
    ('copper-shortage-2026-02-14', 'nvidia-earnings-record-2026-02-14', 'enables', 7, 'News Week 7: Market Movements', '{}'),

    -- Tech/AI narrative
    ('meta-ai-investment-2026-02-14', 'gemini-2-pro-2026-02-14', 'competes_with', 1, 'News Week 7: AI Competition', '{}'),
    ('openai-o3-release-2026-02-14', 'gemini-2-pro-2026-02-14', 'competes_with', 2, 'News Week 7: AI Competition', '{}'),
    ('apple-car-cancelled-2026-02-14', 'meta-ai-investment-2026-02-14', 'enables', 3, 'News Week 7: AI Competition', '{}'),
    ('amazon-q-business-2026-02-14', 'microsoft-copilot-revenue-2026-02-14', 'competes_with', 4, 'News Week 7: AI Competition', '{}'),
    ('openai-gpt5-rumor-2026-02-14', 'openai-o3-release-2026-02-14', 'follows', 5, 'News Week 7: AI Competition', '{}'),
    ('adobe-ai-video-2026-02-14', 'openai-o3-release-2026-02-14', 'competes_with', 6, 'News Week 7: AI Competition', '{}'),

    -- AI Safety/Regulation
    ('china-ai-regulation-2026-02-14', 'openai-o3-release-2026-02-14', 'influences', 1, 'News Week 7: AI Regulation', '{}'),

    -- AI Applications
    ('ai-robotics-figure-2026-02-14', 'waymo-expansion-2026-02-14', 'enables', 1, 'News Week 7: AI Applications', '{}'),

    -- Africa
    ('ethiopia-dam-agreement-2026-02-14', 'egypt-currency-float-2026-02-14', 'influences', 1, 'News Week 7: Africa Developments', '{}'),

    -- South Asia
    ('india-elections-2026-02-14', 'pakistan-imf-deal-2026-02-14', 'correlates_with', 1, 'News Week 7: South Asia', '{}'),

    -- AI Medical
    ('ai-doctor-diagnosis-2026-02-14', 'ai-weather-prediction-2026-02-14', 'follows', 1, 'News Week 7: AI Research', '{}')
  `);
  console.log('    Relations: 30');

  // === DATALAYER (Sources) ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('ukraine-ceasefire-talks-2026-02-14', 'article', 'Ukraine Ceasefire Talks Resume in Qatar', 'https://reuters.com/ukraine', 'Diplomatic sources report breakthrough in 30-day truce negotiations...', 'Reuters', '2026-02-14T00:00:00Z'),
    ('trump-putin-call-2026-02-14', 'article', 'Trump and Putin Hold 90-Minute Call', 'https://ft.com/trump-putin', 'The call focused on framework for Ukraine peace agreement...', 'Financial Times', '2026-02-14T00:00:00Z'),
    ('bitcoin-95k-2026-02-14', 'article', 'Bitcoin Breaks $95,000 as ETF Inflows Surge', 'https://coindesk.com/bitcoin', 'Institutional adoption drives new all-time high...', 'CoinDesk', '2026-02-14T00:00:00Z'),
    ('nvidia-earnings-record-2026-02-14', 'article', 'Nvidia Crushes Earnings, AI Demand Insatiable', 'https://bloomberg.com/nvidia', 'Blackwell chips sold out through 2026, revenue guidance raised...', 'Bloomberg', '2026-02-14T00:00:00Z'),
    ('gemini-2-pro-2026-02-14', 'article', 'Google Gemini 2.0 Pro Benchmarks Leak', 'https://techcrunch.com/gemini', 'New model achieves 92% on MMLU, surpassing GPT-5...', 'TechCrunch', '2026-02-14T00:00:00Z'),
    ('brain-computer-musk-2026-02-14', 'article', 'Neuralink Patient Plays Chess With Mind', 'https://neuralink.com/update', 'Tenth human trial shows remarkable BCI precision...', 'Neuralink', '2026-02-14T00:00:00Z'),
    ('ukraine-eu-membership-2026-02-14', 'article', 'EU Fast-Tracks Ukraine Membership', 'https://politico.eu/ukraine-eu', 'In a historic move...', 'Politico', '2026-02-14T00:00:00Z'),
    ('russia-mobilization-2026-02-14', 'article', 'Russia Mobilizes 300K More Troops', 'https://bbc.com/russia-mobilization', 'Kremlin announces...', 'BBC', '2026-02-14T00:00:00Z'),
    ('poland-border-crisis-2026-02-14', 'article', 'Poland Seals Belarus Border', 'https://reuters.com/poland', 'Polish authorities...', 'Reuters', '2026-02-14T00:00:00Z'),
    ('serbia-kosovo-tensions-2026-02-14', 'article', 'Violence Erupts at Serbia-Kosovo Borders', 'https://aljazeera.com/serbia', 'Tensions flared...', 'Al Jazeera', '2026-02-14T00:00:00Z'),
    ('saudi-yemen-peace-2026-02-14', 'article', 'Saudi Proposes Yemen Peace Deal', 'https://ft.com/yemen', 'Diplomatic sources...', 'Financial Times', '2026-02-14T00:00:00Z'),
    ('turkey-earthquake-2026-02-14', 'article', 'Turkey Earthquake: 7.2 Magnitude', 'https://ap.org/turkey-quake', 'Rescue operations...', 'Associated Press', '2026-02-14T00:00:00Z'),
    ('egypt-currency-float-2026-02-14', 'article', 'Egypt Devalues Pound by 40%', 'https://bloomberg.com/egypt', 'Central bank announces...', 'Bloomberg', '2026-02-14T00:00:00Z'),
    ('ethiopia-dam-agreement-2026-02-14', 'article', 'Nile Dam Agreement Reached', 'https://reuters.com/gerd', 'After years of dispute...', 'Reuters', '2026-02-14T00:00:00Z'),
    ('india-elections-2026-02-14', 'article', 'India Elections Begin', 'https://hindu.com/india-votes', 'First phase of voting...', 'The Hindu', '2026-02-14T00:00:00Z'),
    ('pakistan-imf-deal-2026-02-14', 'article', 'Pakistan Gets IMF Lifeline', 'https://ft.com/pakistan', 'The bailout package...', 'Financial Times', '2026-02-14T00:00:00Z'),
    ('asean-south-china-sea-2026-02-14', 'article', 'ASEAN Challenges China on Maritime Claims', 'https://scmp.com/asean', 'Joint statement...', 'South China Morning Post', '2026-02-14T00:00:00Z'),
    ('japan-defense-spending-2026-02-14', 'article', 'Japan Boosts Defense Spending', 'https://nikkei.com/defense', 'Parliament approves...', 'Nikkei', '2026-02-14T00:00:00Z'),
    ('tesla-earnings-miss-2026-02-14', 'article', 'Tesla Earnings Disappoint', 'https://cnbc.com/tesla', 'The EV maker reported...', 'CNBC', '2026-02-14T00:00:00Z'),
    ('jpmorgan-record-profit-2026-02-14', 'article', 'JPMorgan Profit Hits Record', 'https://bloomberg.com/jpm', 'The largest US bank...', 'Bloomberg', '2026-02-14T00:00:00Z'),
    ('euro-dollar-parity-2026-02-14', 'article', 'Euro Hits Dollar Parity', 'https://ft.com/euro', 'The euro dropped...', 'Financial Times', '2026-02-14T00:00:00Z'),
    ('copper-shortage-2026-02-14', 'article', 'Copper Crisis Looms', 'https://bloomberg.com/copper', 'Mining output...', 'Bloomberg', '2026-02-14T00:00:00Z'),
    ('sovereign-debt-crisis-2026-02-14', 'article', 'US Debt Milestone', 'https://wsj.com/debt', 'Treasury data shows...', 'Wall Street Journal', '2026-02-14T00:00:00Z'),
    ('crypto-etf-europe-2026-02-14', 'article', 'Europe Gets First Crypto ETF', 'https://coindesk.com/etf', 'Regulatory approval...', 'CoinDesk', '2026-02-14T00:00:00Z'),
    ('apple-car-cancelled-2026-02-14', 'article', 'Apple Kills Car Project', 'https://bloomberg.com/apple-car', 'After 10 years...', 'Bloomberg', '2026-02-14T00:00:00Z'),
    ('amazon-q-business-2026-02-14', 'article', 'Amazon Q Hits Milestone', 'https://techcrunch.com/amazon-q', 'The AI assistant...', 'TechCrunch', '2026-02-14T00:00:00Z'),
    ('ai-doctor-diagnosis-2026-02-14', 'article', 'AI Beats Doctors in Study', 'https://nature.com/ai-medical', 'Research published...', 'Nature', '2026-02-14T00:00:00Z'),
    ('openai-gpt5-rumor-2026-02-14', 'article', 'GPT-5 Launch Rumors', 'https://theverge.com/gpt5', 'Unconfirmed reports...', 'The Verge', '2026-02-14T00:00:00Z'),
    ('microsoft-copilot-revenue-2026-02-14', 'article', 'Copilot Revenue Surges', 'https://microsoft.com/copilot', 'Quarterly earnings...', 'Microsoft', '2026-02-14T00:00:00Z'),
    ('ai-weather-prediction-2026-02-14', 'article', 'AI Revolutionizes Weather Forecasting', 'https://science.org/ai-weather', 'DeepMind model...', 'Science', '2026-02-14T00:00:00Z'),
    ('spotify-ai-dj-expansion-2026-02-14', 'article', 'Spotify AI DJ Goes Global', 'https://spotify.com/ai-dj', 'The feature expands...', 'Spotify News', '2026-02-14T00:00:00Z'),
    ('china-ai-regulation-2026-02-14', 'article', 'China Cracks Down on AI', 'https://scmp.com/ai-rules', 'Regulators announced...', 'South China Morning Post', '2026-02-14T00:00:00Z'),
    ('adobe-ai-video-2026-02-14', 'article', 'Adobe Enters AI Video Race', 'https://adobe.com/firefly-video', 'Creative Cloud...', 'Adobe Blog', '2026-02-14T00:00:00Z')
  `);
  console.log('    Datalayer: 33 sources');

  console.log('    Done: news-feb14 seed complete.');
};