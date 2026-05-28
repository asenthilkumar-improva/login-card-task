const DB_KEY = 'login_card_dummy_db_v1'

const seed = {
  users: [
    {
      id: 'U1001',
      userId: 'general01',
      password: 'password123',
      role: 'General User',
      name: 'Aarav Kumar',
      email: 'aarav.kumar@example.com',
    },
    {
      id: 'U9001',
      userId: 'admin01',
      password: 'admin123',
      role: 'Admin',
      name: 'Nisha Rao',
      email: 'nisha.rao@example.com',
    },
  ],
  records: [
    {
      id: 'R-100',
      ownerUserId: 'general01',
      title: 'Monthly Statement',
      accessLevel: 'Read Only',
      status: 'Available',
      updatedAt: '2026-05-27 09:45',
    },
    {
      id: 'R-101',
      ownerUserId: 'general01',
      title: 'Support Ticket #8421',
      accessLevel: 'Read + Comment',
      status: 'Pending',
      updatedAt: '2026-05-28 08:10',
    },
    {
      id: 'R-900',
      ownerUserId: 'admin01',
      title: 'Audit Report',
      accessLevel: 'Full Control',
      status: 'Approved',
      updatedAt: '2026-05-26 16:20',
    },
    {
      id: 'R-901',
      ownerUserId: 'admin01',
      title: 'User Access Matrix',
      accessLevel: 'Manage Access',
      status: 'In Review',
      updatedAt: '2026-05-28 07:35',
    },
  ],
}

export function readDb() {
  const raw = localStorage.getItem(DB_KEY)
  if (!raw) {
    localStorage.setItem(DB_KEY, JSON.stringify(seed))
    return structuredClone(seed)
  }

  try {
    return JSON.parse(raw)
  } catch {
    localStorage.setItem(DB_KEY, JSON.stringify(seed))
    return structuredClone(seed)
  }
}

export function writeDb(nextDb) {
  localStorage.setItem(DB_KEY, JSON.stringify(nextDb))
}
