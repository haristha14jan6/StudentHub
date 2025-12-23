import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import ActivitySubmission from "../models/ActivitySubmission.js";

dotenv.config();

// 🔗 Connect DB
await mongoose.connect(process.env.MONGO_URI);

// 🧹 Clear old test data (optional)
await User.deleteMany({ email: "student1@gmail.com" });

// 🔐 Hash password
const hashedPassword = await bcrypt.hash("123456", 10);

// 👨‍🎓 Create student
const student = await User.create({
  name: "Ashik Kumar",
  email: "student1@gmail.com",
  password: hashedPassword,
  role: "student",
  rollNo: "21CS001",
  dept: "CSE",
  credits: 60
});

// 📄 Create approved submissions
await ActivitySubmission.insertMany([
  {
    student: student._id,
    activityType: "hackathon",
    title: "Smart India Hackathon",
    certificateUrl: "uploads/sample-hackathon.pdf",
    status: "approved"
  },
  {
    student: student._id,
    activityType: "internship",
    title: "Google Summer Internship",
    certificateUrl: "uploads/sample-internship.pdf",
    status: "approved"
  }
]);

console.log("✅ Seed student created successfully");

process.exit();
