import { createFileRoute } from "@tanstack/react-router"

import { FetcherFormCard } from "@/components/fetcher-form-card"
import { ParserFormCard } from "@/components/parser-form-card"
import { Results } from "@/components/results"
import { TransactionsProvider } from "@/context/transactions-context"
import { getActiveFetchers } from "@/lib/server/functions"

export const Route = createFileRoute("/import")({
  component: ImportPage,
  loader: () => getActiveFetchers(),
})

function ImportPage() {
  return (
    <TransactionsProvider>
      <ImportContent />
    </TransactionsProvider>
  )
}

function ImportContent() {
  const fetchers = Route.useLoaderData()

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6">
      <div className={fetchers.length > 0 ? "grid items-start gap-4 md:grid-cols-2" : "max-w-xl"}>
        <ParserFormCard />
        {fetchers.length > 0 && <FetcherFormCard />}
      </div>

      <Results />
    </div>
  )
}
