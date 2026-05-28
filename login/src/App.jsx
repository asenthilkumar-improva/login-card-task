import { useState } from 'react'
import { login } from './services/api'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  const [sessionUser, setSessionUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)

  const handleLogin = async (credentials) => {
    setAuthLoading(true)
    try {
      const user = await login(credentials)
      setSessionUser(user)
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <>
      {sessionUser ? (
        <DashboardPage sessionUser={sessionUser} onLogout={() => setSessionUser(null)} />
      ) : (
        <LoginPage onLogin={handleLogin} loading={authLoading} />
      )}
    </>
  )
}

export default App
