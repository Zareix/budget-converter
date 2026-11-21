import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import {
  CheckCircle2Icon,
  LandmarkIcon,
  PenLineIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react"
import { useMemo, useState } from "react"
import * as v from "valibot"

import { AssetsCharts } from "@/components/assets/assets-charts"
import { BulkSnapshotDialog } from "@/components/assets/bulk-snapshot-dialog"
import { HistoryCard } from "@/components/assets/history-card"
import { MissingSnapshotsBanner } from "@/components/assets/missing-snapshots-banner"
import { SavingsAccountDialog } from "@/components/assets/savings-account-dialog"
import { SnapshotsTable } from "@/components/assets/snapshots-table"
import { MonthHeader } from "@/components/budget/month-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getDefaultMonthId, usePersistActiveMonth } from "@/hooks/use-active-month"
import {
  computeAssetsHistory,
  computeAssetsMonthView,
  computeAssetsTimeline,
  formatPercentSigned,
} from "@/lib/assets/calculations"
import {
  formatCents,
  formatMonthLabel,
  getCurrentMonthId,
  isValidMonthId,
} from "@/lib/budget/calculations"
import { getSavingsAssetsOverview } from "@/lib/server/assets"
import { cn } from "@/lib/utils"
import { m } from "@/paraglide/messages"

export const Route = createFileRoute("/assets")({
  component: AssetsPage,
  validateSearch: v.object({
    month: v.optional(v.string()),
  }),
})

function AssetsPage() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: "/assets" })
  const [bulkOpen, setBulkOpen] = useState(false)

  const monthId = search.month && isValidMonthId(search.month) ? search.month : getDefaultMonthId()
  usePersistActiveMonth(monthId)

  const currentMonthId = getCurrentMonthId()

  const handleSelectMonth = (nextMonthId: string) => {
    navigate({ search: { month: nextMonthId } })
  }

  const assetsQuery = useQuery({
    queryKey: ["assets"],
    queryFn: getSavingsAssetsOverview,
  })

  const accounts = assetsQuery.data?.accounts ?? []
  const snapshots = assetsQuery.data?.snapshots ?? []

  const monthView = useMemo(
    () => computeAssetsMonthView({ accounts, snapshots, monthId }),
    [accounts, snapshots, monthId],
  )

  const timeline = useMemo(
    () => computeAssetsTimeline({ accounts, snapshots }),
    [accounts, snapshots],
  )

  const history = useMemo(
    () => computeAssetsHistory({ accounts, snapshots }),
    [accounts, snapshots],
  )

  const { rows, summary } = monthView
  const monthLabel = formatMonthLabel(monthId)

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6">
      <MonthHeader
        monthId={monthId}
        onSelectMonth={handleSelectMonth}
        showCreateMonth={false}
        rightSlot={
          <>
            {monthId !== currentMonthId && (
              <Button variant="ghost" size="sm" onClick={() => handleSelectMonth(currentMonthId)}>
                {m.assets_current_month()}
              </Button>
            )}
            {accounts.length > 0 && (
              <Button variant="outline" size="sm" onClick={() => setBulkOpen(true)}>
                <PenLineIcon className="size-3.5" />
                {m.assets_fill_balances()}
              </Button>
            )}
            <SavingsAccountDialog
              trigger={
                <Button size="sm">
                  <PlusIcon className="size-3.5" />
                  {m.assets_add_account()}
                </Button>
              }
            />
          </>
        }
      />

      {assetsQuery.isLoading ? (
        <div className="py-16 text-center text-sm text-muted-foreground">{m.assets_loading()}</div>
      ) : assetsQuery.isError ? (
        <div className="py-16 text-center text-sm text-destructive">
          {m.assets_load_error({
            message:
              assetsQuery.error instanceof Error
                ? assetsQuery.error.message
                : m.common_unknown_error(),
          })}
        </div>
      ) : accounts.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
            <span className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <LandmarkIcon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-medium">{m.assets_empty_title()}</p>
              <p className="mt-1 max-w-md text-xs text-muted-foreground">{m.assets_empty_desc()}</p>
            </div>
            <SavingsAccountDialog
              trigger={
                <Button size="sm" className="mt-1">
                  <PlusIcon className="size-3.5" />
                  {m.assets_add_savings_account()}
                </Button>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <MissingSnapshotsBanner
            monthId={monthId}
            rows={rows}
            onOpenBulkFill={() => setBulkOpen(true)}
          />

          {/* KPI Summary Strip */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground">
                  {m.assets_kpi_total({ month: monthLabel })}
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
                  {formatCents(summary.totalEffectiveCents)}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {summary.carriedOverCount > 0
                    ? summary.carriedOverCount === 1
                      ? m.assets_kpi_carried_over_one()
                      : m.assets_kpi_carried_over({ count: summary.carriedOverCount })
                    : summary.updatedCount > 0
                      ? m.assets_kpi_from_snapshots()
                      : m.assets_kpi_no_balances()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground">{m.assets_kpi_vs_previous()}</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <p
                    className={cn(
                      "text-2xl font-semibold tracking-tight tabular-nums",
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
                  </p>
                  {summary.monthlyDeltaPercent !== null && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
                        summary.monthlyDeltaCents !== null && summary.monthlyDeltaCents >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-destructive",
                      )}
                    >
                      {summary.monthlyDeltaCents !== null && summary.monthlyDeltaCents >= 0 ? (
                        <TrendingUpIcon className="size-3.5" />
                      ) : (
                        <TrendingDownIcon className="size-3.5" />
                      )}
                      {formatPercentSigned(summary.monthlyDeltaPercent)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {summary.previousMonthEffectiveCents !== null
                    ? m.assets_kpi_prev_value({
                        amount: formatCents(summary.previousMonthEffectiveCents),
                      })
                    : m.assets_kpi_no_prev()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground">{m.assets_kpi_status()}</p>
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-2xl font-semibold tracking-tight tabular-nums">
                    {summary.updatedCount} / {summary.totalAccountsCount}
                  </p>
                  {summary.missingAccounts.length === 0 && (
                    <CheckCircle2Icon className="size-5 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {summary.missingAccounts.length === 0
                    ? m.assets_kpi_all_updated({ month: monthLabel })
                    : summary.missingAccounts.length === 1
                      ? m.assets_kpi_missing_one()
                      : m.assets_kpi_missing_many({ count: summary.missingAccounts.length })}
                </p>
              </CardContent>
            </Card>
          </div>

          <AssetsCharts
            accounts={accounts}
            rows={rows}
            summary={summary}
            timeline={timeline}
            selectedMonthId={monthId}
          />

          <SnapshotsTable
            monthId={monthId}
            rows={rows}
            summary={summary}
            onOpenBulkFill={() => setBulkOpen(true)}
          />

          <HistoryCard
            accounts={accounts}
            history={history}
            selectedMonthId={monthId}
            onSelectMonth={handleSelectMonth}
          />

          <BulkSnapshotDialog
            open={bulkOpen}
            onOpenChange={setBulkOpen}
            monthId={monthId}
            rows={rows}
          />
        </>
      )}
    </div>
  )
}
