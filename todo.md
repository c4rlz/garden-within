# Inner Garden — Tasks

Phase 1 plan: [docs/PHASE1.md](docs/PHASE1.md)  
Deploy: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Get it running

- [ ] Copy `.env.example` to `.env` — set `DATABASE_URL`, `AUTH_SECRET`, `AUTH_PASSWORD`
- [ ] `npm run db:migrate`
- [ ] `npm run dev` → http://localhost:3000

## Shipped

- [x] Phase 1: cycle settings, Today, Seeds, journal entries
- [x] Seasonal garden images (WebP, 768px; luteal uses `garden-journal.webp` for now)
- [x] Per-day cycle guidance (`lib/content/cycle-day-guidance.ts`)
- [x] Mobile layout + PWA manifest
- [x] Password login (single-user, env-based)
- [x] Deployment guide

## Next up

- [x] Deploy to Vercel + Neon
- [ ] Use on phone for a week — note what to change (see [dear-carly.md](dear-carly.md))
- [ ] Add autumn art → `npm run images:optimize -- public/images/garden-autumn.jpg` → map in `lib/garden-images.ts`

## From daily use (Carly, June 2026)

- [ ] **Back-date notes** — add or edit a seed for a past day (e.g. yesterday, two days ago) without only writing “today.” Likely: pick a date from Seeds or Today, open that day’s journal with correct cycle context for that date.
- [ ] **Speech-to-text** — dictate into the journal field on mobile (and maybe margin tags). Start with browser Web Speech API (`SpeechRecognition`); fallback or polish with native dictation if needed. Privacy: on-device preferred where possible.

## Parked (post–Phase 1)

### Personalized trends — not yet

Generic phase guidance + per-day notes only. Future: “Your patterns” from tag frequency by phase (see `lib/content/phase-guidance.ts` TODO).

- [ ] Roots — phase/week views, repeated tags
- [ ] Blossoms — named patterns
- [ ] Legacy `Seed` / `Week` / `Blossom` UI decisions
- [ ] Recompute historical `cycleDay` when period history changes
- [ ] Import, validation error UI, delete flows
