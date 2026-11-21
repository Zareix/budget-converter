import type { ColumnDef } from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpIcon, InfoIcon } from "lucide-react"
import { useEffect, useState } from "react"

import { InlineAmountInput } from "@/components/budget/inline-amount-input"
import { CreateMappingButton } from "@/components/mapping/create"
import type { resultTableFeatures } from "@/components/results/table-features"
import { SharePill } from "@/components/share-pill"
import { Badge } from "@/components/ui/badge"
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { computeShareCents, formatCents, isValidMonthId } from "@/lib/budget/calculations"
import type { Transaction } from "@/lib/parsers"

export type ImportCategoryOption = {
  slug: string
  label: string
}

const InlineNameInput = ({
  value,
  disabled,
  onSave,
}: {
  value: string
  disabled?: boolean
  onSave: (next: string) => void
}) => {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  useEffect(() => {
    if (!editing) {
      setDraft(value)
    }
  }, [value, editing])

  const commit = () => {
    setEditing(false)
    const trimmed = draft.trim()
    if (!trimmed) {
      setDraft(value)
      return
    }
    if (trimmed !== value) {
      onSave(trimmed)
    }
  }

  if (editing) {
    return (
      <Input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur()
          } else if (e.key === "Escape") {
            setDraft(value)
            setEditing(false)
          }
        }}
        className="h-7 min-w-48 px-1.5 text-xs"
      />
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        setDraft(value)
        setEditing(true)
      }}
      title={`${value} (click to edit)`}
      className="max-w-72 cursor-pointer truncate px-1.5 py-1 text-left text-xs font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:hover:bg-transparent"
    >
      {value}
    </button>
  )
}

export const createImportColumns = ({
  categories,
  existingExternalIds,
  onUpdateRow,
}: {
  categories: Array<ImportCategoryOption>
  existingExternalIds: Set<string>
  onUpdateRow: (index: number, patch: Partial<Transaction>) => void
}): Array<ColumnDef<typeof resultTableFeatures, Transaction>> => [
  {
    id: "select",
    header: ({ table }) => {
      const allPageRowsSelected = table.getIsAllPageRowsSelected()
      const somePageRowsSelected = table.getIsSomePageRowsSelected()
      return (
        <Checkbox
          checked={allPageRowsSelected}
          indeterminate={!allPageRowsSelected && somePageRowsSelected}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      )
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    id: "date",
    sortFn: (rowA, rowB) =>
      rowA.original.originalDate.getTime() - rowB.original.originalDate.getTime(),
    accessorFn: (row) =>
      row.originalDate.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: undefined,
      }),
    filterFn: (row, _id, value: number) => {
      const rowDate = row.original.originalDate
      return rowDate.getMonth() === value - 1
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          {column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-1 size-3.5" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-1 size-3.5" />
          ) : null}
        </Button>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: false,
    cell: ({ row }) => {
      const isImported = existingExternalIds.has(row.original.externalId)
      return (
        <div className="flex items-center gap-1.5">
          <InlineNameInput
            value={row.original.name}
            disabled={isImported}
            onSave={(nextName) => onUpdateRow(row.index, { name: nextName })}
          />
          {row.original.excluded && <Badge variant="outline">Disabled</Badge>}
          {isImported && (
            <Badge variant="secondary" className="shrink-0">
              Imported
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    id: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const isImported = existingExternalIds.has(row.original.externalId)
      return (
        <div className="flex justify-end">
          <InlineAmountInput
            cents={row.original.amountCents}
            disabled={isImported}
            onSave={(nextCents) => {
              const cents = nextCents ?? 0
              onUpdateRow(row.index, {
                amountCents: cents,
                amount: (cents / 100).toFixed(2).replace(".", ","),
              })
            }}
          />
        </div>
      )
    },
  },
  {
    id: "category",
    header: "Category",
    cell: ({ row }) => {
      const isImported = existingExternalIds.has(row.original.externalId)
      return (
        <Select
          disabled={isImported}
          value={row.original.categorySlug}
          items={categories.map((c) => ({ value: c.slug, label: c.label }))}
          onValueChange={(slug) => {
            if (!slug) return
            const found = categories.find((c) => c.slug === slug)
            onUpdateRow(row.index, {
              categorySlug: slug,
              category: found?.label ?? slug,
            })
          }}
        >
          <SelectTrigger className="h-7 w-40 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
    enableSorting: false,
    cell: ({ row }) => (
      <span className="text-xs whitespace-nowrap text-muted-foreground">
        {row.original.paymentMethod}
      </span>
    ),
  },
  {
    id: "share",
    header: "Share",
    cell: ({ row }) => {
      const isImported = existingExternalIds.has(row.original.externalId)
      return (
        <SharePill
          sharePercent={row.original.sharePercent}
          disabled={isImported}
          onChange={(next) => onUpdateRow(row.index, { sharePercent: next })}
        />
      )
    },
  },
  {
    id: "yourShare",
    header: () => <div className="text-right">Your Share</div>,
    cell: ({ row }) => {
      const shareCents = computeShareCents(row.original.amountCents, row.original.sharePercent)
      return (
        <div className="text-right font-medium whitespace-nowrap tabular-nums">
          {formatCents(shareCents)}
        </div>
      )
    },
  },
  {
    id: "monthId",
    header: "Month",
    cell: ({ row }) => {
      const isImported = existingExternalIds.has(row.original.externalId)
      return (
        <Input
          type="month"
          disabled={isImported}
          value={row.original.monthId}
          onChange={(e) => {
            const val = e.target.value
            if (isValidMonthId(val)) {
              onUpdateRow(row.index, { monthId: val })
            }
          }}
          className="h-7 w-32 px-1.5 text-xs"
        />
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original
      return (
        <div className="flex items-center gap-1">
          <CreateMappingButton
            defaultValues={{
              fromName: transaction.sourceName,
              toName: transaction.name,
              toCategory: transaction.categorySlug,
              fromPrice: transaction.amountCents / 100,
              defaultSharePercent: transaction.sharePercent,
            }}
          />
          <Dialog>
            <DialogTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Raw data" />}>
              <InfoIcon />
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{row.original.name}</DialogTitle>
                <DialogDescription>
                  Raw transaction data ({row.original.externalId})
                </DialogDescription>
              </DialogHeader>
              <pre className="max-h-[60vh] overflow-auto rounded-none border p-2 text-xs">
                {row.original.raw}
              </pre>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
]
