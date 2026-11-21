import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CopyIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { AssetAccountMonthRow } from "@/lib/assets/calculations"
import { formatShortMonthLabel } from "@/lib/assets/calculations"
import {
  formatCents,
  formatCentsPlain,
  formatMonthLabel,
  parseAmountToCents,
} from "@/lib/budget/calculations"
import { bulkUpsertAccountSnapshots } from "@/lib/server/assets"
import { m } from "@/paraglide/messages"

type BulkSnapshotDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  monthId: string
  rows: Array<AssetAccountMonthRow>
}

export const BulkSnapshotDialog = ({
  open,
  onOpenChange,
  monthId,
  rows,
}: BulkSnapshotDialogProps) => {
  const queryClient = useQueryClient()
  const [drafts, setDrafts] = useState<Record<number, string>>({})
  const [notes, setNotes] = useState<Record<number, string>>({})

  useEffect(() => {
    if (!open) return
    const nextDrafts: Record<number, string> = {}
    const nextNotes: Record<number, string> = {}
    for (const row of rows) {
      nextDrafts[row.account.id] =
        row.currentSnapshot !== null ? formatCentsPlain(row.currentSnapshot.balanceCents) : ""
      nextNotes[row.account.id] = row.currentSnapshot?.note ?? ""
    }
    setDrafts(nextDrafts)
    setNotes(nextNotes)
  }, [open, rows])

  const filledEntries = rows
    .map((row) => {
      const raw = (drafts[row.account.id] ?? "").trim()
      if (!raw) return null
      return {
        accountId: row.account.id,
        balanceCents: parseAmountToCents(raw),
        note: (notes[row.account.id] ?? "").trim() || null,
      }
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)

  const monthLabel = formatMonthLabel(monthId)

  const saveMutation = useMutation({
    mutationKey: ["bulkUpsertAccountSnapshots", monthId],
    mutationFn: () => bulkUpsertAccountSnapshots({ data: { monthId, entries: filledEntries } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
      toast.success(
        filledEntries.length === 1
          ? m.assets_bulk_saved_toast_one({ month: monthLabel })
          : m.assets_bulk_saved_toast({ count: filledEntries.length, month: monthLabel }),
      )
      onOpenChange(false)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.assets_bulk_save_error())
    },
  })

  const fillMissingFromPrevious = () => {
    setDrafts((prev) => {
      const next = { ...prev }
      for (const row of rows) {
        if (!(next[row.account.id] ?? "").trim() && row.previousSnapshot !== null) {
          next[row.account.id] = formatCentsPlain(row.previousSnapshot.balanceCents)
        }
      }
      return next
    })
  }

  const hasAnyMissingWithPrevious = rows.some(
    (row) => !(drafts[row.account.id] ?? "").trim() && row.previousSnapshot !== null,
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{m.assets_bulk_title({ month: monthLabel })}</DialogTitle>
          <DialogDescription>{m.assets_bulk_desc()}</DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (filledEntries.length > 0) {
              saveMutation.mutate()
            }
          }}
        >
          {hasAnyMissingWithPrevious && (
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={fillMissingFromPrevious}
                className="h-7 text-xs"
              >
                <CopyIcon className="size-3" />
                {m.assets_bulk_prefill()}
              </Button>
            </div>
          )}

          <div className="flex max-h-96 flex-col gap-2.5 overflow-y-auto pr-1">
            {rows.map((row) => {
              const prev = row.previousSnapshot
              return (
                <div
                  key={row.account.id}
                  className="flex flex-col gap-1.5 border bg-muted/20 p-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="inline-block size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: row.account.color ?? "#64748b" }}
                      />
                      <span className="truncate text-xs font-medium">{row.account.name}</span>
                      {row.isMissing && (
                        <Badge
                          variant="outline"
                          className="border-amber-500/40 bg-amber-500/10 text-[10px] text-amber-700 dark:text-amber-300"
                        >
                          {m.assets_badge_missing()}
                        </Badge>
                      )}
                    </div>
                    {prev && (
                      <button
                        type="button"
                        onClick={() =>
                          setDrafts((cur) => ({
                            ...cur,
                            [row.account.id]: formatCentsPlain(prev.balanceCents),
                          }))
                        }
                        className="shrink-0 cursor-pointer text-[11px] text-muted-foreground tabular-nums transition-colors hover:text-foreground"
                        title={m.assets_bulk_copy_prev_title()}
                      >
                        {m.assets_bulk_prev_label({
                          month: formatShortMonthLabel(prev.monthId),
                          amount: formatCents(prev.balanceCents),
                        })}
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-[140px_1fr] gap-2">
                    <Input
                      inputMode="decimal"
                      value={drafts[row.account.id] ?? ""}
                      onChange={(e) =>
                        setDrafts((cur) => ({ ...cur, [row.account.id]: e.target.value }))
                      }
                      placeholder={prev ? formatCentsPlain(prev.balanceCents) : "0.00"}
                      className="h-8 text-right text-xs tabular-nums"
                      aria-label={m.assets_bulk_balance_aria({ name: row.account.name })}
                    />
                    <Input
                      value={notes[row.account.id] ?? ""}
                      onChange={(e) =>
                        setNotes((cur) => ({ ...cur, [row.account.id]: e.target.value }))
                      }
                      placeholder={m.assets_bulk_note_placeholder()}
                      className="h-8 text-xs"
                      aria-label={m.assets_bulk_note_aria({ name: row.account.name })}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saveMutation.isPending}
            >
              {m.common_cancel()}
            </Button>
            <Button type="submit" disabled={filledEntries.length === 0 || saveMutation.isPending}>
              {saveMutation.isPending
                ? m.common_saving()
                : filledEntries.length === 1
                  ? m.assets_bulk_save_one()
                  : m.assets_bulk_save_many({ count: filledEntries.length })}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
