//@ts-nocheck
import { useEffect, useState } from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import api from "../../api/axios";
import StatCard from "../../components/professor/StatCard";
import Sidebar from "../../components/professor/Sidebar";
export default function Dashboard() {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/submissions/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  return (
    <div >
    
      {/* Header */}
      <div>
      <h1 className="text-2xl font-bold mb-1">
        Welcome, Dr. ThangaMahesh👋
      </h1>
      <p className="text-gray-500 mb-6">
        Review and manage student submissions
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Pending Approval"
          count={stats.pending}
          icon={Clock}
          color="yellow"
        />

        <StatCard
          title="Approved Activities"
          count={stats.approved}
          icon={CheckCircle}
          color="green"
        />

        <StatCard
          title="Rejected Submissions"
          count={stats.rejected}
          icon={XCircle}
          color="red"
        />
      </div>
    </div>
    </div>
  );
}


