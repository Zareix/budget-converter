import * as v from "valibot"

import { env } from "@/env"
import { eurosToCents, getCurrentMonthId, shiftMonthId } from "@/lib/budget/calculations"

export const SUBTRACKER_METRICS = ["totalThisMonth", "expectedNextMonth", "totalPerMonth"] as const
export type SubtrackerMetric = (typeof SUBTRACKER_METRICS)[number]

export const SUBTRACKER_METRIC_LABELS: Record<SubtrackerMetric, string> = {
  totalThisMonth: "This month (actual due)",
  expectedNextMonth: "Next month (expected due)",
  totalPerMonth: "Monthly average (smoothed)",
}

const statsResponseSchema = v.object({
  stats: v.object({
    totalPerMonth: v.number(),
    totalPerYear: v.number(),
    totalThisMonth: v.number(),
    remainingThisMonth: v.number(),
    expectedNextMonth: v.number(),
  }),
  currency: v.object({
    code: v.string(),
    symbol: v.string(),
  }),
})

export type SubtrackerStatsResult = {
  totalThisMonthCents: number
  expectedNextMonthCents: number
  totalPerMonthCents: number
  remainingThisMonthCents: number
  totalPerYearCents: number
  currencyCode: string
  currencySymbol: string
}

export const isActive = (): boolean => Boolean(env.SUBTRACKER_URL && env.SUBTRACKER_API_KEY)

export const resolveMetricForMonth = (
  monthId: string,
  now = new Date(),
): SubtrackerMetric | null => {
  const currentMonth = getCurrentMonthId(now)
  if (monthId === currentMonth) return "totalThisMonth"
  const nextMonth = shiftMonthId(currentMonth, 1)
  if (monthId === nextMonth) return "expectedNextMonth"
  return null
}

export const pickMetricCents = (stats: SubtrackerStatsResult, metric: SubtrackerMetric): number => {
  switch (metric) {
    case "totalThisMonth":
      return stats.totalThisMonthCents
    case "expectedNextMonth":
      return stats.expectedNextMonthCents
    case "totalPerMonth":
      return stats.totalPerMonthCents
  }
}

export const normalizeCsvIds = (raw: string | null | undefined): string | null => {
  if (!raw) return null
  const cleaned = raw
    .split(",")
    .map((part) => part.trim())
    .filter((part) => /^\d+$/.test(part))
  return cleaned.length > 0 ? cleaned.join(",") : null
}

export const fetchSubtrackerStats = async ({
  paymentMethodIds,
  categoryIds,
}: {
  paymentMethodIds?: string | null
  categoryIds?: string | null
}): Promise<SubtrackerStatsResult> => {
  if (!env.SUBTRACKER_URL || !env.SUBTRACKER_API_KEY) {
    throw new Error("Subtracker is not configured (missing SUBTRACKER_URL or SUBTRACKER_API_KEY)")
  }

  const baseUrl = env.SUBTRACKER_URL.replace(/\/+$/, "")
  const url = new URL(`${baseUrl}/api/stats`)

  const pmCsv = normalizeCsvIds(paymentMethodIds)
  if (pmCsv) {
    url.searchParams.set("paymentMethods", pmCsv)
  }
  const catCsv = normalizeCsvIds(categoryIds)
  if (catCsv) {
    url.searchParams.set("categories", catCsv)
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "x-api-key": env.SUBTRACKER_API_KEY,
    },
  })

  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(
      `Subtracker API error (${response.status} ${response.statusText})${body ? `: ${body}` : ""}`,
    )
  }

  const json: unknown = await response.json()
  const parsed = v.parse(statsResponseSchema, json)

  return {
    totalThisMonthCents: eurosToCents(parsed.stats.totalThisMonth),
    expectedNextMonthCents: eurosToCents(parsed.stats.expectedNextMonth),
    totalPerMonthCents: eurosToCents(parsed.stats.totalPerMonth),
    remainingThisMonthCents: eurosToCents(parsed.stats.remainingThisMonth),
    totalPerYearCents: eurosToCents(parsed.stats.totalPerYear),
    currencyCode: parsed.currency.code,
    currencySymbol: parsed.currency.symbol,
  }
}
