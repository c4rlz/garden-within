# Architecture notes

## Decisions

### Lists of strings (PostgreSQL + Prisma)
We use **native PostgreSQL arrays** (`String[]` → `text[]`) in the Prisma schema. No JSON columns, no join tables. Prisma supports this well; queries and filters stay simple. If you ever need to query “all seeds that contain tag X,” you can use `has` / `hasSome` on the array.

### Week ↔ Seed relationship
Weeks do **not** have a foreign key to Seeds. A Seed’s “week” is derived by its `date`: if `date` falls in `[weekStart, weekStart+7)`, it belongs to that week. So:
- One source of truth (Seed.date).
- No redundant week reference on Seed.
- `weekService.getSeedsForWeek(weekId)` loads the week, then calls `seedService.listForWeek(week.weekStart)`.

### Server actions vs route handlers
We use **server actions** for all mutations and for reads that only the web app needs. Benefits:
- One RPC surface; no separate REST layer to keep in sync.
- Actions live next to the routes that use them; validation (Zod) and revalidatePath stay in one place.
When you add mobile or a public API, add **route handlers** (or tRPC) that call the same `lib/services` layer. No business logic in route handlers—only “parse request → call service → return response.”

### Validation
Zod schemas in `lib/validations` define create/update shapes. Server actions parse FormData (or JSON) with `.safeParse()` and return `{ ok: false, error }` or `{ ok: true }`. Pages can show field errors from `error.fieldErrors`. Same schemas can be used for client-side validation later if you add it.

### Bullet-list form component
`components/forms/bullet-list-field.tsx` is a controlled component: `value: string[]`, `onChange: (items: string[]) => void`. For server actions, forms send the list as a single hidden input with `JSON.stringify(value)` and we parse it in the action (see `parseStringArray` in the action files).
