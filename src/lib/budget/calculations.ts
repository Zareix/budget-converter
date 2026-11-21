import { getLocale } from "@/paraglide/runtime"

export type SharePresetLike = {
  label: string
  percent: number
  color?: string | null
}

export const DEFAULT_SHARE_PRESETS: ReadonlyArray<SharePresetLike> = [
  { label: "Personal", percent: 100, color: "#10b981" },
  { label: "Shared", percent: 50, color: "#0ea5e9" },
  { label: "Other", percent: 0, color: "#64748b" },
]

export const getShareLabel = (
  sharePercent: number,
  presets: ReadonlyArray<SharePresetLike> = DEFAULT_SHARE_PRESETS,
): string => {
  const matched = presets.find((p) => p.percent === sharePercent)
  if (matched) return matched.label
  return `${sharePercent}%`
}

export const cycleSharePercent = (
  current: number,
  presets: ReadonlyArray<SharePresetLike> = DEFAULT_SHARE_PRESETS,
): number => {
  const list = presets.length > 0 ? presets : DEFAULT_SHARE_PRESETS
  const idx = list.findIndex((p) => p.percent === current)
  const next = list[(idx + 1) % list.length]
  return next ? next.percent : 100
}

/**
 * Computes effective share in integer cents using symmetric rounding so
 * an expense and an identical refund cancel out cleanly to 0.
 */
export const computeShareCents = (amountCents: number, sharePercent: number): number => {
  if (amountCents === 0 || sharePercent === 0) return 0
  const sign = amountCents < 0 ? -1 : 1
  return sign * Math.round((Math.abs(amountCents) * sharePercent) / 100)
}

export const eurosToCents = (value: number): number => {
  if (!Number.isFinite(value)) return 0
  const sign = value < 0 ? -1 : 1
  return sign * Math.round(Math.abs(value) * 100)
}

export const parseAmountToCents = (raw: string): number => {
  const normalized = raw.trim().replace(/\s+/g, "").replace(",", ".")
  if (!normalized) return 0
  const parsed = Number.parseFloat(normalized)
  if (!Number.isFinite(parsed)) return 0
  return eurosToCents(parsed)
}

export const centsToEuros = (cents: number): number => cents / 100

const resolveIntlLocale = (locale?: string): string => {
  const active = locale ?? getLocale()
  if (active === "fr") return "fr-FR"
  if (active === "en") return "en-US"
  return active
}

export const formatCents = (
  cents: number,
  options?: { signed?: boolean; locale?: string },
): string => {
  const formatted = new Intl.NumberFormat(resolveIntlLocale(options?.locale), {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100)
  if (options?.signed && cents > 0) {
    return `+${formatted}`
  }
  return formatted
}

export const formatCentsPlain = (cents: number): string => (cents / 100).toFixed(2)

export const isValidMonthId = (value: string): boolean => /^\d{4}-(0[1-9]|1[0-2])$/.test(value)

export const getCurrentMonthId = (now = new Date()): string => {
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  return `${year}-${month}`
}

export const shiftMonthId = (monthId: string, deltaMonths: number): string => {
  const [yearStr, monthStr] = monthId.split("-")
  const year = Number.parseInt(yearStr ?? "", 10)
  const month = Number.parseInt(monthStr ?? "", 10)
  const date = new Date(Date.UTC(year, month - 1 + deltaMonths, 1))
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`
}

export const formatMonthLabel = (monthId: string, locale?: string): string => {
  if (!isValidMonthId(monthId)) return monthId
  const [yearStr, monthStr] = monthId.split("-")
  const date = new Date(
    Date.UTC(Number.parseInt(yearStr ?? "2026", 10), Number.parseInt(monthStr ?? "1", 10) - 1, 1),
  )
  const formatted = new Intl.DateTimeFormat(resolveIntlLocale(locale), {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export type BillLike = {
  budgetCents: number
  sharePercent: number
  paid: boolean
}

export type IncomeLike = {
  expectedCents: number
  actualCents: number | null
}

export type SavingLike = {
  budgetCents: number
  actualCents: number | null
}

export type CategoryBudgetLike = {
  categorySlug: string
  budgetCents: number
}

export type TransactionLike = {
  categorySlug: string
  amountCents: number
  sharePercent: number
  excluded: boolean
}

export type CategoryEnvelopeSummary = {
  categorySlug: string
  budgetCents: number
  actualCents: number
  remainingCents: number
  overBudget: boolean
}

export type MonthSummary = {
  income: { budgetCents: number; actualCents: number }
  bills: {
    grossBudgetCents: number
    grossActualCents: number
    budgetCents: number
    actualCents: number
  }
  expenses: { budgetCents: number; actualCents: number }
  savings: { budgetCents: number; actualCents: number }
  remaining: { budgetCents: number; actualCents: number }
  byCategory: Record<string, CategoryEnvelopeSummary>
}

export const computeMonthSummary = ({
  bills,
  incomes,
  savings,
  categoryBudgets,
  transactions,
}: {
  bills: Array<BillLike>
  incomes: Array<IncomeLike>
  savings: Array<SavingLike>
  categoryBudgets: Array<CategoryBudgetLike>
  transactions: Array<TransactionLike>
}): MonthSummary => {
  let incomeBudgetCents = 0
  let incomeActualCents = 0
  for (const item of incomes) {
    incomeBudgetCents += item.expectedCents
    incomeActualCents += item.actualCents ?? 0
  }

  let billsGrossBudgetCents = 0
  let billsGrossActualCents = 0
  let billsBudgetCents = 0
  let billsActualCents = 0
  for (const bill of bills) {
    const shareCents = computeShareCents(bill.budgetCents, bill.sharePercent)
    billsGrossBudgetCents += bill.budgetCents
    billsBudgetCents += shareCents
    if (bill.paid) {
      billsGrossActualCents += bill.budgetCents
      billsActualCents += shareCents
    }
  }

  let savingsBudgetCents = 0
  let savingsActualCents = 0
  for (const saving of savings) {
    savingsBudgetCents += saving.budgetCents
    savingsActualCents += saving.actualCents ?? 0
  }

  const byCategory: Record<string, CategoryEnvelopeSummary> = {}
  let expensesBudgetCents = 0
  for (const cb of categoryBudgets) {
    expensesBudgetCents += cb.budgetCents
    const existing = byCategory[cb.categorySlug]
    if (existing) {
      existing.budgetCents += cb.budgetCents
      existing.remainingCents = existing.budgetCents - existing.actualCents
      existing.overBudget = existing.actualCents > existing.budgetCents
    } else {
      byCategory[cb.categorySlug] = {
        categorySlug: cb.categorySlug,
        budgetCents: cb.budgetCents,
        actualCents: 0,
        remainingCents: cb.budgetCents,
        overBudget: false,
      }
    }
  }

  let expensesActualCents = 0
  for (const tx of transactions) {
    if (tx.excluded) continue
    const shareCents = computeShareCents(tx.amountCents, tx.sharePercent)
    expensesActualCents += shareCents
    const existing = byCategory[tx.categorySlug]
    if (existing) {
      existing.actualCents += shareCents
      existing.remainingCents = existing.budgetCents - existing.actualCents
      existing.overBudget = existing.actualCents > existing.budgetCents
    } else {
      byCategory[tx.categorySlug] = {
        categorySlug: tx.categorySlug,
        budgetCents: 0,
        actualCents: shareCents,
        remainingCents: -shareCents,
        overBudget: shareCents > 0,
      }
    }
  }

  const remainingBudgetCents =
    incomeBudgetCents - (billsBudgetCents + expensesBudgetCents + savingsBudgetCents)
  const remainingActualCents =
    incomeActualCents - (billsActualCents + expensesActualCents + savingsActualCents)

  return {
    income: { budgetCents: incomeBudgetCents, actualCents: incomeActualCents },
    bills: {
      grossBudgetCents: billsGrossBudgetCents,
      grossActualCents: billsGrossActualCents,
      budgetCents: billsBudgetCents,
      actualCents: billsActualCents,
    },
    expenses: { budgetCents: expensesBudgetCents, actualCents: expensesActualCents },
    savings: { budgetCents: savingsBudgetCents, actualCents: savingsActualCents },
    remaining: { budgetCents: remainingBudgetCents, actualCents: remainingActualCents },
    byCategory,
  }
}
