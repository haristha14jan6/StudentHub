import express from "express";
import { createEvent, deleteEvent, getEvents } from "../controllers/eventController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Professor APIs
router.post(
  "/create",
  protect,
  upload.single("poster"),
  createEvent
);

router.get("/", protect, getEvents);
router.delete("/:id", protect, deleteEvent);

export default router;
