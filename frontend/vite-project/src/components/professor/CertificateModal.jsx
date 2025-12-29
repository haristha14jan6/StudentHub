
//@ts-nocheck
import { X, Download } from "lucide-react";

export default function CertificateModal({ isOpen, onClose, certificateUrl }) {
  if (!isOpen) return null;

  const fullUrl = `http://localhost:5000/${certificateUrl}`;
  const isPdf = certificateUrl.endsWith(".pdf");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-3xl rounded-xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Certificate Preview</h2>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 max-h-[70vh] overflow-auto flex justify-center">
          {isPdf ? (
            <iframe
              src={fullUrl}
              title="Certificate PDF"
              className="w-full h-[60vh]"
            />
          ) : (
            <img
              src={fullUrl}
              alt="Certificate"
              className="max-h-[60vh] object-contain"
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-3">
          <a
            href={fullUrl}
            download
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Download size={18} />
            Download
          </a>
        </div>

      </div>
    </div>
  );
}
