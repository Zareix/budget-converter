import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { AssetAccountLike, AssetsHistoryRow } from "@/lib/assets/calculations"
import { formatCents, formatMonthLabel } from "@/lib/budget/calculations"
import { cn } from "@/lib/utils"
import { m } from "@/paraglide/messages"

type HistoryCardProps = {
  accounts: Array<AssetAccountLike>
  history: Array<AssetsHistoryRow>
  selectedMonthId: string
  onSelectMonth: (monthId: string) => void
}

export const HistoryCard = ({
  accounts,
  history,
  selectedMonthId,
  onSelectMonth,
}: HistoryCardProps) => {
  if (history.length === 0) return null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>{m.assets_history_title()}</CardTitle>
        <span className="text-xs text-muted-foreground">{m.assets_history_hint()}</span>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{m.common_month()}</TableHead>
              {accounts.map((account) => (
                <TableHead key={account.id} className="text-right">
                  <div className="inline-flex items-center justify-end gap-1.5">
                    <span
                      className="inline-block size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: account.color ?? "#64748b" }}
                    />
                    <span>{account.name}</span>
                  </div>
                </TableHead>
              ))}
              <TableHead className="text-right">{m.common_total()}</TableHead>
              <TableHead className="text-right">{m.assets_col_change()}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((row) => {
              const isSelected = row.monthId === selectedMonthId
              return (
                <TableRow
                  key={row.monthId}
                  onClick={() => onSelectMonth(row.monthId)}
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-muted/50",
                    isSelected && "bg-primary/5",
                  )}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span>{formatMonthLabel(row.monthId)}</span>
                      {row.missingCount > 0 && (
                        <span
                          className="inline-block size-1.5 rounded-full bg-amber-500"
                          title={m.assets_history_missing_title({ count: row.missingCount })}
                        />
                      )}
                    </div>
                  </TableCell>
                  {accounts.map((account) => {
                    const cell = row.cells[account.id]
                    if (!cell || cell.balanceCents === null) {
                      return (
                        <TableCell
                          key={account.id}
                          className="text-right text-xs text-muted-foreground tabular-nums"
                        >
                          —
                        </TableCell>
                      )
                    }
                    return (
                      <TableCell
                        key={account.id}
                        className={cn(
                          "text-right text-xs tabular-nums",
                          !cell.isRecorded && "text-muted-foreground italic",
                        )}
                        title={
                          cell.isRecorded
                            ? (cell.note ?? undefined)
                            : m.assets_history_carried_over()
                        }
                      >
                        {formatCents(cell.balanceCents)}
                      </TableCell>
                    )
                  })}
                  <TableCell className="text-right text-xs font-semibold tabular-nums">
                    {formatCents(row.totalEffectiveCents)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right text-xs font-medium tabular-nums",
                      row.deltaCents !== null &&
                        row.deltaCents > 0 &&
                        "text-emerald-600 dark:text-emerald-400",
                      row.deltaCents !== null && row.deltaCents < 0 && "text-destructive",
                      (row.deltaCents === null || row.deltaCents === 0) && "text-muted-foreground",
                    )}
                  >
                    {row.deltaCents !== null ? formatCents(row.deltaCents, { signed: true }) : "—"}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
