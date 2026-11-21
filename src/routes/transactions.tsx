import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { flexRender, useTable } from "@tanstack/react-table"
import type { ColumnDef, SortingState } from "@tanstack/react-table"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EditIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  SparklesIcon,
  TrashIcon,
} from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import * as v from "valibot"

import { MonthHeader } from "@/components/budget/month-header"
import { CreateMappingButton } from "@/components/mapping/create"
import { SharePill } from "@/components/share-pill"
import { transactionsTableFeatures } from "@/components/transactions/table-features"
import type { PersistedTransaction } from "@/components/transactions/transaction-dialog"
import { TransactionDialog } from "@/components/transactions/transaction-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getDefaultMonthId, usePersistActiveMonth } from "@/hooks/use-active-month"
import { useSharePresets } from "@/hooks/use-share-presets"
import { computeShareCents, formatCents, isValidMonthId } from "@/lib/budget/calculations"
import {
  deleteTransaction,
  getPaymentMethods,
  listMonthTransactions,
  updateTransaction,
} from "@/lib/server/budget"
import { getCategories } from "@/lib/server/functions"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/transactions")({
  component: TransactionsPage,
  validateSearch: v.object({
    month: v.optional(v.string()),
    category: v.optional(v.string()),
  }),
})

const formatShortDate = (isoDate: string): string => {
  const parts = isoDate.split("-")
  if (parts.length !== 3) return isoDate
  return `${parts[2]}/${parts[1]}`
}

function TransactionsPage() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: "/transactions" })
  const queryClient = useQueryClient()

  const monthId = search.month && isValidMonthId(search.month) ? search.month : getDefaultMonthId()
  usePersistActiveMonth(monthId)

  const [queryText, setQueryText] = useState("")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [shareFilter, setShareFilter] = useState("all")
  const [showExcluded, setShowExcluded] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([{ id: "date", desc: true }])

  const categoryFilter = search.category ?? "all"

  const transactionsQuery = useQuery({
    queryKey: ["transactions", monthId],
    queryFn: () => listMonthTransactions({ data: { monthId } }),
  })

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const paymentMethodsQuery = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: getPaymentMethods,
  })

  const categories = categoriesQuery.data ?? []
  const paymentMethods = paymentMethodsQuery.data ?? []
  const { presets: sharePresets } = useSharePresets()
  const presetPercentSet = useMemo(
    () => new Set(sharePresets.map((p) => p.percent)),
    [sharePresets],
  )
  const pmById = useMemo(() => new Map(paymentMethods.map((pm) => [pm.id, pm])), [paymentMethods])

  const updateMutation = useMutation({
    mutationKey: ["updateTransactionInline"],
    mutationFn: (data: Parameters<typeof updateTransaction>[0]["data"]) =>
      updateTransaction({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", monthId] })
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to update transaction")
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["deleteTransaction"],
    mutationFn: (id: number) => deleteTransaction({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", monthId] })
      queryClient.invalidateQueries({ queryKey: ["budget", monthId] })
      toast.success("Transaction deleted")
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to delete transaction")
    },
  })

  const filteredData = useMemo(() => {
    const raw = transactionsQuery.data ?? []
    const lowerQ = queryText.trim().toLowerCase()
    return raw.filter((tx) => {
      if (!showExcluded && tx.excluded) return false
      if (categoryFilter !== "all" && tx.categorySlug !== categoryFilter) return false
      if (paymentMethodFilter !== "all") {
        if (paymentMethodFilter === "none" && tx.paymentMethodId !== null) return false
        if (paymentMethodFilter !== "none" && String(tx.paymentMethodId) !== paymentMethodFilter) {
          return false
        }
      }
      if (shareFilter !== "all") {
        if (shareFilter === "custom") {
          if (presetPercentSet.has(tx.sharePercent)) {
            return false
          }
        } else if (String(tx.sharePercent) !== shareFilter) {
          return false
        }
      }
      if (lowerQ) {
        const matchesName = tx.name.toLowerCase().includes(lowerQ)
        const matchesSource = tx.sourceName?.toLowerCase().includes(lowerQ) ?? false
        if (!matchesName && !matchesSource) return false
      }
      return true
    })
  }, [
    transactionsQuery.data,
    showExcluded,
    categoryFilter,
    paymentMethodFilter,
    shareFilter,
    presetPercentSet,
    queryText,
  ])

  const totals = useMemo(() => {
    let grossCents = 0
    let yourShareCents = 0
    for (const tx of filteredData) {
      if (tx.excluded) continue
      grossCents += tx.amountCents
      yourShareCents += computeShareCents(tx.amountCents, tx.sharePercent)
    }
    return { count: filteredData.length, grossCents, yourShareCents }
  }, [filteredData])

  const columns = useMemo<Array<ColumnDef<typeof transactionsTableFeatures, PersistedTransaction>>>(
    () => [
      {
        id: "date",
        accessorKey: "date",
        header: ({ column }) => (
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
        ),
        cell: ({ row }) => (
          <span className="text-xs whitespace-nowrap text-muted-foreground tabular-nums">
            {formatShortDate(row.original.date)}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex max-w-64 items-center gap-1.5">
            <span
              className={cn("truncate font-medium", row.original.excluded && "line-through")}
              title={row.original.name}
            >
              {row.original.name}
            </span>
            {row.original.excluded && (
              <Badge variant="outline" className="shrink-0 text-[10px]">
                Excluded
              </Badge>
            )}
          </div>
        ),
      },
      {
        id: "amount",
        accessorKey: "amountCents",
        header: ({ column }) => (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="-mr-2"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Amount
              {column.getIsSorted() === "asc" ? (
                <ArrowUpIcon className="ml-1 size-3.5" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDownIcon className="ml-1 size-3.5" />
              ) : null}
            </Button>
          </div>
        ),
        cell: ({ row }) => (
          <div
            className={cn(
              "text-right whitespace-nowrap tabular-nums",
              row.original.amountCents < 0 && "text-emerald-600 dark:text-emerald-400",
            )}
          >
            {formatCents(row.original.amountCents)}
          </div>
        ),
      },
      {
        id: "category",
        header: "Category",
        enableSorting: false,
        cell: ({ row }) => (
          <Select
            value={row.original.categorySlug}
            items={categories.map((c) => ({ value: c.slug, label: c.label }))}
            onValueChange={(slug) => {
              if (!slug || slug === row.original.categorySlug) return
              updateMutation.mutate({ id: row.original.id, categorySlug: slug })
            }}
          >
            <SelectTrigger className="h-7 w-36 text-xs">
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
        ),
      },
      {
        id: "paymentMethod",
        header: "Payment Method",
        enableSorting: false,
        cell: ({ row }) => {
          const pm = row.original.paymentMethodId ? pmById.get(row.original.paymentMethodId) : null
          return (
            <span className="text-xs whitespace-nowrap text-muted-foreground">
              {pm?.label ?? "—"}
            </span>
          )
        },
      },
      {
        id: "share",
        header: "Share",
        enableSorting: false,
        cell: ({ row }) => (
          <SharePill
            sharePercent={row.original.sharePercent}
            onChange={(next) => updateMutation.mutate({ id: row.original.id, sharePercent: next })}
          />
        ),
      },
      {
        id: "yourShare",
        header: () => <div className="text-right">Your Share</div>,
        enableSorting: false,
        cell: ({ row }) => {
          const shareCents = computeShareCents(row.original.amountCents, row.original.sharePercent)
          return (
            <div
              className={cn(
                "text-right font-medium whitespace-nowrap tabular-nums",
                row.original.excluded && "text-muted-foreground line-through",
                !row.original.excluded &&
                  shareCents < 0 &&
                  "text-emerald-600 dark:text-emerald-400",
              )}
            >
              {formatCents(shareCents)}
            </div>
          )
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        enableSorting: false,
        cell: ({ row }) => {
          const tx = row.original
          return (
            <div className="flex items-center justify-end gap-0.5">
              <Button
                variant="ghost"
                size="icon-sm"
                title={tx.excluded ? "Include in budget" : "Exclude from budget"}
                aria-label={tx.excluded ? "Include in budget" : "Exclude from budget"}
                onClick={() => updateMutation.mutate({ id: tx.id, excluded: !tx.excluded })}
              >
                {tx.excluded ? (
                  <EyeIcon className="size-3.5" />
                ) : (
                  <EyeOffIcon className="size-3.5 text-muted-foreground" />
                )}
              </Button>
              <CreateMappingButton
                defaultValues={{
                  fromName: tx.sourceName ?? tx.name,
                  toName: tx.name,
                  toCategory: tx.categorySlug,
                  fromPrice: tx.amountCents / 100,
                  defaultSharePercent: tx.sharePercent,
                }}
                trigger={
                  <Button variant="ghost" size="icon-sm" title="Create mapping rule">
                    <SparklesIcon className="size-3.5 text-muted-foreground" />
                  </Button>
                }
              />
              <TransactionDialog
                activeMonthId={monthId}
                transaction={tx}
                categories={categories}
                paymentMethods={paymentMethods}
                trigger={
                  <Button variant="ghost" size="icon-sm" title="Edit transaction">
                    <EditIcon className="size-3.5" />
                  </Button>
                }
              />
              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <Button variant="ghost" size="icon-sm" title="Delete transaction">
                      <TrashIcon className="size-3.5 text-destructive" />
                    </Button>
                  }
                />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete transaction?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Remove "{tx.name}" ({formatCents(tx.amountCents)}) from this month?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(tx.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )
        },
      },
    ],
    [categories, paymentMethods, pmById, monthId, updateMutation, deleteMutation],
  )

  const table = useTable({
    features: transactionsTableFeatures,
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    state: { sorting },
  })

  const handleSelectMonth = (nextMonthId: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        month: nextMonthId,
      }),
    })
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6">
      <MonthHeader
        monthId={monthId}
        onSelectMonth={handleSelectMonth}
        rightSlot={
          <TransactionDialog
            activeMonthId={monthId}
            categories={categories}
            paymentMethods={paymentMethods}
            trigger={
              <Button size="sm">
                <PlusIcon className="size-3.5" />
                Add Transaction
              </Button>
            }
          />
        }
      />

      {/* Filters & Summary Bar */}
      <Card>
        <CardContent className="flex flex-col gap-3 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="Search name..."
              className="w-52"
            />

            <Select
              value={categoryFilter}
              items={[
                { value: "all", label: "All categories" },
                ...categories.map((c) => ({ value: c.slug, label: c.label })),
              ]}
              onValueChange={(val) => {
                if (!val) return
                navigate({
                  search: (prev) => ({
                    ...prev,
                    category: val === "all" ? undefined : val,
                  }),
                })
              }}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.slug}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={paymentMethodFilter}
              items={[
                { value: "all", label: "All methods" },
                ...paymentMethods.map((pm) => ({ value: String(pm.id), label: pm.label })),
                { value: "none", label: "No method" },
              ]}
              onValueChange={(val) => {
                if (val) setPaymentMethodFilter(val)
              }}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="All methods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All methods</SelectItem>
                {paymentMethods.map((pm) => (
                  <SelectItem key={pm.id} value={String(pm.id)}>
                    {pm.label}
                  </SelectItem>
                ))}
                <SelectItem value="none">No method</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={shareFilter}
              items={[
                { value: "all", label: "All shares" },
                ...sharePresets.map((p) => ({
                  value: String(p.percent),
                  label: `${p.label} (${p.percent}%)`,
                })),
                { value: "custom", label: "Custom %" },
              ]}
              onValueChange={(val) => {
                if (val) setShareFilter(val)
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All shares" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All shares</SelectItem>
                {sharePresets.map((p) => (
                  <SelectItem key={p.percent} value={String(p.percent)}>
                    {p.label} ({p.percent}%)
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom %</SelectItem>
              </SelectContent>
            </Select>

            <label className="ml-1 flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
              <Checkbox
                checked={showExcluded}
                onCheckedChange={(checked) => setShowExcluded(Boolean(checked))}
              />
              <span>Show excluded</span>
            </label>

            {(queryText ||
              categoryFilter !== "all" ||
              paymentMethodFilter !== "all" ||
              shareFilter !== "all") && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setQueryText("")
                  setPaymentMethodFilter("all")
                  setShareFilter("all")
                  navigate({ search: (prev) => ({ ...prev, category: undefined }) })
                }}
              >
                Clear filters
              </Button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs">
            <span className="text-muted-foreground">
              {totals.count} transaction{totals.count !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">
                Gross:{" "}
                <strong className="font-medium text-foreground tabular-nums">
                  {formatCents(totals.grossCents)}
                </strong>
              </span>
              <span>
                Your Share:{" "}
                <strong className="font-semibold tabular-nums">
                  {formatCents(totals.yourShareCents)}
                </strong>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-0">
          {transactionsQuery.isLoading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Loading transactions...
            </div>
          ) : transactionsQuery.isError ? (
            <div className="py-12 text-center text-sm text-destructive">
              Failed to load transactions.
            </div>
          ) : (
            <div className="overflow-auto">
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
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        className={row.original.excluded ? "opacity-55" : undefined}
                      >
                        {row.getAllCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-28 text-center text-xs text-muted-foreground"
                      >
                        No transactions found for this month. Add one manually or import from{" "}
                        <span className="font-medium text-foreground">/import</span>.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
