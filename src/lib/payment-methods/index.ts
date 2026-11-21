import { asc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { paymentMethods } from "@/lib/db/schema"

export type PaymentMethodRow = typeof paymentMethods.$inferSelect

export const getPaymentMethods = async () => {
  return db
    .select()
    .from(paymentMethods)
    .orderBy(asc(paymentMethods.sortOrder), asc(paymentMethods.id))
}

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()

export const matchPaymentMethod = (
  methods: Array<PaymentMethodRow>,
  value: string | null | undefined,
): PaymentMethodRow | null => {
  if (!value) return null
  const norm = normalize(value)

  // 1. Exact slug or label match
  const exact = methods.find((pm) => normalize(pm.slug) === norm || normalize(pm.label) === norm)
  if (exact) return exact

  // 2. Keyword match for bank/provider names
  if (norm.includes("amex") || norm.includes("american express")) {
    return (
      methods.find(
        (pm) => normalize(pm.slug).includes("amex") || normalize(pm.label).includes("amex"),
      ) ?? null
    )
  }
  if (norm.includes("tricount")) {
    return (
      methods.find(
        (pm) => normalize(pm.slug).includes("tricount") || normalize(pm.label).includes("tricount"),
      ) ?? null
    )
  }
  if (norm.includes("joint") || norm.includes("commun")) {
    return (
      methods.find(
        (pm) => normalize(pm.slug).includes("joint") || normalize(pm.label).includes("joint"),
      ) ?? null
    )
  }
  if (norm.includes("revolut")) {
    return (
      methods.find(
        (pm) => normalize(pm.slug).includes("revolut") || normalize(pm.label).includes("revolut"),
      ) ?? null
    )
  }
  if (norm.includes("sg") || norm.includes("societe generale")) {
    return (
      methods.find(
        (pm) =>
          normalize(pm.slug).includes("sg") ||
          normalize(pm.label).includes("sg") ||
          normalize(pm.label).includes("societe generale"),
      ) ?? null
    )
  }

  return null
}

export const resolvePaymentMethod = async (
  value: string | null | undefined,
): Promise<PaymentMethodRow | null> => {
  const methods = await getPaymentMethods()
  return matchPaymentMethod(methods, value)
}

export const addPaymentMethod = async ({
  slug,
  label,
  color,
  defaultSharePercent,
  sortOrder,
}: {
  slug: string
  label: string
  color?: string | null
  defaultSharePercent: number
  sortOrder?: number
}) => {
  const existing = await getPaymentMethods()
  const nextSortOrder =
    sortOrder ?? existing.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1
  const [created] = await db
    .insert(paymentMethods)
    .values({
      slug: slug.trim().toLowerCase(),
      label: label.trim(),
      color: color?.trim() || null,
      defaultSharePercent,
      sortOrder: nextSortOrder,
    })
    .returning()
  return created
}

export const editPaymentMethod = async ({
  id,
  label,
  color,
  defaultSharePercent,
  sortOrder,
}: {
  id: number
  label: string
  color?: string | null
  defaultSharePercent: number
  sortOrder?: number
}) => {
  const [updated] = await db
    .update(paymentMethods)
    .set({
      label: label.trim(),
      defaultSharePercent,
      ...(color !== undefined && { color: color?.trim() || null }),
      ...(sortOrder !== undefined && { sortOrder }),
    })
    .where(eq(paymentMethods.id, id))
    .returning()
  return updated
}

export const deletePaymentMethod = async ({ id }: { id: number }) => {
  await db.delete(paymentMethods).where(eq(paymentMethods.id, id))
}
