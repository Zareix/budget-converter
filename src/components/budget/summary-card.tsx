import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { MonthSummary } from "@/lib/budget/calculations"
import { formatCents } from "@/lib/budget/calculations"
import { cn } from "@/lib/utils"

type SummaryCardProps = {
  summary: MonthSummary
}

export const SummaryCard = ({ summary }: SummaryCardProps) => {
  const rows = [
    {
      label: "Income",
      budget: summary.income.budgetCents,
      actual: summary.income.actualCents,
      isPositiveGood: true,
    },
    {
      label: "Bills (Your share)",
      budget: summary.bills.budgetCents,
      actual: summary.bills.actualCents,
      isPositiveGood: false,
    },
    {
      label: "Expenses (Your share)",
      budget: summary.expenses.budgetCents,
      actual: summary.expenses.actualCents,
      isPositiveGood: false,
    },
    {
      label: "Savings",
      budget: summary.savings.budgetCents,
      actual: summary.savings.actualCents,
      isPositiveGood: true,
    },
  ]

  const remBudgetOk = summary.remaining.budgetCents >= 0
  const remActualOk = summary.remaining.actualCents >= 0

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Section</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead className="text-right">Actual</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const over = !row.isPositiveGood && row.actual > row.budget && row.budget > 0
              return (
                <TableRow key={row.label}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  <TableCell className="text-right text-muted-foreground tabular-nums">
                    {formatCents(row.budget)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-medium tabular-nums",
                      over && "text-destructive",
                    )}
                  >
                    {formatCents(row.actual)}
                  </TableCell>
                </TableRow>
              )
            })}
            <TableRow className="border-t-2 font-semibold">
              <TableCell>Remaining</TableCell>
              <TableCell
                className={cn(
                  "text-right tabular-nums",
                  remBudgetOk ? "text-emerald-600 dark:text-emerald-400" : "text-destructive",
                )}
              >
                {formatCents(summary.remaining.budgetCents)}
              </TableCell>
              <TableCell
                className={cn(
                  "text-right tabular-nums",
                  remActualOk ? "text-emerald-600 dark:text-emerald-400" : "text-destructive",
                )}
              >
                {formatCents(summary.remaining.actualCents)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
