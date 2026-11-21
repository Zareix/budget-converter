import { createServerFn } from "@tanstack/react-start"
import * as v from "valibot"

import { ASSET_CLASSES, INVESTMENT_TX_TYPES, PRICING_MODES } from "@/lib/db/schema"
import * as investments from "@/lib/investments"
import { searchYahooSecurities } from "@/lib/market/yahoo"

const isoDateSchema = v.pipe(v.string(), v.regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"))

export const getInvestmentsOverview = createServerFn().handler(investments.getInvestmentsOverview)

export const searchMarketSecurities = createServerFn()
  .validator(v.object({ query: v.string() }))
  .handler(({ data }) => searchYahooSecurities(data.query))

export const upsertSecurity = createServerFn({ method: "POST" })
  .validator(
    v.object({
      symbol: v.pipe(v.string(), v.minLength(1, "Symbol is required")),
      isin: v.optional(v.nullable(v.string())),
      name: v.pipe(v.string(), v.minLength(1, "Name is required")),
      assetClass: v.picklist(ASSET_CLASSES),
      currency: v.pipe(v.string(), v.minLength(3), v.maxLength(6)),
      pricingMode: v.picklist(PRICING_MODES),
      manualPriceCents: v.optional(v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0)))),
    }),
  )
  .handler(({ data }) => investments.upsertSecurity(data))

export const updateSecurityManualPrice = createServerFn({ method: "POST" })
  .validator(
    v.object({
      securityId: v.pipe(v.number(), v.integer()),
      manualPriceCents: v.pipe(v.number(), v.integer(), v.minValue(0)),
    }),
  )
  .handler(({ data }) => investments.updateSecurityManualPrice(data))

export const addInvestmentTransaction = createServerFn({ method: "POST" })
  .validator(
    v.object({
      accountId: v.pipe(v.number(), v.integer()),
      securityId: v.pipe(v.number(), v.integer()),
      type: v.picklist(INVESTMENT_TX_TYPES),
      date: isoDateSchema,
      quantity: v.pipe(v.number(), v.minValue(0)),
      unitPriceCents: v.pipe(v.number(), v.integer(), v.minValue(0)),
      feesCents: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
      totalEurCents: v.pipe(v.number(), v.integer(), v.minValue(0)),
      note: v.optional(v.nullable(v.string())),
    }),
  )
  .handler(({ data }) => investments.addInvestmentTransaction(data))

export const updateInvestmentTransaction = createServerFn({ method: "POST" })
  .validator(
    v.object({
      id: v.pipe(v.number(), v.integer()),
      accountId: v.optional(v.pipe(v.number(), v.integer())),
      securityId: v.optional(v.pipe(v.number(), v.integer())),
      type: v.optional(v.picklist(INVESTMENT_TX_TYPES)),
      date: v.optional(isoDateSchema),
      quantity: v.optional(v.pipe(v.number(), v.minValue(0))),
      unitPriceCents: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
      feesCents: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
      totalEurCents: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
      note: v.optional(v.nullable(v.string())),
    }),
  )
  .handler(({ data }) => investments.updateInvestmentTransaction(data))

export const deleteInvestmentTransaction = createServerFn({ method: "POST" })
  .validator(v.object({ id: v.pipe(v.number(), v.integer()) }))
  .handler(({ data }) => investments.deleteInvestmentTransaction(data.id))

export const refreshAllInvestmentQuotes = createServerFn({ method: "POST" })
  .validator(
    v.optional(
      v.object({
        force: v.optional(v.boolean()),
        includeHistory: v.optional(v.boolean()),
      }),
    ),
  )
  .handler(({ data }) => investments.refreshAllInvestmentQuotes(data))
