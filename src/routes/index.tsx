import { createFileRoute } from "@tanstack/react-router"

import { FetcherFormCard } from "@/components/fetcher-form-card"
import { ParserFormCard } from "@/components/parser-form-card"
import { Results } from "@/components/results"
import { TransactionsProvider } from "@/context/transactions-context"
import { getActiveFetchers } from "@/lib/server/functions"

export const Route = createFileRoute("/")({
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
    <div className="grid min-h-screen items-center justify-center gap-6 px-4 md:grid-cols-3">
      <div className="flex w-full flex-col gap-4">
        <ParserFormCard />
        {fetchers.length > 0 && <FetcherFormCard />}
      </div>

      <Results />
    </div>
  )
}
