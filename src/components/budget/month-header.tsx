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
import { m } from "@/paraglide/messages"

type MonthHeaderProps = {
  monthId: string
  onSelectMonth: (monthId: string) => void
  rightSlot?: React.ReactNode
  showCreateMonth?: boolean
}

export const MonthHeader = ({
  monthId,
  onSelectMonth,
  rightSlot,
  showCreateMonth = true,
}: MonthHeaderProps) => {
  const queryClient = useQueryClient()
  const monthsQuery = useQuery({
    queryKey: ["months"],
    queryFn: listMonths,
    enabled: showCreateMonth,
  })
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
        existingMonths.find((item) => item.id === monthId)?.id ?? existingMonths[0]?.id ?? "none"
      setSourceMonth(defaultSource)
    }
  }

  const createOrCloneMutation = useMutation({
    mutationKey: ["createOrCloneMonth"],
    mutationFn: async () => {
      if (!isValidMonthId(targetMonth)) {
        throw new Error(m.month_invalid_error())
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
          ? m.month_cloned_toast({
              source: formatMonthLabel(sourceMonth),
              target: formatMonthLabel(targetMonth),
            })
          : m.month_created_toast({ target: formatMonthLabel(targetMonth) }),
      )
      setDialogOpen(false)
      onSelectMonth(targetMonth)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.month_create_error())
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
            aria-label={m.month_previous()}
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
            aria-label={m.month_next()}
            onClick={() => onSelectMonth(shiftMonthId(monthId, 1))}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>

        {showCreateMonth && (
          <Dialog open={dialogOpen} onOpenChange={handleOpenDialog}>
            <DialogTrigger
              render={
                <Button variant="outline" size="sm">
                  <CopyPlusIcon className="size-3.5" />
                  {m.month_new_or_clone_button()}
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{m.month_dialog_title()}</DialogTitle>
                <DialogDescription>{m.month_dialog_description()}</DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  createOrCloneMutation.mutate()
                }}
              >
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="target-month">{m.month_target_label()}</FieldLabel>
                    <Input
                      id="target-month"
                      type="month"
                      value={targetMonth}
                      onChange={(e) => setTargetMonth(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="source-month">{m.month_clone_from_label()}</FieldLabel>
                    <Select
                      value={sourceMonth}
                      items={[
                        { value: "none", label: m.month_start_blank() },
                        ...existingMonths.map((item) => ({
                          value: item.id,
                          label: formatMonthLabel(item.id),
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
                        <SelectItem value="none">{m.month_start_blank()}</SelectItem>
                        {existingMonths.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {formatMonthLabel(item.id)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldDescription>{m.month_clone_description()}</FieldDescription>
                  </Field>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                      disabled={createOrCloneMutation.isPending}
                    >
                      {m.common_cancel()}
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isValidMonthId(targetMonth) || createOrCloneMutation.isPending}
                    >
                      {createOrCloneMutation.isPending
                        ? m.month_creating()
                        : sourceMonth !== "none"
                          ? m.month_clone_submit()
                          : m.month_create_submit()}
                    </Button>
                  </div>
                </FieldGroup>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {rightSlot && <div className="flex items-center gap-2">{rightSlot}</div>}
    </div>
  )
}
