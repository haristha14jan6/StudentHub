import express from "express";
import { createEvent, getEvents, deleteEvent } from "../controllers/eventController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Create Event
router.post(
  "/create",
  protect,
  upload.single("poster"),
  createEvent
);

// Get Events
router.get("/", protect, getEvents);

// ✅ DELETE EVENT
router.delete("/:id", protect, deleteEvent);

export default router;
