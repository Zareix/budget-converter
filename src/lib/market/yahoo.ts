import type { AssetClass } from "@/lib/db/schema"

const YAHOO_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Accept: "application/json",
}

const REQUEST_TIMEOUT_MS = 8_000

export type YahooSearchResult = {
  symbol: string
  name: string
  exchange: string
  quoteType: string
  assetClass: AssetClass
  currency: string
}

export type YahooQuoteResult = {
  symbol: string
  currency: string
  price: number
  previousClose: number | null
  changePercent: number | null
}

export type YahooMonthlyClose = {
  monthId: string
  closePrice: number
  currency: string
}

const mapQuoteTypeToAssetClass = (quoteType?: string): AssetClass => {
  switch (quoteType?.toUpperCase()) {
    case "ETF":
      return "etf"
    case "EQUITY":
      return "stock"
    case "CRYPTOCURRENCY":
      return "crypto"
    case "MUTUALFUND":
      return "other"
    default:
      return "other"
  }
}

const fetchYahooJson = async <T>(url: string): Promise<T | null> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      headers: YAHOO_HEADERS,
      signal: controller.signal,
    })
    if (!response.ok) {
      return null
    }
    return (await response.json()) as T
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

type YahooSearchResponse = {
  quotes?: Array<{
    symbol?: string
    shortname?: string
    longname?: string
    exchDisp?: string
    exchange?: string
    quoteType?: string
    currency?: string
  }>
}

export const searchYahooSecurities = async (query: string): Promise<Array<YahooSearchResult>> => {
  const trimmed = query.trim()
  if (trimmed.length < 2) return []

  const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(trimmed)}&quotesCount=10&newsCount=0&enableFuzzyQuery=false`
  const data = await fetchYahooJson<YahooSearchResponse>(url)
  if (!data?.quotes) return []

  const allowedTypes = new Set(["ETF", "EQUITY", "MUTUALFUND", "CRYPTOCURRENCY", "INDEX"])

  const results = data.quotes
    .filter((q): q is NonNullable<typeof q> & { symbol: string } => {
      if (!q.symbol) return false
      if (q.quoteType && !allowedTypes.has(q.quoteType.toUpperCase())) return false
      return true
    })
    .map((q) => ({
      symbol: q.symbol,
      name: q.longname || q.shortname || q.symbol,
      exchange: q.exchDisp || q.exchange || "",
      quoteType: q.quoteType || "EQUITY",
      assetClass: mapQuoteTypeToAssetClass(q.quoteType),
      currency: q.currency || (q.symbol.endsWith(".PA") ? "EUR" : "USD"),
    }))

  // Prioritize Euronext Paris (.PA) listings for French PEA/CTO users
  return results.toSorted((a, b) => {
    const aPa = a.symbol.endsWith(".PA") ? 0 : 1
    const bPa = b.symbol.endsWith(".PA") ? 0 : 1
    return aPa - bPa
  })
}

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      meta?: {
        symbol?: string
        currency?: string
        regularMarketPrice?: number
        chartPreviousClose?: number
        previousClose?: number
      }
      timestamp?: Array<number>
      indicators?: {
        quote?: Array<{
          close?: Array<number | null>
        }>
      }
    }> | null
  }
}

export const fetchYahooQuote = async (symbol: string): Promise<YahooQuoteResult | null> => {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=5d&interval=1d`
  const data = await fetchYahooJson<YahooChartResponse>(url)
  const result = data?.chart?.result?.[0]
  const meta = result?.meta
  if (!meta) return null

  const closes = result.indicators?.quote?.[0]?.close?.filter(
    (v): v is number => typeof v === "number" && Number.isFinite(v),
  )
  const price =
    typeof meta.regularMarketPrice === "number" && Number.isFinite(meta.regularMarketPrice)
      ? meta.regularMarketPrice
      : (closes?.at(-1) ?? null)

  if (price === null) return null

  const previousClose =
    typeof meta.chartPreviousClose === "number" && Number.isFinite(meta.chartPreviousClose)
      ? meta.chartPreviousClose
      : typeof meta.previousClose === "number" && Number.isFinite(meta.previousClose)
        ? meta.previousClose
        : closes && closes.length >= 2
          ? (closes.at(-2) ?? null)
          : null

  const changePercent =
    previousClose !== null && previousClose > 0
      ? ((price - previousClose) / previousClose) * 100
      : null

  return {
    symbol: meta.symbol || symbol,
    currency: (meta.currency || "EUR").toUpperCase(),
    price,
    previousClose,
    changePercent,
  }
}

export const fetchYahooMonthlyHistory = async (
  symbol: string,
  range: "1y" | "2y" | "5y" = "5y",
): Promise<Array<YahooMonthlyClose>> => {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=1mo`
  const data = await fetchYahooJson<YahooChartResponse>(url)
  const result = data?.chart?.result?.[0]
  if (!result?.timestamp || !result.indicators?.quote?.[0]?.close) return []

  const currency = (result.meta?.currency || "EUR").toUpperCase()
  const closes = result.indicators.quote[0].close
  const byMonth = new Map<string, number>()

  for (let i = 0; i < result.timestamp.length; i += 1) {
    const ts = result.timestamp[i]
    const close = closes[i]
    if (typeof ts !== "number" || typeof close !== "number" || !Number.isFinite(close)) {
      continue
    }
    const date = new Date(ts * 1000)
    const monthId = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`
    byMonth.set(monthId, close)
  }

  return Array.from(byMonth.entries())
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([monthId, closePrice]) => ({ monthId, closePrice, currency }))
}
