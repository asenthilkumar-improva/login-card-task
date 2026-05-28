export default function UserDetails({ user, appLoadInfo }) {
  return (
    <section className="card">
      <h2>User Details</h2>
      <div className="meta-grid">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <p className="muted small">
        Service: {appLoadInfo.serviceStatus} | Env: {appLoadInfo.environment} | Loaded: {appLoadInfo.loadedAt}
      </p>
    </section>
  )
}
