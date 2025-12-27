import express from "express";
import {
  createJobDrive,
  getJobDrives,
  getJobDriveById,
  deleteJobDrive
} from "../controllers/driveController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Placement cell APIs
router.post("/create", protect, createJobDrive);
router.get("/", protect, getJobDrives);
router.get("/:id", protect, getJobDriveById);
router.delete("/:id", protect, deleteJobDrive);


export default router;
