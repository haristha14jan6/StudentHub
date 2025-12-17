import express from "express";
import { createSubmission } from "../controllers/submissionController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("certificate"),
  createSubmission
);

export default router;
