import { Link, createFileRoute } from '@tanstack/react-router'
import * as v from 'valibot'
import { ChevronLeftIcon } from 'lucide-react'
import { Mappings } from '@/components/mapping'
import { EnableBankingSettings } from '@/components/settings/enable-banking'

export const Route = createFileRoute('/settings')({
  component: SettingsRouteComponent,
  validateSearch: v.object({
    q: v.optional(v.string()),
  }),
})

function SettingsRouteComponent() {
  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto gap-6 py-8">
      <h1 className="text-2xl font-bold flex gap-2 items-center">
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
