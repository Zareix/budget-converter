import handler, { createServerEntry } from '@tanstack/react-start/server-entry'
import { migrateDB } from '@/lib/db/migrate'

await migrateDB()

export default createServerEntry({
  fetch(req) {
    return handler.fetch(req)
  },
})
