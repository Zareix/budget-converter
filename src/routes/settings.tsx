import { createFileRoute } from "@tanstack/react-router"
import * as v from "valibot"

import { Mappings } from "@/components/mapping"
import { AccountsSettings } from "@/components/settings/accounts"
import { CategoriesSettings } from "@/components/settings/categories"
import { EnableBankingSettings } from "@/components/settings/enable-banking"
import { PaymentMethodsSettings } from "@/components/settings/payment-methods"
import { SharePresetsSettings } from "@/components/settings/share-presets"
import { SubtrackerSettings } from "@/components/settings/subtracker"
import { m } from "@/paraglide/messages"

export const Route = createFileRoute("/settings")({
  component: SettingsRouteComponent,
  validateSearch: v.object({
    q: v.optional(v.string()),
  }),
})

function SettingsRouteComponent() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-4 py-6">
      <h1 className="text-xl font-semibold tracking-tight">{m.settings_title()}</h1>
      <Mappings />
      <CategoriesSettings />
      <SharePresetsSettings />
      <AccountsSettings />
      <PaymentMethodsSettings />
      <SubtrackerSettings />
      <EnableBankingSettings />
    </div>
  )
}
