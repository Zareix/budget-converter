import { and, asc, desc, eq, inArray } from "drizzle-orm"

import { db, runTransaction } from "@/lib/db"
import type { AssetClass, InvestmentTxType, PricingMode } from "@/lib/db/schema"
import {
  accounts,
  investmentTransactions,
  securities,
  securityMonthlyPrices,
  securityQuotes,
} from "@/lib/db/schema"
import type { FortuneoParsedRow } from "@/lib/investments/fortuneo"
import {
  decodeFortuneoBytes,
  extractCsvFromZip,
  isZipBuffer,
  parseFortuneoCsv,
  resolveFortuneoLabelOnYahoo,
} from "@/lib/investments/fortuneo"
import type { YahooSearchResult } from "@/lib/market/yahoo"
import { fetchYahooMonthlyHistory, fetchYahooQuote } from "@/lib/market/yahoo"

const QUOTE_TTL_MS = 15 * 60 * 1000 // 15 minutes

export const getInvestmentsOverview = async () => {
  const [investmentAccounts, allSecurities, allTransactions, allQuotes, allMonthlyPrices] =
    await Promise.all([
      db
        .select()
        .from(accounts)
        .where(eq(accounts.type, "investment"))
        .orderBy(asc(accounts.sortOrder), asc(accounts.id)),
      db.select().from(securities).orderBy(asc(securities.name), asc(securities.id)),
      db
        .select()
        .from(investmentTransactions)
        .orderBy(desc(investmentTransactions.date), desc(investmentTransactions.id)),
      db.select().from(securityQuotes),
      db
        .select()
        .from(securityMonthlyPrices)
        .orderBy(asc(securityMonthlyPrices.symbol), asc(securityMonthlyPrices.monthId)),
    ])

  return {
    accounts: investmentAccounts,
    securities: allSecurities,
    transactions: allTransactions,
    quotes: allQuotes,
    monthlyPrices: allMonthlyPrices,
  }
}

export const upsertSecurity = async ({
  symbol,
  isin,
  name,
  assetClass,
  currency,
  pricingMode,
  manualPriceCents,
}: {
  symbol: string
  isin?: string | null
  name: string
  assetClass: AssetClass
  currency: string
  pricingMode: PricingMode
  manualPriceCents?: number | null
}) => {
  const normalizedSymbol = symbol.trim().toUpperCase()
  const now = new Date().toISOString()

  const existing = db.select().from(securities).where(eq(securities.symbol, normalizedSymbol)).get()

  if (existing) {
    const [updated] = await db
      .update(securities)
      .set({
        name: name.trim(),
        ...(isin !== undefined && { isin: isin?.trim().toUpperCase() || null }),
        assetClass,
        currency: currency.trim().toUpperCase(),
        pricingMode,
        ...(manualPriceCents !== undefined && { manualPriceCents }),
        updatedAt: now,
      })
      .where(eq(securities.id, existing.id))
      .returning()
    return updated!
  }

  const [created] = await db
    .insert(securities)
    .values({
      symbol: normalizedSymbol,
      isin: isin?.trim().toUpperCase() || null,
      name: name.trim(),
      assetClass,
      currency: currency.trim().toUpperCase(),
      pricingMode,
      manualPriceCents: manualPriceCents ?? null,
      updatedAt: now,
    })
    .returning()

  // Warm quote + monthly history in background (best effort) for Yahoo securities
  if (created && created.pricingMode === "yahoo") {
    void refreshQuotesForSymbols([created.symbol], { force: true, includeHistory: true })
  }

  return created!
}

export const updateSecurityManualPrice = async ({
  securityId,
  manualPriceCents,
}: {
  securityId: number
  manualPriceCents: number
}) => {
  const [updated] = await db
    .update(securities)
    .set({
      manualPriceCents,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(securities.id, securityId))
    .returning()
  return updated
}

export const addInvestmentTransaction = async (data: {
  accountId: number
  securityId: number
  type: InvestmentTxType
  date: string
  quantity: number
  unitPriceCents: number
  feesCents?: number
  totalEurCents: number
  note?: string | null
}) => {
  const [created] = await db
    .insert(investmentTransactions)
    .values({
      accountId: data.accountId,
      securityId: data.securityId,
      type: data.type,
      date: data.date,
      quantity: data.quantity,
      unitPriceCents: data.unitPriceCents,
      feesCents: data.feesCents ?? 0,
      totalEurCents: data.totalEurCents,
      note: data.note?.trim() || null,
      createdAt: new Date().toISOString(),
    })
    .returning()
  return created
}

export const updateInvestmentTransaction = async (data: {
  id: number
  accountId?: number
  securityId?: number
  type?: InvestmentTxType
  date?: string
  quantity?: number
  unitPriceCents?: number
  feesCents?: number
  totalEurCents?: number
  note?: string | null
}) => {
  const { id, ...fields } = data
  const [updated] = await db
    .update(investmentTransactions)
    .set({
      ...(fields.accountId !== undefined && { accountId: fields.accountId }),
      ...(fields.securityId !== undefined && { securityId: fields.securityId }),
      ...(fields.type !== undefined && { type: fields.type }),
      ...(fields.date !== undefined && { date: fields.date }),
      ...(fields.quantity !== undefined && { quantity: fields.quantity }),
      ...(fields.unitPriceCents !== undefined && { unitPriceCents: fields.unitPriceCents }),
      ...(fields.feesCents !== undefined && { feesCents: fields.feesCents }),
      ...(fields.totalEurCents !== undefined && { totalEurCents: fields.totalEurCents }),
      ...(fields.note !== undefined && { note: fields.note?.trim() || null }),
    })
    .where(eq(investmentTransactions.id, id))
    .returning()
  return updated
}

export const deleteInvestmentTransaction = async (id: number) => {
  await db.delete(investmentTransactions).where(eq(investmentTransactions.id, id))
}

const upsertQuoteRow = async (quote: {
  symbol: string
  currency: string
  price: number
  previousClose: number | null
  changePercent: number | null
}) => {
  const now = new Date().toISOString()
  await db
    .insert(securityQuotes)
    .values({
      symbol: quote.symbol,
      currency: quote.currency,
      price: quote.price,
      previousClose: quote.previousClose,
      changePercent: quote.changePercent,
      fetchedAt: now,
    })
    .onConflictDoUpdate({
      target: securityQuotes.symbol,
      set: {
        currency: quote.currency,
        price: quote.price,
        previousClose: quote.previousClose,
        changePercent: quote.changePercent,
        fetchedAt: now,
      },
    })
}

const upsertMonthlyPrices = async (
  symbol: string,
  rows: Array<{ monthId: string; closePrice: number; currency: string }>,
) => {
  if (rows.length === 0) return
  const now = new Date().toISOString()
  for (const row of rows) {
    await db
      .insert(securityMonthlyPrices)
      .values({
        symbol,
        monthId: row.monthId,
        closePrice: row.closePrice,
        currency: row.currency,
        fetchedAt: now,
      })
      .onConflictDoUpdate({
        target: [securityMonthlyPrices.symbol, securityMonthlyPrices.monthId],
        set: {
          closePrice: row.closePrice,
          currency: row.currency,
          fetchedAt: now,
        },
      })
  }
}

export const refreshQuotesForSymbols = async (
  symbols: Array<string>,
  options?: { force?: boolean; includeHistory?: boolean },
): Promise<{ updated: number; failed: Array<string> }> => {
  const uniqueSymbols = Array.from(new Set(symbols.map((s) => s.trim()).filter(Boolean)))
  if (uniqueSymbols.length === 0) return { updated: 0, failed: [] }

  const force = options?.force ?? false
  const includeHistory = options?.includeHistory ?? false

  const existingQuotes = await db
    .select()
    .from(securityQuotes)
    .where(inArray(securityQuotes.symbol, uniqueSymbols))
  const existingMap = new Map(existingQuotes.map((q) => [q.symbol, q]))
  const nowMs = Date.now()

  const toFetch = uniqueSymbols.filter((symbol) => {
    if (force) return true
    const cached = existingMap.get(symbol)
    if (!cached) return true
    return nowMs - new Date(cached.fetchedAt).getTime() > QUOTE_TTL_MS
  })

  let updated = 0
  const failed: Array<string> = []
  const neededFxPairs = new Set<string>()

  await Promise.all(
    toFetch.map(async (symbol) => {
      const quote = await fetchYahooQuote(symbol)
      if (!quote) {
        failed.push(symbol)
        return
      }
      await upsertQuoteRow({ ...quote, symbol })
      updated += 1
      if (quote.currency && quote.currency !== "EUR") {
        neededFxPairs.add(`${quote.currency}EUR=X`)
      }
      if (includeHistory) {
        const history = await fetchYahooMonthlyHistory(symbol)
        await upsertMonthlyPrices(symbol, history)
      }
    }),
  )

  // Also fetch FX pairs for non-EUR currencies
  if (neededFxPairs.size > 0) {
    await Promise.all(
      Array.from(neededFxPairs).map(async (fxSymbol) => {
        const fxQuote = await fetchYahooQuote(fxSymbol)
        if (fxQuote) {
          await upsertQuoteRow({ ...fxQuote, symbol: fxSymbol })
        }
        if (includeHistory) {
          const fxHistory = await fetchYahooMonthlyHistory(fxSymbol)
          await upsertMonthlyPrices(fxSymbol, fxHistory)
        }
      }),
    )
  }

  return { updated, failed }
}

export const refreshAllInvestmentQuotes = async (options?: {
  force?: boolean
  includeHistory?: boolean
}) => {
  const yahooSecurities = await db
    .select()
    .from(securities)
    .where(eq(securities.pricingMode, "yahoo"))

  const symbols = yahooSecurities.map((s) => s.symbol)
  return refreshQuotesForSymbols(symbols, {
    force: options?.force ?? true,
    includeHistory: options?.includeHistory ?? true,
  })
}

export type FortuneoLabelResolution = {
  label: string
  place: string
  currency: string
  count: number
  matchedSecurityId: number | null
  candidates: Array<YahooSearchResult>
}

export const previewFortuneoImport = async ({
  base64,
}: {
  fileName: string
  base64: string
}): Promise<{
  rows: Array<FortuneoParsedRow>
  skippedCount: number
  labels: Array<FortuneoLabelResolution>
}> => {
  const bytes = new Uint8Array(Buffer.from(base64, "base64"))
  const csvBytes = isZipBuffer(bytes) ? extractCsvFromZip(bytes) : bytes
  const csvText = decodeFortuneoBytes(csvBytes)
  const { rows, skippedCount } = parseFortuneoCsv(csvText)

  const existingSecurities = await db.select().from(securities)
  const uniqueMeta = new Map<string, { place: string; currency: string; count: number }>()

  for (const row of rows) {
    const current = uniqueMeta.get(row.label)
    if (current) {
      current.count += 1
    } else {
      uniqueMeta.set(row.label, { place: row.place, currency: row.currency, count: 1 })
    }
  }

  const labels = await Promise.all(
    Array.from(uniqueMeta.entries()).map(async ([label, meta]) => {
      const normalizedLabel = label.toLowerCase()
      const existingMatch = existingSecurities.find(
        (s) =>
          s.name.toLowerCase() === normalizedLabel || s.symbol.toLowerCase() === normalizedLabel,
      )
      const candidates = await resolveFortuneoLabelOnYahoo(label, meta.place, meta.currency)
      const symbolMatch =
        existingMatch ??
        (candidates[0]
          ? existingSecurities.find(
              (s) => s.symbol.toUpperCase() === candidates[0]!.symbol.toUpperCase(),
            )
          : undefined)

      return {
        label,
        place: meta.place,
        currency: meta.currency,
        count: meta.count,
        matchedSecurityId: symbolMatch?.id ?? null,
        candidates,
      }
    }),
  )

  return { rows, skippedCount, labels }
}

export type FortuneoLabelMapping = {
  label: string
  securityId?: number | null
  yahoo?: {
    symbol: string
    name: string
    assetClass: AssetClass
    currency: string
  } | null
  manual?: {
    name: string
    assetClass: AssetClass
  } | null
}

export const commitFortuneoImport = async ({
  accountId,
  mappings,
  rows,
}: {
  accountId: number
  mappings: Array<FortuneoLabelMapping>
  rows: Array<FortuneoParsedRow>
}): Promise<{ imported: number; skipped: number }> => {
  const securityIdByLabel = new Map<string, number>()
  const symbolsToRefresh: Array<string> = []

  for (const mapping of mappings) {
    if (mapping.securityId) {
      securityIdByLabel.set(mapping.label, mapping.securityId)
      const sec = db.select().from(securities).where(eq(securities.id, mapping.securityId)).get()
      if (sec?.pricingMode === "yahoo") {
        symbolsToRefresh.push(sec.symbol)
      }
    } else if (mapping.yahoo) {
      const created = await upsertSecurity({
        symbol: mapping.yahoo.symbol,
        name: mapping.yahoo.name,
        assetClass: mapping.yahoo.assetClass,
        currency: mapping.yahoo.currency,
        pricingMode: "yahoo",
      })
      securityIdByLabel.set(mapping.label, created.id)
      symbolsToRefresh.push(created.symbol)
    } else if (mapping.manual) {
      const slug = mapping.manual.name
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
      const created = await upsertSecurity({
        symbol: `MANUAL:${slug || "asset"}`,
        name: mapping.manual.name,
        assetClass: mapping.manual.assetClass,
        currency: "EUR",
        pricingMode: "manual",
      })
      securityIdByLabel.set(mapping.label, created.id)
    }
  }

  const result = await runTransaction(db, async (tx) => {
    let imported = 0
    let skipped = 0
    const now = new Date().toISOString()

    for (const row of rows) {
      const securityId = securityIdByLabel.get(row.label)
      if (!securityId) {
        skipped += 1
        continue
      }

      const duplicate = tx
        .select({ id: investmentTransactions.id })
        .from(investmentTransactions)
        .where(
          and(
            eq(investmentTransactions.accountId, accountId),
            eq(investmentTransactions.securityId, securityId),
            eq(investmentTransactions.type, row.type),
            eq(investmentTransactions.date, row.date),
            eq(investmentTransactions.quantity, row.quantity),
            eq(investmentTransactions.totalEurCents, row.totalEurCents),
          ),
        )
        .get()

      if (duplicate) {
        skipped += 1
        continue
      }

      await tx.insert(investmentTransactions).values({
        accountId,
        securityId,
        type: row.type,
        date: row.date,
        quantity: row.quantity,
        unitPriceCents: row.unitPriceCents,
        feesCents: row.feesCents,
        totalEurCents: row.totalEurCents,
        note: row.operation,
        createdAt: now,
      })
      imported += 1
    }

    return { imported, skipped }
  })

  if (symbolsToRefresh.length > 0) {
    await refreshQuotesForSymbols(symbolsToRefresh, { force: true, includeHistory: true })
  }

  return result
}
