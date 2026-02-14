# NOESIS Implementation Plan

**Date:** 2026-02-14  
**Status:** Ready to Execute  
**Storage:** PostgreSQL with JSONB  

---

## Project Structure

NOESIS consists of **three separate components**:

| Component | Description | Status |
|-----------|-------------|--------|
| **1. Spec/Docs** | Framework documentation (SPEC.md, DECISIONS.md) | ✅ Done (v2.5) |
| **2. API** | REST API + PostgreSQL (same Docker) | 🔲 Ready to build |
| **3. Presentation Site** | Frontend for viewing narratives | 🔲 Future work |

**Current focus:** API implementation. Database will be managed manually; API is **read-only** (retrieve data only, no create/update/delete).

---

## Component 1: Spec/Docs (Complete)

The NOESIS framework specification:

- `SPEC.md` - Full specification v2.5
- `DECISIONS.md` - Key decisions and rationale
- `IMPLEMENTATION-PLAN.md` - This file

**Status:** ✅ Complete and pushed to GitHub.

---

## Component 2: API

### Architecture

```
┌─────────────────────────────────────────┐
│  Docker Container                        │
│  ┌─────────────────────────────────────┐│
│  │  API (Node.js/Express)              ││
│  │  - REST endpoints                   ││
│  │  - Read-only operations             ││
│  │  - No auth needed (internal tool)   ││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │  PostgreSQL                         ││
│  │  - JSONB for flexible metadata      ││
│  │  - Managed manually (SQL scripts)   ││
│  │  - API cannot modify                ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

**Key constraint:** API is **read-only**. All data modifications (inserts, updates, deletes) are done manually via SQL scripts or database tools.

### API Endpoints

#### Entities
```
GET /api/entities
  ?type=Article          # Filter by type
  ?namespace=news        # Filter by namespace
  ?key=TICKER:AAPL       # Find by cross-namespace key
  ?category=finance%     # Hierarchical category filter (LIKE)
  ?is_latest=true        # Latest versions only (default)
  ?precision=month       # Filter by temporal precision
  ?from=2026-02-01       # Temporal range start
  ?to=2026-02-28         # Temporal range end

GET /api/entities/:id    # Returns latest version
GET /api/entities/:id?version=2  # Specific version
GET /api/entities/:id?all_versions=true  # All versions
```

#### Relations
```
GET /api/relations
  ?entity=apple          # All relations involving entity
  ?type=causes           # Filter by relation type
  ?context=2026+Crisis   # Filter by narrative context
  ?depth=3               # Traverse depth (respects traversable)
  ?traversable=true      # Only include traversable relations
```

#### Namespaces
```
GET /api/namespaces                 # List all namespaces (tree structure)
GET /api/namespaces/:ns/config      # Get merged config (with inheritance)
```

#### Categories
```
GET /api/categories/tree            # Full category hierarchy
GET /api/categories/:parent/children  # Drill down
```

#### Narratives
```
GET /api/narratives                 # List all narrative contexts
GET /api/narratives/:context        # Get full story with sequence
```

#### IDR (Identity Resolution)
```
GET /api/entities/by-key/:key       # Find all entities with this key
```

---

### Database Schema

```sql
-- Connect to database
\c noesis

-- Entities
CREATE TABLE entities (
    id TEXT NOT NULL,
    version_number INTEGER DEFAULT 1,
    is_latest BOOLEAN DEFAULT TRUE,
    
    namespace TEXT NOT NULL,
    key TEXT,                 -- Cross-namespace identity
    type TEXT NOT NULL,       -- Must exist in namespace/default hierarchy
    
    name TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    temporal JSONB DEFAULT '{"precision": "second"}',
    credibility JSONB DEFAULT '{"confidence": "medium"}',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    PRIMARY KEY (id, version_number)
);

CREATE INDEX idx_entities_key ON entities(key) WHERE key IS NOT NULL;
CREATE INDEX idx_entities_namespace_type ON entities(namespace, type);
CREATE INDEX idx_entities_namespace ON entities(namespace);
CREATE INDEX idx_entities_is_latest ON entities(is_latest);
CREATE INDEX idx_entities_metadata ON entities USING GIN (metadata);
CREATE INDEX idx_entities_temporal ON entities USING GIN (temporal);
CREATE INDEX idx_entities_category ON entities ((metadata->>'category'));

-- Relations
CREATE TABLE relations (
    id SERIAL PRIMARY KEY,
    from_entity TEXT NOT NULL,
    to_entity TEXT NOT NULL,
    type TEXT NOT NULL,
    
    -- Narrative logic
    narrative_sequence INTEGER DEFAULT 0,
    context TEXT,
    
    bidirectional BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}',
    temporal JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_relations_from ON relations(from_entity);
CREATE INDEX idx_relations_to ON relations(to_entity);
CREATE INDEX idx_relations_type ON relations(type);
CREATE INDEX idx_relations_narrative ON relations(context, narrative_sequence);
CREATE INDEX idx_relations_context ON relations(context);

-- Namespace configs
CREATE TABLE namespace_configs (
    namespace TEXT PRIMARY KEY,
    extends TEXT DEFAULT 'default',
    config JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Datalayer (source evidence)
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

CREATE INDEX idx_datalayer_entity ON datalayer(entity_id);
CREATE INDEX idx_datalayer_url ON datalayer(url);
```

### Seed Default Namespace

```sql
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
);
```

---

### Implementation Phases

#### Phase 1: Project Setup (2 hours)
- [ ] Initialize Node.js project with TypeScript
- [ ] Set up Express server
- [ ] Configure Dockerfile and docker-compose.yml
- [ ] Set up PostgreSQL connection (node-postgres)
- [ ] Create database schema migration script

#### Phase 2: Core API - Entities (4 hours)
- [ ] `GET /api/entities` - List with filters
- [ ] `GET /api/entities/:id` - Get by ID
- [ ] Version handling (latest, specific, all)
- [ ] Namespace filter
- [ ] Key lookup (IDR)
- [ ] Category hierarchical filter
- [ ] Temporal range filter

#### Phase 3: Core API - Relations (3 hours)
- [ ] `GET /api/relations` - List with filters
- [ ] Entity relation lookup
- [ ] Relation type filter
- [ ] Context filter
- [ ] Depth traversal (with traversable check)
- [ ] Cycle detection

#### Phase 4: Core API - Namespaces (2 hours)
- [ ] `GET /api/namespaces` - List all (tree)
- [ ] `GET /api/namespaces/:ns/config` - Get merged config
- [ ] Config inheritance resolution

#### Phase 5: Core API - Categories (2 hours)
- [ ] `GET /api/categories/tree` - Full hierarchy
- [ ] `GET /api/categories/:parent/children` - Drill down

#### Phase 6: Core API - Narratives (2 hours)
- [ ] `GET /api/narratives` - List all contexts
- [ ] `GET /api/narratives/:context` - Get story with sequence

#### Phase 7: Docker & Deployment (2 hours)
- [ ] Dockerfile for API
- [ ] docker-compose.yml (API + PostgreSQL)
- [ ] Environment configuration
- [ ] Health check endpoint
- [ ] Basic logging

#### Phase 8: Testing & Documentation (3 hours)
- [ ] API documentation (OpenAPI/Swagger or README)
- [ ] Example queries
- [ ] Seed test data
- [ ] Manual testing

**Total Estimated Time:** 20 hours

---

### Data Management

**API is read-only.** Data modifications are done manually:

#### Adding Data
```sql
-- Insert namespace
INSERT INTO namespace_configs (namespace, extends, config) VALUES (...);

-- Insert entity
INSERT INTO entities (id, namespace, type, name, key, metadata, temporal) VALUES (...);

-- Insert relation
INSERT INTO relations (from_entity, to_entity, type, context, narrative_sequence) VALUES (...);
```

#### Updating Data
```sql
-- Create new version of entity
UPDATE entities SET is_latest = FALSE WHERE id = 'xyz';
INSERT INTO entities (id, version_number, ...) VALUES ('xyz', 2, ...);
```

#### Scripts
Create reusable SQL scripts in `/scripts/`:
- `scripts/seed-default-namespace.sql`
- `scripts/seed-news-namespace.sql`
- `scripts/seed-finance-namespace.sql`
- `scripts/example-entities.sql`

---

## Component 3: Presentation Site

**Status:** Future work. To be specified later.

Will include:
- Visual graph explorer
- Timeline view with fuzzy precision
- Narrative player (follow sequence)
- Category drill-down navigation
- Search and filter UI

---

## Repository Structure

```
noesis-news/
├── SPEC.md                    # Framework specification (v2.5)
├── DECISIONS.md               # Key decisions
├── IMPLEMENTATION-PLAN.md     # This file
├── README.md                  # Project overview
│
├── api/                       # Component 2: API
│   ├── src/
│   │   ├── index.ts          # Express server entry
│   │   ├── routes/           # API routes
│   │   ├── db/               # Database connection
│   │   └── utils/            # Helpers
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── scripts/                   # SQL scripts for manual DB management
│   ├── init-db.sql
│   ├── seed-default-namespace.sql
│   └── example-data.sql
│
├── docker-compose.yml         # API + PostgreSQL
│
└── site/                      # Component 3: Presentation (future)
    └── (TBD)
```

---

## Quick Start

```bash
# Initialize database
docker-compose up -d
docker-compose exec db psql -U noesis -f /scripts/init-db.sql

# Seed default namespace
docker-compose exec db psql -U noesis -f /scripts/seed-default-namespace.sql

# API is now available at http://localhost:3000
curl http://localhost:3000/api/namespaces
```

---

## Next Steps

1. **Start Phase 1** - Project setup
2. Create `api/` directory structure
3. Initialize Express + TypeScript
4. Set up PostgreSQL in Docker
5. Implement Phase 2 (Entities API)

---

Ready when you are, Captain.
