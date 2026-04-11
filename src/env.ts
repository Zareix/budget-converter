import { join } from 'node:path'
import { createEnv } from '@t3-oss/env-core'
import * as z from 'zod'

export const env = createEnv({
  server: {
    APP_DIR: z.string().default(join(process.cwd(), '.data')),
    APP_URL: z.url().default('http://localhost:3000'),
    EB_APPLICATION_ID: z.string().optional(),
    LUNCH_FLOW_API_KEY: z.string().optional(),
    TRICOUNT_KEYS: z.string().optional(),
    TRICOUNT_FILTERED_USER_NAME: z.string().optional(),
  },

  clientPrefix: 'PUBLIC_',

  client: {},

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
})
