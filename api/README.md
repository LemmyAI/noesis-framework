# NOESIS API

REST API for querying NOESIS knowledge graph data.

## Status

✅ Built, seeded, and ready for deployment

## Architecture

- **Framework:** Node.js + Express + TypeScript
- **Database:** PostgreSQL (JSONB) — embedded in same Docker container
- **Deployment:** Docker on Render (free tier compatible)
- **Data Strategy:** Option B — database seeded on every startup (no persistent disk needed)

## Key Constraints

- API is **read-only** — no POST/PUT/DELETE endpoints
- Database managed manually via SQL scripts or seed data
- No auth needed (internal tool)

## Endpoints

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info + endpoint list |
| GET | `/health` | Health check (DB connectivity) |
| GET | `/api/entities` | List entities with filters |
| GET | `/api/entities/:id` | Get entity by ID (with version support) |
| GET | `/api/entities/:id?enrich=true` | Entity + relations + sources + narratives in one call |
| GET | `/api/entities/by-key/:key` | Find by cross-namespace key (IDR) |
| GET | `/api/relations` | List relations with traversal + cycle detection |
| GET | `/api/relations?entity=X&enrich=true` | Relations with inline entity data |
| GET | `/api/namespaces` | List all namespaces (tree structure) |
| GET | `/api/namespaces/:ns/config` | Get merged config (with inheritance) |
| GET | `/api/categories/tree` | Full category hierarchy |
| GET | `/api/categories/:parent/children` | Drill down categories |
| GET | `/api/narratives` | List all narrative contexts |
| GET | `/api/narratives?namespace=X` | Namespace-scoped narrative listing |
| GET | `/api/narratives/:context` | Get full story with sequenced entities |
| GET | `/api/narratives/:context?format=summary` | Agent-friendly prose digest |
| GET | `/api/datalayer` | List source evidence |
| GET | `/api/datalayer/:id` | Get specific source |
| GET | `/api/datalayer/by-entity/:entityId` | All sources for an entity |

### Agent-First Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/overview` | Instance discovery: stats, namespaces, types, relation properties |
| GET | `/api/search?q=...` | Full-text search across entities, sources, and narratives |
| GET | `/api/path?from=X&to=Y` | Find causal/relation paths between two entities |

### Query Parameters

#### `/api/entities`
| Param | Description |
|-------|-------------|
| `type` | Filter by entity type (e.g. `Article`, `Token`) |
| `namespace` | Filter by namespace (e.g. `news`, `finance.crypto`) |
| `key` | Filter by cross-namespace key (e.g. `CRYPTO:BTC`) |
| `category` | Hierarchical category filter (LIKE match) |
| `from` / `to` | Temporal range filter |
| `precision` | Filter by temporal precision (second/day/month/year) |
| `version` | Specific version number |
| `all_versions` | Return all versions (`true`) |

#### `/api/relations`
| Param | Description |
|-------|-------------|
| `entity` | All relations involving this entity ID |
| `type` | Filter by relation type (e.g. `causes`, `supports`) |
| `context` | Filter by narrative context |
| `depth` | Traverse depth (default: 2) |
| `traversable` | Only include traversable relations (`true`) |

#### `/api/datalayer`
| Param | Description |
|-------|-------------|
| `entity_id` | Filter by entity ID |
| `source_type` | Filter by source type (article, report) |
| `source_name` | Filter by source name |
| `from` / `to` | Filter by publication date range |

#### `/api/search`
| Param | Description |
|-------|-------------|
| `q` | Search query (required) |
| `limit` | Max results, 1-100 (default: 20) |
| `type` | Filter result kind: `entity`, `source`, or `narrative` |
| `namespace` | Restrict entity results to a namespace (+ descendants) |

#### `/api/path`
| Param | Description |
|-------|-------------|
| `from` | Source entity ID (required) |
| `to` | Target entity ID (required) |
| `type` | Only traverse this relation type (e.g. `causes`) |
| `maxDepth` | Maximum path length, 1-10 (default: 6) |
| `traversable` | Only use traversable relations (`true`) |
| `enrich` | Inline entity data in results (`true`) |

#### `/api/narratives` (additional)
| Param | Description |
|-------|-------------|
| `namespace` | Only narratives with entities in this namespace |
| `descendants` | Include child namespaces (default: `true`) |

#### `/api/narratives/:context` (additional)
| Param | Description |
|-------|-------------|
| `format` | Set to `summary` for agent-friendly prose digest |

## Seed Data

The database is seeded on every startup with a rich dataset covering the **"February 2026 Gold & Crypto Rally"** narrative:

- **5 namespaces:** default, news, finance, finance.crypto, geopolitics
- **33 entities:** assets, events, claims, articles, people, organizations
- **33 relations:** causal chains, narrative sequences, structural links
- **12 source documents:** articles and reports from Bloomberg, Reuters, CoinDesk, etc.

## Local Development

```bash
npm install
npm run build
# Requires a PostgreSQL instance
DATABASE_URL="postgresql://noesis:noesis@localhost:5432/noesis" npm start
```

## Docker

```bash
docker build -t noesis-api .
docker run -p 3000:3000 noesis-api
# API available at http://localhost:3000
```

## Example Queries

```bash
# List all gold-related entities
curl "http://localhost:3000/api/entities?key=COMMODITY:GOLD"

# Get the full "February 2026 Rally" narrative
curl "http://localhost:3000/api/narratives/February%202026%20Rally"

# Traverse relations from the gold ATH event
curl "http://localhost:3000/api/relations?entity=evt-gold-ath&depth=2"

# Get all source evidence for the gold ATH
curl "http://localhost:3000/api/datalayer/by-entity/evt-gold-ath"

# Get merged namespace config for finance.crypto
curl "http://localhost:3000/api/namespaces/finance.crypto/config"
```
