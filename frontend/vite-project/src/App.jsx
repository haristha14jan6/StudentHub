//@ts-nocheck
import { Routes, Route,Navigate } from "react-router-dom";


// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


import Dashboard from "./pages/professor/Dashboard";
import PlacementDashboard from "./pages/placement/PlacementDashboard";
import Portfolio from "./pages/student/Portfolio";
import PortfolioView from "./pages/student/PortfolioView";
import Profile from "./pages/student/Profile";


// (Dashboards will be added later)

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import Leaderboard from "./pages/student/Leaderboard";
import Submissions from "./pages/professor/Submissions";
import ProfessorRoutes from "./pages/professor/ProfessorRoutes";
// Other Dashboards
import { useAuth } from "./context/AuthContext";


export default function App() {
  const { user } = useAuth();
  return (
    <>
      {/* 🔁 ROUTES */}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/leaderboard" element={<Leaderboard />} />
        <Route path="/student/portfolio" element={<Portfolio />} />
        <Route path="/student/portfolio/view" element={<PortfolioView />} />
        <Route path="/student/profile" element={<Profile />} />

       
        
    
        {/* Professor */}
        {/* Professor */}
        <Route
          path="/professor/*"
          element={
            user?.role === "professor" ? (
              <ProfessorRoutes />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/placement/dashboard" element={<PlacementDashboard/>}/>
        {/* Professor */}
        <Route
          path="/professor/*"
          element={
            user?.role === "professor" ? (
              <ProfessorRoutes />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>

      {/* 🤖 Chatbot always visible */}
      
    </>
  );
}
