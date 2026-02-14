const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://noesis:noesis@localhost:5432/noesis'
});

async function initDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Initializing NOESIS database...');
    
    // Create tables
    await client.query(`
      -- Namespace configs
      CREATE TABLE IF NOT EXISTS namespace_configs (
        namespace TEXT PRIMARY KEY,
        extends TEXT DEFAULT 'default',
        config JSONB DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Entities
      CREATE TABLE IF NOT EXISTS entities (
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

      -- Relations
      CREATE TABLE IF NOT EXISTS relations (
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

      -- Datalayer
      CREATE TABLE IF NOT EXISTS datalayer (
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
    
    console.log('Tables created.');

    // Create indexes
    await client.query(`
      -- Entity indexes
      CREATE INDEX IF NOT EXISTS idx_entities_key ON entities(key) WHERE key IS NOT NULL;
      CREATE INDEX IF NOT EXISTS idx_entities_namespace_type ON entities(namespace, type);
      CREATE INDEX IF NOT EXISTS idx_entities_namespace ON entities(namespace);
      CREATE INDEX IF NOT EXISTS idx_entities_is_latest ON entities(is_latest);
      CREATE INDEX IF NOT EXISTS idx_entities_metadata ON entities USING GIN (metadata);
      CREATE INDEX IF NOT EXISTS idx_entities_temporal ON entities USING GIN (temporal);
      CREATE INDEX IF NOT EXISTS idx_entities_category ON entities ((metadata->>'category'));

      -- Relation indexes
      CREATE INDEX IF NOT EXISTS idx_relations_from ON relations(from_entity);
      CREATE INDEX IF NOT EXISTS idx_relations_to ON relations(to_entity);
      CREATE INDEX IF NOT EXISTS idx_relations_type ON relations(type);
      CREATE INDEX IF NOT EXISTS idx_relations_narrative ON relations(context, narrative_sequence);
      CREATE INDEX IF NOT EXISTS idx_relations_context ON relations(context);

      -- Datalayer indexes
      CREATE INDEX IF NOT EXISTS idx_datalayer_entity ON datalayer(entity_id);
      CREATE INDEX IF NOT EXISTS idx_datalayer_url ON datalayer(url);
    `);
    
    console.log('Indexes created.');

    // Seed default namespace
    const defaultNamespaceExists = await client.query(
      "SELECT 1 FROM namespace_configs WHERE namespace = 'default'"
    );
    
    if (defaultNamespaceExists.rows.length === 0) {
      await client.query(`
        INSERT INTO namespace_configs (namespace, extends, config) VALUES (
          'default', 
          NULL, 
          '{
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
                "Event": "#4A90D9",
                "Decision": "#D94A4A",
                "Fact": "#4AD94A",
                "Claim": "#D9D94A",
                "System": "#9B4AD9",
                "Goal": "#D94AD9",
                "Concept": "#4AD9D9",
                "Person": "#D9A54A",
                "Organization": "#5A5AD9"
              }
            }
          }'::jsonb
        )
      `);
      console.log('Default namespace seeded.');
    } else {
      console.log('Default namespace already exists.');
    }

    console.log('Database initialization complete!');
    
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

initDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
