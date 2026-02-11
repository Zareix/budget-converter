import { createServerFn } from '@tanstack/react-start'
import * as v from 'valibot'
import type { Transaction } from '@/lib/parsers'
import { PROVIDERS } from '@/lib/parsers'

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
    const providerParser = await import(`../parsers/${provider}`)
    return (await providerParser.parseToTransactions({
      fileContent,
    })) as Array<Transaction>
  })
