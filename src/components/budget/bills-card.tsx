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
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  SUBTRACKER_METRICS,
  SUBTRACKER_METRIC_LABELS,
  resolveMetricForMonth,
} from "@/lib/fetcher/subtracker"
import {
  addBill,
  applySubtrackerBillsSync,
  deleteBill,
  getSubtrackerStatus,
  previewSubtrackerBillsSync,
  updateBill,
} from "@/lib/server/budget"
import { cn } from "@/lib/utils"

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
  paid: boolean
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
      if (res.created > 0) parts.push(`${res.created} created`)
      if (res.updated > 0) parts.push(`${res.updated} updated`)
      if (res.unchanged > 0) parts.push(`${res.unchanged} unchanged`)
      toast.success(`Subtracker sync complete (${parts.join(", ") || "no changes"})`)
      setOpen(false)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to sync from Subtracker")
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
            Sync Subtracker
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Sync Bills from Subtracker</DialogTitle>
          <DialogDescription>
            Preview subscription totals for {formatMonthLabel(monthId)} before updating Bills.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Field>
            <FieldLabel htmlFor="st-sync-metric">Subtracker Metric</FieldLabel>
            <Select
              value={metric}
              items={SUBTRACKER_METRICS.map((m) => ({
                value: m,
                label: SUBTRACKER_METRIC_LABELS[m],
              }))}
              onValueChange={(v) => {
                if (v) setMetric(v)
              }}
            >
              <SelectTrigger id="st-sync-metric">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUBTRACKER_METRICS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {SUBTRACKER_METRIC_LABELS[m]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!autoMetric && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Subtracker&apos;s API only exposes the current and next calendar months — choose the
                metric you want to apply to {formatMonthLabel(monthId)}.
              </p>
            )}
          </Field>

          {previewQuery.isLoading ? (
            <div className="py-6 text-center text-xs text-muted-foreground">
              Fetching stats from Subtracker...
            </div>
          ) : previewQuery.isError ? (
            <div className="border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">
              {previewQuery.error instanceof Error
                ? previewQuery.error.message
                : "Failed to fetch Subtracker stats"}
            </div>
          ) : items.length === 0 ? (
            <div className="py-6 text-center text-xs text-muted-foreground">
              No active Subtracker sync rules found. Configure rules in Settings.
            </div>
          ) : (
            <div className="border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-24 text-right">Status</TableHead>
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
                            ? "New"
                            : item.action === "update"
                              ? "Update"
                              : "Same"}
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
              Cancel
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
              {applyMutation.isPending ? "Syncing..." : "Apply Sync"}
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
      toast.success(bill ? "Bill updated" : "Bill added")
      setOpen(false)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to save bill")
    },
  })

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{bill ? "Edit Bill" : "Add Bill"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate()
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="bill-name">Name</FieldLabel>
              <Input
                id="bill-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rent, Internet, Insurance..."
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="bill-due">Due Day (1–31)</FieldLabel>
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
                <FieldLabel htmlFor="bill-share">Share</FieldLabel>
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
              <FieldLabel htmlFor="bill-account">From Account</FieldLabel>
              <Select
                value={fromAccountId}
                items={[
                  { value: "none", label: "None" },
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
                  <SelectItem value="none">None</SelectItem>
                  {accounts.map((a) => (
                    <SelectItem key={a.id} value={String(a.id)}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="bill-budget">Budget (€)</FieldLabel>
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
                Cancel
              </Button>
              <Button type="submit" disabled={!name.trim() || mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save"}
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
      toast.error(err instanceof Error ? err.message : "Failed to update bill")
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["deleteBill", monthId],
    mutationFn: (id: number) => deleteBill({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
      toast.success("Bill deleted")
    },
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>Bills</CardTitle>
        <div className="flex items-center gap-2">
          {canSyncSubtracker && <SubtrackerSyncDialog monthId={monthId} />}
          <BillDialog
            monthId={monthId}
            accounts={accounts}
            trigger={
              <Button variant="outline" size="sm">
                <PlusIcon className="size-3.5" />
                Add Bill
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">Paid</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-14 text-center">Due</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Share</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead className="text-right">Actual</TableHead>
              <TableHead className="w-16 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-6 text-center text-xs text-muted-foreground">
                  No bills for this month yet.
                </TableCell>
              </TableRow>
            ) : (
              bills.map((bill) => {
                const account = bill.fromAccountId ? accountsById.get(bill.fromAccountId) : null
                const derivedActual = computeShareCents(bill.budgetCents, bill.sharePercent)

                return (
                  <TableRow key={bill.id} className={cn(bill.paid && "bg-muted/20")}>
                    <TableCell>
                      <Checkbox
                        checked={bill.paid}
                        aria-label={`Mark ${bill.name} as paid`}
                        onCheckedChange={(checked) => {
                          updateMutation.mutate({
                            id: bill.id,
                            paid: Boolean(checked),
                          })
                        }}
                      />
                    </TableCell>
                    <TableCell className={cn("font-medium", bill.paid && "text-muted-foreground")}>
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
                    <TableCell
                      className={cn(
                        "text-right text-xs font-medium tabular-nums",
                        !bill.paid && "text-muted-foreground",
                      )}
                    >
                      {formatCents(derivedActual)}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <BillDialog
                          monthId={monthId}
                          bill={bill}
                          accounts={accounts}
                          trigger={
                            <Button variant="ghost" size="icon-sm" aria-label="Edit bill">
                              <EditIcon className="size-3.5" />
                            </Button>
                          }
                        />
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Delete bill"
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
                <TableCell colSpan={5}>Total</TableCell>
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
