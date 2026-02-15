# NOESIS Seed Factory

Pre-deploy tooling for creating, validating, and building NOESIS seed files.

**The `.js` seed files are build artifacts. YAML is the source of truth.**

## Quick Start

```bash
cd seed-factory
npm install

# Build all seeds from YAML → JS
node scripts/build.js --all

# Validate a seed before building
node scripts/validate.js narratives/battle-of-harrisburg.yaml

# Full news pipeline
node scripts/gather.js --out /tmp/raw.json
node scripts/narrate.js --input /tmp/raw.json --name news-week8 --ns news.week8
node scripts/build.js narratives/news-week8.yaml
```

## How It Works

```
YAML (source of truth)  →  build.js  →  .js seed (build artifact)
                                          ↓
                                    api/scripts/seeds/
                                          ↓
                                    init-db.js (auto-discovers)
```

### Three Pipelines

| Pipeline | Input | AI needed? | Use case |
|----------|-------|------------|----------|
| **News** | RSS feeds | No (rule-based clustering) | Weekly news seeds |
| **Knowledge** | YAML written by human/AI | Optional | Historical, technical seeds |
| **Hybrid** | Partial YAML + AI enrichment | Yes | Complex narratives |

## Directory Structure

```
seed-factory/
├── sources.yaml              ← RSS feeds + narrative clustering rules
├── schema/
│   └── narrative.schema.json ← JSON Schema for YAML validation
├── narratives/               ← YAML source files (source of truth)
│   ├── battle-of-harrisburg.yaml
│   └── noesis-system.yaml
├── scripts/
│   ├── gather.js             ← Step 1: fetch RSS → raw JSON
│   ├── narrate.js            ← Step 2: raw JSON → narrative YAML
│   ├── build.js              ← Step 3: YAML → validated .js seed
│   └── validate.js           ← Check YAML before building
└── package.json
```

## Creating a Knowledge Seed

Write a YAML file in `narratives/`:

```yaml
seed:
  name: my-topic
  label: "My Topic — A Description"
  namespace: my-domain

entities:
  - id: thing-one
    type: Event
    name: "Something Happened"
    category: events
    description: "What this event represents"
    temporal: { start: "2024-01-15", precision: day }
    confidence: verified

  - id: thing-two
    type: Person
    name: "Jane Doe"
    category: people
    temporal: { start: "1990", precision: year }
    confidence: high

relations:
  - from: thing-one
    to: thing-two
    type: causes
    description: "How thing-one led to thing-two"

narratives:
  - name: "My Story"
    steps:
      - from: thing-one
        to: thing-two
        type: causes
        description: "The connection between these events"

sources:
  - entity: thing-one
    type: article
    title: "Source Article"
    url: "https://example.com"
    excerpt: "Relevant quote..."
    source_name: Publisher
```

Then build it:

```bash
node scripts/validate.js narratives/my-topic.yaml
node scripts/build.js narratives/my-topic.yaml
```

Output lands in `api/scripts/seeds/my-topic.js` — auto-discovered by `init-db.js`.

## YAML Entity Fields

**Reserved fields** (mapped to DB columns):
- `id` — unique identifier (kebab-case)
- `type` — entity type (Event, Person, Fact, etc.)
- `name` — display name
- `key` — optional cross-namespace identity (e.g. `PERSON:NAPOLEON`)
- `namespace` — override (defaults to `seed.namespace`)
- `temporal` — date string or `{start, end, precision}` object
- `confidence` — verified / high / medium / low / disputed
- `sources_count` — number of backing sources
- `confidence_note` — note on credibility

**Everything else** goes into the `metadata` JSONB column automatically:
- `category` (required) — UI grouping
- `description` — entity description
- Any custom fields: `rank`, `location`, `casualties`, etc.

## Adding News Sources

Edit `sources.yaml`:

```yaml
feeds:
  my-new-source:
    name: My Source
    url: https://example.com/rss
    category: finance.metals
    confidence: high
```

No code changes needed. The gather script reads this config.

## Validation Checks

`validate.js` catches errors before they hit production:

- YAML syntax
- Required fields (id, type, name, category on entities)
- Entity ID uniqueness
- Relation referential integrity (from/to exist)
- Narrative step integrity
- Source entity references
- Type existence in namespace chain
- Confidence level validity
- Temporal precision validity
