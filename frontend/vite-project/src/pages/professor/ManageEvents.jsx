


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

         
        </div>
      </div>

      {/* ===== EVENTS GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

  {/* UPCOMING */}
  <section className="bg-white rounded-2xl p-6 shadow">
    <h3 className="text-lg font-semibold mb-6">Upcoming Events</h3>

    {events.upcoming.map(event => (
      <EventCard
        key={event._id}
        event={event}
        type="upcoming"
        onDeleted={fetchEvents}
      />
    ))}
  </section>

  {/* COMPLETED */}
  <section className="bg-white rounded-2xl p-6 shadow">
    <h3 className="text-lg font-semibold mb-6">
      Completed Events (Last 1 Month)
    </h3>

    {events.completed.map(event => (
      <EventCard
        key={event._id}
        event={event}
        type="completed"
      />
    ))}
  </section>

</div>


    </div>
  );
}




