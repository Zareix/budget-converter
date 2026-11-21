import { index, integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core"

export const ACCOUNT_TYPES = ["checking", "savings", "joint", "investment", "other"] as const
export type AccountType = (typeof ACCOUNT_TYPES)[number]

export const ASSET_CLASSES = [
  "etf",
  "stock",
  "bond",
  "scpi",
  "euro_fund",
  "crypto",
  "other",
] as const
export type AssetClass = (typeof ASSET_CLASSES)[number]

export const PRICING_MODES = ["yahoo", "manual"] as const
export type PricingMode = (typeof PRICING_MODES)[number]

export const INVESTMENT_TX_TYPES = ["buy", "sell", "dividend", "interest"] as const
export type InvestmentTxType = (typeof INVESTMENT_TX_TYPES)[number]

export const ebAccounts = sqliteTable("eb_accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  institutionName: text("institution_name").notNull(),
  institutionLogo: text("institution_logo"),
  validUntil: text("valid_until").notNull(),
})

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  label: text("label").notNull(),
  color: text("color"),
  sortOrder: integer("sort_order").notNull().default(0),
})

export const mappings = sqliteTable("mappings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  mode: text("mode", {
    enum: ["default", "exact-name", "exact-name-price"],
  }).notNull(),
  fromName: text("from_name").notNull(),
  toName: text("to_name").notNull(),
  toCategory: text("to_category")
    .notNull()
    .references(() => categories.slug),
  fromPrice: real("from_price"),
  exclude: integer("exclude", { mode: "boolean" }).notNull().default(false),
  defaultSharePercent: integer("default_share_percent"),
})

export const accounts = sqliteTable("accounts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  type: text("type", { enum: ACCOUNT_TYPES }).notNull(),
  color: text("color"),
  sortOrder: integer("sort_order").notNull().default(0),
})

export const paymentMethods = sqliteTable("payment_methods", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  label: text("label").notNull(),
  color: text("color"),
  defaultSharePercent: integer("default_share_percent").notNull().default(100),
  sortOrder: integer("sort_order").notNull().default(0),
})

export const sharePresets = sqliteTable("share_presets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  percent: integer("percent").notNull().unique(),
  color: text("color"),
  sortOrder: integer("sort_order").notNull().default(0),
})

export const months = sqliteTable("months", {
  id: text("id").primaryKey(), // "YYYY-MM"
  createdAt: text("created_at").notNull(),
})

export const transactions = sqliteTable(
  "transactions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    monthId: text("month_id")
      .notNull()
      .references(() => months.id, { onDelete: "cascade" }),
    date: text("date").notNull(), // ISO "YYYY-MM-DD"
    name: text("name").notNull(),
    sourceName: text("source_name"),
    amountCents: integer("amount_cents").notNull(), // positive = expense, negative = refund
    sharePercent: integer("share_percent").notNull().default(100), // 0..100
    categorySlug: text("category_slug")
      .notNull()
      .references(() => categories.slug),
    paymentMethodId: integer("payment_method_id").references(() => paymentMethods.id, {
      onDelete: "set null",
    }),
    excluded: integer("excluded", { mode: "boolean" }).notNull().default(false),
    externalId: text("external_id").unique(),
    raw: text("raw"),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    index("transactions_month_date_idx").on(table.monthId, table.date),
    index("transactions_month_category_idx").on(table.monthId, table.categorySlug),
  ],
)

export const categoryBudgets = sqliteTable(
  "category_budgets",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    monthId: text("month_id")
      .notNull()
      .references(() => months.id, { onDelete: "cascade" }),
    categorySlug: text("category_slug")
      .notNull()
      .references(() => categories.slug, { onDelete: "cascade" }),
    budgetCents: integer("budget_cents").notNull().default(0),
  },
  (table) => [
    uniqueIndex("category_budgets_month_category_unique").on(table.monthId, table.categorySlug),
  ],
)

export const subtrackerBillRules = sqliteTable("subtracker_bill_rules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  fromAccountId: integer("from_account_id").references(() => accounts.id, {
    onDelete: "set null",
  }),
  sharePercent: integer("share_percent").notNull().default(100),
  dueDay: integer("due_day"),
  paymentMethodIds: text("payment_method_ids"),
  categoryIds: text("category_ids"),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
})

export const bills = sqliteTable(
  "bills",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    monthId: text("month_id")
      .notNull()
      .references(() => months.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    dueDay: integer("due_day"),
    fromAccountId: integer("from_account_id").references(() => accounts.id, {
      onDelete: "set null",
    }),
    sharePercent: integer("share_percent").notNull().default(100),
    budgetCents: integer("budget_cents").notNull().default(0),
    actualCents: integer("actual_cents"),
    subtrackerRuleId: integer("subtracker_rule_id").references(() => subtrackerBillRules.id, {
      onDelete: "set null",
    }),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [
    index("bills_month_idx").on(table.monthId),
    index("bills_month_subtracker_rule_idx").on(table.monthId, table.subtrackerRuleId),
  ],
)

export const incomes = sqliteTable(
  "incomes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    monthId: text("month_id")
      .notNull()
      .references(() => months.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    dueDate: text("due_date"),
    expectedCents: integer("expected_cents").notNull().default(0),
    actualCents: integer("actual_cents"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [index("incomes_month_idx").on(table.monthId)],
)

export const savings = sqliteTable(
  "savings",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    monthId: text("month_id")
      .notNull()
      .references(() => months.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    budgetCents: integer("budget_cents").notNull().default(0),
    actualCents: integer("actual_cents"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [index("savings_month_idx").on(table.monthId)],
)

export const accountSnapshots = sqliteTable(
  "account_snapshots",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    accountId: integer("account_id")
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
    monthId: text("month_id").notNull(), // "YYYY-MM", e.g. "2026-11"
    balanceCents: integer("balance_cents").notNull(),
    note: text("note"),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    uniqueIndex("account_snapshots_account_month_unique").on(table.accountId, table.monthId),
    index("account_snapshots_month_idx").on(table.monthId),
  ],
)

export const securities = sqliteTable("securities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  symbol: text("symbol").notNull().unique(),
  isin: text("isin"),
  name: text("name").notNull(),
  assetClass: text("asset_class", { enum: ASSET_CLASSES }).notNull().default("etf"),
  currency: text("currency").notNull().default("EUR"),
  pricingMode: text("pricing_mode", { enum: PRICING_MODES }).notNull().default("yahoo"),
  manualPriceCents: integer("manual_price_cents"),
  updatedAt: text("updated_at").notNull(),
})

export const investmentTransactions = sqliteTable(
  "investment_transactions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    accountId: integer("account_id")
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
    securityId: integer("security_id")
      .notNull()
      .references(() => securities.id, { onDelete: "cascade" }),
    type: text("type", { enum: INVESTMENT_TX_TYPES }).notNull(),
    date: text("date").notNull(), // ISO "YYYY-MM-DD"
    quantity: real("quantity").notNull(),
    unitPriceCents: integer("unit_price_cents").notNull(),
    feesCents: integer("fees_cents").notNull().default(0),
    totalEurCents: integer("total_eur_cents").notNull(),
    note: text("note"),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    index("investment_tx_account_date_idx").on(table.accountId, table.date),
    index("investment_tx_security_date_idx").on(table.securityId, table.date),
  ],
)

export const securityQuotes = sqliteTable("security_quotes", {
  symbol: text("symbol").primaryKey(),
  currency: text("currency").notNull(),
  price: real("price").notNull(),
  previousClose: real("previous_close"),
  changePercent: real("change_percent"),
  fetchedAt: text("fetched_at").notNull(),
})

export const securityMonthlyPrices = sqliteTable(
  "security_monthly_prices",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    symbol: text("symbol").notNull(),
    monthId: text("month_id").notNull(), // "YYYY-MM"
    closePrice: real("close_price").notNull(),
    currency: text("currency").notNull(),
    fetchedAt: text("fetched_at").notNull(),
  },
  (table) => [
    uniqueIndex("security_monthly_prices_symbol_month_unique").on(table.symbol, table.monthId),
    index("security_monthly_prices_month_idx").on(table.monthId),
  ],
)
