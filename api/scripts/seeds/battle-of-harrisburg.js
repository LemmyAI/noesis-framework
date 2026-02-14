/**
 * Seed: Battle of Harrisburg (Tupelo) — American Civil War, July 1864
 * Namespace: history.civil-war
 * A historical military narrative: Union forces under A.J. Smith protect
 * Sherman's supply lines by engaging Forrest's cavalry in north Mississippi
 */
module.exports = async function seed(client) {
  console.log('  Seeding: Battle of Harrisburg...');

  // === NAMESPACE ===
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('history', 'default', '{
      "added_types": ["Battle", "Campaign", "Army", "Military Unit"],
      "type_hierarchy": {
        "Battle": {"parent": "Event"},
        "Campaign": {"parent": "Event"},
        "Army": {"parent": "Organization"},
        "Military Unit": {"parent": "Organization"}
      },
      "colors": {
        "types": {
          "Battle": "#C62828",
          "Campaign": "#E65100",
          "Army": "#1565C0",
          "Military Unit": "#4527A0"
        }
      }
    }'::jsonb),
    ('history.civil-war', 'history', '{
      "added_types": ["Theater"],
      "type_hierarchy": {
        "Theater": {"parent": "Concept"}
      },
      "colors": {
        "types": {
          "Theater": "#37474F"
        }
      }
    }'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES

    -- === THE BATTLE ===
    ('battle-harrisburg', 'history.civil-war', 'Battle', 'Battle of Harrisburg (Tupelo)', 'BATTLE:TUPELO-1864',
      '{"category": "battles.civil-war", "also_known_as": "Battle of Tupelo", "location": "Near Tupelo, Mississippi", "coordinates": "34.2557°N, 88.7370°W", "result": "Union victory", "union_casualties": 602, "confederate_casualties": 1340}',
      '{"timestamp": "1864-07-14T00:00:00Z", "end_timestamp": "1864-07-15T23:59:59Z", "precision": "day"}',
      '{"confidence": "verified", "source_count": 4}'),

    -- === PEOPLE ===
    ('smith-aj', 'history.civil-war', 'Person', 'Maj. Gen. Andrew J. Smith', 'PERSON:AJ-SMITH',
      '{"category": "people.commanders", "rank": "Major General", "side": "Union", "role": "Commander, Right Wing, 16th Army Corps"}',
      '{"timestamp": "1815-04-28T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('forrest-nb', 'history.civil-war', 'Person', 'Maj. Gen. Nathan Bedford Forrest', 'PERSON:NB-FORREST',
      '{"category": "people.commanders", "rank": "Major General", "side": "Confederate", "role": "Commander, Forrest''s Cavalry Corps", "wounded_at_tupelo": true}',
      '{"timestamp": "1821-07-13T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('lee-sd', 'history.civil-war', 'Person', 'Lt. Gen. Stephen D. Lee', 'PERSON:SD-LEE',
      '{"category": "people.commanders", "rank": "Lieutenant General", "side": "Confederate", "role": "Overall Confederate commander at Tupelo"}',
      '{"timestamp": "1833-09-22T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('sherman-wt', 'history.civil-war', 'Person', 'Maj. Gen. William T. Sherman', 'PERSON:WT-SHERMAN',
      '{"category": "people.commanders", "rank": "Major General", "side": "Union", "role": "Commander, Military Division of the Mississippi"}',
      '{"timestamp": "1820-02-08T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('chalmers-jr', 'history.civil-war', 'Person', 'Brig. Gen. James R. Chalmers', 'PERSON:JR-CHALMERS',
      '{"category": "people.commanders", "rank": "Brigadier General", "side": "Confederate", "role": "Division commander under Forrest"}',
      '{"timestamp": "1831-01-11T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('buford-a', 'history.civil-war', 'Person', 'Brig. Gen. Abraham Buford', 'PERSON:A-BUFORD',
      '{"category": "people.commanders", "rank": "Brigadier General", "side": "Confederate", "role": "Division commander under Forrest"}',
      '{"timestamp": "1820-01-18T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('grierson-bh', 'history.civil-war', 'Person', 'Brig. Gen. Benjamin H. Grierson', 'PERSON:BH-GRIERSON',
      '{"category": "people.commanders", "rank": "Brigadier General", "side": "Union", "role": "Commander, Cavalry Division"}',
      '{"timestamp": "1826-07-08T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    -- === MILITARY UNITS ===
    ('unit-16th-corps', 'history.civil-war', 'Military Unit', 'Right Wing, 16th Army Corps', 'UNIT:XVI-CORPS-RW',
      '{"category": "units.union", "side": "Union", "strength": "13,000 infantry, 3,000 cavalry, 24 guns", "type": "Army Corps"}',
      '{"timestamp": "1864-07-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('unit-forrests-cavalry', 'history.civil-war', 'Military Unit', 'Forrest''s Cavalry Corps', 'UNIT:FORREST-CAV',
      '{"category": "units.confederate", "side": "Confederate", "strength": "2,100 infantry, 7,000 cavalry, 20 guns", "type": "Cavalry Corps"}',
      '{"timestamp": "1864-07-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('unit-usct', 'history.civil-war', 'Military Unit', '1st Brigade, U.S. Colored Troops', 'UNIT:USCT-1BDE',
      '{"category": "units.union", "side": "Union", "commander": "Col. Edward Bouton", "type": "Infantry Brigade", "note": "Attached to Grierson''s Cavalry Division"}',
      '{"timestamp": "1864-07-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    -- === CAMPAIGNS & CONTEXT ===
    ('campaign-atlanta', 'history.civil-war', 'Campaign', 'Atlanta Campaign', 'CAMPAIGN:ATLANTA-1864',
      '{"category": "campaigns", "commander": "Maj. Gen. William T. Sherman", "dates": "May–September 1864", "objective": "Capture Atlanta, Georgia"}',
      '{"timestamp": "1864-05-01T00:00:00Z", "end_timestamp": "1864-09-02T00:00:00Z", "precision": "month"}',
      '{"confidence": "verified"}'),

    ('battle-brices', 'history.civil-war', 'Battle', 'Battle of Brice''s Crossroads', 'BATTLE:BRICES-1864',
      '{"category": "battles.civil-war", "result": "Confederate victory", "date": "June 10, 1864", "note": "Forrest''s victory forced Union to send a stronger force — leading to Tupelo"}',
      '{"timestamp": "1864-06-10T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('railroad-supply', 'history.civil-war', 'Fact', 'Sherman''s Single-Track Railroad Supply Line', 'FACT:SHERMAN-RAILROAD',
      '{"category": "logistics", "description": "Sherman''s entire army in Georgia depended on a single-track railroad running through Tennessee for supplies. Cutting this line would doom the Atlanta Campaign."}',
      '{"timestamp": "1864-05-01T00:00:00Z", "precision": "month"}',
      '{"confidence": "verified"}'),

    ('theater-west', 'history.civil-war', 'Theater', 'Western Theater', 'THEATER:WESTERN',
      '{"category": "theaters", "description": "Military operations between the Appalachians and the Mississippi River"}',
      '{"timestamp": "1861-01-01T00:00:00Z", "precision": "year"}',
      '{"confidence": "verified"}'),

    -- === KEY EVENTS OF THE BATTLE ===
    ('event-advance-july5', 'history.civil-war', 'Event', 'Smith Advances from La Grange', NULL,
      '{"category": "events.battle", "description": "Smith''s 16,000 troops march south from La Grange, Tennessee, into north Mississippi in two columns"}',
      '{"timestamp": "1864-07-05T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('event-running-fight', 'history.civil-war', 'Event', 'Running Fight to Tupelo', NULL,
      '{"category": "events.battle", "description": "10-mile running fight as Smith''s columns turn toward Tupelo. Chalmers attacks the wagon train, captures and burns 7 wagons, but is driven back by superior numbers."}',
      '{"timestamp": "1864-07-12T00:00:00Z", "precision": "day"}',
      '{"confidence": "high"}'),

    ('event-entrenchment', 'history.civil-war', 'Event', 'Smith Entrenches at Harrisburg', NULL,
      '{"category": "events.battle", "description": "Morning of July 14: Smith takes a strong defensive position at Harrisburg and entrenches. Lee forms assault lines with dismounted cavalry."}',
      '{"timestamp": "1864-07-14T06:00:00Z", "precision": "hour"}',
      '{"confidence": "verified"}'),

    ('event-confederate-assault', 'history.civil-war', 'Event', 'Confederate Frontal Assaults Repulsed', NULL,
      '{"category": "events.battle", "description": "Lee orders frontal assaults: Lyon''s Brigade attacks first and is thrown back with heavy losses. Mabry, Bell, then Rucker''s Brigade all make futile assaults against entrenched Union positions. Men collapse from heat exhaustion under the July sun."}',
      '{"timestamp": "1864-07-14T10:00:00Z", "precision": "hour"}',
      '{"confidence": "verified", "source_count": 3}'),

    ('event-forrest-wounded', 'history.civil-war', 'Event', 'Forrest Wounded at Old Town Creek', NULL,
      '{"category": "events.battle", "description": "July 15: During pursuit of Smith''s retreat, Forrest is severely wounded at Old Town Creek. Command devolves to Chalmers. Pursuit continues with only light skirmishing."}',
      '{"timestamp": "1864-07-15T12:00:00Z", "precision": "hour"}',
      '{"confidence": "verified"}'),

    ('event-smith-retreats', 'history.civil-war', 'Event', 'Smith Retreats to Memphis', NULL,
      '{"category": "events.battle", "description": "July 15: Smith begins withdrawal. Sherman is irritated that Smith did not press the advantage and destroy Forrest''s force entirely."}',
      '{"timestamp": "1864-07-15T08:00:00Z", "precision": "hour"}',
      '{"confidence": "verified"}'),

    -- === OUTCOMES & CLAIMS ===
    ('fact-forrest-broken', 'history.civil-war', 'Fact', 'Forrest''s Cavalry Combat Effectiveness Broken', NULL,
      '{"category": "outcomes", "description": "Though Forrest would rally for more raids, his cavalry never again had the strength to fight and defeat infantry in open battle."}',
      '{"timestamp": "1864-07-15T00:00:00Z", "precision": "day"}',
      '{"confidence": "high"}'),

    ('fact-supply-line-safe', 'history.civil-war', 'Fact', 'Sherman''s Supply Line Secured', NULL,
      '{"category": "outcomes", "description": "The Union victory ensured Forrest could not raid into middle Tennessee and cut the single-track railroad supplying Sherman''s army at Atlanta."}',
      '{"timestamp": "1864-07-15T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('claim-lee-command', 'history.civil-war', 'Claim', 'Lee''s Assumption of Command Undermined Forrest', NULL,
      '{"category": "claims.historical", "description": "Lt. Gen. S.D. Lee assumed overall command despite Forrest''s deep resentment. Some historians argue Lee''s rigid frontal assault tactics wasted Forrest''s cavalry superiority and cost the Confederacy the battle."}',
      '{"timestamp": "1864-07-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "medium", "note": "Debated among historians"}'),

    ('decision-frontal-assault', 'history.civil-war', 'Decision', 'Lee Orders Frontal Assaults', NULL,
      '{"category": "decisions.military", "description": "Lee chose to dismount cavalry and assault entrenched infantry — the opposite of Forrest''s preferred mobile tactics. The decision led to 1,340 Confederate casualties vs 602 Union."}',
      '{"timestamp": "1864-07-14T09:00:00Z", "precision": "hour"}',
      '{"confidence": "verified"}')
  `);

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES

    -- === Narrative: "Battle of Harrisburg" ===
    ('railroad-supply', 'campaign-atlanta', 'enables', 1, 'Battle of Harrisburg',
      '{"description": "Sherman''s entire army depends on a single-track railroad through Tennessee for supplies"}'),
    ('battle-brices', 'event-advance-july5', 'causes', 2, 'Battle of Harrisburg',
      '{"description": "Forrest''s victory at Brice''s Crossroads forces Sherman to send a larger, stronger force under A.J. Smith"}'),
    ('event-advance-july5', 'event-running-fight', 'causes', 3, 'Battle of Harrisburg',
      '{"description": "Smith''s two columns advance south and are harassed by Confederate cavalry for 10 miles toward Tupelo"}'),
    ('event-running-fight', 'event-entrenchment', 'causes', 4, 'Battle of Harrisburg',
      '{"description": "Both columns converge on Harrisburg where Smith takes a strong defensive position and digs in"}'),
    ('decision-frontal-assault', 'event-confederate-assault', 'causes', 5, 'Battle of Harrisburg',
      '{"description": "Lee orders dismounted cavalry to make frontal assaults against entrenched Union infantry — a fatal tactical error"}'),
    ('event-confederate-assault', 'event-smith-retreats', 'causes', 6, 'Battle of Harrisburg',
      '{"description": "After repulsing all attacks, Smith begins withdrawal on July 15 rather than pressing the defeated Confederates"}'),
    ('event-smith-retreats', 'event-forrest-wounded', 'causes', 7, 'Battle of Harrisburg',
      '{"description": "During pursuit at Old Town Creek, Forrest is severely wounded — ending effective Confederate pursuit"}'),
    ('event-forrest-wounded', 'fact-forrest-broken', 'causes', 8, 'Battle of Harrisburg',
      '{"description": "Forrest''s wounding and his corps'' heavy losses break their ability to fight infantry in open battle"}'),
    ('fact-forrest-broken', 'fact-supply-line-safe', 'causes', 9, 'Battle of Harrisburg',
      '{"description": "With Forrest neutralized, Sherman''s railroad supply line is safe — the Atlanta Campaign can continue"}'),
    ('fact-supply-line-safe', 'campaign-atlanta', 'enables', 10, 'Battle of Harrisburg',
      '{"description": "Secured supply lines enable Sherman to complete the capture of Atlanta in September 1864"}'),

    -- === Structural ===
    ('battle-harrisburg', 'campaign-atlanta', 'part_of', 0, NULL,
      '{"description": "The battle was fought specifically to protect Sherman''s Atlanta Campaign supply lines"}'),
    ('battle-harrisburg', 'theater-west', 'part_of', 0, NULL,
      '{"description": "Fought in the Western Theater, north Mississippi"}'),
    ('battle-brices', 'theater-west', 'part_of', 0, NULL, '{}'),

    -- Command relationships
    ('smith-aj', 'unit-16th-corps', 'part_of', 0, NULL,
      '{"description": "Smith commanded the Right Wing, 16th Army Corps"}'),
    ('grierson-bh', 'unit-16th-corps', 'part_of', 0, NULL,
      '{"description": "Grierson''s Cavalry Division was part of Smith''s force"}'),
    ('unit-usct', 'unit-16th-corps', 'part_of', 0, NULL,
      '{"description": "1st Brigade USCT attached to Grierson''s cavalry division"}'),
    ('forrest-nb', 'unit-forrests-cavalry', 'part_of', 0, NULL,
      '{"description": "Forrest commanded his cavalry corps"}'),
    ('lee-sd', 'unit-forrests-cavalry', 'part_of', 0, NULL,
      '{"description": "Lee assumed overall command above Forrest — to Forrest''s resentment"}'),
    ('chalmers-jr', 'unit-forrests-cavalry', 'part_of', 0, NULL, '{}'),
    ('buford-a', 'unit-forrests-cavalry', 'part_of', 0, NULL, '{}'),

    -- Causal / analytical
    ('claim-lee-command', 'decision-frontal-assault', 'supports', 0, NULL,
      '{"description": "Lee''s assumption of command led directly to the rigid frontal assault decision"}'),
    ('decision-frontal-assault', 'event-confederate-assault', 'causes', 0, NULL,
      '{"description": "The decision to assault entrenched positions caused massive Confederate casualties"}'),
    ('claim-lee-command', 'fact-forrest-broken', 'causes', 0, NULL,
      '{"description": "Historians argue Lee''s command style contributed to Forrest''s cavalry being broken"}'),
    ('event-confederate-assault', 'fact-forrest-broken', 'causes', 0, NULL,
      '{"description": "1,340 Confederate casualties vs 602 Union — Forrest''s corps lost fighting ability"}'),

    -- Sherman context
    ('sherman-wt', 'campaign-atlanta', 'part_of', 0, NULL,
      '{"description": "Sherman was the overall commander of the Atlanta Campaign"}'),
    ('sherman-wt', 'event-advance-july5', 'causes', 0, NULL,
      '{"description": "Sherman ordered Smith''s expedition to neutralize Forrest and protect the railroad"}')
  `);

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('battle-harrisburg', 'encyclopedia', 'Battle of Tupelo — Wikipedia', 'https://en.wikipedia.org/wiki/Battle_of_Tupelo',
      'The Battle of Tupelo, also known as the Battle of Harrisburg, was fought July 14–15, 1864, near Tupelo, Mississippi. The Union victory ensured the safety of Sherman''s supply lines during the Atlanta campaign.',
      'Wikipedia', NULL),
    ('battle-harrisburg', 'preservation', 'Tupelo Battlefield', 'https://www.battlefields.org/visit/battlefields/tupelo-battlefield',
      'The battlefield has been partially preserved and is home to the 1-acre Tupelo National Battlefield, established February 21, 1929. The American Battlefield Trust has preserved 12 acres as of mid-2023.',
      'American Battlefield Trust', '2023-06-01T00:00:00Z'),
    ('battle-harrisburg', 'primary_source', 'Confederate Military History, Vol. VII', 'https://archive.org/details/confederatemilit71evan',
      'Wheeler & Hooker (1899): The men were swept away by the fire of a superior and entrenched force, and many fell from exhaustion in the great heat of a July sun.',
      'Confederate Publishing Company', '1899-01-01T00:00:00Z'),
    ('claim-lee-command', 'secondary_source', 'Nathan Bedford Forrest in The Worst Military Leaders in History', NULL,
      'Jennings (2022): Lee assumed general command to Forrest''s deep resentment. Some argue Lee''s rigid tactics wasted the cavalry superiority that had won at Brice''s Crossroads.',
      'Reaktion Books', '2022-01-01T00:00:00Z')
  `);

  console.log('  ✓ Battle of Harrisburg: 25 entities, 26 relations, 4 sources');
};
