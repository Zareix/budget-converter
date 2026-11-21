import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router"
import { ArrowRightIcon, CopyPlusIcon } from "lucide-react"
import { toast } from "sonner"
import * as v from "valibot"

import { BillsCard } from "@/components/budget/bills-card"
import { ChartsCard } from "@/components/budget/charts-card"
import { EnvelopesCard } from "@/components/budget/envelopes-card"
import { IncomesCard } from "@/components/budget/incomes-card"
import { MonthHeader } from "@/components/budget/month-header"
import { SavingsCard } from "@/components/budget/savings-card"
import { SummaryCard } from "@/components/budget/summary-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getDefaultMonthId, usePersistActiveMonth } from "@/hooks/use-active-month"
import { formatMonthLabel, isValidMonthId } from "@/lib/budget/calculations"
import { cloneMonth, getMonthDashboard, listMonths } from "@/lib/server/budget"
import { m } from "@/paraglide/messages"

export const Route = createFileRoute("/")({
  component: BudgetDashboard,
  validateSearch: v.object({
    month: v.optional(v.string()),
  }),
})

function BudgetDashboard() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: "/" })
  const queryClient = useQueryClient()

  const monthId = search.month && isValidMonthId(search.month) ? search.month : getDefaultMonthId()
  usePersistActiveMonth(monthId)

  const handleSelectMonth = (nextMonthId: string) => {
    navigate({ search: { month: nextMonthId } })
  }

  const dashboardQuery = useQuery({
    queryKey: ["budget", monthId],
    queryFn: () => getMonthDashboard({ data: { monthId } }),
  })

  const monthsQuery = useQuery({
    queryKey: ["months"],
    queryFn: listMonths,
  })

  const latestOtherMonth = (monthsQuery.data ?? []).find((item) => item.id !== monthId)

  const quickCloneMutation = useMutation({
    mutationKey: ["quickCloneMonth", monthId],
    mutationFn: (sourceMonthId: string) =>
      cloneMonth({ data: { sourceMonthId, targetMonthId: monthId } }),
    onSuccess: (_res, sourceMonthId) => {
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
      queryClient.invalidateQueries({ queryKey: ["months"] })
      toast.success(
        m.dashboard_cloned_toast({
          source: formatMonthLabel(sourceMonthId),
          target: formatMonthLabel(monthId),
        }),
      )
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.dashboard_clone_error())
    },
  })

  const data = dashboardQuery.data

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6">
      <MonthHeader
        monthId={monthId}
        onSelectMonth={handleSelectMonth}
        rightSlot={
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link to="/transactions" search={{ month: monthId }} />}
          >
            <span>
              {data
                ? m.dashboard_transactions_button_count({ count: data.transactionsCount })
                : m.dashboard_transactions_button()}
            </span>
            <ArrowRightIcon className="size-3.5" />
          </Button>
        }
      />

      {dashboardQuery.isLoading ? (
        <div className="py-16 text-center text-sm text-muted-foreground">
          {m.dashboard_loading()}
        </div>
      ) : dashboardQuery.isError || !data ? (
        <div className="py-16 text-center text-sm text-destructive">
          {m.dashboard_load_error({
            message:
              dashboardQuery.error instanceof Error
                ? dashboardQuery.error.message
                : m.common_unknown_error(),
          })}
        </div>
      ) : (
        <>
          {!data.exists && latestOtherMonth && (
            <Card className="border-dashed bg-muted/30">
              <CardContent className="flex flex-wrap items-center justify-between gap-3 py-3">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{formatMonthLabel(monthId)}</span>{" "}
                  {m.dashboard_empty_banner_part1()}{" "}
                  <span className="font-medium text-foreground">
                    {formatMonthLabel(latestOtherMonth.id)}
                  </span>{" "}
                  {m.dashboard_empty_banner_part2()}
                </p>
                <Button
                  size="sm"
                  onClick={() => quickCloneMutation.mutate(latestOtherMonth.id)}
                  disabled={quickCloneMutation.isPending}
                >
                  <CopyPlusIcon className="size-3.5" />
                  {quickCloneMutation.isPending
                    ? m.dashboard_cloning()
                    : m.dashboard_clone_from({ source: formatMonthLabel(latestOtherMonth.id) })}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Row 1: Summary + Charts */}
          <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
            <SummaryCard summary={data.summary} />
            <ChartsCard summary={data.summary} categories={data.categories} />
          </div>

          {/* Row 2: Incomes & Savings + Budgeted Expenses (Envelopes) */}
          <div className="grid items-start gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col gap-5">
              <IncomesCard monthId={monthId} incomes={data.incomes} summary={data.summary} />
              <SavingsCard monthId={monthId} savings={data.savings} summary={data.summary} />
            </div>
            <EnvelopesCard monthId={monthId} categories={data.categories} summary={data.summary} />
          </div>

          {/* Row 3: Bills */}
          <BillsCard
            monthId={monthId}
            bills={data.bills}
            accounts={data.accounts}
            summary={data.summary}
          />
        </>
      )}
    </div>
  )
}
