import { useState } from "react";
import { createJobDrive } from "../../api/placement";

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

    console.log("onClose prop =", onClose);
    console.log("onCreated prop =", onCreated);

    if (typeof onClose === "function") {
      onClose();
    }

    if (typeof onCreated === "function") {
      onCreated();
    }

  } catch (err) {
    console.error(err);
    alert("Failed to create drive");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          Create New Drive
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <Input
            name="companyName"
            label="Company Name"
            onChange={handleChange}
          />

          <Input
            name="jobRole"
            label="Job Role"
            onChange={handleChange}
          />

          <Select
            name="department"
            label="Department"
            options={["CSE","IT","ECE","EEE","MECH","CIVIL"]}
            onChange={handleChange}
          />

          <Select
            name="year"
            label="Year"
            options={[1,2,3,4]}
            onChange={handleChange}
          />

          <Input
            name="skillsRequired"
            label="Skills Required"
            placeholder="Java, React, SQL"
            onChange={handleChange}
          />

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

          <Input
            type="date"
            name="registrationDeadline"
            label="Registration Deadline"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"          // ✅ FIX
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"          // ✅ FIX
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            {loading ? "Creating..." : "Create Drive"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Inputs ---------- */

function Input({ label, ...props }) {
  return (
    <div className="col-span-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full border p-2 rounded-lg mt-1"
      />
    </div>
  );
}

function Select({ label, name, options, onChange }) {
  return (
    <div className="col-span-1">
      <label className="text-sm font-medium">{label}</label>
      <select
        name={name}
        onChange={onChange}
        className="w-full border p-2 rounded-lg mt-1"
      >
        <option value="">Select</option>
        {options.map(o =>
          typeof o === "object"
            ? (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            )
            : (
              <option key={o} value={o}>
                {o}
              </option>
            )
        )}
      </select>
    </div>
  );
}
