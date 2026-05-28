const API_BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  if (!res.ok) {
    let message = 'Request failed.'
    try {
      const data = await res.json()
      message = data.message || message
    } catch {
      // Keep generic message if server response is not JSON.
    }
    throw new Error(message)
  }

  return res.json()
}

export function login(payload) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getUserProfile(userId) {
  return request(`/users/${encodeURIComponent(userId)}`)
}

export function getUserRecords(user) {
  const q = new URLSearchParams({ userId: user.userId, role: user.role })
  return request(`/records?${q.toString()}`)
}

export function getAppLoadInfo() {
  return request('/meta/service-info')
}

export function getAllUsers() {
  return request('/users')
}

export function updateUserRole({ targetUserId, role }) {
  return request(`/users/${encodeURIComponent(targetUserId)}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  })
}

export function addUser(payload) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
