# NOESIS Seed Factory

Pre-deploy tooling for creating, validating, and building NOESIS seed files.

**The `.js` seed files are build artifacts. YAML is the source of truth.**

## Quick Start

```bash
cd seed-factory
npm install

# ===== DAILY NEWS (one command) =====
node scripts/daily-news.js                     # Today's news
node scripts/daily-news.js --date 2026-02-15   # Specific date
node scripts/daily-news.js --dry-run           # Preview only

# ===== BUILD existing seeds from YAML =====
node scripts/build.js --all
node scripts/build.js narratives/battle-of-harrisburg.yaml

# ===== VALIDATE before building =====
node scripts/validate.js narratives/battle-of-harrisburg.yaml

# ===== MANUAL news pipeline (full control) =====
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

### Four Pipelines

| Pipeline | Script | AI needed? | Use case |
|----------|--------|------------|----------|
| **Daily News** | `daily-news.js` | **No** | One-command daily news seed |
| **Manual News** | `gather.js` → `narrate.js` → `build.js` | No | Custom date range / filtering |
| **Knowledge** | Write YAML → `validate.js` → `build.js` | Optional | Historical, technical seeds |
| **Hybrid** | Partial YAML + AI enrichment | Yes | Complex narratives |

## Daily News Pipeline

**The simplest way to generate a news seed.** One command, no AI, no manual steps.

```bash
cd seed-factory
node scripts/daily-news.js
```

This will:
1. Fetch all RSS feeds from `sources.yaml`
2. Filter to only today's stories
3. Cluster into narratives (keyword rules)
4. Validate the YAML
5. Build the `.js` seed file

### Namespace Hierarchy

Daily seeds nest inside weekly namespaces:

```
news                              ← parent (shows ALL news)
├── news.week7                    ← aggregates week 7 dailies
│   ├── news.week7.day-2026-02-10
│   ├── news.week7.day-2026-02-11
│   └── ...
├── news.week8                    ← aggregates week 8 dailies
│   ├── news.week8.day-2026-02-17
│   └── ...
```

The Explorer UI bubbles narratives up: `news.week8` shows all its daily stories, and `news` shows everything.

### Options

| Flag | Default | Description |
|------|---------|-------------|
| `--date YYYY-MM-DD` | today | Override target date |
| `--limit N` | 10 | Max stories per RSS feed |
| `--dry-run` | off | Preview without writing files |
| `--keep-tmp` | off | Keep intermediate JSON files |

### After Running

The seed file is generated but **not deployed**. To deploy:

```bash
cd ~/projects/noesis-framework
git add api/scripts/seeds/news-week*-day-*.js
git add seed-factory/narratives/news-week*-day-*.yaml
git commit -m "seed: daily news YYYY-MM-DD"
git push origin main
# Render auto-deploys from main branch
```

### Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| "No stories found for this date" | RSS feeds haven't published yet or date is old | Try later, or use `--date` for today |
| 0 stories gathered | Network issue or feeds are down | Check internet, try `--limit 5` |
| Validation errors | Malformed RSS data | Check the YAML in `narratives/`, fix manually |

## Directory Structure

```
seed-factory/
├── sources.yaml              ← RSS feeds + narrative clustering rules
├── .tmp/                     ← Temp files (auto-created, gitignored)
├── schema/
│   └── narrative.schema.json ← JSON Schema for YAML validation
├── narratives/               ← YAML source files (source of truth)
│   ├── battle-of-harrisburg.yaml
│   └── noesis-system.yaml
├── scripts/
│   ├── daily-news.js         ← ⭐ ONE-COMMAND daily news pipeline
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
