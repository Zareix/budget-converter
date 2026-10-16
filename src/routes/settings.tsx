import { Link, createFileRoute } from "@tanstack/react-router"
import { ChevronLeftIcon } from "lucide-react"
import * as v from "valibot"

import { Mappings } from "@/components/mapping"
import { EnableBankingSettings } from "@/components/settings/enable-banking"

export const Route = createFileRoute("/settings")({
  component: SettingsRouteComponent,
  validateSearch: v.object({
    q: v.optional(v.string()),
  }),
})

function SettingsRouteComponent() {
  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 py-8">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <Link to="/">
          <ChevronLeftIcon />
        </Link>
        Settings
      </h1>
      <Mappings />
      <EnableBankingSettings />
    </div>
  )
}
