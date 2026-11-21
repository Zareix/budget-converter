import { describe, expect, test } from "bun:test"

import { cleanFortuneoLabelForSearch, decodeFortuneoBytes, parseFortuneoCsv } from "./fortuneo"

const SAMPLE_FORTUNEO_CSV = `libellé;Opération;Place;Date;Qté;Prix d'éxé;Montant brut;Courtage/Prélèvement;Montant net;Devise;
BNP PARIBAS EASY S&P 500 UCITS ETF - C EUR ACC;Achat Comptant;Euronext Paris;02/11/2026;2.0;34.5629;-69.13;0.0;-69.13;EUR;
BNP PARIBAS EASY S&P 500 UCITS ETF - C EUR ACC;Achat Comptant;Euronext Paris;24/03/2026;17.0;28.6801;-487.56;-1.71;-489.27;EUR;
Amundi PEA Nasdaq-100 UCITS ETF - EUR ACC;Vente Comptant;Euronext Paris;14/08/2025;3.0;81.86;245.58;-0.5;245.08;EUR;
Virement interne;Virement;Paris;01/05/2025;0;0;500.0;0;500.0;EUR;
`

describe("parseFortuneoCsv", () => {
  test("parses buys, sells, fees, dates, and skips non-security operations", () => {
    const { rows, skippedCount } = parseFortuneoCsv(SAMPLE_FORTUNEO_CSV)

    expect(skippedCount).toBe(1)
    expect(rows).toHaveLength(3)

    expect(rows[0]).toEqual({
      label: "BNP PARIBAS EASY S&P 500 UCITS ETF - C EUR ACC",
      operation: "Achat Comptant",
      type: "buy",
      place: "Euronext Paris",
      date: "2026-11-02",
      quantity: 2,
      unitPriceCents: 3456,
      feesCents: 0,
      totalEurCents: 6913,
      currency: "EUR",
    })

    expect(rows[1]).toMatchObject({
      type: "buy",
      date: "2026-03-24",
      quantity: 17,
      unitPriceCents: 2868,
      feesCents: 171,
      totalEurCents: 48927,
    })

    expect(rows[2]).toMatchObject({
      label: "Amundi PEA Nasdaq-100 UCITS ETF - EUR ACC",
      type: "sell",
      date: "2025-08-14",
      quantity: 3,
      unitPriceCents: 8186,
      feesCents: 50,
      totalEurCents: 24508,
    })
  })

  test("decodes ISO-8859-1 / Windows-1252 Fortuneo bytes cleanly", () => {
    // "libellé;Opération;Qté" in ISO-8859-1 (0xe9 = é)
    const latin1 = new Uint8Array([
      0x6c, 0x69, 0x62, 0x65, 0x6c, 0x6c, 0xe9, 0x3b, 0x4f, 0x70, 0xe9, 0x72, 0x61, 0x74, 0x69,
      0x6f, 0x6e, 0x3b, 0x51, 0x74, 0xe9,
    ])
    expect(decodeFortuneoBytes(latin1)).toBe("libellé;Opération;Qté")
  })
})

describe("cleanFortuneoLabelForSearch", () => {
  test("strips UCITS ETF and share class suffixes for Yahoo search", () => {
    expect(cleanFortuneoLabelForSearch("BNP PARIBAS EASY S&P 500 UCITS ETF - C EUR ACC")[0]).toBe(
      "BNP PARIBAS EASY S&P 500",
    )
    expect(cleanFortuneoLabelForSearch("Amundi PEA Nasdaq-100 UCITS ETF - EUR ACC")[0]).toBe(
      "Amundi PEA Nasdaq-100",
    )
  })
})
