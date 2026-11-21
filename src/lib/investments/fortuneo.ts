import { inflateRawSync } from "node:zlib"

import { parse } from "csv-parse/sync"

import { eurosToCents, parseAmountToCents } from "@/lib/budget/calculations"
import type { InvestmentTxType } from "@/lib/db/schema"
import type { YahooSearchResult } from "@/lib/market/yahoo"
import { searchYahooSecurities } from "@/lib/market/yahoo"

export type FortuneoParsedRow = {
  label: string
  operation: string
  type: InvestmentTxType
  place: string
  date: string // ISO YYYY-MM-DD
  quantity: number
  unitPriceCents: number
  feesCents: number
  totalEurCents: number
  currency: string
}

const normalizeKey = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()

const parseFrenchDateToIso = (raw: string): string | null => {
  const match = raw.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return null
  return `${match[3]}-${match[2]}-${match[1]}`
}

const parseDecimalNumber = (raw: string): number => {
  const normalized = raw.trim().replace(/\s+/g, "").replace(",", ".")
  if (!normalized) return 0
  const parsed = Number.parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

const mapOperationToTxType = (operation: string): InvestmentTxType | null => {
  const norm = normalizeKey(operation)
  if (norm.includes("achat") || norm.includes("souscription")) return "buy"
  if (norm.includes("vente") || norm.includes("cession") || norm.includes("rachat")) return "sell"
  if (norm.includes("dividende") || norm.includes("coupon") || norm.includes("distribution")) {
    return "dividend"
  }
  return null
}

/**
 * Extracts the first .csv file from a standard ZIP archive buffer (supports stored & deflate).
 */
export const extractCsvFromZip = (zipBytes: Uint8Array): Uint8Array => {
  const view = new DataView(zipBytes.buffer, zipBytes.byteOffset, zipBytes.byteLength)

  // Locate End of Central Directory (EOCD) signature 0x06054b50 from end of file
  let eocdOffset = -1
  for (let i = zipBytes.length - 22; i >= Math.max(0, zipBytes.length - 65_557); i -= 1) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocdOffset = i
      break
    }
  }
  if (eocdOffset === -1) {
    throw new Error("Invalid ZIP archive")
  }

  const totalEntries = view.getUint16(eocdOffset + 10, true)
  const cdOffset = view.getUint32(eocdOffset + 16, true)

  let offset = cdOffset
  for (let i = 0; i < totalEntries; i += 1) {
    if (view.getUint32(offset, true) !== 0x02014b50) break
    const compressionMethod = view.getUint16(offset + 10, true)
    const compressedSize = view.getUint32(offset + 20, true)
    const nameLen = view.getUint16(offset + 28, true)
    const extraLen = view.getUint16(offset + 30, true)
    const commentLen = view.getUint16(offset + 32, true)
    const localHeaderOffset = view.getUint32(offset + 42, true)

    const fileName = new TextDecoder("utf-8").decode(
      zipBytes.subarray(offset + 46, offset + 46 + nameLen),
    )

    if (fileName.toLowerCase().endsWith(".csv") && !fileName.startsWith("__MACOSX/")) {
      if (view.getUint32(localHeaderOffset, true) !== 0x04034b50) {
        throw new Error("Corrupted ZIP entry header")
      }
      const localNameLen = view.getUint16(localHeaderOffset + 26, true)
      const localExtraLen = view.getUint16(localHeaderOffset + 28, true)
      const dataStart = localHeaderOffset + 30 + localNameLen + localExtraLen
      const rawData = zipBytes.subarray(dataStart, dataStart + compressedSize)

      if (compressionMethod === 0) {
        return rawData
      }
      if (compressionMethod === 8) {
        return new Uint8Array(inflateRawSync(rawData))
      }
      throw new Error(`Unsupported ZIP compression method: ${compressionMethod}`)
    }

    offset += 46 + nameLen + extraLen + commentLen
  }

  throw new Error("No CSV file found inside ZIP archive")
}

export const decodeFortuneoBytes = (bytes: Uint8Array): string => {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    return new TextDecoder("windows-1252").decode(bytes)
  }
}

export const isZipBuffer = (bytes: Uint8Array): boolean =>
  bytes.length >= 4 &&
  bytes[0] === 0x50 &&
  bytes[1] === 0x4b &&
  bytes[2] === 0x03 &&
  bytes[3] === 0x04

export const parseFortuneoCsv = (
  csvText: string,
): { rows: Array<FortuneoParsedRow>; skippedCount: number } => {
  const cleaned = csvText.replace(/^\uFEFF/, "").trim()
  if (!cleaned) return { rows: [], skippedCount: 0 }

  const rawRecords = parse(cleaned, {
    delimiter: ";",
    relax_column_count: true,
    skip_empty_lines: true,
    trim: true,
  }) as Array<Array<string>>

  if (rawRecords.length < 2) return { rows: [], skippedCount: 0 }

  const headerRow = rawRecords[0]!.map(normalizeKey)
  const findCol = (...candidates: Array<string>) =>
    headerRow.findIndex((h) => candidates.some((c) => h.includes(c)))

  const idxLabel = findCol("libelle")
  const idxOp = findCol("operation")
  const idxPlace = findCol("place")
  const idxDate = findCol("date")
  const idxQty = findCol("qte", "quantite")
  const idxPrice = findCol("prix")
  const idxGross = findCol("montant brut")
  const idxFees = findCol("courtage", "frais")
  const idxNet = findCol("montant net")
  const idxCurrency = findCol("devise")

  if (idxLabel === -1 || idxOp === -1 || idxDate === -1) {
    throw new Error("Unrecognized Fortuneo CSV header format")
  }

  const rows: Array<FortuneoParsedRow> = []
  let skippedCount = 0

  for (let i = 1; i < rawRecords.length; i += 1) {
    const rec = rawRecords[i]!
    const label = (rec[idxLabel] ?? "").trim()
    const operation = (rec[idxOp] ?? "").trim()
    const dateIso = parseFrenchDateToIso(rec[idxDate] ?? "")
    const type = mapOperationToTxType(operation)

    if (!label || !dateIso || !type) {
      skippedCount += 1
      continue
    }

    const quantity = Math.abs(idxQty !== -1 ? parseDecimalNumber(rec[idxQty] ?? "") : 0)
    const execPrice = Math.abs(idxPrice !== -1 ? parseDecimalNumber(rec[idxPrice] ?? "") : 0)
    const unitPriceCents = eurosToCents(execPrice)
    const feesCents = Math.abs(idxFees !== -1 ? parseAmountToCents(rec[idxFees] ?? "") : 0)
    const rawNetCents = Math.abs(idxNet !== -1 ? parseAmountToCents(rec[idxNet] ?? "") : 0)
    const rawGrossCents = Math.abs(idxGross !== -1 ? parseAmountToCents(rec[idxGross] ?? "") : 0)
    const totalEurCents =
      rawNetCents > 0
        ? rawNetCents
        : rawGrossCents > 0
          ? rawGrossCents + (type === "buy" ? feesCents : -feesCents)
          : Math.round(quantity * unitPriceCents) + (type === "buy" ? feesCents : 0)

    const place = idxPlace !== -1 ? (rec[idxPlace] ?? "").trim() : ""
    const currency = (idxCurrency !== -1 ? (rec[idxCurrency] ?? "").trim() : "EUR") || "EUR"

    rows.push({
      label,
      operation,
      type,
      place,
      date: dateIso,
      quantity,
      unitPriceCents,
      feesCents,
      totalEurCents: Math.max(0, totalEurCents),
      currency: currency.toUpperCase(),
    })
  }

  return { rows, skippedCount }
}

export const cleanFortuneoLabelForSearch = (label: string): Array<string> => {
  const candidates: Array<string> = []
  const pushUnique = (q: string) => {
    const trimmed = q.replace(/\s+/g, " ").trim()
    if (trimmed.length >= 2 && !candidates.includes(trimmed)) {
      candidates.push(trimmed)
    }
  }

  // Strip "UCITS ETF ..." or "ETF ..." and share-class suffixes ("- C EUR ACC", "- EUR ACC", etc.)
  const beforeUcits = label.replace(/\bUCITS\b.*$/i, "").replace(/\bETF\b.*$/i, "")
  pushUnique(beforeUcits.replace(/[-–—/]+$/, ""))

  const beforeDash = label.split(/\s+[-–—]\s+/)[0] ?? label
  pushUnique(beforeDash)

  // Shorter prefix (first 4 words) as fallback
  const words = beforeUcits.trim().split(/\s+/).filter(Boolean)
  if (words.length > 3) {
    pushUnique(words.slice(0, 4).join(" "))
  }

  pushUnique(label)
  return candidates
}

export const resolveFortuneoLabelOnYahoo = async (
  label: string,
  place: string,
  currency: string,
): Promise<Array<YahooSearchResult>> => {
  const queries = cleanFortuneoLabelForSearch(label)
  const preferParis =
    normalizeKey(place).includes("paris") || normalizeKey(place).includes("euronext")
  const normCurrency = currency.toUpperCase()

  for (const query of queries) {
    const results = await searchYahooSecurities(query)
    if (results.length > 0) {
      return results.toSorted((a, b) => {
        const aScore =
          (preferParis && a.symbol.endsWith(".PA") ? 4 : 0) +
          (a.currency.toUpperCase() === normCurrency ? 2 : 0) +
          (a.assetClass === "etf" && /\bETF\b/i.test(label) ? 1 : 0)
        const bScore =
          (preferParis && b.symbol.endsWith(".PA") ? 4 : 0) +
          (b.currency.toUpperCase() === normCurrency ? 2 : 0) +
          (b.assetClass === "etf" && /\bETF\b/i.test(label) ? 1 : 0)
        return bScore - aScore
      })
    }
  }

  return []
}
