# NOESIS v2.5 Implementation Decisions

**Date:** 2026-02-14  
**Status:** READY TO BUILD

---

## Project Structure

NOESIS has **three separate components**:

| Component | Description | API Access |
|-----------|-------------|------------|
| **1. Spec/Docs** | Framework documentation | N/A |
| **2. API** | REST API for querying data | **Read-only** |
| **3. Presentation Site** | Frontend viewer | Future work |

**Key Decision:** API is **read-only**. Database is managed manually via SQL scripts.

---

## Core Decisions

### 1. Three-Component Architecture
**Decision:** Separate spec, API, and presentation site.  
**Rationale:**
- Spec is framework documentation (versioned independently)
- API is data access layer (read-only for safety)
- Presentation site can evolve separately
- Clear separation of concerns

### 2. API is Read-Only
**Decision:** API cannot create, update, or delete data.  
**Rationale:**
- Simpler API (fewer edge cases, no auth needed)
- Safer (no accidental data corruption)
- Manual SQL scripts for data management are fine for internal tool
- Can add write endpoints later if needed

### 3. Database: PostgreSQL with JSONB
**Decision:** Use PostgreSQL with JSONB columns for flexible metadata.  
**Rationale:**
- JSONB allows flexible querying of nested metadata
- GIN indexes provide good performance
- Native temporal types for timestamps

### 4. IDR: Simple `key` Field
**Decision:** Add a `key` field to entities for cross-namespace identity.  
**Rationale:**
- No separate table needed
- Same key across namespaces = same real-world thing
- Optional field (not all entities need it)

### 5. Fuzzy Temporal Precision
**Decision:** Add `precision` field to temporal data.  
**Rationale:**
- News is rarely precise to the second
- Allows "Feb 2026" style timelines
- UI can render differently based on precision

### 6. Narrative Sequencing
**Decision:** Relations have `narrative_sequence` and `context` fields.  
**Rationale:**
- Relations are steps in a story, not just links
- Enables "play story" functionality
- Multiple narratives can exist independently

### 7. `traversable` Property
**Decision:** Relations have both `transitive` and `traversable` properties.  
**Rationale:**
- `transitive` = mathematical property (A→B→C implies A→C)
- `traversable` = query behavior (walk through this relation?)
- Different concerns, separate flags

### 8. Default Namespace: Ontology Only
**Decision:** `default` namespace contains only types/relations, NO entities.  
**Rationale:**
- Clean separation of vocabulary from data
- All entities live in sub-namespaces
- Shared root vocabulary for all namespaces

### 9. Docker: API + PostgreSQL Together
**Decision:** Single Docker container with both API and PostgreSQL.  
**Rationale:**
- Simpler deployment for internal tool
- No need for separate database server
- Can split later if needed

### 10. No Pagination (Yet)
**Decision:** Initial API returns all results.  
**Rationale:**
- Internal tool with limited data
- Can add pagination when needed
- Simpler initial implementation

---

## Database Schema (Final)

### entities
```sql
CREATE TABLE entities (
    id TEXT NOT NULL,
    version_number INTEGER DEFAULT 1,
    is_latest BOOLEAN DEFAULT TRUE,
    
    namespace TEXT NOT NULL,
    key TEXT,                 -- Cross-namespace identity
    type TEXT NOT NULL,
    
    name TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    temporal JSONB DEFAULT '{"precision": "second"}',
    credibility JSONB DEFAULT '{"confidence": "medium"}',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    PRIMARY KEY (id, version_number)
);
```

### relations
```sql
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
```

### namespace_configs
```sql
CREATE TABLE namespace_configs (
    namespace TEXT PRIMARY KEY,
    extends TEXT DEFAULT 'default',
    config JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### datalayer
```sql
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
```

---

## API Endpoints Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/entities` | GET | List entities with filters |
| `/api/entities/:id` | GET | Get entity by ID |
| `/api/entities/by-key/:key` | GET | Find by cross-namespace key |
| `/api/relations` | GET | List relations with traversal |
| `/api/namespaces` | GET | List all namespaces |
| `/api/namespaces/:ns/config` | GET | Get namespace config |
| `/api/categories/tree` | GET | Full category hierarchy |
| `/api/categories/:parent/children` | GET | Drill down categories |
| `/api/narratives` | GET | List all narrative contexts |
| `/api/narratives/:context` | GET | Get full story |

**No POST/PUT/DELETE endpoints** - API is read-only.

---

## Data Management

All data modifications via SQL scripts:

```bash
# Add namespace
psql -d noesis -f scripts/seed-news-namespace.sql

# Add entities
psql -d noesis -f scripts/example-entities.sql

# Add relations
psql -d noesis -f scripts/example-relations.sql
```

---

## Status: READY TO BUILD

- ✅ Spec complete (v2.5)
- ✅ Decisions finalized
- ✅ Implementation plan ready
- 🔲 API implementation (next step)
- 🔲 Presentation site (future)
