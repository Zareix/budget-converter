import { asc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import type { AccountType } from "@/lib/db/schema"
import { accounts } from "@/lib/db/schema"

export const getAccounts = async () => {
  return db.select().from(accounts).orderBy(asc(accounts.sortOrder), asc(accounts.id))
}

export const addAccount = async ({
  slug,
  name,
  type,
  color,
  sortOrder,
}: {
  slug: string
  name: string
  type: AccountType
  color?: string | null
  sortOrder?: number
}) => {
  const existing = await getAccounts()
  const nextSortOrder =
    sortOrder ?? existing.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1
  const [created] = await db
    .insert(accounts)
    .values({
      slug: slug.trim().toLowerCase(),
      name: name.trim(),
      type,
      color: color?.trim() || null,
      sortOrder: nextSortOrder,
    })
    .returning()
  return created
}

export const editAccount = async ({
  id,
  name,
  type,
  color,
  sortOrder,
}: {
  id: number
  name: string
  type: AccountType
  color?: string | null
  sortOrder?: number
}) => {
  const [updated] = await db
    .update(accounts)
    .set({
      name: name.trim(),
      type,
      ...(color !== undefined && { color: color?.trim() || null }),
      ...(sortOrder !== undefined && { sortOrder }),
    })
    .where(eq(accounts.id, id))
    .returning()
  return updated
}

export const deleteAccount = async ({ id }: { id: number }) => {
  await db.delete(accounts).where(eq(accounts.id, id))
}
