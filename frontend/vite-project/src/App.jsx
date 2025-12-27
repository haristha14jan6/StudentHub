import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/student/StudentDashboard";

import ProfessorDashboard from "./pages/ProfessorDashboard";
import PlacementDashboard from "./pages/placement/PlacementDashboard";
import Portfolio from "./pages/student/Portfolio";
import PortfolioView from "./pages/student/PortfolioView";
import Profile from "./pages/student/Profile";
import Leaderboard from "./pages/student/Leaderboard";

// (Dashboards will be added later)
export default function App() {
  return (
   
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       

       

        {/* Dashboards */}
       <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
        <Route path="/placement/dashboard" element={<PlacementDashboard />} />
        <Route path="/student/portfolio" element={<Portfolio />}/>
        <Route path="/student/portfolio/view" element={<PortfolioView/>} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/leaderboard" element={<Leaderboard />} />
        
      
       
      </Routes>
     
   
  );
}
