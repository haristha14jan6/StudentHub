import express from "express";
import { updateProfile,getMyProfile } from "../controllers/profileController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.put(
  "/update",
  protect,
  allowRoles("student"),
  updateProfile
);
router.get(
  "/me",
  protect,
  allowRoles("student"),
  getMyProfile
);

export default router;
