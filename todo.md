# Inner Garden — Tasks

Phase 1 plan: [docs/PHASE1.md](docs/PHASE1.md)

## Get it running

- [ ] Copy `.env.example` to `.env` and set `DATABASE_URL`
- [ ] Run `npm run db:migrate` after Phase 1 schema changes
- [ ] `npm run dev` → http://localhost:3000

## Phase 1 (shipped)

See [docs/PHASE1.md](docs/PHASE1.md). Implemented:

- [x] Schema: `CycleSettings` + `PeriodStart`
- [x] Services: cycle math, period-start log, journal-entry upsert/list
- [x] Settings page + “Period started today”
- [x] Today: daily Seed (`JournalEntry`) with stored cycle context
- [x] Seeds: history list + `/seeds/[date]` edit
- [x] Nav: Today, Seeds, Settings only

## Parked (post–Phase 1)

### Personalized trends (“Your patterns”) — not yet

Today shows **generic phase guidance** only (`lib/content/phase-guidance.ts`).

**Future direction (after enough `JournalEntry` rows):**

- Keep generic guidance as the default layer on Today
- Add a second, optional block: **“Your patterns”** — derived from the user’s own tags/themes per phase
- Example copy: *“In your luteal phase, solitude has appeared often.”*
- No AI, no dashboards — simple aggregation over stored entries (e.g. tag frequency by `cyclePhase`)
- Gate on a minimum entry count so early users aren’t shown thin or misleading trends

**Do not implement aggregation until Roots/pattern work is scoped.**

- [ ] Roots — phase/week views, repeated tags
- [ ] Blossoms — named patterns (no goals/priority)
- [ ] Legacy `Seed` / `Week` / `Blossom` UI and data decisions
- [ ] Recompute historical `cycleDay` when period history changes
- [ ] Auth, import, validation error UI, delete flows
