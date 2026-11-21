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
import { m } from "@/paraglide/messages"

type SummaryCardProps = {
  summary: MonthSummary
}

export const SummaryCard = ({ summary }: SummaryCardProps) => {
  const rows = [
    {
      key: "income",
      label: m.summary_income(),
      budget: summary.income.budgetCents,
      actual: summary.income.actualCents,
      isPositiveGood: true,
    },
    {
      key: "bills",
      label: m.summary_bills_share(),
      budget: summary.bills.budgetCents,
      actual: summary.bills.actualCents,
      isPositiveGood: false,
    },
    {
      key: "expenses",
      label: m.summary_expenses_share(),
      budget: summary.expenses.budgetCents,
      actual: summary.expenses.actualCents,
      isPositiveGood: false,
    },
    {
      key: "savings",
      label: m.summary_savings(),
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
        <CardTitle>{m.summary_title()}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{m.summary_section()}</TableHead>
              <TableHead className="text-right">{m.common_budget()}</TableHead>
              <TableHead className="text-right">{m.common_actual()}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const over = !row.isPositiveGood && row.actual > row.budget && row.budget > 0
              return (
                <TableRow key={row.key}>
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
              <TableCell>{m.summary_remaining()}</TableCell>
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
