import { useState } from "react"
import {
  Area,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
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
import type { AssetAccountLike } from "@/lib/assets/calculations"
import { formatCents } from "@/lib/budget/calculations"
import type { AssetClass } from "@/lib/db/schema"
import type {
  InvestmentPosition,
  InvestmentsSummary,
  InvestmentsTimelinePoint,
} from "@/lib/investments/calculations"
import { m } from "@/paraglide/messages"

type InvestmentsChartsProps = {
  accounts: Array<AssetAccountLike>
  positions: Array<InvestmentPosition>
  summary: InvestmentsSummary
  timeline: Array<InvestmentsTimelinePoint>
}

const SLICE_PALETTE = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#14b8a6",
  "#ec4899",
  "#ef4444",
  "#64748b",
]

const formatCompactAxis = (cents: number): string => {
  const euros = cents / 100
  if (Math.abs(euros) >= 1000) {
    const k = euros / 1000
    return `${Number.isInteger(k) ? k : k.toFixed(1)}k €`
  }
  return `${Math.round(euros)} €`
}

export const InvestmentsCharts = ({
  accounts,
  positions,
  summary,
  timeline,
}: InvestmentsChartsProps) => {
  const [allocMode, setAllocMode] = useState<"security" | "account" | "class">("security")

  const accountById = new Map(accounts.map((a) => [a.id, a]))

  const allocationSlices = (() => {
    if (allocMode === "account") {
      return Object.entries(summary.byAccount)
        .filter(([, data]) => data.valueEurCents > 0)
        .map(([accId, data], idx) => {
          const acc = accountById.get(Number(accId))
          return {
            name: acc?.name ?? `#${accId}`,
            value: data.valueEurCents,
            color: acc?.color ?? SLICE_PALETTE[idx % SLICE_PALETTE.length]!,
          }
        })
        .toSorted((a, b) => b.value - a.value)
    }

    if (allocMode === "class") {
      return (Object.entries(summary.byAssetClass) as Array<[AssetClass, number]>)
        .filter(([, value]) => value > 0)
        .map(([assetClass, value]) => ({
          name: getAssetClassLabel(assetClass),
          value,
          color: ASSET_CLASS_COLORS[assetClass],
        }))
        .toSorted((a, b) => b.value - a.value)
    }

    // Group by security across accounts
    const bySecurity = new Map<string, { name: string; value: number }>()
    for (const pos of positions) {
      if (pos.marketValueEurCents <= 0) continue
      const label = pos.security.pricingMode === "manual" ? pos.security.name : pos.security.symbol
      const existing = bySecurity.get(pos.security.symbol)
      if (existing) {
        existing.value += pos.marketValueEurCents
      } else {
        bySecurity.set(pos.security.symbol, { name: label, value: pos.marketValueEurCents })
      }
    }
    return Array.from(bySecurity.values())
      .toSorted((a, b) => b.value - a.value)
      .map((item, idx) => ({
        ...item,
        color: SLICE_PALETTE[idx % SLICE_PALETTE.length]!,
      }))
  })()

  return (
    <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle>{m.inv_chart_evolution()}</CardTitle>
        </CardHeader>
        <CardContent>
          {timeline.length > 0 ? (
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={timeline} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
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
                      name === "valueCents" ? m.inv_chart_value() : m.inv_chart_invested(),
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
                    dataKey="valueCents"
                    name="valueCents"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.18}
                    strokeWidth={2}
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="investedCents"
                    name="investedCents"
                    stroke="#64748b"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    dot={false}
                    isAnimationActive={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-60 items-center justify-center text-xs text-muted-foreground">
              {m.inv_chart_empty()}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
          <CardTitle>{m.inv_chart_allocation()}</CardTitle>
          {positions.length > 0 && (
            <div className="flex items-center border bg-muted/40 p-0.5">
              <Button
                type="button"
                size="sm"
                variant={allocMode === "security" ? "secondary" : "ghost"}
                className="h-6 px-2 text-[11px]"
                onClick={() => setAllocMode("security")}
              >
                {m.inv_chart_by_security()}
              </Button>
              <Button
                type="button"
                size="sm"
                variant={allocMode === "account" ? "secondary" : "ghost"}
                className="h-6 px-2 text-[11px]"
                onClick={() => setAllocMode("account")}
              >
                {m.inv_chart_by_account()}
              </Button>
              <Button
                type="button"
                size="sm"
                variant={allocMode === "class" ? "secondary" : "ghost"}
                className="h-6 px-2 text-[11px]"
                onClick={() => setAllocMode("class")}
              >
                {m.inv_chart_by_class()}
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
                    {m.inv_kpi_total_value()}
                  </span>
                  <span className="text-sm font-semibold tabular-nums">
                    {formatCents(summary.totalValueEurCents)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs">
                {allocationSlices.map((item) => {
                  const pct =
                    summary.totalValueEurCents > 0
                      ? Math.round((item.value / summary.totalValueEurCents) * 100)
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
              {m.inv_chart_empty_allocation()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
