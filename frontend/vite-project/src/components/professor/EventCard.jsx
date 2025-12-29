//@ts-nocheck
import { Globe, MapPin, Trash2 } from "lucide-react";
import { deleteEvent } from "../../api/events";

export default function EventCard({ event, type, onDeleted }) {
  const isCompleted = type === "completed";

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${event.title}"?`
    );

    if (!confirmDelete) return;

    try {
      await deleteEvent(event._id);
      onDeleted(); // refresh events list
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete event");
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition shadow-sm mb-4">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* ICON */}
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          {event.mode === "online" ? (
            <Globe className="w-5 h-5" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
        </div>

        {/* TEXT */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 leading-tight">
            {event.title}
          </h4>

          <p className="text-sm text-gray-500 mt-1">
            {event.mode.charAt(0).toUpperCase() + event.mode.slice(1)}
            <span className="mx-1">•</span>
            {new Date(event.date).toDateString()}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* COMPLETED LABEL */}
        {isCompleted && (
          <span className="text-sm text-gray-400 font-medium">
            Completed
          </span>
        )}

        {/* DELETE BUTTON (ONLY UPCOMING) */}
        {!isCompleted && (
          <button
            onClick={handleDelete}
            className="
    p-2 rounded-lg
    text-gray-400
    hover:text-red-500
    hover:bg-red-50
    transition-all duration-200
  "
            title="Delete Event"
          >
            <Trash2 size={18} />
          </button>
        )}

      </div>
    </div>
  );
}



