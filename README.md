# Inner Garden

A private personal reflection app: daily Seeds, weekly Weeks, and Blossoms (insights from weekly reflection).

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

## Scripts

- `npm run dev` — development server
- `npm run build` / `npm run start` — production
- `npm run db:generate` — regenerate Prisma client
- `npm run db:push` — push schema to DB (no migration files)
- `npm run db:migrate` — create and run migrations
- `npm run db:studio` — open Prisma Studio

## Structure

See [docs/FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md) for the folder layout and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for main design decisions.
