import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const ebAccounts = sqliteTable('eb_accounts', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  institutionName: text('institution_name').notNull(),
  institutionLogo: text('institution_logo'),
  validUntil: text('valid_until').notNull(),
})

export const mappings = sqliteTable('mappings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  mode: text('mode', {
    enum: ['default', 'exact-name', 'exact-name-price'],
  }).notNull(),
  fromName: text('from_name').notNull(),
  toName: text('to_name').notNull(),
  toCategory: text('to_category').notNull(),
  fromPrice: real('from_price'),
  exclude: integer('exclude', { mode: 'boolean' }).notNull().default(false),
})
