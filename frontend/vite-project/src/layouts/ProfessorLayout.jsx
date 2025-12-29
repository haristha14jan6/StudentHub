//@ts-nocheck
import Sidebar from "../components/professor/Sidebar";

export default function ProfessorLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
