import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import {
  CheckCircle2Icon,
  LandmarkIcon,
  LayoutGridIcon,
  PenLineIcon,
  PiggyBankIcon,
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
import { OverviewTab } from "@/components/assets/overview-tab"
import { SavingsAccountDialog } from "@/components/assets/savings-account-dialog"
import { SnapshotsTable } from "@/components/assets/snapshots-table"
import { MonthHeader } from "@/components/budget/month-header"
import { InvestmentsTab } from "@/components/investments/investments-tab"
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
import {
  computeInvestmentsPortfolio,
  computeInvestmentsTimeline,
} from "@/lib/investments/calculations"
import { getSavingsAssetsOverview } from "@/lib/server/assets"
import { getInvestmentsOverview } from "@/lib/server/investments"
import { cn } from "@/lib/utils"
import { m } from "@/paraglide/messages"

const ASSETS_TABS = ["overview", "savings", "investments"] as const
type AssetsTab = (typeof ASSETS_TABS)[number]

export const Route = createFileRoute("/assets")({
  component: AssetsPage,
  validateSearch: v.object({
    month: v.optional(v.string()),
    tab: v.optional(v.picklist(ASSETS_TABS)),
  }),
})

function AssetsPage() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: "/assets" })
  const [bulkOpen, setBulkOpen] = useState(false)

  const activeTab: AssetsTab = search.tab ?? "overview"
  const monthId = search.month && isValidMonthId(search.month) ? search.month : getDefaultMonthId()
  usePersistActiveMonth(monthId)

  const currentMonthId = getCurrentMonthId()

  const handleSelectMonth = (nextMonthId: string) => {
    navigate({ search: (prev) => ({ ...prev, month: nextMonthId }) })
  }

  const handleSelectTab = (nextTab: AssetsTab) => {
    navigate({ search: (prev) => ({ ...prev, tab: nextTab }) })
  }

  const assetsQuery = useQuery({
    queryKey: ["assets"],
    queryFn: getSavingsAssetsOverview,
  })

  const investmentsQuery = useQuery({
    queryKey: ["investments"],
    queryFn: getInvestmentsOverview,
  })

  const savingsAccounts = assetsQuery.data?.accounts ?? []
  const savingsSnapshots = assetsQuery.data?.snapshots ?? []

  const invAccounts = investmentsQuery.data?.accounts ?? []
  const invSecurities = investmentsQuery.data?.securities ?? []
  const invTransactions = investmentsQuery.data?.transactions ?? []
  const invQuotes = investmentsQuery.data?.quotes ?? []
  const invMonthlyPrices = investmentsQuery.data?.monthlyPrices ?? []

  const monthView = useMemo(
    () =>
      computeAssetsMonthView({
        accounts: savingsAccounts,
        snapshots: savingsSnapshots,
        monthId,
      }),
    [savingsAccounts, savingsSnapshots, monthId],
  )

  const savingsTimeline = useMemo(
    () => computeAssetsTimeline({ accounts: savingsAccounts, snapshots: savingsSnapshots }),
    [savingsAccounts, savingsSnapshots],
  )

  const savingsHistory = useMemo(
    () => computeAssetsHistory({ accounts: savingsAccounts, snapshots: savingsSnapshots }),
    [savingsAccounts, savingsSnapshots],
  )

  const investmentsPortfolio = useMemo(
    () =>
      computeInvestmentsPortfolio({
        accounts: invAccounts,
        securities: invSecurities,
        transactions: invTransactions,
        quotes: invQuotes,
      }),
    [invAccounts, invSecurities, invTransactions, invQuotes],
  )

  const investmentsTimeline = useMemo(
    () =>
      computeInvestmentsTimeline({
        accounts: invAccounts,
        securities: invSecurities,
        transactions: invTransactions,
        quotes: invQuotes,
        monthlyPrices: invMonthlyPrices,
      }),
    [invAccounts, invSecurities, invTransactions, invQuotes, invMonthlyPrices],
  )

  const { rows: savingsRows, summary: savingsSummary } = monthView
  const monthLabel = formatMonthLabel(monthId)

  const isLoading = assetsQuery.isLoading || investmentsQuery.isLoading

  const tabs: Array<{ id: AssetsTab; label: string; icon: typeof LayoutGridIcon; badge?: number }> =
    [
      { id: "overview", label: m.assets_tab_overview(), icon: LayoutGridIcon },
      {
        id: "savings",
        label: m.assets_tab_savings(),
        icon: PiggyBankIcon,
        badge:
          savingsSummary.missingAccounts.length > 0
            ? savingsSummary.missingAccounts.length
            : undefined,
      },
      { id: "investments", label: m.assets_tab_investments(), icon: TrendingUpIcon },
    ]

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6">
      {/* Top Tabs + Month Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <div className="flex items-center gap-1">
          {tabs.map(({ id, label, icon: Icon, badge }) => {
            const active = activeTab === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleSelectTab(id)}
                className={cn(
                  "flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-3.5" />
                <span>{label}</span>
                {badge !== undefined && (
                  <span className="ml-0.5 inline-flex size-4 items-center justify-center rounded-full bg-amber-500/20 text-[10px] font-semibold text-amber-700 dark:text-amber-300">
                    {badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {isLoading ? (
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
      ) : investmentsQuery.isError ? (
        <div className="py-16 text-center text-sm text-destructive">
          {m.inv_load_error({
            message:
              investmentsQuery.error instanceof Error
                ? investmentsQuery.error.message
                : m.common_unknown_error(),
          })}
        </div>
      ) : activeTab === "overview" ? (
        <OverviewTab
          monthId={monthId}
          savingsRows={savingsRows}
          savingsSummary={savingsSummary}
          savingsTimeline={savingsTimeline}
          investmentAccounts={invAccounts}
          investmentsSummary={investmentsPortfolio.summary}
          investmentsTimeline={investmentsTimeline}
          onGoToSavings={() => handleSelectTab("savings")}
        />
      ) : activeTab === "investments" ? (
        <InvestmentsTab
          accounts={invAccounts}
          securities={invSecurities}
          transactions={invTransactions}
          quotes={invQuotes}
          monthlyPrices={invMonthlyPrices}
        />
      ) : (
        <>
          <MonthHeader
            monthId={monthId}
            onSelectMonth={handleSelectMonth}
            showCreateMonth={false}
            rightSlot={
              <>
                {monthId !== currentMonthId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSelectMonth(currentMonthId)}
                  >
                    {m.assets_current_month()}
                  </Button>
                )}
                {savingsAccounts.length > 0 && (
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

          {savingsAccounts.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
                <span className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <LandmarkIcon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-medium">{m.assets_empty_title()}</p>
                  <p className="mt-1 max-w-md text-xs text-muted-foreground">
                    {m.assets_empty_desc()}
                  </p>
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
                rows={savingsRows}
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
                      {formatCents(savingsSummary.totalEffectiveCents)}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {savingsSummary.carriedOverCount > 0
                        ? savingsSummary.carriedOverCount === 1
                          ? m.assets_kpi_carried_over_one()
                          : m.assets_kpi_carried_over({ count: savingsSummary.carriedOverCount })
                        : savingsSummary.updatedCount > 0
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
                          savingsSummary.monthlyDeltaCents !== null &&
                            savingsSummary.monthlyDeltaCents > 0 &&
                            "text-emerald-600 dark:text-emerald-400",
                          savingsSummary.monthlyDeltaCents !== null &&
                            savingsSummary.monthlyDeltaCents < 0 &&
                            "text-destructive",
                        )}
                      >
                        {savingsSummary.monthlyDeltaCents !== null
                          ? formatCents(savingsSummary.monthlyDeltaCents, { signed: true })
                          : "—"}
                      </p>
                      {savingsSummary.monthlyDeltaPercent !== null && (
                        <span
                          className={cn(
                            "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
                            savingsSummary.monthlyDeltaCents !== null &&
                              savingsSummary.monthlyDeltaCents >= 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-destructive",
                          )}
                        >
                          {savingsSummary.monthlyDeltaCents !== null &&
                          savingsSummary.monthlyDeltaCents >= 0 ? (
                            <TrendingUpIcon className="size-3.5" />
                          ) : (
                            <TrendingDownIcon className="size-3.5" />
                          )}
                          {formatPercentSigned(savingsSummary.monthlyDeltaPercent)}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {savingsSummary.previousMonthEffectiveCents !== null
                        ? m.assets_kpi_prev_value({
                            amount: formatCents(savingsSummary.previousMonthEffectiveCents),
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
                        {savingsSummary.updatedCount} / {savingsSummary.totalAccountsCount}
                      </p>
                      {savingsSummary.missingAccounts.length === 0 && (
                        <CheckCircle2Icon className="size-5 text-emerald-600 dark:text-emerald-400" />
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {savingsSummary.missingAccounts.length === 0
                        ? m.assets_kpi_all_updated({ month: monthLabel })
                        : savingsSummary.missingAccounts.length === 1
                          ? m.assets_kpi_missing_one()
                          : m.assets_kpi_missing_many({
                              count: savingsSummary.missingAccounts.length,
                            })}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <AssetsCharts
                accounts={savingsAccounts}
                rows={savingsRows}
                summary={savingsSummary}
                timeline={savingsTimeline}
                selectedMonthId={monthId}
              />

              <SnapshotsTable
                monthId={monthId}
                rows={savingsRows}
                summary={savingsSummary}
                onOpenBulkFill={() => setBulkOpen(true)}
              />

              <HistoryCard
                accounts={savingsAccounts}
                history={savingsHistory}
                selectedMonthId={monthId}
                onSelectMonth={handleSelectMonth}
              />

              <BulkSnapshotDialog
                open={bulkOpen}
                onOpenChange={setBulkOpen}
                monthId={monthId}
                rows={savingsRows}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
