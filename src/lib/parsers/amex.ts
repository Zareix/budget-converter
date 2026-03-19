import { parse } from 'csv-parse/sync'
import type { Category, Transaction } from '.'
import { findInMapping, getMapping } from '@/lib/mapping'

type AmexInput = {
  Date: string
  Description: string
  Montant: string
  Détails: string
  'Apparait sur votre relevé de compte sous': string
  Adresse: string
  Ville: string
  'Code postal': string
  Pays: string
  Référence: string
}

export const parseToTransactions = async ({
  fileContent,
}: {
  fileContent?: string
}): Promise<Array<Transaction>> => {
  if (!fileContent) {
    throw new Error('No file content provided')
  }

  const mapping = await getMapping()

  return parse<AmexInput>(fileContent, {
    columns: true,
    skip_empty_lines: true,
  })
    .map((record) => {
      const date = new Date(record.Date)
      const formattedDate: `${number}/${number}` = `${date.getDate()}/${
        date.getMonth() + 1
      }`

      let name: string | Array<string> = record.Description
      let category: Category = '💬 Autres'
      const mapped = findInMapping(
        mapping,
        name,
        Number.parseFloat(record.Montant.replace(',', '.')),
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
        amount: record.Montant,
        paymentMethod: 'Carte AMEX',
        name,
        category,
      } satisfies Transaction
    })
    .filter(Boolean)
    .toSorted((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
}
