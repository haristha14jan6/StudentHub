import { Bell, Calendar } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="text-xl font-semibold">
        Welcome, {user?.name || "Student"} 👋
      </h1>

      <div className="flex gap-4 items-center">
        <Calendar className="cursor-pointer" />
        <Bell className="cursor-pointer" />
      </div>
    </header>
  );
}
