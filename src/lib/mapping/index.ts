import { join } from 'node:path'
import type { Mapping } from '@/lib/mapping/constant'
import { Categories } from '@/lib/parsers'
import { env } from '@/env'

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

const getMappingFileName = () => join(env.APP_DIR, 'mapping.yaml')

const saveMappings = async (mappings: Array<Mapping>) => {
  await Bun.write(
    getMappingFileName(),
    Bun.YAML.stringify(
      {
        mappings: mappings.toSorted(compareMapping).map((m) => ({
          mode: m.mode,
          fromName: m.fromName,
          fromPrice: m.fromPrice,
          toName: m.toName,
          toCategory: m.toCategory,
          exclude: m.exclude,
        })),
      },
      null,
      2,
    ),
  )
}

export const getMapping = async () =>
  (
    (await Bun.YAML.parse(await Bun.file(getMappingFileName()).text())) as {
      mappings: Array<Mapping>
    }
  ).mappings

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
  const currentMapping = await getMapping()
  currentMapping.push(mapping)
  currentMapping.sort(compareMapping)
  await saveMappings(currentMapping)
}

export const editMapping = async ({
  previous,
  new: newMapping,
}: {
  previous: Mapping
  new: Mapping
}) => {
  const currentMappings = await getMapping()
  const newMappings = currentMappings
    .filter(
      (m) =>
        !(
          m.mode === previous.mode &&
          m.fromName === previous.fromName &&
          m.fromPrice === previous.fromPrice &&
          m.toName === previous.toName &&
          m.toCategory === previous.toCategory &&
          m.exclude === previous.exclude
        ),
    )
    .concat(newMapping)
    .toSorted(compareMapping)
  await saveMappings(newMappings)
}

export const deleteMapping = async ({
  fromName,
  mode,
}: Pick<Mapping, 'fromName' | 'mode'>) => {
  const currentMappings = await getMapping()
  const newMappings = currentMappings
    .filter((m) => !(m.fromName === fromName && m.mode === mode))
    .toSorted(compareMapping)
  await saveMappings(newMappings)
}
