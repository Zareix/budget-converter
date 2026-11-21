import { and, asc, desc, eq, inArray } from "drizzle-orm"

import { computeMonthSummary } from "@/lib/budget/calculations"
import { getCategories } from "@/lib/categories"
import { db, runTransaction } from "@/lib/db"
import {
  accounts,
  bills,
  categoryBudgets,
  incomes,
  months,
  paymentMethods,
  savings,
  transactions,
} from "@/lib/db/schema"

// -------------------------------- MONTHS -------------------------------- //

export const listMonths = async () => {
  return db.select().from(months).orderBy(desc(months.id))
}

export const getMonth = async (monthId: string) => {
  return db.select().from(months).where(eq(months.id, monthId)).get() ?? null
}

export const createMonth = async (monthId: string) => {
  const existing = await getMonth(monthId)
  if (existing) return existing
  const [created] = await db
    .insert(months)
    .values({ id: monthId, createdAt: new Date().toISOString() })
    .returning()
  return created
}

export const deleteMonth = async (monthId: string) => {
  await db.delete(months).where(eq(months.id, monthId))
}

export const cloneMonth = async ({
  sourceMonthId,
  targetMonthId,
}: {
  sourceMonthId: string
  targetMonthId: string
}) => {
  if (sourceMonthId === targetMonthId) {
    throw new Error("Source and target months must be different")
  }
  const existingTarget = await getMonth(targetMonthId)
  if (existingTarget) {
    throw new Error(`Month ${targetMonthId} already exists`)
  }
  const existingSource = await getMonth(sourceMonthId)
  if (!existingSource) {
    throw new Error(`Source month ${sourceMonthId} not found`)
  }

  return runTransaction(db, async (tx) => {
    const [createdMonth] = await tx
      .insert(months)
      .values({ id: targetMonthId, createdAt: new Date().toISOString() })
      .returning()

    const sourceBudgets = await tx
      .select()
      .from(categoryBudgets)
      .where(eq(categoryBudgets.monthId, sourceMonthId))
    if (sourceBudgets.length > 0) {
      await tx.insert(categoryBudgets).values(
        sourceBudgets.map((cb) => ({
          monthId: targetMonthId,
          categorySlug: cb.categorySlug,
          budgetCents: cb.budgetCents,
        })),
      )
    }

    const sourceBills = await tx
      .select()
      .from(bills)
      .where(eq(bills.monthId, sourceMonthId))
      .orderBy(asc(bills.sortOrder), asc(bills.id))
    if (sourceBills.length > 0) {
      await tx.insert(bills).values(
        sourceBills.map((b) => ({
          monthId: targetMonthId,
          name: b.name,
          dueDay: b.dueDay,
          fromAccountId: b.fromAccountId,
          sharePercent: b.sharePercent,
          budgetCents: b.budgetCents,
          actualCents: null,
          paid: false,
          sortOrder: b.sortOrder,
        })),
      )
    }

    const sourceIncomes = await tx
      .select()
      .from(incomes)
      .where(eq(incomes.monthId, sourceMonthId))
      .orderBy(asc(incomes.sortOrder), asc(incomes.id))
    if (sourceIncomes.length > 0) {
      await tx.insert(incomes).values(
        sourceIncomes.map((inc) => ({
          monthId: targetMonthId,
          name: inc.name,
          dueDate: inc.dueDate,
          expectedCents: inc.expectedCents,
          actualCents: null,
          sortOrder: inc.sortOrder,
        })),
      )
    }

    const sourceSavings = await tx
      .select()
      .from(savings)
      .where(eq(savings.monthId, sourceMonthId))
      .orderBy(asc(savings.sortOrder), asc(savings.id))
    if (sourceSavings.length > 0) {
      await tx.insert(savings).values(
        sourceSavings.map((s) => ({
          monthId: targetMonthId,
          name: s.name,
          budgetCents: s.budgetCents,
          actualCents: null,
          sortOrder: s.sortOrder,
        })),
      )
    }

    return createdMonth
  })
}

export const getMonthDashboard = async (monthId: string) => {
  const month = await getMonth(monthId)
  const [
    allCategories,
    allAccounts,
    allPaymentMethods,
    monthBills,
    monthIncomes,
    monthSavings,
    monthCategoryBudgets,
    monthTransactions,
  ] = await Promise.all([
    getCategories(),
    db.select().from(accounts).orderBy(asc(accounts.sortOrder), asc(accounts.id)),
    db.select().from(paymentMethods).orderBy(asc(paymentMethods.sortOrder), asc(paymentMethods.id)),
    db
      .select()
      .from(bills)
      .where(eq(bills.monthId, monthId))
      .orderBy(asc(bills.sortOrder), asc(bills.id)),
    db
      .select()
      .from(incomes)
      .where(eq(incomes.monthId, monthId))
      .orderBy(asc(incomes.sortOrder), asc(incomes.id)),
    db
      .select()
      .from(savings)
      .where(eq(savings.monthId, monthId))
      .orderBy(asc(savings.sortOrder), asc(savings.id)),
    db.select().from(categoryBudgets).where(eq(categoryBudgets.monthId, monthId)),
    db
      .select()
      .from(transactions)
      .where(eq(transactions.monthId, monthId))
      .orderBy(desc(transactions.date), desc(transactions.id)),
  ])

  const summary = computeMonthSummary({
    bills: monthBills,
    incomes: monthIncomes,
    savings: monthSavings,
    categoryBudgets: monthCategoryBudgets,
    transactions: monthTransactions,
  })

  return {
    exists: month !== null,
    month,
    categories: allCategories,
    accounts: allAccounts,
    paymentMethods: allPaymentMethods,
    bills: monthBills,
    incomes: monthIncomes,
    savings: monthSavings,
    categoryBudgets: monthCategoryBudgets,
    transactionsCount: monthTransactions.length,
    summary,
  }
}

// -------------------------------- BILLS -------------------------------- //

export const addBill = async (data: {
  monthId: string
  name: string
  dueDay?: number | null
  fromAccountId?: number | null
  sharePercent: number
  budgetCents: number
  actualCents?: number | null
  paid?: boolean
}) => {
  await createMonth(data.monthId)
  const existing = await db.select().from(bills).where(eq(bills.monthId, data.monthId))
  const nextSortOrder = existing.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1
  const [created] = await db
    .insert(bills)
    .values({
      monthId: data.monthId,
      name: data.name.trim(),
      dueDay: data.dueDay ?? null,
      fromAccountId: data.fromAccountId ?? null,
      sharePercent: data.sharePercent,
      budgetCents: data.budgetCents,
      actualCents: data.actualCents ?? null,
      paid: data.paid ?? false,
      sortOrder: nextSortOrder,
    })
    .returning()
  return created
}

export const updateBill = async (data: {
  id: number
  name?: string
  dueDay?: number | null
  fromAccountId?: number | null
  sharePercent?: number
  budgetCents?: number
  actualCents?: number | null
  paid?: boolean
  sortOrder?: number
}) => {
  const { id, ...fields } = data
  const [updated] = await db
    .update(bills)
    .set({
      ...(fields.name !== undefined && { name: fields.name.trim() }),
      ...(fields.dueDay !== undefined && { dueDay: fields.dueDay }),
      ...(fields.fromAccountId !== undefined && { fromAccountId: fields.fromAccountId }),
      ...(fields.sharePercent !== undefined && { sharePercent: fields.sharePercent }),
      ...(fields.budgetCents !== undefined && { budgetCents: fields.budgetCents }),
      ...(fields.actualCents !== undefined && { actualCents: fields.actualCents }),
      ...(fields.paid !== undefined && { paid: fields.paid }),
      ...(fields.sortOrder !== undefined && { sortOrder: fields.sortOrder }),
    })
    .where(eq(bills.id, id))
    .returning()
  return updated
}

export const deleteBill = async (id: number) => {
  await db.delete(bills).where(eq(bills.id, id))
}

// -------------------------------- INCOMES -------------------------------- //

export const addIncome = async (data: {
  monthId: string
  name: string
  dueDate?: string | null
  expectedCents: number
  actualCents?: number | null
}) => {
  await createMonth(data.monthId)
  const existing = await db.select().from(incomes).where(eq(incomes.monthId, data.monthId))
  const nextSortOrder = existing.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1
  const [created] = await db
    .insert(incomes)
    .values({
      monthId: data.monthId,
      name: data.name.trim(),
      dueDate: data.dueDate?.trim() || null,
      expectedCents: data.expectedCents,
      actualCents: data.actualCents ?? null,
      sortOrder: nextSortOrder,
    })
    .returning()
  return created
}

export const updateIncome = async (data: {
  id: number
  name?: string
  dueDate?: string | null
  expectedCents?: number
  actualCents?: number | null
  sortOrder?: number
}) => {
  const { id, ...fields } = data
  const [updated] = await db
    .update(incomes)
    .set({
      ...(fields.name !== undefined && { name: fields.name.trim() }),
      ...(fields.dueDate !== undefined && { dueDate: fields.dueDate?.trim() || null }),
      ...(fields.expectedCents !== undefined && { expectedCents: fields.expectedCents }),
      ...(fields.actualCents !== undefined && { actualCents: fields.actualCents }),
      ...(fields.sortOrder !== undefined && { sortOrder: fields.sortOrder }),
    })
    .where(eq(incomes.id, id))
    .returning()
  return updated
}

export const deleteIncome = async (id: number) => {
  await db.delete(incomes).where(eq(incomes.id, id))
}

// -------------------------------- SAVINGS -------------------------------- //

export const addSaving = async (data: {
  monthId: string
  name: string
  budgetCents: number
  actualCents?: number | null
}) => {
  await createMonth(data.monthId)
  const existing = await db.select().from(savings).where(eq(savings.monthId, data.monthId))
  const nextSortOrder = existing.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1
  const [created] = await db
    .insert(savings)
    .values({
      monthId: data.monthId,
      name: data.name.trim(),
      budgetCents: data.budgetCents,
      actualCents: data.actualCents ?? null,
      sortOrder: nextSortOrder,
    })
    .returning()
  return created
}

export const updateSaving = async (data: {
  id: number
  name?: string
  budgetCents?: number
  actualCents?: number | null
  sortOrder?: number
}) => {
  const { id, ...fields } = data
  const [updated] = await db
    .update(savings)
    .set({
      ...(fields.name !== undefined && { name: fields.name.trim() }),
      ...(fields.budgetCents !== undefined && { budgetCents: fields.budgetCents }),
      ...(fields.actualCents !== undefined && { actualCents: fields.actualCents }),
      ...(fields.sortOrder !== undefined && { sortOrder: fields.sortOrder }),
    })
    .where(eq(savings.id, id))
    .returning()
  return updated
}

export const deleteSaving = async (id: number) => {
  await db.delete(savings).where(eq(savings.id, id))
}

// -------------------------------- CATEGORY BUDGETS -------------------------------- //

export const upsertCategoryBudget = async ({
  monthId,
  categorySlug,
  budgetCents,
}: {
  monthId: string
  categorySlug: string
  budgetCents: number
}) => {
  await createMonth(monthId)
  const existing = db
    .select()
    .from(categoryBudgets)
    .where(
      and(eq(categoryBudgets.monthId, monthId), eq(categoryBudgets.categorySlug, categorySlug)),
    )
    .get()

  if (existing) {
    const [updated] = await db
      .update(categoryBudgets)
      .set({ budgetCents })
      .where(eq(categoryBudgets.id, existing.id))
      .returning()
    return updated
  }

  const [created] = await db
    .insert(categoryBudgets)
    .values({ monthId, categorySlug, budgetCents })
    .returning()
  return created
}

// -------------------------------- TRANSACTIONS -------------------------------- //

export const listMonthTransactions = async (monthId: string) => {
  return db
    .select()
    .from(transactions)
    .where(eq(transactions.monthId, monthId))
    .orderBy(desc(transactions.date), desc(transactions.id))
}

export const addTransaction = async (data: {
  monthId: string
  date: string
  name: string
  sourceName?: string | null
  amountCents: number
  sharePercent: number
  categorySlug: string
  paymentMethodId?: number | null
  excluded?: boolean
  externalId?: string | null
  raw?: string | null
}) => {
  await createMonth(data.monthId)
  const [created] = await db
    .insert(transactions)
    .values({
      monthId: data.monthId,
      date: data.date,
      name: data.name.trim(),
      sourceName: data.sourceName ?? null,
      amountCents: data.amountCents,
      sharePercent: data.sharePercent,
      categorySlug: data.categorySlug,
      paymentMethodId: data.paymentMethodId ?? null,
      excluded: data.excluded ?? false,
      externalId: data.externalId ?? null,
      raw: data.raw ?? null,
      createdAt: new Date().toISOString(),
    })
    .returning()
  return created
}

export const updateTransaction = async (data: {
  id: number
  monthId?: string
  date?: string
  name?: string
  amountCents?: number
  sharePercent?: number
  categorySlug?: string
  paymentMethodId?: number | null
  excluded?: boolean
}) => {
  const { id, ...fields } = data
  if (fields.monthId) {
    await createMonth(fields.monthId)
  }
  const [updated] = await db
    .update(transactions)
    .set({
      ...(fields.monthId !== undefined && { monthId: fields.monthId }),
      ...(fields.date !== undefined && { date: fields.date }),
      ...(fields.name !== undefined && { name: fields.name.trim() }),
      ...(fields.amountCents !== undefined && { amountCents: fields.amountCents }),
      ...(fields.sharePercent !== undefined && { sharePercent: fields.sharePercent }),
      ...(fields.categorySlug !== undefined && { categorySlug: fields.categorySlug }),
      ...(fields.paymentMethodId !== undefined && { paymentMethodId: fields.paymentMethodId }),
      ...(fields.excluded !== undefined && { excluded: fields.excluded }),
    })
    .where(eq(transactions.id, id))
    .returning()
  return updated
}

export const deleteTransaction = async (id: number) => {
  await db.delete(transactions).where(eq(transactions.id, id))
}

export const getExistingExternalIds = async (ids: Array<string>): Promise<Array<string>> => {
  const cleanIds = Array.from(new Set(ids.filter((id) => id.length > 0)))
  if (cleanIds.length === 0) return []
  const rows = await db
    .select({ externalId: transactions.externalId })
    .from(transactions)
    .where(inArray(transactions.externalId, cleanIds))
  return rows.map((r) => r.externalId).filter((id): id is string => id !== null)
}

export type ImportTransactionInput = {
  monthId: string
  date: string
  name: string
  sourceName?: string | null
  amountCents: number
  sharePercent: number
  categorySlug: string
  paymentMethodId?: number | null
  excluded?: boolean
  externalId?: string | null
  raw?: string | null
}

export const importTransactions = async (
  items: Array<ImportTransactionInput>,
): Promise<{ imported: number; skipped: number }> => {
  if (items.length === 0) return { imported: 0, skipped: 0 }

  return runTransaction(db, async (tx) => {
    const now = new Date().toISOString()
    const uniqueMonths = Array.from(new Set(items.map((item) => item.monthId)))
    for (const monthId of uniqueMonths) {
      await tx.insert(months).values({ id: monthId, createdAt: now }).onConflictDoNothing()
    }

    let imported = 0
    let skipped = 0

    for (const item of items) {
      const inserted = await tx
        .insert(transactions)
        .values({
          monthId: item.monthId,
          date: item.date,
          name: item.name.trim(),
          sourceName: item.sourceName ?? null,
          amountCents: item.amountCents,
          sharePercent: item.sharePercent,
          categorySlug: item.categorySlug,
          paymentMethodId: item.paymentMethodId ?? null,
          excluded: item.excluded ?? false,
          externalId: item.externalId ?? null,
          raw: item.raw ?? null,
          createdAt: now,
        })
        .onConflictDoNothing({ target: transactions.externalId })
        .returning({ id: transactions.id })

      if (inserted.length > 0) {
        imported += 1
      } else {
        skipped += 1
      }
    }

    return { imported, skipped }
  })
}
