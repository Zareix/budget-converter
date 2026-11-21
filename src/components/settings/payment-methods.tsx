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
      toast.success(paymentMethod ? "Payment method updated" : "Payment method created")
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
          <FieldLabel htmlFor="pm-label">Label</FieldLabel>
          <Input
            id="pm-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Carte AMEX"
          />
        </Field>
        {!paymentMethod && (
          <Field>
            <FieldLabel htmlFor="pm-slug">Slug</FieldLabel>
            <Input
              id="pm-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder={toSlug(label) || "carte-amex"}
            />
            <FieldDescription>Stable key used to match imported accounts.</FieldDescription>
          </Field>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="pm-share">Default Share</FieldLabel>
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
            <FieldLabel htmlFor="pm-color">Color</FieldLabel>
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
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Failed to save payment method"}
          </p>
        )}
        <Button
          type="submit"
          disabled={!label.trim() || !finalSlug || mutation.isPending}
          className="self-end"
        >
          {mutation.isPending ? "Saving..." : "Save"}
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
          <DialogTitle>
            {paymentMethod ? "Edit payment method" : "Create payment method"}
          </DialogTitle>
          <DialogDescription>
            Payment methods used for transactions and default share attribution.
          </DialogDescription>
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
          <DialogTitle>Delete Payment Method</DialogTitle>
          <DialogDescription>
            Delete "{paymentMethod.label}"? Existing transactions will keep their data with an empty
            payment method.
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

export const PaymentMethodsSettings = () => {
  const pmQuery = useQuery({ queryKey: ["paymentMethods"], queryFn: getPaymentMethods })

  if (pmQuery.isLoading) return <div>Loading payment methods...</div>
  if (pmQuery.isError || !pmQuery.data) {
    return <div>Error loading payment methods.</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Cards & payment methods used when importing or adding expenses
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Default Share</TableHead>
              <TableHead>Color</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
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
              Create Payment Method
            </Button>
          }
        />
      </CardFooter>
    </Card>
  )
}
