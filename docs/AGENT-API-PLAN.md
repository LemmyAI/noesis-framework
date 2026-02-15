# NOESIS Agent API Plan

> Making NOESIS queryable by AI agents — not just browsable by humans.

**Status:** Draft  
**Date:** 2026-02-15  
**Relates to:** API v2.5.0, Explorer v2.0

---

## Problem Statement

The current NOESIS API is designed for a browser SPA that batch-loads everything on init and builds an in-memory index. That works for the Explorer. It does **not** work for AI agents, which:

- Think in natural language, not entity IDs
- Need single-call context retrieval (every extra call = tokens + latency)
- Want to ask "why?" and "what happened?" — not construct graph traversals
- Need a self-describing schema to understand what they can query
- Operate under tight context windows and prefer pre-digested responses

The Explorer already "solves" many of these problems in JavaScript. This plan promotes those solutions into the API layer so any external consumer — especially AI agents — gets them for free.

---

## Five Workstreams

### 1. Enriched Responses (`?enrich=true`)

**Problem:** Getting useful context about an entity requires 3-4 sequential API calls:
1. `GET /api/entities/:id` → entity data
2. `GET /api/relations?entity=:id&depth=1` → relation rows (bare IDs only)
3. `GET /api/entities/:id` × N → resolve each connected entity's name/type
4. `GET /api/datalayer/by-entity/:id` → source evidence

An agent burns 5-15 calls and must stitch the result together itself.

**Solution:** Add an `enrich=true` query parameter to existing endpoints.

#### 1a. Enriched Entity Detail

```
GET /api/entities/:id?enrich=true
```

Returns:
```json
{
  "entity": { "id": "evt-gold-ath", "name": "Gold ATH $2,940", "type": "Event", ... },
  "relations": {
    "outgoing": [
      {
        "type": "causes",
        "target": { "id": "evt-btc-rally", "name": "Bitcoin $102K Rally", "type": "Event" },
        "context": "February 2026 Rally",
        "metadata": {}
      }
    ],
    "incoming": [
      {
        "type": "caused_by",
        "source": { "id": "evt-tariff-pause", "name": "US-China Tariff Pause", "type": "Event" },
        "context": "February 2026 Rally",
        "metadata": {}
      }
    ]
  },
  "sources": [
    { "title": "Gold Hits Record...", "source_name": "Bloomberg", "excerpt": "...", "url": "..." }
  ],
  "narratives": ["February 2026 Rally"]
}
```

**Implementation:**
- File: `api/src/routes/entities.ts` → modify `GET /:id`
- When `enrich=true`:
  - Query relations where `from_entity = id OR to_entity = id`
  - Batch-fetch all connected entity IDs in one `WHERE id = ANY($1)` query
  - Query datalayer for `entity_id = id`
  - Query distinct narrative contexts from the entity's relations
  - Split relations into incoming/outgoing, resolve inverse names from namespace config
  - Assemble and return the enriched response
- When `enrich` is absent, behaviour is unchanged (backward compatible)

**Estimated effort:** ~60 lines of new code in entities route. One new helper function for inverse name resolution.

#### 1b. Enriched Relations

```
GET /api/relations?entity=evt-gold-ath&depth=1&enrich=true
```

Returns relation rows with inline entity objects instead of bare IDs:

```json
{
  "relations": [
    {
      "type": "causes",
      "from_entity": { "id": "evt-gold-ath", "name": "Gold ATH $2,940", "type": "Event", "namespace": "finance" },
      "to_entity": { "id": "evt-btc-rally", "name": "Bitcoin $102K Rally", "type": "Event", "namespace": "finance.crypto" },
      "context": "February 2026 Rally",
      "narrative_sequence": 3
    }
  ]
}
```

**Implementation:**
- File: `api/src/routes/relations.ts` → modify response assembly
- After traversal, collect all unique entity IDs from results
- Batch-fetch entities: `SELECT id, name, type, namespace FROM entities WHERE id = ANY($1) AND is_latest = TRUE`
- Replace bare ID strings with inline entity summaries
- ~30 lines of new code

#### 1c. Narrative Summary Format

```
GET /api/narratives/:context?format=summary
```

Returns a prose-friendly digest instead of raw graph data:

```json
{
  "context": "February 2026 Rally",
  "summary": "US-China Tariff Pause (Event) causes Gold ATH $2,940 (Event), which causes Bitcoin $102K Rally (Event), which enables DeFi TVL Recovery (Event)...",
  "entity_count": 12,
  "relation_count": 15,
  "timeline": {
    "earliest": "2026-02-01T00:00:00Z",
    "latest": "2026-02-14T00:00:00Z",
    "precision": "day"
  },
  "key_actors": [
    { "id": "org-fed", "name": "Federal Reserve", "type": "Organization", "role_count": 4 }
  ],
  "causal_chain": [
    "US-China Tariff Pause → Gold ATH $2,940 → Bitcoin $102K Rally → DeFi TVL Recovery"
  ]
}
```

**Implementation:**
- File: `api/src/routes/narratives.ts` → add `format` param handling
- Walk the narrative sequence, build a chain of `from → (type) → to`
- Compute timeline bounds from entity temporal data
- Rank entities by relation count to identify key actors
- Generate the `causal_chain` array as human-readable strings
- ~80 lines of new code

---

### 2. Full-Text Search

**Problem:** An agent can't ask "find entities about gold" — it must `GET /api/entities` and scan everything. With 50+ entities this is already wasteful; at 500+ it's unusable.

**Solution:** PostgreSQL `tsvector` full-text search with a dedicated endpoint.

```
GET /api/search?q=gold+rally&limit=10
```

Returns:
```json
{
  "query": "gold rally",
  "results": [
    {
      "kind": "entity",
      "id": "evt-gold-ath",
      "name": "Gold ATH $2,940",
      "type": "Event",
      "namespace": "finance",
      "snippet": "Gold reaches all-time high of $2,940/oz amid safe-haven demand...",
      "rank": 0.95
    },
    {
      "kind": "narrative",
      "context": "February 2026 Rally",
      "snippet": "...gold rally driven by tariff uncertainty...",
      "rank": 0.72
    },
    {
      "kind": "source",
      "id": 3,
      "title": "Gold Hits Record as Investors Flee to Safety",
      "source_name": "Bloomberg",
      "rank": 0.68
    }
  ]
}
```

**Implementation:**

#### 2a. Schema Changes (init-db.js)

Add a `tsvector` column and index to each searchable table:

```sql
-- Entities: searchable across name, description, category, key
ALTER TABLE entities ADD COLUMN search_vector tsvector;
CREATE INDEX idx_entities_search ON entities USING GIN (search_vector);

-- Trigger to auto-populate on insert/update
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

-- Datalayer: searchable across title, excerpt, source_name
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
```

Since the DB reseeds on startup, triggers will fire automatically during seeding. No migration needed.

#### 2b. Search Route

New file: `api/src/routes/search.ts`

```typescript
// Unified search across entities, narratives (via relation contexts), and sources
// Uses ts_rank for relevance scoring
// Supports: q (query), limit, type (entity|narrative|source), namespace
```

- Parse query into `tsquery` using `plainto_tsquery('english', q)` (handles natural language gracefully)
- Run parallel queries against entities and datalayer
- For narratives: search relation contexts + metadata descriptions
- Merge results, sort by rank, apply limit
- ~100 lines of new code

#### 2c. Register Route

In `api/src/index.ts`:
```typescript
import searchRouter from './routes/search';
app.use('/api/search', searchRouter);
```

**Estimated effort:** ~30 lines schema changes + ~100 lines search route + 2 lines registration.

---

### 3. Overview / Discovery Endpoint

**Problem:** An agent's first interaction with a NOESIS instance is "what's in here?" There's no single call that answers this. The Explorer calls 5 endpoints in parallel on init.

**Solution:** A single discovery endpoint that returns everything an agent needs to orient itself.

```
GET /api/overview
```

Returns:
```json
{
  "instance": {
    "name": "NOESIS",
    "version": "2.5.0",
    "description": "Structured knowledge for AI and humans"
  },
  "stats": {
    "namespaces": 5,
    "entities": 33,
    "relations": 33,
    "sources": 12,
    "narratives": 3
  },
  "namespaces": [
    { "namespace": "finance", "extends": "default", "entity_count": 12 },
    { "namespace": "finance.crypto", "extends": "finance", "entity_count": 8 },
    { "namespace": "news", "extends": "default", "entity_count": 10 }
  ],
  "narratives": [
    { "context": "February 2026 Rally", "relation_count": 15, "entity_count": 12 }
  ],
  "type_distribution": {
    "Event": 10, "Asset": 5, "Person": 4, "Organization": 3, "Claim": 6, "Article": 5
  },
  "relation_types": {
    "causes": { "count": 8, "transitive": true, "traversable": true, "inverse": "caused_by" },
    "supports": { "count": 5, "transitive": false, "traversable": false, "inverse": "supported_by" }
  },
  "temporal_range": {
    "earliest": "2026-01-15T00:00:00Z",
    "latest": "2026-02-14T00:00:00Z"
  },
  "recent_entities": [
    { "id": "evt-gold-ath", "name": "Gold ATH $2,940", "type": "Event", "timestamp": "2026-02-10T14:30:00Z" }
  ]
}
```

**Implementation:**

New file: `api/src/routes/overview.ts`

Run these queries in parallel (all read-only, all fast with existing indexes):

| Query | Purpose |
|-------|---------|
| `SELECT COUNT(*) FROM entities WHERE is_latest = TRUE` | Entity count |
| `SELECT COUNT(*) FROM relations` | Relation count |
| `SELECT COUNT(*) FROM datalayer` | Source count |
| `SELECT COUNT(*) FROM namespace_configs` | Namespace count |
| `SELECT namespace, extends FROM namespace_configs` | Namespace list |
| `SELECT type, COUNT(*) FROM entities WHERE is_latest = TRUE GROUP BY type` | Type distribution |
| `SELECT context, COUNT(*) FROM relations WHERE context IS NOT NULL GROUP BY context` | Narrative list |
| `SELECT type, COUNT(*) FROM relations GROUP BY type` | Relation type counts |
| `SELECT * FROM namespace_configs WHERE namespace = 'default'` | Relation config (for transitive/traversable/inverse) |
| `SELECT MIN(...), MAX(...) FROM entities` | Temporal range |
| `SELECT * FROM entities WHERE is_latest = TRUE ORDER BY created_at DESC LIMIT 5` | Recent entities |

Assemble into a single response object. Enrich namespace list with entity counts via a `GROUP BY namespace` subquery.

**Estimated effort:** ~80 lines. All queries are simple aggregations — no new indexes needed.

**Registration:** `app.use('/api/overview', overviewRouter);`

---

### 4. Causal Path Finding

**Problem:** "What connects A to B?" is the fundamental agent question. The current `/api/relations?entity=X&depth=2` does BFS from one node outward, but there's no way to find a directed path between two specific entities. An agent asking "why did gold rally?" needs to trace: tariff pause → safe-haven demand → gold ATH.

**Solution:** A path-finding endpoint using BFS with direction awareness.

```
GET /api/path?from=evt-tariff-pause&to=evt-gold-ath
GET /api/path?from=evt-tariff-pause&to=evt-gold-ath&type=causes
GET /api/path?from=evt-tariff-pause&to=evt-gold-ath&maxDepth=5&enrich=true
```

Returns:
```json
{
  "from": "evt-tariff-pause",
  "to": "evt-gold-ath",
  "found": true,
  "depth": 2,
  "paths": [
    {
      "length": 2,
      "steps": [
        {
          "from": { "id": "evt-tariff-pause", "name": "US-China Tariff Pause", "type": "Event" },
          "relation": "causes",
          "to": { "id": "evt-safe-haven", "name": "Safe-Haven Demand Spike", "type": "Event" },
          "context": "February 2026 Rally",
          "sequence": 1
        },
        {
          "from": { "id": "evt-safe-haven", "name": "Safe-Haven Demand Spike", "type": "Event" },
          "relation": "causes",
          "to": { "id": "evt-gold-ath", "name": "Gold ATH $2,940", "type": "Event" },
          "context": "February 2026 Rally",
          "sequence": 2
        }
      ],
      "summary": "US-China Tariff Pause →(causes)→ Safe-Haven Demand Spike →(causes)→ Gold ATH $2,940"
    }
  ]
}
```

**Implementation:**

New file: `api/src/routes/path.ts`

Algorithm: **Bidirectional BFS** (efficient for sparse graphs).

```
1. Start two BFS queues: forward from `from`, backward from `to`
2. Alternate expanding one level from each end
3. When the frontiers meet, reconstruct the path
4. If `type` is specified, only traverse edges of that type
5. If `traversable=true`, only traverse edges marked traversable in namespace config
6. Cap at maxDepth (default: 6) to prevent runaway on large graphs
7. Return ALL shortest paths (there may be multiple)
```

Edge cases:
- `from === to` → return empty path, `found: true`, `depth: 0`
- No path exists → `found: false`, `paths: []`
- Multiple equal-length paths → return all of them (capped at 10)

When `enrich=true`, inline entity objects on each step (same batch-fetch pattern as workstream 1).

Generate `summary` string by joining step labels: `"A →(type)→ B →(type)→ C"`

**Estimated effort:** ~120 lines. BFS is straightforward; the tricky part is reconstructing multiple shortest paths from the frontier intersection — but for our graph sizes (< 1000 nodes) this is trivial.

**Registration:** `app.use('/api/path', pathRouter);`

---

### 5. Namespace-Scoped Narratives

**Problem:** The Explorer computes `getScopedNarratives(ns)` in-browser by checking which entities belong to a namespace (or its descendants) and then filtering narratives that reference those entities. The API has no equivalent — you can list all narratives, but you can't say "show me narratives relevant to the finance namespace."

**Solution:** Add namespace scoping to the narratives endpoint.

```
GET /api/narratives?namespace=finance
GET /api/narratives?namespace=finance.crypto&descendants=false
```

Returns only narratives where at least one participating entity belongs to the specified namespace (or its descendants, by default).

**Implementation:**

Modify `api/src/routes/narratives.ts` → `GET /`:

```sql
-- When namespace param is present:
SELECT DISTINCT r.context, COUNT(*) as relation_count
FROM relations r
JOIN entities e ON (e.id = r.from_entity OR e.id = r.to_entity) AND e.is_latest = TRUE
WHERE r.context IS NOT NULL
  AND (
    e.namespace = $1                          -- exact match
    OR e.namespace LIKE $1 || '.%'            -- descendants (when descendants=true, default)
  )
GROUP BY r.context
ORDER BY COUNT(*) DESC
```

Parameters:
| Param | Default | Description |
|-------|---------|-------------|
| `namespace` | _(none — returns all)_ | Filter by namespace |
| `descendants` | `true` | Include child namespaces |

When `namespace` is absent, the current behaviour is unchanged (backward compatible).

**Estimated effort:** ~20 lines of modified SQL + parameter handling.

---

## Implementation Order

Prioritised by impact-to-effort ratio for agent usability:

| Phase | Workstream | Effort | Impact | Notes |
|-------|-----------|--------|--------|-------|
| **1** | 3. Overview | ~80 lines | 🟢 High | Agent's first call. Zero dependencies. Ship alone. |
| **2** | 1a. Enriched Entity | ~60 lines | 🟢 High | Eliminates N+1 problem for the most common query. |
| **2** | 1b. Enriched Relations | ~30 lines | 🟡 Medium | Natural companion to 1a. Same batch-fetch pattern. |
| **3** | 2. Search | ~130 lines | 🟢 High | Requires schema change (tsvector). Ship with DB reseed. |
| **4** | 5. Namespace Narratives | ~20 lines | 🟡 Medium | Trivial. Can land in any phase. |
| **4** | 1c. Narrative Summary | ~80 lines | 🟡 Medium | Nice for agents but not blocking. |
| **5** | 4. Path Finding | ~120 lines | 🟢 High | Most complex, most powerful. Benefits from 1a/1b patterns. |

**Total new code:** ~520 lines across 3 new files + modifications to 3 existing files.

**New files:**
- `api/src/routes/search.ts`
- `api/src/routes/overview.ts`
- `api/src/routes/path.ts`

**Modified files:**
- `api/src/routes/entities.ts` (enrich flag)
- `api/src/routes/relations.ts` (enrich flag)
- `api/src/routes/narratives.ts` (namespace filter + summary format)
- `api/src/index.ts` (register new routes)
- `api/scripts/init-db.js` (tsvector columns + triggers)

---

## API Surface After Implementation

### Existing (unchanged without flags)
| Endpoint | Description |
|----------|-------------|
| `GET /api/entities` | List/filter entities |
| `GET /api/entities/:id` | Get entity by ID |
| `GET /api/entities/by-key/:key` | Cross-namespace key lookup |
| `GET /api/relations` | List/traverse relations |
| `GET /api/namespaces` | Namespace tree |
| `GET /api/namespaces/:ns/config` | Merged config with inheritance |
| `GET /api/categories/tree` | Category hierarchy |
| `GET /api/categories/:parent/children` | Category drill-down |
| `GET /api/narratives` | List narratives |
| `GET /api/narratives/:context` | Full story |
| `GET /api/datalayer` | List sources |
| `GET /api/datalayer/:id` | Get source |
| `GET /api/datalayer/by-entity/:entityId` | Sources for entity |

### New / Enhanced
| Endpoint | Description |
|----------|-------------|
| `GET /api/overview` | **NEW** — Instance discovery + stats + schema |
| `GET /api/search?q=...` | **NEW** — Full-text search across all layers |
| `GET /api/path?from=...&to=...` | **NEW** — Causal path finding between entities |
| `GET /api/entities/:id?enrich=true` | **ENHANCED** — Entity + relations + sources in one call |
| `GET /api/relations?entity=X&enrich=true` | **ENHANCED** — Relations with inline entity data |
| `GET /api/narratives?namespace=X` | **ENHANCED** — Namespace-scoped narrative listing |
| `GET /api/narratives/:context?format=summary` | **ENHANCED** — Agent-friendly prose summary |

---

## About Page Section (After Implementation)

Once these endpoints are live, the about page should include a section:

**"For AI Agents"**

Covering:
1. Why NOESIS beats unstructured RAG (typed relations, provenance, causal reasoning)
2. Quick-start: call `/api/overview` to discover the graph, then `/api/search` to find what you need
3. One-call context: use `?enrich=true` to get everything about an entity without N+1 queries
4. Causal reasoning: use `/api/path` to answer "why?" questions with traceable evidence chains
5. Machine-readable schema: relation types, inference properties, namespace hierarchy — all queryable
6. Example agent workflow (3 calls to answer a complex question)

This section should be written **after** the endpoints exist so it documents reality, not aspirations.

---

## Open Questions

1. **Rate limiting?** If agents are the primary consumer, do we need throttling? Probably not at current scale, but worth flagging for production.

2. **OpenAPI spec?** Should we generate an OpenAPI/Swagger doc that agents can consume for self-discovery? This would be a natural Phase 6.

3. **Write API?** Currently read-only. Agents that *populate* knowledge (e.g., a news-gathering agent writing entities) would need POST endpoints. Out of scope for this plan but worth noting as a future direction.

4. **Transitive inference materialisation?** The spec defines `transitive: true` on `causes` and `part_of`. Should the path finder compute transitive closure, or just report the raw path? Current plan: report the path and let the consumer reason about transitivity. Materialising transitive closure is a separate concern.
