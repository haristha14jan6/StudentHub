//@ts-nocheck
import SubmissionRow from "./SubmissionRow";

export default function SubmissionTable({ submissions, onApprove, onReject }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Student Submissions</h2>

      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by student / Activity..."
          className="w-full border rounded-lg px-4 py-2"
        />

        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white">
            All
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-100">
            Today
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-100">
            This Week
          </button>
        </div>
      </div>

      <table className="w-full text-left">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-3">Name</th>
            <th>Activity Title</th>
            <th>Type</th>
            <th>Date</th>
            <th>Certificate</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {submissions.map((submission) => (
            <SubmissionRow
              key={submission._id}
              submission={submission}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
