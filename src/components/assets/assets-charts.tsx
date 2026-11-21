import { useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type {
  AssetAccountLike,
  AssetAccountMonthRow,
  AssetsMonthSummary,
  AssetsTimelinePoint,
} from "@/lib/assets/calculations"
import { formatCents } from "@/lib/budget/calculations"
import { m } from "@/paraglide/messages"

type AssetsChartsProps = {
  accounts: Array<AssetAccountLike>
  rows: Array<AssetAccountMonthRow>
  summary: AssetsMonthSummary
  timeline: Array<AssetsTimelinePoint>
  selectedMonthId: string
}

const formatCompactAxis = (cents: number): string => {
  const euros = cents / 100
  if (Math.abs(euros) >= 1000) {
    const k = euros / 1000
    return `${Number.isInteger(k) ? k : k.toFixed(1)}k €`
  }
  return `${Math.round(euros)} €`
}

export const AssetsCharts = ({
  accounts,
  rows,
  summary,
  timeline,
  selectedMonthId,
}: AssetsChartsProps) => {
  const [chartMode, setChartMode] = useState<"total" | "accounts">("total")

  const chartData = timeline.map((point) => {
    const flat: Record<string, number | string> = {
      monthId: point.monthId,
      label: point.label,
      total: point.totalCents,
    }
    for (const account of accounts) {
      flat[`acc_${account.id}`] = point.byAccount[account.id] ?? 0
    }
    return flat
  })

  const selectedLabel = timeline.find((p) => p.monthId === selectedMonthId)?.label

  const allocationSlices = rows
    .filter((row) => (row.effectiveBalanceCents ?? 0) > 0)
    .map((row) => ({
      name: row.account.name,
      value: row.effectiveBalanceCents ?? 0,
      color: row.account.color ?? "#64748b",
    }))
    .toSorted((a, b) => b.value - a.value)

  return (
    <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
          <CardTitle>{m.assets_chart_evolution()}</CardTitle>
          {timeline.length > 0 && accounts.length > 1 && (
            <div className="flex items-center border bg-muted/40 p-0.5">
              <Button
                type="button"
                size="sm"
                variant={chartMode === "total" ? "secondary" : "ghost"}
                className="h-6 px-2 text-[11px]"
                onClick={() => setChartMode("total")}
              >
                {m.assets_chart_mode_total()}
              </Button>
              <Button
                type="button"
                size="sm"
                variant={chartMode === "accounts" ? "secondary" : "ghost"}
                className="h-6 px-2 text-[11px]"
                onClick={() => setChartMode("accounts")}
              >
                {m.assets_chart_mode_accounts()}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
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
                      name === "total" ? m.assets_chart_total_savings() : String(name),
                    ]}
                    contentStyle={{
                      backgroundColor: "var(--popover)",
                      borderColor: "var(--border)",
                      color: "var(--popover-foreground)",
                      fontSize: "12px",
                    }}
                  />
                  {selectedLabel && (
                    <ReferenceLine
                      x={selectedLabel}
                      stroke="var(--primary)"
                      strokeDasharray="4 4"
                      strokeOpacity={0.7}
                    />
                  )}
                  {chartMode === "total" ? (
                    <Area
                      type="monotone"
                      dataKey="total"
                      name="total"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.18}
                      strokeWidth={2}
                      isAnimationActive={false}
                    />
                  ) : (
                    accounts.map((account) => {
                      const stroke = account.color ?? "#64748b"
                      return (
                        <Area
                          key={account.id}
                          type="monotone"
                          stackId="1"
                          dataKey={`acc_${account.id}`}
                          name={account.name}
                          stroke={stroke}
                          fill={stroke}
                          fillOpacity={0.35}
                          strokeWidth={1.5}
                          isAnimationActive={false}
                        />
                      )
                    })
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-60 items-center justify-center text-xs text-muted-foreground">
              {m.assets_chart_empty_evolution()}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle>{m.assets_chart_allocation()}</CardTitle>
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
                    {m.assets_chart_total_savings()}
                  </span>
                  <span className="text-sm font-semibold tabular-nums">
                    {formatCents(summary.totalEffectiveCents)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs">
                {allocationSlices.map((item) => {
                  const pct =
                    summary.totalEffectiveCents > 0
                      ? Math.round((item.value / summary.totalEffectiveCents) * 100)
                      : 0
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
              {m.assets_chart_empty_allocation()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
