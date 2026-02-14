/**
 * Seed: NOESIS — The Framework Explained
 * Namespace: noesis
 * NOESIS describing itself as a knowledge graph — its architecture,
 * concepts, layers, and design decisions
 */
module.exports = async function seed(client) {
  console.log('  Seeding: NOESIS System...');

  // === NAMESPACE ===
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('noesis', 'default', '{
      "added_types": ["Layer", "Component", "Principle", "Feature"],
      "type_hierarchy": {
        "Layer": {"parent": "System"},
        "Component": {"parent": "System"},
        "Principle": {"parent": "Concept"},
        "Feature": {"parent": "Concept"}
      },
      "colors": {
        "types": {
          "Layer": "#7C4DFF",
          "Component": "#00BFA5",
          "Principle": "#FF6D00",
          "Feature": "#2979FF"
        }
      }
    }'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // === ENTITIES ===
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES

    -- === THE FRAMEWORK ===
    ('noesis-framework', 'noesis', 'System', 'NOESIS Framework', 'SYSTEM:NOESIS',
      '{"category": "system", "version": "2.5", "full_name": "Narrative Ontology for Evidence-based Systems Inferencing Structure", "etymology": "Greek νόησις — understanding, intellection"}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    -- === THE 5 LAYERS ===
    ('layer-1', 'noesis', 'Layer', 'Layer 1: Core Ontology', 'LAYER:CORE',
      '{"category": "architecture.layers", "layer_number": 1, "purpose": "Configurable entity types and inference registry"}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('layer-2', 'noesis', 'Layer', 'Layer 2: Namespace', 'LAYER:NAMESPACE',
      '{"category": "architecture.layers", "layer_number": 2, "purpose": "Hierarchy, versioning, type extensions, cross-namespace identity"}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('layer-3', 'noesis', 'Layer', 'Layer 3: Temporal & Credibility', 'LAYER:TEMPORAL',
      '{"category": "architecture.layers", "layer_number": 3, "purpose": "Fuzzy chronology with variable precision, and confidence scoring"}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('layer-4', 'noesis', 'Layer', 'Layer 4: Datalayer', 'LAYER:DATA',
      '{"category": "architecture.layers", "layer_number": 4, "purpose": "Source documents, raw evidence, articles, reports backing entities"}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('layer-5', 'noesis', 'Layer', 'Layer 5: Presentation', 'LAYER:PRESENTATION',
      '{"category": "architecture.layers", "layer_number": 5, "purpose": "Logic-driven visuals, narrative sequencing, graph exploration"}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    -- === CORE COMPONENTS ===
    ('comp-entity', 'noesis', 'Component', 'Entity', 'COMPONENT:ENTITY',
      '{"category": "components.core", "description": "A typed node in the graph — an event, person, fact, claim, or any configurable type. Has an ID, belongs to a namespace, carries metadata, temporal data, and credibility."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('comp-relation', 'noesis', 'Component', 'Relation', 'COMPONENT:RELATION',
      '{"category": "components.core", "description": "A directed, typed edge between entities. Carries narrative_sequence for story ordering and context for grouping into narratives. Each type has defined inference properties."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('comp-namespace', 'noesis', 'Component', 'Namespace', 'COMPONENT:NAMESPACE',
      '{"category": "components.core", "description": "A scoped domain that extends a parent namespace. Adds new entity types, relation types, and colors. The default namespace is pure schema — all data lives in child namespaces."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('comp-key', 'noesis', 'Component', 'Key (Soft IDR)', 'COMPONENT:KEY',
      '{"category": "components.core", "description": "An optional cross-namespace identity string. Entities sharing the same key represent the same real-world thing seen through different lenses. Example: CRYPTO:BTC links Bitcoin in finance and news."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('comp-temporal', 'noesis', 'Component', 'Temporal Data', 'COMPONENT:TEMPORAL',
      '{"category": "components.core", "description": "Timestamp with variable precision: second, minute, hour, day, month, or year. Enables fuzzy chronology — Feb 2026 is as valid as a precise millisecond."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('comp-credibility', 'noesis', 'Component', 'Credibility', 'COMPONENT:CREDIBILITY',
      '{"category": "components.core", "description": "Confidence level for an entity: verified, high, medium, low, or disputed. Plus source count. Enables trust-weighted reasoning."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('comp-datalayer', 'noesis', 'Component', 'Datalayer', 'COMPONENT:DATALAYER',
      '{"category": "components.core", "description": "Raw source evidence: articles, reports, documents linked to entities. Each source has a URL, excerpt, publication date. The evidence trail behind every claim."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('comp-narrative', 'noesis', 'Component', 'Narrative Sequencing', 'COMPONENT:NARRATIVE',
      '{"category": "components.core", "description": "Relations carry narrative_sequence and context fields to tell stories. A narrative is a named chain of sequenced relations that can be walked step-by-step or visualized as a graph."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    -- === RELATION TYPES ===
    ('rel-causes', 'noesis', 'Feature', 'causes / caused_by', 'RELTYPE:CAUSES',
      '{"category": "relation_types", "transitive": true, "traversable": true, "description": "A produces B. If A causes B and B causes C, then A causes C."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('rel-supports', 'noesis', 'Feature', 'supports / supported_by', 'RELTYPE:SUPPORTS',
      '{"category": "relation_types", "transitive": false, "traversable": false, "description": "Evidence rule. A backs up B. Does not chain — support is direct only."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('rel-part-of', 'noesis', 'Feature', 'part_of / has_part', 'RELTYPE:PART_OF',
      '{"category": "relation_types", "transitive": true, "traversable": true, "description": "Hierarchy rule. If X is part of Y, X inherits Y context. Transitive: part of part of = part of."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('rel-contradicts', 'noesis', 'Feature', 'contradicts', 'RELTYPE:CONTRADICTS',
      '{"category": "relation_types", "transitive": false, "traversable": false, "description": "Symmetry rule. If A contradicts B, then B contradicts A. Does not chain."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    -- === PRINCIPLES ===
    ('prin-narrative-first', 'noesis', 'Principle', 'Narrative First', 'PRINCIPLE:NARRATIVE-FIRST',
      '{"category": "principles", "description": "NOESIS is built around stories, not just data points. Relations carry sequence and context to form walkable, visualizable narratives."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('prin-data-agnostic', 'noesis', 'Principle', 'Data Agnostic', 'PRINCIPLE:DATA-AGNOSTIC',
      '{"category": "principles", "description": "The UI never hardcodes types, colors, or names. Everything is read from namespace configs at runtime. Any domain works: finance, medicine, history, engineering."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('prin-evidence-based', 'noesis', 'Principle', 'Evidence Based', 'PRINCIPLE:EVIDENCE-BASED',
      '{"category": "principles", "description": "Every claim links to source documents via the datalayer. Credibility is explicit. Nothing is asserted without a trail back to evidence."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('prin-fuzzy-time', 'noesis', 'Principle', 'Fuzzy Chronology', 'PRINCIPLE:FUZZY-TIME',
      '{"category": "principles", "description": "Not everything has a precise timestamp. Temporal precision ranges from second to year. February 2026 is a valid time as much as 2026-02-14T19:00:00Z."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    -- === DECISIONS ===
    ('dec-read-only', 'noesis', 'Decision', 'API is Read-Only', 'DECISION:READ-ONLY',
      '{"category": "decisions.architecture", "rationale": "Simpler, safer, no auth needed. Data managed via SQL scripts. Can add write endpoints later."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('dec-jsonb', 'noesis', 'Decision', 'PostgreSQL with JSONB', 'DECISION:JSONB',
      '{"category": "decisions.storage", "rationale": "JSONB allows flexible querying of nested metadata. GIN indexes for performance. Native temporal types."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('dec-vanilla-js', 'noesis', 'Decision', 'Vanilla JS Explorer (Zero Dependencies)', 'DECISION:VANILLA-JS',
      '{"category": "decisions.frontend", "rationale": "Read-only explorer needs no framework. 49KB total. Fast, small, no build step, no CDN dependency."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('dec-soft-idr', 'noesis', 'Decision', 'Soft IDR via Key Field', 'DECISION:SOFT-IDR',
      '{"category": "decisions.architecture", "rationale": "Simple cross-namespace identity without a separate table. Same key = same real-world thing. Optional field. Full IDR layer planned for future."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    -- === GOALS ===
    ('goal-understanding', 'noesis', 'Goal', 'Enable Direct Understanding', 'GOAL:UNDERSTANDING',
      '{"category": "goals", "description": "From Aristotle: noēsis is the highest form of knowledge — direct understanding. Not data collection, but synthesis of evidence into coherent narrative."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('goal-interop', 'noesis', 'Goal', 'Cross-Domain Interoperability', 'GOAL:INTEROP',
      '{"category": "goals", "description": "The same framework works for news, finance, medicine, engineering. Namespaces scope domains, keys bridge them, the ontology is configurable."}',
      '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}')
  `);

  // === RELATIONS ===
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES

    -- === Narrative: "How NOESIS Works" ===
    ('prin-narrative-first', 'noesis-framework', 'enables', 1, 'How NOESIS Works',
      '{"description": "The narrative-first principle shapes the entire architecture — stories are first-class citizens"}'),
    ('noesis-framework', 'layer-1', 'enables', 2, 'How NOESIS Works',
      '{"description": "The framework defines 5 layers, starting with the Core Ontology — configurable types and inference rules"}'),
    ('layer-1', 'comp-entity', 'enables', 3, 'How NOESIS Works',
      '{"description": "The core ontology defines entity types: Event, Fact, Claim, Person, etc. — extensible per namespace"}'),
    ('layer-1', 'comp-relation', 'enables', 4, 'How NOESIS Works',
      '{"description": "Relations are typed edges with inference properties: transitive, traversable, with defined inverses"}'),
    ('layer-2', 'comp-namespace', 'enables', 5, 'How NOESIS Works',
      '{"description": "Namespaces scope domains and inherit from parents. The default namespace is pure schema — no data"}'),
    ('comp-namespace', 'comp-key', 'enables', 6, 'How NOESIS Works',
      '{"description": "The key field bridges namespaces: same key = same real-world thing seen through different lenses"}'),
    ('layer-3', 'comp-temporal', 'enables', 7, 'How NOESIS Works',
      '{"description": "Layer 3 adds fuzzy chronology — timestamps with precision from second to year"}'),
    ('layer-3', 'comp-credibility', 'enables', 8, 'How NOESIS Works',
      '{"description": "Credibility scoring: verified, high, medium, low, disputed — explicit trust in data"}'),
    ('layer-4', 'comp-datalayer', 'enables', 9, 'How NOESIS Works',
      '{"description": "The datalayer stores raw evidence: articles, reports, documents that back up entities"}'),
    ('comp-relation', 'comp-narrative', 'enables', 10, 'How NOESIS Works',
      '{"description": "Relations carry narrative_sequence and context — multiple stories can coexist independently"}'),
    ('comp-narrative', 'layer-5', 'enables', 11, 'How NOESIS Works',
      '{"description": "Layer 5 renders narratives as interactive graphs, step-by-step stories, and explorable knowledge maps"}'),

    -- === Structural: Layers belong to framework ===
    ('layer-1', 'noesis-framework', 'part_of', 0, NULL, '{}'),
    ('layer-2', 'noesis-framework', 'part_of', 0, NULL, '{}'),
    ('layer-3', 'noesis-framework', 'part_of', 0, NULL, '{}'),
    ('layer-4', 'noesis-framework', 'part_of', 0, NULL, '{}'),
    ('layer-5', 'noesis-framework', 'part_of', 0, NULL, '{}'),

    -- Layer 1 contains
    ('comp-entity', 'layer-1', 'part_of', 0, NULL, '{}'),
    ('comp-relation', 'layer-1', 'part_of', 0, NULL, '{}'),
    ('rel-causes', 'layer-1', 'part_of', 0, NULL, '{}'),
    ('rel-supports', 'layer-1', 'part_of', 0, NULL, '{}'),
    ('rel-part-of', 'layer-1', 'part_of', 0, NULL, '{}'),
    ('rel-contradicts', 'layer-1', 'part_of', 0, NULL, '{}'),

    -- Layer 2 contains
    ('comp-namespace', 'layer-2', 'part_of', 0, NULL, '{}'),
    ('comp-key', 'layer-2', 'part_of', 0, NULL, '{}'),

    -- Layer 3 contains
    ('comp-temporal', 'layer-3', 'part_of', 0, NULL, '{}'),
    ('comp-credibility', 'layer-3', 'part_of', 0, NULL, '{}'),

    -- Layer 4 contains
    ('comp-datalayer', 'layer-4', 'part_of', 0, NULL, '{}'),

    -- Layer 5 contains
    ('comp-narrative', 'layer-5', 'part_of', 0, NULL, '{}'),

    -- Principles enable goals
    ('prin-narrative-first', 'goal-understanding', 'enables', 0, NULL,
      '{"description": "Stories create understanding — not just data browsing but narrative comprehension"}'),
    ('prin-data-agnostic', 'goal-interop', 'enables', 0, NULL,
      '{"description": "Domain-agnostic design means any field can plug in"}'),
    ('prin-evidence-based', 'goal-understanding', 'enables', 0, NULL,
      '{"description": "Evidence trails build trust and enable verification"}'),
    ('prin-fuzzy-time', 'comp-temporal', 'enables', 0, NULL,
      '{"description": "The fuzzy chronology principle drives the temporal precision feature"}'),

    -- Decisions support architecture
    ('dec-read-only', 'noesis-framework', 'supports', 0, NULL,
      '{"description": "Read-only API keeps the system simple and safe"}'),
    ('dec-jsonb', 'comp-entity', 'enables', 0, NULL,
      '{"description": "JSONB enables flexible metadata without schema migrations"}'),
    ('dec-vanilla-js', 'layer-5', 'supports', 0, NULL,
      '{"description": "Zero-dependency frontend keeps the explorer fast and portable"}'),
    ('dec-soft-idr', 'comp-key', 'enables', 0, NULL,
      '{"description": "Soft IDR via key field chosen over complex identity resolution layer"}'),

    -- Layer dependencies
    ('layer-2', 'layer-1', 'depends_on', 0, NULL, '{"description": "Namespaces extend and inherit from the core ontology"}'),
    ('layer-3', 'layer-1', 'depends_on', 0, NULL, '{"description": "Temporal and credibility apply to core entity types"}'),
    ('layer-4', 'layer-1', 'depends_on', 0, NULL, '{"description": "Sources are linked to entities defined in the core"}'),
    ('layer-5', 'layer-4', 'depends_on', 0, NULL, '{"description": "Presentation reads from all lower layers"}'),
    ('layer-5', 'layer-3', 'depends_on', 0, NULL, '{"description": "Timelines use temporal data, UI shows credibility"}'),
    ('layer-5', 'layer-2', 'depends_on', 0, NULL, '{"description": "UI reads namespace configs for types and colors"}')
  `);

  // === DATALAYER ===
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('noesis-framework', 'specification', 'NOESIS Specification v2.5', 'https://github.com/LemmyAI/noesis-framework/blob/main/docs/SPEC.md',
      'Narrative Ontology for Evidence-based Systems Inferencing Structure. A 5-layer architecture for structured knowledge representation with narrative sequencing, fuzzy chronology, and cross-namespace identity resolution.',
      'NOESIS Docs', '2026-02-14T00:00:00Z'),
    ('noesis-framework', 'specification', 'NOESIS UI Specification', 'https://github.com/LemmyAI/noesis-framework/blob/main/docs/UI-SPEC.md',
      'Mobile-first, data-agnostic SPA with SVG graph visualization, narrative player, and entity explorer. Vanilla JS, zero dependencies, 49KB total.',
      'NOESIS Docs', '2026-02-14T00:00:00Z'),
    ('noesis-framework', 'specification', 'NOESIS Implementation Decisions', 'https://github.com/LemmyAI/noesis-framework/blob/main/docs/DECISIONS.md',
      'Key architectural decisions: read-only API, PostgreSQL with JSONB, soft IDR via key field, namespace inheritance, narrative sequencing on relations.',
      'NOESIS Docs', '2026-02-14T00:00:00Z'),
    ('goal-understanding', 'reference', 'Aristotle on Noēsis', 'https://plato.stanford.edu/entries/aristotle-psychology/',
      'In Aristotle''s philosophy, noēsis (νόησις) refers to the highest form of intellectual activity — direct apprehension of intelligible truths, as opposed to mere sense perception or opinion.',
      'Stanford Encyclopedia of Philosophy', NULL)
  `);

  console.log('  ✓ NOESIS System: 27 entities, 42 relations, 4 sources');
};
