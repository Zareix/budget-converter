import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { toast } from "sonner"

import { InlineAmountInput } from "@/components/budget/inline-amount-input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { MonthSummary } from "@/lib/budget/calculations"
import { formatCents } from "@/lib/budget/calculations"
import { upsertCategoryBudget } from "@/lib/server/budget"
import { cn } from "@/lib/utils"
import { m } from "@/paraglide/messages"

type CategoryItem = {
  id: number
  slug: string
  label: string
  color: string | null
}

type EnvelopesCardProps = {
  monthId: string
  categories: Array<CategoryItem>
  summary: MonthSummary
}

export const EnvelopesCard = ({ monthId, categories, summary }: EnvelopesCardProps) => {
  const queryClient = useQueryClient()

  const upsertMutation = useMutation({
    mutationKey: ["upsertCategoryBudget", monthId],
    mutationFn: ({ categorySlug, budgetCents }: { categorySlug: string; budgetCents: number }) =>
      upsertCategoryBudget({
        data: { monthId, categorySlug, budgetCents: Math.max(0, budgetCents) },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
      queryClient.invalidateQueries({ queryKey: ["months"] })
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.envelopes_update_error())
    },
  })

  const totalRemaining = summary.expenses.budgetCents - summary.expenses.actualCents

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{m.envelopes_title()}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{m.common_category()}</TableHead>
              <TableHead className="text-right">{m.common_budget()}</TableHead>
              <TableHead className="text-right">{m.common_actual()}</TableHead>
              <TableHead className="text-right">{m.envelopes_left()}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => {
              const stats = summary.byCategory[cat.slug] ?? {
                categorySlug: cat.slug,
                budgetCents: 0,
                actualCents: 0,
                remainingCents: 0,
                overBudget: false,
              }
              const pct =
                stats.budgetCents > 0
                  ? Math.min(100, Math.max(0, (stats.actualCents / stats.budgetCents) * 100))
                  : stats.actualCents > 0
                    ? 100
                    : 0

              return (
                <TableRow key={cat.slug}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Link
                        to="/transactions"
                        search={{ month: monthId, category: cat.slug }}
                        className="flex items-center gap-2 font-medium hover:underline"
                      >
                        <span
                          className="inline-block size-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: cat.color ?? "#64748b" }}
                        />
                        <span>{cat.label}</span>
                      </Link>
                      {(stats.budgetCents > 0 || stats.actualCents > 0) && (
                        <div className="h-1 w-full overflow-hidden bg-muted">
                          <div
                            className={cn(
                              "h-full transition-all",
                              stats.overBudget ? "bg-destructive" : "bg-emerald-500",
                            )}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <InlineAmountInput
                      cents={stats.budgetCents}
                      onSave={(next) =>
                        upsertMutation.mutate({
                          categorySlug: cat.slug,
                          budgetCents: next ?? 0,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-medium tabular-nums",
                      stats.overBudget
                        ? "text-destructive"
                        : stats.actualCents > 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-muted-foreground",
                    )}
                  >
                    {formatCents(stats.actualCents)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right text-xs tabular-nums",
                      stats.remainingCents < 0 ? "text-destructive" : "text-muted-foreground",
                    )}
                  >
                    {formatCents(stats.remainingCents)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>{m.common_total()}</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCents(summary.expenses.budgetCents)}
              </TableCell>
              <TableCell
                className={cn(
                  "text-right tabular-nums",
                  summary.expenses.actualCents > summary.expenses.budgetCents
                    ? "text-destructive"
                    : "text-emerald-600 dark:text-emerald-400",
                )}
              >
                {formatCents(summary.expenses.actualCents)}
              </TableCell>
              <TableCell
                className={cn(
                  "text-right tabular-nums",
                  totalRemaining < 0 ? "text-destructive" : "",
                )}
              >
                {formatCents(totalRemaining)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}
