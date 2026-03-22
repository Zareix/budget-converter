import { toast } from 'sonner'
import { stringify } from 'csv-stringify/browser/esm/sync'
import type { Transaction } from '@/lib/parsers'
import { useTransactions } from '@/context/transactions-context'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DataTable } from '@/components/results/data-table'
import { columns } from '@/components/results/columns'

export const Results = () => {
  const { transactions, resetTransactions } = useTransactions()
  const handleCopyAsCSV = (selectedTransactions: Array<Transaction>) => {
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>
          {transactions.length} transaction
          {transactions.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <DataTable
        columns={columns}
        data={transactions}
        handleCopyAsCSV={handleCopyAsCSV}
        reset={resetTransactions}
      />
    </Card>
  )
}
