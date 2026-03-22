import { createFileRoute } from '@tanstack/react-router'
import { TransactionsProvider } from '@/context/transactions-context'
import { Results } from '@/components/results'
import { FetcherFormCard } from '@/components/fetcher-form-card'
import { ParserFormCard } from '@/components/parser-form-card'
import { getActiveFetchers } from '@/lib/server/functions'

export const Route = createFileRoute('/')({
  component: Home,
  loader: () => getActiveFetchers(),
})

function Home() {
  return (
    <TransactionsProvider>
      <HomeContent />
    </TransactionsProvider>
  )
}

function HomeContent() {
  const fetchers = Route.useLoaderData()

  return (
    <div className="min-h-screen flex items-center justify-center gap-6 px-4">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <ParserFormCard />
        {fetchers.length > 0 && <FetcherFormCard />}
      </div>

      <Results />
    </div>
  )
}
