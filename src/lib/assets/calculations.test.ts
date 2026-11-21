import { describe, expect, test } from "bun:test"

import type { AccountSnapshotLike, AssetAccountLike } from "./calculations"
import {
  computeAssetsHistory,
  computeAssetsMonthView,
  computeAssetsTimeline,
  formatPercentSigned,
} from "./calculations"

const ACCOUNTS: Array<AssetAccountLike> = [
  {
    id: 1,
    slug: "sg-livret-a",
    name: "SG - Livret A",
    type: "savings",
    color: "#f97316",
    sortOrder: 1,
  },
  {
    id: 2,
    slug: "revolut-pocket-travel",
    name: "Revolut - Pocket Travel",
    type: "savings",
    color: "#3b82f6",
    sortOrder: 2,
  },
]

const snap = (
  id: number,
  accountId: number,
  monthId: string,
  balanceCents: number,
  note: string | null = null,
): AccountSnapshotLike => ({
  id,
  accountId,
  monthId,
  balanceCents,
  note,
  updatedAt: "2026-11-01T10:00:00.000Z",
})

describe("computeAssetsMonthView", () => {
  test("flags all accounts as missing when no snapshots exist for the selected month", () => {
    const view = computeAssetsMonthView({
      accounts: ACCOUNTS,
      snapshots: [snap(1, 1, "2026-10", 500_000)],
      monthId: "2026-11",
    })

    expect(view.summary.missingAccounts.map((a) => a.id)).toEqual([1, 2])
    expect(view.summary.updatedCount).toBe(0)
    expect(view.summary.carriedOverCount).toBe(1)
    expect(view.summary.totalRecordedCents).toBe(0)
    expect(view.summary.totalEffectiveCents).toBe(500_000)
    expect(view.summary.monthlyDeltaCents).toBe(0)
    expect(view.rows[0]).toMatchObject({
      isMissing: true,
      isCarriedOver: true,
      effectiveBalanceCents: 500_000,
      deltaCents: null,
    })
    expect(view.rows[1]).toMatchObject({
      isMissing: true,
      isCarriedOver: false,
      effectiveBalanceCents: null,
      deltaCents: null,
    })
  })

  test("handles partial updates, carry-over effective totals, and month-over-month deltas", () => {
    const view = computeAssetsMonthView({
      accounts: ACCOUNTS,
      snapshots: [
        snap(1, 1, "2026-10", 1_000_000),
        snap(2, 2, "2026-10", 200_000),
        snap(3, 2, "2026-11", 250_000, "Added monthly transfer"),
      ],
      monthId: "2026-11",
    })

    expect(view.summary.missingAccounts.map((a) => a.name)).toEqual(["SG - Livret A"])
    expect(view.summary.updatedCount).toBe(1)
    expect(view.summary.carriedOverCount).toBe(1)
    expect(view.summary.totalRecordedCents).toBe(250_000)
    expect(view.summary.totalEffectiveCents).toBe(1_250_000)
    expect(view.summary.previousMonthEffectiveCents).toBe(1_200_000)
    expect(view.summary.monthlyDeltaCents).toBe(50_000)
    expect(view.summary.monthlyDeltaPercent).toBeCloseTo((50_000 / 1_200_000) * 100, 5)

    expect(view.rows[1]?.deltaCents).toBe(50_000)
    expect(view.rows[1]?.deltaPercent).toBeCloseTo(25, 5)
  })

  test("treats a 0 EUR snapshot as recorded rather than missing", () => {
    const view = computeAssetsMonthView({
      accounts: ACCOUNTS,
      snapshots: [snap(1, 1, "2026-11", 500_000), snap(2, 2, "2026-11", 0)],
      monthId: "2026-11",
    })

    expect(view.summary.missingAccounts).toEqual([])
    expect(view.summary.updatedCount).toBe(2)
    expect(view.rows[1]?.isMissing).toBe(false)
    expect(view.rows[1]?.effectiveBalanceCents).toBe(0)
  })
})

describe("computeAssetsTimeline & computeAssetsHistory", () => {
  test("fills intermediate gap months by carrying forward prior balances", () => {
    const snapshots = [
      snap(1, 1, "2026-08", 500_000),
      snap(2, 2, "2026-08", 100_000),
      // 2026-09 has no snapshots at all
      snap(3, 1, "2026-10", 550_000),
    ]

    const timeline = computeAssetsTimeline({ accounts: ACCOUNTS, snapshots })
    expect(timeline.map((p) => p.monthId)).toEqual(["2026-08", "2026-09", "2026-10"])
    expect(timeline[0]).toMatchObject({ totalCents: 600_000, recordedCount: 2 })
    expect(timeline[1]).toMatchObject({ totalCents: 600_000, recordedCount: 0 })
    expect(timeline[2]).toMatchObject({
      totalCents: 650_000,
      recordedCount: 1,
      byAccount: { 1: 550_000, 2: 100_000 },
    })

    const history = computeAssetsHistory({ accounts: ACCOUNTS, snapshots })
    expect(history.map((h) => h.monthId)).toEqual(["2026-10", "2026-08"])
    expect(history[0]).toMatchObject({
      totalEffectiveCents: 650_000,
      deltaCents: 50_000,
      recordedCount: 1,
      missingCount: 1,
    })
    expect(history[0]?.cells[2]).toMatchObject({
      balanceCents: 100_000,
      isRecorded: false,
    })
  })

  test("formats signed percentages cleanly", () => {
    expect(formatPercentSigned(12.34)).toBe("+12.3%")
    expect(formatPercentSigned(-4.56)).toBe("-4.6%")
    expect(formatPercentSigned(0)).toBe("0.0%")
  })
})
