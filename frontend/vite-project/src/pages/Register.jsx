import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // Default role
    dept: "",        // Required for everyone
    rollNo: "",      // Required only for students
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Departments list for all roles
  const departments = ["CSE", "ECE", "MECH", "IT", "EEE", "CIVIL"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear rollNo if switching from student to another role
    if (name === "role" && value !== "student") {
      setForm({ ...form, [name]: value, rollNo: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation: Check department for everyone
    if (!form.dept) {
      setError("Please select a department");
      return;
    }

    // Validation: Check roll number for students
    if (form.role === "student" && !form.rollNo) {
      setError("Students must provide a Roll Number");
      return;
    }

    try {
      await api.post("/auth/register", form);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg === "User already exists" ? "Account already exists. Redirecting to login..." : msg);
      if (msg === "User already exists") {
        setTimeout(() => navigate("/login"), 1500);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>

        {error && (
          <p className="bg-red-50 border border-red-200 text-red-500 text-sm py-2 px-4 rounded-lg text-center mb-4">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-50 border border-green-200 text-green-600 text-sm py-2 px-4 rounded-lg text-center mb-4">
            {success}
          </p>
        )}

        <div className="space-y-4">
          {/* Common Fields */}
          <input
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Department - Now outside the conditional block */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="dept"
              className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.dept}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="professor">Professor</option>
              <option value="placement">Placement Cell</option>
            </select>
          </div>

          {/* Roll Number - Only for Students */}
          {form.role === "student" && (
            <div className="animate-in fade-in duration-300">
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
              <input
                name="rollNo"
                placeholder="e.g. 21CS101"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.rollNo}
                onChange={handleChange}
                required
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm"
        >
          Register
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}