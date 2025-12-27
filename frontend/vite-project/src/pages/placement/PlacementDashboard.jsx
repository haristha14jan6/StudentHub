import { useEffect, useState } from "react";
import PlacementSidebar from "../../components/placement/Sidebar";
import StatCard from "../../components/placement/StatCard";
import DriveCard from "../../components/placement/DriveCard";
import CreateDriveModal from "./CreateDriveModal";
import { getJobDrives } from "../../api/placement";

export default function PlacementDashboard() {
  const [drives, setDrives] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchDrives = async () => {
    const data = await getJobDrives();
    setDrives(data);
  };

  useEffect(() => {
    fetchDrives();
  }, []);


  return (
    <div className="flex bg-slate-50 min-h-screen relative">
     <PlacementSidebar onCreateDrive={() => setShowModal(true)} />


      {/* Blur background when modal open */}
      <main className={`ml-64 p-8 w-full transition ${
        showModal ? "blur-sm pointer-events-none" : ""
      }`}>
        <h1 className="text-3xl font-bold mb-2">
          Placement Cell Dashboard 👋
        </h1>

        <p className="text-slate-500 mb-8">
          Manage placement drives and job postings
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Drives Posted" value={drives.length} />
          <StatCard title="Active Companies"
            value={new Set(drives.map(d => d.companyName)).size} />
          <StatCard title="Applicants"
            value={drives.reduce((a, d) => a + d.applicants.length, 0)} />
        </div>

        {/* Drives */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Active Placement Drives
            </h2>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Create Drive
            </button>
          </div>

          <div className="space-y-4">
            {drives.map(d => (
             <DriveCard
  key={d._id}
  drive={d}
  onDeleted={fetchDrives}
/>

            ))}
          </div>
        </section>
      </main>

      {/* MODAL */}
      {showModal && (
        <CreateDriveModal
          onClose={() => setShowModal(false)}
          onCreated={fetchDrives}
        />
      )}
    </div>
  );
}
