import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { Transaction } from '@/lib/parsers'
import { Results } from '@/components/results'
import { FetcherFormCard } from '@/components/fetcher-form-card'
import { ParserFormCard } from '@/components/parser-form-card'
import { getActiveFetchers } from '@/lib/server/functions'

export const Route = createFileRoute('/')({
  component: Home,
  loader: () => getActiveFetchers(),
})

function Home() {
  const fetchers = Route.useLoaderData()
  const [transactions, setTransactions] = useState<Array<Transaction>>([])

  const reset = () => setTransactions([])

  return (
    <div className="min-h-screen flex items-center justify-center gap-6 px-4">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <ParserFormCard setTransactions={setTransactions} reset={reset} />
        {fetchers.length > 0 && (
          <FetcherFormCard setTransactions={setTransactions} reset={reset} />
        )}
      </div>

      <Results transactions={transactions} />
    </div>
  )
}
