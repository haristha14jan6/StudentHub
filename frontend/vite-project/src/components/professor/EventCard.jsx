//@ts-nocheck
import { Calendar, MapPin } from "lucide-react";

export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <h4 className="font-semibold">{event.title}</h4>
      <p className="text-sm text-gray-500">
        {event.mode} • {new Date(event.date).toDateString()}
      </p>
    </div>
  );
}
