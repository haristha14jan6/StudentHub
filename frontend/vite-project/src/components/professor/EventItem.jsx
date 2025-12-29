//@ts-nocheck
import { Globe, MapPin } from "lucide-react";

export default function EventItem({ event, completed }) {
  return (
    <div className="flex items-center justify-between p-4 mb-3 bg-gray-50 rounded-lg">

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          {event.mode === "online" ? (
            <Globe className="text-blue-600" />
          ) : (
            <MapPin className="text-blue-600" />
          )}
        </div>

        <div>
          <h3 className="font-medium">{event.title}</h3>
          <p className="text-sm text-gray-500">
            {event.mode} • {new Date(event.date).toDateString()}
          </p>
        </div>
      </div>

      {completed ? (
        <span className="text-sm text-gray-400">Completed</span>
      ) : (
        <button className="text-sm text-blue-600 hover:underline">
          Edit
        </button>
      )}
    </div>
  );
}
