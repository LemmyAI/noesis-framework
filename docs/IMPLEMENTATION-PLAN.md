# NOESIS Implementation Plan

**Date:** 2026-02-15 (updated)
**Status:** API ✅ Complete, Presentation 🔲 Ready to Build
**Storage:** PostgreSQL with JSONB

---

## Project Structure

| Component | Description | Status |
|-----------|-------------|--------|
| **1. Spec/Docs** | Framework documentation | ✅ Done (v2.5) |
| **2. API** | REST API + PostgreSQL (Docker) | ✅ Done & Deployed |
| **3. Presentation** | Explorer SPA (namespace-driven) | 🔲 Ready to Build |

---

## Component 1: Spec/Docs ✅

- `SPEC.md` — Framework specification v2.5
- `DECISIONS.md` — Key decisions and rationale
- `UI-SPEC.md` — Explorer UI specification v2.0
- `CREATING-SEEDS.md` — Guide for creating seed data
- `IMPLEMENTATION-PLAN.md` — This file

---

## Component 2: API ✅

**Deployed:** https://noesis-api.onrender.com
**Service ID:** `srv-d68doot6ubrc73a2o1dg`

### What's Built
- All REST endpoints (entities, relations, namespaces, categories, narratives)
- Read-only API with PostgreSQL JSONB
- Modular seed system (`SEEDS` env var)
- Docker deployment on Render (free tier)
- Database re-seeded on every deploy (no persistent disk)

### Current Seeds
| Seed | Entities | Relations | Description |
|------|----------|-----------|-------------|
| `noesis-system` | 27 | 42 | NOESIS describing itself (meta) |
| `battle-of-harrisburg` | 25 | 26 | Civil War history demo |
| `news-feb14` | 56 | 30 | News from Feb 14, 2026 |

### API Endpoints (Complete)
```
GET /api/entities          (filters: type, namespace, key, category, temporal)
GET /api/entities/:id
GET /api/entities/by-key/:key
GET /api/relations          (filters: entity, type, context, depth, traversable)
GET /api/namespaces         (tree structure)
GET /api/namespaces/:ns/config  (merged with inheritance)
GET /api/categories/tree
GET /api/categories/:parent/children
GET /api/narratives
GET /api/narratives/:context
```

---

## Component 3: Presentation (Explorer SPA)

**Spec:** See `UI-SPEC.md` v2.0

### Core Architecture

**One template, every page.** The URL determines the namespace scope. The breadcrumb IS the navigation.

```
URL                → Namespace  → Content
/                  → (root)     → Top narratives bubbled from all children + child ns cards
/ns/news           → news       → News narratives + entities + child ns cards
/ns/news.week7     → news.week7 → Week 7 narratives + entities
/entity/:id        → (derived)  → Entity detail + mini graph + relations + sources
/narrative/:ctx    → (derived)  → Graph view + Steps view
```

### Implementation Phases

---

#### Phase 1: Scaffold & Routing (3 hours)

**Goal:** Empty SPA with working hash routing, namespace resolution, and breadcrumbs.

- [ ] Create `site/` directory with `index.html`, `app.js`, `style.css`
- [ ] Hash-based router (`#/`, `#/ns/:path`, `#/entity/:id`, `#/narrative/:ctx`, `#/key/:key`)
- [ ] Breadcrumb component — parses namespace path, renders clickable segments
- [ ] API client module — fetch wrapper with base URL detection
- [ ] Namespace config cache — fetch once, resolve inheritance chain client-side
- [ ] Dark theme base CSS — background, card styles, typography, frosted glass

**Deliverable:** Navigable shell that shows correct breadcrumbs for any namespace URL.

---

#### Phase 2: Namespace Page (4 hours)

**Goal:** The universal page template that shows narratives, child namespaces, and entities.

- [ ] **Narrative cards** — fetch from `/api/narratives`, filter by namespace scope
- [ ] **Narrative bubbling** — if current namespace has no narratives, show top from children (ranked by size × recency)
- [ ] **Child namespace cards** — grid of sub-namespaces with entity counts
- [ ] **Entity list** — grouped by type, with type-color left-border accent
- [ ] **Entity cards** — name, type icon, credibility dot, temporal display
- [ ] **Collapse/expand** type groups
- [ ] **Root page** — special case: no entities section, just narratives + children

**Deliverable:** Full browsable namespace tree. Tap into `news`, see its narratives and entities. Tap back to root, see bubbled narratives.

---

#### Phase 3: Entity Detail (3 hours)

**Goal:** Deep dive into a single entity.

- [ ] Breadcrumb extends with entity name
- [ ] Entity header — name, type, namespace, credibility, temporal
- [ ] Description from metadata
- [ ] **Relations list** — grouped by semantic direction (uses inverse names from config)
- [ ] Related entities as tappable cards → navigate to their detail
- [ ] **Datalayer/Sources** — articles with title, source name, excerpt, external link
- [ ] Key display — tappable, links to Key Resolution view

**Deliverable:** Tap any entity, see everything about it, follow connections.

---

#### Phase 4: Graph Engine (5 hours)

**Goal:** Reusable SVG graph renderer with two layout modes.

- [ ] **graph-engine.js** module (~400 lines)
  - `layout(nodes, edges, mode)` → computed positions
  - `render(container, nodes, edges, positions)` → SVG
  - `attachInteractions(svg, callbacks)` → zoom/pan/tap
- [ ] **Layered layout** — for narratives (sequence → X position, spread Y)
- [ ] **Force-directed layout** — for entity graphs (repulsion + springs + center gravity)
- [ ] **Node rendering** — circle with type color, emoji icon, name label
- [ ] **Edge rendering** — directed arrows with relation type labels
- [ ] **Zoom** — pinch (mobile) + scroll-wheel (desktop) via CSS transform
- [ ] **Pan** — pointer drag on SVG background
- [ ] **Tap interaction** — highlight node + edges, show info; double-tap → navigate
- [ ] **Auto-fit** — compute viewBox from actual node positions
- [ ] Scale repulsion/spring with node count (learned from v1.0)

**Deliverable:** Drop-in graph component used by narrative view AND entity detail mini-graph.

---

#### Phase 5: Narrative View (3 hours)

**Goal:** Explore a story as a graph or step-by-step.

- [ ] Breadcrumb: `ν › namespace path › Narrative Name`
- [ ] **Tab toggle** — Graph / Steps
- [ ] **Graph mode** — layered layout via graph engine, narrative_sequence determines flow
- [ ] **Steps mode** — vertical card chain, one relation per step
- [ ] **Timeline bar** — dots for each entity, tappable to center graph
- [ ] Relation descriptions from metadata shown in steps

**Deliverable:** Select a narrative, see its story visually and linearly.

---

#### Phase 6: Entity Mini-Graph & Full Graph (2 hours)

**Goal:** Graph views embedded in entity detail and standalone.

- [ ] **Mini-graph** in entity detail — force-directed, depth=1, center node fixed
- [ ] **"Expand full graph →"** link → standalone graph page
- [ ] **Full graph page** (`#/graph/:id`) — depth=2, force-directed, full screen
- [ ] Graph data from `/api/relations?entity=:id&depth=1|2`

**Deliverable:** Visual context for every entity, expandable to explore freely.

---

#### Phase 7: Key Resolution View (1 hour)

**Goal:** Show cross-namespace identity.

- [ ] Route: `#/key/:encodedKey`
- [ ] Fetch `/api/entities/by-key/:key`
- [ ] List all entities sharing the key, grouped by namespace
- [ ] Each entity card tappable → entity detail

**Deliverable:** The "same thing, different lenses" view.

---

#### Phase 8: Polish & Mobile (3 hours)

**Goal:** Production-ready mobile experience.

- [ ] **Responsive breakpoints** — 1-col (<640), 2-col (640-1024), 3-col (>1024)
- [ ] **Swipe right** → go back
- [ ] **Pull to refresh**
- [ ] **Long press** → preview popup
- [ ] **Loading states** — skeleton cards while fetching
- [ ] **Error states** — graceful "not found" / "no data" messages
- [ ] **Empty namespace** — helpful message ("No entities yet")
- [ ] **Smooth transitions** between views (200-300ms fade/slide)
- [ ] **Performance audit** — verify < 50KB, lazy loading, cached configs

**Deliverable:** Polished, fast, thumb-friendly explorer.

---

#### Phase 9: Docker Integration & Deploy (2 hours)

**Goal:** Site served from the same Docker container as the API.

- [ ] Build step in Dockerfile: copy `site/` → `public/`
- [ ] Express static middleware serves `public/`
- [ ] SPA fallback route (non-API routes → `index.html`)
- [ ] Test locally with `docker-compose up`
- [ ] Push to GitHub → Render auto-deploys
- [ ] Verify live at https://noesis-api.onrender.com

**Deliverable:** Live Explorer at the same URL as the API.

---

### Total Estimated Time

| Phase | Hours |
|-------|-------|
| 1. Scaffold & Routing | 3 |
| 2. Namespace Page | 4 |
| 3. Entity Detail | 3 |
| 4. Graph Engine | 5 |
| 5. Narrative View | 3 |
| 6. Mini/Full Graph | 2 |
| 7. Key Resolution | 1 |
| 8. Polish & Mobile | 3 |
| 9. Docker & Deploy | 2 |
| **Total** | **26 hours** |

---

### API Changes Needed

The existing API is mostly sufficient. Minor additions:

| Change | Why |
|--------|-----|
| `GET /api/narratives?namespace=:ns` | Scope narratives to a namespace (match context prefix or entity namespace) |
| Entity count per namespace in `/api/namespaces` | Avoid N+1 queries for child namespace cards |
| `GET /api/datalayer?entity=:id` | Currently might not exist as its own route |

These are small additions — the schema and data model don't change.

---

### Namespace Structure for News (Example)

Current flat structure:
```
default
├── news          (56 entities, all news)
├── noesis        (meta)
└── history       (civil war)
```

Target hierarchical structure:
```
default
├── news
│   ├── news.week7       (Feb 10-16 stories)
│   ├── news.week8       (Feb 17-23 stories)
│   └── ...
├── noesis               (meta)
└── history
    └── history.civil-war
```

This is a **data change** (moving entities to child namespaces), not a code change. Can be done by updating seed files.

---

### File Structure

```
noesis-framework/
├── docs/
│   ├── SPEC.md
│   ├── UI-SPEC.md           ← v2.0
│   ├── IMPLEMENTATION-PLAN.md  ← this file
│   ├── DECISIONS.md
│   └── CREATING-SEEDS.md
├── api/                      ← Component 2 (done)
│   ├── src/
│   ├── scripts/
│   │   ├── init-db.js
│   │   └── seeds/
│   ├── Dockerfile
│   └── package.json
└── site/                     ← Component 3 (to build)
    ├── index.html
    ├── app.js
    ├── style.css
    └── graph-engine.js
```

---

## Next Steps

1. ~~Build API~~ ✅
2. ~~Deploy to Render~~ ✅
3. ~~Create seed system~~ ✅
4. **Build Explorer SPA** ← START HERE (Phase 1)
5. Deploy Explorer in same container
6. Iterate on seeds (more news weeks, more domains)
