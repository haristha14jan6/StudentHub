import { useState } from "react";
import { createJobDrive } from "../../api/placement";
import { X } from "lucide-react";

export default function CreateDriveModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    companyName: "",
    jobRole: "",
    department: "",
    year: "",
    skillsRequired: "",
    cgpaCriteria: "NONE",
    arrearCriteria: "ALL",
    registrationDeadline: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await createJobDrive({
        ...form,
        year: Number(form.year),
        skillsRequired: form.skillsRequired
          .split(",")
          .map(s => s.trim())
          .filter(Boolean)
      });
      if (typeof onClose === "function") onClose();
      if (typeof onCreated === "function") onCreated();
    } catch (err) {
      console.error(err);
      alert("Failed to create drive");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        {/* Compact Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            Create New Drive
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Compact Form Body */}
        <div className="p-5 grid grid-cols-2 gap-x-4 gap-y-3">
          <Input name="companyName" label="Company Name" onChange={handleChange} placeholder="e.g. Google" />
          <Input name="jobRole" label="Job Role" onChange={handleChange} placeholder="e.g. SDE" />
          
          <Select
            name="department"
            label="Department"
            options={["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"]}
            onChange={handleChange}
          />
          <Select
            name="year"
            label="Year"
            options={[1, 2, 3, 4]}
            onChange={handleChange}
          />

          <div className="col-span-2">
            <Input name="skillsRequired" label="Skills Required" placeholder="Java, React, SQL" onChange={handleChange} />
          </div>

          <Select
            name="cgpaCriteria"
            label="CGPA Requirement"
            options={[
              { label: "No Requirement", value: "NONE" },
              { label: "> 7.5", value: "GT_7_5" },
              { label: "> 8.5", value: "GT_8_5" }
            ]}
            onChange={handleChange}
          />

          <Select
            name="arrearCriteria"
            label="Arrear History"
            options={[
              { label: "All", value: "ALL" },
              { label: "No History", value: "NO_HISTORY" },
              { label: "No Standing Arrears", value: "NO_STANDING" },
              { label: "With Arrear", value: "WITH_ARREAR" }
            ]}
            onChange={handleChange}
          />

          <div className="col-span-2">
            <Input type="date" name="registrationDeadline" label="Registration Deadline" onChange={handleChange} />
          </div>
        </div>

        {/* Action Footer */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Drive"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Optimized Reusable Inputs ---------- */

function Input({ label, ...props }) {
  return (
    <div className="w-full">
      <label className="text-[11px] uppercase tracking-wider font-bold text-slate-500 ml-1">{label}</label>
      <input
        {...props}
        className="w-full border border-slate-200 p-2 rounded-xl mt-1 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
      />
    </div>
  );
}

function Select({ label, name, options, onChange }) {
  return (
    <div className="w-full">
      <label className="text-[11px] uppercase tracking-wider font-bold text-slate-500 ml-1">{label}</label>
      <select
        name={name}
        onChange={onChange}
        className="w-full border border-slate-200 p-2 rounded-xl mt-1 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white"
      >
        <option value="">Select</option>
        {options.map(o =>
          typeof o === "object"
            ? <option key={o.value} value={o.value}>{o.label}</option>
            : <option key={o} value={o}>{o}</option>
        )}
      </select>
    </div>
  );
}