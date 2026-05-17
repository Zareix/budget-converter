import { createEnv } from '@t3-oss/env-core'
import * as z from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z._default(
      z.enum(['development', 'test', 'production']),
      'development',
    ),
    APP_URL: z.url().default('http://localhost:3000'),
    EB_APPLICATION_ID: z.string().optional(),
    EB_PRIVATE_KEY: z.string().optional(),
    LUNCH_FLOW_API_KEY: z.string().optional(),
    TRICOUNT_KEYS: z.string().optional(),
    TRICOUNT_FILTERED_USER_NAME: z.string().optional(),
    DATABASE_PATH: z._default(z.string(), './db.sqlite'),
  },

  clientPrefix: 'PUBLIC_',

  client: {},

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
})
