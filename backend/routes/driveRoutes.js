import express from "express";
import {
  createJobDrive,
  getJobDrives
} from "../controllers/driveController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Placement cell APIs
router.post("/create", protect, createJobDrive);
router.get("/", protect, getJobDrives);

export default router;
