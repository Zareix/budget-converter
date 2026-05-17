import { createServerFn } from '@tanstack/react-start'
import * as v from 'valibot'
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
      id: v.number(),
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
  .inputValidator(v.object({ id: v.number() }))
  .handler(({ data }) => mapping.deleteMapping(data))

export const importMappingsFromYaml = createServerFn({ method: 'POST' })
  .inputValidator(v.object({ yaml: v.string() }))
  .handler(async ({ data }) => {
    const parsed = Bun.YAML.parse(data.yaml) as { mappings?: Array<unknown> }
    if (!Array.isArray(parsed.mappings)) {
      throw new Error('Invalid YAML: expected a top-level "mappings" array')
    }
    const mappingSchema = v.variant('mode', [
      v.object({
        mode: v.picklist(['default', 'exact-name']),
        fromName: v.string(),
        toName: v.string(),
        toCategory: v.string(),
        fromPrice: v.optional(v.number()),
        exclude: v.optional(v.boolean()),
      }),
      v.object({
        mode: v.literal('exact-name-price'),
        fromName: v.string(),
        toName: v.string(),
        toCategory: v.string(),
        fromPrice: v.number(),
        exclude: v.optional(v.boolean()),
      }),
    ])
    const valid = v.parse(v.array(mappingSchema), parsed.mappings)
    await mapping.bulkAddMappings(valid)
    return { imported: valid.length }
  })

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

export const importEbAccountsFromJson = createServerFn({ method: 'POST' })
  .inputValidator(v.object({ json: v.string() }))
  .handler(async ({ data }) => {
    const parsed = JSON.parse(data.json) as { accounts?: Array<unknown> }
    if (!Array.isArray(parsed.accounts)) {
      throw new Error('Invalid JSON: expected a top-level "accounts" array')
    }
    const accountSchema = v.object({
      id: v.string(),
      name: v.string(),
      institutionName: v.string(),
      institutionLogo: v.optional(v.nullable(v.string())),
      validUntil: v.string(),
    })
    const valid = v.parse(v.array(accountSchema), parsed.accounts)
    await enableBanking.bulkAddAccounts(valid)
    return { imported: valid.length }
  })
