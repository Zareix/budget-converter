import { and, asc, eq, inArray } from "drizzle-orm"

import { db, runTransaction } from "@/lib/db"
import { accountSnapshots, accounts } from "@/lib/db/schema"

export const getSavingsAssetsOverview = async () => {
  const savingsAccounts = await db
    .select()
    .from(accounts)
    .where(eq(accounts.type, "savings"))
    .orderBy(asc(accounts.sortOrder), asc(accounts.id))

  if (savingsAccounts.length === 0) {
    return {
      accounts: savingsAccounts,
      snapshots: [] as Array<typeof accountSnapshots.$inferSelect>,
    }
  }

  const accountIds = savingsAccounts.map((a) => a.id)
  const snapshots = await db
    .select()
    .from(accountSnapshots)
    .where(inArray(accountSnapshots.accountId, accountIds))
    .orderBy(asc(accountSnapshots.monthId), asc(accountSnapshots.id))

  return {
    accounts: savingsAccounts,
    snapshots,
  }
}

export const upsertAccountSnapshot = async ({
  accountId,
  monthId,
  balanceCents,
  note,
}: {
  accountId: number
  monthId: string
  balanceCents: number
  note?: string | null
}) => {
  const now = new Date().toISOString()
  const existing = db
    .select()
    .from(accountSnapshots)
    .where(and(eq(accountSnapshots.accountId, accountId), eq(accountSnapshots.monthId, monthId)))
    .get()

  if (existing) {
    const [updated] = await db
      .update(accountSnapshots)
      .set({
        balanceCents,
        ...(note !== undefined && { note: note?.trim() || null }),
        updatedAt: now,
      })
      .where(eq(accountSnapshots.id, existing.id))
      .returning()
    return updated
  }

  const [created] = await db
    .insert(accountSnapshots)
    .values({
      accountId,
      monthId,
      balanceCents,
      note: note?.trim() || null,
      updatedAt: now,
    })
    .returning()
  return created
}

export const bulkUpsertAccountSnapshots = async ({
  monthId,
  entries,
}: {
  monthId: string
  entries: Array<{
    accountId: number
    balanceCents: number
    note?: string | null
  }>
}) => {
  if (entries.length === 0) return []

  return runTransaction(db, async (tx) => {
    const now = new Date().toISOString()
    const results: Array<typeof accountSnapshots.$inferSelect> = []

    for (const entry of entries) {
      const existing = tx
        .select()
        .from(accountSnapshots)
        .where(
          and(
            eq(accountSnapshots.accountId, entry.accountId),
            eq(accountSnapshots.monthId, monthId),
          ),
        )
        .get()

      if (existing) {
        const [updated] = await tx
          .update(accountSnapshots)
          .set({
            balanceCents: entry.balanceCents,
            ...(entry.note !== undefined && { note: entry.note?.trim() || null }),
            updatedAt: now,
          })
          .where(eq(accountSnapshots.id, existing.id))
          .returning()
        if (updated) results.push(updated)
      } else {
        const [created] = await tx
          .insert(accountSnapshots)
          .values({
            accountId: entry.accountId,
            monthId,
            balanceCents: entry.balanceCents,
            note: entry.note?.trim() || null,
            updatedAt: now,
          })
          .returning()
        if (created) results.push(created)
      }
    }

    return results
  })
}

export const deleteAccountSnapshot = async ({
  accountId,
  monthId,
}: {
  accountId: number
  monthId: string
}) => {
  await db
    .delete(accountSnapshots)
    .where(and(eq(accountSnapshots.accountId, accountId), eq(accountSnapshots.monthId, monthId)))
}
