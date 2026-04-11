import { createServerFn } from '@tanstack/react-start'
import * as v from 'valibot'
import { LogOut } from 'lucide-react'
import type { Fetcher } from '@/lib/fetcher'
import { PROVIDERS } from '@/lib/parsers'
import * as lunchflow from '@/lib/fetcher/lunchflow'
import * as tricount from '@/lib/fetcher/tricount'
import * as enableBanking from '@/lib/fetcher/enable-banking'
import * as amexParser from '@/lib/parsers/amex'
import * as revolutParser from '@/lib/parsers/revolut'
import * as mapping from '@/lib/mapping'
import { FETCHERS } from '@/lib/fetcher'

export const getActiveFetchers = createServerFn().handler(() => {
  const activeFetchers: Array<Fetcher> = []
  if (lunchflow.isActive()) {
    activeFetchers.push('lunchflow')
  }
  if (tricount.isActive()) {
    activeFetchers.push('tricount')
  }
  return activeFetchers
})

export const listAccounts = createServerFn().handler(async () => {
  const accounts = await Promise.all([
    lunchflow.listAccounts(),
    tricount.listAccounts(),
    enableBanking.listAccounts(),
  ])
  return accounts.flat()
})

export const fetchTransactions = createServerFn({
  method: 'POST',
})
  .inputValidator(
    v.variant('mode', [
      v.object({
        mode: v.literal('parser'),
        fileContent: v.string(),
        provider: v.picklist(PROVIDERS),
      }),
      v.object({
        mode: v.literal('fetcher'),
        accounts: v.array(
          v.object({
            id: v.string(),
            fetcher: v.picklist(FETCHERS),
          }),
        ),
      }),
    ]),
  )
  .handler(async ({ data }) => {
    try {
      if (data.mode === 'fetcher') {
        return (
          await Promise.all(
            data.accounts.map(async (account) => {
              switch (account.fetcher) {
                case 'tricount':
                  return tricount.fetchTransactions(account.id)
                case 'lunchflow':
                  return lunchflow.fetchTransactions(account.id)
                case 'enable-banking':
                  return enableBanking.fetchTransactions(account.id)
              }
            }),
          )
        ).flat()
      }
      switch (data.provider) {
        case 'amex':
          return await amexParser.parseToTransactions({
            fileContent: data.fileContent,
          })
        case 'revolut':
          return await revolutParser.parseToTransactions({
            fileContent: data.fileContent,
          })
        default:
          throw new Error('Unsupported provider')
      }
    } catch (error) {
      console.log('Error in fetchTransactions:', error)
      throw new Error('An error occurred while processing the request')
    }
  })

export const getMapping = createServerFn().handler(mapping.getMapping)

export const addMapping = createServerFn({
  method: 'POST',
})
  .inputValidator(
    v.variant('mode', [
      v.object({
        mode: v.picklist(['default', 'exact-name']),
        fromName: v.string('From name is required'),
        toName: v.string('To name is required'),
        toCategory: v.string('Category is required'),
        exclude: v.optional(v.boolean()),
      }),
      v.object({
        mode: v.literal('exact-name-price'),
        fromName: v.string('From name is required'),
        toName: v.string('To name is required'),
        toCategory: v.string('Category is required'),
        fromPrice: v.number(),
        exclude: v.optional(v.boolean()),
      }),
    ]),
  )
  .handler(({ data }) => mapping.addMapping(data))

export const editMapping = createServerFn({
  method: 'POST',
})
  .inputValidator(
    v.object({
      previous: v.variant('mode', [
        v.object({
          mode: v.picklist(['default', 'exact-name']),
          fromName: v.string('From name is required'),
          toName: v.string('To name is required'),
          toCategory: v.string('Category is required'),
          exclude: v.optional(v.boolean()),
        }),
        v.object({
          mode: v.literal('exact-name-price'),
          fromName: v.string('From name is required'),
          toName: v.string('To name is required'),
          toCategory: v.string('Category is required'),
          fromPrice: v.number(),
          exclude: v.optional(v.boolean()),
        }),
      ]),
      new: v.variant('mode', [
        v.object({
          mode: v.picklist(['default', 'exact-name']),
          fromName: v.string('From name is required'),
          toName: v.string('To name is required'),
          toCategory: v.string('Category is required'),
          exclude: v.optional(v.boolean()),
        }),
        v.object({
          mode: v.literal('exact-name-price'),
          fromName: v.string('From name is required'),
          toName: v.string('To name is required'),
          toCategory: v.string('Category is required'),
          fromPrice: v.number(),
          exclude: v.optional(v.boolean()),
        }),
      ]),
    }),
  )
  .handler(({ data }) => mapping.editMapping(data))

export const deleteMapping = createServerFn({
  method: 'POST',
})
  .inputValidator(
    v.object({
      mode: v.picklist(['default', 'exact-name', 'exact-name-price']),
      fromName: v.string('From name is required'),
    }),
  )
  .handler(({ data }) => mapping.deleteMapping(data))

export const ebGetRedirectUrl = createServerFn()
  .inputValidator(
    v.object({
      name: v.string(),
      country: v.string(),
      logo: v.string(),
      maximumConsentValidity: v.number(),
    }),
  )
  .handler(({ data }) => enableBanking.getRedirectUrl(data))

export const ebListBanks = createServerFn().handler(enableBanking.getBanks)
