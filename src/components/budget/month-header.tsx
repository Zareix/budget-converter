import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ChevronLeftIcon, ChevronRightIcon, CopyPlusIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
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
import { formatMonthLabel, isValidMonthId, shiftMonthId } from "@/lib/budget/calculations"
import { cloneMonth, createMonth, listMonths } from "@/lib/server/budget"

type MonthHeaderProps = {
  monthId: string
  onSelectMonth: (monthId: string) => void
  rightSlot?: React.ReactNode
}

export const MonthHeader = ({ monthId, onSelectMonth, rightSlot }: MonthHeaderProps) => {
  const queryClient = useQueryClient()
  const monthsQuery = useQuery({ queryKey: ["months"], queryFn: listMonths })
  const existingMonths = monthsQuery.data ?? []

  const [dialogOpen, setDialogOpen] = useState(false)
  const [targetMonth, setTargetMonth] = useState(() => shiftMonthId(monthId, 1))
  const [sourceMonth, setSourceMonth] = useState<string>("none")

  const handleOpenDialog = (open: boolean) => {
    setDialogOpen(open)
    if (open) {
      const next = shiftMonthId(monthId, 1)
      setTargetMonth(next)
      const defaultSource =
        existingMonths.find((m) => m.id === monthId)?.id ?? existingMonths[0]?.id ?? "none"
      setSourceMonth(defaultSource)
    }
  }

  const createOrCloneMutation = useMutation({
    mutationKey: ["createOrCloneMonth"],
    mutationFn: async () => {
      if (!isValidMonthId(targetMonth)) {
        throw new Error("Please choose a valid month (YYYY-MM)")
      }
      if (sourceMonth && sourceMonth !== "none") {
        return cloneMonth({ data: { sourceMonthId: sourceMonth, targetMonthId: targetMonth } })
      }
      return createMonth({ data: { monthId: targetMonth } })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["months"] })
      queryClient.invalidateQueries({ queryKey: ["budget", targetMonth] })
      toast.success(
        sourceMonth !== "none"
          ? `Cloned ${formatMonthLabel(sourceMonth)} → ${formatMonthLabel(targetMonth)}`
          : `Created ${formatMonthLabel(targetMonth)}`,
      )
      setDialogOpen(false)
      onSelectMonth(targetMonth)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to create month")
    },
  })

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center border bg-card">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Previous month"
            onClick={() => onSelectMonth(shiftMonthId(monthId, -1))}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <span className="min-w-40 px-2 text-center text-sm font-semibold">
            {formatMonthLabel(monthId)}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Next month"
            onClick={() => onSelectMonth(shiftMonthId(monthId, 1))}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>

        <Dialog open={dialogOpen} onOpenChange={handleOpenDialog}>
          <DialogTrigger
            render={
              <Button variant="outline" size="sm">
                <CopyPlusIcon className="size-3.5" />
                New / Clone Month
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New or Clone Month</DialogTitle>
              <DialogDescription>
                Create a blank budget month or clone bills, incomes, savings, and category targets
                from an existing month.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                createOrCloneMutation.mutate()
              }}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="target-month">Target Month</FieldLabel>
                  <Input
                    id="target-month"
                    type="month"
                    value={targetMonth}
                    onChange={(e) => setTargetMonth(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="source-month">Clone From</FieldLabel>
                  <Select
                    value={sourceMonth}
                    items={[
                      { value: "none", label: "Start blank" },
                      ...existingMonths.map((m) => ({
                        value: m.id,
                        label: formatMonthLabel(m.id),
                      })),
                    ]}
                    onValueChange={(val) => {
                      if (val) setSourceMonth(val)
                    }}
                  >
                    <SelectTrigger id="source-month">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Start blank</SelectItem>
                      {existingMonths.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {formatMonthLabel(m.id)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Cloned bills start unpaid with empty actuals; incomes and savings copy their
                    targets.
                  </FieldDescription>
                </Field>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    disabled={createOrCloneMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isValidMonthId(targetMonth) || createOrCloneMutation.isPending}
                  >
                    {createOrCloneMutation.isPending
                      ? "Creating..."
                      : sourceMonth !== "none"
                        ? "Clone Month"
                        : "Create Month"}
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {rightSlot && <div className="flex items-center gap-2">{rightSlot}</div>}
    </div>
  )
}
