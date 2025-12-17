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

