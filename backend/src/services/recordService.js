import { supabase } from '../config/supabase.js'
import { createHttpError } from '../utils/httpError.js'

export async function getUserRecordsService({ userId, role }) {
  let query = supabase.from('records').select('*').order('created_at', { ascending: false })

  if (role !== 'Admin') {
    query = query.eq('ownerUserId', userId)
  }

  const { data, error } = await query
  if (error) throw createHttpError(500, error.message)

  return data || []
}
