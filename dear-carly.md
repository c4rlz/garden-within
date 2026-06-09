# Dear Carly

Inner Garden is live on Vercel. Use this file when you come back to the project.

---

## You’re live — play with it first

**Don’t rush into building.** Use the app on your phone for a week and notice what feels right.

### Daily rhythm to try

1. Open **Today** in the morning or evening
2. Read the season card — does the metaphor + daily note land?
3. Write a few lines in **Journal** (or skip — that’s fine)
4. Add 0–3 margin words if something stands out (`tired`, `hope`, `work`, etc.)
5. Tap **Keep this seed**
6. Later, check **Seeds** to see if past entries feel good to revisit

### Things worth noticing

| Question | What to watch for |
|----------|-------------------|
| Is the season card too big / too small? | Garden image height, text density |
| Does journaling feel inviting? | Textarea size, placeholder prompts, empty-state feel |
| Are margin tags useful or annoying? | One field vs none vs more structure |
| Is “Mark period start” in the right place? | Easy to find when you need it? |
| Bottom nav clear enough? | Today vs Seeds vs Settings |

Jot notes in Apple Notes or here — whatever you’ll actually read later.

### Add to Home Screen (feels more app-like)

In Safari: **Share → Add to Home Screen**. Opens without the browser chrome.

### When you’re ready to tweak UI

Mobile polish lives in:

```
app/(app)/today/page.tsx
components/season-opening-spread.tsx
components/forms/journal-entry-form.tsx
components/forms/margin-tag-field.tsx
components/app-mobile-nav.tsx
```

Prompts and cycle copy (no code deploy needed for copy experiments locally):

```
lib/content/cycle-day-guidance.ts
lib/content/phase-guidance.ts
```

---

## Start here (local dev)

1. **Pull up the app** — `npm run dev` should already work if your `.env` is set. Open http://localhost:3000
2. **Log in** — password is whatever you put in `AUTH_PASSWORD` in `.env`
3. **Skim this file**, then [todo.md](todo.md) for the checkbox list

If dev won’t start, check `.env` has all three:

- `DATABASE_URL`
- `AUTH_SECRET` (generate with `openssl rand -base64 32`)
- `AUTH_PASSWORD`

Copy from [.env.example](.env.example) if needed.

---

## Deployed ✓

Live on Vercel + Neon. Redeploy: push to GitHub → Vercel rebuilds automatically.

Stuck locally after `npm run build`? Use `npm run dev:clean` instead of `npm run dev`.

Full setup notes: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

**Hosting costs:** For personal daily use, free tiers should last a long time (likely **$0**). If you ever pay, think **~$1–5/month** (Neon) or **~$20/month** (Vercel Pro, only if commercial or you need stricter uptime). Details: [Costs & limits in DEPLOYMENT.md](docs/DEPLOYMENT.md#costs--limits-free-tiers).

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

## Suggested order from here

1. **Use it daily** on your phone (see table above)
2. **Note what annoys you** — that’s your Phase 2 backlog
3. Add autumn image when you have it
4. *Then* pick one thing: more polish, Roots, or “Your patterns”

You shipped. Now you get to find out what you actually want.

— past you (and the agent)
