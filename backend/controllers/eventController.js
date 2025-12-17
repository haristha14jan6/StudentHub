import Event from "../models/Event.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

// 🆕 Create Event
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      mode,
      venue,
      link
    } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      mode,
      venue,
      link,
      posterUrl: req.file?.path,
      createdBy: req.user.id
    });

    // 🔔 Notify all students
    const students = await User.find({ role: "student" }).select("_id");

    const notifications = students.map((student) => ({
      user: student._id,
      message: `New event created: ${title}`
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      message: "Event created successfully",
      event
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📋 Get Events (Upcoming & Completed – last 1 month)
export const getEvents = async (req, res) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const events = await Event.find({
      createdAt: { $gte: oneMonthAgo }
    }).sort({ date: -1 });

    const now = new Date();

    const upcoming = events.filter(e => e.date >= now);
    const completed = events.filter(e => e.date < now);

    res.json({
      upcoming,
      completed
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
