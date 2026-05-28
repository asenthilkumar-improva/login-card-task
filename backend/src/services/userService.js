import { supabase } from '../config/supabase.js'
import { createHttpError } from '../utils/httpError.js'

function sanitizeUser(user) {
  const { password, ...safeUser } = user
  return safeUser
}

export async function getUserProfileService(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('userId', userId)
    .maybeSingle()

  if (error) throw createHttpError(500, error.message)
  if (!data) throw createHttpError(404, 'User not found.')
  return sanitizeUser(data)
}

export async function getAllUsersService() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw createHttpError(500, error.message)
  return (data || []).map(sanitizeUser)
}

export async function addUserService(payload) {
  const userId = payload.userId.trim()

  const { data: existing, error: checkError } = await supabase
    .from('users')
    .select('id')
    .eq('userId', userId)
    .maybeSingle()

  if (checkError) throw createHttpError(500, checkError.message)
  if (existing) throw createHttpError(409, 'User ID already exists.')

  const { data, error } = await supabase
    .from('users')
    .insert({
      userId,
      password: payload.password,
      role: payload.role,
      name: payload.name,
      email: payload.email,
    })
    .select('*')
    .single()

  if (error) throw createHttpError(500, error.message)
  return sanitizeUser(data)
}

export async function updateUserRoleService(targetUserId, role) {
  const { data, error } = await supabase
    .from('users')
    .update({ role })
    .eq('userId', targetUserId)
    .select('*')
    .maybeSingle()

  if (error) throw createHttpError(500, error.message)
  if (!data) throw createHttpError(404, 'User not found.')
  return sanitizeUser(data)
}
