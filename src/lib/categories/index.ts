import { asc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { categories } from "@/lib/db/schema"

export const DEFAULT_CATEGORY_SLUG = "autres"

export const getCategories = async () => {
  return db.select().from(categories).orderBy(asc(categories.sortOrder), asc(categories.id))
}

export const getDefaultCategory = async () => {
  const row = db.select().from(categories).where(eq(categories.slug, DEFAULT_CATEGORY_SLUG)).get()
  return {
    slug: row?.slug ?? DEFAULT_CATEGORY_SLUG,
    label: row?.label ?? "💬 Autres",
  }
}

export const addCategory = async ({
  slug,
  label,
  color,
  sortOrder,
}: {
  slug: string
  label: string
  color?: string | null
  sortOrder?: number
}) => {
  const existing = await getCategories()
  const nextSortOrder =
    sortOrder ?? existing.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1
  await db.insert(categories).values({
    slug: slug.trim().toLowerCase(),
    label: label.trim(),
    color: color?.trim() || null,
    sortOrder: nextSortOrder,
  })
}

export const editCategory = async ({
  id,
  label,
  color,
  sortOrder,
}: {
  id: number
  label: string
  color?: string | null
  sortOrder?: number
}) => {
  await db
    .update(categories)
    .set({
      label: label.trim(),
      ...(color !== undefined && { color: color?.trim() || null }),
      ...(sortOrder !== undefined && { sortOrder }),
    })
    .where(eq(categories.id, id))
}

export const deleteCategory = async ({ id }: { id: number }) => {
  await db.delete(categories).where(eq(categories.id, id))
}
