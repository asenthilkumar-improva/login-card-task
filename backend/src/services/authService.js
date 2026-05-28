import { supabase } from '../config/supabase.js'
import { createHttpError } from '../utils/httpError.js'

function sanitizeUser(user) {
  const { password, ...safeUser } = user
  return safeUser
}

export async function loginService({ userId, password, role }) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('userId', userId.trim())
    .eq('role', role)
    .maybeSingle()

  if (error) throw createHttpError(500, error.message)
  if (!data || data.password !== password) {
    throw createHttpError(401, 'Invalid credentials or role selection.')
  }

  return sanitizeUser(data)
}
