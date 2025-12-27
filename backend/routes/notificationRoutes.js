import express from "express";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
 deleteNotification
} from "../controllers/notificationController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.get("/unread-count", protect, getUnreadCount);
router.put("/read/:id", protect, markAsRead); // Route for Mark as Read
router.delete("/:id", protect, deleteNotification);

export default router;
