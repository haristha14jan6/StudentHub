//@ts-nocheck
//@ts-nocheck
import { useState } from "react";
import SubmissionRow from "./SubmissionRow";

export default function SubmissionTable({
  submissions,
  loading,
  onSearch,
  onFilterChange,
  onApprove,
  onReject
}) {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilter = (value) => {
    setActiveFilter(value);
    onFilterChange(value);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Student Submissions</h2>

      {/* 🔍 SEARCH + FILTERS */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by student / Activity..."
          className="w-full border rounded-lg px-4 py-2"
          onChange={(e) => onSearch(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={() => handleFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            All
          </button>

          <button
            onClick={() => handleFilter("today")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "today"
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Today
          </button>

          <button
            onClick={() => handleFilter("week")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "week"
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* 📋 TABLE */}
      {loading ? (
        <div className="text-center py-6">Loading submissions...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No submissions found
        </div>
      ) : (
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
      )}
    </div>
  );
}

