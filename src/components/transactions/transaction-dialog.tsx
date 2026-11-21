import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import type { ReactElement } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
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
import { useSharePresets } from "@/hooks/use-share-presets"
import { formatCentsPlain, isValidMonthId, parseAmountToCents } from "@/lib/budget/calculations"
import { addTransaction, updateTransaction } from "@/lib/server/budget"
import { formatIsoDate } from "@/lib/utils"
import { m } from "@/paraglide/messages"

export type PersistedTransaction = {
  id: number
  monthId: string
  date: string
  name: string
  sourceName: string | null
  amountCents: number
  sharePercent: number
  categorySlug: string
  paymentMethodId: number | null
  excluded: boolean
  externalId: string | null
  raw: string | null
}

type CategoryOption = {
  slug: string
  label: string
}

type PaymentMethodOption = {
  id: number
  label: string
  defaultSharePercent: number
}

type TransactionDialogProps = {
  activeMonthId: string
  transaction?: PersistedTransaction
  categories: Array<CategoryOption>
  paymentMethods: Array<PaymentMethodOption>
  trigger: ReactElement
}

const getDefaultDateForMonth = (monthId: string): string => {
  const today = formatIsoDate(new Date())
  if (today.startsWith(monthId)) return today
  return `${monthId}-01`
}

export const TransactionDialog = ({
  activeMonthId,
  transaction,
  categories,
  paymentMethods,
  trigger,
}: TransactionDialogProps) => {
  const queryClient = useQueryClient()
  const { presets: sharePresets } = useSharePresets()
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(transaction?.date ?? getDefaultDateForMonth(activeMonthId))
  const [monthId, setMonthId] = useState(transaction?.monthId ?? activeMonthId)
  const [name, setName] = useState(transaction?.name ?? "")
  const [amount, setAmount] = useState(transaction ? formatCentsPlain(transaction.amountCents) : "")
  const [categorySlug, setCategorySlug] = useState(
    transaction?.categorySlug ?? categories[0]?.slug ?? "autres",
  )
  const [paymentMethodId, setPaymentMethodId] = useState<string>(
    transaction?.paymentMethodId ? String(transaction.paymentMethodId) : "none",
  )
  const [sharePercent, setSharePercent] = useState<string>(String(transaction?.sharePercent ?? 100))
  const [excluded, setExcluded] = useState(transaction?.excluded ?? false)

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (next) {
      setDate(transaction?.date ?? getDefaultDateForMonth(activeMonthId))
      setMonthId(transaction?.monthId ?? activeMonthId)
      setName(transaction?.name ?? "")
      setAmount(transaction ? formatCentsPlain(transaction.amountCents) : "")
      setCategorySlug(transaction?.categorySlug ?? categories[0]?.slug ?? "autres")
      setPaymentMethodId(
        transaction?.paymentMethodId ? String(transaction.paymentMethodId) : "none",
      )
      setSharePercent(String(transaction?.sharePercent ?? 100))
      setExcluded(transaction?.excluded ?? false)
    }
  }

  const mutation = useMutation({
    mutationKey: ["saveTransaction"],
    mutationFn: () => {
      const amountCents = parseAmountToCents(amount)
      const parsedShare = Math.min(100, Math.max(0, Number.parseInt(sharePercent, 10) || 0))
      const parsedPm = paymentMethodId !== "none" ? Number.parseInt(paymentMethodId, 10) : null
      const targetMonth = isValidMonthId(monthId) ? monthId : activeMonthId

      if (transaction) {
        return updateTransaction({
          data: {
            id: transaction.id,
            monthId: targetMonth,
            date,
            name,
            amountCents,
            sharePercent: parsedShare,
            categorySlug,
            paymentMethodId: parsedPm,
            excluded,
          },
        })
      }

      return addTransaction({
        data: {
          monthId: targetMonth,
          date,
          name,
          amountCents,
          sharePercent: parsedShare,
          categorySlug,
          paymentMethodId: parsedPm,
          excluded,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["budget"] })
      queryClient.invalidateQueries({ queryKey: ["months"] })
      toast.success(transaction ? m.tx_updated_toast() : m.tx_added_toast())
      setOpen(false)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.tx_save_error())
    },
  })

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{transaction ? m.tx_edit() : m.tx_add()}</DialogTitle>
          <DialogDescription>{m.tx_dialog_description()}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate()
          }}
        >
          <FieldGroup>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="tx-date">{m.common_date()}</FieldLabel>
                <Input
                  id="tx-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="tx-month">{m.tx_budget_month()}</FieldLabel>
                <Input
                  id="tx-month"
                  type="month"
                  value={monthId}
                  onChange={(e) => setMonthId(e.target.value)}
                  required
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="tx-name">{m.common_name()}</FieldLabel>
              <Input
                id="tx-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={m.tx_name_placeholder()}
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="tx-amount">{m.tx_amount_eur()}</FieldLabel>
                <Input
                  id="tx-amount"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="12.50"
                  required
                />
                <FieldDescription>{m.tx_amount_hint()}</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="tx-share">{m.tx_share_percent()}</FieldLabel>
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap gap-1">
                    {sharePresets.map((preset) => (
                      <Button
                        key={preset.percent}
                        type="button"
                        size="sm"
                        variant={sharePercent === String(preset.percent) ? "default" : "outline"}
                        className="flex-1 px-1.5 text-xs"
                        onClick={() => setSharePercent(String(preset.percent))}
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                  <Input
                    id="tx-share"
                    type="number"
                    min={0}
                    max={100}
                    value={sharePercent}
                    onChange={(e) => setSharePercent(e.target.value)}
                  />
                </div>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="tx-category">{m.common_category()}</FieldLabel>
                <Select
                  value={categorySlug}
                  items={categories.map((c) => ({ value: c.slug, label: c.label }))}
                  onValueChange={(v) => {
                    if (v) setCategorySlug(v)
                  }}
                >
                  <SelectTrigger id="tx-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.slug} value={c.slug}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="tx-pm">{m.common_payment_method()}</FieldLabel>
                <Select
                  value={paymentMethodId}
                  items={[
                    { value: "none", label: m.common_none() },
                    ...paymentMethods.map((pm) => ({ value: String(pm.id), label: pm.label })),
                  ]}
                  onValueChange={(v) => {
                    if (!v) return
                    setPaymentMethodId(v)
                    if (!transaction && v !== "none") {
                      const pm = paymentMethods.find((p) => String(p.id) === v)
                      if (pm) setSharePercent(String(pm.defaultSharePercent))
                    }
                  }}
                >
                  <SelectTrigger id="tx-pm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{m.common_none()}</SelectItem>
                    {paymentMethods.map((pm) => (
                      <SelectItem key={pm.id} value={String(pm.id)}>
                        {pm.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field orientation="horizontal">
              <Checkbox
                id="tx-excluded"
                checked={excluded}
                onCheckedChange={(checked) => setExcluded(Boolean(checked))}
              />
              <FieldLabel htmlFor="tx-excluded" className="font-normal">
                {m.common_exclude_from_budget()}
              </FieldLabel>
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
