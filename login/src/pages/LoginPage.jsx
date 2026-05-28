import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import { ROLES } from '../constants/roles'

export default function LoginPage({ onLogin, loading }) {
  const [form, setForm] = useState({
    userId: '',
    password: '',
    role: ROLES.GENERAL,
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await onLogin(form)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="layout center">
      <LoginForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </main>
  )
}
