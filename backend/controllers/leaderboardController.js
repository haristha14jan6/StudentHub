import ActivitySubmission from "../models/ActivitySubmission.js";
import User from "../models/User.js";
import { ACTIVITY_CREDITS } from "../utils/constants.js";

export const getLeaderboardData = async (req, res) => {
  try {
    // 1. Fetch all students
    const students = await User.find({ role: "student" })
      .select("name rollNo dept");

    // 2. Fetch all approved submissions
    // Note: Database shows "approved" (lowercase)
    const approvedSubmissions = await ActivitySubmission.find({
      status: "approved" 
    });

    // 3. Aggregate points per student
    const leaderboard = students.map(student => {
      const studentActivities = approvedSubmissions.filter(
        s => s.student.toString() === student._id.toString()
      );

      const totalPoints = studentActivities.reduce((sum, s) => {
        // Ensure the key is lowercase to match your ACTIVITY_CREDITS keys
        // DB has "paper", Constants has "paper"
        const key = s.activityType.toLowerCase();
        const pointsToAdd = ACTIVITY_CREDITS[key] || 0;
        
        return sum + pointsToAdd;
      }, 0);

      return {
        _id: student._id,
        name: student.name,
        rollNo: student.rollNo,
        dept: student.dept,
        points: totalPoints,
        avatar: student.name ? student.name.charAt(0) : "?"
      };
    });

    // 4. Sort by points and assign rank
    const sorted = leaderboard
      .sort((a, b) => b.points - a.points)
      .map((item, index) => ({
        ...item,
        rank: index + 1
      }));

    // 5. Send response matching the frontend's expected structure
    res.json({ data: sorted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};