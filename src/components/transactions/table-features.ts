import { createSortedRowModel, rowSortingFeature, tableFeatures } from "@tanstack/react-table"

export const transactionsTableFeatures = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
})
