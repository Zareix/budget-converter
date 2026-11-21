import { Link, useRouterState } from "@tanstack/react-router"
import {
  ArrowLeftRightIcon,
  DownloadIcon,
  EuroIcon,
  GlobeIcon,
  LandmarkIcon,
  PieChartIcon,
  SettingsIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { m } from "@/paraglide/messages"
import type { Locale } from "@/paraglide/runtime"
import { getLocale, locales, setLocale } from "@/paraglide/runtime"

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
}

export const NavBar = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const currentLocale = getLocale()

  const navItems = [
    { to: "/", label: m.nav_budget(), icon: PieChartIcon, exact: true },
    { to: "/transactions", label: m.nav_transactions(), icon: ArrowLeftRightIcon, exact: false },
    { to: "/assets", label: m.nav_assets(), icon: LandmarkIcon, exact: false },
    { to: "/import", label: m.nav_import(), icon: DownloadIcon, exact: false },
    { to: "/settings", label: m.nav_settings(), icon: SettingsIcon, exact: false },
  ] as const

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <EuroIcon className="size-4.5" strokeWidth={2.5} />
          </span>
          <span>{m.app_title()}</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon, exact }) => {
              const active = exact ? pathname === to : pathname.startsWith(to)
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                  <span>{label}</span>
                </Link>
              )
            })}
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={m.nav_switch_language()}
                  className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <GlobeIcon className="size-3.5" />
                  <span className="uppercase">{currentLocale}</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              {locales.map((locale) => (
                <DropdownMenuItem
                  key={locale}
                  onClick={() => {
                    if (locale !== currentLocale) {
                      setLocale(locale)
                    }
                  }}
                  className={cn(locale === currentLocale && "font-semibold")}
                >
                  <span className="w-6 text-xs text-muted-foreground uppercase">{locale}</span>
                  <span>{LOCALE_LABELS[locale]}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
