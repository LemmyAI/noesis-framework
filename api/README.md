# NOESIS API

REST API for querying NOESIS data.

## Status

✅ Built and ready for deployment

## Architecture

- **Framework:** Node.js + Express + TypeScript
- **Database:** PostgreSQL (JSONB) - embedded in same container
- **Deployment:** Docker (Render-ready)

## Key Constraint

API is **read-only**. Database is managed manually via SQL scripts.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info |
| GET | `/health` | Health check |
| GET | `/api/entities` | List entities with filters |
| GET | `/api/entities/:id` | Get entity by ID |
| GET | `/api/entities/by-key/:key` | Find by cross-namespace key |
| GET | `/api/relations` | List relations with traversal |
| GET | `/api/namespaces` | List all namespaces |
| GET | `/api/namespaces/:ns/config` | Get namespace config |
| GET | `/api/categories/tree` | Full category hierarchy |
| GET | `/api/categories/:parent/children` | Drill down categories |
| GET | `/api/narratives` | List all narrative contexts |
| GET | `/api/narratives/:context` | Get full story |

### Query Parameters

#### `/api/entities`
- `type` - Filter by entity type
- `namespace` - Filter by namespace
- `key` - Filter by cross-namespace key
- `category` - Filter by category (LIKE match)
- `is_latest` - Latest versions only (default: true)
- `all_versions` - Return all versions
- `version` - Specific version number
- `from` - Temporal range start
- `to` - Temporal range end
- `precision` - Filter by temporal precision

#### `/api/relations`
- `entity` - All relations involving this entity
- `type` - Filter by relation type
- `context` - Filter by narrative context
- `depth` - Traverse depth (default: 2)
- `traversable` - Only include traversable relations

## Local Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run with local database (Docker)
docker-compose up --build

# API will be available at http://localhost:3000
```

## Deployment

### Render

```bash
# Push to GitHub, then connect to Render
# Use render.yaml for configuration
```

### Docker

```bash
docker build -t noesis-api .
docker run -p 3000:3000 noesis-api
```

## Database Management

The API initializes the database schema on startup. To add data:

```sql
-- Connect to running database
docker exec -it <container> psql -U noesis -d noesis

-- Insert entity
INSERT INTO entities (id, namespace, type, name, key, metadata, temporal)
VALUES ('btc-article-001', 'news', 'Article', 'Bitcoin Hits $95K', 
        'https://coindesk.com/btc-95k', 
        '{"category": "finance.crypto"}', 
        '{"timestamp": "2026-02-14T00:00:00Z", "precision": "day"}');

-- Insert relation
INSERT INTO relations (from_entity, to_entity, type, context, narrative_sequence)
VALUES ('btc-article-001', 'btc-asset', 'supports', 'Feb 2026 Rally', 1);
```

## Project Structure

```
api/
├── src/
│   ├── index.ts          # Express server entry
│   ├── db/
│   │   └── index.ts      # PostgreSQL connection
│   └── routes/
│       ├── entities.ts   # Entity endpoints
│       ├── relations.ts  # Relation endpoints
│       ├── namespaces.ts # Namespace endpoints
│       ├── categories.ts # Category endpoints
│       └── narratives.ts # Narrative endpoints
├── scripts/
│   └── init-db.js        # Database initialization
├── dist/                 # Compiled JavaScript
├── Dockerfile
├── docker-compose.yml
└── package.json
```
