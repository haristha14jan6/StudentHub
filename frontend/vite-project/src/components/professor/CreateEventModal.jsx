//@ts-nocheck
import { X, Upload } from "lucide-react";
import { useState } from "react";
import api from "../../api/axios";

export default function CreateEventModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    mode: "online",
    venue: "",
    link: "",
  });

  const [poster, setPoster] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (poster) fd.append("poster", poster);

    await api.post("/events/create", fd);
    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Create Event</h2>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Event Title */}
        <label className="label">Event Title</label>
        <input
          name="title"
          placeholder="e.g., NeoHackathon 2024"
          className="input mb-4"
          onChange={handleChange}
        />

        {/* Description */}
        <label className="label">Description</label>
        <textarea
          name="description"
          rows={3}
          placeholder="Event description..."
          className="input mb-4"
          onChange={handleChange}
        />

        {/* Date */}
        <label className="label">Select Date</label>
        <input
          type="date"
          name="date"
          min={new Date().toISOString().split("T")[0]}
          className="input mb-4"
          onChange={handleChange}
        />

        {/* Mode */}
        <label className="label">Mode</label>
        <div className="flex gap-3 mb-4">
          {["online", "offline"].map((m) => (
            <button
              key={m}
              className={`flex-1 py-3 rounded-xl border ${
                form.mode === m
                  ? "bg-blue-100 border-blue-500 text-blue-600"
                  : "bg-gray-100"
              }`}
              onClick={() => setForm({ ...form, mode: m })}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* Venue & Link */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <input
            name="venue"
            placeholder="Venue"
            className="input"
            onChange={handleChange}
          />
          <input
            name="link"
            placeholder="Registration Link"
            className="input"
            onChange={handleChange}
          />
        </div>

        {/* Upload */}
        <label className="label">Upload Poster</label>
        <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer mb-6">
          <Upload className="mb-2 text-gray-500" />
          <span className="text-sm text-gray-500">Click or drag to upload</span>
          <input
            type="file"
            hidden
            onChange={(e) => setPoster(e.target.files[0])}
          />
        </label>

        {/* Submit */}
        <button
          onClick={submitHandler}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium"
        >
          Create Event
        </button>
      </div>
    </div>
  );
}

