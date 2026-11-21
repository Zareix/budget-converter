import crypto from "node:crypto"

import { env } from "@/env"
import { eurosToCents } from "@/lib/budget/calculations"
import { getDefaultCategory } from "@/lib/categories"
import type { Account } from "@/lib/fetcher"
import { findInMapping, getMapping } from "@/lib/mapping"
import type { Transaction } from "@/lib/parsers"
import { resolvePaymentMethod } from "@/lib/payment-methods"
import {
  firstNonNullNorEmpty,
  formatIsoDate,
  getFormattedDate,
  getMonthIdFromDate,
  isCurrentOrPreviousMonth,
} from "@/lib/utils"

export type ListAccountResponse = {
  accounts: Array<{
    currency?: string
    id: number
    institution_logo: null | string
    institution_name: string
    name: string
    provider:
      | "gocardless"
      | "quiltt"
      | "finverse"
      | "pluggy"
      | "lunchmoney"
      | "simplefin"
      | "stripe"
      | "akahu"
      | "snaptrade"
    status?: "ACTIVE" | "DISCONNECTED" | "ERROR"
  }>
  total: number
}

export type ListAccountTransactionsResponse = {
  total: number
  transactions: Array<{
    accountId: number
    amount: number
    currency: string
    date: string
    description?: string
    /**
     * Unique transaction identifier. Can be null for pending transactions (when isPending is
     * true). If null for non-pending transactions, this indicates a data issue that should be
     * investigated.
     */
    id: null | string
    isPending?: boolean
    merchant?: string
  }>
}

export const isActive = () => !!env.LUNCH_FLOW_API_KEY

export const listAccounts = async (): Promise<Array<Account>> => {
  if (!env.LUNCH_FLOW_API_KEY) {
    return []
  }
  const res = await fetch("https://www.lunchflow.app/api/v1/accounts", {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.LUNCH_FLOW_API_KEY,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch accounts")
  }

  const result = (await res.json()) as ListAccountResponse
  return result.accounts.map(
    (account) =>
      ({
        id: account.id.toString(),
        name: account.name,
        institutionName: account.institution_name,
        institutionLogo: account.institution_logo,
        fetcher: "lunchflow",
      }) satisfies Account,
  )
}

const fetchTransactionsForAccount = async ({
  accountId,
  accounts,
}: {
  accountId: string
  accounts: Array<Pick<Awaited<ReturnType<typeof listAccounts>>[number], "id" | "name">>
}): Promise<Array<Transaction>> => {
  if (!env.LUNCH_FLOW_API_KEY) {
    throw new Error("LUNCH_FLOW_API_KEY is not set")
  }

  const accountName = accounts.find((acc) => acc.id === accountId)?.name
  const pm = await resolvePaymentMethod(accountName)
  if (!pm) {
    return []
  }

  const res = await fetch(`https://www.lunchflow.app/api/v1/accounts/${accountId}/transactions`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.LUNCH_FLOW_API_KEY,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch transactions")
  }

  const result = (await res.json()) as ListAccountTransactionsResponse

  const [mapping, defaultCategory] = await Promise.all([getMapping(), getDefaultCategory()])
  const now = new Date()
  return result.transactions
    .filter((record) => !record.isPending)
    .filter((record) => {
      const date = new Date(record.date)
      return isCurrentOrPreviousMonth(date, now)
    })
    .map((record) => {
      const date = new Date(record.date)
      const formattedDate = getFormattedDate(date)
      const isoDate = formatIsoDate(date)
      const monthId = getMonthIdFromDate(date)
      const numericAmount = record.amount * -1
      const amount = numericAmount.toFixed(2).replace(".", ",")
      const amountCents = eurosToCents(numericAmount)

      let name: string = firstNonNullNorEmpty(record.merchant, record.description) ?? "Unknown"
      const sourceName = name
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

      const sharePercent = mapped?.defaultSharePercent ?? pm.defaultSharePercent
      const externalId = record.id
        ? `lf:${record.id}`
        : `lf:hash:${crypto
            .createHash("sha256")
            .update(
              `${accountId}|${record.date}|${record.amount}|${record.merchant ?? ""}|${record.description ?? ""}`,
            )
            .digest("hex")
            .slice(0, 24)}`

      return {
        date: formattedDate,
        isoDate,
        monthId,
        originalDate: date,
        name:
          name +
          (record.merchant &&
          record.description &&
          record.description !== "undefined" &&
          record.description.length > 0
            ? ` - ${record.description}`
            : ""),
        amount,
        amountCents,
        sharePercent,
        category,
        categorySlug,
        paymentMethod: pm.label,
        paymentMethodId: pm.id,
        sourceName,
        excluded: mapped?.exclude ?? false,
        externalId,
        raw: JSON.stringify(record, null, 2),
      } satisfies Transaction
    })
    .filter(Boolean)
}

export const fetchTransactions = async (accountId: Account["id"]): Promise<Array<Transaction>> => {
  const accounts = await listAccounts()
  return fetchTransactionsForAccount({
    accountId: accountId,
    accounts,
  })
}
