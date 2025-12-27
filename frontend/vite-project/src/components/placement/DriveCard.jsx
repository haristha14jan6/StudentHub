import { useNavigate } from "react-router-dom";
import { CalendarDays, Building2, Trash2, ChevronRight, Users } from "lucide-react";
import { deleteJobDrive } from "../../api/placement";

export default function DriveCard({ drive, onDeleted }) {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    // Logic preserved
    if (!window.confirm("Delete this drive?")) return;
    await deleteJobDrive(drive._id);
    onDeleted();
  };

  return (
    <div className="group flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 mb-3 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200">
      
      {/* LEFT: Company Info */}
      <div className="flex items-center gap-4">
        <div className="bg-slate-50 text-slate-600 p-3.5 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          <Building2 className="w-6 h-6" />
        </div>

        <div>
          <h3 className="font-bold text-slate-900 text-lg leading-snug">
            {drive.companyName}
          </h3>
          <p className="text-slate-500 text-sm font-medium">
            {drive.jobRole}
          </p>
        </div>
      </div>

      {/* RIGHT: Metadata and Actions */}
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Deadline</span>
          <div className="text-sm text-slate-600 font-semibold flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4 text-slate-400" />
            {new Date(drive.registrationDeadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end border-l border-slate-100 pl-6">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Total</span>
          <div className="text-sm font-bold text-blue-600 flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {drive.applicants.length} Applicants
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={handleDelete}
            className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
            title="Delete Drive"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}