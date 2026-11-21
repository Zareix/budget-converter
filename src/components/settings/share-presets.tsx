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
import { m } from "@/paraglide/messages"

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
      toast.success(preset ? m.share_presets_updated_toast() : m.share_presets_created_toast())
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
          <FieldLabel htmlFor="share-preset-label">{m.common_label()}</FieldLabel>
          <Input
            id="share-preset-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder={m.share_presets_label_placeholder()}
            required
          />
          <FieldDescription>{m.share_presets_label_desc()}</FieldDescription>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="share-preset-percent">
              {m.share_presets_percent_label()}
            </FieldLabel>
            <Input
              id="share-preset-percent"
              type="number"
              min={0}
              max={100}
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              required
            />
            <FieldDescription>{m.share_presets_percent_desc()}</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="share-preset-order">{m.common_sort_order()}</FieldLabel>
            <Input
              id="share-preset-order"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              placeholder={m.common_auto()}
            />
            <FieldDescription>{m.share_presets_order_desc()}</FieldDescription>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="share-preset-color">{m.common_color()}</FieldLabel>
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
              : m.share_presets_save_error()}
          </p>
        )}
        <Button
          type="submit"
          disabled={!label.trim() || !isPercentValid || mutation.isPending}
          className="self-end"
        >
          {mutation.isPending ? m.common_saving() : m.common_save()}
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
          <DialogTitle>
            {preset ? m.share_presets_edit_title() : m.share_presets_create_title()}
          </DialogTitle>
          <DialogDescription>{m.share_presets_dialog_desc()}</DialogDescription>
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
      toast.success(m.share_presets_deleted_toast())
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
          <DialogTitle>{m.share_presets_delete_title()}</DialogTitle>
          <DialogDescription>
            {m.share_presets_delete_desc({ label: preset.label, percent: preset.percent })}
          </DialogDescription>
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

export const SharePresetsSettings = () => {
  const presetsQuery = useQuery({ queryKey: ["sharePresets"], queryFn: getSharePresets })

  if (presetsQuery.isLoading) return <div>{m.share_presets_loading()}</div>
  if (presetsQuery.isError || !presetsQuery.data) {
    return <div>{m.share_presets_load_error()}</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{m.share_presets_title()}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>{m.share_presets_caption()}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14">{m.common_order()}</TableHead>
              <TableHead>{m.share_presets_col_preview()}</TableHead>
              <TableHead>{m.share_presets_col_percentage()}</TableHead>
              <TableHead>{m.common_color()}</TableHead>
              <TableHead className="w-24 text-right">{m.common_actions()}</TableHead>
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
              {m.share_presets_create_button()}
            </Button>
          }
        />
      </CardFooter>
    </Card>
  )
}
