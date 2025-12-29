


//@ts-nocheck
import { useEffect, useState } from "react";
import SubmissionTable from "../../components/professor/SubmissionTable";
import api from "../../api/axios";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await api.get("/submissions/list");
      setSubmissions(res.data);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/submissions/approve/${id}`);
      fetchSubmissions();
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/submissions/reject/${id}`);
      fetchSubmissions();
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  if (loading) {
    return <div className="p-6">Loading submissions...</div>;
  }

  return (
    <div className="p-6">
      <SubmissionTable
        submissions={submissions}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}





