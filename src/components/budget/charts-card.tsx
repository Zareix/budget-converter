import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { MonthSummary } from "@/lib/budget/calculations"
import { formatCents } from "@/lib/budget/calculations"

type CategoryItem = {
  slug: string
  label: string
  color: string | null
}

type ChartsCardProps = {
  summary: MonthSummary
  categories: Array<CategoryItem>
}

type SliceDatum = {
  name: string
  value: number
  color: string
}

const BUDGET_SLICE_COLORS = {
  bills: "#3b82f6",
  expenses: "#f97316",
  savings: "#10b981",
}

const DonutWithCenter = ({
  title,
  data,
  centerLabel,
  centerValue,
  centerNegative,
  emptyText,
}: {
  title: string
  data: Array<SliceDatum>
  centerLabel: string
  centerValue: string
  centerNegative?: boolean
  emptyText: string
}) => {
  const hasData = data.length > 0

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        {hasData ? (
          <>
            <div className="relative h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
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
                    {data.map((entry) => (
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
                <span className="text-[11px] text-muted-foreground">{centerLabel}</span>
                <span
                  className={
                    centerNegative
                      ? "text-sm font-semibold text-destructive tabular-nums"
                      : "text-sm font-semibold tabular-nums"
                  }
                >
                  {centerValue}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs">
              {data.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span
                    className="inline-block size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium tabular-nums">{formatCents(item.value)}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-52 items-center justify-center text-xs text-muted-foreground">
            {emptyText}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export const ChartsCard = ({ summary, categories }: ChartsCardProps) => {
  const budgetSlices: Array<SliceDatum> = [
    { name: "Bills", value: summary.bills.budgetCents, color: BUDGET_SLICE_COLORS.bills },
    { name: "Expenses", value: summary.expenses.budgetCents, color: BUDGET_SLICE_COLORS.expenses },
    { name: "Savings", value: summary.savings.budgetCents, color: BUDGET_SLICE_COLORS.savings },
  ].filter((s) => s.value > 0)

  const expenseSlices: Array<SliceDatum> = categories
    .map((cat) => {
      const actual = summary.byCategory[cat.slug]?.actualCents ?? 0
      return {
        name: cat.label,
        value: actual,
        color: cat.color ?? "#64748b",
      }
    })
    .filter((s) => s.value > 0)
    .toSorted((a, b) => b.value - a.value)

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <DonutWithCenter
        title="Monthly Budget"
        data={budgetSlices}
        centerLabel="Remaining"
        centerValue={formatCents(summary.remaining.budgetCents)}
        centerNegative={summary.remaining.budgetCents < 0}
        emptyText="Add bills, envelopes, or savings to see your budget breakdown."
      />
      <DonutWithCenter
        title="Monthly Expenses"
        data={expenseSlices}
        centerLabel="Total Spent"
        centerValue={formatCents(summary.expenses.actualCents)}
        emptyText="No expenses recorded for this month yet."
      />
    </div>
  )
}
