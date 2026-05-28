import { ROLE_OPTIONS } from '../constants/roles'

export default function LoginForm({ form, onChange, onSubmit, loading, error }) {
  return (
    <form className="card" onSubmit={onSubmit}>
      <h1>Login</h1>
      <p className="muted">Enter credentials and role to continue.</p>

      <label>
        User ID
        <input
          name="userId"
          value={form.userId}
          onChange={onChange}
          placeholder="general01"
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="password123"
          required
        />
      </label>

      <label>
        Role
        <select name="role" value={form.role} onChange={onChange}>
          {ROLE_OPTIONS.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </label>

      {error ? <p className="error">{error}</p> : null}

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p className="helper">
        Demo users: <code>general01 / password123</code> and  admin: <code>admin01 / admin123</code>
      </p>
    </form>
  )
}
