import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function RecentSubmissions({ submissions = [] }) {
  if (submissions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500 text-sm">No submissions yet</p>
      </div>
    );
  }

  const statusStyles = {
    approved: {
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
      badge: "bg-green-100 text-green-700",
    },
    rejected: {
      icon: <XCircle className="w-4 h-4 text-red-600" />,
      badge: "bg-red-100 text-red-700",
    },
    pending: {
      icon: <Clock className="w-4 h-4 text-yellow-600" />,
      badge: "bg-yellow-100 text-yellow-700",
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Recent Submissions</h3>
        <span className="text-sm text-blue-600 cursor-pointer hover:underline">
          View All
        </span>
      </div>

      {/* Table-like layout */}
      <div className="space-y-2">
        {/* Table Header */}
        <div className="grid grid-cols-3 text-xs font-medium text-gray-500 px-3 py-2">
          <span>Title</span>
          <span>Type</span>
          <span className="text-right">Status</span>
        </div>

        {/* Rows */}
        {submissions.map((s) => {
          const status = statusStyles[s.status] || statusStyles.pending;

          return (
            <div
              key={s._id}
              className="grid grid-cols-3 items-center bg-gray-50 px-3 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              {/* Title */}
              <p className="font-medium text-gray-900 truncate">
                {s.title}
              </p>

              {/* Type */}
              <p className="text-sm text-gray-500 capitalize">
                {s.activityType}
              </p>

              {/* Status */}
              <div className="flex items-center justify-end gap-2">
                {status.icon}
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${status.badge}`}
                >
                  {s.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
