//@ts-nocheck
import { useState } from "react";
import api from "../../api/axios";
import { X, Upload } from "lucide-react";

export default function CreateEventModal({ onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("online");
  const [venue, setVenue] = useState("");
  const [link, setLink] = useState("");
  const [poster, setPoster] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !date) {
      setError("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("mode", mode);
    formData.append("venue", venue);
    formData.append("link", link);

    // ✅ file upload (matches multer: upload.single("poster"))
    if (poster) {
      formData.append("poster", poster);
    }

    try {
      setLoading(true);
      await api.post("/events/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Event</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-4 space-y-5 overflow-y-auto"
        >
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Event Title *
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., NeoHackathon 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description *
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg"
              rows="4"
              placeholder="Event description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Date *
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 border rounded-lg"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Mode */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Mode
            </label>
            <div className="grid grid-cols-2 gap-4">
              {["online", "offline"].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMode(m)}
                  className={`py-2 rounded-lg border ${
                    mode === m
                      ? "bg-blue-100 border-blue-500 text-blue-600"
                      : "bg-gray-100"
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Venue & Link */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Venue
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Seminar Hall"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Registration Link
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>

          {/* Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Poster / Image
            </label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer text-gray-500 hover:border-blue-500">
              <Upload className="w-6 h-6 mb-2" />
              <span>
                {poster ? poster.name : "Click or drag to upload"}
              </span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setPoster(e.target.files[0])}
              />
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-500"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}


