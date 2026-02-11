import type { Mapping } from '@/lib/mapping/constant'
import { Categories } from '@/lib/parsers'

const compareMapping = (a: Mapping, b: Mapping) => {
  if (a.mode === b.mode) {
    return a.fromName.localeCompare(b.fromName)
  }
  return a.mode.localeCompare(b.mode)
}

const getMappingFileName = () =>
  process.env.MAPPING_FILE ?? './mapping/mapping.yaml'

export const getMapping = async () => {
  return (await Bun.YAML.parse(
    await Bun.file(getMappingFileName()).text(),
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

export const addMapping = async (mapping: Mapping) => {
  const currentMapping = await getMapping()
  currentMapping.push(mapping)
  currentMapping.sort(compareMapping)
  await Bun.write(getMappingFileName(), Bun.YAML.stringify(currentMapping))
}

export const deleteMapping = async ({
  fromName,
  mode,
}: Pick<Mapping, 'fromName' | 'mode'>) => {
  const currentMapping = await getMapping()
  const newMapping = currentMapping
    .filter((m) => !(m.fromName === fromName && m.mode === mode))
    .toSorted(compareMapping)
  await Bun.write(getMappingFileName(), Bun.YAML.stringify(newMapping))
}
