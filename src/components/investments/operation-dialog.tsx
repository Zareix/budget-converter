import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { getAssetClassLabel, getInvestmentTxTypeLabel } from "@/components/investments/labels"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { AssetAccountLike } from "@/lib/assets/calculations"
import { formatCentsPlain, parseAmountToCents } from "@/lib/budget/calculations"
import type { AssetClass, InvestmentTxType } from "@/lib/db/schema"
import { ASSET_CLASSES, INVESTMENT_TX_TYPES } from "@/lib/db/schema"
import type { InvestmentTransactionLike, SecurityLike } from "@/lib/investments/calculations"
import type { YahooSearchResult } from "@/lib/market/yahoo"
import {
  addInvestmentTransaction,
  searchMarketSecurities,
  updateInvestmentTransaction,
  upsertSecurity,
} from "@/lib/server/investments"
import { m } from "@/paraglide/messages"

type SecurityMode = "existing" | "search" | "manual"

type OperationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  accounts: Array<AssetAccountLike>
  securities: Array<SecurityLike>
  defaultAccountId?: number | null
  defaultSecurityId?: number | null
  editingTx?: InvestmentTransactionLike | null
}

const toManualSymbol = (name: string) => {
  const slug = name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return `MANUAL:${slug || "asset"}`
}

const getTodayIso = () => new Date().toISOString().slice(0, 10)

const parseQuantity = (raw: string): number => {
  const normalized = raw.trim().replace(/\s+/g, "").replace(",", ".")
  if (!normalized) return 0
  const parsed = Number.parseFloat(normalized)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

export const OperationDialog = ({
  open,
  onOpenChange,
  accounts,
  securities,
  defaultAccountId,
  defaultSecurityId,
  editingTx,
}: OperationDialogProps) => {
  const queryClient = useQueryClient()

  const [mode, setMode] = useState<SecurityMode>("search")
  const [accountId, setAccountId] = useState<string>("")
  const [securityId, setSecurityId] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [selectedYahoo, setSelectedYahoo] = useState<YahooSearchResult | null>(null)

  const [manualName, setManualName] = useState("")
  const [manualAssetClass, setManualAssetClass] = useState<AssetClass>("euro_fund")
  const [manualIsin, setManualIsin] = useState("")

  const [txType, setTxType] = useState<InvestmentTxType>("buy")
  const [date, setDate] = useState(getTodayIso)
  const [quantity, setQuantity] = useState("1")
  const [unitPrice, setUnitPrice] = useState("")
  const [fees, setFees] = useState("")
  const [totalEur, setTotalEur] = useState("")
  const [totalManuallyEdited, setTotalManuallyEdited] = useState(false)
  const [note, setNote] = useState("")

  useEffect(() => {
    if (!open) return
    if (editingTx) {
      setMode("existing")
      setAccountId(String(editingTx.accountId))
      setSecurityId(String(editingTx.securityId))
      setTxType(editingTx.type)
      setDate(editingTx.date)
      setQuantity(String(editingTx.quantity))
      setUnitPrice(formatCentsPlain(editingTx.unitPriceCents))
      setFees(editingTx.feesCents > 0 ? formatCentsPlain(editingTx.feesCents) : "")
      setTotalEur(formatCentsPlain(editingTx.totalEurCents))
      setTotalManuallyEdited(true)
      setNote(editingTx.note ?? "")
      setSelectedYahoo(null)
      setSearchQuery("")
      return
    }

    const initialAcc = defaultAccountId ?? accounts[0]?.id
    setAccountId(initialAcc ? String(initialAcc) : "")
    if (defaultSecurityId) {
      setMode("existing")
      setSecurityId(String(defaultSecurityId))
    } else if (securities.length > 0) {
      setMode("existing")
      setSecurityId(String(securities[0]!.id))
    } else {
      setMode("search")
      setSecurityId("")
    }
    setSearchQuery("")
    setDebouncedQuery("")
    setSelectedYahoo(null)
    setManualName("")
    setManualAssetClass("euro_fund")
    setManualIsin("")
    setTxType("buy")
    setDate(getTodayIso())
    setQuantity("1")
    setUnitPrice("")
    setFees("")
    setTotalEur("")
    setTotalManuallyEdited(false)
    setNote("")
  }, [open, editingTx, defaultAccountId, defaultSecurityId, accounts, securities])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const searchResultsQuery = useQuery({
    queryKey: ["yahooSearch", debouncedQuery],
    queryFn: () => searchMarketSecurities({ data: { query: debouncedQuery } }),
    enabled: open && mode === "search" && debouncedQuery.length >= 2,
    staleTime: 60_000,
  })

  const selectedExistingSecurity = securities.find((s) => String(s.id) === securityId) ?? null

  const activeCurrency =
    mode === "search"
      ? (selectedYahoo?.currency ?? "EUR")
      : mode === "manual"
        ? "EUR"
        : (selectedExistingSecurity?.currency ?? "EUR")

  const isEuroFund =
    (mode === "manual" && manualAssetClass === "euro_fund") ||
    (mode === "existing" && selectedExistingSecurity?.assetClass === "euro_fund")

  const isAmountOnly = isEuroFund || txType === "interest"

  useEffect(() => {
    if (totalManuallyEdited || isAmountOnly) return
    const qty = parseQuantity(quantity)
    const priceCents = parseAmountToCents(unitPrice)
    const feesCents = parseAmountToCents(fees)
    if (txType === "dividend") {
      if (priceCents > 0) {
        const gross = qty > 0 ? Math.round(qty * priceCents) : priceCents
        setTotalEur(formatCentsPlain(Math.max(0, gross - feesCents)))
      } else {
        setTotalEur("")
      }
      return
    }
    if (qty > 0 && priceCents > 0) {
      const gross = Math.round(qty * priceCents)
      const net = txType === "buy" ? gross + feesCents : Math.max(0, gross - feesCents)
      setTotalEur(formatCentsPlain(net))
    } else {
      setTotalEur("")
    }
  }, [quantity, unitPrice, fees, txType, totalManuallyEdited, isAmountOnly])

  const saveMutation = useMutation({
    mutationKey: ["saveInvestmentOperation"],
    mutationFn: async () => {
      const parsedAccountId = Number.parseInt(accountId, 10)
      if (!Number.isFinite(parsedAccountId)) throw new Error("Account is required")

      const totalEurCents = parseAmountToCents(totalEur)
      const qty = isAmountOnly ? 1 : parseQuantity(quantity)
      const unitPriceCents = isAmountOnly ? totalEurCents : parseAmountToCents(unitPrice)
      const feesCents = txType === "interest" ? 0 : parseAmountToCents(fees)

      if (editingTx) {
        const parsedSecId = Number.parseInt(securityId, 10)
        return updateInvestmentTransaction({
          data: {
            id: editingTx.id,
            accountId: parsedAccountId,
            securityId: parsedSecId,
            type: txType,
            date,
            quantity: qty,
            unitPriceCents,
            feesCents,
            totalEurCents,
            note: note.trim() || null,
          },
        })
      }

      let resolvedSecurityId: number

      if (mode === "existing") {
        resolvedSecurityId = Number.parseInt(securityId, 10)
        if (!Number.isFinite(resolvedSecurityId)) throw new Error("Security is required")
      } else if (mode === "search") {
        if (!selectedYahoo) throw new Error("Select a security from search results")
        const sec = await upsertSecurity({
          data: {
            symbol: selectedYahoo.symbol,
            name: selectedYahoo.name,
            assetClass: selectedYahoo.assetClass,
            currency: selectedYahoo.currency,
            pricingMode: "yahoo",
          },
        })
        resolvedSecurityId = sec.id
      } else {
        if (!manualName.trim()) throw new Error("Asset name is required")
        const sec = await upsertSecurity({
          data: {
            symbol: toManualSymbol(manualName),
            isin: manualIsin.trim() || null,
            name: manualName.trim(),
            assetClass: manualAssetClass,
            currency: "EUR",
            pricingMode: "manual",
            manualPriceCents:
              manualAssetClass === "euro_fund" ? null : unitPriceCents > 0 ? unitPriceCents : null,
          },
        })
        resolvedSecurityId = sec.id
      }

      return addInvestmentTransaction({
        data: {
          accountId: parsedAccountId,
          securityId: resolvedSecurityId,
          type: txType,
          date,
          quantity: qty,
          unitPriceCents,
          feesCents,
          totalEurCents,
          note: note.trim() || null,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] })
      toast.success(editingTx ? m.inv_tx_updated_toast() : m.inv_tx_added_toast())
      onOpenChange(false)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.common_failed_to_save())
    },
  })

  const canSubmit = (() => {
    if (!accountId || !date || saveMutation.isPending) return false
    if (parseAmountToCents(totalEur) <= 0) return false
    if (!isAmountOnly && txType !== "dividend" && parseQuantity(quantity) <= 0) return false
    if (mode === "existing" && !securityId) return false
    if (mode === "search" && !selectedYahoo) return false
    if (mode === "manual" && !manualName.trim()) return false
    return true
  })()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editingTx ? m.inv_edit_operation() : m.inv_add_operation()}</DialogTitle>
          <DialogDescription>{m.inv_op_dialog_desc()}</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (canSubmit) saveMutation.mutate()
          }}
        >
          <FieldGroup>
            {/* Account + Operation Type */}
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="inv-op-account">{m.inv_op_account_label()}</FieldLabel>
                <Select
                  value={accountId}
                  items={accounts.map((a) => ({ value: String(a.id), label: a.name }))}
                  onValueChange={(val) => {
                    if (val) setAccountId(val)
                  }}
                >
                  <SelectTrigger id="inv-op-account">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((acc) => (
                      <SelectItem key={acc.id} value={String(acc.id)}>
                        {acc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="inv-op-type">{m.inv_op_type_label()}</FieldLabel>
                <Select
                  value={txType}
                  items={INVESTMENT_TX_TYPES.map((t) => ({
                    value: t,
                    label: getInvestmentTxTypeLabel(t),
                  }))}
                  onValueChange={(val) => {
                    if (val) setTxType(val)
                  }}
                >
                  <SelectTrigger id="inv-op-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INVESTMENT_TX_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {getInvestmentTxTypeLabel(t)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            {/* Security picker mode switch (only on create) */}
            {!editingTx && (
              <div className="flex flex-wrap gap-1 border bg-muted/40 p-1">
                {securities.length > 0 && (
                  <Button
                    type="button"
                    size="sm"
                    variant={mode === "existing" ? "secondary" : "ghost"}
                    className="h-7 flex-1 text-xs"
                    onClick={() => setMode("existing")}
                  >
                    {m.inv_op_mode_existing()}
                  </Button>
                )}
                <Button
                  type="button"
                  size="sm"
                  variant={mode === "search" ? "secondary" : "ghost"}
                  className="h-7 flex-1 text-xs"
                  onClick={() => setMode("search")}
                >
                  {m.inv_op_mode_search()}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={mode === "manual" ? "secondary" : "ghost"}
                  className="h-7 flex-1 text-xs"
                  onClick={() => setMode("manual")}
                >
                  {m.inv_op_mode_manual()}
                </Button>
              </div>
            )}

            {/* Mode 1: Existing security */}
            {mode === "existing" && (
              <Field>
                <FieldLabel htmlFor="inv-op-security">{m.inv_op_security_label()}</FieldLabel>
                <Select
                  value={securityId}
                  items={securities.map((s) => ({
                    value: String(s.id),
                    label: s.pricingMode === "manual" ? s.name : `${s.symbol} — ${s.name}`,
                  }))}
                  onValueChange={(val) => {
                    if (val) setSecurityId(val)
                  }}
                >
                  <SelectTrigger id="inv-op-security">
                    <SelectValue placeholder={m.inv_op_select_security_placeholder()} />
                  </SelectTrigger>
                  <SelectContent>
                    {securities.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.pricingMode === "manual" ? s.name : `${s.symbol} — ${s.name}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}

            {/* Mode 2: Yahoo Finance Search */}
            {mode === "search" && (
              <Field>
                <FieldLabel htmlFor="inv-op-search">{m.inv_op_security_label()}</FieldLabel>
                <div className="relative">
                  <SearchIcon className="pointer-events-none absolute top-2.5 left-2.5 size-3.5 text-muted-foreground" />
                  <Input
                    id="inv-op-search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setSelectedYahoo(null)
                    }}
                    placeholder={m.inv_op_search_placeholder()}
                    className="pl-8"
                  />
                </div>
                {selectedYahoo && (
                  <div className="mt-1.5 flex items-center justify-between border border-primary/40 bg-primary/5 px-2.5 py-1.5 text-xs">
                    <div className="min-w-0">
                      <span className="font-semibold">{selectedYahoo.symbol}</span>
                      <span className="ml-1.5 text-muted-foreground">{selectedYahoo.name}</span>
                    </div>
                    <Badge variant="outline" className="shrink-0 text-[10px]">
                      {selectedYahoo.currency} · {getAssetClassLabel(selectedYahoo.assetClass)}
                    </Badge>
                  </div>
                )}
                {!selectedYahoo && debouncedQuery.length >= 2 && (
                  <div className="mt-1 max-h-44 overflow-y-auto border bg-popover">
                    {searchResultsQuery.isFetching ? (
                      <div className="px-3 py-2 text-xs text-muted-foreground">
                        {m.inv_op_searching()}
                      </div>
                    ) : (searchResultsQuery.data ?? []).length === 0 ? (
                      <div className="px-3 py-2 text-xs text-muted-foreground">
                        {m.inv_op_no_results()}
                      </div>
                    ) : (
                      (searchResultsQuery.data ?? []).map((item) => (
                        <button
                          key={item.symbol}
                          type="button"
                          onClick={() => {
                            setSelectedYahoo(item)
                            setSearchQuery(`${item.symbol} — ${item.name}`)
                          }}
                          className="flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-1.5 text-left text-xs transition-colors hover:bg-muted"
                        >
                          <div className="min-w-0">
                            <span className="font-semibold">{item.symbol}</span>
                            <span className="ml-1.5 truncate text-muted-foreground">
                              {item.name}
                            </span>
                          </div>
                          <span className="shrink-0 text-[10px] text-muted-foreground">
                            {item.exchange} · {item.currency}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </Field>
            )}

            {/* Mode 3: Manual asset (Euro Fund, SCPI, etc.) */}
            {mode === "manual" && (
              <div className="flex flex-col gap-2.5 border bg-muted/20 p-3">
                <Field>
                  <FieldLabel htmlFor="inv-manual-name">{m.inv_op_manual_name_label()}</FieldLabel>
                  <Input
                    id="inv-manual-name"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder={m.inv_op_manual_name_placeholder()}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-2.5">
                  <Field>
                    <FieldLabel htmlFor="inv-manual-class">
                      {m.inv_op_asset_class_label()}
                    </FieldLabel>
                    <Select
                      value={manualAssetClass}
                      items={ASSET_CLASSES.map((c) => ({
                        value: c,
                        label: getAssetClassLabel(c),
                      }))}
                      onValueChange={(val) => {
                        if (val) setManualAssetClass(val)
                      }}
                    >
                      <SelectTrigger id="inv-manual-class">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ASSET_CLASSES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {getAssetClassLabel(c)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="inv-manual-isin">{m.inv_op_isin_optional()}</FieldLabel>
                    <Input
                      id="inv-manual-isin"
                      value={manualIsin}
                      onChange={(e) => setManualIsin(e.target.value)}
                      placeholder="FR00..."
                    />
                  </Field>
                </div>
                {manualAssetClass === "euro_fund" && (
                  <p className="text-[11px] text-muted-foreground">{m.inv_op_euro_fund_hint()}</p>
                )}
              </div>
            )}

            {/* Date + Amount (streamlined for Euro Fund / Interest) OR full Qty/Price/Fees */}
            {isAmountOnly ? (
              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="inv-op-date">{m.inv_op_date_label()}</FieldLabel>
                  <Input
                    id="inv-op-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="inv-op-total">{m.inv_op_amount_eur_label()}</FieldLabel>
                  <Input
                    id="inv-op-total"
                    inputMode="decimal"
                    value={totalEur}
                    onChange={(e) => {
                      setTotalEur(e.target.value)
                      setTotalManuallyEdited(true)
                    }}
                    placeholder="100.00"
                    required
                  />
                </Field>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Field>
                    <FieldLabel htmlFor="inv-op-date">{m.inv_op_date_label()}</FieldLabel>
                    <Input
                      id="inv-op-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="inv-op-qty">{m.inv_op_quantity_label()}</FieldLabel>
                    <Input
                      id="inv-op-qty"
                      inputMode="decimal"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value)
                        setTotalManuallyEdited(false)
                      }}
                      placeholder="10"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field>
                    <FieldLabel htmlFor="inv-op-price">
                      {m.inv_op_unit_price_label({ currency: activeCurrency })}
                    </FieldLabel>
                    <Input
                      id="inv-op-price"
                      inputMode="decimal"
                      value={unitPrice}
                      onChange={(e) => {
                        setUnitPrice(e.target.value)
                        setTotalManuallyEdited(false)
                      }}
                      placeholder="500.00"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="inv-op-fees">{m.inv_op_fees_label()}</FieldLabel>
                    <Input
                      id="inv-op-fees"
                      inputMode="decimal"
                      value={fees}
                      onChange={(e) => {
                        setFees(e.target.value)
                        setTotalManuallyEdited(false)
                      }}
                      placeholder="0.00"
                    />
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="inv-op-total">{m.inv_op_total_eur_label()}</FieldLabel>
                  <Input
                    id="inv-op-total"
                    inputMode="decimal"
                    value={totalEur}
                    onChange={(e) => {
                      setTotalEur(e.target.value)
                      setTotalManuallyEdited(true)
                    }}
                    placeholder="5000.00"
                    required
                  />
                  <FieldDescription>{m.inv_op_total_eur_hint()}</FieldDescription>
                </Field>
              </>
            )}

            <Field>
              <FieldLabel htmlFor="inv-op-note">{m.inv_op_note_label()}</FieldLabel>
              <Input
                id="inv-op-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={m.inv_op_note_placeholder()}
              />
            </Field>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={saveMutation.isPending}
              >
                {m.common_cancel()}
              </Button>
              <Button type="submit" disabled={!canSubmit}>
                {saveMutation.isPending ? m.common_saving() : m.common_save()}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
