//@ts-nocheck
import { Routes, Route, Navigate } from "react-router-dom";
import ProfessorLayout from "../../layouts/ProfessorLayout";
import Dashboard from "./Dashboard";
import Submissions from "./Submissions";
import ManageEvents from "./ManageEvents";

export default function ProfessorRoutes() {
  return (
    <ProfessorLayout>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="events" element={<ManageEvents />} />
      </Routes>
    </ProfessorLayout>
  );
}
