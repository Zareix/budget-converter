import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EditIcon, TrashIcon } from "lucide-react"
import { toast } from "sonner"

import {
  formatNativePrice,
  formatQuantity,
  getInvestmentTxTypeLabel,
} from "@/components/investments/labels"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { AssetAccountLike } from "@/lib/assets/calculations"
import { formatCents } from "@/lib/budget/calculations"
import type { InvestmentTransactionLike, SecurityLike } from "@/lib/investments/calculations"
import { deleteInvestmentTransaction } from "@/lib/server/investments"
import { cn } from "@/lib/utils"
import { m } from "@/paraglide/messages"

type OperationsTableProps = {
  accounts: Array<AssetAccountLike>
  securities: Array<SecurityLike>
  transactions: Array<InvestmentTransactionLike>
  onEdit: (tx: InvestmentTransactionLike) => void
}

export const OperationsTable = ({
  accounts,
  securities,
  transactions,
  onEdit,
}: OperationsTableProps) => {
  const queryClient = useQueryClient()
  const accountById = new Map(accounts.map((a) => [a.id, a]))
  const securityById = new Map(securities.map((s) => [s.id, s]))

  const deleteMutation = useMutation({
    mutationKey: ["deleteInvestmentTransaction"],
    mutationFn: (id: number) => deleteInvestmentTransaction({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] })
      toast.success(m.inv_tx_deleted_toast())
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.inv_tx_delete_error())
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.inv_tx_title()}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{m.inv_tx_col_date()}</TableHead>
              <TableHead>{m.inv_col_account()}</TableHead>
              <TableHead>{m.inv_col_security()}</TableHead>
              <TableHead>{m.inv_tx_col_type()}</TableHead>
              <TableHead className="text-right">{m.inv_col_quantity()}</TableHead>
              <TableHead className="text-right">{m.inv_tx_col_unit_price()}</TableHead>
              <TableHead className="text-right">{m.inv_tx_col_fees()}</TableHead>
              <TableHead className="text-right">{m.inv_tx_col_total_eur()}</TableHead>
              <TableHead>{m.inv_tx_col_note()}</TableHead>
              <TableHead className="w-20 text-right">{m.common_actions()}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="py-6 text-center text-xs text-muted-foreground">
                  {m.inv_tx_empty()}
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => {
                const account = accountById.get(tx.accountId)
                const security = securityById.get(tx.securityId)
                return (
                  <TableRow key={tx.id}>
                    <TableCell className="text-xs text-muted-foreground tabular-nums">
                      {tx.date}
                    </TableCell>
                    <TableCell className="text-xs">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="inline-block size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: account?.color ?? "#64748b" }}
                        />
                        <span>{account?.name ?? `#${tx.accountId}`}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-medium">
                      {security
                        ? security.pricingMode === "manual"
                          ? security.name
                          : security.symbol
                        : `#${tx.securityId}`}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px]",
                          tx.type === "buy" &&
                            "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                          tx.type === "sell" &&
                            "border-orange-500/40 bg-orange-500/10 text-orange-700 dark:text-orange-300",
                          tx.type === "dividend" &&
                            "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300",
                        )}
                      >
                        {getInvestmentTxTypeLabel(tx.type)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs tabular-nums">
                      {formatQuantity(tx.quantity)}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground tabular-nums">
                      {security
                        ? formatNativePrice(tx.unitPriceCents / 100, security.currency)
                        : formatCents(tx.unitPriceCents)}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground tabular-nums">
                      {tx.feesCents > 0 ? formatCents(tx.feesCents) : "—"}
                    </TableCell>
                    <TableCell className="text-right text-xs font-medium tabular-nums">
                      {formatCents(tx.totalEurCents)}
                    </TableCell>
                    <TableCell className="max-w-36 truncate text-xs text-muted-foreground">
                      {tx.note || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={m.inv_edit_operation()}
                          onClick={() => onEdit(tx)}
                        >
                          <EditIcon className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={m.common_delete()}
                          onClick={() => deleteMutation.mutate(tx.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <TrashIcon className="size-3.5 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
