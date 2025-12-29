//@ts-nocheck
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import CertificateModal from "./CertificateModal";

export default function SubmissionRow({ submission, onApprove, onReject }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className="border-b">
        <td className="py-4">{submission.student?.name}</td>
        <td>{submission.title}</td>
        <td>{submission.activityType}</td>
        <td>{new Date(submission.createdAt).toLocaleDateString()}</td>

        <td>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <Eye size={16} />
            View
          </button>
        </td>

        <td>
          <span className={`px-3 py-1 rounded-full text-sm ${
            submission.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : submission.status === "approved"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
            {submission.status}
          </span>
        </td>

        <td className="flex gap-2">
          <button
            onClick={() => onApprove(submission._id)}
            className="bg-green-500 text-white px-3 py-1 rounded-lg"
          >
            <CheckCircle size={16} />
          </button>

          <button
            onClick={() => onReject(submission._id)}
            className="bg-red-500 text-white px-3 py-1 rounded-lg"
          >
            <XCircle size={16} />
          </button>
        </td>
      </tr>

      {/* Modal */}
      <CertificateModal
        isOpen={open}
        onClose={() => setOpen(false)}
        certificateUrl={submission.certificateUrl}
      />
    </>
  );
}
