import { AlertTriangleIcon, ArrowRightIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ASSET_CLASS_COLORS, getAssetClassLabel } from "@/components/investments/labels"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type {
  AssetAccountLike,
  AssetAccountMonthRow,
  AssetsMonthSummary,
  AssetsTimelinePoint,
} from "@/lib/assets/calculations"
import { formatPercentSigned } from "@/lib/assets/calculations"
import { formatCents, formatMonthLabel } from "@/lib/budget/calculations"
import type { AssetClass } from "@/lib/db/schema"
import type { InvestmentsSummary, InvestmentsTimelinePoint } from "@/lib/investments/calculations"
import { computeNetWorthTimeline } from "@/lib/investments/calculations"
import { cn } from "@/lib/utils"
import { m } from "@/paraglide/messages"

type OverviewTabProps = {
  monthId: string
  savingsRows: Array<AssetAccountMonthRow>
  savingsSummary: AssetsMonthSummary
  savingsTimeline: Array<AssetsTimelinePoint>
  investmentAccounts: Array<AssetAccountLike>
  investmentsSummary: InvestmentsSummary
  investmentsTimeline: Array<InvestmentsTimelinePoint>
  onGoToSavings: () => void
}

const formatCompactAxis = (cents: number): string => {
  const euros = cents / 100
  if (Math.abs(euros) >= 1000) {
    const k = euros / 1000
    return `${Number.isInteger(k) ? k : k.toFixed(1)}k €`
  }
  return `${Math.round(euros)} €`
}

export const OverviewTab = ({
  monthId,
  savingsRows,
  savingsSummary,
  savingsTimeline,
  investmentAccounts,
  investmentsSummary,
  investmentsTimeline,
  onGoToSavings,
}: OverviewTabProps) => {
  const [allocMode, setAllocMode] = useState<"envelopes" | "classes">("envelopes")

  const savingsTotal = savingsSummary.totalEffectiveCents
  const investmentsTotal = investmentsSummary.totalValueEurCents
  const netWorthTotal = savingsTotal + investmentsTotal

  const savingsPct = netWorthTotal > 0 ? Math.round((savingsTotal / netWorthTotal) * 100) : 0
  const investmentsPct =
    netWorthTotal > 0 ? Math.round((investmentsTotal / netWorthTotal) * 100) : 0

  const netWorthTimeline = computeNetWorthTimeline({
    savingsTimeline,
    investmentsTimeline,
  }).slice(-12)

  const invAccountById = new Map(investmentAccounts.map((a) => [a.id, a]))

  const allocationSlices = (() => {
    if (allocMode === "classes") {
      const slices: Array<{ name: string; value: number; color: string }> = []
      if (savingsTotal > 0) {
        slices.push({ name: m.overview_class_cash(), value: savingsTotal, color: "#f97316" })
      }
      for (const [assetClass, val] of Object.entries(investmentsSummary.byAssetClass) as Array<
        [AssetClass, number]
      >) {
        if (val > 0) {
          slices.push({
            name: getAssetClassLabel(assetClass),
            value: val,
            color: ASSET_CLASS_COLORS[assetClass],
          })
        }
      }
      return slices.toSorted((a, b) => b.value - a.value)
    }

    const slices: Array<{ name: string; value: number; color: string }> = []
    for (const row of savingsRows) {
      if ((row.effectiveBalanceCents ?? 0) > 0) {
        slices.push({
          name: row.account.name,
          value: row.effectiveBalanceCents ?? 0,
          color: row.account.color ?? "#f97316",
        })
      }
    }
    for (const [accId, data] of Object.entries(investmentsSummary.byAccount)) {
      if (data.valueEurCents > 0) {
        const acc = invAccountById.get(Number(accId))
        slices.push({
          name: acc?.name ?? `#${accId}`,
          value: data.valueEurCents,
          color: acc?.color ?? "#10b981",
        })
      }
    }
    return slices.toSorted((a, b) => b.value - a.value)
  })()

  return (
    <div className="flex flex-col gap-5">
      {savingsSummary.missingAccounts.length > 0 && (
        <Card className="border-amber-500/40 bg-amber-500/10">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 py-2.5">
            <div className="flex items-center gap-2 text-xs">
              <AlertTriangleIcon className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>
                {m.overview_missing_snapshots_notice({
                  count: savingsSummary.missingAccounts.length,
                  month: formatMonthLabel(monthId),
                })}
              </span>
            </div>
            <Button size="sm" variant="outline" onClick={onGoToSavings}>
              <span>{m.overview_go_to_savings()}</span>
              <ArrowRightIcon className="size-3.5" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Global KPI Strip */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="py-4">
            <p className="text-xs text-muted-foreground">{m.overview_net_worth()}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
              {formatCents(netWorthTotal)}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">{m.overview_net_worth_sub()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <p className="text-xs text-muted-foreground">{m.overview_liquid_savings()}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
              {formatCents(savingsTotal)}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground tabular-nums">
              {m.overview_liquid_savings_sub({ percent: savingsPct })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <p className="text-xs text-muted-foreground">{m.overview_investments()}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
              {formatCents(investmentsTotal)}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground tabular-nums">
              {m.overview_investments_sub({ percent: investmentsPct })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <p className="text-xs text-muted-foreground">{m.overview_unrealized_gain()}</p>
            <div className="mt-1 flex items-baseline gap-2">
              <p
                className={cn(
                  "text-2xl font-semibold tracking-tight tabular-nums",
                  investmentsSummary.totalUnrealizedGainEurCents > 0 &&
                    "text-emerald-600 dark:text-emerald-400",
                  investmentsSummary.totalUnrealizedGainEurCents < 0 && "text-destructive",
                )}
              >
                {investmentsSummary.totalInvestedEurCents > 0
                  ? formatCents(investmentsSummary.totalUnrealizedGainEurCents, { signed: true })
                  : "—"}
              </p>
              {investmentsSummary.totalUnrealizedGainPercent !== null && (
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
                    investmentsSummary.totalUnrealizedGainEurCents >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-destructive",
                  )}
                >
                  {investmentsSummary.totalUnrealizedGainEurCents >= 0 ? (
                    <TrendingUpIcon className="size-3.5" />
                  ) : (
                    <TrendingDownIcon className="size-3.5" />
                  )}
                  {formatPercentSigned(investmentsSummary.totalUnrealizedGainPercent)}
                </span>
              )}
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground tabular-nums">
              {m.overview_invested_sub({
                amount: formatCents(investmentsSummary.totalInvestedEurCents),
              })}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle>{m.overview_evolution_title()}</CardTitle>
            <span className="text-xs text-muted-foreground">{m.overview_evolution_12m()}</span>
          </CardHeader>
          <CardContent>
            {netWorthTimeline.length > 0 ? (
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={netWorthTimeline}
                    margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => formatCompactAxis(typeof v === "number" ? v : 0)}
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      width={58}
                    />
                    <Tooltip
                      formatter={(val, name) => [
                        formatCents(typeof val === "number" ? val : 0),
                        name === "savingsCents"
                          ? m.overview_liquid_savings()
                          : m.overview_investments(),
                      ]}
                      contentStyle={{
                        backgroundColor: "var(--popover)",
                        borderColor: "var(--border)",
                        color: "var(--popover-foreground)",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      stackId="1"
                      dataKey="savingsCents"
                      name="savingsCents"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.28}
                      strokeWidth={1.5}
                      isAnimationActive={false}
                    />
                    <Area
                      type="monotone"
                      stackId="1"
                      dataKey="investmentsCents"
                      name="investmentsCents"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.28}
                      strokeWidth={1.5}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-60 items-center justify-center text-xs text-muted-foreground">
                {m.overview_evolution_empty()}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle>{m.overview_allocation_title()}</CardTitle>
            {netWorthTotal > 0 && (
              <div className="flex items-center border bg-muted/40 p-0.5">
                <Button
                  type="button"
                  size="sm"
                  variant={allocMode === "envelopes" ? "secondary" : "ghost"}
                  className="h-6 px-2 text-[11px]"
                  onClick={() => setAllocMode("envelopes")}
                >
                  {m.overview_mode_envelopes()}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={allocMode === "classes" ? "secondary" : "ghost"}
                  className="h-6 px-2 text-[11px]"
                  onClick={() => setAllocMode("classes")}
                >
                  {m.overview_mode_classes()}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            {allocationSlices.length > 0 ? (
              <>
                <div className="relative h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationSlices}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={58}
                        outerRadius={84}
                        paddingAngle={2}
                        strokeWidth={0}
                        isAnimationActive={false}
                      >
                        {allocationSlices.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val) => formatCents(typeof val === "number" ? val : 0)}
                        contentStyle={{
                          backgroundColor: "var(--popover)",
                          borderColor: "var(--border)",
                          color: "var(--popover-foreground)",
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[11px] text-muted-foreground">
                      {m.overview_net_worth()}
                    </span>
                    <span className="text-sm font-semibold tabular-nums">
                      {formatCents(netWorthTotal)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs">
                  {allocationSlices.map((item) => {
                    const pct =
                      netWorthTotal > 0 ? Math.round((item.value / netWorthTotal) * 100) : 0
                    return (
                      <div key={item.name} className="flex items-center gap-1.5">
                        <span
                          className="inline-block size-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-muted-foreground">{item.name}</span>
                        <span className="font-medium tabular-nums">{formatCents(item.value)}</span>
                        <span className="text-[11px] text-muted-foreground tabular-nums">
                          ({pct}%)
                        </span>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="flex h-52 items-center justify-center text-xs text-muted-foreground">
                {m.overview_allocation_empty()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
