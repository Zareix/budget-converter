import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AlertTriangleIcon, CopyIcon, PenLineIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { AssetAccountMonthRow } from "@/lib/assets/calculations"
import { formatMonthLabel } from "@/lib/budget/calculations"
import { bulkUpsertAccountSnapshots } from "@/lib/server/assets"
import { m } from "@/paraglide/messages"

type MissingSnapshotsBannerProps = {
  monthId: string
  rows: Array<AssetAccountMonthRow>
  onOpenBulkFill: () => void
}

export const MissingSnapshotsBanner = ({
  monthId,
  rows,
  onOpenBulkFill,
}: MissingSnapshotsBannerProps) => {
  const queryClient = useQueryClient()
  const missingRows = rows.filter((row) => row.isMissing)

  const carryOverEntries = missingRows
    .filter((row) => row.previousSnapshot !== null)
    .map((row) => ({
      accountId: row.account.id,
      balanceCents: row.previousSnapshot!.balanceCents,
    }))

  const monthLabel = formatMonthLabel(monthId)

  const carryOverMutation = useMutation({
    mutationKey: ["carryOverSnapshots", monthId],
    mutationFn: () => bulkUpsertAccountSnapshots({ data: { monthId, entries: carryOverEntries } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
      toast.success(
        carryOverEntries.length === 1
          ? m.assets_carry_over_toast_one({ month: monthLabel })
          : m.assets_carry_over_toast({ count: carryOverEntries.length, month: monthLabel }),
      )
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.assets_carry_over_error())
    },
  })

  if (missingRows.length === 0) return null

  const allMissing = missingRows.length === rows.length
  const missingNames = missingRows.map((r) => r.account.name)
  const formattedNames =
    missingNames.length <= 4
      ? missingNames.join(", ")
      : `${missingNames.slice(0, 3).join(", ")} ${m.assets_missing_more({ count: missingNames.length - 3 })}`

  const headline = allMissing
    ? m.assets_missing_all({ month: monthLabel })
    : missingRows.length === 1
      ? m.assets_missing_partial_one({
          month: monthLabel,
          missing: missingRows.length,
          total: rows.length,
        })
      : m.assets_missing_partial({
          month: monthLabel,
          missing: missingRows.length,
          total: rows.length,
        })

  return (
    <Card className="border-amber-500/40 bg-amber-500/10">
      <CardContent className="flex flex-wrap items-center justify-between gap-3 py-3">
        <div className="flex items-start gap-2.5">
          <AlertTriangleIcon className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="text-xs">
            <p className="font-medium text-foreground">{headline}</p>
            <p className="mt-0.5 text-muted-foreground">
              {m.assets_missing_please_fill()}{" "}
              <span className="font-medium text-foreground">{formattedNames}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {carryOverEntries.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => carryOverMutation.mutate()}
              disabled={carryOverMutation.isPending}
            >
              <CopyIcon className="size-3.5" />
              {carryOverMutation.isPending ? m.assets_copying() : m.assets_carry_over_previous()}
            </Button>
          )}
          <Button size="sm" onClick={onOpenBulkFill}>
            <PenLineIcon className="size-3.5" />
            {m.assets_fill_balances_cta()}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
