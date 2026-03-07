/**
 * NOESIS Seed: Daily News — 2026-03-07 06:00 (Week 10, 2026)
 * Namespace: news.week10.day-2026-03-07
 * Built by seed-factory on 2026-03-07
 * Auto-gathered news: 16 stories, 2026-03-07 to 2026-03-07
 * Entities: 16 | Relations: 1 | Sources: 16
 * Narratives: Israel-Palestine Conflict
 */
module.exports = async function seed_news_week10_day_2026_03_07_hour_06(client) {
  console.log('  \u2192 Seeding: news-week10-day-2026-03-07-hour-06');

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
    ('news.week10.day-2026-03-07', 'news.week10', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('trump-demands-unconditional-surrender-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Trump demands ''unconditional surrender'' from Iran as Putin speaks with Iran''s president', NULL, '{"category":"geopolitics","description":"The president also calls on Tehran to pick new leaders who are \\"acceptable\\" to the White House after six days of war."}'::jsonb, '{"timestamp":"2026-03-07T02:04:06.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('armed-robots-take-to-the-battlefield-in-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Armed robots take to the battlefield in Ukraine war', NULL, '{"category":"geopolitics","description":"Ukraine has embarked on a programme to deploy armed robots on the battlefield against Russian forces."}'::jsonb, '{"timestamp":"2026-03-07T00:36:19.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('swiss-to-vote-on-right-wing-push-to-slas-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Swiss to vote on right-wing push to slash licence fee for public broadcaster', NULL, '{"category":"geopolitics","description":"The move is backed by the right-wing Swiss People''s Party, which says the current fee is unjustified because of the high cost of living."}'::jsonb, '{"timestamp":"2026-03-07T02:04:23.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('china-spent-years-building-ties-in-latin-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'China spent years building ties in Latin America. Can Trump make room for the US?', NULL, '{"category":"geopolitics","description":"US President Donald Trump will meet with ideologically-aligned Latin American leaders to try and counter China''s influence in the region."}'::jsonb, '{"timestamp":"2026-03-07T01:56:20.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('emirates-resumes-some-dubai-flights-wh-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Emirates resumes some Dubai flights – what''s the latest on travel to UK?', NULL, '{"category":"finance","description":"New flights to the UK from the Middle East follow days of widespread air travel disruption which had left Britons stranded."}'::jsonb, '{"timestamp":"2026-03-07T05:04:33.000Z","precision":"day"}'::jsonb, '{"confidence":"verified","sources_count":1}'::jsonb),
    ('caught-between-iran-and-saudi-arabia-ca-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Caught between Iran and Saudi Arabia, can Pakistan stay neutral for long?', NULL, '{"category":"geopolitics","description":"As Iran strikes Gulf targets, Pakistan navigates alliance with Riyadh while avoiding confrontation with Tehran."}'::jsonb, '{"timestamp":"2026-03-07T05:06:44.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('why-yemen-s-houthis-are-staying-out-of-i-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Why Yemen’s Houthis are staying out of Israel-US fight with Iran – for now', NULL, '{"category":"geopolitics","description":"Yemen''s Houthi leadership cautious, fearing Israeli retaliation following past air strikes and leadership losses."}'::jsonb, '{"timestamp":"2026-03-07T04:21:27.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('anti-aircraft-fire-seen-in-eastern-leban-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Anti-aircraft fire seen in eastern Lebanon amid Israeli incursion', NULL, '{"category":"geopolitics","description":"Apparent anti-aircraft fire was seen in the Bekaa Valley of eastern Lebanon amid reports of an attempted Israeli attack."}'::jsonb, '{"timestamp":"2026-03-07T03:18:18.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('massive-explosions-fires-from-us-israel-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Massive explosions, fires from US-Israeli strikes on Tehran', NULL, '{"category":"geopolitics","description":"Massive explosions and fires were seen across Tehran as US-Israeli strikes pummelled targets in the Iranian capital."}'::jsonb, '{"timestamp":"2026-03-07T03:02:32.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('iranian-missiles-over-tel-aviv-prompt-si-2026-03-07', 'news.week10.day-2026-03-07', 'Decision', 'Iranian missiles over Tel Aviv prompt sirens, interceptor launches', NULL, '{"category":"geopolitics","description":"Witness videos captured Iranian projectiles soaring over Tel Aviv as sirens blared and Israeli interceptors launched."}'::jsonb, '{"timestamp":"2026-03-07T01:11:04.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('iran-s-legal-case-for-striking-the-gulf-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Iran’s legal case for striking the Gulf collapses under scrutiny', NULL, '{"category":"geopolitics","description":"Claims of self-defence cannot justify missile attacks on neighbouring states that were not party to the conflict."}'::jsonb, '{"timestamp":"2026-03-07T01:08:43.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('wake-up-before-it-s-too-late-oppose-the-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Wake up before it’s too late: Oppose the unjust, cruel war on Iran', NULL, '{"category":"geopolitics","description":"Silence in the face of US–Israeli aggression will destroy the international legal order and endanger global peace."}'::jsonb, '{"timestamp":"2026-03-07T01:07:49.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('we-stand-with-israel-germany-s-friedr-2026-03-07', 'news.week10.day-2026-03-07', 'Event', '‘We stand with Israel’: Germany’s Friedrich Merz scolds protester', NULL, '{"category":"geopolitics","description":"“We stand with Israel.” German Chancellor Friedrich Merz scolded a pro-Palestinian protester at an election rally."}'::jsonb, '{"timestamp":"2026-03-07T01:06:28.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('iran-s-strikes-on-the-gulf-burning-the-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Iran’s strikes on the Gulf: Burning the bridges of good neighbourliness', NULL, '{"category":"geopolitics","description":"The Gulf states didn''t want this war, and they''re the ones Iran needs to mediate an end to the conflict."}'::jsonb, '{"timestamp":"2026-03-07T01:05:37.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('iran-war-is-latest-threat-to-a-global-ec-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Iran war is latest threat to a global economy rattled by Trump', NULL, '{"category":"geopolitics","description":"Rising energy prices threaten to stoke inflation and hobble economic growth in countries around the world."}'::jsonb, '{"timestamp":"2026-03-07T00:27:18.000Z","precision":"day"}'::jsonb, '{"confidence":"high","sources_count":1}'::jsonb),
    ('falling-energy-per-capita-is-the-world-2026-03-07', 'news.week10.day-2026-03-07', 'Event', 'Falling Energy Per Capita Is the World''s Biggest Problem', NULL, '{"category":"finance.energy","description":"A few years ago, I analyzed the growth of world energy consumption, breaking it down into (a) the growth in energy consumption needed to support the growth in world population, and (b) the growth in energy consumption available to support higher standards of living. This analysis covered the period "}'::jsonb, '{"timestamp":"2026-03-07T00:00:00.000Z","precision":"day"}'::jsonb, '{"confidence":"medium","sources_count":1}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 16');

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('we-stand-with-israel-germany-s-friedr-2026-03-07', 'massive-explosions-fires-from-us-israel-2026-03-07', 'causes', 1, 'Israel-Palestine Conflict', '{}'::jsonb)
    ON CONFLICT DO NOTHING
  `);
  console.log('    Relations: 1');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('trump-demands-unconditional-surrender-2026-03-07', 'article', 'Trump demands ''unconditional surrender'' from Iran as Putin speaks with Iran''s president', 'https://www.bbc.com/news/articles/c5yq82k1wk8o', 'The president also calls on Tehran to pick new leaders who are "acceptable" to the White House after six days of war.', 'BBC News', '2026-03-07T02:04:06.000Z'),
    ('armed-robots-take-to-the-battlefield-in-2026-03-07', 'article', 'Armed robots take to the battlefield in Ukraine war', 'https://www.bbc.com/news/articles/c62662gzlp8o', 'Ukraine has embarked on a programme to deploy armed robots on the battlefield against Russian forces.', 'BBC News', '2026-03-07T00:36:19.000Z'),
    ('swiss-to-vote-on-right-wing-push-to-slas-2026-03-07', 'article', 'Swiss to vote on right-wing push to slash licence fee for public broadcaster', 'https://www.bbc.com/news/articles/c4g55v24wrno', 'The move is backed by the right-wing Swiss People''s Party, which says the current fee is unjustified because of the high cost of living.', 'BBC News', '2026-03-07T02:04:23.000Z'),
    ('china-spent-years-building-ties-in-latin-2026-03-07', 'article', 'China spent years building ties in Latin America. Can Trump make room for the US?', 'https://www.bbc.com/news/articles/c5yvw0zwpd5o', 'US President Donald Trump will meet with ideologically-aligned Latin American leaders to try and counter China''s influence in the region.', 'BBC News', '2026-03-07T01:56:20.000Z'),
    ('emirates-resumes-some-dubai-flights-wh-2026-03-07', 'article', 'Emirates resumes some Dubai flights – what''s the latest on travel to UK?', 'https://www.bbc.com/news/articles/c4ge52x4w37o', 'New flights to the UK from the Middle East follow days of widespread air travel disruption which had left Britons stranded.', 'BBC Business', '2026-03-07T05:04:33.000Z'),
    ('caught-between-iran-and-saudi-arabia-ca-2026-03-07', 'article', 'Caught between Iran and Saudi Arabia, can Pakistan stay neutral for long?', 'https://www.aljazeera.com/news/2026/3/7/caught-between-iran-and-saudi-arabia-can-pakistan-stay-neutral-for-long', 'As Iran strikes Gulf targets, Pakistan navigates alliance with Riyadh while avoiding confrontation with Tehran.', 'Al Jazeera', '2026-03-07T05:06:44.000Z'),
    ('why-yemen-s-houthis-are-staying-out-of-i-2026-03-07', 'article', 'Why Yemen’s Houthis are staying out of Israel-US fight with Iran – for now', 'https://www.aljazeera.com/news/2026/3/7/why-yemens-houthis-are-staying-out-of-israel-us-fight-with-iran-for-now', 'Yemen''s Houthi leadership cautious, fearing Israeli retaliation following past air strikes and leadership losses.', 'Al Jazeera', '2026-03-07T04:21:27.000Z'),
    ('anti-aircraft-fire-seen-in-eastern-leban-2026-03-07', 'article', 'Anti-aircraft fire seen in eastern Lebanon amid Israeli incursion', 'https://www.aljazeera.com/video/newsfeed/2026/3/7/anti-aircraft-fire-seen-in-eastern-lebanon-amid-israeli-incursion', 'Apparent anti-aircraft fire was seen in the Bekaa Valley of eastern Lebanon amid reports of an attempted Israeli attack.', 'Al Jazeera', '2026-03-07T03:18:18.000Z'),
    ('massive-explosions-fires-from-us-israel-2026-03-07', 'article', 'Massive explosions, fires from US-Israeli strikes on Tehran', 'https://www.aljazeera.com/video/newsfeed/2026/3/7/massive-explosions-fires-from-us-israeli-strikes-on-tehran', 'Massive explosions and fires were seen across Tehran as US-Israeli strikes pummelled targets in the Iranian capital.', 'Al Jazeera', '2026-03-07T03:02:32.000Z'),
    ('iranian-missiles-over-tel-aviv-prompt-si-2026-03-07', 'article', 'Iranian missiles over Tel Aviv prompt sirens, interceptor launches', 'https://www.aljazeera.com/video/newsfeed/2026/3/7/iranian-missiles-over-tel-aviv-prompt-sirens-interceptor-launches', 'Witness videos captured Iranian projectiles soaring over Tel Aviv as sirens blared and Israeli interceptors launched.', 'Al Jazeera', '2026-03-07T01:11:04.000Z'),
    ('iran-s-legal-case-for-striking-the-gulf-2026-03-07', 'article', 'Iran’s legal case for striking the Gulf collapses under scrutiny', 'https://www.aljazeera.com/opinions/2026/3/7/irans-legal-case-for-striking-the-gulf-collapses-under-scrutiny', 'Claims of self-defence cannot justify missile attacks on neighbouring states that were not party to the conflict.', 'Al Jazeera', '2026-03-07T01:08:43.000Z'),
    ('wake-up-before-it-s-too-late-oppose-the-2026-03-07', 'article', 'Wake up before it’s too late: Oppose the unjust, cruel war on Iran', 'https://www.aljazeera.com/opinions/2026/3/7/wake-up-before-its-too-late-oppose-the-unjust-cruel-war-on-iran', 'Silence in the face of US–Israeli aggression will destroy the international legal order and endanger global peace.', 'Al Jazeera', '2026-03-07T01:07:49.000Z'),
    ('we-stand-with-israel-germany-s-friedr-2026-03-07', 'article', '‘We stand with Israel’: Germany’s Friedrich Merz scolds protester', 'https://www.aljazeera.com/video/newsfeed/2026/3/7/we-stand-with-israel-germanys-friedrich-merz-scolds-protester', '“We stand with Israel.” German Chancellor Friedrich Merz scolded a pro-Palestinian protester at an election rally.', 'Al Jazeera', '2026-03-07T01:06:28.000Z'),
    ('iran-s-strikes-on-the-gulf-burning-the-2026-03-07', 'article', 'Iran’s strikes on the Gulf: Burning the bridges of good neighbourliness', 'https://www.aljazeera.com/opinions/2026/3/7/irans-strikes-on-the-gulf-burning-the-bridges-of-good-neighbourliness', 'The Gulf states didn''t want this war, and they''re the ones Iran needs to mediate an end to the conflict.', 'Al Jazeera', '2026-03-07T01:05:37.000Z'),
    ('iran-war-is-latest-threat-to-a-global-ec-2026-03-07', 'article', 'Iran war is latest threat to a global economy rattled by Trump', 'https://www.aljazeera.com/economy/2026/3/7/iran-war-is-latest-threat-to-a-global-economy-rattled-by-trump', 'Rising energy prices threaten to stoke inflation and hobble economic growth in countries around the world.', 'Al Jazeera', '2026-03-07T00:27:18.000Z'),
    ('falling-energy-per-capita-is-the-world-2026-03-07', 'article', 'Falling Energy Per Capita Is the World''s Biggest Problem', 'https://oilprice.com/Energy/Energy-General/Falling-Energy-Per-Capita-Is-the-Worlds-Biggest-Problem.html', 'A few years ago, I analyzed the growth of world energy consumption, breaking it down into (a) the growth in energy consumption needed to support the growth in world population, and (b) the growth in e', 'OilPrice.com', '2026-03-07T00:00:00.000Z')
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 16');

  console.log('  \u2713 news-week10-day-2026-03-07-hour-06: 16 entities, 1 relations, 16 sources');
};
