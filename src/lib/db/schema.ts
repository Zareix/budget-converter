import { index, integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core"

export const ACCOUNT_TYPES = ["checking", "savings", "joint", "investment", "other"] as const
export type AccountType = (typeof ACCOUNT_TYPES)[number]

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
    paid: integer("paid", { mode: "boolean" }).notNull().default(false),
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
