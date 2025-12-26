import { useState } from "react";
import UploadModal from "./UploadModal";

export default function ActivityCard({ title, type, icon, count, bgColor }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md p-6 transition-all group"
      >
        {/* Styled Icon Box from Reference Image */}
        <div className={`w-12 h-12 ${bgColor || 'bg-blue-50'} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
          {icon}
        </div>

        {/* Text Content */}
        <div className="text-left">
          <h3 className="font-bold text-gray-800 text-lg leading-tight">{title}</h3>
          
          
          <div className="mt-4 flex items-center text-blue-600">
            <span className="text-xs font-semibold bg-blue-50 px-2 py-1 rounded">
              Click to upload
            </span>
          </div>
        </div>
      </div>

      {open && (
        <UploadModal
          activityType={type}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}