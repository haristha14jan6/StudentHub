import express from "express";
import {
  getPendingSubmissions,
  approveSubmission,
  rejectSubmission
} from "../controllers/submissionController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Professor APIs
router.get("/pending", protect, getPendingSubmissions);
router.put("/approve/:id", protect, approveSubmission);
router.put("/reject/:id", protect, rejectSubmission);

export default router;
