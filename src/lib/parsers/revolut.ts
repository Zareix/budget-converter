import { parse } from 'csv-parse/sync'
import type { Category, Transaction } from '.'
import { findInMapping, getMapping } from '@/lib/mapping'

type RevolutInput = {
  Type: 'Virement' | 'Paiement par carte' | 'Recharge'
  Produit: string
  'Date de début': string
  'Date de fin': string
  Description: string
  Montant: string
  Frais: string
  Devise: string
  État: string
  Solde: string
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

  return parse<RevolutInput>(fileContent, {
    columns: true,
    skip_empty_lines: true,
  })
    .filter((record) => record.Type === 'Paiement par carte')
    .map((record) => {
      const date = new Date(record['Date de début'])
      const formattedDate: `${number}/${number}` = `${date.getDate()}/${
        date.getMonth() + 1
      }`
      const amount = (Number.parseFloat(record.Montant) * -1)
        .toFixed(2)
        .replace('.', ',')

      let name: string | Array<string> = record.Description
      let category: Category = '💬 Autres'
      const mapped = findInMapping(mapping, name, amount)
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
        name,
        amount,
        payementMethod: 'Carte Revolut',
        category,
      } satisfies Transaction
    })
    .filter(Boolean)
    .toSorted((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
}
