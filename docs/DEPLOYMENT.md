# Deploying Inner Garden

Step-by-step guide to put Inner Garden on the internet so you can use it on your phone from anywhere.

**Stack:** [Vercel](https://vercel.com) (app) + [Neon](https://neon.tech) (PostgreSQL)

---

## Before you start

You need:

- A [GitHub](https://github.com) account with this repo pushed
- A [Neon](https://neon.tech) account (free tier)
- A [Vercel](https://vercel.com) account linked to GitHub (free tier)

Generate these locally and keep them somewhere safe (password manager):

```bash
# Session signing secret
openssl rand -base64 32
```

Choose a **strong `AUTH_PASSWORD`** (20+ characters). This is the only password that opens your journal in production.

---

## Step 1 — Push code to GitHub

From your project directory:

```bash
git status
git push -u origin main
```

If you work on a feature branch (e.g. `garden-init`), merge to `main` first or tell Vercel to deploy that branch.

**If push fails with `HTTP 400` / `RPC failed`** (common when garden images are in the repo):

```bash
git config http.postBuffer 524288000
git push -u origin main
```

Or switch the remote to SSH:

```bash
git remote set-url origin git@github.com:c4rlz/garden-within.git
git push -u origin main
```

---

## Step 2 — Create a Neon database

1. Go to [neon.tech](https://neon.tech) and sign up.
2. **New Project** — name it e.g. `inner-garden`, pick a region close to you.
3. Open the project → **Dashboard** → **Connect**.
4. Copy the **connection string** (PostgreSQL).  
   It should look like:

   ```
   postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

5. Keep `?sslmode=require` on the end.

Neon starts empty. Migrations run automatically during the Vercel build (see Step 4).

---

## Step 3 — Create a Vercel project

1. Go to [vercel.com](https://vercel.com) and sign in with **GitHub**.
2. **Add New… → Project**.
3. Import **`c4rlz/garden-within`** (or your fork).
4. **Do not deploy yet** — add environment variables first (Step 4).

Default settings are fine:

| Setting | Value |
|---------|--------|
| Framework Preset | Next.js |
| Root Directory | `.` |
| Build Command | `npm run build` (default) |
| Output Directory | (default) |

The build script runs `prisma migrate deploy` then `next build`, so the database schema is applied on each production build.

---

## Step 4 — Set environment variables

In Vercel: **Project → Settings → Environment Variables**

Add all three for **Production** (and **Preview** if you want preview deployments to work):

| Name | Value | Notes |
|------|--------|--------|
| `DATABASE_URL` | Your Neon connection string | From Step 2 |
| `AUTH_SECRET` | Output of `openssl rand -base64 32` | Never commit this |
| `AUTH_PASSWORD` | Your chosen journal password | Only you should know this |

Click **Save**, then trigger **Deploy** (or redeploy if you already deployed without these).

---

## Step 5 — Deploy and verify

1. Vercel → **Deployments** → wait for the build to finish (green).
2. Open the deployment URL (e.g. `https://garden-within.vercel.app`).
3. You should see the **login** page.
4. Enter `AUTH_PASSWORD`.
5. Go to **Settings** and enter your cycle info (last period start, cycle length, period length).

**Expected on first visit**

- Login works with your password.
- Today page loads after login.
- Seasonal garden image appears (if cycle settings are saved).
- Saving a journal entry works.

**Production data is separate from local.** Your Mac’s Postgres is not used. You set up cycle settings and journal entries again in production (unless you migrate data later).

---

## Step 6 — Use on your phone

1. Open the Vercel URL in **Safari** (iOS) or **Chrome** (Android).
2. Log in with your password.
3. **Add to Home Screen**
   - iOS: Share → **Add to Home Screen**
   - Android: Menu → **Install app** / **Add to Home screen**

The app opens full-screen (PWA manifest is already configured). Session lasts 30 days unless you sign out.

---

## Optional — Custom domain

1. Vercel → **Project → Settings → Domains**.
2. Add your domain (e.g. `garden.yourdomain.com`).
3. Follow Vercel’s DNS instructions at your registrar.
4. HTTPS is automatic.

---

## Updating the app after deploy

Push to `main` (or your connected branch). Vercel redeploys automatically.

```bash
git add .
git commit -m "your message"
git push origin main
```

Each deploy runs migrations again if there are new ones in `prisma/migrations/`.

---

## Costs & limits (free tiers)

Inner Garden is a **single-user personal journal**. On that scale, both free tiers are generous — you may never need to pay.

> Limits change over time. Check [Vercel Hobby](https://vercel.com/docs/plans/hobby) and [Neon Free](https://neon.com/pricing) for the latest numbers.

### Will I hit the free tier?

| Service | Main free limits | Your realistic usage |
|---------|------------------|----------------------|
| **Vercel Hobby** | ~1M requests/month, 100 GB bandwidth | A few hundred page loads/month |
| **Neon Free** | 0.5 GB storage, 100 compute-hours/month | A few KB per journal entry; DB sleeps when idle |

For daily personal use, you are **nowhere near** these caps. Storage alone could hold **years** of entries before 0.5 GB matters.

### When would I need to pay?

| Reason | Likely cost |
|--------|-------------|
| Stay free (personal, non-commercial) | **$0** — most likely for you |
| Neon: exceed monthly compute/storage cap | DB pauses until next month, or upgrade to **Launch** (~$1–5/month usage-based) |
| Vercel: commercial use or need guaranteed uptime | **Pro ~$20/month** (Hobby pauses instead of billing overages) |
| Both upgraded | **~$20–25/month** |

**Vercel Hobby** is for personal, non-commercial projects only. A private journal you don’t charge for is fine.

**Neon cold starts:** After ~5 minutes idle, the database scales to zero. The first request after that may take a second or two to wake up — normal for a journal you open a few times a day.

### What to check occasionally

Once a quarter (optional):

1. [Vercel dashboard](https://vercel.com) → **Usage**
2. [Neon dashboard](https://neon.tech) → **Storage** and **Compute**

Both will probably look nearly empty for a long time.

### Is this the right stack?

For Inner Garden, **yes**:

- Already built and deployed (Next.js + Prisma + Postgres)
- Low maintenance — push to GitHub, Vercel redeploys
- Matches the scale — one person, small data, mobile-first

**Alternatives** only matter if priorities change:

| If you want… | Consider… |
|--------------|-------------|
| $0 forever, more DIY | Small VPS (~$5/month) + self-hosted Postgres — more ops work |
| Simpler DB hosting | Supabase free — but projects **pause after 7 days idle**, awkward for a sporadic journal |

No need to switch unless costs, uptime, or features push you there.

---

## Troubleshooting

### Build fails: Prisma / `DATABASE_URL`

- Confirm `DATABASE_URL` is set in Vercel **before** the build runs.
- Open the build log and look for `prisma migrate deploy` errors.
- Neon connection string must include `?sslmode=require`.

### Build fails: Auth

- `AUTH_SECRET` and `AUTH_PASSWORD` must be set in Vercel env vars.
- Redeploy after adding or changing env vars.

### Login page works but saves fail

- Check **Vercel → Logs** (Functions / Runtime).
- Confirm Neon project is active (not suspended on free tier after long inactivity).

### `HTTP 400` when pushing to GitHub

- See Step 1 — increase `http.postBuffer` or use SSH.

### Images missing on deployed site

- Garden images live in `public/images/` and deploy with the app.
- If they’re gitignored locally, they won’t be on Vercel — ensure they’re committed.

### Wrong password / locked out

- Reset `AUTH_PASSWORD` in Vercel env vars → **Redeploy**.
- Old sessions may need a browser refresh or sign out.

---

## Security checklist

- [ ] `AUTH_PASSWORD` is long and unique — not reused elsewhere
- [ ] `AUTH_SECRET` is random and not committed to git
- [ ] `.env` is in `.gitignore` (never push secrets)
- [ ] Vercel project is under your account; repo is private if you prefer
- [ ] Don’t share the public URL unless you’re comfortable with password-only protection

This is **single-password auth** suited for a personal journal. It is not multi-user accounts. For shared access or OAuth later, the auth layer can be extended.

---

## Quick reference — env vars

**Local** (`.env`):

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="..."
AUTH_PASSWORD="..."
```

**Production** (Vercel): same three names, production values (Neon URL + new secrets).

Copy template from `.env.example` in the repo root.
