import { eq } from 'drizzle-orm'
import type { Mapping } from '@/lib/mapping/constant'
import { db } from '@/lib/db'
import { mappings } from '@/lib/db/schema'
import { Categories } from '@/lib/parsers'

const MODE_ORDER: Array<Mapping['mode']> = [
  'exact-name-price',
  'exact-name',
  'default',
]

const compareMapping = (a: Mapping, b: Mapping) => {
  if (a.mode === b.mode) {
    return a.fromName.localeCompare(b.fromName)
  }
  return MODE_ORDER.indexOf(a.mode) - MODE_ORDER.indexOf(b.mode)
}

export const getMapping = async (): Promise<Array<Mapping>> => {
  const rows = await db.select().from(mappings)
  return rows
    .map(
      (row): Mapping => ({
        id: row.id,
        mode: row.mode,
        fromName: row.fromName,
        toName: row.toName,
        toCategory: row.toCategory,
        ...(row.fromPrice !== null && { fromPrice: row.fromPrice }),
        ...(row.exclude && { exclude: row.exclude }),
      }),
    )
    .toSorted(compareMapping)
}

export const findInMapping = (
  mapping: Awaited<ReturnType<typeof getMapping>>,
  name: string,
  price: number,
) => {
  const mapped = mapping.find((m) => {
    switch (m.mode) {
      case 'default':
        return name.toLowerCase().includes(m.fromName.toLowerCase())
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

export const addMapping = async (mapping: Mapping) => {
  await db.insert(mappings).values({
    mode: mapping.mode,
    fromName: mapping.fromName,
    toName: mapping.toName,
    toCategory: mapping.toCategory,
    fromPrice: mapping.fromPrice ?? null,
    exclude: mapping.exclude ?? false,
  })
}

export const editMapping = async ({
  id,
  new: newMapping,
}: {
  id: number
  new: Mapping
}) => {
  await db
    .update(mappings)
    .set({
      mode: newMapping.mode,
      fromName: newMapping.fromName,
      toName: newMapping.toName,
      toCategory: newMapping.toCategory,
      fromPrice: newMapping.fromPrice ?? null,
      exclude: newMapping.exclude ?? false,
    })
    .where(eq(mappings.id, id))
}

export const deleteMapping = async ({ id }: { id: number }) => {
  await db.delete(mappings).where(eq(mappings.id, id))
}

export const bulkAddMappings = async (items: Array<Mapping>) => {
  if (items.length === 0) return
  await db.insert(mappings).values(
    items.map((m) => ({
      mode: m.mode,
      fromName: m.fromName,
      toName: m.toName,
      toCategory: m.toCategory,
      fromPrice: m.fromPrice ?? null,
      exclude: m.exclude ?? false,
    })),
  )
}
