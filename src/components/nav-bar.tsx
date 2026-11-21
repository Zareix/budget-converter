import { Link, useRouterState } from "@tanstack/react-router"
import { ArrowLeftRightIcon, DownloadIcon, PieChartIcon, SettingsIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { to: "/", label: "Budget", icon: PieChartIcon, exact: true },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRightIcon, exact: false },
  { to: "/import", label: "Import", icon: DownloadIcon, exact: false },
  { to: "/settings", label: "Settings", icon: SettingsIcon, exact: false },
] as const

export const NavBar = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="flex size-6 items-center justify-center rounded-sm bg-primary text-xs font-bold text-primary-foreground">
            €
          </span>
          <span>Budget</span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => {
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
      </div>
    </header>
  )
}
