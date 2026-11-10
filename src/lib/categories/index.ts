import { asc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { categories } from "@/lib/db/schema"

export const DEFAULT_CATEGORY_SLUG = "autres"

export const getCategories = async () => {
  return db.select().from(categories).orderBy(asc(categories.id))
}

export const getDefaultCategory = async () => {
  const row = db.select().from(categories).where(eq(categories.slug, DEFAULT_CATEGORY_SLUG)).get()
  return row?.label ?? "💬 Autres"
}

export const addCategory = async ({ slug, label }: { slug: string; label: string }) => {
  await db.insert(categories).values({ slug: slug.trim().toLowerCase(), label: label.trim() })
}

export const editCategory = async ({ id, label }: { id: number; label: string }) => {
  await db.update(categories).set({ label: label.trim() }).where(eq(categories.id, id))
}

export const deleteCategory = async ({ id }: { id: number }) => {
  await db.delete(categories).where(eq(categories.id, id))
}
