


//@ts-nocheck
import { useEffect, useState } from "react";
import { getEvents } from "../../api/events";
import CreateEventModal from "../../components/professor/CreateEventModal";
import EventCard from "../../components/professor/EventCard";

export default function ManageEvents() {
  const [events, setEvents] = useState({ upcoming: [], completed: [] });
  const [open, setOpen] = useState(false);

  const fetchEvents = async () => {
    const res = await getEvents();
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6">
      {open && (
        <CreateEventModal
          onClose={() => setOpen(false)}
          onCreated={fetchEvents}
        />
      )}

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Manage Events</h1>
          <p className="text-gray-500 mt-1">
            Create and manage college events
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setOpen(true)}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow"
          >
            + Create New Event
          </button>

          <button className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700">
            Existing Events
          </button>
        </div>
      </div>

      {/* ===== EVENTS GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>

          {events.upcoming.length === 0 ? (
            <p className="text-gray-400 text-sm">No upcoming events</p>
          ) : (
            events.upcoming.map((e) => (
              <EventCard key={e._id} event={e} />
            ))
          )}
        </section>

        {/* Completed Events */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Completed Events (Last 1 Month)
          </h3>

          {events.completed.length === 0 ? (
            <p className="text-gray-400 text-sm">No completed events</p>
          ) : (
            events.completed.map((e) => (
              <EventCard key={e._id} event={e} />
            ))
          )}
        </section>
      </div>
    </div>
  );
}




