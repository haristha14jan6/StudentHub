import express from "express";
import { generatePortfolio } from "../controllers/portfolioController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/generate",
  protect,
  allowRoles("student"),
  generatePortfolio
);

export default router;
