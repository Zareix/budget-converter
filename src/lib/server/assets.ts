import { createServerFn } from "@tanstack/react-start"
import * as v from "valibot"

import * as assets from "@/lib/assets"

const monthIdSchema = v.pipe(
  v.string(),
  v.regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Month must be YYYY-MM"),
)

export const getSavingsAssetsOverview = createServerFn().handler(assets.getSavingsAssetsOverview)

export const upsertAccountSnapshot = createServerFn({ method: "POST" })
  .validator(
    v.object({
      accountId: v.pipe(v.number(), v.integer()),
      monthId: monthIdSchema,
      balanceCents: v.pipe(v.number(), v.integer()),
      note: v.optional(v.nullable(v.string())),
    }),
  )
  .handler(({ data }) => assets.upsertAccountSnapshot(data))

export const bulkUpsertAccountSnapshots = createServerFn({ method: "POST" })
  .validator(
    v.object({
      monthId: monthIdSchema,
      entries: v.array(
        v.object({
          accountId: v.pipe(v.number(), v.integer()),
          balanceCents: v.pipe(v.number(), v.integer()),
          note: v.optional(v.nullable(v.string())),
        }),
      ),
    }),
  )
  .handler(({ data }) => assets.bulkUpsertAccountSnapshots(data))

export const deleteAccountSnapshot = createServerFn({ method: "POST" })
  .validator(
    v.object({
      accountId: v.pipe(v.number(), v.integer()),
      monthId: monthIdSchema,
    }),
  )
  .handler(({ data }) => assets.deleteAccountSnapshot(data))
