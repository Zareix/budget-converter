import { Database } from "bun:sqlite"
import { writeFile } from "node:fs/promises"

import { drizzle } from "drizzle-orm/bun-sqlite"
import { migrate } from "drizzle-orm/bun-sqlite/migrator"

import { env } from "@/env"

export const migrateDB = async () => {
  if (!(await Bun.file(env.DATABASE_PATH).exists())) {
    console.log("Database file created")
    await writeFile(env.DATABASE_PATH, "")
  }

  console.log("Migrating database...")

  const sqlite = new Database(env.DATABASE_PATH)
  sqlite.run("PRAGMA journal_mode = WAL;")
  sqlite.run("PRAGMA foreign_keys = ON;")
  const db = drizzle(sqlite)
  migrate(db, { migrationsFolder: "./drizzle" })

  const shareCount = sqlite.query("SELECT COUNT(*) as count FROM share_presets").get() as {
    count: number
  } | null
  if (shareCount && shareCount.count === 0) {
    sqlite.run(`
      INSERT OR IGNORE INTO share_presets (label, percent, color, sort_order) VALUES
        ('Personal', 100, '#10b981', 1),
        ('Shared', 50, '#0ea5e9', 2),
        ('Other', 0, '#64748b', 3);
    `)
  }

  console.log("Database migrated")

  db.$client.close()
}
