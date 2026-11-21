import { and, asc, eq } from "drizzle-orm"

import { db, runTransaction } from "@/lib/db"
import { bills, months, subtrackerBillRules } from "@/lib/db/schema"
import type { SubtrackerMetric } from "@/lib/fetcher/subtracker"
import {
  fetchSubtrackerStats,
  isActive,
  normalizeCsvIds,
  pickMetricCents,
  resolveMetricForMonth,
} from "@/lib/fetcher/subtracker"

export type SubtrackerBillRuleRow = typeof subtrackerBillRules.$inferSelect

export const getSubtrackerStatus = async () => {
  const rules = await getSubtrackerBillRules()
  return {
    configured: isActive(),
    activeRulesCount: rules.filter((r) => r.enabled).length,
  }
}

export const getSubtrackerBillRules = async () => {
  return db
    .select()
    .from(subtrackerBillRules)
    .orderBy(asc(subtrackerBillRules.sortOrder), asc(subtrackerBillRules.id))
}

export const addSubtrackerBillRule = async (data: {
  name: string
  fromAccountId?: number | null
  sharePercent: number
  dueDay?: number | null
  paymentMethodIds?: string | null
  categoryIds?: string | null
  enabled?: boolean
  sortOrder?: number
}) => {
  const existing = await getSubtrackerBillRules()
  const nextSortOrder =
    data.sortOrder ?? existing.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1
  const [created] = await db
    .insert(subtrackerBillRules)
    .values({
      name: data.name.trim(),
      fromAccountId: data.fromAccountId ?? null,
      sharePercent: data.sharePercent,
      dueDay: data.dueDay ?? null,
      paymentMethodIds: normalizeCsvIds(data.paymentMethodIds),
      categoryIds: normalizeCsvIds(data.categoryIds),
      enabled: data.enabled ?? true,
      sortOrder: nextSortOrder,
    })
    .returning()
  return created
}

export const editSubtrackerBillRule = async (data: {
  id: number
  name: string
  fromAccountId?: number | null
  sharePercent: number
  dueDay?: number | null
  paymentMethodIds?: string | null
  categoryIds?: string | null
  enabled: boolean
  sortOrder?: number
}) => {
  const [updated] = await db
    .update(subtrackerBillRules)
    .set({
      name: data.name.trim(),
      fromAccountId: data.fromAccountId ?? null,
      sharePercent: data.sharePercent,
      dueDay: data.dueDay ?? null,
      paymentMethodIds: normalizeCsvIds(data.paymentMethodIds),
      categoryIds: normalizeCsvIds(data.categoryIds),
      enabled: data.enabled,
      ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
    })
    .where(eq(subtrackerBillRules.id, data.id))
    .returning()
  return updated
}

export const deleteSubtrackerBillRule = async (id: number) => {
  await runTransaction(db, async (tx) => {
    await tx.update(bills).set({ subtrackerRuleId: null }).where(eq(bills.subtrackerRuleId, id))
    await tx.delete(subtrackerBillRules).where(eq(subtrackerBillRules.id, id))
  })
}

export const testSubtrackerRule = async ({
  paymentMethodIds,
  categoryIds,
}: {
  paymentMethodIds?: string | null
  categoryIds?: string | null
}) => {
  return fetchSubtrackerStats({ paymentMethodIds, categoryIds })
}

export type SubtrackerSyncPreviewItem = {
  ruleId: number
  name: string
  fromAccountId: number | null
  sharePercent: number
  dueDay: number | null
  existingBillId: number | null
  currentBudgetCents: number | null
  newBudgetCents: number
  action: "create" | "update" | "unchanged"
}

export type SubtrackerSyncPreview = {
  monthId: string
  metric: SubtrackerMetric
  autoResolvedMetric: SubtrackerMetric | null
  items: Array<SubtrackerSyncPreviewItem>
}

export const previewSubtrackerBillsSync = async ({
  monthId,
  metric,
  fetchStats = fetchSubtrackerStats,
}: {
  monthId: string
  metric?: SubtrackerMetric
  fetchStats?: typeof fetchSubtrackerStats
}): Promise<SubtrackerSyncPreview> => {
  const autoResolvedMetric = resolveMetricForMonth(monthId)
  const resolvedMetric: SubtrackerMetric = metric ?? autoResolvedMetric ?? "totalThisMonth"

  const [rules, existingBills] = await Promise.all([
    getSubtrackerBillRules(),
    db.select().from(bills).where(eq(bills.monthId, monthId)),
  ])

  const activeRules = rules.filter((r) => r.enabled)
  const existingByRuleId = new Map(
    existingBills.filter((b) => b.subtrackerRuleId !== null).map((b) => [b.subtrackerRuleId!, b]),
  )

  const items = await Promise.all(
    activeRules.map(async (rule): Promise<SubtrackerSyncPreviewItem> => {
      const stats = await fetchStats({
        paymentMethodIds: rule.paymentMethodIds,
        categoryIds: rule.categoryIds,
      })
      const newBudgetCents = pickMetricCents(stats, resolvedMetric)
      const existing = existingByRuleId.get(rule.id) ?? null

      let action: SubtrackerSyncPreviewItem["action"] = "create"
      if (existing) {
        action =
          existing.budgetCents === newBudgetCents &&
          existing.name === rule.name &&
          existing.fromAccountId === rule.fromAccountId &&
          existing.sharePercent === rule.sharePercent &&
          existing.dueDay === rule.dueDay
            ? "unchanged"
            : "update"
      }

      return {
        ruleId: rule.id,
        name: rule.name,
        fromAccountId: rule.fromAccountId,
        sharePercent: rule.sharePercent,
        dueDay: rule.dueDay,
        existingBillId: existing?.id ?? null,
        currentBudgetCents: existing?.budgetCents ?? null,
        newBudgetCents,
        action,
      }
    }),
  )

  return {
    monthId,
    metric: resolvedMetric,
    autoResolvedMetric,
    items,
  }
}

export const applySubtrackerBillsSync = async ({
  monthId,
  metric,
  fetchStats = fetchSubtrackerStats,
}: {
  monthId: string
  metric?: SubtrackerMetric
  fetchStats?: typeof fetchSubtrackerStats
}) => {
  const preview = await previewSubtrackerBillsSync({ monthId, metric, fetchStats })

  return runTransaction(db, async (tx) => {
    const now = new Date().toISOString()
    await tx.insert(months).values({ id: monthId, createdAt: now }).onConflictDoNothing()

    const existingBills = await tx.select().from(bills).where(eq(bills.monthId, monthId))
    let nextSortOrder = existingBills.reduce((max, item) => Math.max(max, item.sortOrder), 0)

    let created = 0
    let updated = 0
    let unchanged = 0

    for (const item of preview.items) {
      if (item.existingBillId !== null) {
        if (item.action === "unchanged") {
          unchanged += 1
          continue
        }
        await tx
          .update(bills)
          .set({
            name: item.name,
            dueDay: item.dueDay,
            fromAccountId: item.fromAccountId,
            sharePercent: item.sharePercent,
            budgetCents: item.newBudgetCents,
          })
          .where(and(eq(bills.id, item.existingBillId), eq(bills.monthId, monthId)))
        updated += 1
      } else {
        nextSortOrder += 1
        await tx.insert(bills).values({
          monthId,
          name: item.name,
          dueDay: item.dueDay,
          fromAccountId: item.fromAccountId,
          sharePercent: item.sharePercent,
          budgetCents: item.newBudgetCents,
          actualCents: null,
          paid: false,
          subtrackerRuleId: item.ruleId,
          sortOrder: nextSortOrder,
        })
        created += 1
      }
    }

    return {
      monthId,
      metric: preview.metric,
      created,
      updated,
      unchanged,
    }
  })
}
