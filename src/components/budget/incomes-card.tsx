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
import { addIncome, deleteIncome, updateIncome } from "@/lib/server/budget"
import { m } from "@/paraglide/messages"

type IncomeItem = {
  id: number
  monthId: string
  name: string
  dueDate: string | null
  expectedCents: number
  actualCents: number | null
}

type IncomesCardProps = {
  monthId: string
  incomes: Array<IncomeItem>
  summary: MonthSummary
}

const IncomeDialog = ({
  monthId,
  income,
  trigger,
}: {
  monthId: string
  income?: IncomeItem
  trigger: ReactElement
}) => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(income?.name ?? "")
  const [dueDate, setDueDate] = useState(income?.dueDate ?? "")
  const [expected, setExpected] = useState(income ? formatCentsPlain(income.expectedCents) : "")
  const [actual, setActual] = useState(
    income?.actualCents !== null && income?.actualCents !== undefined
      ? formatCentsPlain(income.actualCents)
      : "",
  )

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (next) {
      setName(income?.name ?? "")
      setDueDate(income?.dueDate ?? "")
      setExpected(income ? formatCentsPlain(income.expectedCents) : "")
      setActual(
        income?.actualCents !== null && income?.actualCents !== undefined
          ? formatCentsPlain(income.actualCents)
          : "",
      )
    }
  }

  const mutation = useMutation({
    mutationKey: ["saveIncome", monthId],
    mutationFn: () => {
      const expectedCents = parseAmountToCents(expected)
      const actualCents = actual.trim() ? parseAmountToCents(actual) : null
      if (income) {
        return updateIncome({
          data: {
            id: income.id,
            name,
            dueDate: dueDate.trim() || null,
            expectedCents,
            actualCents,
          },
        })
      }
      return addIncome({
        data: { monthId, name, dueDate: dueDate.trim() || null, expectedCents, actualCents },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
      queryClient.invalidateQueries({ queryKey: ["months"] })
      toast.success(income ? m.incomes_updated_toast() : m.incomes_added_toast())
      setOpen(false)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.incomes_save_error())
    },
  })

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{income ? m.incomes_edit() : m.incomes_add()}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate()
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="income-name">{m.common_name()}</FieldLabel>
              <Input
                id="income-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={m.incomes_name_placeholder()}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="income-due">{m.incomes_due_date_optional()}</FieldLabel>
              <Input
                id="income-due"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder={m.incomes_due_placeholder()}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="income-expected">{m.incomes_expected_eur()}</FieldLabel>
                <Input
                  id="income-expected"
                  inputMode="decimal"
                  value={expected}
                  onChange={(e) => setExpected(e.target.value)}
                  placeholder="2842.16"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="income-actual">{m.common_actual_eur()}</FieldLabel>
                <Input
                  id="income-actual"
                  inputMode="decimal"
                  value={actual}
                  onChange={(e) => setActual(e.target.value)}
                  placeholder={m.common_leave_empty_if_pending()}
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

export const IncomesCard = ({ monthId, incomes, summary }: IncomesCardProps) => {
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationKey: ["updateIncomeInline", monthId],
    mutationFn: (data: Parameters<typeof updateIncome>[0]["data"]) => updateIncome({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["deleteIncome", monthId],
    mutationFn: (id: number) => deleteIncome({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
      toast.success(m.incomes_deleted_toast())
    },
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>{m.incomes_title()}</CardTitle>
        <IncomeDialog
          monthId={monthId}
          trigger={
            <Button variant="outline" size="sm">
              <PlusIcon className="size-3.5" />
              {m.incomes_add()}
            </Button>
          }
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{m.common_name()}</TableHead>
              <TableHead>{m.incomes_due()}</TableHead>
              <TableHead className="text-right">{m.incomes_expected()}</TableHead>
              <TableHead className="text-right">{m.common_actual()}</TableHead>
              <TableHead className="w-16 text-right">{m.common_actions()}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incomes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-6 text-center text-xs text-muted-foreground">
                  {m.incomes_empty()}
                </TableCell>
              </TableRow>
            ) : (
              incomes.map((inc) => (
                <TableRow key={inc.id}>
                  <TableCell className="font-medium">{inc.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {inc.dueDate ?? "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <InlineAmountInput
                      cents={inc.expectedCents}
                      onSave={(next) =>
                        updateMutation.mutate({ id: inc.id, expectedCents: next ?? 0 })
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <InlineAmountInput
                      cents={inc.actualCents}
                      nullable
                      onSave={(next) => updateMutation.mutate({ id: inc.id, actualCents: next })}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <IncomeDialog
                        monthId={monthId}
                        income={inc}
                        trigger={
                          <Button variant="ghost" size="icon-sm" aria-label={m.incomes_edit_aria()}>
                            <EditIcon className="size-3.5" />
                          </Button>
                        }
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={m.incomes_delete_aria()}
                        onClick={() => deleteMutation.mutate(inc.id)}
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
          {incomes.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>{m.common_total()}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCents(summary.income.budgetCents)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCents(summary.income.actualCents)}
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
