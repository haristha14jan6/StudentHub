import express from 'express';
import { getLeaderboardData } from '../controllers/leaderboardController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Define the endpoint
router.get('/leaderboard', protect, getLeaderboardData);

export default router;