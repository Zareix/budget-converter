import { join } from 'node:path'
import jwa from 'jwa'
import type { Account } from '@/lib/fetcher'
import type { Category, Transaction } from '@/lib/parsers'
import { toPaymentMethod } from '@/lib/parsers'
import { getMapping } from '@/lib/server/functions'
import { firstNonNullNorEmpty, getFormattedDate } from '@/lib/utils'
import { findInMapping } from '@/lib/mapping'
import { env } from '@/env'

const BASE_URL = 'https://api.enablebanking.com'

type Storage = {
  accounts: Array<{
    id: string
    name: string
    institutionName: string
    institutionLogo?: string | null
    validUntil: string
  }>
}

export type EbTransactionsResponse = {
  transactions: Array<{
    entry_reference: string
    merchant_category_code: null
    transaction_amount: {
      currency: 'EUR'
      amount: string
    }
    creditor: {
      name: string
      postal_address: {
        address_type: null
        department: null
        sub_department: null
        street_name: null
        building_number: null
        post_code: null
        town_name: null
        country_sub_division: null
        country: null
        address_line: Array<string>
      }
      organisation_id: null
      private_id: null
      contact_details: null
    } | null
    creditor_account: null
    creditor_agent: null
    debtor: null
    debtor_account: {
      iban: null
      other: {
        identification: string
        scheme_name: 'CPAN' & (string | {})
        issuer: null
      }
    }
    debtor_agent: null
    bank_transaction_code: null | {
      code: string
    }
    credit_debit_indicator: 'DBIT' & (string | {})
    status: 'PDNG' | 'BOOK'
    booking_date: Date
    value_date: null
    transaction_date: null
    balance_after_transaction: null
    reference_number: null
    reference_number_schema: null
    remittance_information: Array<string>
    debtor_account_additional_identification: null
    creditor_account_additional_identification: null
    exchange_rate: {
      unit_currency: null
      exchange_rate: string
      rate_type: null
      contract_identification: null
      instructed_amount: null
    }
    note: null
    transaction_id: null
  }>
  continuation_key: null
}

const getJWTHeader = () => {
  return encodeData({
    typ: 'JWT',
    alg: 'RS256',
    kid: env.EB_APPLICATION_ID,
  })
}

const encodeData = (data: any) => {
  return Buffer.from(JSON.stringify(data)).toString('base64').replace('=', '')
}

const getJWTBody = (exp: number) => {
  const timestamp = Math.floor(new Date().getTime() / 1000)
  return encodeData({
    iss: 'enablebanking.com',
    aud: 'api.enablebanking.com',
    iat: timestamp,
    exp: timestamp + exp,
  })
}

const signWithKey = async (data: any) => {
  const key = await Bun.file(join(env.APP_DIR, 'eb.pem')).text()
  return jwa('RS256').sign(data, key)
}

const getJWT = async (exp = 3600) => {
  const jwtHeaders = getJWTHeader()
  const jwtBody = getJWTBody(exp)
  const jwtSignature = await signWithKey(`${jwtHeaders}.${jwtBody}`)
  return `${jwtHeaders}.${jwtBody}.${jwtSignature}`
}

const getStorageFilePath = () => join(env.APP_DIR, 'eb.json')

const readStorage = async (): Promise<Storage> => {
  const storage = (await Bun.file(getStorageFilePath())
    .json()
    .catch(() => null)) as Storage | null
  if (!storage) {
    await writeStorage({
      accounts: [],
    })
    return readStorage()
  }
  return storage
}

const writeStorage = async (data: Storage) => {
  await Bun.write(getStorageFilePath(), JSON.stringify(data, null, 2))
}

export const getBanks = async () => {
  const jwt = await getJWT()
  const response = await fetch(`${BASE_URL}/aspsps`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error(
      `Failed to fetch banks: ${response.status} ${response.statusText}`,
    )
  }
  const data = (await response.json()) as {
    aspsps: Array<{
      name: string
      country: string
      logo: string
      maximum_consent_validity: number
    }>
  }

  return data.aspsps.map((aspsp) => ({
    name: aspsp.name,
    country: aspsp.country,
    logo: aspsp.logo,
    maximumConsentValidity: aspsp.maximum_consent_validity,
  }))
}

export const getRedirectUrl = async (
  bank: NonNullable<Awaited<ReturnType<typeof getBanks>>[0]>,
) => {
  const jwt = await getJWT()
  const validUntil = new Date(
    new Date().getTime() + bank.maximumConsentValidity * 1000,
  )
  const state = Math.random().toString(36).substring(2, 15)
  const startAuthorizationBody = {
    access: {
      valid_until: validUntil.toISOString(),
    },
    aspsp: {
      name: bank.name,
      country: bank.country,
    },
    state: state,
    redirect_url: `${env.APP_URL}/api/enable-banking`,
    psu_type: 'personal',
  }
  const baseHeaders = {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  }
  const startAuthorizationResponse = await fetch(`${BASE_URL}/auth`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify(startAuthorizationBody),
  })
  const startAuthorizationData = (await startAuthorizationResponse.json()) as {
    url: string
  }

  return startAuthorizationData.url
}

export const completeAuthorization = async (code: string) => {
  const jwt = await getJWT()
  const baseHeaders = {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  }
  const createSessionResponse = await fetch(`${BASE_URL}/sessions`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify({
      code: code,
    }),
  })
  const createSessionData = (await createSessionResponse.json()) as {
    session_id: string
  }
  const sessionId = createSessionData.session_id

  const sessionResponse = await fetch(`${BASE_URL}/sessions/${sessionId}`, {
    headers: baseHeaders,
  })
  const sessionData = (await sessionResponse.json()) as {
    accounts: Array<string>
    aspsp: { name: string; country: string }
    access: {
      valid_until: string
    }
  }

  const banks = await getBanks()
  const bank = banks.find(
    (b) =>
      b.name === sessionData.aspsp.name &&
      b.country === sessionData.aspsp.country,
  )
  if (!bank) {
    throw new Error(`Bank ${sessionData.aspsp.name} not found in banks list`)
  }
  const storage = await readStorage()
  for (const accountId of sessionData.accounts) {
    if (storage.accounts.find((a) => a.id === accountId)) {
      console.log(`Account ${accountId} already exists in storage, skipping it`)
      continue
    }
    storage.accounts.push({
      id: accountId,
      name: sessionData.aspsp.name,
      institutionName: `${sessionData.aspsp.name} (${sessionData.aspsp.country})`,
      institutionLogo: bank.logo,
      validUntil: sessionData.access.valid_until,
    })
  }
  await writeStorage({
    accounts: storage.accounts,
  })
}

export const listAccounts = async (): Promise<Array<Account>> => {
  const storage = await readStorage()
  let hasExpiredAccount = false
  for (const account of storage.accounts) {
    if (new Date(account.validUntil) < new Date()) {
      console.log(`Account ${account.id} has expired, removing it from storage`)
      const updatedStorage = {
        accounts: storage.accounts.filter((a) => a.id !== account.id),
      }
      await writeStorage(updatedStorage)
      hasExpiredAccount = true
    }
  }
  if (hasExpiredAccount) {
    return await listAccounts()
  }
  return storage.accounts.map((account) => ({
    id: account.id,
    name: account.name,
    institutionName: account.institutionName,
    institutionLogo: account.institutionLogo,
    fetcher: 'enable-banking' as const,
  }))
}

export const fetchTransactions = async (
  accountId: Account['id'],
): Promise<Array<Transaction>> => {
  const paymentMethod = toPaymentMethod(
    (await listAccounts()).find((acc) => acc.id === accountId)?.name,
  )
  if (!paymentMethod) {
    console.error(
      `Payment method for account ${accountId} not found, skipping it`,
    )
    return []
  }

  const jwt = await getJWT()
  const accountTransactionsResponse = await fetch(
    `${BASE_URL}/accounts/${accountId}/transactions`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    },
  )
  if (!accountTransactionsResponse.ok) {
    console.error(
      `Failed to fetch transactions for account ${accountId}: ${accountTransactionsResponse.status} ${accountTransactionsResponse.statusText}`,
    )
    return []
  }
  const result =
    (await accountTransactionsResponse.json()) as EbTransactionsResponse
  console.log(
    `Fetched ${result.transactions.length} transactions for account ${accountId}`,
  )

  const mapping = await getMapping()
  const now = new Date()
  return result.transactions
    .filter(
      (record) =>
        record.status === 'BOOK' &&
        (!record.bank_transaction_code ||
          record.bank_transaction_code.code === 'CARD_PAYMENT'),
    )
    .filter((record) => {
      const date = new Date(
        firstNonNullNorEmpty(record.transaction_date, record.booking_date)!,
      )
      return (
        (date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()) ||
        (date.getMonth() === now.getMonth() - 1 &&
          date.getFullYear() === now.getFullYear())
      )
    })
    .filter((record) => {
      if (paymentMethod !== 'Carte SG') {
        return true
      }
      const name = firstNonNullNorEmpty(
        record.creditor?.name,
        record.remittance_information[0],
      )!
      return name.startsWith('CARTE ')
    })
    .map((record) => {
      const date = new Date(
        firstNonNullNorEmpty(record.transaction_date, record.booking_date)!,
      )
      const formattedDate = getFormattedDate(date)
      const amount = Number.parseFloat(record.transaction_amount.amount)
        .toFixed(2)
        .replace('.', ',')

      let name: string = firstNonNullNorEmpty(
        record.creditor?.name,
        record.remittance_information[0],
      )!.split('   ')[0]
      if (paymentMethod === 'Carte SG') {
        name = name.substring(17)
      }
      const description =
        record.remittance_information.length > 1
          ? record.remittance_information[0]
          : null
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
          (description && description.length > 0 ? ` - ${description}` : ''),
        amount: amount,
        category,
        paymentMethod,
      } satisfies Transaction
    })
    .filter(Boolean)
}
