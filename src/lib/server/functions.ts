import { createServerFn } from '@tanstack/react-start'
import * as v from 'valibot'
import { PROVIDERS } from '@/lib/parsers'
import * as amexParser from '@/lib/parsers/amex'
import * as revolutParser from '@/lib/parsers/revolut'
import * as mapping from '@/lib/mapping'

export const parseFileWithProvider = createServerFn({
  method: 'POST',
})
  .inputValidator(
    v.object({
      fileContent: v.string(),
      provider: v.picklist(PROVIDERS),
    }),
  )
  .handler(async ({ data: { fileContent, provider } }) => {
    switch (provider) {
      case 'amex':
        return await amexParser.parseToTransactions({
          fileContent,
        })
      case 'revolut':
        return await revolutParser.parseToTransactions({
          fileContent,
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
        fromPrice: v.string(
          'From price is required for exact name + price mode',
        ),
        exclude: v.optional(v.boolean()),
      }),
    ]),
  )
  .handler(({ data }) => {
    return mapping.addMapping(data as Parameters<typeof mapping.addMapping>[0])
  })

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
          fromPrice: v.string(
            'From price is required for exact name + price mode',
          ),
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
          fromPrice: v.string(
            'From price is required for exact name + price mode',
          ),
          exclude: v.optional(v.boolean()),
        }),
      ]),
    }),
  )
  .handler(({ data }) => {
    return mapping.editMapping(
      data as Parameters<typeof mapping.editMapping>[0],
    )
  })

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
