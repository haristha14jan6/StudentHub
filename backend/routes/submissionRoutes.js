import express from "express";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  uploadSubmission,
  getPendingSubmissions,
  approveSubmission,
  rejectSubmission,
  getSubmissionStats,
  getSubmissionsList
} from "../controllers/submissionController.js";
import { protect } from "../middlewares/authMiddleware.js";
import ActivitySubmission from "../models/ActivitySubmission.js";

const router = express.Router();

/* =======================
   STUDENT ROUTES
======================= */

// Student uploads certificate
router.post(
  "/upload",
  protect,
  upload.single("certificate"),
  uploadSubmission
);

// 🟢 STUDENT — get own submissions (🔥 THIS WAS MISSING)
router.get("/my", protect, async (req, res) => {
  try {
    const submissions = await ActivitySubmission.find({
      student: req.user.id
    }).sort({ createdAt: -1 });

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   PROFESSOR ROUTES
======================= */

// Get pending submissions
router.get("/pending", protect, getPendingSubmissions);

// Dashboard stats
router.get("/stats", protect, getSubmissionStats);

// Submissions list
router.get("/list", protect, getSubmissionsList);

// Approve / Reject
router.put("/approve/:id", protect, approveSubmission);
router.put("/reject/:id", protect, rejectSubmission);

export default router;
