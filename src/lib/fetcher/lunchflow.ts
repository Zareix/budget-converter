import type { Category, Transaction } from '@/lib/parsers'
import type { Account } from '@/lib/fetcher'
import { isPaymentMethod } from '@/lib/parsers'
import { findInMapping, getMapping } from '@/lib/mapping'
import { firstNonNullNorEmpty, getFormattedDate } from '@/lib/utils'

export type ListAccountResponse = {
  accounts: Array<{
    currency?: string
    id: number
    institution_logo: null | string
    institution_name: string
    name: string
    provider:
      | 'gocardless'
      | 'quiltt'
      | 'finverse'
      | 'pluggy'
      | 'lunchmoney'
      | 'simplefin'
      | 'stripe'
      | 'akahu'
      | 'snaptrade'
    status?: 'ACTIVE' | 'DISCONNECTED' | 'ERROR'
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

export const isActive = () => !!process.env.LUNCH_FLOW_API_KEY

export const listAccounts = async (): Promise<Array<Account>> => {
  if (!process.env.LUNCH_FLOW_API_KEY) {
    return []
  }
  const res = await fetch('https://www.lunchflow.app/api/v1/accounts', {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.LUNCH_FLOW_API_KEY,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch accounts')
  }

  const result = (await res.json()) as ListAccountResponse
  return result.accounts.map(
    (account) =>
      ({
        id: account.id.toString(),
        name: account.name,
        institutionName: account.institution_name,
        institutionLogo: account.institution_logo,
        fetcher: 'lunchflow',
      }) satisfies Account,
  )
}

const fetchTransactionsForAccount = async ({
  accountId,
  accounts,
}: {
  accountId: number
  accounts: Array<
    Pick<Awaited<ReturnType<typeof listAccounts>>[number], 'id' | 'name'>
  >
}): Promise<Array<Transaction>> => {
  if (!process.env.LUNCH_FLOW_API_KEY) {
    throw new Error('LUNCH_FLOW_API_KEY is not set')
  }

  const paymentMethod =
    accounts.find((acc) => acc.id === accountId)?.name ?? 'Unknown'
  if (!isPaymentMethod(paymentMethod)) {
    return []
  }

  const res = await fetch(
    `https://www.lunchflow.app/api/v1/accounts/${accountId}/transactions`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.LUNCH_FLOW_API_KEY,
      },
    },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch transactions')
  }

  const result = (await res.json()) as ListAccountTransactionsResponse

  const mapping = await getMapping()
  const now = new Date()
  return result.transactions
    .filter((record) => !record.isPending)
    .filter((record) => {
      const date = new Date(record.date)
      return (
        (date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()) ||
        (date.getMonth() === now.getMonth() - 1 &&
          date.getFullYear() === now.getFullYear())
      )
    })
    .map((record) => {
      const date = new Date(record.date)
      const formattedDate = getFormattedDate(date)
      const amount = (record.amount * -1).toFixed(2).replace('.', ',')

      let name: string =
        firstNonNullNorEmpty(record.merchant, record.description) ?? 'Unknown'
      let category: Category = '💬 Autres'
      const mapped = findInMapping(
        mapping,
        name,
        Number.parseFloat(amount.replace(',', '.')),
      )
      if (mapped) {
        if (mapped.exclude) {
          return null
        }
        name = mapped.name
        category = mapped.category
      } else {
        name = name.trim()
      }

      return {
        date: formattedDate,
        originalDate: date,
        name:
          name +
          (record.merchant &&
          record.description &&
          record.description !== 'undefined' &&
          record.description.length > 0
            ? ` - ${record.description}`
            : ''),
        amount: amount,
        category,
        paymentMethod,
      } satisfies Transaction
    })
    .filter(Boolean)
}

export const fetchTransactions = async (
  accountId: Account['id'],
): Promise<Array<Transaction>> => {
  const accounts = await listAccounts()
  return fetchTransactionsForAccount({
    accountId: Number.parseInt(accountId, 10),
    accounts,
  })
}
