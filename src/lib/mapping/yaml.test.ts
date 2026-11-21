import { describe, expect, test } from "bun:test"

import type { Mapping } from "./constant"
import { serializeMappingsToYaml } from "./yaml"

describe("serializeMappingsToYaml", () => {
  test("round-trips through Bun.YAML.parse including special characters and optional fields", () => {
    const items: Array<Mapping> = [
      {
        mode: "default",
        fromName: "AMZN Mktp",
        toName: "Amazon",
        toCategory: "shopping",
      },
      {
        mode: "exact-name",
        fromName: "Paypal *euiv: #test",
        toName: 'Café "L\'Ernest"',
        toCategory: "bar/café",
        exclude: true,
        defaultSharePercent: 50,
      },
      {
        mode: "exact-name-price",
        fromName: "1234",
        toName: "true",
        toCategory: "courses",
        fromPrice: 19.99,
        defaultSharePercent: 0,
      },
    ]

    const yaml = serializeMappingsToYaml(items)
    const parsed = Bun.YAML.parse(yaml) as { mappings: Array<Mapping> }
    expect(parsed.mappings).toEqual(items)
  })

  test("handles empty array", () => {
    const yaml = serializeMappingsToYaml([])
    const parsed = Bun.YAML.parse(yaml) as { mappings: Array<Mapping> }
    expect(parsed.mappings).toEqual([])
  })
})
