import type { AssetAccountLike, AssetsTimelinePoint } from "@/lib/assets/calculations"
import { formatShortMonthLabel } from "@/lib/assets/calculations"
import { getCurrentMonthId, shiftMonthId } from "@/lib/budget/calculations"
import type { AssetClass, InvestmentTxType, PricingMode } from "@/lib/db/schema"

export type SecurityLike = {
  id: number
  symbol: string
  isin: string | null
  name: string
  assetClass: AssetClass
  currency: string
  pricingMode: PricingMode
  manualPriceCents: number | null
  updatedAt: string
}

export type InvestmentTransactionLike = {
  id: number
  accountId: number
  securityId: number
  type: InvestmentTxType
  date: string
  quantity: number
  unitPriceCents: number
  feesCents: number
  totalEurCents: number
  note: string | null
  createdAt: string
}

export type SecurityQuoteLike = {
  symbol: string
  currency: string
  price: number
  previousClose: number | null
  changePercent: number | null
  fetchedAt: string
}

export type SecurityMonthlyPriceLike = {
  symbol: string
  monthId: string
  closePrice: number
  currency: string
}

export type InvestmentPosition = {
  key: string
  account: AssetAccountLike
  security: SecurityLike
  quantity: number
  costBasisEurCents: number
  avgCostEurCents: number
  realizedGainEurCents: number
  dividendsEurCents: number
  currentPriceEurCents: number
  currentPriceNative: number | null
  fxRateToEur: number
  marketValueEurCents: number
  unrealizedGainEurCents: number
  unrealizedGainPercent: number | null
  dayChangeEurCents: number | null
  dayChangePercent: number | null
  weightPercent: number
  isQuoteMissing: boolean
  quoteFetchedAt: string | null
}

export type InvestmentsSummary = {
  totalValueEurCents: number
  totalInvestedEurCents: number
  totalUnrealizedGainEurCents: number
  totalUnrealizedGainPercent: number | null
  totalRealizedGainEurCents: number
  totalDividendsEurCents: number
  totalDayChangeEurCents: number | null
  totalDayChangePercent: number | null
  positionsCount: number
  latestQuoteFetchedAt: string | null
  missingQuotesCount: number
  byAccount: Record<number, { valueEurCents: number; investedEurCents: number }>
  byAssetClass: Record<AssetClass, number>
}

export type InvestmentsTimelinePoint = {
  monthId: string
  label: string
  valueCents: number
  investedCents: number
  gainCents: number
  byAccount: Record<number, number>
}

export type NetWorthTimelinePoint = {
  monthId: string
  label: string
  savingsCents: number
  investmentsCents: number
  totalCents: number
}

const EPSILON = 1e-9

export const resolveFxRateToEur = (
  currency: string,
  quotesBySymbol: Map<string, SecurityQuoteLike>,
): number => {
  const upper = currency.toUpperCase()
  if (upper === "EUR") return 1
  const direct = quotesBySymbol.get(`${upper}EUR=X`)
  if (direct && direct.price > 0) return direct.price
  const inverse = quotesBySymbol.get(`EUR${upper}=X`)
  if (inverse && inverse.price > 0) return 1 / inverse.price
  return 1
}

type PositionAccumulator = {
  accountId: number
  securityId: number
  quantity: number
  costBasisEurCents: number
  realizedGainEurCents: number
  dividendsEurCents: number
  lastUnitPriceEurCents: number
}

const accumulateTransactions = (
  transactions: ReadonlyArray<InvestmentTransactionLike>,
): Map<string, PositionAccumulator> => {
  const sorted = transactions.toSorted((a, b) => a.date.localeCompare(b.date) || a.id - b.id)
  const map = new Map<string, PositionAccumulator>()

  for (const tx of sorted) {
    const key = `${tx.accountId}:${tx.securityId}`
    let acc = map.get(key)
    if (!acc) {
      acc = {
        accountId: tx.accountId,
        securityId: tx.securityId,
        quantity: 0,
        costBasisEurCents: 0,
        realizedGainEurCents: 0,
        dividendsEurCents: 0,
        lastUnitPriceEurCents: 0,
      }
      map.set(key, acc)
    }

    if (tx.type === "buy") {
      acc.quantity += tx.quantity
      acc.costBasisEurCents += tx.totalEurCents
      if (tx.quantity > 0) {
        acc.lastUnitPriceEurCents = Math.round(tx.totalEurCents / tx.quantity)
      }
    } else if (tx.type === "sell") {
      if (acc.quantity > EPSILON && tx.quantity > 0) {
        const soldRatio = Math.min(1, tx.quantity / acc.quantity)
        const soldCost = Math.round(acc.costBasisEurCents * soldRatio)
        acc.realizedGainEurCents += tx.totalEurCents - soldCost
        acc.costBasisEurCents = Math.max(0, acc.costBasisEurCents - soldCost)
        acc.quantity = Math.max(0, acc.quantity - tx.quantity)
        if (acc.quantity < EPSILON) {
          acc.quantity = 0
          acc.costBasisEurCents = 0
        }
      }
      if (tx.quantity > 0) {
        acc.lastUnitPriceEurCents = Math.round(tx.totalEurCents / tx.quantity)
      }
    } else {
      acc.dividendsEurCents += tx.totalEurCents
    }
  }

  return map
}

export const computeInvestmentsPortfolio = ({
  accounts,
  securities,
  transactions,
  quotes,
  accountFilterId,
}: {
  accounts: ReadonlyArray<AssetAccountLike>
  securities: ReadonlyArray<SecurityLike>
  transactions: ReadonlyArray<InvestmentTransactionLike>
  quotes: ReadonlyArray<SecurityQuoteLike>
  accountFilterId?: number | null
}): { positions: Array<InvestmentPosition>; summary: InvestmentsSummary } => {
  const accountById = new Map(accounts.map((a) => [a.id, a]))
  const securityById = new Map(securities.map((s) => [s.id, s]))
  const quotesBySymbol = new Map(quotes.map((q) => [q.symbol, q]))

  const filteredTx = accountFilterId
    ? transactions.filter((t) => t.accountId === accountFilterId)
    : transactions

  const accumulated = accumulateTransactions(filteredTx)

  const positions: Array<InvestmentPosition> = []
  let totalValueEurCents = 0
  let totalInvestedEurCents = 0
  let totalRealizedGainEurCents = 0
  let totalDividendsEurCents = 0
  let totalDayChangeEurCents = 0
  let hasAnyDayChange = false
  let prevDayTotalValueCents = 0
  let missingQuotesCount = 0
  let latestQuoteFetchedAt: string | null = null

  const byAccount: Record<number, { valueEurCents: number; investedEurCents: number }> = {}
  const byAssetClass: Record<AssetClass, number> = {
    etf: 0,
    stock: 0,
    bond: 0,
    scpi: 0,
    euro_fund: 0,
    crypto: 0,
    other: 0,
  }

  for (const [key, acc] of accumulated.entries()) {
    const account = accountById.get(acc.accountId)
    const security = securityById.get(acc.securityId)
    if (!account || !security) continue

    totalRealizedGainEurCents += acc.realizedGainEurCents
    totalDividendsEurCents += acc.dividendsEurCents

    if (acc.quantity <= EPSILON) continue

    const avgCostEurCents = acc.quantity > 0 ? Math.round(acc.costBasisEurCents / acc.quantity) : 0
    let currentPriceEurCents = avgCostEurCents
    let currentPriceNative: number | null = null
    let fxRateToEur = 1
    let marketValueEurCents = acc.costBasisEurCents
    let dayChangeEurCents: number | null = null
    let dayChangePercent: number | null = null
    let isQuoteMissing = false
    let quoteFetchedAt: string | null = null

    if (security.pricingMode === "manual") {
      const manualUnit = security.manualPriceCents ?? acc.lastUnitPriceEurCents
      currentPriceEurCents = manualUnit
      currentPriceNative = manualUnit / 100
      marketValueEurCents = Math.round(acc.quantity * manualUnit)
    } else {
      const quote = quotesBySymbol.get(security.symbol)
      if (quote) {
        fxRateToEur = resolveFxRateToEur(quote.currency || security.currency, quotesBySymbol)
        currentPriceNative = quote.price
        currentPriceEurCents = Math.round(quote.price * fxRateToEur * 100)
        marketValueEurCents = Math.round(acc.quantity * quote.price * fxRateToEur * 100)
        quoteFetchedAt = quote.fetchedAt
        if (!latestQuoteFetchedAt || quote.fetchedAt > latestQuoteFetchedAt) {
          latestQuoteFetchedAt = quote.fetchedAt
        }
        if (quote.previousClose !== null && quote.previousClose > 0) {
          const prevValue = Math.round(acc.quantity * quote.previousClose * fxRateToEur * 100)
          dayChangeEurCents = marketValueEurCents - prevValue
          dayChangePercent =
            quote.changePercent ?? ((quote.price - quote.previousClose) / quote.previousClose) * 100
          totalDayChangeEurCents += dayChangeEurCents
          prevDayTotalValueCents += prevValue
          hasAnyDayChange = true
        }
      } else {
        isQuoteMissing = true
        missingQuotesCount += 1
      }
    }

    const unrealizedGainEurCents = marketValueEurCents - acc.costBasisEurCents
    const unrealizedGainPercent =
      acc.costBasisEurCents > 0 ? (unrealizedGainEurCents / acc.costBasisEurCents) * 100 : null

    totalValueEurCents += marketValueEurCents
    totalInvestedEurCents += acc.costBasisEurCents

    const accSummary = byAccount[account.id]
    if (accSummary) {
      accSummary.valueEurCents += marketValueEurCents
      accSummary.investedEurCents += acc.costBasisEurCents
    } else {
      byAccount[account.id] = {
        valueEurCents: marketValueEurCents,
        investedEurCents: acc.costBasisEurCents,
      }
    }

    byAssetClass[security.assetClass] += marketValueEurCents

    positions.push({
      key,
      account,
      security,
      quantity: acc.quantity,
      costBasisEurCents: acc.costBasisEurCents,
      avgCostEurCents,
      realizedGainEurCents: acc.realizedGainEurCents,
      dividendsEurCents: acc.dividendsEurCents,
      currentPriceEurCents,
      currentPriceNative,
      fxRateToEur,
      marketValueEurCents,
      unrealizedGainEurCents,
      unrealizedGainPercent,
      dayChangeEurCents,
      dayChangePercent,
      weightPercent: 0,
      isQuoteMissing,
      quoteFetchedAt,
    })
  }

  for (const pos of positions) {
    pos.weightPercent =
      totalValueEurCents > 0 ? (pos.marketValueEurCents / totalValueEurCents) * 100 : 0
  }

  positions.sort((a, b) => b.marketValueEurCents - a.marketValueEurCents)

  const totalUnrealizedGainEurCents = totalValueEurCents - totalInvestedEurCents
  const totalUnrealizedGainPercent =
    totalInvestedEurCents > 0 ? (totalUnrealizedGainEurCents / totalInvestedEurCents) * 100 : null

  const totalDayChangePercent =
    hasAnyDayChange && prevDayTotalValueCents > 0
      ? (totalDayChangeEurCents / prevDayTotalValueCents) * 100
      : null

  return {
    positions,
    summary: {
      totalValueEurCents,
      totalInvestedEurCents,
      totalUnrealizedGainEurCents,
      totalUnrealizedGainPercent,
      totalRealizedGainEurCents,
      totalDividendsEurCents,
      totalDayChangeEurCents: hasAnyDayChange ? totalDayChangeEurCents : null,
      totalDayChangePercent,
      positionsCount: positions.length,
      latestQuoteFetchedAt,
      missingQuotesCount,
      byAccount,
      byAssetClass,
    },
  }
}

const buildMonthRange = (startMonthId: string, endMonthId: string): Array<string> => {
  const months: Array<string> = []
  let cursor = startMonthId
  let guard = 0
  while (cursor <= endMonthId && guard < 240) {
    months.push(cursor)
    cursor = shiftMonthId(cursor, 1)
    guard += 1
  }
  return months
}

const findLatestMonthlyPrice = (
  sortedPrices: ReadonlyArray<SecurityMonthlyPriceLike>,
  monthId: string,
): SecurityMonthlyPriceLike | null => {
  let latest: SecurityMonthlyPriceLike | null = null
  for (const item of sortedPrices) {
    if (item.monthId <= monthId) {
      latest = item
    } else {
      break
    }
  }
  return latest
}

export const computeInvestmentsTimeline = ({
  accounts,
  securities,
  transactions,
  quotes,
  monthlyPrices,
  accountFilterId,
  currentMonthId = getCurrentMonthId(),
}: {
  accounts: ReadonlyArray<AssetAccountLike>
  securities: ReadonlyArray<SecurityLike>
  transactions: ReadonlyArray<InvestmentTransactionLike>
  quotes: ReadonlyArray<SecurityQuoteLike>
  monthlyPrices: ReadonlyArray<SecurityMonthlyPriceLike>
  accountFilterId?: number | null
  currentMonthId?: string
}): Array<InvestmentsTimelinePoint> => {
  const filteredTx = accountFilterId
    ? transactions.filter((t) => t.accountId === accountFilterId)
    : transactions

  if (filteredTx.length === 0) return []

  const accountIds = new Set(accounts.map((a) => a.id))
  const validTx = filteredTx.filter((t) => accountIds.has(t.accountId))
  if (validTx.length === 0) return []

  const sortedTx = validTx.toSorted((a, b) => a.date.localeCompare(b.date) || a.id - b.id)
  const firstMonth = sortedTx[0]!.date.slice(0, 7)
  const lastTxMonth = sortedTx.at(-1)!.date.slice(0, 7)
  const endMonth = lastTxMonth > currentMonthId ? lastTxMonth : currentMonthId

  const securityById = new Map(securities.map((s) => [s.id, s]))
  const quotesBySymbol = new Map(quotes.map((q) => [q.symbol, q]))

  const monthlyBySymbol = new Map<string, Array<SecurityMonthlyPriceLike>>()
  for (const row of monthlyPrices) {
    const list = monthlyBySymbol.get(row.symbol)
    if (list) list.push(row)
    else monthlyBySymbol.set(row.symbol, [row])
  }
  for (const list of monthlyBySymbol.values()) {
    list.sort((a, b) => a.monthId.localeCompare(b.monthId))
  }

  const resolveMonthlyFx = (currency: string, monthId: string): number => {
    const upper = currency.toUpperCase()
    if (upper === "EUR") return 1
    if (monthId >= currentMonthId) {
      return resolveFxRateToEur(upper, quotesBySymbol)
    }
    const directHistory = monthlyBySymbol.get(`${upper}EUR=X`)
    const direct = directHistory ? findLatestMonthlyPrice(directHistory, monthId) : null
    if (direct && direct.closePrice > 0) return direct.closePrice
    return resolveFxRateToEur(upper, quotesBySymbol)
  }

  const monthRange = buildMonthRange(firstMonth, endMonth)
  const state = new Map<string, PositionAccumulator>()
  let txIndex = 0

  return monthRange.map((monthId) => {
    while (txIndex < sortedTx.length && sortedTx[txIndex]!.date.slice(0, 7) <= monthId) {
      const tx = sortedTx[txIndex]!
      txIndex += 1
      const key = `${tx.accountId}:${tx.securityId}`
      let acc = state.get(key)
      if (!acc) {
        acc = {
          accountId: tx.accountId,
          securityId: tx.securityId,
          quantity: 0,
          costBasisEurCents: 0,
          realizedGainEurCents: 0,
          dividendsEurCents: 0,
          lastUnitPriceEurCents: 0,
        }
        state.set(key, acc)
      }
      if (tx.type === "buy") {
        acc.quantity += tx.quantity
        acc.costBasisEurCents += tx.totalEurCents
        if (tx.quantity > 0) acc.lastUnitPriceEurCents = Math.round(tx.totalEurCents / tx.quantity)
      } else if (tx.type === "sell") {
        if (acc.quantity > EPSILON && tx.quantity > 0) {
          const ratio = Math.min(1, tx.quantity / acc.quantity)
          const soldCost = Math.round(acc.costBasisEurCents * ratio)
          acc.costBasisEurCents = Math.max(0, acc.costBasisEurCents - soldCost)
          acc.quantity = Math.max(0, acc.quantity - tx.quantity)
          if (acc.quantity < EPSILON) {
            acc.quantity = 0
            acc.costBasisEurCents = 0
          }
        }
        if (tx.quantity > 0) acc.lastUnitPriceEurCents = Math.round(tx.totalEurCents / tx.quantity)
      }
    }

    let valueCents = 0
    let investedCents = 0
    const byAccount: Record<number, number> = {}

    for (const acc of state.values()) {
      if (acc.quantity <= EPSILON) continue
      const security = securityById.get(acc.securityId)
      if (!security) continue

      investedCents += acc.costBasisEurCents
      let posValue = acc.costBasisEurCents

      if (security.pricingMode === "manual") {
        const unit =
          monthId >= currentMonthId && security.manualPriceCents !== null
            ? security.manualPriceCents
            : acc.lastUnitPriceEurCents
        posValue = Math.round(acc.quantity * unit)
      } else {
        const quote = quotesBySymbol.get(security.symbol)
        const history = monthlyBySymbol.get(security.symbol)
        const monthlyRow = history ? findLatestMonthlyPrice(history, monthId) : null

        if (monthId >= currentMonthId && quote) {
          const fx = resolveFxRateToEur(quote.currency || security.currency, quotesBySymbol)
          posValue = Math.round(acc.quantity * quote.price * fx * 100)
        } else if (monthlyRow) {
          const fx = resolveMonthlyFx(monthlyRow.currency || security.currency, monthId)
          posValue = Math.round(acc.quantity * monthlyRow.closePrice * fx * 100)
        } else if (quote) {
          const fx = resolveFxRateToEur(quote.currency || security.currency, quotesBySymbol)
          posValue = Math.round(acc.quantity * quote.price * fx * 100)
        }
      }

      valueCents += posValue
      byAccount[acc.accountId] = (byAccount[acc.accountId] ?? 0) + posValue
    }

    return {
      monthId,
      label: formatShortMonthLabel(monthId),
      valueCents,
      investedCents,
      gainCents: valueCents - investedCents,
      byAccount,
    }
  })
}

export const computeNetWorthTimeline = ({
  savingsTimeline,
  investmentsTimeline,
}: {
  savingsTimeline: ReadonlyArray<AssetsTimelinePoint>
  investmentsTimeline: ReadonlyArray<InvestmentsTimelinePoint>
}): Array<NetWorthTimelinePoint> => {
  if (savingsTimeline.length === 0 && investmentsTimeline.length === 0) return []

  const allMonths = new Set<string>()
  const savingsByMonth = new Map<string, number>()
  const investmentsByMonth = new Map<string, number>()

  for (const p of savingsTimeline) {
    allMonths.add(p.monthId)
    savingsByMonth.set(p.monthId, p.totalCents)
  }
  for (const p of investmentsTimeline) {
    allMonths.add(p.monthId)
    investmentsByMonth.set(p.monthId, p.valueCents)
  }

  const sortedMonths = Array.from(allMonths).toSorted((a, b) => a.localeCompare(b))
  const range = buildMonthRange(sortedMonths[0]!, sortedMonths.at(-1)!)

  let lastSavings = 0
  let lastInvestments = 0

  return range.map((monthId) => {
    const s = savingsByMonth.get(monthId)
    if (s !== undefined) lastSavings = s
    const inv = investmentsByMonth.get(monthId)
    if (inv !== undefined) lastInvestments = inv

    return {
      monthId,
      label: formatShortMonthLabel(monthId),
      savingsCents: lastSavings,
      investmentsCents: lastInvestments,
      totalCents: lastSavings + lastInvestments,
    }
  })
}
