import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  AlertTriangleIcon,
  ChevronDownIcon,
  EditIcon,
  PlusIcon,
  RefreshCwIcon,
  TrashIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  UploadIcon,
} from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"

import { FortuneoImportDialog } from "@/components/investments/fortuneo-import-dialog"
import { InvestmentAccountDialog } from "@/components/investments/investment-account-dialog"
import { InvestmentsCharts } from "@/components/investments/investments-charts"
import { OperationDialog } from "@/components/investments/operation-dialog"
import { OperationsTable } from "@/components/investments/operations-table"
import { PositionsTable } from "@/components/investments/positions-table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { AssetAccountLike } from "@/lib/assets/calculations"
import { formatPercentSigned } from "@/lib/assets/calculations"
import { formatCents } from "@/lib/budget/calculations"
import type {
  InvestmentTransactionLike,
  SecurityLike,
  SecurityMonthlyPriceLike,
  SecurityQuoteLike,
} from "@/lib/investments/calculations"
import {
  computeInvestmentsPortfolio,
  computeInvestmentsTimeline,
} from "@/lib/investments/calculations"
import { deleteAccount } from "@/lib/server/budget"
import { refreshAllInvestmentQuotes } from "@/lib/server/investments"
import { cn } from "@/lib/utils"
import { m } from "@/paraglide/messages"

type InvestmentsTabProps = {
  accounts: Array<AssetAccountLike>
  securities: Array<SecurityLike>
  transactions: Array<InvestmentTransactionLike>
  quotes: Array<SecurityQuoteLike>
  monthlyPrices: Array<SecurityMonthlyPriceLike>
}

const formatTimeAgo = (iso: string): string => {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}

export const InvestmentsTab = ({
  accounts,
  securities,
  transactions,
  quotes,
  monthlyPrices,
}: InvestmentsTabProps) => {
  const queryClient = useQueryClient()
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null)
  const [fortuneoImportOpen, setFortuneoImportOpen] = useState(false)
  const [opDialogOpen, setOpDialogOpen] = useState(false)
  const [opDefaults, setOpDefaults] = useState<{
    accountId: number | null
    securityId: number | null
    editingTx: InvestmentTransactionLike | null
  }>({ accountId: null, securityId: null, editingTx: null })

  const { positions, summary } = useMemo(
    () =>
      computeInvestmentsPortfolio({
        accounts,
        securities,
        transactions,
        quotes,
        accountFilterId: selectedAccountId,
      }),
    [accounts, securities, transactions, quotes, selectedAccountId],
  )

  const timeline = useMemo(
    () =>
      computeInvestmentsTimeline({
        accounts,
        securities,
        transactions,
        quotes,
        monthlyPrices,
        accountFilterId: selectedAccountId,
      }),
    [accounts, securities, transactions, quotes, monthlyPrices, selectedAccountId],
  )

  const filteredTransactions = useMemo(
    () =>
      selectedAccountId
        ? transactions.filter((tx) => tx.accountId === selectedAccountId)
        : transactions,
    [transactions, selectedAccountId],
  )

  const refreshMutation = useMutation({
    mutationKey: ["refreshAllInvestmentQuotes"],
    mutationFn: () => refreshAllInvestmentQuotes({ data: { force: true, includeHistory: true } }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["investments"] })
      if (res.failed.length > 0) {
        toast.warning(
          m.inv_refresh_partial_toast({ updated: res.updated, failed: res.failed.length }),
        )
      } else {
        toast.success(m.inv_refresh_toast({ count: res.updated }))
      }
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.inv_refresh_error())
    },
  })

  const deleteAccountMutation = useMutation({
    mutationKey: ["deleteInvestmentAccount"],
    mutationFn: (id: number) => deleteAccount({ data: { id } }),
    onSuccess: () => {
      setSelectedAccountId(null)
      queryClient.invalidateQueries({ queryKey: ["investments"] })
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      queryClient.invalidateQueries({ queryKey: ["budget"] })
      toast.success(m.inv_account_deleted_toast())
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.assets_account_delete_error())
    },
  })

  const openNewOperation = (
    accountId: number | null = selectedAccountId,
    securityId: number | null = null,
  ) => {
    setOpDefaults({ accountId, securityId, editingTx: null })
    setOpDialogOpen(true)
  }

  const openEditOperation = (tx: InvestmentTransactionLike) => {
    setOpDefaults({ accountId: tx.accountId, securityId: tx.securityId, editingTx: tx })
    setOpDialogOpen(true)
  }

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId) ?? null

  if (accounts.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <TrendingUpIcon className="size-5" />
          </span>
          <div>
            <p className="text-sm font-medium">{m.inv_empty_accounts_title()}</p>
            <p className="mt-1 max-w-md text-xs text-muted-foreground">
              {m.inv_empty_accounts_desc()}
            </p>
          </div>
          <InvestmentAccountDialog
            trigger={
              <Button size="sm" className="mt-1">
                <PlusIcon className="size-3.5" />
                {m.inv_add_account()}
              </Button>
            }
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar: Account filters + Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            type="button"
            size="sm"
            variant={selectedAccountId === null ? "secondary" : "outline"}
            className="h-8 text-xs"
            onClick={() => setSelectedAccountId(null)}
          >
            {m.inv_all_accounts()}
          </Button>
          {accounts.map((acc) => (
            <Button
              key={acc.id}
              type="button"
              size="sm"
              variant={selectedAccountId === acc.id ? "secondary" : "outline"}
              className="h-8 gap-1.5 text-xs"
              onClick={() => setSelectedAccountId(acc.id)}
            >
              <span
                className="inline-block size-2 shrink-0 rounded-full"
                style={{ backgroundColor: acc.color ?? "#64748b" }}
              />
              <span>{acc.name}</span>
            </Button>
          ))}
          {selectedAccount && (
            <div className="ml-1 flex items-center gap-0.5">
              <InvestmentAccountDialog
                account={selectedAccount}
                trigger={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={m.inv_edit_account()}
                    title={m.inv_edit_account()}
                  >
                    <EditIcon className="size-3.5" />
                  </Button>
                }
              />
              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={m.assets_delete_account_aria()}
                    >
                      <TrashIcon className="size-3.5 text-destructive" />
                    </Button>
                  }
                />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {m.inv_account_delete_confirm_title({ name: selectedAccount.name })}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {m.inv_account_delete_confirm_desc()}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{m.common_cancel()}</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={() => deleteAccountMutation.mutate(selectedAccount.id)}
                    >
                      {m.common_delete()}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {summary.latestQuoteFetchedAt && (
            <span className="text-[11px] text-muted-foreground">
              {m.inv_quotes_updated_at({ time: formatTimeAgo(summary.latestQuoteFetchedAt) })}
            </span>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <UploadIcon className="size-3.5" />
                  <span>{m.common_import()}</span>
                  <ChevronDownIcon className="size-3 opacity-70" />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFortuneoImportOpen(true)}>
                {m.inv_fortuneo_dropdown_item()}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refreshMutation.mutate()}
            disabled={refreshMutation.isPending || securities.length === 0}
          >
            <RefreshCwIcon
              className={cn("size-3.5", refreshMutation.isPending && "animate-spin")}
            />
            {refreshMutation.isPending ? m.inv_refreshing() : m.inv_refresh_quotes()}
          </Button>
          <InvestmentAccountDialog
            trigger={
              <Button variant="outline" size="sm">
                <PlusIcon className="size-3.5" />
                {m.inv_add_account()}
              </Button>
            }
          />
          <Button size="sm" onClick={() => openNewOperation()}>
            <PlusIcon className="size-3.5" />
            {m.inv_add_operation()}
          </Button>
        </div>
      </div>

      {/* Missing quotes notice */}
      {summary.missingQuotesCount > 0 && (
        <Card className="border-amber-500/40 bg-amber-500/10">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 py-2.5">
            <div className="flex items-center gap-2 text-xs">
              <AlertTriangleIcon className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>{m.inv_quotes_missing_banner({ count: summary.missingQuotesCount })}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => refreshMutation.mutate()}
              disabled={refreshMutation.isPending}
            >
              <RefreshCwIcon
                className={cn("size-3.5", refreshMutation.isPending && "animate-spin")}
              />
              {m.inv_refresh_quotes()}
            </Button>
          </CardContent>
        </Card>
      )}

      {positions.length === 0 && filteredTransactions.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
            <span className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <TrendingUpIcon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-medium">{m.inv_empty_positions_title()}</p>
              <p className="mt-1 max-w-md text-xs text-muted-foreground">
                {m.inv_empty_positions_desc()}
              </p>
            </div>
            <Button size="sm" className="mt-1" onClick={() => openNewOperation()}>
              <PlusIcon className="size-3.5" />
              {m.inv_add_operation()}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* KPI Strip */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground">{m.inv_kpi_total_value()}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
                  {formatCents(summary.totalValueEurCents)}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {m.inv_kpi_positions_count({ count: summary.positionsCount })}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground">{m.inv_kpi_invested()}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
                  {formatCents(summary.totalInvestedEurCents)}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground tabular-nums">
                  {m.inv_kpi_realized_dividends({
                    realized: formatCents(summary.totalRealizedGainEurCents, { signed: true }),
                    dividends: formatCents(summary.totalDividendsEurCents),
                  })}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground">{m.inv_kpi_unrealized()}</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <p
                    className={cn(
                      "text-2xl font-semibold tracking-tight tabular-nums",
                      summary.totalUnrealizedGainEurCents > 0 &&
                        "text-emerald-600 dark:text-emerald-400",
                      summary.totalUnrealizedGainEurCents < 0 && "text-destructive",
                    )}
                  >
                    {formatCents(summary.totalUnrealizedGainEurCents, { signed: true })}
                  </p>
                  {summary.totalUnrealizedGainPercent !== null && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
                        summary.totalUnrealizedGainEurCents >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-destructive",
                      )}
                    >
                      {summary.totalUnrealizedGainEurCents >= 0 ? (
                        <TrendingUpIcon className="size-3.5" />
                      ) : (
                        <TrendingDownIcon className="size-3.5" />
                      )}
                      {formatPercentSigned(summary.totalUnrealizedGainPercent)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground">{m.inv_kpi_day_change()}</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <p
                    className={cn(
                      "text-2xl font-semibold tracking-tight tabular-nums",
                      summary.totalDayChangeEurCents !== null &&
                        summary.totalDayChangeEurCents > 0 &&
                        "text-emerald-600 dark:text-emerald-400",
                      summary.totalDayChangeEurCents !== null &&
                        summary.totalDayChangeEurCents < 0 &&
                        "text-destructive",
                    )}
                  >
                    {summary.totalDayChangeEurCents !== null
                      ? formatCents(summary.totalDayChangeEurCents, { signed: true })
                      : "—"}
                  </p>
                  {summary.totalDayChangePercent !== null && (
                    <span
                      className={cn(
                        "text-xs font-medium tabular-nums",
                        summary.totalDayChangePercent >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-destructive",
                      )}
                    >
                      {formatPercentSigned(summary.totalDayChangePercent)}
                    </span>
                  )}
                </div>
                {summary.totalDayChangeEurCents === null && (
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {m.inv_kpi_day_change_na()}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <InvestmentsCharts
            accounts={accounts}
            positions={positions}
            summary={summary}
            timeline={timeline}
          />

          <PositionsTable
            positions={positions}
            summary={summary}
            onAddOperationForPosition={(accId, secId) => openNewOperation(accId, secId)}
            onOpenNewOperation={() => openNewOperation()}
          />

          <OperationsTable
            accounts={accounts}
            securities={securities}
            transactions={filteredTransactions}
            onEdit={openEditOperation}
          />
        </>
      )}

      <OperationDialog
        open={opDialogOpen}
        onOpenChange={setOpDialogOpen}
        accounts={accounts}
        securities={securities}
        defaultAccountId={opDefaults.accountId}
        defaultSecurityId={opDefaults.securityId}
        editingTx={opDefaults.editingTx}
      />

      <FortuneoImportDialog
        open={fortuneoImportOpen}
        onOpenChange={setFortuneoImportOpen}
        accounts={accounts}
        securities={securities}
        defaultAccountId={selectedAccountId}
      />
    </div>
  )
}
