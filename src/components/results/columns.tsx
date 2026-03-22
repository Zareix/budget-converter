import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import type { Transaction } from '@/lib/parsers'
import { CreateMappingButton } from '@/components/mapping'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: Array<ColumnDef<Transaction>> = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'date',
    sortingFn: (rowA, rowB) =>
      rowA.original.originalDate.getTime() -
      rowB.original.originalDate.getTime(),
    accessorFn: (row) =>
      row.originalDate.toLocaleDateString(undefined, {
        day: '2-digit',
        month: '2-digit',
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
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          {column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const transaction = row.original
      return (
        <CreateMappingButton
          defaultValues={{
            fromName: transaction.name,
            toName: transaction.name,
            fromPrice: Number.parseFloat(transaction.amount.replace(',', '.')),
          }}
        />
      )
    },
  },
]
