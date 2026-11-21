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
import { m } from "@/paraglide/messages"

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
      const importedLabel =
        res.imported === 1
          ? m.results_imported_singular({ count: res.imported })
          : m.results_imported_plural({ count: res.imported })
      const skippedSuffix = res.skipped > 0 ? m.results_skipped_suffix({ count: res.skipped }) : ""
      toast.success(`${importedLabel}${skippedSuffix}`, { position: "bottom-right" })
    },
    onError: (error) => {
      toast.error(m.results_import_error(), {
        description: error instanceof Error ? error.message : m.common_unknown_error(),
        position: "bottom-right",
      })
    },
  })

  const handleCopyAsCSV = (selectedTransactions: Array<Transaction>) => {
    const exportable = selectedTransactions.filter((transaction) => !transaction.excluded)
    if (exportable.length === 0) {
      toast.error(m.results_no_selection_title(), {
        description: m.results_no_selection_desc(),
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
      toast.success(m.results_copied_title(), {
        description:
          exportable.length === 1
            ? m.results_copied_singular({ count: exportable.length })
            : m.results_copied_plural({ count: exportable.length }),
        position: "bottom-right",
      })
    } catch {
      toast.error(m.results_copy_error_title(), {
        description: m.results_copy_error_desc(),
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
          <CardTitle>{m.results_empty_title()}</CardTitle>
          <CardDescription>{m.results_empty_desc()}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const disabledCount = transactions.filter((transaction) => transaction.excluded).length
  const importedCount = transactions.filter((tx) => existingExternalIds.has(tx.externalId)).length
  const activeCount = transactions.length - disabledCount

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{m.results_title()}</CardTitle>
        <CardDescription>
          {activeCount === 1
            ? m.tx_count_singular({ count: activeCount })
            : m.tx_count_plural({ count: activeCount })}
          {disabledCount > 0 ? m.results_disabled_suffix({ count: disabledCount }) : ""}
          {importedCount > 0 ? m.results_already_imported_suffix({ count: importedCount }) : ""}
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
