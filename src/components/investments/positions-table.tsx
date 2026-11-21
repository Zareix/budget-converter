import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PlusIcon } from "lucide-react"
import { toast } from "sonner"

import { InlineAmountInput } from "@/components/budget/inline-amount-input"
import {
  formatNativePrice,
  formatQuantity,
  getAssetClassLabel,
} from "@/components/investments/labels"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { formatPercentSigned } from "@/lib/assets/calculations"
import { formatCents } from "@/lib/budget/calculations"
import type { InvestmentPosition, InvestmentsSummary } from "@/lib/investments/calculations"
import { updateSecurityManualPrice } from "@/lib/server/investments"
import { cn } from "@/lib/utils"
import { m } from "@/paraglide/messages"

type PositionsTableProps = {
  positions: Array<InvestmentPosition>
  summary: InvestmentsSummary
  onAddOperationForPosition: (accountId: number, securityId: number) => void
  onOpenNewOperation: () => void
}

export const PositionsTable = ({
  positions,
  summary,
  onAddOperationForPosition,
  onOpenNewOperation,
}: PositionsTableProps) => {
  const queryClient = useQueryClient()

  const manualPriceMutation = useMutation({
    mutationKey: ["updateSecurityManualPrice"],
    mutationFn: ({
      securityId,
      manualPriceCents,
    }: {
      securityId: number
      manualPriceCents: number
    }) => updateSecurityManualPrice({ data: { securityId, manualPriceCents } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] })
      toast.success(m.inv_manual_price_updated())
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.inv_manual_price_error())
    },
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>{m.inv_positions_title()}</CardTitle>
        <Button variant="outline" size="sm" onClick={onOpenNewOperation}>
          <PlusIcon className="size-3.5" />
          {m.inv_add_operation()}
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{m.inv_col_security()}</TableHead>
              <TableHead>{m.inv_col_account()}</TableHead>
              <TableHead className="text-right">{m.inv_col_quantity()}</TableHead>
              <TableHead className="text-right">{m.inv_col_avg_cost()}</TableHead>
              <TableHead className="text-right">{m.inv_col_price()}</TableHead>
              <TableHead className="text-right">{m.inv_col_value()}</TableHead>
              <TableHead className="text-right">{m.inv_col_pnl()}</TableHead>
              <TableHead className="text-right">{m.inv_col_weight()}</TableHead>
              <TableHead className="w-12 text-right" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((pos) => (
              <TableRow key={pos.key}>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium">
                        {pos.security.pricingMode === "manual"
                          ? pos.security.name
                          : pos.security.symbol}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {getAssetClassLabel(pos.security.assetClass)}
                      </Badge>
                      {pos.security.pricingMode === "manual" && (
                        <Badge variant="secondary" className="text-[10px]">
                          {m.inv_manual_badge()}
                        </Badge>
                      )}
                      {pos.isQuoteMissing && (
                        <Badge
                          variant="outline"
                          className="border-amber-500/40 bg-amber-500/10 text-[10px] text-amber-700 dark:text-amber-300"
                        >
                          {m.inv_no_quote_badge()}
                        </Badge>
                      )}
                    </div>
                    {pos.security.pricingMode === "yahoo" && (
                      <span className="max-w-60 truncate text-[11px] text-muted-foreground">
                        {pos.security.name}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span
                      className="inline-block size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: pos.account.color ?? "#64748b" }}
                    />
                    <span className="text-muted-foreground">{pos.account.name}</span>
                  </div>
                </TableCell>

                <TableCell className="text-right text-xs tabular-nums">
                  {pos.security.assetClass === "euro_fund" ? (
                    <span className="text-muted-foreground">—</span>
                  ) : (
                    formatQuantity(pos.quantity)
                  )}
                </TableCell>

                <TableCell className="text-right text-xs text-muted-foreground tabular-nums">
                  {pos.security.assetClass === "euro_fund" ? "—" : formatCents(pos.avgCostEurCents)}
                </TableCell>

                <TableCell className="text-right">
                  {pos.security.assetClass === "euro_fund" ? (
                    <span className="text-xs text-muted-foreground">—</span>
                  ) : pos.security.pricingMode === "manual" ? (
                    <InlineAmountInput
                      cents={pos.currentPriceEurCents}
                      onSave={(next) => {
                        if (next !== null) {
                          manualPriceMutation.mutate({
                            securityId: pos.security.id,
                            manualPriceCents: next,
                          })
                        }
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-end text-xs leading-tight tabular-nums">
                      <span className="font-medium">{formatCents(pos.currentPriceEurCents)}</span>
                      {pos.security.currency !== "EUR" && pos.currentPriceNative !== null && (
                        <span className="text-[10px] text-muted-foreground">
                          {formatNativePrice(pos.currentPriceNative, pos.security.currency)}
                        </span>
                      )}
                      {pos.dayChangePercent !== null && (
                        <span
                          className={cn(
                            "text-[10px]",
                            pos.dayChangePercent > 0 && "text-emerald-600 dark:text-emerald-400",
                            pos.dayChangePercent < 0 && "text-destructive",
                            pos.dayChangePercent === 0 && "text-muted-foreground",
                          )}
                        >
                          {formatPercentSigned(pos.dayChangePercent)}
                        </span>
                      )}
                    </div>
                  )}
                </TableCell>

                <TableCell className="text-right text-xs font-semibold tabular-nums">
                  {formatCents(pos.marketValueEurCents)}
                </TableCell>

                <TableCell className="text-right text-xs tabular-nums">
                  <div
                    className={cn(
                      "flex flex-col items-end leading-tight font-medium",
                      pos.unrealizedGainEurCents > 0 && "text-emerald-600 dark:text-emerald-400",
                      pos.unrealizedGainEurCents < 0 && "text-destructive",
                      pos.unrealizedGainEurCents === 0 && "text-muted-foreground",
                    )}
                  >
                    <span>{formatCents(pos.unrealizedGainEurCents, { signed: true })}</span>
                    {pos.unrealizedGainPercent !== null && (
                      <span className="text-[10px] opacity-80">
                        {formatPercentSigned(pos.unrealizedGainPercent)}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-right text-xs text-muted-foreground tabular-nums">
                  {pos.weightPercent.toFixed(1)}%
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={m.inv_quick_buy_title({ name: pos.security.name })}
                    title={m.inv_quick_buy_title({ name: pos.security.name })}
                    onClick={() => onAddOperationForPosition(pos.account.id, pos.security.id)}
                  >
                    <PlusIcon className="size-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {positions.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>{m.common_total()}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCents(summary.totalValueEurCents)}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right tabular-nums",
                    summary.totalUnrealizedGainEurCents > 0 &&
                      "text-emerald-600 dark:text-emerald-400",
                    summary.totalUnrealizedGainEurCents < 0 && "text-destructive",
                  )}
                >
                  {formatCents(summary.totalUnrealizedGainEurCents, { signed: true })}
                </TableCell>
                <TableCell className="text-right tabular-nums">100%</TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </CardContent>
    </Card>
  )
}
