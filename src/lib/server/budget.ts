import { createServerFn } from "@tanstack/react-start"
import * as v from "valibot"

import * as accounts from "@/lib/accounts"
import * as budget from "@/lib/budget"
import { ACCOUNT_TYPES } from "@/lib/db/schema"
import { SUBTRACKER_METRICS } from "@/lib/fetcher/subtracker"
import * as paymentMethods from "@/lib/payment-methods"
import * as sharePresets from "@/lib/share-presets"
import * as subtracker from "@/lib/subtracker"

const monthIdSchema = v.pipe(
  v.string(),
  v.regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Month must be YYYY-MM"),
)

const isoDateSchema = v.pipe(v.string(), v.regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"))

const sharePercentSchema = v.pipe(
  v.number(),
  v.integer("Share must be an integer"),
  v.minValue(0, "Share must be between 0 and 100"),
  v.maxValue(100, "Share must be between 0 and 100"),
)

const slugSchema = v.pipe(v.string(), v.regex(/^[\p{L}\p{N}/_-]+$/u, "Invalid slug"))

// -------------------------------- ACCOUNTS -------------------------------- //

export const getAccounts = createServerFn().handler(accounts.getAccounts)

export const addAccount = createServerFn({ method: "POST" })
  .validator(
    v.object({
      slug: slugSchema,
      name: v.pipe(v.string(), v.minLength(1, "Name is required")),
      type: v.picklist(ACCOUNT_TYPES),
      color: v.optional(v.nullable(v.string())),
      sortOrder: v.optional(v.pipe(v.number(), v.integer())),
    }),
  )
  .handler(({ data }) => accounts.addAccount(data))

export const editAccount = createServerFn({ method: "POST" })
  .validator(
    v.object({
      id: v.pipe(v.number(), v.integer()),
      name: v.pipe(v.string(), v.minLength(1, "Name is required")),
      type: v.picklist(ACCOUNT_TYPES),
      color: v.optional(v.nullable(v.string())),
      sortOrder: v.optional(v.pipe(v.number(), v.integer())),
    }),
  )
  .handler(({ data }) => accounts.editAccount(data))

export const deleteAccount = createServerFn({ method: "POST" })
  .validator(v.object({ id: v.pipe(v.number(), v.integer()) }))
  .handler(({ data }) => accounts.deleteAccount(data))

// -------------------------------- PAYMENT METHODS -------------------------------- //

export const getPaymentMethods = createServerFn().handler(paymentMethods.getPaymentMethods)

export const addPaymentMethod = createServerFn({ method: "POST" })
  .validator(
    v.object({
      slug: slugSchema,
      label: v.pipe(v.string(), v.minLength(1, "Label is required")),
      color: v.optional(v.nullable(v.string())),
      defaultSharePercent: sharePercentSchema,
      sortOrder: v.optional(v.pipe(v.number(), v.integer())),
    }),
  )
  .handler(({ data }) => paymentMethods.addPaymentMethod(data))

export const editPaymentMethod = createServerFn({ method: "POST" })
  .validator(
    v.object({
      id: v.pipe(v.number(), v.integer()),
      label: v.pipe(v.string(), v.minLength(1, "Label is required")),
      color: v.optional(v.nullable(v.string())),
      defaultSharePercent: sharePercentSchema,
      sortOrder: v.optional(v.pipe(v.number(), v.integer())),
    }),
  )
  .handler(({ data }) => paymentMethods.editPaymentMethod(data))

export const deletePaymentMethod = createServerFn({ method: "POST" })
  .validator(v.object({ id: v.pipe(v.number(), v.integer()) }))
  .handler(({ data }) => paymentMethods.deletePaymentMethod(data))

// -------------------------------- SHARE PRESETS -------------------------------- //

export const getSharePresets = createServerFn().handler(sharePresets.getSharePresets)

export const addSharePreset = createServerFn({ method: "POST" })
  .validator(
    v.object({
      label: v.pipe(v.string(), v.minLength(1, "Label is required")),
      percent: sharePercentSchema,
      color: v.optional(v.nullable(v.string())),
      sortOrder: v.optional(v.pipe(v.number(), v.integer())),
    }),
  )
  .handler(({ data }) => sharePresets.addSharePreset(data))

export const editSharePreset = createServerFn({ method: "POST" })
  .validator(
    v.object({
      id: v.pipe(v.number(), v.integer()),
      label: v.pipe(v.string(), v.minLength(1, "Label is required")),
      percent: sharePercentSchema,
      color: v.optional(v.nullable(v.string())),
      sortOrder: v.optional(v.pipe(v.number(), v.integer())),
    }),
  )
  .handler(({ data }) => sharePresets.editSharePreset(data))

export const deleteSharePreset = createServerFn({ method: "POST" })
  .validator(v.object({ id: v.pipe(v.number(), v.integer()) }))
  .handler(({ data }) => sharePresets.deleteSharePreset(data))

// -------------------------------- MONTHS -------------------------------- //

export const listMonths = createServerFn().handler(budget.listMonths)

export const getMonthDashboard = createServerFn()
  .validator(v.object({ monthId: monthIdSchema }))
  .handler(({ data }) => budget.getMonthDashboard(data.monthId))

export const createMonth = createServerFn({ method: "POST" })
  .validator(v.object({ monthId: monthIdSchema }))
  .handler(({ data }) => budget.createMonth(data.monthId))

export const cloneMonth = createServerFn({ method: "POST" })
  .validator(
    v.object({
      sourceMonthId: monthIdSchema,
      targetMonthId: monthIdSchema,
    }),
  )
  .handler(({ data }) => budget.cloneMonth(data))

export const deleteMonth = createServerFn({ method: "POST" })
  .validator(v.object({ monthId: monthIdSchema }))
  .handler(({ data }) => budget.deleteMonth(data.monthId))

// -------------------------------- BILLS -------------------------------- //

export const addBill = createServerFn({ method: "POST" })
  .validator(
    v.object({
      monthId: monthIdSchema,
      name: v.pipe(v.string(), v.minLength(1, "Name is required")),
      dueDay: v.optional(
        v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(31))),
      ),
      fromAccountId: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      sharePercent: sharePercentSchema,
      budgetCents: v.pipe(v.number(), v.integer()),
      actualCents: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      paid: v.optional(v.boolean()),
    }),
  )
  .handler(({ data }) => budget.addBill(data))

export const updateBill = createServerFn({ method: "POST" })
  .validator(
    v.object({
      id: v.pipe(v.number(), v.integer()),
      name: v.optional(v.pipe(v.string(), v.minLength(1))),
      dueDay: v.optional(
        v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(31))),
      ),
      fromAccountId: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      sharePercent: v.optional(sharePercentSchema),
      budgetCents: v.optional(v.pipe(v.number(), v.integer())),
      actualCents: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      paid: v.optional(v.boolean()),
      sortOrder: v.optional(v.pipe(v.number(), v.integer())),
    }),
  )
  .handler(({ data }) => budget.updateBill(data))

export const deleteBill = createServerFn({ method: "POST" })
  .validator(v.object({ id: v.pipe(v.number(), v.integer()) }))
  .handler(({ data }) => budget.deleteBill(data.id))

// -------------------------------- INCOMES -------------------------------- //

export const addIncome = createServerFn({ method: "POST" })
  .validator(
    v.object({
      monthId: monthIdSchema,
      name: v.pipe(v.string(), v.minLength(1, "Name is required")),
      dueDate: v.optional(v.nullable(v.string())),
      expectedCents: v.pipe(v.number(), v.integer()),
      actualCents: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
    }),
  )
  .handler(({ data }) => budget.addIncome(data))

export const updateIncome = createServerFn({ method: "POST" })
  .validator(
    v.object({
      id: v.pipe(v.number(), v.integer()),
      name: v.optional(v.pipe(v.string(), v.minLength(1))),
      dueDate: v.optional(v.nullable(v.string())),
      expectedCents: v.optional(v.pipe(v.number(), v.integer())),
      actualCents: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      sortOrder: v.optional(v.pipe(v.number(), v.integer())),
    }),
  )
  .handler(({ data }) => budget.updateIncome(data))

export const deleteIncome = createServerFn({ method: "POST" })
  .validator(v.object({ id: v.pipe(v.number(), v.integer()) }))
  .handler(({ data }) => budget.deleteIncome(data.id))

// -------------------------------- SAVINGS -------------------------------- //

export const addSaving = createServerFn({ method: "POST" })
  .validator(
    v.object({
      monthId: monthIdSchema,
      name: v.pipe(v.string(), v.minLength(1, "Name is required")),
      budgetCents: v.pipe(v.number(), v.integer()),
      actualCents: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
    }),
  )
  .handler(({ data }) => budget.addSaving(data))

export const updateSaving = createServerFn({ method: "POST" })
  .validator(
    v.object({
      id: v.pipe(v.number(), v.integer()),
      name: v.optional(v.pipe(v.string(), v.minLength(1))),
      budgetCents: v.optional(v.pipe(v.number(), v.integer())),
      actualCents: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      sortOrder: v.optional(v.pipe(v.number(), v.integer())),
    }),
  )
  .handler(({ data }) => budget.updateSaving(data))

export const deleteSaving = createServerFn({ method: "POST" })
  .validator(v.object({ id: v.pipe(v.number(), v.integer()) }))
  .handler(({ data }) => budget.deleteSaving(data.id))

// -------------------------------- CATEGORY BUDGETS -------------------------------- //

export const upsertCategoryBudget = createServerFn({ method: "POST" })
  .validator(
    v.object({
      monthId: monthIdSchema,
      categorySlug: v.pipe(v.string(), v.minLength(1)),
      budgetCents: v.pipe(v.number(), v.integer(), v.minValue(0)),
    }),
  )
  .handler(({ data }) => budget.upsertCategoryBudget(data))

// -------------------------------- TRANSACTIONS -------------------------------- //

export const listMonthTransactions = createServerFn()
  .validator(v.object({ monthId: monthIdSchema }))
  .handler(({ data }) => budget.listMonthTransactions(data.monthId))

export const addTransaction = createServerFn({ method: "POST" })
  .validator(
    v.object({
      monthId: monthIdSchema,
      date: isoDateSchema,
      name: v.pipe(v.string(), v.minLength(1, "Name is required")),
      sourceName: v.optional(v.nullable(v.string())),
      amountCents: v.pipe(v.number(), v.integer()),
      sharePercent: sharePercentSchema,
      categorySlug: v.pipe(v.string(), v.minLength(1, "Category is required")),
      paymentMethodId: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      excluded: v.optional(v.boolean()),
      externalId: v.optional(v.nullable(v.string())),
      raw: v.optional(v.nullable(v.string())),
    }),
  )
  .handler(({ data }) => budget.addTransaction(data))

export const updateTransaction = createServerFn({ method: "POST" })
  .validator(
    v.object({
      id: v.pipe(v.number(), v.integer()),
      monthId: v.optional(monthIdSchema),
      date: v.optional(isoDateSchema),
      name: v.optional(v.pipe(v.string(), v.minLength(1))),
      amountCents: v.optional(v.pipe(v.number(), v.integer())),
      sharePercent: v.optional(sharePercentSchema),
      categorySlug: v.optional(v.pipe(v.string(), v.minLength(1))),
      paymentMethodId: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      excluded: v.optional(v.boolean()),
    }),
  )
  .handler(({ data }) => budget.updateTransaction(data))

export const deleteTransaction = createServerFn({ method: "POST" })
  .validator(v.object({ id: v.pipe(v.number(), v.integer()) }))
  .handler(({ data }) => budget.deleteTransaction(data.id))

export const getExistingExternalIds = createServerFn({ method: "POST" })
  .validator(v.object({ ids: v.array(v.string()) }))
  .handler(({ data }) => budget.getExistingExternalIds(data.ids))

export const importTransactions = createServerFn({ method: "POST" })
  .validator(
    v.object({
      items: v.array(
        v.object({
          monthId: monthIdSchema,
          date: isoDateSchema,
          name: v.pipe(v.string(), v.minLength(1)),
          sourceName: v.optional(v.nullable(v.string())),
          amountCents: v.pipe(v.number(), v.integer()),
          sharePercent: sharePercentSchema,
          categorySlug: v.pipe(v.string(), v.minLength(1)),
          paymentMethodId: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
          excluded: v.optional(v.boolean()),
          externalId: v.optional(v.nullable(v.string())),
          raw: v.optional(v.nullable(v.string())),
        }),
      ),
    }),
  )
  .handler(({ data }) => budget.importTransactions(data.items))

// -------------------------------- SUBTRACKER SYNC -------------------------------- //

export const getSubtrackerStatus = createServerFn().handler(subtracker.getSubtrackerStatus)

export const getSubtrackerBillRules = createServerFn().handler(subtracker.getSubtrackerBillRules)

export const addSubtrackerBillRule = createServerFn({ method: "POST" })
  .validator(
    v.object({
      name: v.pipe(v.string(), v.minLength(1, "Name is required")),
      fromAccountId: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      sharePercent: sharePercentSchema,
      dueDay: v.optional(
        v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(31))),
      ),
      paymentMethodIds: v.optional(v.nullable(v.string())),
      categoryIds: v.optional(v.nullable(v.string())),
      enabled: v.optional(v.boolean()),
      sortOrder: v.optional(v.pipe(v.number(), v.integer())),
    }),
  )
  .handler(({ data }) => subtracker.addSubtrackerBillRule(data))

export const editSubtrackerBillRule = createServerFn({ method: "POST" })
  .validator(
    v.object({
      id: v.pipe(v.number(), v.integer()),
      name: v.pipe(v.string(), v.minLength(1, "Name is required")),
      fromAccountId: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      sharePercent: sharePercentSchema,
      dueDay: v.optional(
        v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(31))),
      ),
      paymentMethodIds: v.optional(v.nullable(v.string())),
      categoryIds: v.optional(v.nullable(v.string())),
      enabled: v.boolean(),
      sortOrder: v.optional(v.pipe(v.number(), v.integer())),
    }),
  )
  .handler(({ data }) => subtracker.editSubtrackerBillRule(data))

export const deleteSubtrackerBillRule = createServerFn({ method: "POST" })
  .validator(v.object({ id: v.pipe(v.number(), v.integer()) }))
  .handler(({ data }) => subtracker.deleteSubtrackerBillRule(data.id))

export const testSubtrackerRule = createServerFn({ method: "POST" })
  .validator(
    v.object({
      paymentMethodIds: v.optional(v.nullable(v.string())),
      categoryIds: v.optional(v.nullable(v.string())),
    }),
  )
  .handler(({ data }) => subtracker.testSubtrackerRule(data))

export const previewSubtrackerBillsSync = createServerFn({ method: "POST" })
  .validator(
    v.object({
      monthId: monthIdSchema,
      metric: v.optional(v.picklist(SUBTRACKER_METRICS)),
    }),
  )
  .handler(({ data }) => subtracker.previewSubtrackerBillsSync(data))

export const applySubtrackerBillsSync = createServerFn({ method: "POST" })
  .validator(
    v.object({
      monthId: monthIdSchema,
      metric: v.optional(v.picklist(SUBTRACKER_METRICS)),
    }),
  )
  .handler(({ data }) => subtracker.applySubtrackerBillsSync(data))
