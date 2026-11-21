import { describe, expect, test } from "bun:test"

import { normalizeCsvIds, pickMetricCents, resolveMetricForMonth } from "./subtracker"

describe("subtracker helpers", () => {
  test("resolveMetricForMonth resolves current, next, and December->January rollover", () => {
    const nov = new Date(2026, 10, 21) // 2026-11
    expect(resolveMetricForMonth("2026-11", nov)).toBe("totalThisMonth")
    expect(resolveMetricForMonth("2026-12", nov)).toBe("expectedNextMonth")
    expect(resolveMetricForMonth("2026-10", nov)).toBeNull()
    expect(resolveMetricForMonth("2027-01", nov)).toBeNull()

    const dec = new Date(2026, 11, 15) // 2026-12
    expect(resolveMetricForMonth("2026-12", dec)).toBe("totalThisMonth")
    expect(resolveMetricForMonth("2027-01", dec)).toBe("expectedNextMonth")
    expect(resolveMetricForMonth("2026-11", dec)).toBeNull()
  })

  test("normalizeCsvIds cleans whitespace and invalid values", () => {
    expect(normalizeCsvIds(" 1, 2 , 3 ")).toBe("1,2,3")
    expect(normalizeCsvIds("1, abc, 4")).toBe("1,4")
    expect(normalizeCsvIds("   ")).toBeNull()
    expect(normalizeCsvIds(null)).toBeNull()
  })

  test("pickMetricCents returns the matching cents metric", () => {
    const stats = {
      totalThisMonthCents: 9430,
      expectedNextMonthCents: 10731,
      totalPerMonthCents: 10000,
      remainingThisMonthCents: 1200,
      totalPerYearCents: 120000,
      currencyCode: "EUR",
      currencySymbol: "€",
    }
    expect(pickMetricCents(stats, "totalThisMonth")).toBe(9430)
    expect(pickMetricCents(stats, "expectedNextMonth")).toBe(10731)
    expect(pickMetricCents(stats, "totalPerMonth")).toBe(10000)
  })
})
