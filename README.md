# Inner Garden

A cycle-aware journaling app: daily Seeds (observations), with cycle context and period-start history. Roots and Blossoms are planned for later.

## Stack

- **Next.js** (App Router), **TypeScript**, **Tailwind CSS**
- **shadcn-style** UI primitives (Button, Input, Card)
- **Prisma** + **PostgreSQL**
- **Zod** for validation
- **Server actions** for mutations and app-only reads

## Getting started

1. **Install and DB**
   ```bash
   npm install
   cp .env.example .env
   # Edit .env and set DATABASE_URL to your PostgreSQL connection string.
   npm run db:push
   ```
2. **Run**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000); you’ll be redirected to **Today**.

### Use on your phone (same Wi‑Fi)

1. Start the dev server so it accepts LAN connections:
   ```bash
   npm run dev:mobile
   ```
2. On your Mac, find your local IP (System Settings → Network, or `ipconfig getifaddr en0`).
3. On your phone’s browser, open `http://<your-ip>:3000` (e.g. `http://192.168.1.42:3000`).
4. **Add to Home Screen** (Safari: Share → Add to Home Screen) for an app-like full-screen experience.

For daily use away from home, deploy the app (e.g. Vercel) with a hosted PostgreSQL database (Neon or Supabase).

## Scripts

- `npm run dev` — development server
- `npm run build` / `npm run start` — production
- `npm run lint` — ESLint
- `npm run test` — run tests (Vitest)
- `npm run test:watch` — run tests in watch mode
- `npm run db:generate` — regenerate Prisma client
- `npm run db:push` — push schema to DB (no migration files)
- `npm run db:migrate` — create and run migrations
- `npm run db:studio` — open Prisma Studio

## Structure

See [docs/FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md) for the folder layout and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for main design decisions.
