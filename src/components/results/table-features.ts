import {
  columnFilteringFeature,
  createFilteredRowModel,
  createSortedRowModel,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
} from "@tanstack/react-table"

// TanStack Table v9 requires registering every feature the table uses.
// This object must stay stable, so it is defined at module scope.
export const resultTableFeatures = tableFeatures({
  columnFilteringFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
})
