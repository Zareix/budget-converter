export type Transaction = {
  date: `${number}/${number}` // in format DD/MM
  isoDate: string // YYYY-MM-DD
  monthId: string // YYYY-MM
  originalDate: Date
  name: string
  amount: string // with a comma as decimal separator (for CSV)
  amountCents: number // positive = expense, negative = refund
  sharePercent: number // 0..100
  category: string // category label (for display & CSV)
  categorySlug: string // canonical category slug
  paymentMethod: string // payment method label
  paymentMethodId: number | null
  sourceName: string
  excluded?: boolean
  externalId: string
  raw: string
}

export const PROVIDERS = ["amex", "revolut"] as const
export type Provider = (typeof PROVIDERS)[number]
