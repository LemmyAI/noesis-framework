# NOESIS Explorer — UI Specification

**Version:** 2.0
**Date:** 2026-02-15
**Status:** Ready for Implementation
**Previous:** v1.0 (2026-02-14) — view-based navigation with flat namespace pills

---

## What Changed in v2.0

**Core insight:** Every page is the same page — a namespace viewer. The URL *is* the namespace path. Narratives live inside namespaces, not floating globally. The frontpage is just the root namespace showing its best children.

| v1.0 | v2.0 |
|------|------|
| Flat namespace pills, separate view types | Namespace path = page hierarchy |
| Narrative names carry context ("News Week 7: ...") | Namespace path provides context, narrative names stay clean |
| Home, Namespace, Entity, Narrative as distinct pages | One universal page template, scoped by namespace |
| Narrative contexts are global strings | Narratives are scoped to a namespace |

---

## 1. Overview

The NOESIS Explorer is a **mobile-first, data-agnostic** single-page application for exploring any NOESIS knowledge graph. It reads all structure (namespaces, types, colors, relations) from the API at runtime — no hardcoded entity types, names, or layouts.

**Guiding principle:** The UI is a *lens* on the data, not a dashboard. It should feel like navigating a living knowledge map — tap a node, see its world, follow a thread, go deeper.

**v2.0 principle:** Every page is a namespace. The namespace path is the navigation. Breadcrumbs replace tabs.

---

## 2. Architecture

```
Docker Container
├── Express API ──────── /api/*    (existing)
└── Static SPA ──────── /*        (NOESIS Explorer)
    ├── index.html
    ├── app.js           (vanilla JS, modular)
    └── style.css        (mobile-first CSS)
```

**Tech stack:**
- **Vanilla JS + CSS** (no React/Vue/Angular — keep the bundle tiny)
- **CSS custom properties** for theming (colors pulled from namespace config)
- All data fetched from `/api/*` endpoints at runtime
- Single HTML file with JS modules — no build step needed
- Works on phones, tablets, desktop (responsive)
- Target: < 50KB total bundle

---

## 3. The Namespace-as-Page Model

### 3.1 Core Concept

Every "page" in the Explorer renders the same template. What changes is the **namespace scope**.

```
URL path        →  Namespace scope  →  What you see
/               →  (root)           →  Top narratives from ALL children
/news           →  news             →  News entities + child namespace narratives
/news/week7     →  news.week7       →  Week 7 stories + its narratives
/history        →  history           →  History entities + child narratives
```

The page template always shows:
1. **Breadcrumb header** — the namespace path, each segment clickable
2. **Featured narratives** — from this namespace and/or bubbled up from children
3. **Entities** — belonging to this namespace, grouped by type
4. **Child namespaces** — clickable cards to go deeper

### 3.2 Namespace Path as Breadcrumbs

The breadcrumb IS the namespace hierarchy. Always visible at the top.

```
Viewing /news/week7:

  ν NOESIS  ›  news  ›  week7
  ────────     ────     ─────
  (root)       (link)   (current, bold)
```

- Each segment is a clickable link
- Current namespace is bold/highlighted, not clickable
- `ν NOESIS` (or just `ν`) is always the root link
- On mobile: horizontally scrollable if path is long

### 3.3 Narrative Scoping

Narratives are scoped to namespaces via the `context` field on relations. The naming convention:

```
Old (v1.0):  "News Week 7: Ukraine Peace Process"
New (v2.0):  "Ukraine Peace Process"  (lives in namespace news.week7)
```

The namespace path replaces the prefix. When viewing a narrative, the breadcrumb shows:

```
ν NOESIS  ›  news  ›  week7  ›  Ukraine Peace Process
```

### 3.4 Narrative Bubbling

When a namespace has no narratives of its own, it shows the **top narratives from child namespaces**, ranked by:

1. **Recency** — most recent temporal timestamps in the narrative's entities
2. **Size** — number of entities/relations in the narrative
3. **Depth** — narratives from direct children rank higher than grandchildren

This means:
- **Root page (`/`)** shows the most interesting narratives across the entire graph
- **`/news`** shows top narratives from `news.week7`, `news.week8`, etc.
- **`/news/week7`** shows its own narratives directly

If a namespace has BOTH its own narratives AND child narratives, own narratives appear first under "This Namespace", followed by "From Sub-Namespaces".

---

## 4. Visual Language

### 4.1 Design System

| Element | Treatment |
|---------|-----------|
| **Background** | Near-black (`#0D0D0F`) — content glows against it |
| **Cards** | Frosted glass (`backdrop-filter: blur`) with subtle border |
| **Type colors** | Pulled from namespace config `colors.types` — node dots + card accents |
| **Breadcrumbs** | Light gray text, current segment white/bold, `›` separator |
| **Typography** | System font stack, clean and readable |
| **Spacing** | Generous padding on mobile (thumb-friendly, min 48px tap targets) |
| **Transitions** | Smooth slide/fade between views (200-300ms) |
| **Icons** | Unicode/emoji only — types get semantic icons |

### 4.2 Color Philosophy

Entity type colors come from the API (`/api/namespaces/:ns/config → colors.types`). The UI merges the inheritance chain (default → parent → child namespace) to resolve colors for any type. Unknown types get a neutral gray.

Namespace category colors (if defined in config `colors.categories`) can tint the page background or breadcrumb area subtly.

### 4.3 Credibility & Temporal

| Confidence | Visual |
|------------|--------|
| verified | Green dot ● |
| high | Blue dot ● |
| medium | Yellow dot ● |
| low | Orange dot ● |
| disputed | Red dot ● with badge |

| Precision | Display |
|-----------|---------|
| second | `Feb 14, 2026 19:00:00` |
| minute | `Feb 14, 2026 19:00` |
| hour | `Feb 14, 2026 19h` |
| day | `Feb 14, 2026` |
| month | `February 2026` |
| year | `2026` |

---

## 5. Page Template (Universal)

Every URL renders this same template, scoped by the current namespace.

```
┌─────────────────────────────────────┐
│  ν NOESIS › news › week7            │  ← BREADCRUMB HEADER
├─────────────────────────────────────┤
│                                     │
│  📖 Narratives                      │  ← SECTION: Narratives
│  ┌─────────────────────────────┐    │     (own + bubbled from children)
│  │ ⚡ Ukraine Peace Process     │    │
│  │ 6 steps · 8 entities        │    │
│  │ [Explore Story →]           │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 💰 Market Movements         │    │
│  │ 7 steps · 12 entities       │    │
│  │ [Explore Story →]           │    │
│  └─────────────────────────────┘    │
│                                     │
│  🗂 Sub-Namespaces                  │  ← SECTION: Children (if any)
│  ┌──────────┐ ┌──────────┐         │
│  │ 📰 week7 │ │ 📰 week8 │         │
│  │ 56 items │ │ 0 items  │         │
│  └──────────┘ └──────────┘         │
│                                     │
│  ⚡ Entities                        │  ← SECTION: Entities in this ns
│  ── Event (24) ──────────────       │
│  ┌─────────────────────────────┐    │
│  │ ⚡ Ukraine Ceasefire Talks   │    │
│  │ ● high · Feb 14, 2026       │    │
│  └─────────────────────────────┘    │
│  ...                                │
│                                     │
│  ── Decision (18) ───────────       │
│  ...                                │
│                                     │
│  ── Claim (2) ───────────────       │
│  ...                                │
└─────────────────────────────────────┘
```

### Section Display Rules

| Section | When to show |
|---------|-------------|
| **Narratives** | Always (own narratives first, then bubbled from children) |
| **Sub-Namespaces** | Only if this namespace has children |
| **Entities** | Only if this namespace directly contains entities |

**Root page special case:** Root has no entities of its own (default namespace is schema-only). So root shows only Narratives (bubbled) + Sub-Namespaces.

---

## 6. Entity Detail View

Accessed by tapping an entity card. Renders as a **slide-in panel** or a new page (depending on screen width).

Breadcrumb extends:
```
ν NOESIS › news › week7 › Gold Hits $2,950/Ounce
```

```
┌─────────────────────────────────────┐
│ ν › news › week7 › Gold Hits...     │
├─────────────────────────────────────┤
│                                     │
│  ⚡ Gold Hits $2,950/Ounce          │  ← name (large)
│  Event · news · ● verified          │  ← type + ns + credibility
│  Feb 14, 2026                        │  ← temporal
│                                     │
│  Safe-haven demand drives new record │  ← description (from metadata)
│                                     │
│  ┌─ Mini Graph ─────────────────┐   │  ← embedded force-directed
│  │    [visual of connections]    │   │
│  │    [Expand full graph →]      │   │
│  └───────────────────────────────┘   │
│                                     │
│  ─── Relations (5) ──────────────   │
│  INFLUENCED BY                       │
│  ┌─────────────────────────────┐    │
│  │ → Trump Climate Rollback    │    │
│  │   influences · Decision     │    │
│  └─────────────────────────────┘    │
│  ...                                │
│                                     │
│  ─── Sources (1) ────────────────   │
│  ┌─────────────────────────────┐    │
│  │ 📄 Gold Hits Record          │    │
│  │ Bloomberg · Feb 14            │    │
│  │ "Safe-haven demand drives..." │    │
│  │ [Open Source ↗]               │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

---

## 7. Narrative View

Accessed by tapping a narrative card. Two modes: **Graph** and **Steps**.

Breadcrumb:
```
ν NOESIS › news › week7 › Ukraine Peace Process
```

### 7.1 Graph Mode (default)

Layered layout — nodes positioned by `narrative_sequence` (left → right = cause → effect).

```
┌─────────────────────────────────────┐
│ ν › news › week7 › Ukraine Peace... │
├─────────────────────────────────────┤
│  [● Graph]  [≡ Steps]               │
├─────────────────────────────────────┤
│                                     │
│   [Interactive SVG graph]            │
│                                     │
│   Trump-Putin ──enables──→ Ceasefire │
│       ↑                     ↑       │
│   EU Sanctions ─opposes─┘   │       │
│                   Zelenskyy─┘       │
│                                     │
│  ── Timeline ────────────────────   │
│  ●──●──●──●──●──●                   │
│                                     │
└─────────────────────────────────────┘
```

### 7.2 Steps Mode

Linear step-by-step walkthrough, one relation per card.

```
┌─────────────────────────────────────┐
│  [● Graph]  [≡ Steps•]              │
├─────────────────────────────────────┤
│                                     │
│  Step 1                              │
│  ┌─────────────────────────────┐    │
│  │ Trump-Putin Phone Call       │    │
│  │       enables →              │    │
│  │ Ukraine Ceasefire Talks      │    │
│  └─────────────────────────────┘    │
│                                     │
│  Step 2                              │
│  ┌─────────────────────────────┐    │
│  │ Zelenskyy Peace Plan         │    │
│  │       influences →           │    │
│  │ Ukraine Ceasefire Talks      │    │
│  └─────────────────────────────┘    │
│  ...                                │
└─────────────────────────────────────┘
```

---

## 8. Key Resolution View

Accessed via the `🔑` key link on an entity.

```
ν NOESIS › 🔑 COMMODITY:GOLD
```

Shows all entities sharing the same key across namespaces — the "same thing, different lenses" view.

---

## 9. URL Routing

Hash-based routing (no server-side routing needed):

```
#/                              → Root namespace page (bubbled narratives + children)
#/ns/news                       → news namespace page
#/ns/news.week7                 → news.week7 namespace page
#/ns/history.civil-war          → history.civil-war namespace page
#/entity/:id                    → Entity detail view
#/narrative/:context            → Narrative view (Graph + Steps)
#/graph/:id                     → Full entity graph (standalone, depth=2)
#/key/:encodedKey               → Key resolution view
```

The `#/ns/:path` route handles ALL namespace pages (including root when path is empty).

---

## 10. Graph Rendering Engine

Same SVG-based engine from v1.0. Two layout modes:

### Layered (narratives)
- Nodes by `narrative_sequence` on X-axis
- Preserves causal flow (left → right)

### Force-Directed (entity graphs)
- Center node fixed, neighbors orbit
- Simulation settles after ~100-200 iterations

### Shared
- SVG rendering (not Canvas)
- Zoom: pinch (mobile) + scroll-wheel (desktop)
- Pan: pointer drag on background
- Tap node: highlight + show info; double-tap: navigate
- Performance target: 60fps up to ~100 nodes

---

## 11. Mobile-First

### Breakpoints
| Width | Layout |
|-------|--------|
| < 640px | Single column, stacked, breadcrumb scrollable |
| 640-1024px | Two-column grid for namespace/entity cards |
| > 1024px | Three-column grid, max-width 1200px, centered |

### Gestures
- Swipe right on detail views → go back
- Pull down → refresh
- Long press entity → preview popup

### Performance
- No external dependencies
- Lazy-load relations + datalayer on entity detail
- Namespace configs cached client-side
- Bundle: < 50KB

---

## 12. Data-Agnostic Principles

The UI **never** hardcodes entity types, relation types, namespace names, or colors. Everything is read from the API at runtime.

**Type → Icon mapping (defaults, fallback to ●):**
```
Event → ⚡   Decision → ⚖️   Fact → ✓   Claim → 💬
System → ⚙️  Goal → 🎯      Concept → 💡  Person → 👤
Organization → 🏢  Article → 📰  Source → 📡  Topic → 🏷️
Asset → 💎   Token → 🪙     Trade → 📊   Policy → 📜
Sector → 📁  Layer → 📐     Feature → 🔧  Principle → 📏
Component → ⚙️  Battle → ⚔️  Campaign → 🗺️  Army → 🏴
(fallback) → ●
```

---

## 13. Express Integration

```javascript
// API under /api
app.use('/api/entities', entitiesRouter);
// ... etc

// Serve static site
app.use(express.static('public'));

// SPA fallback
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
});
```

---

## 14. Summary

| Aspect | Choice |
|--------|--------|
| Framework | Vanilla JS (zero deps) |
| Styling | Custom CSS, dark theme, frosted glass |
| Routing | Hash-based SPA |
| Page model | One template, scoped by namespace |
| Navigation | Breadcrumb = namespace path |
| Narrative scope | Namespaces, not global strings |
| Narrative bubbling | Children bubble up to parent pages |
| Data | 100% from API, zero hardcoding |
| Mobile | First-class, touch gestures |
| Bundle size | < 50KB total |
| Deployment | Same Docker container, served by Express |
