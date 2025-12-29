import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

export default function EventCalendar({ onClose }) {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState([]);

  // 📥 Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const allEvents = [
        ...res.data.upcoming,
        ...res.data.completed
      ];

      setEvents(allEvents);
      filterEventsByDate(new Date(), allEvents);
    };

    fetchEvents();
  }, []);

  // 🔍 Filter events by date
  const filterEventsByDate = (date, allEvents = events) => {
    const dateStr = date.toISOString().slice(0, 10);

    const matched = allEvents.filter(
      (event) => event.date.slice(0, 10) === dateStr
    );

    setFilteredEvents(matched);
  };

  // 📅 On date click
  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterEventsByDate(date);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[850px] p-6">

        {/* Header */}
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          📅 Events Calendar
        </h2>

        {/* Content */}
        <div className="grid grid-cols-2 gap-6">

          {/* Calendar Section */}
          <div className="border rounded-lg p-3">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
            />
          </div>

          {/* Events Section */}
          <div className="border rounded-lg p-4 bg-slate-50">
            <h3 className="font-semibold mb-3">
              Events on {selectedDate.toDateString()}
            </h3>

            {filteredEvents.length === 0 ? (
              <p className="text-sm text-slate-500">
                No events on this date
              </p>
            ) : (
              <div className="space-y-3">
                {filteredEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white p-3 rounded-lg shadow-sm border"
                  >
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm text-slate-600">
                      {event.description}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Mode: {event.mode}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="mt-4 text-red-500 hover:underline text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
