import ActivitySubmission from "../models/ActivitySubmission.js";

export const createSubmission = async (req, res) => {
  try {
    const { activityType, title } = req.body;

    const submission = await ActivitySubmission.create({
      student: req.user.id,
      activityType,
      title,
      certificateUrl: req.file.path
    });

    res.status(201).json({
      message: "Certificate uploaded successfully",
      submission
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
