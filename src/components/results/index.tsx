import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { stringify } from "csv-stringify/browser/esm/sync"
import { useMemo } from "react"
import { toast } from "sonner"

import { createImportColumns } from "@/components/results/columns"
import { DataTable } from "@/components/results/data-table"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTransactions } from "@/context/transactions-context"
import type { Transaction } from "@/lib/parsers"
import { getExistingExternalIds, importTransactions } from "@/lib/server/budget"
import { getCategories } from "@/lib/server/functions"

export const Results = () => {
  const queryClient = useQueryClient()
  const { transactions, updateTransactionAt, resetTransactions } = useTransactions()

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const externalIds = useMemo(
    () => transactions.map((tx) => tx.externalId).filter(Boolean),
    [transactions],
  )

  const existingIdsQuery = useQuery({
    queryKey: ["existingExternalIds", externalIds],
    queryFn: () => getExistingExternalIds({ data: { ids: externalIds } }),
    enabled: externalIds.length > 0,
  })

  const existingExternalIds = useMemo(
    () => new Set(existingIdsQuery.data ?? []),
    [existingIdsQuery.data],
  )

  const importMutation = useMutation({
    mutationKey: ["importTransactions"],
    mutationFn: async (selectedTransactions: Array<Transaction>) => {
      const items = selectedTransactions
        .filter((tx) => !tx.excluded)
        .map((tx) => ({
          monthId: tx.monthId,
          date: tx.isoDate,
          name: tx.name,
          sourceName: tx.sourceName,
          amountCents: tx.amountCents,
          sharePercent: tx.sharePercent,
          categorySlug: tx.categorySlug,
          paymentMethodId: tx.paymentMethodId,
          excluded: false,
          externalId: tx.externalId,
          raw: tx.raw,
        }))
      return importTransactions({ data: { items } })
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["existingExternalIds"] })
      queryClient.invalidateQueries({ queryKey: ["budget"] })
      queryClient.invalidateQueries({ queryKey: ["months"] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      toast.success(
        `Imported ${res.imported} transaction${res.imported !== 1 ? "s" : ""}${
          res.skipped > 0 ? ` (${res.skipped} skipped)` : ""
        }`,
        { position: "bottom-right" },
      )
    },
    onError: (error) => {
      toast.error("Failed to import transactions", {
        description: error instanceof Error ? error.message : "Unknown error",
        position: "bottom-right",
      })
    },
  })

  const handleCopyAsCSV = (selectedTransactions: Array<Transaction>) => {
    const exportable = selectedTransactions.filter((transaction) => !transaction.excluded)
    if (exportable.length === 0) {
      toast.error("No transactions selected", {
        description: "Please select at least one transaction to copy.",
        position: "bottom-right",
      })
      return
    }

    try {
      const allRecords = exportable.toSorted(
        (a, b) => a.originalDate.getTime() - b.originalDate.getTime(),
      )
      const csv = stringify(allRecords, {
        delimiter: ";",
        columns: ["date", "name", "amount", "category", "paymentMethod"],
      })

      navigator.clipboard.writeText(csv)
      toast.success("Copied to clipboard!", {
        description: `${exportable.length} transaction${exportable.length !== 1 ? "s" : ""} copied to your clipboard.`,
        position: "bottom-right",
      })
    } catch {
      toast.error("Failed to copy", {
        description: "Could not copy CSV to clipboard.",
        position: "bottom-right",
      })
    }
  }

  const columns = useMemo(
    () =>
      createImportColumns({
        categories: categoriesQuery.data ?? [],
        existingExternalIds,
        onUpdateRow: updateTransactionAt,
      }),
    [categoriesQuery.data, existingExternalIds, updateTransactionAt],
  )

  if (transactions.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Preview & Import</CardTitle>
          <CardDescription>
            Upload a CSV or fetch from connected accounts to review, adjust shares & categories, and
            import directly into your monthly budget.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const disabledCount = transactions.filter((transaction) => transaction.excluded).length
  const importedCount = transactions.filter((tx) => existingExternalIds.has(tx.externalId)).length

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>
          {transactions.length - disabledCount} transaction
          {transactions.length - disabledCount !== 1 ? "s" : ""}
          {disabledCount > 0 ? ` • ${disabledCount} disabled` : ""}
          {importedCount > 0 ? ` • ${importedCount} already imported` : ""}
        </CardDescription>
      </CardHeader>
      <DataTable
        columns={columns}
        data={transactions}
        existingExternalIds={existingExternalIds}
        isImporting={importMutation.isPending}
        handleImport={(selected) => importMutation.mutate(selected)}
        handleCopyAsCSV={handleCopyAsCSV}
        reset={resetTransactions}
      />
    </Card>
  )
}
