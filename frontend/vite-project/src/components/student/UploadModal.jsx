import { useState } from "react";
import { uploadCertificate } from "../../api/student";

export default function UploadModal({ activityType, onClose }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file || !title) {
      setError("Please enter title and choose a file");
      return;
    }

    const formData = new FormData();
    formData.append("activityType", activityType);
    formData.append("title", title);
    formData.append("certificate", file);

    try {
      setLoading(true);
      await uploadCertificate(formData);
      alert("Certificate uploaded successfully");
      onClose();
      window.location.reload(); // later we’ll replace this
    } catch (err) {
      console.error(err);
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h3 className="font-bold mb-4 capitalize">
          Upload {activityType}
        </h3>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          className="border w-full mb-3 p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          className="mb-4"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
