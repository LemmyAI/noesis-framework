/**
 * NOESIS Seed: NOESIS — The Framework Explained
 * Namespace: noesis
 * Built by seed-factory on 2026-02-15
 * NOESIS describing itself as a knowledge graph
 * Entities: 28 | Relations: 42 | Sources: 4
 * Narratives: How NOESIS Works
 */
module.exports = async function seed_noesis_system(client) {
  console.log('  \u2192 Seeding: noesis-system');

  // === NAMESPACE ===
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('noesis', 'default', '{"added_types":["Layer","Component","Principle","Feature"],"type_hierarchy":{"Layer":{"parent":"System"},"Component":{"parent":"System"},"Principle":{"parent":"Concept"},"Feature":{"parent":"Concept"}},"colors":{"types":{"Layer":"#7C4DFF","Component":"#00BFA5","Principle":"#FF6D00","Feature":"#2979FF"}}}'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('noesis-framework', 'noesis', 'System', 'NOESIS Framework', 'SYSTEM:NOESIS', '{"category":"system","version":"2.5","full_name":"Narrative Ontology for Evidence-based Systems Inferencing Structure","etymology":"Greek noesis — understanding, intellection"}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('layer-1', 'noesis', 'Layer', 'Layer 1: Core Ontology', 'LAYER:CORE', '{"category":"architecture.layers","layer_number":1,"purpose":"Configurable entity types and inference registry"}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('layer-2', 'noesis', 'Layer', 'Layer 2: Namespace', 'LAYER:NAMESPACE', '{"category":"architecture.layers","layer_number":2,"purpose":"Hierarchy, versioning, type extensions, cross-namespace identity"}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('layer-3', 'noesis', 'Layer', 'Layer 3: Temporal & Credibility', 'LAYER:TEMPORAL', '{"category":"architecture.layers","layer_number":3,"purpose":"Fuzzy chronology with variable precision, and confidence scoring"}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('layer-4', 'noesis', 'Layer', 'Layer 4: Datalayer', 'LAYER:DATA', '{"category":"architecture.layers","layer_number":4,"purpose":"Source documents, raw evidence, articles, reports backing entities"}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('layer-5', 'noesis', 'Layer', 'Layer 5: Presentation', 'LAYER:PRESENTATION', '{"category":"architecture.layers","layer_number":5,"purpose":"Logic-driven visuals, narrative sequencing, graph exploration"}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('comp-entity', 'noesis', 'Component', 'Entity', 'COMPONENT:ENTITY', '{"category":"components.core","description":"A typed node in the graph — an event, person, fact, claim, or any configurable type. Has an ID, belongs to a namespace, carries metadata, temporal data, and credibility."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('comp-relation', 'noesis', 'Component', 'Relation', 'COMPONENT:RELATION', '{"category":"components.core","description":"A directed, typed edge between entities. Carries narrative_sequence for story ordering and context for grouping into narratives. Each type has defined inference properties."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('comp-namespace', 'noesis', 'Component', 'Namespace', 'COMPONENT:NAMESPACE', '{"category":"components.core","description":"A scoped domain that extends a parent namespace. Adds new entity types, relation types, and colors. The default namespace is pure schema — all data lives in child namespaces."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('comp-key', 'noesis', 'Component', 'Key (Soft IDR)', 'COMPONENT:KEY', '{"category":"components.core","description":"An optional cross-namespace identity string. Entities sharing the same key represent the same real-world thing seen through different lenses. Example: CRYPTO:BTC links Bitcoin in finance and news."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('comp-temporal', 'noesis', 'Component', 'Temporal Data', 'COMPONENT:TEMPORAL', '{"category":"components.core","description":"Timestamp with variable precision: second, minute, hour, day, month, or year. Enables fuzzy chronology — Feb 2026 is as valid as a precise millisecond."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('comp-credibility', 'noesis', 'Component', 'Credibility', 'COMPONENT:CREDIBILITY', '{"category":"components.core","description":"Confidence level for an entity: verified, high, medium, low, or disputed. Plus source count. Enables trust-weighted reasoning."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('comp-datalayer', 'noesis', 'Component', 'Datalayer', 'COMPONENT:DATALAYER', '{"category":"components.core","description":"Raw source evidence: articles, reports, documents linked to entities. Each source has a URL, excerpt, publication date. The evidence trail behind every claim."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('comp-narrative', 'noesis', 'Component', 'Narrative Sequencing', 'COMPONENT:NARRATIVE', '{"category":"components.core","description":"Relations carry narrative_sequence and context fields to tell stories. A narrative is a named chain of sequenced relations that can be walked step-by-step or visualized as a graph."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('rel-causes', 'noesis', 'Feature', 'causes / caused_by', 'RELTYPE:CAUSES', '{"category":"relation_types","transitive":true,"traversable":true,"description":"A produces B. If A causes B and B causes C, then A causes C."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('rel-supports', 'noesis', 'Feature', 'supports / supported_by', 'RELTYPE:SUPPORTS', '{"category":"relation_types","transitive":false,"traversable":false,"description":"Evidence rule. A backs up B. Does not chain — support is direct only."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('rel-part-of', 'noesis', 'Feature', 'part_of / has_part', 'RELTYPE:PART_OF', '{"category":"relation_types","transitive":true,"traversable":true,"description":"Hierarchy rule. If X is part of Y, X inherits Y context. Transitive: part of part of = part of."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('rel-contradicts', 'noesis', 'Feature', 'contradicts', 'RELTYPE:CONTRADICTS', '{"category":"relation_types","transitive":false,"traversable":false,"description":"Symmetry rule. If A contradicts B, then B contradicts A. Does not chain."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('prin-narrative-first', 'noesis', 'Principle', 'Narrative First', 'PRINCIPLE:NARRATIVE-FIRST', '{"category":"principles","description":"NOESIS is built around stories, not just data points. Relations carry sequence and context to form walkable, visualizable narratives."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('prin-data-agnostic', 'noesis', 'Principle', 'Data Agnostic', 'PRINCIPLE:DATA-AGNOSTIC', '{"category":"principles","description":"The UI never hardcodes types, colors, or names. Everything is read from namespace configs at runtime. Any domain works: finance, medicine, history, engineering."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('prin-evidence-based', 'noesis', 'Principle', 'Evidence Based', 'PRINCIPLE:EVIDENCE-BASED', '{"category":"principles","description":"Every claim links to source documents via the datalayer. Credibility is explicit. Nothing is asserted without a trail back to evidence."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('prin-fuzzy-time', 'noesis', 'Principle', 'Fuzzy Chronology', 'PRINCIPLE:FUZZY-TIME', '{"category":"principles","description":"Not everything has a precise timestamp. Temporal precision ranges from second to year. February 2026 is a valid time as much as 2026-02-14T19:00:00Z."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('dec-read-only', 'noesis', 'Decision', 'API is Read-Only', 'DECISION:READ-ONLY', '{"category":"decisions.architecture","rationale":"Simpler, safer, no auth needed. Data managed via SQL scripts. Can add write endpoints later."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('dec-jsonb', 'noesis', 'Decision', 'PostgreSQL with JSONB', 'DECISION:JSONB', '{"category":"decisions.storage","rationale":"JSONB allows flexible querying of nested metadata. GIN indexes for performance. Native temporal types."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('dec-vanilla-js', 'noesis', 'Decision', 'Vanilla JS Explorer (Zero Dependencies)', 'DECISION:VANILLA-JS', '{"category":"decisions.frontend","rationale":"Read-only explorer needs no framework. 49KB total. Fast, small, no build step, no CDN dependency."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('dec-soft-idr', 'noesis', 'Decision', 'Soft IDR via Key Field', 'DECISION:SOFT-IDR', '{"category":"decisions.architecture","rationale":"Simple cross-namespace identity without a separate table. Same key = same real-world thing. Optional field. Full IDR layer planned for future."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('goal-understanding', 'noesis', 'Goal', 'Enable Direct Understanding', 'GOAL:UNDERSTANDING', '{"category":"goals","description":"From Aristotle: noesis is the highest form of knowledge — direct understanding. Not data collection, but synthesis of evidence into coherent narrative."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb),
    ('goal-interop', 'noesis', 'Goal', 'Cross-Domain Interoperability', 'GOAL:INTEROP', '{"category":"goals","description":"The same framework works for news, finance, medicine, engineering. Namespaces scope domains, keys bridge them, the ontology is configurable."}'::jsonb, '{"timestamp":"2026-02-14T00:00:00Z","precision":"day"}'::jsonb, '{"confidence":"verified"}'::jsonb)
    ON CONFLICT (id, version_number) DO NOTHING
  `);
  console.log('    Entities: 28');

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('layer-1', 'noesis-framework', 'part_of', 0, NULL, '{}'::jsonb),
    ('layer-2', 'noesis-framework', 'part_of', 0, NULL, '{}'::jsonb),
    ('layer-3', 'noesis-framework', 'part_of', 0, NULL, '{}'::jsonb),
    ('layer-4', 'noesis-framework', 'part_of', 0, NULL, '{}'::jsonb),
    ('layer-5', 'noesis-framework', 'part_of', 0, NULL, '{}'::jsonb),
    ('comp-entity', 'layer-1', 'part_of', 0, NULL, '{}'::jsonb),
    ('comp-relation', 'layer-1', 'part_of', 0, NULL, '{}'::jsonb),
    ('rel-causes', 'layer-1', 'part_of', 0, NULL, '{}'::jsonb),
    ('rel-supports', 'layer-1', 'part_of', 0, NULL, '{}'::jsonb),
    ('rel-part-of', 'layer-1', 'part_of', 0, NULL, '{}'::jsonb),
    ('rel-contradicts', 'layer-1', 'part_of', 0, NULL, '{}'::jsonb),
    ('comp-namespace', 'layer-2', 'part_of', 0, NULL, '{}'::jsonb),
    ('comp-key', 'layer-2', 'part_of', 0, NULL, '{}'::jsonb),
    ('comp-temporal', 'layer-3', 'part_of', 0, NULL, '{}'::jsonb),
    ('comp-credibility', 'layer-3', 'part_of', 0, NULL, '{}'::jsonb),
    ('comp-datalayer', 'layer-4', 'part_of', 0, NULL, '{}'::jsonb),
    ('comp-narrative', 'layer-5', 'part_of', 0, NULL, '{}'::jsonb),
    ('prin-narrative-first', 'goal-understanding', 'enables', 0, NULL, '{"description":"Stories create understanding — not just data browsing but narrative comprehension"}'::jsonb),
    ('prin-data-agnostic', 'goal-interop', 'enables', 0, NULL, '{"description":"Domain-agnostic design means any field can plug in"}'::jsonb),
    ('prin-evidence-based', 'goal-understanding', 'enables', 0, NULL, '{"description":"Evidence trails build trust and enable verification"}'::jsonb),
    ('prin-fuzzy-time', 'comp-temporal', 'enables', 0, NULL, '{"description":"The fuzzy chronology principle drives the temporal precision feature"}'::jsonb),
    ('dec-read-only', 'noesis-framework', 'supports', 0, NULL, '{"description":"Read-only API keeps the system simple and safe"}'::jsonb),
    ('dec-jsonb', 'comp-entity', 'enables', 0, NULL, '{"description":"JSONB enables flexible metadata without schema migrations"}'::jsonb),
    ('dec-vanilla-js', 'layer-5', 'supports', 0, NULL, '{"description":"Zero-dependency frontend keeps the explorer fast and portable"}'::jsonb),
    ('dec-soft-idr', 'comp-key', 'enables', 0, NULL, '{"description":"Soft IDR via key field chosen over complex identity resolution layer"}'::jsonb),
    ('layer-2', 'layer-1', 'depends_on', 0, NULL, '{"description":"Namespaces extend and inherit from the core ontology"}'::jsonb),
    ('layer-3', 'layer-1', 'depends_on', 0, NULL, '{"description":"Temporal and credibility apply to core entity types"}'::jsonb),
    ('layer-4', 'layer-1', 'depends_on', 0, NULL, '{"description":"Sources are linked to entities defined in the core"}'::jsonb),
    ('layer-5', 'layer-4', 'depends_on', 0, NULL, '{"description":"Presentation reads from all lower layers"}'::jsonb),
    ('layer-5', 'layer-3', 'depends_on', 0, NULL, '{"description":"Timelines use temporal data, UI shows credibility"}'::jsonb),
    ('layer-5', 'layer-2', 'depends_on', 0, NULL, '{"description":"UI reads namespace configs for types and colors"}'::jsonb),
    ('prin-narrative-first', 'noesis-framework', 'enables', 1, 'How NOESIS Works', '{"description":"The narrative-first principle shapes the entire architecture — stories are first-class citizens"}'::jsonb),
    ('noesis-framework', 'layer-1', 'enables', 2, 'How NOESIS Works', '{"description":"The framework defines 5 layers, starting with the Core Ontology — configurable types and inference rules"}'::jsonb),
    ('layer-1', 'comp-entity', 'enables', 3, 'How NOESIS Works', '{"description":"The core ontology defines entity types: Event, Fact, Claim, Person, etc. — extensible per namespace"}'::jsonb),
    ('layer-1', 'comp-relation', 'enables', 4, 'How NOESIS Works', '{"description":"Relations are typed edges with inference properties: transitive, traversable, with defined inverses"}'::jsonb),
    ('layer-2', 'comp-namespace', 'enables', 5, 'How NOESIS Works', '{"description":"Namespaces scope domains and inherit from parents. The default namespace is pure schema — no data"}'::jsonb),
    ('comp-namespace', 'comp-key', 'enables', 6, 'How NOESIS Works', '{"description":"The key field bridges namespaces: same key = same real-world thing seen through different lenses"}'::jsonb),
    ('layer-3', 'comp-temporal', 'enables', 7, 'How NOESIS Works', '{"description":"Layer 3 adds fuzzy chronology — timestamps with precision from second to year"}'::jsonb),
    ('layer-3', 'comp-credibility', 'enables', 8, 'How NOESIS Works', '{"description":"Credibility scoring: verified, high, medium, low, disputed — explicit trust in data"}'::jsonb),
    ('layer-4', 'comp-datalayer', 'enables', 9, 'How NOESIS Works', '{"description":"The datalayer stores raw evidence: articles, reports, documents that back up entities"}'::jsonb),
    ('comp-relation', 'comp-narrative', 'enables', 10, 'How NOESIS Works', '{"description":"Relations carry narrative_sequence and context — multiple stories can coexist independently"}'::jsonb),
    ('comp-narrative', 'layer-5', 'enables', 11, 'How NOESIS Works', '{"description":"Layer 5 renders narratives as interactive graphs, step-by-step stories, and explorable knowledge maps"}'::jsonb)
    ON CONFLICT DO NOTHING
  `);
  console.log('    Relations: 42');

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('noesis-framework', 'specification', 'NOESIS Specification v2.5', 'https://github.com/LemmyAI/noesis-framework/blob/main/docs/SPEC.md', 'Narrative Ontology for Evidence-based Systems Inferencing Structure. A 5-layer architecture for structured knowledge representation with narrative sequencing, fuzzy chronology, and cross-namespace identity resolution.', 'NOESIS Docs', '2026-02-14T00:00:00Z'),
    ('noesis-framework', 'specification', 'NOESIS UI Specification', 'https://github.com/LemmyAI/noesis-framework/blob/main/docs/UI-SPEC.md', 'Mobile-first, data-agnostic SPA with SVG graph visualization, narrative player, and entity explorer. Vanilla JS, zero dependencies, 49KB total.', 'NOESIS Docs', '2026-02-14T00:00:00Z'),
    ('noesis-framework', 'specification', 'NOESIS Implementation Decisions', 'https://github.com/LemmyAI/noesis-framework/blob/main/docs/DECISIONS.md', 'Key architectural decisions: read-only API, PostgreSQL with JSONB, soft IDR via key field, namespace inheritance, narrative sequencing on relations.', 'NOESIS Docs', '2026-02-14T00:00:00Z'),
    ('goal-understanding', 'reference', 'Aristotle on Noesis', 'https://plato.stanford.edu/entries/aristotle-psychology/', 'In Aristotle''s philosophy, noesis refers to the highest form of intellectual activity — direct apprehension of intelligible truths, as opposed to mere sense perception or opinion.', 'Stanford Encyclopedia of Philosophy', NULL)
    ON CONFLICT DO NOTHING
  `);
  console.log('    Sources: 4');

  console.log('  \u2713 noesis-system: 28 entities, 42 relations, 4 sources');
};
