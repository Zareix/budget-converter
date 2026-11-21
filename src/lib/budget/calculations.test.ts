import { describe, expect, test } from "bun:test"

import {
  computeMonthSummary,
  computeShareCents,
  cycleSharePercent,
  getShareLabel,
  parseAmountToCents,
  shiftMonthId,
} from "./calculations"

describe("computeShareCents", () => {
  test("handles 100%, 50%, 0%, and custom percentages", () => {
    expect(computeShareCents(140133, 50)).toBe(70067)
    expect(computeShareCents(1000, 100)).toBe(1000)
    expect(computeShareCents(1000, 0)).toBe(0)
    expect(computeShareCents(1000, 33)).toBe(330)
    expect(computeShareCents(100, 33)).toBe(33)
  })

  test("handles negative refund amounts symmetrically", () => {
    expect(computeShareCents(-101, 50)).toBe(-51)
    expect(computeShareCents(101, 50) + computeShareCents(-101, 50)).toBe(0)
    expect(computeShareCents(-5000, 100)).toBe(-5000)
    expect(computeShareCents(-5000, 0)).toBe(0)
  })
})

describe("helpers", () => {
  test("parseAmountToCents handles French comma and dot formats", () => {
    expect(parseAmountToCents("1401,33")).toBe(140133)
    expect(parseAmountToCents("12.5")).toBe(1250)
    expect(parseAmountToCents("-19,99")).toBe(-1999)
    expect(parseAmountToCents("")).toBe(0)
  })

  test("shiftMonthId handles year rollovers", () => {
    expect(shiftMonthId("2026-01", -1)).toBe("2025-12")
    expect(shiftMonthId("2026-12", 1)).toBe("2027-01")
    expect(shiftMonthId("2026-11", 1)).toBe("2026-12")
  })

  test("cycleSharePercent cycles 100 -> 50 -> 0 -> 100 and supports custom presets", () => {
    expect(cycleSharePercent(100)).toBe(50)
    expect(cycleSharePercent(50)).toBe(0)
    expect(cycleSharePercent(0)).toBe(100)
    expect(cycleSharePercent(25)).toBe(100)

    const custom = [
      { label: "Raph", percent: 100 },
      { label: "60/40", percent: 60 },
      { label: "Ensemble", percent: 50 },
      { label: "Lola", percent: 0 },
    ]
    expect(cycleSharePercent(100, custom)).toBe(60)
    expect(cycleSharePercent(60, custom)).toBe(50)
    expect(cycleSharePercent(0, custom)).toBe(100)
    expect(getShareLabel(60, custom)).toBe("60/40")
    expect(getShareLabel(33, custom)).toBe("33%")
  })
})

describe("computeMonthSummary", () => {
  test("computes shares, refunds, excluded transactions, and remaining totals", () => {
    const summary = computeMonthSummary({
      incomes: [
        { expectedCents: 284216, actualCents: 284216 },
        { expectedCents: 10000, actualCents: null },
      ],
      bills: [
        // Rent 1401.33 shared 50% -> 700.67 (paid)
        { budgetCents: 140133, sharePercent: 50, paid: true },
        // Personal bill 107.31, not yet paid
        { budgetCents: 10731, sharePercent: 100, paid: false },
        // Other (0%) bill ignored in personal share
        { budgetCents: 5000, sharePercent: 0, paid: true },
      ],
      savings: [
        { budgetCents: 5000, actualCents: null },
        { budgetCents: 10000, actualCents: 10000 },
      ],
      categoryBudgets: [
        { categorySlug: "courses", budgetCents: 20000 },
        { categorySlug: "shopping", budgetCents: 10000 },
      ],
      transactions: [
        // 82.00 shared 50% -> 41.00
        { categorySlug: "courses", amountCents: 8200, sharePercent: 50, excluded: false },
        // 15.00 personal -> 15.00
        { categorySlug: "courses", amountCents: 1500, sharePercent: 100, excluded: false },
        // Excluded transaction should not count
        { categorySlug: "courses", amountCents: 99999, sharePercent: 100, excluded: true },
        // 150.00 personal shopping + 30.00 refund -> 120.00 (over budget of 100.00)
        { categorySlug: "shopping", amountCents: 15000, sharePercent: 100, excluded: false },
        { categorySlug: "shopping", amountCents: -3000, sharePercent: 100, excluded: false },
        // 0% share transaction counts as 0
        { categorySlug: "shopping", amountCents: 5000, sharePercent: 0, excluded: false },
        // Unbudgeted category
        { categorySlug: "autres", amountCents: 2000, sharePercent: 50, excluded: false },
      ],
    })

    expect(summary.income).toEqual({ budgetCents: 294216, actualCents: 284216 })
    expect(summary.bills).toEqual({
      grossBudgetCents: 155864,
      grossActualCents: 145133,
      budgetCents: 80798, // 70067 + 10731 + 0
      actualCents: 70067, // 70067 + 0 + 0
    })
    expect(summary.savings).toEqual({ budgetCents: 15000, actualCents: 10000 })
    expect(summary.expenses).toEqual({
      budgetCents: 30000,
      actualCents: 18600, // 4100 + 1500 + 12000 + 1000
    })
    expect(summary.remaining).toEqual({
      budgetCents: 294216 - (80798 + 30000 + 15000),
      actualCents: 284216 - (70067 + 18600 + 10000),
    })

    expect(summary.byCategory["courses"]).toEqual({
      categorySlug: "courses",
      budgetCents: 20000,
      actualCents: 5600,
      remainingCents: 14400,
      overBudget: false,
    })
    expect(summary.byCategory["shopping"]).toEqual({
      categorySlug: "shopping",
      budgetCents: 10000,
      actualCents: 12000,
      remainingCents: -2000,
      overBudget: true,
    })
    expect(summary.byCategory["autres"]).toEqual({
      categorySlug: "autres",
      budgetCents: 0,
      actualCents: 1000,
      remainingCents: -1000,
      overBudget: true,
    })
  })
})
