import { Routes, Route } from "react-router-dom";
import Chatbot from "./components/chatbot/Chatbot";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


import ProfessorDashboard from "./pages/ProfessorDashboard";
import PlacementDashboard from "./pages/placement/PlacementDashboard";
import Portfolio from "./pages/student/Portfolio";
import PortfolioView from "./pages/student/PortfolioView";
import Profile from "./pages/student/Profile";


// (Dashboards will be added later)

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import Leaderboard from "./pages/student/Leaderboard";

// Other Dashboards



export default function App() {
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
        <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
        <Route path="/placement/dashboard" element={<PlacementDashboard/>}/>

      </Routes>

      {/* 🤖 Chatbot always visible */}
      <Chatbot />
    </>
  );
}
