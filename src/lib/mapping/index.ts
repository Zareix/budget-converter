import type { Transaction } from '@/lib/parsers'
import type { Split } from '@/lib/utils'
import { Categories } from '@/lib/parsers'

type Mapping = {
  mode: 'default' | 'exact-name' | 'exact-name-price'
  fromName: string
  toName: string
  toCategory: Lowercase<
    Split<Split<Transaction['category'], ' '>[1], '/'>[number]
  >
  fromPrice?: string
  exclude?: boolean
}

export const getMapping = async () => {
  return (await Bun.YAML.parse(
    await Bun.file(process.env.MAPPING_FILE ?? './mapping/mapping.yaml').text(),
  )) as Array<Mapping>
}

export const findInMapping = (
  mapping: Awaited<ReturnType<typeof getMapping>>,
  name: string,
  price: string,
) => {
  const lowerName = name.toLowerCase()
  const mapped = mapping.find((m) => {
    switch (m.mode) {
      case 'default':
        return lowerName.includes(m.fromName.toLowerCase())
      case 'exact-name':
        return name === m.fromName
      case 'exact-name-price':
        return name === m.fromName && price === m.fromPrice
      default:
        return false
    }
  })
  return mapped
    ? {
        exclude: mapped.exclude ?? false,
        name: mapped.toName,
        category:
          Categories.find((c) => c.toLowerCase().includes(mapped.toCategory)) ??
          '💬 Autres',
      }
    : null
}
