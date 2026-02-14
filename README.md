# NOESIS Framework

**N**arrative **O**ntology for **E**vidence-based **S**ystems **I**nferencing **S**tructure

---

## Project Structure

This repository contains **three separate components**:

```
noesis-framework/
├── docs/           # 1. Framework specification & documentation
├── api/            # 2. REST API + PostgreSQL (read-only, Docker)
└── site/           # 3. Presentation site (use case implementation)
```

---

## Component 1: Documentation (`docs/`)

The NOESIS framework specification.

| File | Description |
|------|-------------|
| `SPEC.md` | Full specification (v2.5) |
| `IMPLEMENTATION-PLAN.md` | Implementation roadmap |
| `DECISIONS.md` | Key decisions and rationale |

**Status:** ✅ Complete

---

## Component 2: API (`api/`)

REST API for querying NOESIS data.

- **Read-only** (no create/update/delete)
- **PostgreSQL** in same Docker container
- Database managed manually via SQL scripts

**Status:** 🔲 Ready to build

---

## Component 3: Presentation Site (`site/`)

Frontend for viewing NOESIS narratives.

- Visual graph explorer
- Timeline view with fuzzy precision
- Narrative player
- Category drill-down

**Status:** 🔲 Future work

---

## Quick Links

- [Specification (v2.5)](docs/SPEC.md)
- [Implementation Plan](docs/IMPLEMENTATION-PLAN.md)
- [Decisions](docs/DECISIONS.md)

---

## License

MIT
