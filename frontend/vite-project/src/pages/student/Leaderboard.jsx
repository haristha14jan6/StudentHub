import React, { useState, useEffect } from 'react';
import { Trophy, Search, RefreshCw, Bell, User } from 'lucide-react';
import { getLeaderboard } from "../../api/student";
import Sidebar from "../../components/student/Sidebar"; // Adjust path as needed
import Navbar from "../../components/student/Navbar";   // Adjust path as needed

export default function Leaderboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const departments = ['All', 'CSE', 'ECE', 'MECH', 'IT', 'EEE', 'CIVIL'];

  const fetchData = async () => {
    try {
      const res = await getLeaderboard();
      setStudents(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Auto-refresh every minute
    return () => clearInterval(interval);
  }, []);

  const filteredList = filter === 'All' 
    ? students 
    : students.filter(s => s.dept === filter);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* 🟢 SIDEBAR COMPONENT */}
      <Sidebar />

      <div className="flex-1">
        {/* 🟢 NAVBAR COMPONENT */}
        <Navbar />

        <main className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-4xl font-black text-slate-900 flex items-center gap-3">
                <Trophy className="text-yellow-500" size={40} /> Leaderboard
              </h2>
              <p className="text-slate-500 text-lg mt-2 font-medium">See where you stand among your peers</p>
            </div>
            <button 
              onClick={fetchData} 
              className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 text-slate-400 hover:text-blue-600 transition-all active:scale-95"
            >
              <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          {/* Podium Section (Top 3) */}
          <div className="flex justify-center items-end gap-6 md:gap-16 mb-16">
            {students[1] && <PodiumItem student={students[1]} rank={2} color="bg-slate-300" />}
            {students[0] && <PodiumItem student={students[0]} rank={1} color="bg-yellow-400" isWinner />}
            {students[2] && <PodiumItem student={students[2]} rank={3} color="bg-orange-400" />}
          </div>

          {/* Filters Area */}
          <div className="bg-white p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 mb-8 shadow-sm border border-slate-100">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by name or roll number..." 
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap justify-center">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setFilter(dept)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    filter === dept 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr className="text-slate-400 text-xs uppercase font-black tracking-widest">
                  <th className="px-8 py-5">Rank</th>
                  <th className="px-8 py-5">Name</th>
                  <th className="px-8 py-5">Roll No</th>
                  <th className="px-8 py-5">Department</th>
                  <th className="px-8 py-5 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredList.map((s) => (
                  <tr key={s.rollNo} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-8 py-5 font-bold text-slate-700">{s.rank}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">
                          {s.avatar}
                        </div>
                        <span className="font-bold text-slate-800">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-slate-500">{s.rollNo}</td>
                    <td className="px-8 py-5 text-slate-500">{s.dept}</td>
                    <td className="px-8 py-5 text-right">
                       <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-lg font-black text-sm">
                          {s.points} pts
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

// Sub-component for Podium
const PodiumItem = ({ student, rank, color, isWinner }) => (
  <div className={`flex flex-col items-center ${isWinner ? 'scale-110 pb-6' : ''}`}>
    <div className={`w-20 h-20 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white font-black text-2xl ${color}`}>
      {student.avatar}
    </div>
    <p className={`mt-3 font-bold ${isWinner ? 'text-xl' : 'text-slate-800'}`}>{student.name}</p>
    <p className="text-blue-600 font-black">{student.points} pts</p>
  </div>
);