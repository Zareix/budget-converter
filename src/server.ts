import handler, { createServerEntry } from "@tanstack/react-start/server-entry"

import { migrateDB } from "@/lib/db/migrate"
import { paraglideMiddleware } from "@/paraglide/server"

await migrateDB()

export default createServerEntry({
  fetch(req) {
    return paraglideMiddleware(req, () => handler.fetch(req))
  },
})
