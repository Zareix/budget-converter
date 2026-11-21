import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowRightIcon, EditIcon, PlusIcon, RefreshCwIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import type { ReactElement } from "react"
import { toast } from "sonner"

import { InlineAmountInput } from "@/components/budget/inline-amount-input"
import { SharePill } from "@/components/share-pill"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSharePresets } from "@/hooks/use-share-presets"
import type { MonthSummary } from "@/lib/budget/calculations"
import {
  computeShareCents,
  formatCents,
  formatCentsPlain,
  formatMonthLabel,
  parseAmountToCents,
} from "@/lib/budget/calculations"
import type { SubtrackerMetric } from "@/lib/fetcher/subtracker"
import { SUBTRACKER_METRICS, resolveMetricForMonth } from "@/lib/fetcher/subtracker"
import {
  addBill,
  applySubtrackerBillsSync,
  deleteBill,
  getSubtrackerStatus,
  previewSubtrackerBillsSync,
  updateBill,
} from "@/lib/server/budget"
import { m } from "@/paraglide/messages"

const getSubtrackerMetricLabel = (metric: SubtrackerMetric): string => {
  switch (metric) {
    case "totalThisMonth":
      return m.subtracker_metric_this_month()
    case "expectedNextMonth":
      return m.subtracker_metric_next_month()
    case "totalPerMonth":
      return m.subtracker_metric_monthly_avg()
  }
}

type AccountOption = {
  id: number
  name: string
  color: string | null
}

type BillItem = {
  id: number
  monthId: string
  name: string
  dueDay: number | null
  fromAccountId: number | null
  sharePercent: number
  budgetCents: number
  subtrackerRuleId: number | null
}

type BillsCardProps = {
  monthId: string
  bills: Array<BillItem>
  accounts: Array<AccountOption>
  summary: MonthSummary
}

const SubtrackerSyncDialog = ({ monthId }: { monthId: string }) => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const autoMetric = resolveMetricForMonth(monthId)
  const [metric, setMetric] = useState<SubtrackerMetric>(autoMetric ?? "totalThisMonth")

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (next) {
      setMetric(resolveMetricForMonth(monthId) ?? "totalThisMonth")
    }
  }

  const previewQuery = useQuery({
    queryKey: ["subtrackerPreview", monthId, metric],
    queryFn: () => previewSubtrackerBillsSync({ data: { monthId, metric } }),
    enabled: open,
    retry: false,
  })

  const applyMutation = useMutation({
    mutationKey: ["applySubtrackerSync", monthId],
    mutationFn: () => applySubtrackerBillsSync({ data: { monthId, metric } }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
      queryClient.invalidateQueries({ queryKey: ["months"] })
      const parts: Array<string> = []
      if (res.created > 0) parts.push(m.subtracker_sync_created({ count: res.created }))
      if (res.updated > 0) parts.push(m.subtracker_sync_updated({ count: res.updated }))
      if (res.unchanged > 0) parts.push(m.subtracker_sync_unchanged({ count: res.unchanged }))
      toast.success(
        m.subtracker_sync_complete_toast({
          summary: parts.join(", ") || m.subtracker_sync_no_changes(),
        }),
      )
      setOpen(false)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.subtracker_sync_error())
    },
  })

  const items = previewQuery.data?.items ?? []
  const hasChanges = items.some((item) => item.action !== "unchanged")

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            <RefreshCwIcon className="size-3.5" />
            {m.subtracker_sync_button()}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{m.subtracker_sync_title()}</DialogTitle>
          <DialogDescription>
            {m.subtracker_sync_description({ month: formatMonthLabel(monthId) })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Field>
            <FieldLabel htmlFor="st-sync-metric">{m.subtracker_metric_label()}</FieldLabel>
            <Select
              value={metric}
              items={SUBTRACKER_METRICS.map((metricKey) => ({
                value: metricKey,
                label: getSubtrackerMetricLabel(metricKey),
              }))}
              onValueChange={(v) => {
                if (v) setMetric(v)
              }}
            >
              <SelectTrigger id="st-sync-metric">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUBTRACKER_METRICS.map((metricKey) => (
                  <SelectItem key={metricKey} value={metricKey}>
                    {getSubtrackerMetricLabel(metricKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!autoMetric && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                {m.subtracker_metric_warning({ month: formatMonthLabel(monthId) })}
              </p>
            )}
          </Field>

          {previewQuery.isLoading ? (
            <div className="py-6 text-center text-xs text-muted-foreground">
              {m.subtracker_fetching()}
            </div>
          ) : previewQuery.isError ? (
            <div className="border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">
              {previewQuery.error instanceof Error
                ? previewQuery.error.message
                : m.subtracker_fetch_error()}
            </div>
          ) : items.length === 0 ? (
            <div className="py-6 text-center text-xs text-muted-foreground">
              {m.subtracker_no_rules()}
            </div>
          ) : (
            <div className="border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{m.subtracker_col_bill()}</TableHead>
                    <TableHead className="text-right">{m.common_amount()}</TableHead>
                    <TableHead className="w-24 text-right">{m.common_status()}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.ruleId}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right text-xs tabular-nums">
                        {item.currentBudgetCents !== null &&
                        item.currentBudgetCents !== item.newBudgetCents ? (
                          <span className="inline-flex items-center gap-1">
                            <span className="text-muted-foreground line-through">
                              {formatCents(item.currentBudgetCents)}
                            </span>
                            <ArrowRightIcon className="size-3 text-muted-foreground" />
                            <span className="font-semibold">
                              {formatCents(item.newBudgetCents)}
                            </span>
                          </span>
                        ) : (
                          <span className="font-semibold">{formatCents(item.newBudgetCents)}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            item.action === "create"
                              ? "default"
                              : item.action === "update"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {item.action === "create"
                            ? m.subtracker_status_new()
                            : item.action === "update"
                              ? m.subtracker_status_update()
                              : m.subtracker_status_same()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={applyMutation.isPending}
            >
              {m.common_cancel()}
            </Button>
            <Button
              type="button"
              onClick={() => applyMutation.mutate()}
              disabled={
                previewQuery.isLoading ||
                previewQuery.isError ||
                items.length === 0 ||
                !hasChanges ||
                applyMutation.isPending
              }
            >
              {applyMutation.isPending ? m.subtracker_syncing() : m.subtracker_apply_sync()}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const BillDialog = ({
  monthId,
  bill,
  accounts,
  trigger,
}: {
  monthId: string
  bill?: BillItem
  accounts: Array<AccountOption>
  trigger: ReactElement
}) => {
  const queryClient = useQueryClient()
  const { presets: sharePresets } = useSharePresets()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(bill?.name ?? "")
  const [dueDay, setDueDay] = useState(bill?.dueDay ? String(bill.dueDay) : "")
  const [fromAccountId, setFromAccountId] = useState(
    bill?.fromAccountId ? String(bill.fromAccountId) : "none",
  )
  const [sharePercent, setSharePercent] = useState(String(bill?.sharePercent ?? 100))
  const [budget, setBudget] = useState(bill ? formatCentsPlain(bill.budgetCents) : "")

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (next) {
      setName(bill?.name ?? "")
      setDueDay(bill?.dueDay ? String(bill.dueDay) : "")
      setFromAccountId(bill?.fromAccountId ? String(bill.fromAccountId) : "none")
      setSharePercent(String(bill?.sharePercent ?? 100))
      setBudget(bill ? formatCentsPlain(bill.budgetCents) : "")
    }
  }

  const mutation = useMutation({
    mutationKey: ["saveBill", monthId],
    mutationFn: () => {
      const parsedDueDay = dueDay.trim() ? Number.parseInt(dueDay, 10) : null
      const parsedAccount = fromAccountId !== "none" ? Number.parseInt(fromAccountId, 10) : null
      const parsedShare = Number.parseInt(sharePercent, 10)
      const budgetCents = parseAmountToCents(budget)

      if (bill) {
        return updateBill({
          data: {
            id: bill.id,
            name,
            dueDay: parsedDueDay,
            fromAccountId: parsedAccount,
            sharePercent: parsedShare,
            budgetCents,
          },
        })
      }
      return addBill({
        data: {
          monthId,
          name,
          dueDay: parsedDueDay,
          fromAccountId: parsedAccount,
          sharePercent: parsedShare,
          budgetCents,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
      queryClient.invalidateQueries({ queryKey: ["months"] })
      toast.success(bill ? m.bills_updated_toast() : m.bills_added_toast())
      setOpen(false)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.bills_save_error())
    },
  })

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{bill ? m.bills_edit() : m.bills_add()}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate()
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="bill-name">{m.common_name()}</FieldLabel>
              <Input
                id="bill-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={m.bills_name_placeholder()}
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="bill-due">{m.common_due_day_label()}</FieldLabel>
                <Input
                  id="bill-due"
                  type="number"
                  min={1}
                  max={31}
                  value={dueDay}
                  onChange={(e) => setDueDay(e.target.value)}
                  placeholder="1"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="bill-share">{m.common_share()}</FieldLabel>
                <Select
                  value={sharePercent}
                  items={sharePresets.map((p) => ({
                    value: String(p.percent),
                    label: `${p.label} (${p.percent}%)`,
                  }))}
                  onValueChange={(v) => {
                    if (v) setSharePercent(v)
                  }}
                >
                  <SelectTrigger id="bill-share">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sharePresets.map((p) => (
                      <SelectItem key={p.percent} value={String(p.percent)}>
                        {p.label} ({p.percent}%)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="bill-account">{m.common_from_account()}</FieldLabel>
              <Select
                value={fromAccountId}
                items={[
                  { value: "none", label: m.common_none() },
                  ...accounts.map((a) => ({ value: String(a.id), label: a.name })),
                ]}
                onValueChange={(v) => {
                  if (v) setFromAccountId(v)
                }}
              >
                <SelectTrigger id="bill-account">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{m.common_none()}</SelectItem>
                  {accounts.map((a) => (
                    <SelectItem key={a.id} value={String(a.id)}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="bill-budget">{m.common_budget_eur()}</FieldLabel>
              <Input
                id="bill-budget"
                inputMode="decimal"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="1401.33"
                required
              />
            </Field>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={mutation.isPending}
              >
                {m.common_cancel()}
              </Button>
              <Button type="submit" disabled={!name.trim() || mutation.isPending}>
                {mutation.isPending ? m.common_saving() : m.common_save()}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export const BillsCard = ({ monthId, bills, accounts, summary }: BillsCardProps) => {
  const queryClient = useQueryClient()
  const accountsById = new Map(accounts.map((a) => [a.id, a]))

  const subtrackerStatusQuery = useQuery({
    queryKey: ["subtrackerStatus"],
    queryFn: getSubtrackerStatus,
    staleTime: 60_000,
  })

  const canSyncSubtracker =
    (subtrackerStatusQuery.data?.configured ?? false) &&
    (subtrackerStatusQuery.data?.activeRulesCount ?? 0) > 0

  const updateMutation = useMutation({
    mutationKey: ["updateBillInline", monthId],
    mutationFn: (data: Parameters<typeof updateBill>[0]["data"]) => updateBill({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.bills_update_error())
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["deleteBill", monthId],
    mutationFn: (id: number) => deleteBill({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
      toast.success(m.bills_deleted_toast())
    },
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>{m.bills_title()}</CardTitle>
        <div className="flex items-center gap-2">
          {canSyncSubtracker && <SubtrackerSyncDialog monthId={monthId} />}
          <BillDialog
            monthId={monthId}
            accounts={accounts}
            trigger={
              <Button variant="outline" size="sm">
                <PlusIcon className="size-3.5" />
                {m.bills_add()}
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{m.common_name()}</TableHead>
              <TableHead className="w-14 text-center">{m.bills_due()}</TableHead>
              <TableHead>{m.bills_from()}</TableHead>
              <TableHead>{m.common_share()}</TableHead>
              <TableHead className="text-right">{m.common_budget()}</TableHead>
              <TableHead className="text-right">{m.common_actual()}</TableHead>
              <TableHead className="w-16 text-right">{m.common_actions()}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-6 text-center text-xs text-muted-foreground">
                  {m.bills_empty()}
                </TableCell>
              </TableRow>
            ) : (
              bills.map((bill) => {
                const account = bill.fromAccountId ? accountsById.get(bill.fromAccountId) : null
                const derivedActual = computeShareCents(bill.budgetCents, bill.sharePercent)

                return (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-1.5">
                        <span>{bill.name}</span>
                        {bill.subtrackerRuleId !== null && (
                          <Badge variant="outline" className="text-[10px] font-normal">
                            Subtracker
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-xs text-muted-foreground tabular-nums">
                      {bill.dueDay ?? "—"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {account ? (
                        <div className="flex items-center gap-1.5">
                          {account.color && (
                            <span
                              className="inline-block size-2 rounded-full"
                              style={{ backgroundColor: account.color }}
                            />
                          )}
                          <span>{account.name}</span>
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <SharePill
                        sharePercent={bill.sharePercent}
                        onChange={(next) =>
                          updateMutation.mutate({ id: bill.id, sharePercent: next })
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <InlineAmountInput
                        cents={bill.budgetCents}
                        onSave={(next) =>
                          updateMutation.mutate({ id: bill.id, budgetCents: next ?? 0 })
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right text-xs font-medium tabular-nums">
                      {formatCents(derivedActual)}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <BillDialog
                          monthId={monthId}
                          bill={bill}
                          accounts={accounts}
                          trigger={
                            <Button variant="ghost" size="icon-sm" aria-label={m.bills_edit_aria()}>
                              <EditIcon className="size-3.5" />
                            </Button>
                          }
                        />
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={m.bills_delete_aria()}
                          onClick={() => deleteMutation.mutate(bill.id)}
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
          {bills.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>{m.common_total()}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCents(summary.bills.grossBudgetCents)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCents(summary.bills.budgetCents)}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </CardContent>
    </Card>
  )
}
