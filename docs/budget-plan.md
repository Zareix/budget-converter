# Budget Converter → Monthly Personal & Shared Budget App (v1 Plan)

> **Branch:** `feat/budget`
> **Status:** Planning complete — ready to start **Step 1**.
> **Scope:** v1 covers **Monthly Budget Management + Integrated Ingestion**. Yearly `Evolution` (account balance snapshots) and `PEA` portfolio tracking are deferred to **v2**.

---

## 1. Context & Background

Currently, `budget-converter` fetches/parses transactions from multiple sources (Enable Banking, Tricount, Lunchflow, AMEX CSV, Revolut CSV), applies mapping rules (`mappings` + `categories`), and outputs a semicolon CSV to copy-paste into a personal Excel workbook (`💰 BUDGET 2026.xlsx`).

The goal is to evolve `budget-converter` in place so it **replaces the monthly Excel sheets directly**, tailored to a **2-person household** where expenses and bills can be personal (`100%`), shared 50/50 (`50%`), or paid for the other partner / ignored (`0%`).

### Reference Excel structure being replaced (monthly sheets)

Each monthly sheet (e.g. `November 2026`) contains:

1. **Bills (Fixed monthly expenses)**
   - Columns: `Paid` (checkbox), `Name`, `Due Day`, `From` (source account, e.g. `SG - Compte courant`, `Revolut - Compte joint`), `Share` (`Personal` / `Shared` / `Other`), `Budget`, `Actual`, `Your Budget`, `Your Actual`.
   - Formula: `Your Budget = Budget * sharePercent / 100`, `Your Actual = Actual * sharePercent / 100`.
   - Example: Rent `1401.33 €` (`Shared` 50%) → `Your Budget: 700.67 €`, `Your Actual: 700.67 €`.
2. **Incomes**
   - Columns: `Name`, `Due Date`, `Expected`, `Actual`.
   - Note: Salary may arrive at the end of the previous calendar month (e.g. `29/10` attributed to `November`).
3. **Savings**
   - Columns: `Name`, `Budget`, `Actual` (e.g. `Livret A`, `PEA`, `Assurance-Vie`, `Compte commun - Voyage`, `Compte commun - Obj`).
4. **Budgeted Expenses (Envelopes)**
   - One row per category (`🛒 Courses`, `🍣 Restaurant`, `🍹 Bar/Café`, `🚕 Transport`, `🎫 Divertissement`, `🛍️ Shopping`, `🌍 Voyage`, `⛑️ Santé`, `🏡 Maison`, `🐶 Chien`, `🙏 Dons`, `🎁 Cadeaux`, `💬 Autres`).
   - `Budget` (monthly target) vs `Actual` = `SUM(Your Share)` of non-excluded transactions in that category for the month.
   - Green when `Actual <= Budget`, red when `Actual > Budget`.
5. **Summary**
   - Rows: `Income`, `Bills` (Your share), `Expenses` (Your share), `Savings`, `Remaining = Income - (Bills + Expenses + Savings)` — for both `Budget` and `Actual`.
6. **Charts (2 Donuts)**
   - **Monthly Budget** donut: `Bills` / `Expenses` / `Savings` (budgeted) with budgeted `Remaining` in the center.
   - **Monthly Expenses** donut: actual spend by category with total actual spend in the center.
7. **Transactions Ledger** _(will live on a dedicated `/transactions` page)_
   - Columns: `Date`, `Name`, `Amount`, `Category`, `Payment Method`, `Share`, `Your Share`.
   - Original Excel formula: `=IF(For="Ensemble", Amount/2, IF(For="Lola", 0, Amount))`.

### Out of scope for v1 (v2 later)

- Bank account `Start Balance` / `End Balance` tracking
- `Evolution` yearly net-worth view across accounts
- `PEA` ETF purchase log & live Yahoo Finance quotes

_(Note: we still introduce the `accounts` table in v1 for `Bills.fromAccountId` so v2 plugs in cleanly.)_

---

## 2. Locked Design Decisions

All product & technical decisions below are already agreed with the user:

1. **Repository & Branch:** Evolve `~/Developer/PROJECTS/budget-converter` in place on branch `feat/budget`.
2. **UI Language:** **100% English UI** (matching existing `budget-converter`). User-created data (category labels/emojis, account names, payment method labels, transaction names) stays as configured by the user.
3. **Share / Split Storage:**
   - Stored as an integer **`sharePercent` (`0`–`100`, default `100`)** in SQLite so custom percentages remain possible later without schema changes.
   - UI exposes 3 fast presets:
     - `100` → **Personal** (`100%`)
     - `50` → **Shared** (`50%`)
     - `0` → **Other** (`0%`, covers expenses paid for partner or excluded from personal budget)
   - Effective share formula everywhere: `Math.round((amountCents * sharePercent) / 100)`.
4. **Monetary Precision:**
   - Store all money values in **integer cents** (`amountCents`, `budgetCents`, `actualCents`, `expectedCents`).
   - Convention for transactions: **positive = expense**, **negative = refund** (refunds automatically reduce envelope spend).
5. **Month Attribution:**
   - Store explicit `monthId` (`"YYYY-MM"`, e.g. `"2026-11"`) on `transactions`, `bills`, `incomes`, `savings`, and `category_budgets`.
   - Defaults to the transaction's calendar month (`date.slice(0, 7)`), but can be reassigned per transaction (e.g. end-of-month expense or income belonging to the next month).
6. **Ingestion Mode:**
   - **On-demand** via `/import` (Fetch / CSV upload → editable preview → **Import to Budget**), no background cron in v1.
   - Keep **Copy CSV** as a secondary button during transition.
7. **Transactions Page:**
   - Dedicated route **`/transactions`** (separate from the monthly dashboard `/`).
8. **Accounts & Payment Methods:**
   - Move `PAYMENT_METHODS` (currently hardcoded in `src/lib/parsers/index.ts`) and bill source accounts into **SQLite tables editable in `/settings`**, pre-seeded with current values.
9. **Tricount Improvements:**
   - Run Tricount entries through `findInMapping` (currently missing in `src/lib/fetcher/tricount.ts`).
   - Derive `sharePercent` from Tricount `allocations` (`Math.round(Math.abs(userAlloc / total) * 100)`, fallback `50`).
10. **Initial Data:**
    - Start fresh from November/December 2026 — **no historical Excel import script** needed.
11. **Authentication:**
    - No auth code inside the app; protected on Jupiter via GoDoxy OIDC middleware (`proxy.#1.middlewares.oidc`, Pocket-ID).

---

## 3. Existing Codebase Reference & Known Gotchas

- **Stack:** Bun, TanStack Start + Router + Query + Table + Form, React 19, Vite 8, Drizzle ORM (`drizzle-orm/bun-sqlite`), Valibot, Tailwind v4, shadcn/ui (`@base-ui/react`), `sonner`, `lucide-react`, `oxlint` + `oxfmt` (`bun run check`).
- **Database:** `src/lib/db/index.ts` (WAL + `foreign_keys = ON`), `src/lib/db/migrate.ts` (runs `./drizzle` migrations), `src/lib/db/schema.ts`.
  - Existing migrations: `drizzle/0000`–`drizzle/0002` (seed inserts are written inside SQL migrations, see `drizzle/0002_stiff_miss_america.sql`).
  - Existing tables: `eb_accounts`, `categories` (13 seeded French categories with emojis), `mappings` (`mode`, `fromName`, `toName`, `toCategory`, `fromPrice`, `exclude`).
  - Existing local DB file `db.sqlite` contains real data — always test new migrations against a copy of `db.sqlite` to guarantee zero data loss.
- **Known bugs/gaps in current ingestion code to fix in Step 2:**
  1. **January year-rollover bug** in `src/lib/fetcher/enable-banking.ts`, `tricount.ts`, and `lunchflow.ts`:
     `date.getMonth() === now.getMonth() - 1 && date.getFullYear() === now.getFullYear()` fails in January (`0 - 1 = -1`). Replace with a shared helper comparing year+month against current month and previous month (`new Date(now.getFullYear(), now.getMonth() - 1, 1)`).
  2. **`tricount.ts` skips `findInMapping`:** wire `getMapping()` + `findInMapping()` identically to the other fetchers.
  3. **Deterministic `externalId` per source** (all fields already exist in raw data):
     - Enable Banking: `eb:${record.entry_reference}`
     - Tricount: `tricount:${entry.RegistryEntry.uuid}`
     - Lunchflow: `lf:${record.id}` (fallback hash if `id` is null)
     - AMEX CSV: `amex:${record.Référence}`
     - Revolut CSV: `revolut:${sha256(`${record["Date de début"]}|${record.Description}|${record.Montant}|${record.Solde}`).slice(0, 24)}`

---

## 4. Target Database Schema (Drizzle / SQLite)

### Extended existing tables

- **`categories`**
  - Existing: `id`, `slug` (unique), `label`
  - Add: `color: text("color")` (hex/CSS token for charts), `sortOrder: integer("sort_order").notNull().default(0)`
- **`mappings`**
  - Existing: `id`, `mode`, `fromName`, `toName`, `toCategory` (FK → `categories.slug`), `fromPrice`, `exclude`
  - Add: `defaultSharePercent: integer("default_share_percent")` _(nullable: `0`–`100`)_

### New tables

```ts
// Accounts (used by bills.fromAccountId in v1, reused by Evolution snapshots in v2)
accounts {
  id: integer PK autoincrement
  slug: text unique notNull
  name: text notNull
  type: text ("checking" | "savings" | "joint" | "investment" | "other") notNull
  color: text
  sortOrder: integer notNull default 0
}

// Payment methods (replaces hardcoded PAYMENT_METHODS)
paymentMethods {
  id: integer PK autoincrement
  slug: text unique notNull
  label: text notNull
  color: text
  defaultSharePercent: integer notNull default 100
  sortOrder: integer notNull default 0
}

// Budget months
months {
  id: text PK // "YYYY-MM", e.g. "2026-11"
  createdAt: text notNull // ISO timestamp
}

// Persisted transactions
transactions {
  id: integer PK autoincrement
  monthId: text notNull FK -> months.id (onDelete: cascade)
  date: text notNull // ISO "YYYY-MM-DD"
  name: text notNull
  sourceName: text
  amountCents: integer notNull // positive = expense, negative = refund
  sharePercent: integer notNull default 100 // 0..100
  categorySlug: text notNull FK -> categories.slug
  paymentMethodId: integer FK -> paymentMethods.id (onDelete: set null)
  excluded: integer(boolean) notNull default false
  externalId: text unique // nullable; deduplicates imports
  raw: text // nullable JSON
  createdAt: text notNull
}
// Index on (monthId, date) and (monthId, categorySlug)

// Monthly envelope caps per category
categoryBudgets {
  id: integer PK autoincrement
  monthId: text notNull FK -> months.id (onDelete: cascade)
  categorySlug: text notNull FK -> categories.slug (onDelete: cascade)
  budgetCents: integer notNull default 0
  // UNIQUE (monthId, categorySlug)
}

// Fixed monthly bills
bills {
  id: integer PK autoincrement
  monthId: text notNull FK -> months.id (onDelete: cascade)
  name: text notNull
  dueDay: integer // 1..31, nullable
  fromAccountId: integer FK -> accounts.id (onDelete: set null)
  sharePercent: integer notNull default 100
  budgetCents: integer notNull default 0
  actualCents: integer // nullable until paid/filled (or falls back to budgetCents if desired; explicit null = not set yet)
  paid: integer(boolean) notNull default false
  sortOrder: integer notNull default 0
}

// Monthly incomes
incomes {
  id: integer PK autoincrement
  monthId: text notNull FK -> months.id (onDelete: cascade)
  name: text notNull
  dueDate: text // optional short date / day string, e.g. "2026-10-29"
  expectedCents: integer notNull default 0
  actualCents: integer // nullable
  sortOrder: integer notNull default 0
}

// Monthly savings targets
savings {
  id: integer PK autoincrement
  monthId: text notNull FK -> months.id (onDelete: cascade)
  name: text notNull
  budgetCents: integer notNull default 0
  actualCents: integer // nullable
  sortOrder: integer notNull default 0
}
```

### Initial Seed Data (inside Drizzle migration)

- **`accounts`**:
  - `sg-checking` (`SG - Compte courant`, `checking`)
  - `sg-livret-a` (`SG - Livret A`, `savings`)
  - `revolut-checking` (`Revolut - Compte courant`, `checking`)
  - `revolut-joint` (`Revolut - Compte joint`, `joint`)
  - `fortuneo-pea` (`Fortuneo - PEA`, `investment`)
  - `linxea-av` (`Linxea - Assurance Vie`, `investment`)
- **`payment_methods`**:
  - `carte-sg` (`Carte SG`, `defaultSharePercent: 100`)
  - `carte-amex` (`Carte AMEX`, `defaultSharePercent: 100`)
  - `carte-revolut` (`Carte Revolut`, `defaultSharePercent: 100`)
  - `carte-compte-joint` (`Carte compte joint`, `defaultSharePercent: 50`)
  - `tricount-lola` (`Tricount Lola`, `defaultSharePercent: 50`)
  - `especes` (`Espèces`, `defaultSharePercent: 100`)
- **`categories`**: backfill sensible distinct chart colors + `sort_order` matching the 13 existing rows.

---

## 5. Target Routes & Navigation

Top navigation bar in `src/routes/__root.tsx`:

- **`/`** — **Budget** (Monthly dashboard with month selector `?month=YYYY-MM` or persisted active month)
- **`/transactions`** — **Transactions** (Dedicated monthly transactions ledger, synced with selected month)
- **`/import`** — **Import** (Upgraded fetcher/parser converter with inline review, dedup, **Import to Budget**, and secondary **Copy CSV**)
- **`/settings`** — **Settings** (Mappings, Categories, Accounts, Payment Methods, Enable Banking)

---

## 6. Step-by-Step Implementation Plan

### Step 1 — Schema, Migrations & Core Domain/Server Functions

- Update `src/lib/db/schema.ts` with all additions & new tables.
- Generate migration (`bun run db:generate`) and add seed SQL for `accounts`, `payment_methods`, and `categories` colors/order.
- Verify migration cleanly upgrades a copy of existing `db.sqlite`.
- Add pure domain module `src/lib/budget/calculations.ts`:
  - `computeShareCents(amountCents, sharePercent)`
  - `computeMonthSummary({ bills, incomes, savings, categoryBudgets, transactions })`
  - Unit tests (`bun test`) covering shares (`100`/`50`/`0`/custom), refunds (negative cents), excluded transactions, and summary math.
- Add DB service modules (`src/lib/budget/`, `src/lib/accounts/`, `src/lib/payment-methods/`) and Valibot-validated server functions in `src/lib/server/`:
  - CRUD for `accounts`, `paymentMethods`, `months`, `bills`, `incomes`, `savings`, `categoryBudgets`, `transactions`.
  - `cloneMonth({ sourceMonthId, targetMonthId })`: creates target month and clones `categoryBudgets`, `bills` (`paid: false`, `actualCents: null`), `incomes` (`actualCents: null`), `savings` (`actualCents: null`).
  - `importTransactions(items)` (bulk insert inside `runTransaction`, `onConflictDoNothing` on `externalId`, auto-creates missing `months` rows if needed, returns `{ imported, skipped }`).
  - `getExistingExternalIds(ids)`.

### Step 2 — Navigation, Ingestion Pipeline & Settings Upgrades

- Add shared top navbar in `src/routes/__root.tsx` (`Budget`, `Transactions`, `Import`, `Settings`).
- Move current converter page from `/` to `/import`.
- Upgrade fetchers & parsers:
  - Add `externalId` and `sharePercent` to the `Transaction` DTO in `src/lib/parsers/index.ts`.
  - Resolve `paymentMethod` dynamically from DB `payment_methods` (matching by slug/label/provider keywords like `toPaymentMethod`).
  - Fix January month-rollover filter bug across `enable-banking.ts`, `tricount.ts`, `lunchflow.ts`.
  - Wire `findInMapping` + allocation-based `sharePercent` into `tricount.ts`.
  - Default `sharePercent` resolution order: `mapping.defaultSharePercent ?? tricountAllocationShare ?? paymentMethod.defaultSharePercent ?? 100`.
- Upgrade `/import` (`Results` & `DataTable`):
  - Query `getExistingExternalIds` when results load; badge already-imported rows as `Imported` and auto-uncheck them.
  - Inline-editable `Category`, `Share` (`Personal` / `Shared` / `Other`), `Month` (`YYYY-MM`), and live computed `Your Share`.
  - Primary button **Import to Budget** + keep **Copy CSV** as secondary action.
- Upgrade `/settings`:
  - Add `Default Share` field to Mapping create/edit forms + YAML import support.
  - Add `Color` & ordering to Categories.
  - Add **Accounts** & **Payment Methods** CRUD sections.

### Step 3 — Monthly Budget Dashboard (`/`)

- Month selector (`< November 2026 >`) + **New / Clone Month** modal (pick previous month to clone or start blank).
- Install `recharts` (if not present) and add shadcn `chart` component.
- Build modular dashboard cards:
  - **Summary** (`Income`, `Bills`, `Expenses`, `Savings`, `Remaining` — `Budget` vs `Actual`).
  - **Budgeted Expenses** (envelopes per category with `Budget` vs `Actual`, green/red status, inline budget edit, click category to jump to `/transactions?month=...&category=...`).
  - **Charts**: _Monthly Budget_ donut + _Monthly Expenses_ donut.
  - **Bills**: paid checkbox, `Name`, `Due Day`, `From` account, `Share` pill, `Budget`, `Actual`, `Your Budget`, `Your Actual`, inline add/edit/delete.
  - **Incomes**: `Name`, `Due Date`, `Expected`, `Actual`, inline add/edit/delete.
  - **Savings**: `Name`, `Budget`, `Actual`, inline add/edit/delete.

### Step 4 — Dedicated Monthly Transactions Page (`/transactions`)

- Shares the same active month selector (`?month=YYYY-MM`).
- Full `@tanstack/react-table` ledger:
  - Columns: `Date`, `Name`, `Amount`, `Category`, `Payment Method`, `Share`, `Your Share`, actions.
  - Search input + filters (`Category`, `Payment Method`, `Share`, `Show excluded`).
  - Summary bar showing filtered count, gross total, and **Your Share** total.
- Fast inline interactions:
  - 1-click Share cycling/popover (`Personal 100%` / `Shared 50%` / `Other 0%`).
  - Inline Category change, Exclude toggle, Month reassignment, full Edit dialog, Delete with confirmation.
  - **+ Add Transaction** dialog for manual entries (e.g. cash).
  - **Create Mapping** shortcut (reusing `CreateMappingButton`) directly from any row.

### Step 5 — Verification & Production Readiness

- Run `bun test`, `bun run check` (`oxfmt` + `oxlint`), and `bun run build`.
- Test end-to-end against a copy of real `db.sqlite` (migration safety, import dedup, dashboard math, month cloning).
- Deployment reminder (in `~/Developer/PROJECTS/docker/jupiter/budget-converter/compose.yaml`):
  - Add GoDoxy OIDC middleware (`proxy.#1.middlewares.oidc: |`) to protect `https://budget-converter.zrx.sh` with Pocket-ID once live budget data is stored.
  - Existing volume `/data/apps/budget-converter:/app/data` is already backed up daily by `backup-jupiter` (Restic).
