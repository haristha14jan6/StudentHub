import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Trophy,
  FileText,
  Settings,
  LogOut
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
   const navigate = useNavigate();
   
  const handleLogout = () => {
    logout();                   // clear auth
    navigate("/", { replace: true }); // 🔥 PUBLIC HOME
  };



  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">🎓 Student</h2>

      <nav className="space-y-4">
        <NavLink to="/student/dashboard" className="flex gap-3 items-center hover:text-blue-400">
          <Home /> Home
        </NavLink>

        <NavLink to="/student/leaderboard" className="flex gap-3 items-center hover:text-blue-400">
          <Trophy /> Leaderboard
        </NavLink>

        <NavLink to="/student/portfolio" className="flex gap-3 items-center hover:text-blue-400">
          <FileText /> Portfolio
        </NavLink>

        <NavLink to="/student/profile" className="flex gap-3 items-center hover:text-blue-400">
          <Settings /> Profile
        </NavLink>

       <button
      onClick={handleLogout}
      className="flex gap-3 items-center text-red-400 mt-8"
    >
      <LogOut /> Logout
    </button>
  

      </nav>
    </aside>
  );
}
