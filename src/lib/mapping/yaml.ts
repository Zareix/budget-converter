import type { Mapping } from "@/lib/mapping/constant"

const quoteYamlString = (value: string): string => {
  // Always double-quote strings that could be ambiguous in YAML (special chars, leading/trailing spaces, booleans/numbers)
  if (
    value === "" ||
    value.trim() !== value ||
    /^(true|false|null|yes|no|on|off|~|-?\d+(\.\d+)?)$/i.test(value) ||
    /[:#[\]{},&*!?|>'"%@`\n\r\t]/.test(value)
  ) {
    return JSON.stringify(value)
  }
  return value
}

export const serializeMappingsToYaml = (items: ReadonlyArray<Mapping>): string => {
  if (items.length === 0) {
    return "mappings: []\n"
  }

  const lines: Array<string> = ["mappings:"]
  for (const item of items) {
    lines.push(`  - mode: ${item.mode}`)
    lines.push(`    fromName: ${quoteYamlString(item.fromName)}`)
    lines.push(`    toName: ${quoteYamlString(item.toName)}`)
    lines.push(`    toCategory: ${quoteYamlString(item.toCategory)}`)
    if (item.fromPrice !== undefined) {
      lines.push(`    fromPrice: ${item.fromPrice}`)
    }
    if (item.exclude) {
      lines.push(`    exclude: true`)
    }
    if (item.defaultSharePercent !== undefined && item.defaultSharePercent !== null) {
      lines.push(`    defaultSharePercent: ${item.defaultSharePercent}`)
    }
  }

  return `${lines.join("\n")}\n`
}
