export default function RecentSubmissions({ submissions = [] }) {
  if (submissions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">No submissions yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold mb-4">Recent Submissions</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Title</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(s => (
            <tr key={s._id}>
              <td>{s.title}</td>
              <td>{s.activityType}</td>
              <td className={
                s.status === "approved"
                  ? "text-green-600"
                  : s.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }>
                {s.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
