import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import type { ReactElement } from "react"
import { toast } from "sonner"

import { SharePill } from "@/components/share-pill"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  addPaymentMethod,
  deletePaymentMethod,
  editPaymentMethod,
  getPaymentMethods,
} from "@/lib/server/budget"
import { m } from "@/paraglide/messages"

type PaymentMethodRow = Awaited<ReturnType<typeof getPaymentMethods>>[number]

const toSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

const PaymentMethodForm = ({
  paymentMethod,
  onFinish,
}: {
  paymentMethod?: PaymentMethodRow
  onFinish: () => void
}) => {
  const queryClient = useQueryClient()
  const { presets: sharePresets } = useSharePresets()
  const [label, setLabel] = useState(paymentMethod?.label ?? "")
  const [slug, setSlug] = useState("")
  const [color, setColor] = useState(paymentMethod?.color ?? "#3b82f6")
  const [defaultSharePercent, setDefaultSharePercent] = useState<string>(
    String(paymentMethod?.defaultSharePercent ?? 100),
  )
  const finalSlug = paymentMethod ? paymentMethod.slug : slug.trim() || toSlug(label)

  const mutation = useMutation({
    mutationKey: ["savePaymentMethod"],
    mutationFn: () => {
      const share = Number.parseInt(defaultSharePercent, 10)
      return paymentMethod
        ? editPaymentMethod({
            data: { id: paymentMethod.id, label, color, defaultSharePercent: share },
          })
        : addPaymentMethod({
            data: { slug: finalSlug, label, color, defaultSharePercent: share },
          })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] })
      queryClient.invalidateQueries({ queryKey: ["budget"] })
      toast.success(paymentMethod ? m.pm_updated_toast() : m.pm_created_toast())
      onFinish()
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate()
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="pm-label">{m.common_label()}</FieldLabel>
          <Input
            id="pm-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Carte AMEX"
          />
        </Field>
        {!paymentMethod && (
          <Field>
            <FieldLabel htmlFor="pm-slug">{m.common_slug()}</FieldLabel>
            <Input
              id="pm-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder={toSlug(label) || "carte-amex"}
            />
            <FieldDescription>{m.pm_slug_desc()}</FieldDescription>
          </Field>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="pm-share">{m.common_default_share()}</FieldLabel>
            <Select
              value={defaultSharePercent}
              items={sharePresets.map((p) => ({
                value: String(p.percent),
                label: `${p.label} (${p.percent}%)`,
              }))}
              onValueChange={(value) => {
                if (value) setDefaultSharePercent(value)
              }}
            >
              <SelectTrigger id="pm-share">
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
          <Field>
            <FieldLabel htmlFor="pm-color">{m.common_color()}</FieldLabel>
            <div className="flex items-center gap-2">
              <input
                id="pm-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-8 w-10 cursor-pointer border bg-transparent p-0.5"
              />
              <Input value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
          </Field>
        </div>
        {mutation.isError && (
          <p className="text-xs text-destructive">
            {mutation.error instanceof Error ? mutation.error.message : m.pm_save_error()}
          </p>
        )}
        <Button
          type="submit"
          disabled={!label.trim() || !finalSlug || mutation.isPending}
          className="self-end"
        >
          {mutation.isPending ? m.common_saving() : m.common_save()}
        </Button>
      </FieldGroup>
    </form>
  )
}

const PaymentMethodDialog = ({
  paymentMethod,
  trigger,
}: {
  paymentMethod?: PaymentMethodRow
  trigger: ReactElement
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{paymentMethod ? m.pm_edit_title() : m.pm_create_title()}</DialogTitle>
          <DialogDescription>{m.pm_dialog_desc()}</DialogDescription>
        </DialogHeader>
        <PaymentMethodForm paymentMethod={paymentMethod} onFinish={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

const DeletePaymentMethodButton = ({ paymentMethod }: { paymentMethod: PaymentMethodRow }) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ["deletePaymentMethod"],
    mutationFn: () => deletePaymentMethod({ data: { id: paymentMethod.id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] })
      queryClient.invalidateQueries({ queryKey: ["budget"] })
      setIsOpen(false)
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" size="icon" className="ml-2">
            <TrashIcon />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{m.pm_delete_title()}</DialogTitle>
          <DialogDescription>{m.pm_delete_desc({ label: paymentMethod.label })}</DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? m.common_deleting() : m.common_delete()}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export const PaymentMethodsSettings = () => {
  const pmQuery = useQuery({ queryKey: ["paymentMethods"], queryFn: getPaymentMethods })

  if (pmQuery.isLoading) return <div>{m.pm_loading()}</div>
  if (pmQuery.isError || !pmQuery.data) {
    return <div>{m.pm_load_error()}</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{m.pm_title()}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>{m.pm_caption()}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{m.common_label()}</TableHead>
              <TableHead>{m.common_slug()}</TableHead>
              <TableHead>{m.common_default_share()}</TableHead>
              <TableHead>{m.common_color()}</TableHead>
              <TableHead className="w-24 text-right">{m.common_actions()}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pmQuery.data.map((pm) => (
              <TableRow key={pm.id}>
                <TableCell className="font-medium">{pm.label}</TableCell>
                <TableCell className="text-muted-foreground">{pm.slug}</TableCell>
                <TableCell>
                  <SharePill sharePercent={pm.defaultSharePercent} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block size-3.5 rounded-full border"
                      style={{ backgroundColor: pm.color ?? "#64748b" }}
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      {pm.color ?? "—"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <PaymentMethodDialog
                      paymentMethod={pm}
                      trigger={
                        <Button size="icon">
                          <EditIcon />
                        </Button>
                      }
                    />
                    <DeletePaymentMethodButton paymentMethod={pm} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <PaymentMethodDialog
          trigger={
            <Button variant="outline">
              <PlusIcon />
              {m.pm_create_button()}
            </Button>
          }
        />
      </CardFooter>
    </Card>
  )
}
