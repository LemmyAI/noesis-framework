# NOESIS Explorer — UI Specification

**Version:** 1.0
**Date:** 2026-02-14
**Status:** Ready for Implementation

---

## 1. Overview

The NOESIS Explorer is a **mobile-first, data-agnostic** single-page application for exploring any NOESIS knowledge graph. It reads all structure (namespaces, types, colors, relations) from the API at runtime — no hardcoded entity types, names, or layouts.

**Guiding principle:** The UI is a *lens* on the data, not a dashboard. It should feel like navigating a living knowledge map — tap a node, see its world, follow a thread, go deeper.

---

## 2. Architecture

```
Docker Container
├── Express API ──────── /api/*    (existing, moved under /api prefix)
└── Static SPA ──────── /*        (NOESIS Explorer)
    ├── index.html
    ├── app.js           (vanilla JS or lightweight framework)
    └── style.css        (mobile-first CSS, no heavy framework)
```

**Tech stack:**
- **Vanilla JS + CSS** (no React/Vue/Angular — keep the bundle tiny)
- **CSS custom properties** for theming (colors pulled from namespace config)
- All data fetched from `/api/*` endpoints at runtime
- Single HTML file with JS modules — no build step needed
- Works on phones, tablets, desktop (responsive, not adaptive)

**Why vanilla:** The app is a read-only explorer. No forms, no complex state. Vanilla JS keeps it fast, small, and dependency-free.

---

## 3. Visual Language

### 3.1 Design System

| Element | Treatment |
|---------|-----------|
| **Background** | Near-black (`#0D0D0F`) — content glows against it |
| **Cards** | Frosted glass (`backdrop-filter: blur`) with subtle border |
| **Type colors** | Pulled from namespace config `colors.types` — used as left-border accent on cards and as node dot colors |
| **Typography** | System font stack, clean and readable. Entity names bold, metadata subtle |
| **Spacing** | Generous padding on mobile (thumb-friendly tap targets, min 48px) |
| **Transitions** | Smooth slide/fade between views (200-300ms) |
| **Icons** | Unicode/emoji only (no icon font dependency) — types get semantic icons: Event→⚡, Person→👤, Claim→💬, Fact→✓, etc. |

### 3.2 Color Philosophy

Entity type colors come from the API (`/api/namespaces/:ns/config → colors.types`). The UI merges the inheritance chain (default → parent → child namespace) to resolve colors for any type. Unknown types get a neutral gray.

### 3.3 Credibility Indicators

| Confidence | Visual |
|------------|--------|
| verified | Green dot ● |
| high | Blue dot ● |
| medium | Yellow dot ● |
| low | Orange dot ● |
| disputed | Red dot ● with "disputed" badge |

### 3.4 Temporal Precision

| Precision | Display |
|-----------|---------|
| second | `Feb 14, 2026 19:00:00` |
| minute | `Feb 14, 2026 19:00` |
| hour | `Feb 14, 2026 19h` |
| day | `Feb 14, 2026` |
| month | `February 2026` |
| year | `2026` |

---

## 4. Navigation Model

The app has **four levels of depth**, navigable by tapping forward and swiping/tapping back:

```
[Home]  →  [Namespace]  →  [Entity]  →  [Related Entity]
                                    ↕
                              [Narrative Player]
```

A persistent **breadcrumb bar** at the top shows the current path and allows jumping back to any level. On mobile, this is a horizontal scrollable row.

A **namespace pill bar** is always visible below the header, showing all available namespaces as tappable pills. The active one is highlighted. Tapping switches context without losing position where possible.

---

## 5. Views

### 5.1 Home View (`/`)

**Purpose:** Orient the user. Show what's in this NOESIS instance.

**Layout:**
```
┌─────────────────────────────────┐
│  ν NOESIS Explorer              │  ← branding, subtle
├─────────────────────────────────┤
│  [default] [news] [finance] ... │  ← namespace pills
├─────────────────────────────────┤
│                                 │
│  📖 Narratives                  │  ← section header
│  ┌───────────────────────────┐  │
│  │ ⚡ February 2026 Rally    │  │  ← narrative card
│  │ 9 steps · 8 entities      │  │
│  │ [Explore Story →]         │  │
│  └───────────────────────────┘  │
│                                 │
│  🗂 Namespaces                  │  ← section header
│  ┌──────────┐ ┌──────────┐     │
│  │ 📰 news  │ │ 💰 finance│    │  ← namespace cards (grid)
│  │ 12 items │ │ 10 items  │    │
│  └──────────┘ └──────────┘     │
│  ┌──────────┐ ┌──────────┐     │
│  │ 🌍 geo   │ │ ₿ crypto │    │
│  │ 1 item   │ │ 3 items  │    │
│  └──────────┘ └──────────┘     │
│                                 │
│  🔍 Recent Entities             │  ← latest entities across all ns
│  ┌───────────────────────────┐  │
│  │ ⚡ Gold Breaks ATH        │  │
│  │ Event · finance · Feb 10  │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ 📰 Bitcoin Tumbles...     │  │
│  │ Article · news · Feb 3    │  │
│  └───────────────────────────┘  │
│  ...                            │
└─────────────────────────────────┘
```

**Data sources:**
- `GET /api/narratives` → narrative cards
- `GET /api/namespaces` → namespace grid with entity counts from `GET /api/entities?namespace=X`
- `GET /api/entities` → recent entities (sorted by temporal timestamp descending)

**Interactions:**
- Tap namespace card → Namespace View
- Tap narrative card → Narrative Player
- Tap entity card → Entity Detail View

---

### 5.2 Namespace View (`/ns/:namespace`)

**Purpose:** Browse everything in a namespace, organized by type.

**Layout:**
```
┌─────────────────────────────────┐
│ ← Home / news                   │  ← breadcrumb
├─────────────────────────────────┤
│  [default] [news•] [finance]    │  ← active namespace highlighted
├─────────────────────────────────┤
│                                 │
│  About this namespace           │
│  Extends: default               │
│  Types: Article, Source, Topic  │
│                                 │
│  ── Article (6) ──────────────  │  ← type group header with color
│  ┌───────────────────────────┐  │
│  │ 📰 Gold Surges to Record  │  │
│  │ ● verified · Feb 10       │  │
│  │ Bloomberg                  │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ 📰 Bitcoin Tumbles...     │  │
│  │ ● verified · Feb 3        │  │
│  │ CoinDesk                   │  │
│  └───────────────────────────┘  │
│  ...                            │
│                                 │
│  ── Source (3) ───────────────  │
│  ┌───────────────────────────┐  │
│  │ 🏢 Bloomberg              │  │
│  │ ● verified · wire_service  │  │
│  └───────────────────────────┘  │
│  ...                            │
└─────────────────────────────────┘
```

**Data sources:**
- `GET /api/namespaces/:ns/config` → merged config (types, colors)
- `GET /api/entities?namespace=:ns` → entities grouped by type client-side

**Interactions:**
- Tap entity card → Entity Detail View
- Tap type header → collapse/expand group
- Namespace pills switch context

---

### 5.3 Entity Detail View (`/entity/:id`)

**Purpose:** Deep dive into a single entity — its metadata, timeline position, credibility, relations, and source evidence.

**Layout:**
```
┌─────────────────────────────────┐
│ ← news / Gold Surges to Record  │  ← breadcrumb
├─────────────────────────────────┤
│                                 │
│  ⚡ Gold Breaks All-Time High   │  ← entity name (large)
│  Above $2,900                   │
│  ──────────────────────────     │
│  Event · finance                │  ← type + namespace
│  ● verified · Feb 10, 2026     │  ← credibility + date
│  🔑 EVENT:GOLD-ATH-FEB26       │  ← key (if present)
│                                 │
│  ┌─ Metadata ─────────────────┐ │
│  │ category: events.market     │ │
│  │ impact: high                │ │
│  │ price: $2,900+              │ │
│  └─────────────────────────────┘ │
│                                 │
│  ─── Relations (10) ──────────  │
│                                 │
│  CAUSED BY                      │  ← relation group
│  ┌───────────────────────────┐  │
│  │ → US Announces 25% Tariffs│  │  ← linked entity
│  │   causes · Policy · geo   │  │
│  │   "February 2026 Rally"   │  │  ← narrative context
│  └───────────────────────────┘  │
│                                 │
│  ENABLED BY                     │
│  ┌───────────────────────────┐  │
│  │ → Fed Holds Rates         │  │
│  │   enables · Event         │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ → ECB Cuts Rates          │  │
│  │   enables · Event         │  │
│  └───────────────────────────┘  │
│                                 │
│  CAUSES                         │
│  ┌───────────────────────────┐  │
│  │ → Silver Rallies Past $33 │  │
│  │   causes · Event          │  │
│  └───────────────────────────┘  │
│                                 │
│  SUPPORTED BY                   │
│  ┌───────────────────────────┐  │
│  │ → Central Bank Gold Buying│  │
│  │ → CPI Hot at 3.0%         │  │
│  │ → Bloomberg Article        │  │
│  └───────────────────────────┘  │
│                                 │
│  ─── Sources (2) ─────────────  │
│  ┌───────────────────────────┐  │
│  │ 📄 Gold Surges to Record  │  │
│  │ Bloomberg · Feb 10         │  │
│  │ "Gold prices surged past   │  │
│  │  $2,900 an ounce..."      │  │
│  │ [Open Source ↗]            │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

**Data sources:**
- `GET /api/entities/:id` → entity data
- `GET /api/relations?entity=:id&depth=1` → direct relations
- `GET /api/datalayer/by-entity/:id` → source evidence

**Relation display logic:**
Relations are grouped by their **semantic direction** relative to the current entity:
- If this entity is the `to_entity` → use the **inverse** relation name (from namespace config)
- If this entity is the `from_entity` → use the forward relation name
- Group by relation type, show the linked entity as a tappable card

**Interactions:**
- Tap any related entity → navigate to its Entity Detail View (push onto breadcrumb)
- Tap source link → open URL in new tab
- Tap namespace pill on the entity → jump to that namespace view
- Tap key → show all entities sharing this key (IDR cross-reference)

---

### 5.4 Narrative View (`/narrative/:context`)

**Purpose:** Understand a story — both the big picture and the details.

Two modes, toggled by tabs at the top: **Graph** (default) and **Steps**.

#### 5.4a Graph Mode (default)

A visual node-and-edge diagram showing the entire narrative at once.

```
┌─────────────────────────────────┐
│ ← Home / February 2026 Rally    │
├─────────────────────────────────┤
│  [● Graph]  [≡ Steps]           │  ← mode toggle
├─────────────────────────────────┤
│                                 │
│   ┌──────┐    causes    ┌────┐ │
│   │Tariff├─────────────→│ BTC│ │
│   │ ⚔️   ├──┐           │ ⚡ │ │
│   └──────┘  │  causes   └────┘ │
│             │                   │
│             ▼       enables     │
│        ┌───────┐◄──────┌─────┐ │
│        │ Gold  │       │ Fed │ │
│        │  ATH  │◄──────│  ⚡ │ │
│        │  ⚡   │enables└─────┘ │
│        └───┬───┘◄──┐          │
│            │   ┌────┘          │
│    causes  │   │supports       │
│            ▼   │               │
│        ┌──────┐  ┌──────┐      │
│        │Silver│  │ CPI  │      │
│        │  ⚡  │  │  ⚡  │      │
│        └──────┘  └──────┘      │
│                                 │
│  ── Timeline ──────────────────  │
│  Jan29 ●──●──●────●────●──● Feb│
│  Fed  ECB Tar BTC Gold CPI Slvr│
│                                 │
└─────────────────────────────────┘
```

**Layout algorithm:** Layered/hierarchical (not force-directed) — positions nodes by `narrative_sequence` horizontally, with vertical spread to avoid overlap. This preserves the story's causal flow direction (left → right = cause → effect). Falls back to force-directed for non-narrative entity graphs.

**Node rendering (SVG):**
- Circle with type color fill (from namespace config)
- Type icon (emoji) inside
- Entity name label below
- Size: 48px diameter minimum (thumb-friendly)
- Selected node: glow ring + enlarged

**Edge rendering (SVG):**
- Directed arrow (line + arrowhead)
- Labeled with relation type at midpoint
- Color: subtle gray default, highlighted on tap
- Dashed line for `contradicts` relations
- Thicker line for narrative-sequenced relations

**Interactions:**
- **Tap node** → highlight it + all its edges, show info tooltip
- **Double-tap / tap highlighted node** → navigate to Entity Detail
- **Tap edge** → show relation details (type, description, context)
- **Pinch-zoom** → zoom graph in/out (mobile)
- **Scroll-wheel** → zoom (desktop)
- **Drag** → pan the viewport
- **Drag node** → reposition it (optional, nice-to-have)
- **Timeline dots** → tap to center graph on that entity

#### 5.4b Steps Mode

The linear step-by-step walkthrough.

```
┌─────────────────────────────────┐
│  [● Graph]  [≡ Steps•]          │  ← steps active
├─────────────────────────────────┤
│                                 │
│  ┌─ Step 1 ───────────────────┐ │
│  │ US Announces 25% Tariffs   │ │
│  │         │                   │ │
│  │     causes                  │ │
│  │         ↓                   │ │
│  │ Bitcoin Drops to $95K      │ │
│  │                             │ │
│  │ "Tariff announcement       │ │
│  │  triggers risk-off..."     │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─ Step 2 ───────────────────┐ │
│  │ US Announces 25% Tariffs   │ │
│  │     causes →               │ │
│  │ Gold Breaks ATH            │ │
│  │ "Trade war fears drive     │ │
│  │  safe-haven buying..."     │ │
│  └─────────────────────────────┘ │
│  ...                            │
└─────────────────────────────────┘
```

**Features:**
- Steps rendered as vertical chain cards
- Entities within steps are tappable → Entity Detail
- Relation description shown from `metadata.description`

**Data source (both modes):** `GET /api/narratives/:context`

---

### 5.5 Entity Graph (embedded in Entity Detail)

When viewing an entity, a **mini force-directed graph** appears showing the entity at center with its direct relations radiating outward. This is a smaller, simpler version of the narrative graph.

```
┌─────────────────────────────────┐
│  ⚡ Gold Breaks ATH              │
│  Event · finance · Feb 10       │
├─────────────────────────────────┤
│                                 │
│       Fed ⚡─enables─┐          │
│                      ▼          │
│  Tariff ⚔️──causes──● GOLD ●   │  ← current entity (larger, glowing)
│                      │  ATH     │
│       ECB ⚡─enables─┘  │      │
│                    causes│      │
│                         ▼      │
│                    Silver ⚡    │
│                                 │
│  [Expand full graph →]          │  ← opens standalone graph view
│                                 │
├─────────────────────────────────┤
│  ─── Relations (detail list) ── │
│  ...                            │
└─────────────────────────────────┘
```

**Layout:** Simple force-directed (radial). Center node is fixed, neighbors orbit around it. Spring forces keep edges short, repulsion prevents overlap.

**Interactions:**
- Tap neighbor node → navigate to that entity
- "Expand full graph" → standalone full-screen graph view with depth=2 traversal
- Pinch/scroll to zoom

---

### 5.6 Full Entity Graph (`/graph/:id`)

A standalone full-screen graph view for any entity, showing depth=2 relations. Same rendering engine as the narrative graph but using force-directed layout instead of layered.

**Data source:** `GET /api/relations?entity=:id&depth=2`

This is the "explore freely" mode — no narrative structure, just follow connections wherever they lead.

---

### 5.5 Key Resolution View (`/key/:key`)

**Purpose:** Show all entities sharing a cross-namespace key (the IDR lens).

**Layout:**
```
┌─────────────────────────────────┐
│ 🔑 COMMODITY:GOLD               │
│ Found in 1 namespace             │
├─────────────────────────────────┤
│  ┌───────────────────────────┐  │
│  │ 💰 Gold (XAU/USD)         │  │
│  │ Asset · finance            │  │
│  │ "The same entity seen     │  │
│  │  through the finance lens" │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

**Data source:** `GET /api/entities/by-key/:key`

Small but important view — demonstrates the cross-namespace identity concept.

---

## 6. Mobile-First Specifics

### Gestures
- **Swipe right** on Entity Detail → go back
- **Pull down** on any list → refresh data
- **Long press** entity card → preview popup (name, type, confidence)

### Breakpoints
| Width | Layout |
|-------|--------|
| < 640px | Single column, full-width cards, stacked namespace pills |
| 640-1024px | Two-column grid for namespace cards, side padding |
| > 1024px | Three-column grid, max-width container (1200px), centered |

### Performance
- No external dependencies (no CDN calls)
- All CSS inline or single file
- Lazy-load relation and datalayer data on Entity Detail (don't fetch until viewed)
- Namespace configs cached client-side after first fetch
- Total bundle target: < 50KB (HTML + CSS + JS)

---

## 7. URL Routing (Hash-based)

```
#/                          → Home View
#/ns/:namespace             → Namespace View
#/entity/:id                → Entity Detail View (with embedded mini-graph)
#/narrative/:context        → Narrative View (Graph + Steps tabs)
#/graph/:id                 → Full Entity Graph (standalone, depth=2)
#/key/:encodedKey           → Key Resolution View
```

Hash-based routing keeps it simple (no server-side routing needed, works with static file serving).

---

## 8. Graph Rendering Engine

A single reusable SVG-based graph renderer powers all graph views. It supports two layout modes:

### 8.1 Layered Layout (for narratives)
- Nodes positioned by `narrative_sequence` on the X-axis
- Vertical spread within each sequence level to prevent overlap
- Preserves causal flow direction (left → right)
- Edges drawn as curved SVG paths with arrowheads

### 8.2 Force-Directed Layout (for entity graphs)
- Simple physics simulation:
  - **Repulsion:** All nodes push each other apart (Coulomb's law)
  - **Springs:** Connected nodes attract (Hooke's law)
  - **Center gravity:** Gentle pull toward viewport center
  - **Damping:** Simulation settles after ~100-200 iterations
- Fixed center node option (for mini entity graphs)
- Simulation runs on load, then freezes (no continuous animation drain)

### 8.3 Shared Features (both layouts)
- **SVG rendering** (not Canvas) — better accessibility, easier hit testing
- **Zoom:** CSS transform on the SVG container (pinch on mobile, scroll-wheel on desktop)
- **Pan:** Pointer drag on the SVG background
- **Node interaction:** Pointer events on SVG circles/groups
- **Responsive:** SVG viewBox scales to container, reflows on resize
- **Performance target:** Smooth at 60fps for graphs up to ~100 nodes

### 8.4 Implementation Sketch
```
graph-engine.js (~300-400 lines)
├── layout(nodes, edges, mode)     → positions
├── render(container, nodes, edges, positions) → SVG
├── attachInteractions(svg, callbacks) → zoom/pan/tap
└── simulate(nodes, edges) → force-directed positions
```

The engine receives raw entity/relation data and a `mode` flag. Views call it with their data and get an interactive SVG. Callbacks handle navigation (tap node → route change).

---

## 9. Data-Agnostic Principles


The UI must **never** hardcode:
- Entity type names (read from namespace config)
- Relation type names (read from namespace config)
- Namespace names (read from `/api/namespaces`)
- Colors (read from namespace config `colors.types`)
- Type icons (use a mapping table with sensible defaults, fall back to ● for unknown types)

**Type → Icon mapping (defaults, overridable):**
```
Event → ⚡   Decision → ⚖️   Fact → ✓   Claim → 💬
System → ⚙️  Goal → 🎯      Concept → 💡  Person → 👤
Organization → 🏢  Article → 📰  Source → 📡  Topic → 🏷️
Asset → 💎   Token → 🪙     Trade → 📊   Policy → 📜
Sector → 📁  Protocol → 🔗   Conflict → ⚔️  Treaty → 🤝
(fallback) → ●
```

---

## 10. Express Integration

```javascript
// API routes under /api
app.use('/api/entities', entitiesRouter);
app.use('/api/relations', relationsRouter);
// ... etc

// Serve static site files
app.use(express.static('public'));

// SPA fallback — serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
});
```

The `site/` build output is copied into `api/public/` during Docker build.

---

## 11. Summary

| Aspect | Choice |
|--------|--------|
| Framework | Vanilla JS (zero deps) |
| Styling | Custom CSS, dark theme, frosted glass |
| Routing | Hash-based SPA |
| Data | 100% from API, zero hardcoding |
| Mobile | First-class, touch gestures, thumb-friendly |
| Bundle size | < 50KB total |
| Build step | None (plain HTML/CSS/JS) |
| Deployment | Same Docker container, served by Express |
