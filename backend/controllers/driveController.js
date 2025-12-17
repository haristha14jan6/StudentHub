import JobDrive from "../models/JobDrive.js";

// 🆕 Create Job Drive
export const createJobDrive = async (req, res) => {
  try {
    const drive = await JobDrive.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Job drive created successfully",
      drive
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📋 Get all Job Drives
export const getJobDrives = async (req, res) => {
  try {
    const drives = await JobDrive.find()
      .sort({ createdAt: -1 });

    res.json(drives);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
