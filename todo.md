# Inner Garden — Next steps

## Get it running

- [ ] Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string.
- [ ] Run `npm run db:push` (or `npm run db:migrate` if you want migration history).
- [ ] Run `npm run dev` and open http://localhost:3000.

## Data & pages

- [ ] **Seeds list** — On `/seeds`, load and display seeds from `seedService.list()` (e.g. date, link to edit). Right now it’s just a card and “Edit today’s seed”.
- [ ] **Seed by date/id** — Add `/seeds/[date]` or `/seeds/[id]` to view/edit a single seed (reuse or adapt the edit form from `/seeds/today`).
- [ ] **Weeks list** — On `/weeks`, load and display weeks from `weekService.list()` with links to a week detail page.
- [ ] **Week detail** — Add `/weeks/[id]` to show week fields, list seeds for that week (`weekService.getSeedsForWeek(id)`), list blossoms, and a “New blossom” button that pre-fills `weekId`.
- [ ] **Blossoms list** — On `/blossoms`, load from `blossomService.listAll()` and show title, status, week, with links to edit or mark complete.
- [ ] **Blossom edit** — Add edit/complete/delete for a single blossom (actions already exist).

## UX polish

- [ ] **Today** — If today’s seed exists, show a short preview or “Continue editing” instead of only “Start” / “Edit”.
- [ ] **Delete** — Add delete buttons (with confirm) on seed/week/blossom detail or list pages; hook them up to `deleteSeed`, `deleteWeek`, `deleteBlossom`.
- [ ] **Validation errors** — When a create/update action returns `{ ok: false, error }`, show `error.fieldErrors` on the form (e.g. under inputs or at top of form).
- [ ] **Import** — Decide what to support (e.g. CSV/JSON import for seeds) and implement the `/import` page, or remove the nav item until you need it.

## Optional later

- [ ] Auth (e.g. simple password or NextAuth) if you ever want to protect the app.
- [ ] Week start preference (Monday vs Sunday) in one place so “current week” and defaults stay consistent.
