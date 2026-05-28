export default function RecordsTable({ records }) {
  return (
    <section className="card">
      <h2>User Records</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Access Level</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.title}</td>
                <td>{record.accessLevel}</td>
                <td>{record.status}</td>
                <td>{record.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
