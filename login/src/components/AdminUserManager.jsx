import { useState } from 'react'
import { ROLE_OPTIONS } from '../constants/roles'

export default function AdminUserManager({ users, onAddUser, onRoleChange, loading }) {
  const [form, setForm] = useState({
    userId: '',
    name: '',
    email: '',
    password: '',
    role: ROLE_OPTIONS[0],
  })

  function handleSubmit(e) {
    e.preventDefault()
    onAddUser(form)
    setForm({ userId: '', name: '', email: '', password: '', role: ROLE_OPTIONS[0] })
  }

  return (
    <section className="card">
      <h2>Admin: Manage Users</h2>

      <form className="inline-form" onSubmit={handleSubmit}>
        <input placeholder="User ID" value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })} required />
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          {ROLE_OPTIONS.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add User'}</button>
      </form>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => onRoleChange(user.userId, e.target.value)}
                    disabled={loading}
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
