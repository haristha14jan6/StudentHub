import express from "express";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  getPendingSubmissions,
  approveSubmission,
  rejectSubmission
} from "../controllers/submissionController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Professor APIs
router.post(
  "/upload",
  protect,
  upload.single("certificate"),
  getPendingSubmissions
  
);
router.get("/pending", protect, getPendingSubmissions);
router.put("/approve/:id", protect, approveSubmission);
router.put("/reject/:id", protect, rejectSubmission);

export default router;
