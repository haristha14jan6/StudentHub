


//@ts-nocheck
import { useEffect, useState } from "react";
import SubmissionTable from "../../components/professor/SubmissionTable";
import api from "../../api/axios";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 FILTER STATE (USED BY EXISTING UI)
  const [filter, setFilter] = useState("all"); // all | today | week
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSubmissions();
  }, [filter, search]);

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
    await api.put(`/submissions/approve/${id}`);
    fetchSubmissions();
  };

  const handleReject = async (id) => {
    await api.put(`/submissions/reject/${id}`);
    fetchSubmissions();
  };

  return (
    <div className="p-6">
      <SubmissionTable
        submissions={submissions}
        loading={loading}

        // 🔹 CONNECT EXISTING UI CONTROLS
        onSearch={setSearch}
        onFilterChange={setFilter}

        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}








