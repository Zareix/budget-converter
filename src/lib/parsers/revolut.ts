import crypto from "node:crypto"

import { parse } from "csv-parse/sync"

import { eurosToCents } from "@/lib/budget/calculations"
import { getDefaultCategory } from "@/lib/categories"
import { findInMapping, getMapping } from "@/lib/mapping"
import { resolvePaymentMethod } from "@/lib/payment-methods"
import { formatIsoDate, getFormattedDate, getMonthIdFromDate } from "@/lib/utils"

import type { Transaction } from "."

type RevolutInput = {
  Type: "Virement" | "Paiement par carte" | "Recharge"
  Produit: string
  "Date de début": string
  "Date de fin": string
  Description: string
  Montant: string
  Frais: string
  Devise: string
  État: string
  Solde: string
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
    resolvePaymentMethod("Carte Revolut"),
  ])

  const paymentMethodLabel = pm?.label ?? "Carte Revolut"
  const paymentMethodId = pm?.id ?? null
  const pmDefaultShare = pm?.defaultSharePercent ?? 100

  return parse<RevolutInput>(fileContent, {
    columns: true,
    skip_empty_lines: true,
  })
    .filter((record) => record.Type === "Paiement par carte" && record.État === "TERMINÉ")
    .map((record) => {
      const date = new Date(record["Date de début"])
      const formattedDate = getFormattedDate(date)
      const isoDate = formatIsoDate(date)
      const monthId = getMonthIdFromDate(date)
      const numericAmount = Number.parseFloat(record.Montant) * -1
      const amount = numericAmount.toFixed(2).replace(".", ",")
      const amountCents = eurosToCents(numericAmount)

      let name: string = record.Description
      let category: string = defaultCategory.label
      let categorySlug: string = defaultCategory.slug
      const mapped = findInMapping(mapping, name, amountCents / 100)
      if (mapped) {
        name = mapped.name
        category = mapped.category
        categorySlug = mapped.categorySlug
      } else {
        name = name.trim()
      }

      const sharePercent = mapped?.defaultSharePercent ?? pmDefaultShare
      const externalId = `revolut:${crypto
        .createHash("sha256")
        .update(
          `${record["Date de début"]}|${record.Description}|${record.Montant}|${record.Solde}`,
        )
        .digest("hex")
        .slice(0, 24)}`

      return {
        date: formattedDate,
        isoDate,
        monthId,
        originalDate: date,
        name,
        amount,
        amountCents,
        sharePercent,
        paymentMethod: paymentMethodLabel,
        paymentMethodId,
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
