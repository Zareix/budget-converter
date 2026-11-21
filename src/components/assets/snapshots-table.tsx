import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CopyIcon, EditIcon, PenLineIcon, PlusIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { SavingsAccountDialog } from "@/components/assets/savings-account-dialog"
import { InlineAmountInput } from "@/components/budget/inline-amount-input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { AssetAccountMonthRow, AssetsMonthSummary } from "@/lib/assets/calculations"
import { formatPercentSigned, formatShortMonthLabel } from "@/lib/assets/calculations"
import { formatCents } from "@/lib/budget/calculations"
import { deleteAccountSnapshot, upsertAccountSnapshot } from "@/lib/server/assets"
import { deleteAccount } from "@/lib/server/budget"
import { cn } from "@/lib/utils"
import { m } from "@/paraglide/messages"

type SnapshotsTableProps = {
  monthId: string
  rows: Array<AssetAccountMonthRow>
  summary: AssetsMonthSummary
  onOpenBulkFill: () => void
}

const InlineNoteInput = ({
  note,
  disabled,
  onSave,
}: {
  note: string | null
  disabled?: boolean
  onSave: (nextNote: string | null) => void
}) => {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(note ?? "")

  const commit = () => {
    setEditing(false)
    const trimmed = draft.trim()
    const normalized = trimmed || null
    if (normalized !== (note ?? null)) {
      onSave(normalized)
    }
  }

  if (editing) {
    return (
      <Input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur()
          } else if (e.key === "Escape") {
            setDraft(note ?? "")
            setEditing(false)
          }
        }}
        placeholder={m.assets_note_placeholder()}
        className="h-7 w-40 px-1.5 text-xs"
      />
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        setDraft(note ?? "")
        setEditing(true)
      }}
      className={cn(
        "inline-flex h-7 max-w-44 cursor-pointer items-center truncate px-1.5 text-left text-xs transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40",
        !note && "text-muted-foreground",
      )}
      title={disabled ? m.assets_note_disabled_title() : m.assets_note_edit_title()}
    >
      {note || "—"}
    </button>
  )
}

export const SnapshotsTable = ({ monthId, rows, summary, onOpenBulkFill }: SnapshotsTableProps) => {
  const queryClient = useQueryClient()

  const upsertMutation = useMutation({
    mutationKey: ["upsertAccountSnapshot", monthId],
    mutationFn: (data: Parameters<typeof upsertAccountSnapshot>[0]["data"]) =>
      upsertAccountSnapshot({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.assets_save_balance_error())
    },
  })

  const deleteSnapshotMutation = useMutation({
    mutationKey: ["deleteAccountSnapshot", monthId],
    mutationFn: (accountId: number) => deleteAccountSnapshot({ data: { accountId, monthId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.assets_clear_balance_error())
    },
  })

  const deleteAccountMutation = useMutation({
    mutationKey: ["deleteSavingsAccount"],
    mutationFn: (id: number) => deleteAccount({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      queryClient.invalidateQueries({ queryKey: ["budget"] })
      toast.success(m.assets_account_deleted_toast())
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.assets_account_delete_error())
    },
  })

  const shortMonth = formatShortMonthLabel(monthId)

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CardTitle>{m.assets_table_title()}</CardTitle>
          <span className="text-xs text-muted-foreground">
            {m.assets_table_recorded_count({
              updated: summary.updatedCount,
              total: summary.totalAccountsCount,
              month: shortMonth,
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {rows.length > 0 && (
            <Button variant="outline" size="sm" onClick={onOpenBulkFill}>
              <PenLineIcon className="size-3.5" />
              {m.assets_fill_balances()}
            </Button>
          )}
          <SavingsAccountDialog
            trigger={
              <Button variant="outline" size="sm">
                <PlusIcon className="size-3.5" />
                {m.assets_add_account()}
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{m.assets_col_account()}</TableHead>
              <TableHead className="text-right">{m.assets_col_previous()}</TableHead>
              <TableHead className="text-right">
                {m.assets_col_balance({ month: shortMonth })}
              </TableHead>
              <TableHead className="text-right">{m.assets_col_change()}</TableHead>
              <TableHead>{m.assets_col_note()}</TableHead>
              <TableHead className="w-28 text-right">{m.common_actions()}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const prev = row.previousSnapshot
              const current = row.currentSnapshot
              return (
                <TableRow
                  key={row.account.id}
                  className={cn(row.isMissing && "bg-amber-500/[0.03]")}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: row.account.color ?? "#64748b" }}
                      />
                      <span className="font-medium">{row.account.name}</span>
                      {row.isMissing && (
                        <Badge
                          variant="outline"
                          className="border-amber-500/40 bg-amber-500/10 text-[10px] text-amber-700 dark:text-amber-300"
                        >
                          {m.assets_badge_missing()}
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-right text-xs text-muted-foreground tabular-nums">
                    {prev ? (
                      <div className="flex flex-col items-end leading-tight">
                        <span>{formatCents(prev.balanceCents)}</span>
                        <span className="text-[10px] opacity-75">
                          {formatShortMonthLabel(prev.monthId)}
                        </span>
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <InlineAmountInput
                        cents={current?.balanceCents ?? null}
                        nullable
                        placeholder={m.assets_enter_placeholder()}
                        textClassName={cn(
                          current !== null
                            ? "font-medium"
                            : "text-amber-700/80 dark:text-amber-300/80",
                        )}
                        onSave={(nextCents) => {
                          if (nextCents === null) {
                            deleteSnapshotMutation.mutate(row.account.id)
                          } else {
                            upsertMutation.mutate({
                              accountId: row.account.id,
                              monthId,
                              balanceCents: nextCents,
                            })
                          }
                        }}
                      />
                      {row.isCarriedOver && prev && (
                        <span className="px-1.5 text-[10px] text-muted-foreground tabular-nums">
                          {m.assets_estimated_prefix({ amount: formatCents(prev.balanceCents) })}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-right text-xs tabular-nums">
                    {row.deltaCents !== null ? (
                      <div
                        className={cn(
                          "flex flex-col items-end leading-tight font-medium",
                          row.deltaCents > 0 && "text-emerald-600 dark:text-emerald-400",
                          row.deltaCents < 0 && "text-destructive",
                          row.deltaCents === 0 && "text-muted-foreground",
                        )}
                      >
                        <span>{formatCents(row.deltaCents, { signed: true })}</span>
                        {row.deltaPercent !== null && (
                          <span className="text-[10px] opacity-80">
                            {formatPercentSigned(row.deltaPercent)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  <TableCell>
                    <InlineNoteInput
                      note={current?.note ?? null}
                      disabled={current === null}
                      onSave={(nextNote) => {
                        if (current === null) return
                        upsertMutation.mutate({
                          accountId: row.account.id,
                          monthId,
                          balanceCents: current.balanceCents,
                          note: nextNote,
                        })
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-1">
                      {row.isMissing && prev && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={m.assets_carry_over_aria({ name: row.account.name })}
                          title={m.assets_carry_over_title({
                            amount: formatCents(prev.balanceCents),
                          })}
                          onClick={() =>
                            upsertMutation.mutate({
                              accountId: row.account.id,
                              monthId,
                              balanceCents: prev.balanceCents,
                            })
                          }
                          disabled={upsertMutation.isPending}
                        >
                          <CopyIcon className="size-3.5" />
                        </Button>
                      )}
                      <SavingsAccountDialog
                        account={row.account}
                        trigger={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={m.assets_edit_account_aria()}
                          >
                            <EditIcon className="size-3.5" />
                          </Button>
                        }
                      />
                      <AlertDialog>
                        <AlertDialogTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={m.assets_delete_account_aria()}
                            >
                              <TrashIcon className="size-3.5 text-destructive" />
                            </Button>
                          }
                        />
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {m.assets_delete_confirm_title({ name: row.account.name })}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {m.assets_delete_confirm_desc()}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{m.common_cancel()}</AlertDialogCancel>
                            <AlertDialogAction
                              variant="destructive"
                              onClick={() => deleteAccountMutation.mutate(row.account.id)}
                            >
                              {m.common_delete()}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          {rows.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell>
                  {m.common_total()}
                  {summary.carriedOverCount > 0 && (
                    <span className="ml-1.5 text-[11px] font-normal text-muted-foreground">
                      {summary.carriedOverCount === 1
                        ? m.assets_total_carried_over_one()
                        : m.assets_total_carried_over({ count: summary.carriedOverCount })}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right text-muted-foreground tabular-nums">
                  {summary.previousMonthEffectiveCents !== null
                    ? formatCents(summary.previousMonthEffectiveCents)
                    : "—"}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCents(summary.totalEffectiveCents)}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right tabular-nums",
                    summary.monthlyDeltaCents !== null &&
                      summary.monthlyDeltaCents > 0 &&
                      "text-emerald-600 dark:text-emerald-400",
                    summary.monthlyDeltaCents !== null &&
                      summary.monthlyDeltaCents < 0 &&
                      "text-destructive",
                  )}
                >
                  {summary.monthlyDeltaCents !== null
                    ? formatCents(summary.monthlyDeltaCents, { signed: true })
                    : "—"}
                </TableCell>
                <TableCell colSpan={2} />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </CardContent>
    </Card>
  )
}
