import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import type { ReactElement } from "react"
import { toast } from "sonner"

import { InlineAmountInput } from "@/components/budget/inline-amount-input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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
import { formatCents, formatCentsPlain, parseAmountToCents } from "@/lib/budget/calculations"
import { addSaving, deleteSaving, updateSaving } from "@/lib/server/budget"

type SavingItem = {
  id: number
  monthId: string
  name: string
  budgetCents: number
  actualCents: number | null
}

type SavingsCardProps = {
  monthId: string
  savings: Array<SavingItem>
  summary: MonthSummary
}

const SavingDialog = ({
  monthId,
  saving,
  trigger,
}: {
  monthId: string
  saving?: SavingItem
  trigger: ReactElement
}) => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(saving?.name ?? "")
  const [budget, setBudget] = useState(saving ? formatCentsPlain(saving.budgetCents) : "")
  const [actual, setActual] = useState(
    saving?.actualCents !== null && saving?.actualCents !== undefined
      ? formatCentsPlain(saving.actualCents)
      : "",
  )

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (next) {
      setName(saving?.name ?? "")
      setBudget(saving ? formatCentsPlain(saving.budgetCents) : "")
      setActual(
        saving?.actualCents !== null && saving?.actualCents !== undefined
          ? formatCentsPlain(saving.actualCents)
          : "",
      )
    }
  }

  const mutation = useMutation({
    mutationKey: ["saveSaving", monthId],
    mutationFn: () => {
      const budgetCents = parseAmountToCents(budget)
      const actualCents = actual.trim() ? parseAmountToCents(actual) : null
      if (saving) {
        return updateSaving({ data: { id: saving.id, name, budgetCents, actualCents } })
      }
      return addSaving({ data: { monthId, name, budgetCents, actualCents } })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
      queryClient.invalidateQueries({ queryKey: ["months"] })
      toast.success(saving ? "Saving updated" : "Saving added")
      setOpen(false)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to save saving")
    },
  })

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{saving ? "Edit Saving" : "Add Saving"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate()
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="saving-name">Name</FieldLabel>
              <Input
                id="saving-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Livret A, PEA, Assurance-Vie..."
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="saving-budget">Budget (€)</FieldLabel>
                <Input
                  id="saving-budget"
                  inputMode="decimal"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="100.00"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="saving-actual">Actual (€)</FieldLabel>
                <Input
                  id="saving-actual"
                  inputMode="decimal"
                  value={actual}
                  onChange={(e) => setActual(e.target.value)}
                  placeholder="Leave empty if pending"
                />
              </Field>
            </div>
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

export const SavingsCard = ({ monthId, savings, summary }: SavingsCardProps) => {
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationKey: ["updateSavingInline", monthId],
    mutationFn: (data: Parameters<typeof updateSaving>[0]["data"]) => updateSaving({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["deleteSaving", monthId],
    mutationFn: (id: number) => deleteSaving({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
      toast.success("Saving deleted")
    },
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>Savings</CardTitle>
        <SavingDialog
          monthId={monthId}
          trigger={
            <Button variant="outline" size="sm">
              <PlusIcon className="size-3.5" />
              Add Saving
            </Button>
          }
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead className="text-right">Actual</TableHead>
              <TableHead className="w-16 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-6 text-center text-xs text-muted-foreground">
                  No savings targets for this month yet.
                </TableCell>
              </TableRow>
            ) : (
              savings.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">
                    <InlineAmountInput
                      cents={item.budgetCents}
                      onSave={(next) =>
                        updateMutation.mutate({ id: item.id, budgetCents: next ?? 0 })
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <InlineAmountInput
                      cents={item.actualCents}
                      nullable
                      onSave={(next) => updateMutation.mutate({ id: item.id, actualCents: next })}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <SavingDialog
                        monthId={monthId}
                        saving={item}
                        trigger={
                          <Button variant="ghost" size="icon-sm" aria-label="Edit saving">
                            <EditIcon className="size-3.5" />
                          </Button>
                        }
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Delete saving"
                        onClick={() => deleteMutation.mutate(item.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <TrashIcon className="size-3.5 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {savings.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCents(summary.savings.budgetCents)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCents(summary.savings.actualCents)}
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
