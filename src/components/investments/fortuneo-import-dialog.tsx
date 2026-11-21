import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CheckIcon, SearchIcon, UploadIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

import {
  formatQuantity,
  getAssetClassLabel,
  getInvestmentTxTypeLabel,
} from "@/components/investments/labels"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { AssetAccountLike } from "@/lib/assets/calculations"
import { formatCents } from "@/lib/budget/calculations"
import type { FortuneoLabelMapping, FortuneoLabelResolution } from "@/lib/investments"
import type { SecurityLike } from "@/lib/investments/calculations"
import type { FortuneoParsedRow } from "@/lib/investments/fortuneo"
import type { YahooSearchResult } from "@/lib/market/yahoo"
import {
  commitFortuneoImport,
  previewFortuneoImport,
  searchMarketSecurities,
} from "@/lib/server/investments"
import { m } from "@/paraglide/messages"

type FortuneoImportDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  accounts: Array<AssetAccountLike>
  securities: Array<SecurityLike>
  defaultAccountId?: number | null
}

type LabelChoice = {
  kind: "existing" | "yahoo"
  securityId?: number
  yahoo?: YahooSearchResult
}

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer)
  let binary = ""
  const chunkSize = 0x8000
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
  }
  return btoa(binary)
}

const LabelMapperRow = ({
  item,
  choice,
  securities,
  onChange,
}: {
  item: FortuneoLabelResolution
  choice: LabelChoice | undefined
  securities: Array<SecurityLike>
  onChange: (next: LabelChoice) => void
}) => {
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState("")
  const [debounced, setDebounced] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query.trim()), 300)
    return () => clearTimeout(timer)
  }, [query])

  const searchQuery = useQuery({
    queryKey: ["yahooSearchFortuneo", debounced],
    queryFn: () => searchMarketSecurities({ data: { query: debounced } }),
    enabled: searching && debounced.length >= 2,
    staleTime: 60_000,
  })

  const matchedExisting =
    choice?.kind === "existing" ? securities.find((s) => s.id === choice.securityId) : null

  return (
    <div className="flex flex-col gap-2 border bg-muted/20 p-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium">{item.label}</p>
          <p className="text-[11px] text-muted-foreground">
            {m.inv_fortuneo_ops_count({ count: item.count })}
            {item.place ? ` · ${item.place}` : ""} · {item.currency}
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-6 shrink-0 px-2 text-[11px]"
          onClick={() => setSearching((prev) => !prev)}
        >
          <SearchIcon className="size-3" />
          {m.inv_fortuneo_change_ticker()}
        </Button>
      </div>

      {/* Selected pill / candidate quick pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {choice?.kind === "existing" && matchedExisting ? (
          <Badge variant="default" className="gap-1 text-[11px]">
            <CheckIcon className="size-3" />
            {matchedExisting.symbol} — {matchedExisting.name}
          </Badge>
        ) : choice?.kind === "yahoo" && choice.yahoo ? (
          <Badge variant="default" className="gap-1 text-[11px]">
            <CheckIcon className="size-3" />
            {choice.yahoo.symbol} ({choice.yahoo.currency} ·{" "}
            {getAssetClassLabel(choice.yahoo.assetClass)})
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="border-amber-500/40 bg-amber-500/10 text-[11px] text-amber-700 dark:text-amber-300"
          >
            {m.inv_fortuneo_unmatched()}
          </Badge>
        )}

        {item.candidates
          .filter((c) => !(choice?.kind === "yahoo" && choice.yahoo?.symbol === c.symbol))
          .slice(0, 3)
          .map((cand) => (
            <button
              key={cand.symbol}
              type="button"
              onClick={() => {
                onChange({ kind: "yahoo", yahoo: cand })
                setSearching(false)
              }}
              className="cursor-pointer border bg-background px-1.5 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              title={cand.name}
            >
              {cand.symbol} ({cand.currency})
            </button>
          ))}
      </div>

      {searching && (
        <div className="flex flex-col gap-1">
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={m.inv_op_search_placeholder()}
            className="h-8 text-xs"
          />
          {debounced.length >= 2 && (
            <div className="max-h-36 overflow-y-auto border bg-popover">
              {searchQuery.isFetching ? (
                <div className="px-2.5 py-1.5 text-xs text-muted-foreground">
                  {m.inv_op_searching()}
                </div>
              ) : (searchQuery.data ?? []).length === 0 ? (
                <div className="px-2.5 py-1.5 text-xs text-muted-foreground">
                  {m.inv_op_no_results()}
                </div>
              ) : (
                (searchQuery.data ?? []).map((res) => (
                  <button
                    key={res.symbol}
                    type="button"
                    onClick={() => {
                      onChange({ kind: "yahoo", yahoo: res })
                      setSearching(false)
                      setQuery("")
                    }}
                    className="flex w-full cursor-pointer items-center justify-between gap-2 px-2.5 py-1.5 text-left text-xs hover:bg-muted"
                  >
                    <div className="min-w-0">
                      <span className="font-semibold">{res.symbol}</span>
                      <span className="ml-1.5 truncate text-muted-foreground">{res.name}</span>
                    </div>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {res.exchange} · {res.currency}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export const FortuneoImportDialog = ({
  open,
  onOpenChange,
  accounts,
  securities,
  defaultAccountId,
}: FortuneoImportDialogProps) => {
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [accountId, setAccountId] = useState("")
  const [fileName, setFileName] = useState("")
  const [preview, setPreview] = useState<{
    rows: Array<FortuneoParsedRow>
    skippedCount: number
    labels: Array<FortuneoLabelResolution>
  } | null>(null)
  const [choices, setChoices] = useState<Record<string, LabelChoice>>({})

  useEffect(() => {
    if (!open) return
    const fortuneoAccount = accounts.find((a) => /fortuneo/i.test(a.name))
    const initial = defaultAccountId ?? fortuneoAccount?.id ?? accounts[0]?.id
    setAccountId(initial ? String(initial) : "")
    setFileName("")
    setPreview(null)
    setChoices({})
  }, [open, accounts, defaultAccountId])

  const parseMutation = useMutation({
    mutationKey: ["previewFortuneoImport"],
    mutationFn: async (file: File) => {
      const buffer = await file.arrayBuffer()
      const base64 = arrayBufferToBase64(buffer)
      return previewFortuneoImport({ data: { fileName: file.name, base64 } })
    },
    onSuccess: (data, file) => {
      setFileName(file.name)
      setPreview(data)
      const initialChoices: Record<string, LabelChoice> = {}
      for (const item of data.labels) {
        if (item.matchedSecurityId !== null) {
          initialChoices[item.label] = { kind: "existing", securityId: item.matchedSecurityId }
        } else if (item.candidates[0]) {
          initialChoices[item.label] = { kind: "yahoo", yahoo: item.candidates[0] }
        }
      }
      setChoices(initialChoices)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.inv_fortuneo_parse_error())
    },
  })

  const commitMutation = useMutation({
    mutationKey: ["commitFortuneoImport"],
    mutationFn: async () => {
      if (!preview) throw new Error("No preview loaded")
      const parsedAccountId = Number.parseInt(accountId, 10)
      if (!Number.isFinite(parsedAccountId)) throw new Error("Select a target account")

      const mappings: Array<FortuneoLabelMapping> = preview.labels.map((item) => {
        const choice = choices[item.label]
        if (choice?.kind === "existing" && choice.securityId) {
          return { label: item.label, securityId: choice.securityId }
        }
        if (choice?.kind === "yahoo" && choice.yahoo) {
          return {
            label: item.label,
            yahoo: {
              symbol: choice.yahoo.symbol,
              name: choice.yahoo.name,
              assetClass: choice.yahoo.assetClass,
              currency: choice.yahoo.currency,
            },
          }
        }
        return { label: item.label }
      })

      return commitFortuneoImport({
        data: {
          accountId: parsedAccountId,
          mappings,
          rows: preview.rows,
        },
      })
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["investments"] })
      toast.success(
        res.skipped > 0
          ? m.inv_fortuneo_imported_with_skipped_toast({
              imported: res.imported,
              skipped: res.skipped,
            })
          : m.inv_fortuneo_imported_toast({ imported: res.imported }),
      )
      onOpenChange(false)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.inv_fortuneo_import_error())
    },
  })

  const allLabelsMapped =
    preview !== null &&
    preview.labels.length > 0 &&
    preview.labels.every((item) => Boolean(choices[item.label]))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{m.inv_fortuneo_dialog_title()}</DialogTitle>
          <DialogDescription>{m.inv_fortuneo_dialog_desc()}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="fortuneo-account">{m.inv_op_account_label()}</FieldLabel>
              <Select
                value={accountId}
                items={accounts.map((a) => ({ value: String(a.id), label: a.name }))}
                onValueChange={(val) => {
                  if (val) setAccountId(val)
                }}
              >
                <SelectTrigger id="fortuneo-account">
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
              <FieldLabel>{m.inv_fortuneo_file_label()}</FieldLabel>
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip,.csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    parseMutation.mutate(file)
                  }
                  e.target.value = ""
                }}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start truncate text-xs"
                onClick={() => fileInputRef.current?.click()}
                disabled={parseMutation.isPending}
              >
                <UploadIcon className="size-3.5 shrink-0" />
                <span className="truncate">
                  {parseMutation.isPending
                    ? m.inv_fortuneo_parsing()
                    : fileName || m.inv_fortuneo_choose_file()}
                </span>
              </Button>
            </Field>
          </div>

          {preview && (
            <>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {m.inv_fortuneo_summary({
                    rows: preview.rows.length,
                    securities: preview.labels.length,
                  })}
                </span>
                {preview.skippedCount > 0 && (
                  <span className="ml-1.5">
                    {m.inv_fortuneo_skipped_non_trades({ count: preview.skippedCount })}
                  </span>
                )}
              </div>

              {/* Security mapping */}
              {preview.labels.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium">{m.inv_fortuneo_mapping_title()}</p>
                  <div className="flex max-h-52 flex-col gap-2 overflow-y-auto pr-1">
                    {preview.labels.map((item) => (
                      <LabelMapperRow
                        key={item.label}
                        item={item}
                        choice={choices[item.label]}
                        securities={securities}
                        onChange={(next) => setChoices((cur) => ({ ...cur, [item.label]: next }))}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Preview table */}
              {preview.rows.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-medium">{m.inv_fortuneo_preview_title()}</p>
                  <div className="max-h-48 overflow-auto border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{m.inv_tx_col_date()}</TableHead>
                          <TableHead>{m.inv_tx_col_type()}</TableHead>
                          <TableHead>{m.inv_col_security()}</TableHead>
                          <TableHead className="text-right">{m.inv_col_quantity()}</TableHead>
                          <TableHead className="text-right">{m.inv_tx_col_fees()}</TableHead>
                          <TableHead className="text-right">{m.inv_tx_col_total_eur()}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {preview.rows.map((row, idx) => (
                          <TableRow key={`${row.date}-${row.label}-${idx}`}>
                            <TableCell className="text-xs text-muted-foreground tabular-nums">
                              {row.date}
                            </TableCell>
                            <TableCell className="text-xs">
                              {getInvestmentTxTypeLabel(row.type)}
                            </TableCell>
                            <TableCell className="max-w-44 truncate text-xs font-medium">
                              {choices[row.label]?.yahoo?.symbol ??
                                securities.find((s) => s.id === choices[row.label]?.securityId)
                                  ?.symbol ??
                                row.label}
                            </TableCell>
                            <TableCell className="text-right text-xs tabular-nums">
                              {formatQuantity(row.quantity)}
                            </TableCell>
                            <TableCell className="text-right text-xs text-muted-foreground tabular-nums">
                              {row.feesCents > 0 ? formatCents(row.feesCents) : "—"}
                            </TableCell>
                            <TableCell className="text-right text-xs font-medium tabular-nums">
                              {formatCents(row.totalEurCents)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={commitMutation.isPending}
            >
              {m.common_cancel()}
            </Button>
            <Button
              type="button"
              onClick={() => commitMutation.mutate()}
              disabled={
                !preview ||
                preview.rows.length === 0 ||
                !accountId ||
                !allLabelsMapped ||
                commitMutation.isPending
              }
            >
              {commitMutation.isPending
                ? m.common_importing()
                : m.inv_fortuneo_import_submit({ count: preview?.rows.length ?? 0 })}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
