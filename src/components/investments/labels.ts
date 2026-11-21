import type { AssetClass, InvestmentTxType } from "@/lib/db/schema"
import { m } from "@/paraglide/messages"

export const ASSET_CLASS_COLORS: Record<AssetClass, string> = {
  etf: "#10b981",
  stock: "#3b82f6",
  bond: "#6366f1",
  scpi: "#f59e0b",
  euro_fund: "#14b8a6",
  crypto: "#ec4899",
  other: "#64748b",
}

export const getAssetClassLabel = (assetClass: AssetClass): string => {
  switch (assetClass) {
    case "etf":
      return m.asset_class_etf()
    case "stock":
      return m.asset_class_stock()
    case "bond":
      return m.asset_class_bond()
    case "scpi":
      return m.asset_class_scpi()
    case "euro_fund":
      return m.asset_class_euro_fund()
    case "crypto":
      return m.asset_class_crypto()
    case "other":
      return m.asset_class_other()
  }
}

export const getInvestmentTxTypeLabel = (type: InvestmentTxType): string => {
  switch (type) {
    case "buy":
      return m.inv_tx_type_buy()
    case "sell":
      return m.inv_tx_type_sell()
    case "dividend":
      return m.inv_tx_type_dividend()
  }
}

export const formatQuantity = (qty: number): string => {
  if (Number.isInteger(qty)) return String(qty)
  return qty.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  })
}

export const formatNativePrice = (price: number, currency: string): string => {
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  } catch {
    return `${price.toFixed(2)} ${currency}`
  }
}
