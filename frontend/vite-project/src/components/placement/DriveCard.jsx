import { CalendarDays, Building2 } from "lucide-react";

export default function DriveCard({ drive }) {
  return (
    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl p-5 hover:shadow-md transition">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
          <Building2 className="w-6 h-6" />
        </div>

        {/* Company Info */}
        <div>
          <h3 className="font-semibold text-slate-900 text-lg">
            {drive.companyName}
          </h3>
          <p className="text-slate-500 text-sm">
            {drive.jobRole}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays className="w-4 h-4" />
          <span>
            {new Date(drive.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Applicants */}
        <div className="text-sm text-slate-600 font-medium">
          {drive.applicants.length} applicants
        </div>

        {/* Button */}
        <button className="border border-slate-200 px-4 py-1.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-white hover:border-blue-500 transition">
          View Details
        </button>
      </div>
    </div>
  );
}
