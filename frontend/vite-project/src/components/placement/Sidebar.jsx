import { Briefcase, PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function PlacementSidebar({ onCreateDrive }) {
  const { logout } = useAuth();
   const navigate = useNavigate();
   
  const handleLogout = () => {
    logout();                   // clear auth
    navigate("/", { replace: true }); // 🔥 PUBLIC HOME
  };

  return (
    <aside className="w-64 min-h-screen bg-[#020617] text-slate-200 fixed">
      <div className="p-6 font-bold text-xl text-white">
        🎓 EduTrack
      </div>

      <nav className="mt-6 space-y-2 px-4">
        <NavLink
          to="/placement/dashboard"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          <Briefcase size={18} />
          Jobs
        </NavLink>

        <button
  onClick={onCreateDrive}
  className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
>
  ➕ Create Drive
</button>

<button
      onClick={handleLogout}
      className="flex gap-3 items-center text-red-400 mt-8"
    >
      <handleLogout /> Logout
    </button>
      </nav>
    </aside>
  );
}
