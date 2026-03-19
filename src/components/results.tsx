import { useState } from 'react'
import { toast } from 'sonner'
import { stringify } from 'csv-stringify/browser/esm/sync'
import { useQuery } from '@tanstack/react-query'
import type { Transaction } from '@/lib/parsers'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Props = {
  transactions: Array<Transaction>
}

export const Results = ({ transactions }: Props) => {
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
    new Set(transactions.map((_, idx) => idx)),
  )

  const toggleSelectAll = () => {
    if (selectedIndices.size === transactions.length) {
      setSelectedIndices(new Set())
    } else {
      setSelectedIndices(new Set(transactions.map((_, idx) => idx)))
    }
  }

  const toggleSelectOne = (idx: number) => {
    setSelectedIndices((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(idx)) {
        newSet.delete(idx)
      } else {
        newSet.add(idx)
      }
      return newSet
    })
  }

  const handleCopyAsCSV = () => {
    const selectedTransactions = transactions.filter((_, idx) =>
      selectedIndices.has(idx),
    )

    if (selectedTransactions.length === 0) {
      toast.error('No transactions selected', {
        description: 'Please select at least one transaction to copy.',
        position: 'bottom-right',
      })
      return
    }

    try {
      const allRecords = selectedTransactions.sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'))
        const dateB = new Date(b.date.split('/').reverse().join('-'))
        return dateA.getTime() - dateB.getTime()
      })
      const csv = stringify(allRecords, {
        delimiter: ';',
        columns: ['date', 'name', 'amount', 'category', 'paymentMethod'],
      })

      navigator.clipboard.writeText(csv)
      toast.success('Copied to clipboard!', {
        description: `${selectedTransactions.length} transaction${selectedTransactions.length !== 1 ? 's' : ''} copied to your clipboard.`,
        position: 'bottom-right',
      })
    } catch (error) {
      toast.error('Failed to copy', {
        description: 'Could not copy CSV to clipboard.',
        position: 'bottom-right',
      })
    }
  }

  if (transactions.length === 0) {
    return null
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Parsed Results</CardTitle>
        <CardDescription>
          {transactions.length} transaction
          {transactions.length !== 1 ? 's' : ''} processed •{' '}
          {selectedIndices.size} selected
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto overflow-y-auto max-h-96">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="text-left p-2 font-medium w-10">
                  <Checkbox
                    checked={selectedIndices.size === transactions.length}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all transactions"
                    className={
                      selectedIndices.size > 0 &&
                      selectedIndices.size < transactions.length
                        ? 'data-[state=checked]:bg-gray-400'
                        : ''
                    }
                  >
                    <span className="sr-only">Select all</span>
                  </Checkbox>
                </TableHead>
                <TableHead className="text-left p-2 font-medium capitalize">
                  Date
                </TableHead>
                <TableHead className="text-left p-2 font-medium capitalize">
                  Name
                </TableHead>
                <TableHead className="text-left p-2 font-medium capitalize">
                  Amount
                </TableHead>
                <TableHead className="text-left p-2 font-medium capitalize">
                  Category
                </TableHead>
                <TableHead className="text-left p-2 font-medium capitalize">
                  Payment Method
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="p-2">
                    <Checkbox
                      checked={selectedIndices.has(idx)}
                      onCheckedChange={() => toggleSelectOne(idx)}
                      aria-label={`Select transaction ${idx + 1}`}
                    />
                  </TableCell>
                  <TableCell className="p-2">{row.date}</TableCell>
                  <TableCell className="p-2">{row.name}</TableCell>
                  <TableCell className="p-2">{row.amount}</TableCell>
                  <TableCell className="p-2">{row.category}</TableCell>
                  <TableCell className="p-2">{row.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCopyAsCSV}>Copy as CSV</Button>
      </CardFooter>
    </Card>
  )
}
