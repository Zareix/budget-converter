import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EditIcon, FlaskConicalIcon, PlusIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import type { ReactElement } from "react"
import { toast } from "sonner"

import { SharePill } from "@/components/share-pill"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSharePresets } from "@/hooks/use-share-presets"
import { formatCents } from "@/lib/budget/calculations"
import {
  addSubtrackerBillRule,
  deleteSubtrackerBillRule,
  editSubtrackerBillRule,
  getAccounts,
  getSubtrackerBillRules,
  getSubtrackerStatus,
  testSubtrackerRule,
} from "@/lib/server/budget"

type RuleRow = Awaited<ReturnType<typeof getSubtrackerBillRules>>[number]
type AccountRow = Awaited<ReturnType<typeof getAccounts>>[number]

const RuleForm = ({
  rule,
  accounts,
  configured,
  onFinish,
}: {
  rule?: RuleRow
  accounts: Array<AccountRow>
  configured: boolean
  onFinish: () => void
}) => {
  const queryClient = useQueryClient()
  const { presets: sharePresets } = useSharePresets()

  const [name, setName] = useState(rule?.name ?? "")
  const [fromAccountId, setFromAccountId] = useState(
    rule?.fromAccountId ? String(rule.fromAccountId) : "none",
  )
  const [sharePercent, setSharePercent] = useState(String(rule?.sharePercent ?? 100))
  const [dueDay, setDueDay] = useState(rule?.dueDay ? String(rule.dueDay) : "1")
  const [paymentMethodIds, setPaymentMethodIds] = useState(rule?.paymentMethodIds ?? "")
  const [categoryIds, setCategoryIds] = useState(rule?.categoryIds ?? "")
  const [enabled, setEnabled] = useState(rule?.enabled ?? true)

  const saveMutation = useMutation({
    mutationKey: ["saveSubtrackerRule"],
    mutationFn: () => {
      const parsedAccount = fromAccountId !== "none" ? Number.parseInt(fromAccountId, 10) : null
      const parsedDueDay = dueDay.trim() ? Number.parseInt(dueDay, 10) : null
      const parsedShare = Number.parseInt(sharePercent, 10)

      if (rule) {
        return editSubtrackerBillRule({
          data: {
            id: rule.id,
            name,
            fromAccountId: parsedAccount,
            sharePercent: parsedShare,
            dueDay: parsedDueDay,
            paymentMethodIds: paymentMethodIds.trim() || null,
            categoryIds: categoryIds.trim() || null,
            enabled,
          },
        })
      }
      return addSubtrackerBillRule({
        data: {
          name,
          fromAccountId: parsedAccount,
          sharePercent: parsedShare,
          dueDay: parsedDueDay,
          paymentMethodIds: paymentMethodIds.trim() || null,
          categoryIds: categoryIds.trim() || null,
          enabled,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subtrackerRules"] })
      queryClient.invalidateQueries({ queryKey: ["subtrackerStatus"] })
      toast.success(rule ? "Rule updated" : "Rule created")
      onFinish()
    },
  })

  const testMutation = useMutation({
    mutationKey: ["testSubtrackerRule"],
    mutationFn: () =>
      testSubtrackerRule({
        data: {
          paymentMethodIds: paymentMethodIds.trim() || null,
          categoryIds: categoryIds.trim() || null,
        },
      }),
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Test failed")
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        saveMutation.mutate()
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="st-name">Bill Name</FieldLabel>
          <Input
            id="st-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Factures, Factures - Joint..."
            required
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="st-account">From Account</FieldLabel>
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
              <SelectTrigger id="st-account">
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
            <FieldLabel htmlFor="st-due">Due Day (1–31)</FieldLabel>
            <Input
              id="st-due"
              type="number"
              min={1}
              max={31}
              value={dueDay}
              onChange={(e) => setDueDay(e.target.value)}
              placeholder="1"
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="st-share">Share</FieldLabel>
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
            <SelectTrigger id="st-share">
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
          <FieldDescription>
            Keep 100% if Subtracker already splits shared subscriptions per user.
          </FieldDescription>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="st-pms">Subtracker Payment Method IDs</FieldLabel>
            <Input
              id="st-pms"
              value={paymentMethodIds}
              onChange={(e) => setPaymentMethodIds(e.target.value)}
              placeholder="e.g. 1,2 (empty = all)"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="st-cats">Subtracker Category IDs</FieldLabel>
            <Input
              id="st-cats"
              value={categoryIds}
              onChange={(e) => setCategoryIds(e.target.value)}
              placeholder="Optional, e.g. 1,3"
            />
          </Field>
        </div>

        <Field orientation="horizontal">
          <Checkbox
            id="st-enabled"
            checked={enabled}
            onCheckedChange={(checked) => setEnabled(Boolean(checked))}
          />
          <FieldLabel htmlFor="st-enabled" className="font-normal">
            Enabled for sync
          </FieldLabel>
        </Field>

        {testMutation.data && (
          <div className="border bg-muted/40 p-2.5 text-xs">
            <div className="font-medium">
              Subtracker response ({testMutation.data.currencyCode})
            </div>
            <div className="mt-1 grid grid-cols-3 gap-2 text-muted-foreground tabular-nums">
              <div>
                This month:{" "}
                <strong className="text-foreground">
                  {formatCents(testMutation.data.totalThisMonthCents)}
                </strong>
              </div>
              <div>
                Next month:{" "}
                <strong className="text-foreground">
                  {formatCents(testMutation.data.expectedNextMonthCents)}
                </strong>
              </div>
              <div>
                Avg/mo:{" "}
                <strong className="text-foreground">
                  {formatCents(testMutation.data.totalPerMonthCents)}
                </strong>
              </div>
            </div>
          </div>
        )}

        {saveMutation.isError && (
          <p className="text-xs text-destructive">
            {saveMutation.error instanceof Error ? saveMutation.error.message : "Failed to save"}
          </p>
        )}

        <div className="flex items-center justify-between gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!configured || testMutation.isPending}
            onClick={() => testMutation.mutate()}
          >
            <FlaskConicalIcon className="size-3.5" />
            {testMutation.isPending ? "Testing..." : "Test Query"}
          </Button>
          <Button type="submit" disabled={!name.trim() || saveMutation.isPending}>
            {saveMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}

const RuleDialog = ({
  rule,
  accounts,
  configured,
  trigger,
}: {
  rule?: RuleRow
  accounts: Array<AccountRow>
  configured: boolean
  trigger: ReactElement
}) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{rule ? "Edit Subtracker rule" : "Create Subtracker rule"}</DialogTitle>
          <DialogDescription>
            Map a filtered Subtracker stats query to a monthly Bill line.
          </DialogDescription>
        </DialogHeader>
        <RuleForm
          rule={rule}
          accounts={accounts}
          configured={configured}
          onFinish={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

const DeleteRuleButton = ({ rule }: { rule: RuleRow }) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ["deleteSubtrackerRule"],
    mutationFn: () => deleteSubtrackerBillRule({ data: { id: rule.id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subtrackerRules"] })
      queryClient.invalidateQueries({ queryKey: ["subtrackerStatus"] })
      toast.success("Rule deleted")
      setOpen(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" size="icon" className="ml-2">
            <TrashIcon />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Subtracker Rule</DialogTitle>
          <DialogDescription>
            Delete "{rule.name}"? Existing bills in past months are kept as normal bills.
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export const SubtrackerSettings = () => {
  const statusQuery = useQuery({ queryKey: ["subtrackerStatus"], queryFn: getSubtrackerStatus })
  const rulesQuery = useQuery({ queryKey: ["subtrackerRules"], queryFn: getSubtrackerBillRules })
  const accountsQuery = useQuery({ queryKey: ["accounts"], queryFn: getAccounts })

  const configured = statusQuery.data?.configured ?? false
  const accounts = accountsQuery.data ?? []
  const accountsById = new Map(accounts.map((a) => [a.id, a]))

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div>
          <CardTitle>Subtracker Bill Sync</CardTitle>
          <CardDescription>
            Sync recurring subscription totals from your Subtracker instance into monthly Bills.
          </CardDescription>
        </div>
        <Badge variant={configured ? "default" : "outline"}>
          {configured ? "Connected" : "Not configured"}
        </Badge>
      </CardHeader>
      <CardContent>
        {!configured && (
          <p className="mb-3 border border-dashed bg-muted/30 p-3 text-xs text-muted-foreground">
            Set <code className="font-mono text-foreground">SUBTRACKER_URL</code> and{" "}
            <code className="font-mono text-foreground">SUBTRACKER_API_KEY</code> in your
            environment to enable syncing from <code className="font-mono">/api/stats</code>.
          </p>
        )}

        <Table>
          <TableCaption>
            Each enabled rule creates or updates one Bill row when syncing a month
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Bill Name</TableHead>
              <TableHead>From Account</TableHead>
              <TableHead>Share</TableHead>
              <TableHead>PM IDs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(rulesQuery.data ?? []).length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-6 text-center text-xs text-muted-foreground">
                  No Subtracker rules configured yet.
                </TableCell>
              </TableRow>
            ) : (
              (rulesQuery.data ?? []).map((rule) => {
                const account = rule.fromAccountId ? accountsById.get(rule.fromAccountId) : null
                return (
                  <TableRow key={rule.id} className={rule.enabled ? undefined : "opacity-55"}>
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {account?.name ?? "—"}
                    </TableCell>
                    <TableCell>
                      <SharePill sharePercent={rule.sharePercent} />
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {rule.paymentMethodIds ?? "All"}
                      {rule.categoryIds ? ` (cat: ${rule.categoryIds})` : ""}
                    </TableCell>
                    <TableCell>
                      <Badge variant={rule.enabled ? "secondary" : "outline"}>
                        {rule.enabled ? "Active" : "Paused"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <RuleDialog
                          rule={rule}
                          accounts={accounts}
                          configured={configured}
                          trigger={
                            <Button size="icon">
                              <EditIcon />
                            </Button>
                          }
                        />
                        <DeleteRuleButton rule={rule} />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <RuleDialog
          accounts={accounts}
          configured={configured}
          trigger={
            <Button variant="outline">
              <PlusIcon />
              Create Sync Rule
            </Button>
          }
        />
      </CardFooter>
    </Card>
  )
}
