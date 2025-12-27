import JobDrive from "../models/JobDrive.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

// 🆕 Create Job Drive and Notify Students
// This is the "createJobDrive" that your route is looking for
export const createJobDrive = async (req, res) => {
  try {
    // 1. Create the Job Drive entry
    const drive = await JobDrive.create({
      ...req.body,
      createdBy: req.user.id
    });

    // 2. Find all users registered as students
    const students = await User.find({ role: "student" }).select("_id");

    // 3. Prepare notification objects
    const notifications = students.map(student => ({
      user: student._id,
     message: `New Placement Drive: ${drive.companyName} (${drive.role}) has been posted!`,
    
      isRead: false
    }));

    // 4. Bulk insert into Notification collection
    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    res.status(201).json({
      message: "Job drive created and students notified successfully",
      drive
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📋 Get all Job Drives
export const getJobDrives = async (req, res) => {
  try {
    const drives = await JobDrive.find().sort({ createdAt: -1 });
    res.json(drives);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Get Single Job Drive by ID
export const getJobDriveById = async (req, res) => {
  try {
    const drive = await JobDrive.findById(req.params.id);

    if (!drive) {
      return res.status(404).json({ message: "Drive not found" });
    }

    res.json(drive);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};