import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { Transaction } from '@/lib/parsers'
import { Results } from '@/components/results'
import { FetcherFormCard } from '@/components/fetcher-form-card'
import { ParserFormCard } from '@/components/parser-form-card'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [transactions, setTransactions] = useState<Array<Transaction>>([])

  const reset = () => setTransactions([])

  return (
    <div className="min-h-screen flex items-center justify-center gap-6 flex-wrap">
      <div className="flex flex-col gap-4 w-full max-w-lg">
        <ParserFormCard setTransactions={setTransactions} reset={reset} />
        <FetcherFormCard setTransactions={setTransactions} reset={reset} />
      </div>

      <Results transactions={transactions} />
    </div>
  )
}
