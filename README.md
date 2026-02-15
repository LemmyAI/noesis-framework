# NOESIS Framework

**N**arrative **O**ntology for **E**vidence-based **S**ystems **I**nferencing **S**tructure

Structured knowledge for humans, systems & agents.

**Live:** https://noesis-api.onrender.com

---

## Repository Structure

```
noesis-framework/
│
├── api/                    ← THE APPLICATION (Express + PostgreSQL + UI)
│   ├── src/                  TypeScript API source
│   ├── public/               ⭐ LIVE UI FILES (served by Express/Docker)
│   │   ├── index.html          SPA shell
│   │   ├── app.js              Main application logic
│   │   ├── graph.js            SVG graph engine
│   │   └── style.css           Styles
│   ├── scripts/
│   │   ├── init-db.js          DB schema + seed runner (auto-discovers seeds/)
│   │   └── seeds/              Generated .js seed files (build artifacts)
│   ├── Dockerfile              Production container
│   └── start.sh                Container entrypoint
│
├── seed-factory/           ← SEED TOOLING (pre-deploy, not in Docker)
│   ├── sources.yaml          RSS feeds + narrative clustering rules
│   ├── narratives/           ⭐ YAML source of truth for all seeds
│   ├── scripts/              gather → narrate → validate → build pipeline
│   ├── schema/               JSON Schema for YAML validation
│   └── README.md             Full usage docs
│
├── docs/                   ← SPECIFICATIONS
│   ├── SPEC.md               Framework spec (v2.5)
│   ├── UI-SPEC.md            UI spec
│   ├── DECISIONS.md          Architecture decisions
│   ├── CREATING-SEEDS.md     How to create seeds (manual or factory)
│   └── AGENT-API-PLAN.md     Agent API design doc
│
├── _archive/               ← OLD FILES (reference only, not used)
│
└── render.yaml             ← Render.com deploy config
```

### ⚠️ Where to edit UI files

**Docker serves from `api/public/`** — that is the live code path.

The Dockerfile context is `./api`, so only files inside `api/` reach production.
Always edit `api/public/` for UI changes. The old `site/` directory has been archived.

---

## Quick Start

### Run locally
```bash
cd api
npm install
npm run dev          # Starts API + UI on localhost:3000
```

### Create a seed
```bash
cd seed-factory
npm install

# Option A: Write a YAML narrative
vim narratives/my-topic.yaml
node scripts/validate.js narratives/my-topic.yaml
node scripts/build.js narratives/my-topic.yaml
# → outputs to api/scripts/seeds/my-topic.js (auto-discovered)

# Option B: Gather news from RSS
node scripts/gather.js --out /tmp/raw.json
node scripts/narrate.js --input /tmp/raw.json --name news-week8 --ns news.week8
node scripts/build.js narratives/news-week8.yaml
```

### Deploy
Push to `main` — Render auto-deploys from the Dockerfile.

---

## Key Concepts

- **Entities** — typed nodes: Event, Person, Fact, Claim, Decision, etc.
- **Relations** — directed edges with inference properties (causes, enables, part_of, etc.)
- **Narratives** — named chains of sequenced relations that tell stories
- **Namespaces** — scoped domains that inherit types from parents
- **Temporal** — fuzzy chronology (precision: second → year)
- **Credibility** — confidence levels (verified, high, medium, low, disputed)
- **Datalayer** — source evidence backing entities (articles, reports, etc.)

---

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/overview` | Instance discovery (stats, types, namespaces) |
| `GET /api/entities` | List entities (filterable by namespace) |
| `GET /api/entities/:id?enrich=true` | Entity + relations + sources in one call |
| `GET /api/relations?entity=X&depth=N` | Relation graph traversal |
| `GET /api/narratives` | List all narratives |
| `GET /api/narratives/:ctx` | Narrative story steps |
| `GET /api/search?q=...` | Full-text search |
| `GET /api/path?from=X&to=Y` | Causal path finding |
| `GET /api/namespaces` | Namespace tree |

---

## License

MIT
