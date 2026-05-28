import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env' })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function seed() {
  await supabase.from('records').delete().neq('id', 0)
  await supabase.from('users').delete().neq('id', 0)

  const { error: userError } = await supabase.from('users').insert([
    {
      userId: 'general01',
      password: 'password123',
      role: 'General User',
      name: 'Aarav Kumar',
      email: 'aarav.kumar@example.com',
    },
    {
      userId: 'admin01',
      password: 'admin123',
      role: 'Admin',
      name: 'Nisha Rao',
      email: 'nisha.rao@example.com',
    },
  ])

  if (userError) {
    console.error('User seed failed:', userError.message)
    process.exit(1)
  }

  const { error: recordError } = await supabase.from('records').insert([
    {
      recordId: 'R-100',
      ownerUserId: 'general01',
      title: 'Monthly Statement',
      accessLevel: 'Read Only',
      status: 'Available',
      updatedAtLabel: '2026-05-27 09:45',
    },
    {
      recordId: 'R-101',
      ownerUserId: 'general01',
      title: 'Support Ticket #8421',
      accessLevel: 'Read + Comment',
      status: 'Pending',
      updatedAtLabel: '2026-05-28 08:10',
    },
    {
      recordId: 'R-900',
      ownerUserId: 'admin01',
      title: 'Audit Report',
      accessLevel: 'Full Control',
      status: 'Approved',
      updatedAtLabel: '2026-05-26 16:20',
    },
    {
      recordId: 'R-901',
      ownerUserId: 'admin01',
      title: 'User Access Matrix',
      accessLevel: 'Manage Access',
      status: 'In Review',
      updatedAtLabel: '2026-05-28 07:35',
    },
  ])

  if (recordError) {
    console.error('Record seed failed:', recordError.message)
    process.exit(1)
  }

  console.log('Seed completed')
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
