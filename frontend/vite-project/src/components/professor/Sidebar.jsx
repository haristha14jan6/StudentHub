//@ts-nocheck
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  LogOut,
  GraduationCap
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition
     ${isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"}`;

  return (
    <aside className="w-64 bg-white border-r flex flex-col">

      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="p-6 text-xl font-bold text-blue-600 cursor-pointer flex items-center gap-2"
      >
        <GraduationCap size={28} />
        EduTrack
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <NavLink to="/professor/dashboard" className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/professor/submissions" className={linkClass}>
          <FileText size={20} />
          Submissions
        </NavLink>

        <NavLink to="/professor/events" className={linkClass}>
          <Calendar size={20} />
          Manage Events
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-gray-600 hover:text-red-500 transition w-full p-2 rounded-lg hover:bg-gray-100"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

