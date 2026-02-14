# NOESIS Specification v2.5

**Version**: 2.5.0
**Date**: 2026-02-14
**Status**: Ready for Implementation
**Storage**: PostgreSQL (JSONB for flexible metadata)
**Scope**: Internal tool (single-user, no auth/ownership concerns)

**N**arrative **O**ntology for **E**vidence-based **S**ystems **I**nferencing **S**tructure
*(Greek: νόησις — "understanding", "intellection")*

---

## What NOESIS Means

From Aristotle to modern philosophy, *noēsis* refers to the highest form of knowledge — direct understanding that grasps the essence of things. Not merely data collection, but the synthesis of evidence into coherent narrative understanding.

| Letter | Word | Meaning in NOESIS |
|--------|------|-------------------|
| **N** | **Narrative** | Sequenced stories with actors, events, and causal chains |
| **O** | **Ontology** | Formal classification (configurable per namespace) |
| **E** | **Evidence-based** | Every claim links to source documents |
| **S** | **Systems** | Interconnected graphs, not isolated data |
| **I** | **Inferencing** | Transitive relations enable automated logic |
| **S** | **Structure** | 5-layer architecture |

---

## Core Philosophy

**NOESIS is a "Narrative First" architecture.**

- **Strict Root Ontology:** The `default` namespace contains only logic, no data.
- **Cross-Namespace Linking:** Via the `key` field (The "Soft IDR" approach).
- **Fuzzy Chronology:** Temporal precision allows for broad news timelines (e.g., "Feb 2026").
- **Sequential Relations:** Relations carry narrative weights to tell a story in order.

---

## 5-Layer Architecture

```
┌──────────────────────────────────────────────┐
│ LAYER 5: Presentation │
│ Logic-driven visuals, narrative sequencing │
└──────────────────────────────────────────────┘
▲
┌──────────────────────────────────────────────┐
│ LAYER 4: Datalayer │
│ Source documents, raw evidence │
└──────────────────────────────────────────────┘
▲
┌──────────────────────────────────────────────┐
│ LAYER 3: Temporal (Fuzzy) & Credibility │
│ When (variable precision), how certain │
└──────────────────────────────────────────────┘
▲
┌──────────────────────────────────────────────┐
│ LAYER 2: Namespace │
│ Hierarchy, versioning, type extensions │
└──────────────────────────────────────────────┘
▲
┌──────────────────────────────────────────────┐
│ LAYER 1: Core Ontology │
│ Configurable types, inference registry │
└──────────────────────────────────────────────┘
```

---

## Layer 1: Core Ontology

### Namespace Hierarchy

The **default** namespace is a pure schema definition. It cannot hold entities.

```
default (ROOT NAMESPACE)
│ (Logic & Schema only)
│
├── news (SUB-NAMESPACE)
│ ├── adds types: [Article, Source, Topic]
│ └── CONTAINS ENTITIES
│
├── finance (SUB-NAMESPACE)
│ ├── adds types: [Trade, EarningsReport, Asset]
│ └── CONTAINS ENTITIES
│ └── crypto (NESTED)
│ ├── adds types: [Token, Protocol]
│ └── CONTAINS ENTITIES
```

### Relation Registry & Inferencing (The "I")

Each relation defines its **inference behavior**.

```yaml
default:
relations:
causes:
inverse: caused_by
transitive: true
traversable: true
description: "A produces B. If A causes B and B causes C, A causes C."
part_of:
inverse: has_part
transitive: true
traversable: true
description: "Hierarchy rule. If X is part of Y, X inherits Y's context."
supports:
inverse: supported_by
transitive: false
traversable: false
description: "Evidence rule. Does not pass through to other nodes."
contradicts:
inverse: contradicts
transitive: false
traversable: false
description: "Symmetry rule. If A != B, then B != A."
```

---

## Layer 2: Namespace

### The `key` Field (Soft Identity)

To link "Apple Inc" in `finance` to "Apple" in `news`, we use the optional `key`.

- **`id`**: Unique internal database ID (e.g., `apple-fin-123`).
- **`key`**: A shared identity string (e.g., `TICKER:AAPL` or `URL:apple.com`).

Entities with the same `key` represent the same real-world object seen through different lenses.

---

## Layer 3: Temporal & Credibility

### Temporal Precision (The "Fuzzy" Timeline)

News is rarely precise to the second. v2.5 introduces `precision`.

```yaml
temporal:
timestamp: "2026-02-01T00:00:00Z"
precision: "month" # Options: second, minute, hour, day, month, year
status: completed
```

**Precision Rules for UI:**
- `second`: Render as a specific point.
- `month`: Render as a shaded area or broad block on the timeline.

### Credibility

```yaml
credibility:
confidence: disputed # verified | high | medium | low | disputed
source_count: 5
```

---

## Layer 4: Datalayer

Raw evidence backing the entity.

```yaml
datalayer:
- type: article
url: "https://bloomberg.com/news/1"
excerpt: "The Fed announced a rate hike..."
published_at: "2026-02-14T10:00:00Z"
```

---

## Layer 5: Presentation & Narrative

### Narrative Sequencing

Relations are not just links; they are **steps in a story**.

```yaml
relation:
from: "fed-meeting"
to: "market-crash"
type: "causes"
narrative_sequence: 1 # This happens first in the story
context: "2026 Financial Crisis Narrative"
```

**Presentation Logic:**
- **Visual Path:** Highlighting relations where `context == 'User Selection'`.
- **Chronological Flow:** Sorting nodes by `narrative_sequence` regardless of exact timestamps.

---

## §6. Identity Resolution (IDR) — THE ROADMAP

In v2.5, IDR is handled manually via the `key` field. A dedicated IDR layer is planned for the future to solve the following:

1. **The Oracle Conflict:** When `key:AAPL` in `finance` says "CEO: Tim Cook" but `key:AAPL` in `news` says "CEO: Unknown," the IDR layer will decide which source to trust based on namespace authority.
2. **Probabilistic Matching:** Automatically suggesting that "Elon" and "Elon Musk" share the same `key`.
3. **Canonical Merging:** Creating a "Virtual Node" that merges all attributes from every entity sharing the same `key` for a "God-view" of the data.

---

## Database Schema (v2.5)

### entities
```sql
CREATE TABLE entities (
id TEXT NOT NULL,
version_number INTEGER DEFAULT 1,
is_latest BOOLEAN DEFAULT TRUE,

namespace TEXT NOT NULL,
key TEXT, -- Cross-namespace identity (e.g., TICKER:BTC)
type TEXT NOT NULL, -- Must exist in namespace/default hierarchy

name TEXT NOT NULL,
metadata JSONB DEFAULT '{}', -- {category, aliases, custom_fields}
temporal JSONB DEFAULT '{ "precision": "second" }',
credibility JSONB DEFAULT '{ "confidence": "medium" }',

PRIMARY KEY (id, version_number)
);

CREATE INDEX idx_entities_key ON entities(key) WHERE key IS NOT NULL;
CREATE INDEX idx_entities_namespace_type ON entities(namespace, type);
```

### relations
```sql
CREATE TABLE relations (
id SERIAL PRIMARY KEY,
from_entity TEXT NOT NULL,
to_entity TEXT NOT NULL,
type TEXT NOT NULL, -- causes, part_of, etc.

-- Narrative logic
narrative_sequence INTEGER DEFAULT 0,
context TEXT, -- e.g. "The 2026 Bull Run"

bidirectional BOOLEAN DEFAULT FALSE,
metadata JSONB DEFAULT '{}',
created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_relations_narrative ON relations(context, narrative_sequence);
```

### namespace_configs
```sql
CREATE TABLE namespace_configs (
namespace TEXT PRIMARY KEY,
extends TEXT DEFAULT 'default',
config JSONB DEFAULT '{}' -- {type_hierarchy, relations, colors}
);
```

---

## Example Usage: The "Bitcoin Surge" Narrative

**Entity 1 (news.Article):**
- `id`: `news-001`
- `key`: `https://coindesk.com/btc-95k`
- `temporal`: `{ "timestamp": "2026-02-14", "precision": "day" }`

**Entity 2 (finance.Asset):**
- `id`: `fin-btc`
- `key`: `CRYPTO:BTC`
- `name`: "Bitcoin"

**Relation:**
- `from`: `news-001`
- `to`: `fin-btc`
- `type`: `supports`
- `context`: "February Price Discovery"
- `narrative_sequence`: 1

**Inferencing Query:**
*"Find all news articles that `support` entities which are `part_of` the 'Crypto' category."*
NOESIS uses the **transitive** nature of `part_of` and the `key` links to traverse from a URL to a Market Sector.
