# Phase 1 — Implementation Plan

Cycle-aware daily journaling. **Ship and learn** — minimal schema churn, maximum reuse.

## Product scope

**In:**
- Cycle settings
- Period-start history + “Period started today”
- Daily Seed (UI) → `JournalEntry` (DB) with stored cycle context
- Seed history (browse / edit past entries)

**Out:**
- AI, dashboards, symptom scoring, habit tracking, productivity concepts
- Roots / Blossoms UI (product language reserved for later)
- Renames or migrations of legacy `Seed`, `Week`, `Blossom` data
- Table renames (`JournalEntry` stays the technical model)

**Navigation (3 items):** Today · Seeds · Settings

---

## Product vs technical mapping

| User sees | Code / database |
|-----------|-----------------|
| Seed, today’s seed | `JournalEntry` |
| Seeds (history) | `journalEntry` list |
| Cycle day / phase | `cycleDay`, `cyclePhase` on entry (snapshot at save) |
| Period started today | `PeriodStart` row + update `CycleSettings.lastPeriodStart` |
| Settings | `CycleSettings` |

Legacy models (`Seed`, `Week`, `Blossom`) remain in schema; not used by Phase 1 routes.

---

## Schema changes (two new models only)

`JournalEntry` already exists — **no changes** to that model.

### `CycleSettings` (singleton)

```prisma
model CycleSettings {
  id                  String   @id @default("default")
  lastPeriodStart     DateTime @db.Date
  defaultCycleLength  Int      @default(28)
  defaultPeriodLength Int      @default(5)
  updatedAt           DateTime @updatedAt
}
```

### `PeriodStart` (minimal history)

```prisma
model PeriodStart {
  id        String   @id @default(cuid())
  date      DateTime @db.Date
  createdAt DateTime @default(now())

  @@unique([date])
  @@index([date])
}
```

One row per bleed start. `@@unique([date])` prevents duplicate taps on the same day.

**Cycle day math:** Use the **most recent** `PeriodStart.date` on or before the entry date (fallback: `CycleSettings.lastPeriodStart` if no history). Store resulting `cycleDay` and `cyclePhase` on each `JournalEntry` at save time.

---

## Cycle logic (foundational behavior)

### `cycle-service.ts`

- `getActivePeriodStart(date, periodStarts[], settings)` — latest period start ≤ date
- `getCycleDay(periodStart, date, cycleLength)` — day 1 = period start
- `getPhase(cycleDay, cycleLength, periodLength)` — string: `menstrual` | `follicular` | `ovulation` | `luteal`
- `resolveCycleContext({ date, settings, periodStarts, cycleDayOverride? })` → `{ cycleDay, cyclePhase }`

**Override:** If `cycleDayOverride` is set on the entry, use it for `cycleDay` and derive `cyclePhase` from it.

**Tests:** Unit tests only — no DB.

### `period-start-service.ts`

- `logToday()` — insert `PeriodStart` for today (idempotent if date exists), set `CycleSettings.lastPeriodStart` to today
- `list()` — all period starts, newest first (Settings can show recent history)
- `findLatestOnOrBefore(date)` — used by cycle-service

### `cycle-settings-service.ts`

- `get()` — return settings or `null`
- `upsert({ lastPeriodStart, defaultCycleLength, defaultPeriodLength })`

### `journal-entry-service.ts`

- `upsertForDate(date, input)` — Zod parse → load settings + period history → resolve cycle → `prisma.journalEntry.upsert`
- `findByDate(date)`
- `list(limit?)` — `orderBy: { date: 'desc' }`

---

## Routes & UX

### `/settings`

- Form: last period start, cycle length, period length
- Preview: “Today: Day X · {phase}”
- Optional: list last 3–5 `PeriodStart` dates (read-only, observational)
- Save → `cycle-settings-service.upsert`

### `/today` (daily Seed)

- Load settings; if missing → gentle prompt to Settings
- Load today’s `JournalEntry` (or empty form)
- **Header:** `Day 14 · Ovulation` (from resolved cycle context)
- **Secondary action:** “Period started today” → `period-start-service.logToday()` then refresh cycle header (does not replace saving the seed)
- **Form:** `body` (textarea), tag fields: energy, mood, body sensations, themes
- Collapsed: “Adjust cycle day” → `cycleDayOverride`
- **Save** → `journal-entry-service.upsertForDate(today)`

Copy: observational (“What are you noticing?”, “In your body”) — not planning or self-improvement.

### `/seeds` (history)

- List entries: date, cycle pill, body preview, light tag hint
- Newest first; no filters or charts
- Link → `/seeds/[date]`

### `/seeds/[date]`

- Same form as Today for that date
- Back link to Seeds

### Redirects (optional)

- `/seeds/today` → `/today`

### Hidden from nav (routes may remain)

- Weeks, Blossoms, Import, legacy `/seeds/new`

---

## Code reuse

| Keep / adapt | Notes |
|--------------|--------|
| `JournalEntry` schema | No migration |
| `lib/validations/journal-entry.ts` | As-is |
| `lib/validations/tags.ts` | As-is |
| `components/forms/bullet-list-field.tsx` | Four tag sections |
| `seed-edit-form.tsx` | Adapt → `journal-entry-form.tsx` |
| Server actions pattern | New `journal-entries/actions.ts` |
| `lib/services/seed-service.ts` | Unused by Phase 1; do not delete |

| New (small) | |
|-------------|--|
| `cycle-settings.ts` validation | |
| `cycle-service.ts` + tests | |
| `cycle-settings-service.ts` | |
| `period-start-service.ts` | |
| `journal-entry-service.ts` | |
| `settings/`, `journal-entries/actions.ts` | |
| `journal-entry-form.tsx` | |

---

## Implementation tasks (ordered)

### 1. Schema migration

- [ ] Add `CycleSettings` and `PeriodStart` to `prisma/schema.prisma`
- [ ] `npm run db:migrate`
- [ ] `npm run db:generate`

### 2. Cycle math + period history

- [ ] `lib/validations/cycle-settings.ts`
- [ ] `lib/services/cycle-service.ts` + Vitest tests
- [ ] `lib/services/cycle-settings-service.ts`
- [ ] `lib/services/period-start-service.ts`

### 3. Journal entry service

- [ ] `lib/services/journal-entry-service.ts` (calls cycle-service with period history)
- [ ] Export from `lib/services/index.ts`

### 4. Server actions

- [ ] `app/(app)/settings/actions.ts` — save settings
- [ ] `app/(app)/journal-entries/actions.ts` — `saveEntry`, `logPeriodStartedToday`
- [ ] Reuse `parseStringArray` pattern from existing actions

### 5. Form component

- [ ] `components/forms/journal-entry-form.tsx` — body, four tag lists, optional override
- [ ] Observational labels only

### 6. Settings page

- [ ] `app/(app)/settings/page.tsx` — form + cycle preview + recent period starts

### 7. Today page

- [ ] Rewrite `app/(app)/today/page.tsx` — cycle header, period button, form
- [ ] Redirect `/seeds/today` → `/today` (optional)

### 8. Seed history

- [ ] Rewrite `app/(app)/seeds/page.tsx` — list from `journal-entry-service.list()`
- [ ] `app/(app)/seeds/[date]/page.tsx` — edit by date

### 9. Navigation & copy

- [ ] Sidebar: Today, Seeds, Settings only
- [ ] Update product copy on active pages
- [ ] Smoke test: settings → period today → write seed → see in history → edit

---

## Acceptance criteria

1. Configure cycle settings in **Settings**.
2. Tap **Period started today**; anchor updates; cycle header reflects day 1 (or correct day).
3. Write and save a **Seed** on **Today** with body + tags; `cycleDay` and `cyclePhase` stored on the row.
4. Browse **Seeds**; open any date and edit.
5. Nav shows only Today, Seeds, Settings.
6. No changes to legacy `Seed` / `Week` / `Blossom` tables or data.

---

## Explicitly deferred

- Roots (phase/week aggregation, repeated tags)
- Blossoms (named patterns)
- Recomputing old entries when period history changes
- `trackingStatus` / irregular-cycle settings note
- Multiple entries per day (unique on `date` remains)
- Tag autocomplete from history
- Auth, import, delete flows
- Legacy seed/week/blossom UI removal

---

## Design notes for daily use

1. **Store cycle context on save** — never rely only on live recomputation when browsing old seeds.
2. **Period started today** should be as easy as Save — one tap from Today or Settings.
3. **Tags matter as much as prose** — empty tags weaken month-6 lookback; gentle prompts, not required fields.
4. **Phase labels are approximate** — copy stays observational, not clinical.
5. **Themes** help separate cycle from life when reading back.
