import crypto from "node:crypto"

import { parse } from "csv-parse/sync"

import { parseAmountToCents } from "@/lib/budget/calculations"
import { getDefaultCategory } from "@/lib/categories"
import { findInMapping, getMapping } from "@/lib/mapping"
import { resolvePaymentMethod } from "@/lib/payment-methods"
import { formatIsoDate, getFormattedDate, getMonthIdFromDate } from "@/lib/utils"

import type { Transaction } from "."

type AmexInput = {
  Date: string
  Description: string
  Montant: string
  Détails: string
  "Apparait sur votre relevé de compte sous": string
  Adresse: string
  Ville: string
  "Code postal": string
  Pays: string
  Référence: string
}

export const parseToTransactions = async ({
  fileContent,
}: {
  fileContent?: string
}): Promise<Array<Transaction>> => {
  if (!fileContent) {
    throw new Error("No file content provided")
  }

  const [mapping, defaultCategory, pm] = await Promise.all([
    getMapping(),
    getDefaultCategory(),
    resolvePaymentMethod("Carte AMEX"),
  ])

  const paymentMethodLabel = pm?.label ?? "Carte AMEX"
  const paymentMethodId = pm?.id ?? null
  const pmDefaultShare = pm?.defaultSharePercent ?? 100

  return parse<AmexInput>(fileContent, {
    columns: true,
    skip_empty_lines: true,
  })
    .map((record) => {
      const date = new Date(record.Date)
      const formattedDate = getFormattedDate(date)
      const isoDate = formatIsoDate(date)
      const monthId = getMonthIdFromDate(date)
      const amountCents = parseAmountToCents(record.Montant)
      const price = amountCents / 100

      let name = record.Description
      let category = defaultCategory.label
      let categorySlug = defaultCategory.slug
      const mapped = findInMapping(mapping, name, price)
      if (mapped) {
        name = mapped.name
        category = mapped.category
        categorySlug = mapped.categorySlug
      } else {
        name = name.trim()
      }

      const sharePercent = mapped?.defaultSharePercent ?? pmDefaultShare
      const ref = record.Référence.trim()
      const externalId = ref
        ? `amex:${ref}`
        : `amex:${crypto
            .createHash("sha256")
            .update(`${record.Date}|${record.Description}|${record.Montant}`)
            .digest("hex")
            .slice(0, 24)}`

      return {
        date: formattedDate,
        isoDate,
        monthId,
        originalDate: date,
        amount: record.Montant,
        amountCents,
        sharePercent,
        paymentMethod: paymentMethodLabel,
        paymentMethodId,
        name,
        category,
        categorySlug,
        sourceName: record.Description,
        excluded: mapped?.exclude ?? false,
        externalId,
        raw: JSON.stringify(record, null, 2),
      } satisfies Transaction
    })
    .filter(Boolean)
    .toSorted((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
}
