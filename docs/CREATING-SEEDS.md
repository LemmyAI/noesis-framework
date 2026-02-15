# Creating NOESIS Seed Files

> **Recommended:** Use the **Seed Factory** (`seed-factory/`) to create seeds from YAML.
> It handles SQL escaping, validation, and generates the `.js` files for you.
> See [`seed-factory/README.md`](../seed-factory/README.md) for the YAML-driven workflow.
>
> The manual approach below still works but is more error-prone.

---

A seed file populates the database with a knowledge graph about a topic. This guide tells you exactly how to make one.

## Overview

A seed is a single JavaScript file in `api/scripts/seeds/` that exports a function.
Seeds are **auto-discovered** — any `.js` file in `api/scripts/seeds/` is picked up by `init-db.js` automatically (no registration needed).

The function receives a PostgreSQL client and inserts data into 4 tables:

1. **namespace_configs** — Define your domain (custom types, colors)
2. **entities** — The nodes in your graph (people, events, facts, etc.)
3. **relations** — The edges between nodes (causes, part_of, supports, etc.)
4. **datalayer** — Source evidence backing your entities (URLs, excerpts)

## File Structure

```
api/scripts/seeds/
├── my-seed-name.js      ← your new file
├── noesis-system.js      ← example: NOESIS describing itself
└── battle-of-harrisburg.js  ← example: Civil War battle
```

## Minimal Template

Copy this and fill in the blanks:

```javascript
/**
 * Seed: [YOUR TOPIC NAME]
 * Namespace: [your-namespace]
 * [One sentence describing what this seed covers]
 */
module.exports = async function seed(client) {
  console.log('  Seeding: [Your Topic Name]...');

  // 1. NAMESPACE — Define your domain
  await client.query(`
    INSERT INTO namespace_configs (namespace, extends, config) VALUES
    ('your-namespace', 'default', '{
      "added_types": ["MyType1", "MyType2"],
      "type_hierarchy": {
        "MyType1": {"parent": "Event"},
        "MyType2": {"parent": "Concept"}
      },
      "colors": {
        "types": {
          "MyType1": "#C62828",
          "MyType2": "#1565C0"
        }
      }
    }'::jsonb)
    ON CONFLICT (namespace) DO NOTHING
  `);

  // 2. ENTITIES — The nodes
  await client.query(`
    INSERT INTO entities (id, namespace, type, name, key, metadata, temporal, credibility) VALUES
    ('entity-1', 'your-namespace', 'Event', 'Something Happened', 'EVENT:SOMETHING',
      '{"category": "events", "description": "What this entity represents"}',
      '{"timestamp": "2024-01-15T00:00:00Z", "precision": "day"}',
      '{"confidence": "verified"}'),

    ('entity-2', 'your-namespace', 'Person', 'Jane Doe', 'PERSON:JANE-DOE',
      '{"category": "people", "role": "Protagonist"}',
      '{"timestamp": "1990-01-01T00:00:00Z", "precision": "year"}',
      '{"confidence": "high"}')
  `);

  // 3. RELATIONS — The edges
  await client.query(`
    INSERT INTO relations (from_entity, to_entity, type, narrative_sequence, context, metadata) VALUES
    ('entity-1', 'entity-2', 'causes', 1, 'My Narrative Name',
      '{"description": "How entity-1 led to entity-2"}'),

    ('entity-2', 'entity-1', 'part_of', 0, NULL, '{}')
  `);

  // 4. DATALAYER — Source evidence
  await client.query(`
    INSERT INTO datalayer (entity_id, source_type, title, url, excerpt, source_name, published_at) VALUES
    ('entity-1', 'article', 'Source Title', 'https://example.com/article',
      'Relevant excerpt from the source...',
      'Publisher Name', '2024-01-15T00:00:00Z')
  `);

  console.log('  ✓ Your Topic: X entities, Y relations, Z sources');
};
```

## Registering Your Seed

Seeds are **auto-discovered** from `api/scripts/seeds/`. Just drop your `.js` file there — no registration needed.

Use the `SEEDS` environment variable to control which seeds load:

```bash
SEEDS=all                              # everything (default)
SEEDS=none                             # empty database, schema only
SEEDS=my-seed-name                     # just yours
SEEDS=noesis-system,my-seed-name       # comma-separated list
```

---

## Detailed Field Reference

### Table: namespace_configs

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `namespace` | TEXT | Yes | Unique name. Use dots for hierarchy: `history.civil-war` extends `history` |
| `extends` | TEXT | Yes | Parent namespace. Use `'default'` for top-level domains |
| `config` | JSONB | Yes | Configuration object (see below) |

**Config object:**

```jsonc
{
  // Types this namespace adds ON TOP of its parent
  "added_types": ["Battle", "Campaign"],

  // Each added type must declare a parent from the default types or parent namespace types
  "type_hierarchy": {
    "Battle": {"parent": "Event"},     // Battle IS-A Event
    "Campaign": {"parent": "Event"}    // Campaign IS-A Event
  },

  // Colors for your custom types (hex codes)
  "colors": {
    "types": {
      "Battle": "#C62828",
      "Campaign": "#E65100"
    }
  }
}
```

**Default types you can use as parents** (already defined in the `default` namespace):
- `Event` — something that happened
- `Decision` — a choice that was made
- `Fact` — an established truth
- `Claim` — an assertion (may be disputed)
- `System` — a structure or mechanism
- `Goal` — an objective or aim
- `Concept` — an idea or category
- `Person` — a human being
- `Organization` — a group, company, government, etc.

You DO NOT need to create a custom namespace if the default types are enough. Just use `'default'` as the namespace in your entities.

### Table: entities

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | TEXT | Yes | Unique identifier. Use kebab-case: `gold-ath-2026`, `battle-harrisburg` |
| `namespace` | TEXT | Yes | Which namespace this belongs to |
| `type` | TEXT | Yes | Entity type. Must exist in the namespace or its parent chain |
| `name` | TEXT | Yes | Human-readable display name |
| `key` | TEXT | No | Cross-namespace identity. Format: `TYPE:IDENTIFIER`. Same key = same real-world thing |
| `metadata` | JSONB | Yes | Freeform data. MUST include `"category"` for UI grouping |
| `temporal` | JSONB | Yes | When this entity exists/happened (see Temporal below) |
| `credibility` | JSONB | Yes | How trustworthy this entity is (see Credibility below) |

**Entity IDs:**
- Use kebab-case: `battle-harrisburg`, `person-napoleon`, `fact-earth-round`
- Must be unique across ALL namespaces (they share one table)
- Prefix with your topic if there could be collisions: `cw-smith` not just `smith`

**The `key` field (Soft IDR):**
- Optional but powerful. Enables cross-namespace identity.
- Format: `CATEGORY:IDENTIFIER` — e.g., `PERSON:NAPOLEON`, `CRYPTO:BTC`
- If two entities in different namespaces share a key, the UI can link them
- Only use if the entity represents something that might appear in other seeds

**The `metadata` field:**
- MUST contain `"category"` — used by the UI for grouping and filtering
- Use dot notation for sub-categories: `"category": "people.commanders"`
- Everything else is freeform — add whatever describes your entity
- The `"description"` field is shown in entity detail views

**Examples of good metadata:**
```jsonc
// Person
{"category": "people.commanders", "rank": "General", "side": "Union", "role": "Commander"}

// Event
{"category": "events.battle", "description": "The main assault on the fortified position", "casualties": 500}

// Concept
{"category": "concepts.strategy", "description": "Flanking maneuver to encircle the enemy"}
```

### Temporal

Every entity needs a `temporal` JSONB object:

```jsonc
{"timestamp": "1864-07-14T10:00:00Z", "precision": "hour"}      // specific hour
{"timestamp": "1864-07-14T00:00:00Z", "precision": "day"}        // specific day
{"timestamp": "1864-07-01T00:00:00Z", "precision": "month"}      // sometime in July 1864
{"timestamp": "1864-01-01T00:00:00Z", "precision": "year"}       // sometime in 1864
{"timestamp": "2026-02-14T19:30:00Z", "precision": "second"}     // exact moment
```

**Precision levels:** `second`, `minute`, `hour`, `day`, `month`, `year`

For events with duration, add `end_timestamp`:
```jsonc
{"timestamp": "1864-07-14T00:00:00Z", "end_timestamp": "1864-07-15T23:59:59Z", "precision": "day"}
```

### Credibility

Every entity needs a `credibility` JSONB object:

```jsonc
{"confidence": "verified"}                    // proven, established fact
{"confidence": "verified", "source_count": 4} // verified with 4 sources
{"confidence": "high"}                        // strong evidence, widely accepted
{"confidence": "medium"}                      // reasonable but not confirmed
{"confidence": "low"}                         // weak evidence
{"confidence": "disputed"}                    // actively contested
{"confidence": "medium", "note": "Debated among historians"}  // with explanation
```

**Confidence levels** are defined in the `default` namespace config under `colors.credibility`. The presentation layer reads them from there — it has NO hardcoded knowledge of what levels exist.

### Table: relations

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `from_entity` | TEXT | Yes | Source entity ID |
| `to_entity` | TEXT | Yes | Target entity ID |
| `type` | TEXT | Yes | Relation type (see below) |
| `narrative_sequence` | INTEGER | Yes | Step number in a narrative (0 = not part of a narrative) |
| `context` | TEXT | No | Narrative name. All relations with the same context form one story |
| `metadata` | JSONB | Yes | MUST include `"description"` explaining WHY this relation exists |

**Default relation types:**

| Type | Inverse | Transitive | Meaning |
|------|---------|------------|---------|
| `causes` | `caused_by` | Yes | A leads to B. If A→B→C, then A→C |
| `enables` | `enabled_by` | No | A makes B possible |
| `prevents` | `prevented_by` | No | A stops B from happening |
| `part_of` | `has_part` | Yes | A belongs to B. If A∈B∈C, then A∈C |
| `follows` | `preceded_by` | No | A comes after B in sequence |
| `depends_on` | `required_for` | No | A requires B to exist/work |
| `contradicts` | `contradicts` | No | A and B cannot both be true (symmetric) |
| `supports` | `supported_by` | No | A provides evidence for B |

**Creating a Narrative:**

A narrative is a chain of relations that share the same `context` string and have sequential `narrative_sequence` numbers. The UI renders these as a step-by-step story.

```sql
-- Step 1: The railroad was crucial
('railroad', 'campaign', 'enables', 1, 'My Story Name',
  '{"description": "The supply line was the lifeline of the campaign"}'),
-- Step 2: Enemy threatened it
('enemy', 'railroad', 'prevents', 2, 'My Story Name',
  '{"description": "Confederate raids threatened to cut the supply line"}'),
-- Step 3: Union responds
('union-force', 'enemy', 'prevents', 3, 'My Story Name',
  '{"description": "A Union force was dispatched to neutralize the threat"}')
```

**Rules for narratives:**
- `narrative_sequence` starts at 1 and increments
- `context` is the narrative name — displayed as the title in the UI
- Every narrative relation MUST have a `description` in metadata
- The same entities can appear in multiple narratives
- Non-narrative relations use `narrative_sequence: 0` and `context: NULL`

### Table: datalayer

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `entity_id` | TEXT | Yes | Which entity this source backs |
| `source_type` | TEXT | Yes | Type of source (see below) |
| `title` | TEXT | No | Human-readable title |
| `url` | TEXT | No | Link to the source |
| `excerpt` | TEXT | No | Key quote or excerpt |
| `source_name` | TEXT | No | Publisher/organization |
| `published_at` | TIMESTAMPTZ | No | When the source was published |

**Common source types:** `article`, `report`, `primary_source`, `secondary_source`, `encyclopedia`, `specification`, `reference`, `interview`, `dataset`, `preservation`

---

## Tips & Common Mistakes

### DO ✅
- Use `ON CONFLICT (namespace) DO NOTHING` for namespace inserts (avoids duplicates if seeds overlap)
- Put a `"category"` in every entity's metadata
- Put a `"description"` in every relation's metadata
- Give your narrative a clear, descriptive `context` name
- Use consistent ID prefixes to avoid collisions between seeds
- Include at least one datalayer source per major entity
- Test with `SEEDS=my-seed-name` before combining with others

### DON'T ❌
- Don't use entity IDs that could collide with other seeds (e.g. `event-1` — too generic)
- Don't forget the trailing comma between SQL value rows (syntax error)
- Don't put single quotes inside JSON strings — use `''` (SQL escape) or avoid them
- Don't reference entity IDs in relations that don't exist in your entities
- Don't set `narrative_sequence` without a `context` (the step has no story to belong to)
- Don't set `context` without a `narrative_sequence > 0` (the story has no order)
- Don't hardcode type colors that conflict with the parent namespace

### SQL Gotchas
- Single quotes in strings must be doubled: `'Forrest''s Cavalry'`
- JSONB strings must be valid JSON: wrap in `'{...}'::jsonb`
- Commas: last row in a VALUES block must NOT have a trailing comma
- Comments in SQL use `--` (double dash)

---

## Testing Your Seed Locally

```bash
# Set up local PostgreSQL and run just your seed
cd api
export DATABASE_URL=postgresql://noesis:noesis@localhost:5432/noesis
export SEEDS=my-seed-name
node scripts/init-db.js

# Verify
psql $DATABASE_URL -c "SELECT COUNT(*) FROM entities WHERE namespace = 'your-namespace'"
psql $DATABASE_URL -c "SELECT context, COUNT(*) FROM relations WHERE context IS NOT NULL GROUP BY context"
```

Or with Docker:
```bash
docker build -t noesis-test .
docker run -e SEEDS=my-seed-name -p 3000:3000 noesis-test
# Visit http://localhost:3000
```

---

## Checklist Before Submitting

- [ ] File is in `api/scripts/seeds/` and exports an async function taking `client`
- [ ] Function name in the JSDoc comment matches the file name
- [ ] Namespace has `ON CONFLICT DO NOTHING`
- [ ] All entity IDs are unique and won't collide with other seeds
- [ ] Every entity has `category` in metadata
- [ ] Every entity has `temporal` and `credibility`
- [ ] Every relation has `description` in metadata
- [ ] Narrative relations have both `context` and `narrative_sequence > 0`
- [ ] Non-narrative relations have `narrative_sequence: 0` and `context: NULL`
- [ ] At least one datalayer source exists
- [ ] No trailing commas on the last SQL row
- [ ] Single quotes are properly escaped (`''`)
- [ ] Seed registered in `init-db.js` → `AVAILABLE_SEEDS`
- [ ] Runs without errors: `SEEDS=my-seed-name node scripts/init-db.js`
- [ ] `console.log` at end reports correct counts
