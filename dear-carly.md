# Dear Carly

You left Inner Garden in a good place. Phase 1 works locally; the confusing experiment code from today is gone. Here’s what to focus on when you come back.

---

## Start here (5 minutes)

1. **Pull up the app** — `npm run dev` should already work if your `.env` is set. Open http://localhost:3000
2. **Log in** — password is whatever you put in `AUTH_PASSWORD` in `.env`
3. **Skim this file**, then [todo.md](todo.md) for the checkbox list

If dev won’t start, check `.env` has all three:

- `DATABASE_URL`
- `AUTH_SECRET` (generate with `openssl rand -base64 32`)
- `AUTH_PASSWORD`

Copy from [.env.example](.env.example) if needed.

---

## Priority 1 — Get it on your phone

**This is the main thing.** The app is built for daily use on mobile, but it’s not live yet.

Follow [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) step by step:

1. **Commit and push** — you have uncommitted cleanup on `garden-init` (deleted SVG experiments, updated `todo.md`). Commit that, then push.
2. **Neon** — create a free Postgres database, copy the connection string
3. **Vercel** — import the repo, set env vars *before* first deploy:
   - `DATABASE_URL` (Neon)
   - `AUTH_SECRET`
   - `AUTH_PASSWORD` (pick something strong — this is your only login)
4. **Deploy** — migrations run on build automatically
5. **On your phone** — open the Vercel URL, log in, go to Settings and set your cycle length + log a period start

**Push trouble?** If GitHub gives HTTP 400 on push (big image files), see the fix in DEPLOYMENT.md (`http.postBuffer` or SSH remote).

---

## Priority 2 — Autumn garden image

Luteal phase still uses `garden-journal.webp` as a stand-in. When you have autumn art:

1. Drop the source file in `public/images/` (jpg or png)
2. Run `npm run images:optimize -- public/images/garden-autumn.jpg`
3. Map `luteal` in [lib/garden-images.ts](lib/garden-images.ts)

Winter / spring / summer are already wired (WebP, ~70–130 KB each):

| Phase      | Image                     |
|------------|---------------------------|
| menstrual  | `garden-winter.webp`      |
| follicular | `garden-spring.webp`      |
| ovulation  | `garden-summer.webp`      |
| luteal     | `garden-journal.webp` ← swap when ready |

---

## What’s actually shipped (don’t re-invent)

You don’t need to rebuild any of this — it’s done:

- **Today page** — date header, seasonal garden image, daily cycle note, journal form
- **Journal** — one “What stands out today?” field + margins chips (saved to DB `themes` column)
- **Seeds** — history list + edit by date
- **Settings** — cycle length, period logging, logout
- **Mobile** — bottom nav, safe areas, PWA manifest
- **Auth** — single-password login before anything else loads

**Main files if you’re orienting:**

```
app/(app)/today/page.tsx          ← Today page
components/season-opening-spread.tsx
components/garden-journal-illustration.tsx
lib/garden-images.ts              ← phase → image
lib/content/cycle-day-guidance.ts ← 28 days of prompts
components/forms/journal-entry-form.tsx
auth.ts + middleware.ts           ← login
docs/DEPLOYMENT.md                ← go live
```

---

## What’s parked (ignore for now)

Don’t let these pull you off course until the app is live and you’re using it daily:

- Roots / Blossoms / personalized “Your patterns” trends
- Legacy routes (`/weeks`, `/blossoms`, old seed forms) — still in code, not in nav
- Import flow, delete flows, fancier validation UI
- Multi-user auth

---

## Small things that might confuse you

**Legacy tag fields** — Old entries may have `energy`, `mood`, etc. in the DB. The UI only shows one margins field now; [lib/journal-entry-form-data.ts](lib/journal-entry-form-data.ts) merges the old fields when loading. No migration needed.

**“Seeds” vs “JournalEntry”** — Product language says Seeds; the database model is `JournalEntry`. Same thing.

**SVG garden experiments** — Deleted. The garden is PNG images only now.

---

## Suggested order when you sit down

1. Commit the cleanup if you haven’t yet
2. Deploy (DEPLOYMENT.md)
3. Use it on your phone for a few days
4. Add autumn image when you have it
5. *Then* decide what Phase 2 is (patterns? roots? polish?)

You’re closer to “actually using this” than “still building.” Ship it first.

— past you (and the agent)
