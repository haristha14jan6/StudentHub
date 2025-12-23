import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


// (Dashboards will be added later)
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

       

        {/* Future routes */}
        {/*
        <Route path="/student/*" element={<StudentDashboard />} />
        <Route path="/professor/*" element={<ProfessorDashboard />} />
        <Route path="/placement/*" element={<PlacementDashboard />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}
