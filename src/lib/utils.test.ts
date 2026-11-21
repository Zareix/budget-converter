import { describe, expect, test } from "bun:test"

import { matchPaymentMethod } from "./payment-methods"
import { formatIsoDate, getMonthIdFromDate, isCurrentOrPreviousMonth } from "./utils"

describe("isCurrentOrPreviousMonth", () => {
  test("handles January rollover to December of previous year", () => {
    const now = new Date(2027, 0, 15) // Jan 15, 2027
    expect(isCurrentOrPreviousMonth(new Date(2027, 0, 1), now)).toBe(true)
    expect(isCurrentOrPreviousMonth(new Date(2026, 11, 28), now)).toBe(true)
    expect(isCurrentOrPreviousMonth(new Date(2026, 10, 30), now)).toBe(false)
    expect(isCurrentOrPreviousMonth(new Date(2026, 0, 15), now)).toBe(false)
  })

  test("handles regular mid-year months", () => {
    const now = new Date(2026, 10, 21) // Nov 21, 2026
    expect(isCurrentOrPreviousMonth(new Date(2026, 10, 1), now)).toBe(true)
    expect(isCurrentOrPreviousMonth(new Date(2026, 9, 15), now)).toBe(true)
    expect(isCurrentOrPreviousMonth(new Date(2026, 8, 30), now)).toBe(false)
  })
})

describe("date formatters", () => {
  test("formatIsoDate and getMonthIdFromDate pad months and days", () => {
    const d = new Date(2026, 0, 5)
    expect(formatIsoDate(d)).toBe("2026-01-05")
    expect(getMonthIdFromDate(d)).toBe("2026-01")
  })
})

describe("matchPaymentMethod", () => {
  const methods = [
    {
      id: 1,
      slug: "carte-sg",
      label: "Carte SG",
      color: null,
      defaultSharePercent: 100,
      sortOrder: 1,
    },
    {
      id: 2,
      slug: "carte-amex",
      label: "Carte AMEX",
      color: null,
      defaultSharePercent: 100,
      sortOrder: 2,
    },
    {
      id: 3,
      slug: "carte-revolut",
      label: "Carte Revolut",
      color: null,
      defaultSharePercent: 100,
      sortOrder: 3,
    },
    {
      id: 4,
      slug: "carte-compte-joint",
      label: "Carte compte joint",
      color: null,
      defaultSharePercent: 50,
      sortOrder: 4,
    },
    {
      id: 5,
      slug: "tricount-lola",
      label: "Tricount Lola",
      color: null,
      defaultSharePercent: 50,
      sortOrder: 5,
    },
  ]

  test("matches exact labels, slugs, and provider aliases", () => {
    expect(matchPaymentMethod(methods, "Carte AMEX")?.id).toBe(2)
    expect(matchPaymentMethod(methods, "American Express")?.id).toBe(2)
    expect(matchPaymentMethod(methods, "Société Générale")?.id).toBe(1)
    expect(matchPaymentMethod(methods, "Revolut")?.id).toBe(3)
    expect(matchPaymentMethod(methods, "Revolut Compte Joint")?.id).toBe(4)
    expect(matchPaymentMethod(methods, "tricount")?.id).toBe(5)
    expect(matchPaymentMethod(methods, "Unknown Bank")).toBeNull()
  })
})
