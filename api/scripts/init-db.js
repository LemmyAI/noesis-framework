const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://noesis:noesis@localhost:5432/noesis'
});

// Available seeds — add new ones here
const AVAILABLE_SEEDS = {
  'noesis-system': './seeds/noesis-system.js',
  'battle-of-harrisburg': './seeds/battle-of-harrisburg.js',
  'news-week7': './seeds/news-week7.js',
};

async function initDatabase() {
  const client = await pool.connect();

  try {
    console.log('=== NOESIS Database Init ===\n');

    // Determine which seeds to run
    const seedEnv = (process.env.SEEDS || 'all').trim().toLowerCase();
    let seedsToRun;
    if (seedEnv === 'all') {
      seedsToRun = Object.keys(AVAILABLE_SEEDS);
    } else if (seedEnv === 'none') {
      seedsToRun = [];
    } else {
      seedsToRun = seedEnv.split(',').map(s => s.trim()).filter(s => AVAILABLE_SEEDS[s]);
    }

    console.log(`Seeds to run: ${seedsToRun.length > 0 ? seedsToRun.join(', ') : '(none)'}\n`);

    // Drop and recreate for clean state
    await client.query(`
      DROP TABLE IF EXISTS datalayer CASCADE;
      DROP TABLE IF EXISTS relations CASCADE;
      DROP TABLE IF EXISTS entities CASCADE;
      DROP TABLE IF EXISTS namespace_configs CASCADE;
    `);
    console.log('1. Cleared existing tables.');

    // Create tables
    await client.query(`
      CREATE TABLE namespace_configs (
        namespace TEXT PRIMARY KEY,
        extends TEXT DEFAULT 'default',
        config JSONB DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE entities (
        id TEXT NOT NULL,
        version_number INTEGER DEFAULT 1,
        is_latest BOOLEAN DEFAULT TRUE,
        namespace TEXT NOT NULL,
        key TEXT,
        type TEXT NOT NULL,
        name TEXT NOT NULL,
        metadata JSONB DEFAULT '{}',
        temporal JSONB DEFAULT '{"precision": "second"}',
        credibility JSONB DEFAULT '{"confidence": "medium"}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        PRIMARY KEY (id, version_number)
      );
      CREATE TABLE relations (
        id SERIAL PRIMARY KEY,
        from_entity TEXT NOT NULL,
        to_entity TEXT NOT NULL,
        type TEXT NOT NULL,
        narrative_sequence INTEGER DEFAULT 0,
        context TEXT,
        bidirectional BOOLEAN DEFAULT FALSE,
        metadata JSONB DEFAULT '{}',
        temporal JSONB DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE datalayer (
        id SERIAL PRIMARY KEY,
        entity_id TEXT NOT NULL,
        source_type TEXT NOT NULL,
        title TEXT,
        url TEXT,
        excerpt TEXT,
        raw JSONB DEFAULT '{}',
        source_name TEXT,
        published_at TIMESTAMPTZ,
        fetched_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('2. Tables created.');

    // Create indexes
    await client.query(`
      CREATE INDEX idx_entities_key ON entities(key) WHERE key IS NOT NULL;
      CREATE INDEX idx_entities_namespace_type ON entities(namespace, type);
      CREATE INDEX idx_entities_namespace ON entities(namespace);
      CREATE INDEX idx_entities_is_latest ON entities(is_latest);
      CREATE INDEX idx_entities_metadata ON entities USING GIN (metadata);
      CREATE INDEX idx_entities_temporal ON entities USING GIN (temporal);
      CREATE INDEX idx_entities_category ON entities ((metadata->>'category'));
      CREATE INDEX idx_relations_from ON relations(from_entity);
      CREATE INDEX idx_relations_to ON relations(to_entity);
      CREATE INDEX idx_relations_type ON relations(type);
      CREATE INDEX idx_relations_narrative ON relations(context, narrative_sequence);
      CREATE INDEX idx_relations_context ON relations(context);
      CREATE INDEX idx_datalayer_entity ON datalayer(entity_id);
      CREATE INDEX idx_datalayer_url ON datalayer(url);
    `);
    console.log('3. Indexes created.');

    // Full-text search support
    await client.query(`
      ALTER TABLE entities ADD COLUMN search_vector tsvector;
      CREATE INDEX idx_entities_search ON entities USING GIN (search_vector);

      CREATE OR REPLACE FUNCTION entities_search_trigger() RETURNS trigger AS $$
      BEGIN
        NEW.search_vector :=
          setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
          setweight(to_tsvector('english', COALESCE(NEW.metadata->>'description', '')), 'B') ||
          setweight(to_tsvector('english', COALESCE(NEW.metadata->>'category', '')), 'C') ||
          setweight(to_tsvector('english', COALESCE(NEW.key, '')), 'C');
        RETURN NEW;
      END
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trg_entities_search
        BEFORE INSERT OR UPDATE ON entities
        FOR EACH ROW EXECUTE FUNCTION entities_search_trigger();

      ALTER TABLE datalayer ADD COLUMN search_vector tsvector;
      CREATE INDEX idx_datalayer_search ON datalayer USING GIN (search_vector);

      CREATE OR REPLACE FUNCTION datalayer_search_trigger() RETURNS trigger AS $$
      BEGIN
        NEW.search_vector :=
          setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
          setweight(to_tsvector('english', COALESCE(NEW.excerpt, '')), 'B') ||
          setweight(to_tsvector('english', COALESCE(NEW.source_name, '')), 'C');
        RETURN NEW;
      END
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trg_datalayer_search
        BEFORE INSERT OR UPDATE ON datalayer
        FOR EACH ROW EXECUTE FUNCTION datalayer_search_trigger();
    `);
    console.log('3b. Full-text search indexes created.');

    // Seed default namespace (always)
    await client.query(`
      INSERT INTO namespace_configs (namespace, extends, config) VALUES (
        'default', NULL, '{
          "core_types": ["Event", "Decision", "Fact", "Claim", "System", "Goal", "Concept", "Person", "Organization"],
          "type_hierarchy": {},
          "relations": {
            "causes": {"inverse": "caused_by", "transitive": true, "traversable": true},
            "enables": {"inverse": "enabled_by", "transitive": false, "traversable": true},
            "prevents": {"inverse": "prevented_by", "transitive": false, "traversable": true},
            "part_of": {"inverse": "has_part", "transitive": true, "traversable": true},
            "follows": {"inverse": "preceded_by", "transitive": false, "traversable": true},
            "depends_on": {"inverse": "required_for", "transitive": false, "traversable": true},
            "contradicts": {"inverse": "contradicts", "transitive": false, "traversable": false},
            "supports": {"inverse": "supported_by", "transitive": false, "traversable": false}
          },
          "interfaces": {
            "Temporal": {"required_fields": ["timestamp"]},
            "Actor": {"required_fields": ["name"]},
            "Evidence": {"required_fields": ["sources"]},
            "Versioned": {"required_fields": ["version_number", "is_latest"]}
          },
          "colors": {
            "types": {
              "Event": "#4A90D9", "Decision": "#D94A4A", "Fact": "#4AD94A", "Claim": "#D9D94A",
              "System": "#9B4AD9", "Goal": "#D94AD9", "Concept": "#4AD9D9", "Person": "#D9A54A", "Organization": "#5A5AD9"
            },
            "credibility": {
              "verified": "#4AD94A",
              "high": "#4A90D9",
              "medium": "#D9D94A",
              "low": "#D9A54A",
              "disputed": "#D94A4A"
            }
          }
        }'::jsonb
      )
    `);
    console.log('4. Default namespace seeded.\n');

    // Run selected seeds
    for (const seedName of seedsToRun) {
      const seedPath = path.resolve(__dirname, AVAILABLE_SEEDS[seedName]);
      if (!fs.existsSync(seedPath)) {
        console.log(`  ⚠ Seed file not found: ${seedPath}`);
        continue;
      }
      const seedFn = require(seedPath);
      await seedFn(client);
    }

    // Print summary
    const counts = await client.query(`
      SELECT
        (SELECT COUNT(*) FROM namespace_configs) as namespaces,
        (SELECT COUNT(*) FROM entities WHERE is_latest = TRUE) as entities,
        (SELECT COUNT(*) FROM relations) as relations,
        (SELECT COUNT(*) FROM datalayer) as sources
    `);
    const c = counts.rows[0];
    console.log(`\n=== Done! ${c.namespaces} namespaces, ${c.entities} entities, ${c.relations} relations, ${c.sources} sources ===`);

  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

initDatabase()
  .then(() => process.exit(0))
  .catch((err) => { console.error(err); process.exit(1); });
