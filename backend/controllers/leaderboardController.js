import ActivitySubmission from "../models/ActivitySubmission.js";
import User from "../models/User.js";
import { ACTIVITY_CREDITS } from "../utils/constants.js";

export const getLeaderboardData = async (req, res) => {
  try {
    // 1. Fetch all students
    const students = await User.find({ role: 'student' }).select('name rollNo dept');

    // 2. Fetch all approved submissions
    const approvedSubmissions = await ActivitySubmission.find({ status: 'approved' });

    // 3. Aggregate points per student
    const leaderboard = students.map(student => {
      const studentActivities = approvedSubmissions.filter(s => 
        s.student.toString() === student._id.toString()
      );

      const totalPoints = studentActivities.reduce((sum, s) => {
        return sum + (ACTIVITY_CREDITS[s.activityType] || 0);
      }, 0);

      return {
        _id: student._id,
        name: student.name,
        rollNo: student.rollNo,
        dept: student.dept,
        points: totalPoints,
        avatar: student.name.charAt(0) // For the UI circle
      };
    });

    // 4. Sort by points (highest first) and assign rank
    const sortedData = leaderboard
      .sort((a, b) => b.points - a.points)
      .map((item, index) => ({ ...item, rank: index + 1 }));

    res.json({ data: sortedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};