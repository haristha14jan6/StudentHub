import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // to parse JSON
app.use("/api/submissions", submissionRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/notifications", notificationRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
