import { createClient } from '@supabase/supabase-js'
import ws from 'ws'
import { env } from './env.js'

if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.')
}

export const supabase = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
  realtime: {
    transport: ws,
  },
})
