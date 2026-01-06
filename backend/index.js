import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// 1. Import all routes
import submissionRoutes from "./routes/submissionRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import driveRoutes from "./routes/driveRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import leaderboardRoutes from './routes/leaderboardRoutes.js';

// 2. Configuration
dotenv.config();
connectDB();

// 3. Initialize App (This MUST come before any app.use calls)
const app = express();

// 4. Global Middleware
app.use(cors({
  origin: "*",   // later restrict to Vercel domain
}));

app.use(express.json()); 
app.use("/uploads", express.static("uploads"));

// 5. Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/drives", driveRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api', leaderboardRoutes); // Correctly placed after initialization

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));