import { createFileRoute } from '@tanstack/react-router'
import * as v from 'valibot'
import { Mappings } from '@/components/mapping'

export const Route = createFileRoute('/settings')({
  component: SettingsRouteComponent,
  validateSearch: v.object({
    q: v.optional(v.string()),
  }),
})

function SettingsRouteComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center gap-6 px-4">
      <Mappings />
    </div>
  )
}
