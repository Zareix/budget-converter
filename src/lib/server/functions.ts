import { createServerFn } from '@tanstack/react-start'
import * as v from 'valibot'
import type { Fetcher } from '@/lib/fetcher'
import { PROVIDERS } from '@/lib/parsers'
import * as lunchflow from '@/lib/fetcher/lunchflow'
import * as amexParser from '@/lib/parsers/amex'
import * as revolutParser from '@/lib/parsers/revolut'
import * as mapping from '@/lib/mapping'
import { FETCHERS } from '@/lib/fetcher'

export const getActiveFetchers = createServerFn().handler(() => {
  const activeFetchers: Array<Fetcher> = []
  if (lunchflow.isActive()) {
    activeFetchers.push('lunchflow')
  }
  return activeFetchers
})

export const listAccounts = createServerFn().handler(lunchflow.listAccounts)

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
        fetcher: v.picklist(FETCHERS),
        accountIds: v.array(v.number()),
      }),
    ]),
  )
  .handler(async ({ data }) => {
    if (data.mode === 'fetcher') {
      return await lunchflow.fetchTransactions(data)
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
