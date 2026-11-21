import { asc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { sharePresets } from "@/lib/db/schema"

export type SharePresetRow = typeof sharePresets.$inferSelect

export const getSharePresets = async () => {
  return db.select().from(sharePresets).orderBy(asc(sharePresets.sortOrder), asc(sharePresets.id))
}

export const addSharePreset = async ({
  label,
  percent,
  color,
  sortOrder,
}: {
  label: string
  percent: number
  color?: string | null
  sortOrder?: number
}) => {
  const existing = await getSharePresets()
  const nextSortOrder =
    sortOrder ?? existing.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1
  const [created] = await db
    .insert(sharePresets)
    .values({
      label: label.trim(),
      percent,
      color: color?.trim() || null,
      sortOrder: nextSortOrder,
    })
    .returning()
  return created
}

export const editSharePreset = async ({
  id,
  label,
  percent,
  color,
  sortOrder,
}: {
  id: number
  label: string
  percent: number
  color?: string | null
  sortOrder?: number
}) => {
  const [updated] = await db
    .update(sharePresets)
    .set({
      label: label.trim(),
      percent,
      ...(color !== undefined && { color: color?.trim() || null }),
      ...(sortOrder !== undefined && { sortOrder }),
    })
    .where(eq(sharePresets.id, id))
    .returning()
  return updated
}

export const deleteSharePreset = async ({ id }: { id: number }) => {
  await db.delete(sharePresets).where(eq(sharePresets.id, id))
}
