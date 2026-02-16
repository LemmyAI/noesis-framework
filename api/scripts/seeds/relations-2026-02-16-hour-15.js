/**
 * NOESIS Seed: Auto-generated Relations (2026-02-16 15:00)
 * Namespace: relations
 * Built by seed-factory on 2026-02-16
 * 100 relations inferred by connect job
 * Entities: 0 | Relations: 100 | Sources: 0
 */
module.exports = async function seed_relations_2026_02_16_hour_15(client) {
  console.log('  \u2192 Seeding: relations-2026-02-16-hour-15');

  // === NAMESPACE ===
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('relations', 'default', '{}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('xrp-outruns-bitcoin-ether-after-investo-2026-02-15', 'blackrocks-digital-assets-head-leverag-2026-02-15', 'co_occurrence', 0, 'Shared: bitcoin', '{"shared_entities":["bitcoin"],"source":"connect_job"}'::jsonb),
    ('xrp-outruns-bitcoin-ether-after-investo-2026-02-15', 'wall-street-remains-bullish-on-bitcoin-w-2026-02-15', 'co_occurrence', 0, 'Shared: bitcoin', '{"shared_entities":["bitcoin"],"source":"connect_job"}'::jsonb),
    ('xrp-outruns-bitcoin-ether-after-investo-2026-02-15', 'strategy-says-it-can-survive-even-if-bit-2026-02-16', 'co_occurrence', 0, 'Shared: bitcoin', '{"shared_entities":["bitcoin"],"source":"connect_job"}'::jsonb),
    ('xrp-outruns-bitcoin-ether-after-investo-2026-02-15', 'crypto-market-drowns-in-red-as-bitcoin-f-2026-02-16', 'co_occurrence', 0, 'Shared: bitcoin', '{"shared_entities":["bitcoin"],"source":"connect_job"}'::jsonb),
    ('xrp-outruns-bitcoin-ether-after-investo-2026-02-15', 'metaplanet-operating-profit-to-rise-81-2026-02-16', 'co_occurrence', 0, 'Shared: bitcoin', '{"shared_entities":["bitcoin"],"source":"connect_job"}'::jsonb),
    ('xrp-outruns-bitcoin-ether-after-investo-2026-02-15', 'bitcoin-claws-back-to-70-000-on-cooling-2026-02-14', 'co_occurrence', 0, 'Shared: bitcoin', '{"shared_entities":["bitcoin"],"source":"connect_job"}'::jsonb),
    ('xrp-outruns-bitcoin-ether-after-investo-2026-02-15', 'comp-key', 'co_occurrence', 0, 'Shared: bitcoin', '{"shared_entities":["bitcoin"],"source":"connect_job"}'::jsonb),
    ('layer-1', 'layer-5', 'co_occurrence', 0, 'Shared: layer', '{"shared_entities":["layer"],"source":"connect_job"}'::jsonb),
    ('layer-1', 'layer-3', 'co_occurrence', 0, 'Shared: layer', '{"shared_entities":["layer"],"source":"connect_job"}'::jsonb),
    ('layer-1', 'layer-2', 'co_occurrence', 0, 'Shared: layer', '{"shared_entities":["layer"],"source":"connect_job"}'::jsonb),
    ('layer-1', 'layer-4', 'co_occurrence', 0, 'Shared: layer', '{"shared_entities":["layer"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'xrp-outruns-bitcoin-ether-after-investo-2026-02-15', 'co_occurrence', 0, 'Shared: bitcoin', '{"shared_entities":["bitcoin"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'okx-snags-european-payments-license-for-2026-02-16', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'russias-daily-crypto-turnover-is-over-2026-02-16', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'binances-cz-echoes-consensus-panelists-2026-02-16', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'hong-kong-is-trying-to-build-up-its-cryp-2026-02-15', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'wall-street-remains-bullish-on-bitcoin-w-2026-02-15', 'co_occurrence', 0, 'Shared: bitcoin', '{"shared_entities":["bitcoin"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'strategy-says-it-can-survive-even-if-bit-2026-02-16', 'co_occurrence', 0, 'Shared: bitcoin', '{"shared_entities":["bitcoin"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'crypto-market-drowns-in-red-as-bitcoin-f-2026-02-16', 'co_occurrence', 0, 'Shared: bitcoin, crypto', '{"shared_entities":["bitcoin","crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'wall-street-giant-apollo-deepens-crypto-2026-02-15', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'metaplanet-operating-profit-to-rise-81-2026-02-16', 'co_occurrence', 0, 'Shared: bitcoin, crypto', '{"shared_entities":["bitcoin","crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'ether-steadies-after-540-million-sell-w-2026-02-16', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'trump-linked-truth-social-seeks-sec-appr-2026-02-13', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'bitcoin-claws-back-to-70-000-on-cooling-2026-02-14', 'co_occurrence', 0, 'Shared: bitcoin', '{"shared_entities":["bitcoin"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'galaxy-s-steve-kurz-sees-great-converge-2026-02-14', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'comp-key', 'co_occurrence', 0, 'Shared: bitcoin, crypto', '{"shared_entities":["bitcoin","crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'crypto-group-counters-wall-street-banker-2026-02-13', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'hive-riot-earnings-reports-fed-rate-de-2026-02-16', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'crypto-investors-who-don-x2019-t-fill-o-2026-02-15', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'u-s-based-defi-group-urges-uk-fca-to-an-2026-02-13', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', 'elon-musks-x-to-launch-crypto-and-stock-2026-02-14', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('blackrocks-digital-assets-head-leverag-2026-02-15', '2-predictions-for-crypto-treasury-firms-2026-02-15', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'thousands-of-western-nationals-fought-is-2026-02-15', 'co_occurrence', 0, 'Shared: israel, gaza, palestinian', '{"shared_entities":["israel","gaza","palestinian","israeli"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'gaza-mother-s-grim-ordeal-a-search-for-2026-02-15', 'co_occurrence', 0, 'Shared: israel, gaza', '{"shared_entities":["israel","gaza"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'gaza-author-and-analyst-jehad-abusalim-o-2026-02-15', 'co_occurrence', 0, 'Shared: gaza', '{"shared_entities":["gaza"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'israel-approves-proposal-to-register-wes-2026-02-15', 'co_occurrence', 0, 'Shared: israel', '{"shared_entities":["israel"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'at-least-11-palestinians-killed-in-israe-2026-02-15', 'co_occurrence', 0, 'Shared: israel, gaza, palestinian', '{"shared_entities":["israel","gaza","palestinian","israeli"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'rights-groups-condemn-israeli-plan-for-2026-02-16', 'co_occurrence', 0, 'Shared: israel, palestinian, israeli', '{"shared_entities":["israel","palestinian","israeli"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', '15-day-old-baby-loses-father-in-israeli-2026-02-16', 'co_occurrence', 0, 'Shared: israel, gaza, israeli', '{"shared_entities":["israel","gaza","israeli"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'indonesia-s-gaza-gamble-2026-02-16', 'co_occurrence', 0, 'Shared: gaza', '{"shared_entities":["gaza"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'iran-must-abandon-enriched-uranium-and-n-2026-02-16', 'co_occurrence', 0, 'Shared: israel', '{"shared_entities":["israel"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'gaza-s-nasser-hospital-slams-msf-s-unsu-2026-02-15', 'co_occurrence', 0, 'Shared: gaza', '{"shared_entities":["gaza"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'rats-run-over-our-faces-gaza-s-displa-2026-02-16', 'co_occurrence', 0, 'Shared: gaza, palestinian', '{"shared_entities":["gaza","palestinian"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'dangerous-escalation-nations-condemn-2026-02-16', 'co_occurrence', 0, 'Shared: israel', '{"shared_entities":["israel"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'kyrie-irving-wears-press-shirt-for-gaza-2026-02-16', 'co_occurrence', 0, 'Shared: israel, gaza, israeli', '{"shared_entities":["israel","gaza","israeli"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'israel-s-move-to-register-land-systemat-2026-02-16', 'co_occurrence', 0, 'Shared: israel, palestinian', '{"shared_entities":["israel","palestinian"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'the-palestinian-cause-cannot-speak-only-2026-02-15', 'co_occurrence', 0, 'Shared: palestinian', '{"shared_entities":["palestinian"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'israeli-police-clash-with-ultra-orthodox-2026-02-16', 'co_occurrence', 0, 'Shared: israel, israeli', '{"shared_entities":["israel","israeli"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'female-israeli-soldiers-rescued-after-be-2026-02-16', 'co_occurrence', 0, 'Shared: israel', '{"shared_entities":["israel"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'europe-s-growing-fight-over-israeli-good-2026-02-16', 'co_occurrence', 0, 'Shared: israel, israeli', '{"shared_entities":["israel","israeli"],"source":"connect_job"}'::jsonb),
    ('eleven-killed-in-israeli-strikes-on-gaza-2026-02-15', 'netanyahu-calls-for-dismantling-iran-s-n-2026-02-16', 'co_occurrence', 0, 'Shared: israel, israeli', '{"shared_entities":["israel","israeli"],"source":"connect_job"}'::jsonb),
    ('ukraines-ex-energy-minister-detained-wh-2026-02-15', 'welsh-munitions-factory-seen-as-crucial-2026-02-15', 'co_occurrence', 0, 'Shared: ukraine', '{"shared_entities":["ukraine"],"source":"connect_job"}'::jsonb),
    ('ukraines-ex-energy-minister-detained-wh-2026-02-15', 'ukraine-s-ex-energy-minister-arrested-wh-2026-02-15', 'co_occurrence', 0, 'Shared: ukraine', '{"shared_entities":["ukraine"],"source":"connect_job"}'::jsonb),
    ('ukraines-ex-energy-minister-detained-wh-2026-02-15', 'ukraine-team-heads-for-geneva-talks-as-m-2026-02-16', 'co_occurrence', 0, 'Shared: ukraine', '{"shared_entities":["ukraine"],"source":"connect_job"}'::jsonb),
    ('ukraines-ex-energy-minister-detained-wh-2026-02-15', 'north-korea-opens-new-housing-area-for-f-2026-02-16', 'co_occurrence', 0, 'Shared: ukraine', '{"shared_entities":["ukraine"],"source":"connect_job"}'::jsonb),
    ('ukraines-ex-energy-minister-detained-wh-2026-02-15', 'nigeria-warns-against-enlisting-abroad-2026-02-16', 'co_occurrence', 0, 'Shared: ukraine', '{"shared_entities":["ukraine"],"source":"connect_job"}'::jsonb),
    ('ukraines-ex-energy-minister-detained-wh-2026-02-15', 'russia-ukraine-war-list-of-key-events-2026-02-16', 'co_occurrence', 0, 'Shared: ukraine', '{"shared_entities":["ukraine"],"source":"connect_job"}'::jsonb),
    ('ukraines-ex-energy-minister-detained-wh-2026-02-15', 'ebo-taylor-ghanaian-highlife-pioneer-an-2026-02-09', 'co_occurrence', 0, 'Shared: his', '{"shared_entities":["his"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'blackrocks-digital-assets-head-leverag-2026-02-15', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'russias-daily-crypto-turnover-is-over-2026-02-16', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'binances-cz-echoes-consensus-panelists-2026-02-16', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'hong-kong-is-trying-to-build-up-its-cryp-2026-02-15', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'crypto-market-drowns-in-red-as-bitcoin-f-2026-02-16', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'u-s-natural-gas-prices-continue-to-slid-2026-02-16', 'co_occurrence', 0, 'Shared: march', '{"shared_entities":["march"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'wall-street-giant-apollo-deepens-crypto-2026-02-15', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'metaplanet-operating-profit-to-rise-81-2026-02-16', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'ether-steadies-after-540-million-sell-w-2026-02-16', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'trump-linked-truth-social-seeks-sec-appr-2026-02-13', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'galaxy-s-steve-kurz-sees-great-converge-2026-02-14', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'comp-key', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'crypto-group-counters-wall-street-banker-2026-02-13', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'hive-riot-earnings-reports-fed-rate-de-2026-02-16', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'european-gas-prices-slide-as-mild-weathe-2026-02-16', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'crypto-investors-who-don-x2019-t-fill-o-2026-02-15', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'u-s-based-defi-group-urges-uk-fca-to-an-2026-02-13', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'rubio-says-us-and-europe-belong-togethe-2026-02-14', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'elon-musks-x-to-launch-crypto-and-stock-2026-02-14', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'russia-rejects-claims-of-poisoning-naval-2026-02-16', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', '2-predictions-for-crypto-treasury-firms-2026-02-15', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'the-seeds-of-the-dramatic-sell-off-in-ai-2026-02-16', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'truist-lifts-price-target-on-weyerhaeuse-2026-02-16', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'saudi-oil-exports-to-china-set-to-soar-a-2026-02-16', 'co_occurrence', 0, 'Shared: march', '{"shared_entities":["march"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'marco-rubio-wants-to-build-a-new-wester-2026-02-16', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'optima-health-helium-one-buccaneer-ene-2026-02-16', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'the-great-rotation-why-this-fund-manage-2026-02-16', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'europe-s-growing-fight-over-israeli-good-2026-02-16', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'trumps-new-world-order-has-become-real-2026-02-16', 'co_occurrence', 0, 'Shared: eu, european', '{"shared_entities":["eu","european"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'graphic-europes-earnings-gain-pace-whi-2026-02-16', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'us-not-disputing-european-assessment-o-2026-02-15', 'co_occurrence', 0, 'Shared: eu, european', '{"shared_entities":["eu","european"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'rolls-royce-is-leading-europe-039-s-sma-2026-02-15', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'iran-s-araghchi-slams-european-powers-fo-2026-02-15', 'co_occurrence', 0, 'Shared: eu, european', '{"shared_entities":["eu","european"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'filmmaker-explains-why-he-backs-francesc-2026-02-15', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'europeans-say-russia-poisoned-dissident-2026-02-15', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'argentina-s-shale-boom-is-rewriting-sout-2026-02-15', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'nothing-says-love-like-chemicals-vale-2026-02-14', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('okx-snags-european-payments-license-for-2026-02-16', 'heathrow-not-crowded-but-people-walk-in-2026-02-13', 'co_occurrence', 0, 'Shared: eu', '{"shared_entities":["eu"],"source":"connect_job"}'::jsonb),
    ('russias-daily-crypto-turnover-is-over-2026-02-16', 'blackrocks-digital-assets-head-leverag-2026-02-15', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('russias-daily-crypto-turnover-is-over-2026-02-16', 'okx-snags-european-payments-license-for-2026-02-16', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('russias-daily-crypto-turnover-is-over-2026-02-16', 'binances-cz-echoes-consensus-panelists-2026-02-16', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb),
    ('russias-daily-crypto-turnover-is-over-2026-02-16', 'hong-kong-is-trying-to-build-up-its-cryp-2026-02-15', 'co_occurrence', 0, 'Shared: crypto', '{"shared_entities":["crypto"],"source":"connect_job"}'::jsonb)
    ON CONFLICT DO NOTHING
  `);
  console.log('    Relations: 100');

  console.log('  \u2713 relations-2026-02-16-hour-15: 0 entities, 100 relations, 0 sources');
};
