# Inner Garden — Folder Structure

This document describes the intended layout and responsibilities. Kept minimal so a solo dev can navigate quickly.

## Root layout

```
garden-within/
├── app/                    # Next.js App Router
│   ├── (app)/              # Main app group (sidebar layout)
│   │   ├── layout.tsx      # Sidebar + main content area
│   │   ├── page.tsx        # Redirect or landing
│   │   ├── today/          # Today page
│   │   ├── seeds/          # Seeds list + detail
│   │   ├── weeks/          # Weeks list + detail
│   │   ├── blossoms/       # Blossoms list + detail
│   │   └── import/         # Import page
│   ├── layout.tsx          # Root layout (fonts, providers)
│   └── globals.css
├── components/
│   ├── ui/                 # shadcn-style primitives
│   └── forms/              # Reusable form bits (e.g. bullet-list)
├── lib/
│   ├── db.ts               # Prisma client singleton
│   ├── utils.ts            # cn() etc.
│   ├── validations/        # Zod schemas
│   └── services/           # Business logic (no DB in pages)
├── prisma/
│   └── schema.prisma
└── docs/                   # This and other notes
```

## Principles

- **app/** — Routes and page composition only. Pages call services and render UI; they do not contain business logic or direct Prisma calls.
- **components/** — Presentational and form components. No service or DB imports.
- **lib/services/** — All business logic and orchestration. Services use Prisma and call each other; they are the single place for “how things work.”
- **lib/validations/** — Zod schemas for inputs and DTOs. Shared by services and (optionally) form validation.
- **Route handlers vs server actions** — We use **server actions** for mutations and reads that are only used by the app UI. This keeps one RPC surface (actions) and avoids duplicating logic in API routes. When you add mobile or other API consumers later, you can introduce route handlers (or tRPC) that call the same services.

## Data flow

1. Page or form calls a **server action** (or reads via a server component that calls a service).
2. The action validates input with **Zod**, then calls a **service**.
3. The service performs business logic and uses **Prisma** in `lib/db.ts` for persistence.
4. The action returns typed data (or redirects); the page re-renders.

No business logic in page components; no Prisma in components or actions beyond “call service.”
