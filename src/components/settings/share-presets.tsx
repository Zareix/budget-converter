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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  addSharePreset,
  deleteSharePreset,
  editSharePreset,
  getSharePresets,
} from "@/lib/server/budget"

type SharePresetRow = Awaited<ReturnType<typeof getSharePresets>>[number]

const SharePresetForm = ({
  preset,
  onFinish,
}: {
  preset?: SharePresetRow
  onFinish: () => void
}) => {
  const queryClient = useQueryClient()
  const [label, setLabel] = useState(preset?.label ?? "")
  const [percent, setPercent] = useState(preset !== undefined ? String(preset.percent) : "50")
  const [color, setColor] = useState(preset?.color ?? "#0ea5e9")
  const [sortOrder, setSortOrder] = useState(
    preset?.sortOrder !== undefined ? String(preset.sortOrder) : "",
  )

  const parsedPercent = Number.parseInt(percent, 10)
  const isPercentValid =
    Number.isInteger(parsedPercent) && parsedPercent >= 0 && parsedPercent <= 100

  const mutation = useMutation({
    mutationKey: ["saveSharePreset"],
    mutationFn: () => {
      const parsedOrder = sortOrder.trim() ? Number.parseInt(sortOrder, 10) : undefined
      return preset
        ? editSharePreset({
            data: {
              id: preset.id,
              label,
              percent: parsedPercent,
              color,
              ...(parsedOrder !== undefined && Number.isFinite(parsedOrder)
                ? { sortOrder: parsedOrder }
                : {}),
            },
          })
        : addSharePreset({
            data: {
              label,
              percent: parsedPercent,
              color,
              ...(parsedOrder !== undefined && Number.isFinite(parsedOrder)
                ? { sortOrder: parsedOrder }
                : {}),
            },
          })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sharePresets"] })
      toast.success(preset ? "Share preset updated" : "Share preset created")
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
          <FieldLabel htmlFor="share-preset-label">Label</FieldLabel>
          <Input
            id="share-preset-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Personal, Shared, Partner, 60/40..."
            required
          />
          <FieldDescription>
            Displayed in Import, Transactions, Bills, and Mapping rules.
          </FieldDescription>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="share-preset-percent">Percentage (0–100%)</FieldLabel>
            <Input
              id="share-preset-percent"
              type="number"
              min={0}
              max={100}
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              required
            />
            <FieldDescription>Your share of the expense (must be unique).</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="share-preset-order">Sort Order</FieldLabel>
            <Input
              id="share-preset-order"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              placeholder="Auto"
            />
            <FieldDescription>Order used when clicking to cycle shares.</FieldDescription>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="share-preset-color">Color</FieldLabel>
          <div className="flex items-center gap-2">
            <input
              id="share-preset-color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-8 w-10 cursor-pointer border bg-transparent p-0.5"
            />
            <Input value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
        </Field>
        {mutation.isError && (
          <p className="text-xs text-destructive">
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Failed to save share preset"}
          </p>
        )}
        <Button
          type="submit"
          disabled={!label.trim() || !isPercentValid || mutation.isPending}
          className="self-end"
        >
          {mutation.isPending ? "Saving..." : "Save"}
        </Button>
      </FieldGroup>
    </form>
  )
}

const SharePresetDialog = ({
  preset,
  trigger,
}: {
  preset?: SharePresetRow
  trigger: ReactElement
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{preset ? "Edit share preset" : "Create share preset"}</DialogTitle>
          <DialogDescription>
            Customize available share percentages, labels, colors, and click-cycle order.
          </DialogDescription>
        </DialogHeader>
        <SharePresetForm preset={preset} onFinish={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

const DeleteSharePresetButton = ({
  preset,
  disabled,
}: {
  preset: SharePresetRow
  disabled?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ["deleteSharePreset"],
    mutationFn: () => deleteSharePreset({ data: { id: preset.id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sharePresets"] })
      toast.success("Share preset deleted")
      setIsOpen(false)
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" size="icon" className="ml-2" disabled={disabled}>
            <TrashIcon />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Share Preset</DialogTitle>
          <DialogDescription>
            Delete "{preset.label} ({preset.percent}%)"? Existing transactions and bills keep their
            stored percentage.
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

export const SharePresetsSettings = () => {
  const presetsQuery = useQuery({ queryKey: ["sharePresets"], queryFn: getSharePresets })

  if (presetsQuery.isLoading) return <div>Loading share presets...</div>
  if (presetsQuery.isError || !presetsQuery.data) {
    return <div>Error loading share presets.</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Share Presets</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Available shares shown in Import, Transactions, Bills, Mappings, and Payment Methods
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14">Order</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Color</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {presetsQuery.data.map((preset) => (
              <TableRow key={preset.id}>
                <TableCell className="text-muted-foreground tabular-nums">
                  {preset.sortOrder}
                </TableCell>
                <TableCell>
                  <SharePill sharePercent={preset.percent} presets={presetsQuery.data} />
                </TableCell>
                <TableCell className="font-medium tabular-nums">{preset.percent}%</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block size-3.5 rounded-full border"
                      style={{ backgroundColor: preset.color ?? "#64748b" }}
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      {preset.color ?? "—"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <SharePresetDialog
                      preset={preset}
                      trigger={
                        <Button size="icon">
                          <EditIcon />
                        </Button>
                      }
                    />
                    <DeleteSharePresetButton
                      preset={preset}
                      disabled={presetsQuery.data.length <= 1}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <SharePresetDialog
          trigger={
            <Button variant="outline">
              <PlusIcon />
              Create Share Preset
            </Button>
          }
        />
      </CardFooter>
    </Card>
  )
}
