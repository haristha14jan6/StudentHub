import Sidebar from "../../components/student/Sidebar";
import Navbar from "../../components/student/Navbar";
import Home from "./Home";

export default function StudentDashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />
        <Home />
      </div>
    </div>
  );
}
