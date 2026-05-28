import { useEffect, useState } from 'react'
import { ROLES } from '../constants/roles'
import UserDetails from '../components/UserDetails'
import RecordsTable from '../components/RecordsTable'
import AdminUserManager from '../components/AdminUserManager'
import {
  addUser,
  getAllUsers,
  getAppLoadInfo,
  getUserProfile,
  getUserRecords,
  updateUserRole,
} from '../services/api'

export default function DashboardPage({ sessionUser, onLogout }) {
  const [state, setState] = useState({
    loading: true,
    user: null,
    records: [],
    users: [],
    appLoadInfo: null,
    error: '',
    saving: false,
  })

  const isAdmin = sessionUser.role === ROLES.ADMIN

  async function loadAll() {
    setState((prev) => ({ ...prev, loading: true, error: '' }))
    try {
      const [user, records, appLoadInfo, users] = await Promise.all([
        getUserProfile(sessionUser.userId),
        getUserRecords(sessionUser),
        getAppLoadInfo(),
        isAdmin ? getAllUsers() : Promise.resolve([]),
      ])

      setState((prev) => ({
        ...prev,
        loading: false,
        user,
        records,
        appLoadInfo,
        users,
      }))
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: err.message }))
    }
  }

  useEffect(() => {
    loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionUser.userId])

  const handleRoleChange = async (targetUserId, role) => {
    setState((prev) => ({ ...prev, saving: true }))
    await updateUserRole({ targetUserId, role })
    await loadAll()
    setState((prev) => ({ ...prev, saving: false }))
  }

  const handleAddUser = async (payload) => {
    setState((prev) => ({ ...prev, saving: true }))
    await addUser(payload)
    await loadAll()
    setState((prev) => ({ ...prev, saving: false }))
  }

  if (state.loading) {
    return (
      <main className="layout center">
        <section className="card">
          <h2>Loading Dashboard...</h2>
          <p className="muted">Waiting for User Service and Records API.</p>
        </section>
      </main>
    )
  }

  if (state.error) {
    return (
      <main className="layout center">
        <section className="card">
          <h2>Load Failed</h2>
          <p className="error">{state.error}</p>
          <button onClick={loadAll}>Retry</button>
          <button className="ghost" onClick={onLogout}>Logout</button>
        </section>
      </main>
    )
  }

  return (
    <main className="layout">
      <header className="topbar">
        <h1>Welcome, {state.user.name}</h1>
        <div className="topbar-actions">
          <button className="ghost" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <UserDetails user={state.user} appLoadInfo={state.appLoadInfo} />
      <RecordsTable records={state.records} />
      {isAdmin ? (
        <AdminUserManager
          users={state.users}
          onAddUser={handleAddUser}
          onRoleChange={handleRoleChange}
          loading={state.saving}
        />
      ) : null}
    </main>
  )
}
