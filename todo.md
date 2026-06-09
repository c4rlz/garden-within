# Inner Garden — Tasks

Phase 1 plan: [docs/PHASE1.md](docs/PHASE1.md)  
Deploy: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Get it running

- [ ] Copy `.env.example` to `.env` — set `DATABASE_URL`, `AUTH_SECRET`, `AUTH_PASSWORD`
- [ ] `npm run db:migrate`
- [ ] `npm run dev` → http://localhost:3000

## Shipped

- [x] Phase 1: cycle settings, Today, Seeds, journal entries
- [x] Seasonal garden images (winter / spring / summer; luteal uses `garden-journal.png` for now)
- [x] Per-day cycle guidance (`lib/content/cycle-day-guidance.ts`)
- [x] Mobile layout + PWA manifest
- [x] Password login (single-user, env-based)
- [x] Deployment guide

## Next up

- [ ] Deploy to Vercel + Neon ([docs/DEPLOYMENT.md](docs/DEPLOYMENT.md))
- [ ] Add `public/images/garden-autumn.png` for luteal phase → map in `lib/garden-images.ts`

## Parked (post–Phase 1)

### Personalized trends — not yet

Generic phase guidance + per-day notes only. Future: “Your patterns” from tag frequency by phase (see `lib/content/phase-guidance.ts` TODO).

- [ ] Roots — phase/week views, repeated tags
- [ ] Blossoms — named patterns
- [ ] Legacy `Seed` / `Week` / `Blossom` UI decisions
- [ ] Recompute historical `cycleDay` when period history changes
- [ ] Import, validation error UI, delete flows
