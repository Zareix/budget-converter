import { describe, expect, test } from "bun:test"

import type { AssetAccountLike } from "@/lib/assets/calculations"

import type {
  InvestmentTransactionLike,
  SecurityLike,
  SecurityMonthlyPriceLike,
  SecurityQuoteLike,
} from "./calculations"
import {
  computeInvestmentsPortfolio,
  computeInvestmentsTimeline,
  computeNetWorthTimeline,
} from "./calculations"

const ACCOUNTS: Array<AssetAccountLike> = [
  {
    id: 5,
    slug: "fortuneo-pea",
    name: "Fortuneo - PEA",
    type: "investment",
    color: "#10b981",
    sortOrder: 5,
  },
  {
    id: 6,
    slug: "fortuneo-cto",
    name: "Fortuneo - CTO",
    type: "investment",
    color: "#3b82f6",
    sortOrder: 6,
  },
  {
    id: 7,
    slug: "linxea-av",
    name: "Linxea - Assurance Vie",
    type: "investment",
    color: "#14b8a6",
    sortOrder: 7,
  },
]

const SECURITIES: Array<SecurityLike> = [
  {
    id: 1,
    symbol: "CW8.PA",
    isin: "LU1681043599",
    name: "Amundi MSCI World",
    assetClass: "etf",
    currency: "EUR",
    pricingMode: "yahoo",
    manualPriceCents: null,
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: 2,
    symbol: "AAPL",
    isin: "US0378331005",
    name: "Apple Inc.",
    assetClass: "stock",
    currency: "USD",
    pricingMode: "yahoo",
    manualPriceCents: null,
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: 3,
    symbol: "MANUAL:linxea-fonds-euros",
    isin: null,
    name: "Fonds Euros Nouvelle Génération",
    assetClass: "euro_fund",
    currency: "EUR",
    pricingMode: "manual",
    manualPriceCents: 520_000,
    updatedAt: "2026-11-01T00:00:00Z",
  },
]

const QUOTES: Array<SecurityQuoteLike> = [
  {
    symbol: "CW8.PA",
    currency: "EUR",
    price: 550,
    previousClose: 545,
    changePercent: ((550 - 545) / 545) * 100,
    fetchedAt: "2026-11-21T18:00:00Z",
  },
  {
    symbol: "AAPL",
    currency: "USD",
    price: 200,
    previousClose: 196,
    changePercent: ((200 - 196) / 196) * 100,
    fetchedAt: "2026-11-21T18:00:00Z",
  },
  {
    symbol: "USDEUR=X",
    currency: "EUR",
    price: 0.9,
    previousClose: 0.9,
    changePercent: 0,
    fetchedAt: "2026-11-21T18:00:00Z",
  },
]

const tx = (
  partial: Partial<InvestmentTransactionLike> &
    Pick<
      InvestmentTransactionLike,
      "id" | "accountId" | "securityId" | "type" | "date" | "quantity" | "totalEurCents"
    >,
): InvestmentTransactionLike => ({
  unitPriceCents: partial.quantity > 0 ? Math.round(partial.totalEurCents / partial.quantity) : 0,
  feesCents: 0,
  note: null,
  createdAt: "2026-11-01T00:00:00Z",
  ...partial,
})

describe("computeInvestmentsPortfolio", () => {
  test("computes CUMP cost basis, partial sells, realized gains, dividends, FX conversion, and manual pricing", () => {
    const transactions: Array<InvestmentTransactionLike> = [
      // PEA: Buy 2 CW8 @ 500 EUR = 1000 EUR, then buy 2 @ 520 EUR = 1040 EUR -> 4 shares, cost 2040 EUR (PRU 510)
      tx({
        id: 1,
        accountId: 5,
        securityId: 1,
        type: "buy",
        date: "2026-06-10",
        quantity: 2,
        totalEurCents: 100_000,
      }),
      tx({
        id: 2,
        accountId: 5,
        securityId: 1,
        type: "buy",
        date: "2026-08-10",
        quantity: 2,
        totalEurCents: 104_000,
      }),
      // Sell 1 CW8 @ 540 EUR -> sold cost 510 EUR, realized gain +30 EUR, remaining 3 shares cost 1530 EUR
      tx({
        id: 3,
        accountId: 5,
        securityId: 1,
        type: "sell",
        date: "2026-09-10",
        quantity: 1,
        totalEurCents: 54_000,
      }),
      // CTO: Buy 5 AAPL for 850 EUR total; quote = 200 USD * 0.90 = 180 EUR/share -> value 900 EUR
      tx({
        id: 4,
        accountId: 6,
        securityId: 2,
        type: "buy",
        date: "2026-07-01",
        quantity: 5,
        totalEurCents: 85_000,
      }),
      tx({
        id: 5,
        accountId: 6,
        securityId: 2,
        type: "dividend",
        date: "2026-10-01",
        quantity: 5,
        totalEurCents: 1_200,
      }),
      // AV: Buy 1 Fonds Euros @ 5000 EUR, manualPriceCents updated to 5200 EUR -> +200 EUR gain
      tx({
        id: 6,
        accountId: 7,
        securityId: 3,
        type: "buy",
        date: "2026-05-01",
        quantity: 1,
        totalEurCents: 500_000,
      }),
    ]

    const { positions, summary } = computeInvestmentsPortfolio({
      accounts: ACCOUNTS,
      securities: SECURITIES,
      transactions,
      quotes: QUOTES,
    })

    expect(positions).toHaveLength(3)

    const cw8 = positions.find((p) => p.security.symbol === "CW8.PA")!
    expect(cw8.quantity).toBe(3)
    expect(cw8.costBasisEurCents).toBe(153_000)
    expect(cw8.avgCostEurCents).toBe(51_000)
    expect(cw8.marketValueEurCents).toBe(165_000) // 3 * 550 EUR
    expect(cw8.unrealizedGainEurCents).toBe(12_000)
    expect(cw8.realizedGainEurCents).toBe(3_000)

    const aapl = positions.find((p) => p.security.symbol === "AAPL")!
    expect(aapl.fxRateToEur).toBe(0.9)
    expect(aapl.currentPriceEurCents).toBe(18_000)
    expect(aapl.marketValueEurCents).toBe(90_000) // 5 * 180 EUR
    expect(aapl.unrealizedGainEurCents).toBe(5_000)
    expect(aapl.dividendsEurCents).toBe(1_200)

    const fondsEuros = positions.find((p) => p.security.assetClass === "euro_fund")!
    expect(fondsEuros.marketValueEurCents).toBe(520_000)
    expect(fondsEuros.unrealizedGainEurCents).toBe(20_000)

    // Total value = 1650 + 900 + 5200 = 7750 EUR
    expect(summary.totalValueEurCents).toBe(775_000)
    // Total invested = 1530 + 850 + 5000 = 7380 EUR
    expect(summary.totalInvestedEurCents).toBe(738_000)
    expect(summary.totalUnrealizedGainEurCents).toBe(37_000)
    expect(summary.totalRealizedGainEurCents).toBe(3_000)
    expect(summary.totalDividendsEurCents).toBe(1_200)
    expect(summary.byAssetClass.etf).toBe(165_000)
    expect(summary.byAssetClass.stock).toBe(90_000)
    expect(summary.byAssetClass.euro_fund).toBe(520_000)
  })

  test("filters cleanly by accountId", () => {
    const transactions: Array<InvestmentTransactionLike> = [
      tx({
        id: 1,
        accountId: 5,
        securityId: 1,
        type: "buy",
        date: "2026-06-10",
        quantity: 2,
        totalEurCents: 100_000,
      }),
      tx({
        id: 2,
        accountId: 6,
        securityId: 2,
        type: "buy",
        date: "2026-07-01",
        quantity: 5,
        totalEurCents: 85_000,
      }),
    ]

    const { positions, summary } = computeInvestmentsPortfolio({
      accounts: ACCOUNTS,
      securities: SECURITIES,
      transactions,
      quotes: QUOTES,
      accountFilterId: 5,
    })

    expect(positions).toHaveLength(1)
    expect(positions[0]?.security.symbol).toBe("CW8.PA")
    expect(summary.totalValueEurCents).toBe(110_000)
  })
})

describe("computeInvestmentsTimeline & computeNetWorthTimeline", () => {
  test("tracks monthly invested vs market value and merges with savings timeline", () => {
    const transactions: Array<InvestmentTransactionLike> = [
      tx({
        id: 1,
        accountId: 5,
        securityId: 1,
        type: "buy",
        date: "2026-09-05",
        quantity: 2,
        totalEurCents: 100_000,
      }),
      tx({
        id: 2,
        accountId: 5,
        securityId: 1,
        type: "buy",
        date: "2026-10-05",
        quantity: 1,
        totalEurCents: 52_000,
      }),
    ]
    const monthlyPrices: Array<SecurityMonthlyPriceLike> = [
      { symbol: "CW8.PA", monthId: "2026-09", closePrice: 510, currency: "EUR" },
      { symbol: "CW8.PA", monthId: "2026-10", closePrice: 530, currency: "EUR" },
    ]

    const invTimeline = computeInvestmentsTimeline({
      accounts: ACCOUNTS,
      securities: SECURITIES,
      transactions,
      quotes: QUOTES,
      monthlyPrices,
      currentMonthId: "2026-11",
    })

    expect(invTimeline.map((p) => p.monthId)).toEqual(["2026-09", "2026-10", "2026-11"])
    expect(invTimeline[0]).toMatchObject({ investedCents: 100_000, valueCents: 102_000 })
    expect(invTimeline[1]).toMatchObject({ investedCents: 152_000, valueCents: 159_000 })
    // Current month uses live quote (550 EUR * 3 = 1650 EUR)
    expect(invTimeline[2]).toMatchObject({ investedCents: 152_000, valueCents: 165_000 })

    const netWorth = computeNetWorthTimeline({
      savingsTimeline: [
        {
          monthId: "2026-08",
          label: "Aug 26",
          totalCents: 500_000,
          byAccount: {},
          recordedCount: 1,
        },
        {
          monthId: "2026-09",
          label: "Sep 26",
          totalCents: 550_000,
          byAccount: {},
          recordedCount: 1,
        },
      ],
      investmentsTimeline: invTimeline,
    })

    expect(netWorth.map((p) => p.monthId)).toEqual(["2026-08", "2026-09", "2026-10", "2026-11"])
    expect(netWorth[0]).toMatchObject({
      savingsCents: 500_000,
      investmentsCents: 0,
      totalCents: 500_000,
    })
    expect(netWorth[1]).toMatchObject({
      savingsCents: 550_000,
      investmentsCents: 102_000,
      totalCents: 652_000,
    })
    // Savings carried forward into Oct & Nov
    expect(netWorth[3]).toMatchObject({
      savingsCents: 550_000,
      investmentsCents: 165_000,
      totalCents: 715_000,
    })
  })
})
