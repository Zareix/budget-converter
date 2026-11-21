"use client"

import { flexRender, useTable } from "@tanstack/react-table"
import type {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table"
import React, { useEffect } from "react"

import { resultTableFeatures } from "@/components/results/table-features"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Transaction } from "@/lib/parsers"
import { m } from "@/paraglide/messages"
import { getLocale } from "@/paraglide/runtime"

interface DataTableProps {
  columns: Array<ColumnDef<typeof resultTableFeatures, Transaction>>
  data: Array<Transaction>
  existingExternalIds: Set<string>
  isImporting: boolean
  handleImport: (data: Array<Transaction>) => void
  handleCopyAsCSV: (data: Array<Transaction>) => void
  reset: () => void
}

const getLocalizedMonths = (): Array<{ value: number; label: string }> => {
  const formatter = new Intl.DateTimeFormat(getLocale() === "fr" ? "fr-FR" : "en-US", {
    month: "long",
    timeZone: "UTC",
  })
  return [
    { value: 0, label: m.results_all_months() },
    ...Array.from({ length: 12 }, (_, idx) => {
      const name = formatter.format(new Date(Date.UTC(2026, idx, 1)))
      return {
        value: idx + 1,
        label: name.charAt(0).toUpperCase() + name.slice(1),
      }
    }),
  ]
}

export function DataTable({
  columns,
  data,
  existingExternalIds,
  isImporting,
  handleImport,
  handleCopyAsCSV,
  reset,
}: DataTableProps) {
  const months = getLocalizedMonths()
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "date", desc: true }])
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  // Auto-select non-excluded, non-imported rows when data or existing IDs change
  const existingKey = Array.from(existingExternalIds).sort().join("|")
  useEffect(() => {
    const next: RowSelectionState = {}
    data.forEach((tx, idx) => {
      if (!tx.excluded && !existingExternalIds.has(tx.externalId)) {
        next[String(idx)] = true
      }
    })
    setRowSelection(next)
  }, [data.length, existingKey])

  const table = useTable({
    features: resultTableFeatures,
    data,
    columns,
    enableRowSelection: (row) =>
      !row.original.excluded && !existingExternalIds.has(row.original.externalId),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows.map((row) => row.original)

  return (
    <>
      <CardContent>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <Select
            items={months}
            value={table.getColumn("date")?.getFilterValue() ?? 0}
            onValueChange={(value) => {
              if (value === 0) {
                table.resetColumnFilters()
                return
              }
              table.getColumn("date")?.setFilterValue(value)
            }}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder={m.common_month()} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {months
                  .filter((month) =>
                    data.some((row) => {
                      if (!(row.originalDate instanceof Date)) {
                        return false
                      }
                      if (month.value === 0) {
                        return true
                      }
                      const rowDate = new Date(row.originalDate.getTime())
                      return rowDate.getMonth() === month.value - 1
                    }),
                  )
                  .map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <span className="text-xs text-muted-foreground">
            {m.results_selected_for_import({ count: selectedRows.length })}
          </span>
        </div>

        <div className="max-h-[65vh] overflow-auto border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => {
                  const isImported = existingExternalIds.has(row.original.externalId)
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={row.original.excluded || isImported ? "opacity-55" : undefined}
                    >
                      {row.getAllCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {m.results_no_results()}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={reset} disabled={isImporting}>
          {m.common_reset()}
        </Button>
        <Button
          type="button"
          onClick={() => handleImport(selectedRows)}
          disabled={isImporting || selectedRows.length === 0}
        >
          {isImporting
            ? m.common_importing()
            : m.results_import_button({ count: selectedRows.length })}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleCopyAsCSV(selectedRows)}
          disabled={selectedRows.length === 0}
        >
          {m.results_copy_csv()}
        </Button>
      </CardFooter>
    </>
  )
}
