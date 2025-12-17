//@ts-nocheck
import ActivitySubmission from "../models/ActivitySubmission.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { ACTIVITY_CREDITS } from "../utils/constants.js";


// 🔹 Get all pending submissions (Professor)
export const getPendingSubmissions = async (req, res) => {
  try {
    const submissions = await ActivitySubmission.find({ status: "pending" })
      .populate("student", "name email rollNo dept");

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Approve Submission
export const approveSubmission = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await ActivitySubmission.findById(id);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    submission.status = "approved";
    submission.reviewedBy = req.user.id;
    await submission.save();

    const credits = ACTIVITY_CREDITS[submission.activityType] || 0;

    await User.findByIdAndUpdate(
      submission.student,
      { $inc: { credits } }
    );

    await Notification.create({
      user: submission.student,
      message: `Your ${submission.activityType} certificate has been approved (+${credits} credits)`
    });

    res.json({
      message: "Submission approved",
      creditsAdded: credits
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Reject Submission
export const rejectSubmission = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await ActivitySubmission.findById(id);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    submission.status = "rejected";
    submission.reviewedBy = req.user.id;
    await submission.save();

    await Notification.create({
      user: submission.student,
      message: `Your ${submission.activityType} certificate has been rejected`
    });

    res.json({ message: "Submission rejected" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📊 Professor dashboard summary stats
export const getSubmissionStats = async (req, res) => {
  try {
    const pending = await ActivitySubmission.countDocuments({ status: "pending" });
    const approved = await ActivitySubmission.countDocuments({ status: "approved" });
    const rejected = await ActivitySubmission.countDocuments({ status: "rejected" });

    res.json({
      pending,
      approved,
      rejected
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📋 Get submissions list with filters
// 📋 Get submissions list with filters & search
export const getSubmissionsList = async (req, res) => {
  try {
    const { filter, search } = req.query;

    let query = {};

    // 🗓 Date filters
    if (filter === "today") {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      query.createdAt = { $gte: start, $lte: end };
    }

    if (filter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      query.createdAt = { $gte: weekAgo };
    }

    let submissions = await ActivitySubmission.find(query)
      .populate("student", "name rollNo dept")
      .sort({ createdAt: -1 });

    // 🔍 Search (student name / activity title / type)
    if (search) {
      const keyword = search.toLowerCase();
      submissions = submissions.filter((s) =>
        s.title.toLowerCase().includes(keyword) ||
        s.activityType.toLowerCase().includes(keyword) ||
        s.student?.name.toLowerCase().includes(keyword)
      );
    }

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

