
//@ts-nocheck
import { useEffect, useState } from "react";
import SubmissionTable from "../../components/professor/SubmissionTable";
import api from "../../api/axios";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 REQUIRED STATES (you were missing these)
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | today | week

  // 🔄 FETCH WHEN SEARCH / FILTER CHANGES
  useEffect(() => {
    fetchSubmissions();
  }, [search, filter]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);

      const params = {};
      if (filter !== "all") params.filter = filter;
      if (search.trim()) params.search = search;

      const res = await api.get("/submissions/list", { params });
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

  return (
    <div className="p-6">
      <SubmissionTable
        submissions={submissions}
        loading={loading}
        search={search}
        filter={filter}
        onSearch={setSearch}
        onFilterChange={setFilter}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}








