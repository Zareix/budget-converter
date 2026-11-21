import crypto from "node:crypto"

import { env } from "@/env"
import { eurosToCents } from "@/lib/budget/calculations"
import { getDefaultCategory } from "@/lib/categories"
import type { Account } from "@/lib/fetcher"
import { findInMapping, getMapping } from "@/lib/mapping"
import type { Transaction } from "@/lib/parsers"
import { resolvePaymentMethod } from "@/lib/payment-methods"
import {
  formatIsoDate,
  getFormattedDate,
  getMonthIdFromDate,
  isCurrentOrPreviousMonth,
} from "@/lib/utils"

type TricountSessionResponse = {
  Response: Array<{
    Id?: {
      id: number
    }
    Token?: {
      id: number
      created: Date
      updated: Date
      token: string
    }
    EncryptionKey?: {
      uuid: string
      encryption_key: string
    }
    UserPerson?: {
      id: number
      created: Date
      updated: Date
      status: string
      sub_status: string
      public_uuid: string
      display_name: string
      public_nick_name: string
      language: string
      region: string
      session_timeout: number
      daily_limit_without_confirmation_login: {
        currency: string
        value: string
      }
      avatar: {
        uuid: string
        image: Array<{
          attachment_public_uuid: string
          height: number
          width: number
          content_type: string
          urls: Array<{
            type: string
            url: string
          }>
        }>
        anchor_uuid: string
        style: string
      }
      relations: Array<unknown>
      alias: Array<unknown>
      tax_resident: Array<unknown>
      notification_filters: Array<unknown>
      user_onboarding: null
      address_main: null
      address_postal: null
      address_shipping: null
      freeze_user: null
      debt_collection: null
      recovery_requirements: Array<unknown>
      deny_reason: null
      first_name: string
      middle_name: string
      last_name: string
      legal_name: string
      date_of_birth: null
      place_of_birth: null
      country_of_banking_license: string
      country_of_banking_license_preferred: null
      country_of_birth: null
      nationality: string
      all_nationality: Array<string>
      gender: string
      verification_status: string
      version_terms_of_service: string
      customer: null
      customer_limit: { [key: string]: number | null }
      billing_contract: Array<unknown>
      pack_membership: null
      premium_trial: null
      fulfillments: Array<{
        type: string
        reason: string
        reason_translated: string
        user_id: number
        status: null | string
        time_mandatory: null
        all_status_allowed: null
        id: number | null
        created_timestamp: null
        updated_timestamp: null
      }>
    }
    RegistryOverview?: {
      registry: Array<unknown>
    }
    RegistryArchivedOverview?: {
      registry: Array<unknown>
    }
    TokenDevice?: {
      id: number
      created: Date
      updated: Date
      token: string
    }
    ServerPublicKey?: {
      server_public_key: string
    }
    DevicePhone?: {
      id: number
      created: Date
      updated: Date
      description: string
      phone_number: null
      os: string
      status: string
    }
  }>
}

type TricountDataResponse = {
  Response: Array<{
    Registry: {
      id: number
      created: Date
      updated: Date
      uuid: string
      currency: "EUR"
      emoji: string
      title: string
      description: string
      category: string
      status: string
      membership_uuid_active: null
      memberships: Array<{
        RegistryMembershipNonUser: {
          id: number
          created: Date
          updated: Date
          uuid: string
          alias: {
            display_name: string
            pointer: {
              type: "UUID"
              value: string
              name: string
            }
          }
          status: "ACTIVE"
          setting: {
            auto_add_card_transaction: "INACTIVE"
            time_auto_add_card_transaction_end: null
            time_auto_add_card_transaction_start: null
            card_ids: Array<unknown>
            card_labels: Array<unknown>
          }
          auto_add_card_transaction: "NONE"
          remover: null
        }
      }>
      last_activity_timestamp: Date
      public_identifier_token: string
      all_registry_entry: Array<{
        RegistryEntry: {
          id: number
          created: Date
          updated: Date
          uuid: string
          status: "ACTIVE"
          amount: {
            currency: "EUR"
            value: string
          }
          amount_local: {
            currency: "EUR"
            value: string
          }
          exchange_rate: string
          description: string
          type: "MANUAL"
          type_transaction: "NORMAL" | "BALANCE"
          membership_owned: {
            RegistryMembershipNonUser: {
              id: number
              created: Date
              updated: Date
              uuid: string
              alias: {
                display_name: string
                pointer: {
                  type: "UUID"
                  value: string
                  name: string
                }
              }
              status: "ACTIVE"
              setting: {
                auto_add_card_transaction: "INACTIVE"
                time_auto_add_card_transaction_end: null
                time_auto_add_card_transaction_start: null
                card_ids: Array<unknown>
                card_labels: Array<unknown>
              }
              auto_add_card_transaction: "NONE"
              remover: null
            }
          }
          allocations: Array<{
            amount: {
              currency: "EUR"
              value: string
            }
            amount_local: {
              currency: "EUR"
              value: string
            }
            membership: {
              RegistryMembershipNonUser: {
                id: number
                created: Date
                updated: Date
                uuid: string
                alias: {
                  display_name: string
                  pointer: {
                    type: "UUID"
                    value: string
                    name: string
                  }
                }
              }
            }
            type: "RATIO" | "AMOUNT"
            share_ratio?: number
          }>
          attachment: Array<unknown>
          category: string
          category_custom: null | string
          date: Date
        }
      }>
      all_registry_gallery_attachment: Array<unknown>
      setting: null
    }
  }>
  Pagination: {
    future_url: null
    newer_url: null
    older_url: null
  }
}

type TricountSession = {
  authToken: string
  userId: number
  headers: Record<string, string>
}

const getTricountSession = async (): Promise<TricountSession> => {
  const appId = crypto.randomUUID()

  const { publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  })

  console.log("Creating Tricount session")
  const headers = {
    // Tricount rejects old builds with "Please update your app"; the 4th field (build) must be above its minimum.
    // shortcut: version/build will need bumping again when Tricount raises its minimum (currently ~4200).
    "User-Agent": "com.bunq.tricount.android:RELEASE:14.8.2:4500:ANDROID:13:C",
    "app-id": appId,
    "X-Bunq-Client-Request-Id": "049bfcdf-6ae4-4cee-af7b-45da31ea85d0",
  }
  const responseSes = await fetch(
    `https://api.tricount.bunq.com/v1/session-registry-installation`,
    {
      method: "POST",
      body: JSON.stringify({
        app_installation_uuid: appId,
        client_public_key: publicKey,
        device_description: "Android",
      }),
      headers,
    },
  )
  if (!responseSes.ok) {
    console.error("Failed to fetch transactions", await responseSes.text())
    throw new Error("Failed to fetch transactions")
  }
  const sessionData = (await responseSes.json()) as TricountSessionResponse
  const authToken = sessionData.Response.find((item) => item.Token)?.Token?.token
  if (!authToken) {
    throw new Error("Failed to retrieve auth token from Tricount response")
  }

  const userId = sessionData.Response.find((item) => item.UserPerson)?.UserPerson?.id
  if (!userId) {
    throw new Error("Failed to retrieve user id from Tricount response")
  }

  return {
    authToken,
    userId,
    headers: {
      ...headers,
      "X-Bunq-Client-Authentication": authToken,
    },
  }
}

const getTricountRegistryData = async (tricountKey: string) => {
  const session = await getTricountSession()
  const responseData = await fetch(
    `https://api.tricount.bunq.com/v1/user/${session.userId}/registry?public_identifier_token=${tricountKey}`,
    {
      headers: session.headers,
    },
  )
  if (!responseData.ok) {
    console.error("Failed to fetch transactions", await responseData.text())
    throw new Error("Failed to fetch transactions")
  }
  const data = (await responseData.json()) as TricountDataResponse

  const registry = data.Response[0]?.Registry
  if (!registry) {
    throw new Error("Failed to fetch tricount registry data: no registry found")
  }

  return {
    key: tricountKey,
    name: registry.title,
    entries: registry.all_registry_entry,
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export const listAccounts = async (): Promise<Array<Account>> => {
  return (
    env.TRICOUNT_KEYS?.split(",")
      .map((k) => {
        const [key, name] = k.split(":")
        if (!key || !name) {
          return null
        }
        return {
          fetcher: "tricount" as const,
          institutionName: "Tricount",
          institutionLogo:
            "https://play-lh.googleusercontent.com/O284MSRmvHs4jfH4hqbn2771WJxkZptZm9qVVUW1GMSO2B9pj3yJTClYrOw72WDRuDQ=w480-h960",
          id: key,
          name: `${name}${env.TRICOUNT_FILTERED_USER_NAME ? ` (${env.TRICOUNT_FILTERED_USER_NAME})` : ""}`,
        }
      })
      .filter((account) => account !== null) ?? []
  )
}

export const isActive = () => !!env.TRICOUNT_KEYS

export const fetchTransactions = async (accountId: Account["id"]): Promise<Array<Transaction>> => {
  const [data, pm, mapping, defaultCategory] = await Promise.all([
    getTricountRegistryData(accountId),
    resolvePaymentMethod("tricount"),
    getMapping(),
    getDefaultCategory(),
  ])

  if (!pm) {
    throw new Error("Tricount payment method not found")
  }

  const now = new Date()
  const filteredUserName = env.TRICOUNT_FILTERED_USER_NAME
  return data.entries
    .filter((entry) => {
      if (!filteredUserName) {
        return true
      }
      const allocation = entry.RegistryEntry.allocations.find(
        (alloc) =>
          alloc.membership.RegistryMembershipNonUser.alias.pointer.name === filteredUserName,
      )
      if (!allocation) {
        return false
      }
      return Number.parseFloat(allocation.amount.value) < 0
    })
    .filter((entry) => {
      if (!filteredUserName) {
        return true
      }
      return (
        entry.RegistryEntry.membership_owned.RegistryMembershipNonUser.alias.pointer.name !==
        filteredUserName
      )
    })
    .filter((entry) => {
      const date = new Date(entry.RegistryEntry.date)
      return isCurrentOrPreviousMonth(date, now)
    })
    .map((entry) => {
      const originalDate = new Date(entry.RegistryEntry.date)
      const date = getFormattedDate(originalDate)
      const isoDate = formatIsoDate(originalDate)
      const monthId = getMonthIdFromDate(originalDate)
      const numericAmount = Number.parseFloat(entry.RegistryEntry.amount.value) * -1
      const amount = numericAmount.toFixed(2).replace(".", ",")
      const amountCents = eurosToCents(numericAmount)

      const sourceName = entry.RegistryEntry.description
      let name = sourceName
      let category = defaultCategory.label
      let categorySlug = defaultCategory.slug
      const mapped = findInMapping(mapping, sourceName, amountCents / 100)
      if (mapped) {
        name = mapped.name
        category = mapped.category
        categorySlug = mapped.categorySlug
      } else {
        name = name.trim()
      }

      // Derive sharePercent from Tricount allocations when available
      let tricountAllocationShare: number | null = null
      const totalAbs = Math.abs(Number.parseFloat(entry.RegistryEntry.amount.value))
      if (filteredUserName && totalAbs > 0) {
        const userAlloc = entry.RegistryEntry.allocations.find(
          (alloc) =>
            alloc.membership.RegistryMembershipNonUser.alias.pointer.name === filteredUserName,
        )
        if (userAlloc) {
          const userAbs = Math.abs(Number.parseFloat(userAlloc.amount.value))
          tricountAllocationShare = Math.min(
            100,
            Math.max(0, Math.round((userAbs / totalAbs) * 100)),
          )
        }
      }

      const sharePercent =
        mapped?.defaultSharePercent ?? tricountAllocationShare ?? pm.defaultSharePercent

      return {
        amount,
        amountCents,
        sharePercent,
        category,
        categorySlug,
        name,
        originalDate,
        date,
        isoDate,
        monthId,
        paymentMethod: pm.label,
        paymentMethodId: pm.id,
        sourceName,
        excluded: mapped?.exclude ?? false,
        externalId: `tricount:${entry.RegistryEntry.uuid}`,
        raw: JSON.stringify(entry, null, 2),
      } satisfies Transaction
    })
    .filter(Boolean)
    .toSorted((a, b) => b.originalDate.getTime() - a.originalDate.getTime())
}
