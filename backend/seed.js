import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import ActivitySubmission from "./models/ActivitySubmission.js";
import bcrypt from "bcryptjs";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // 🔴 Clean old data
    await User.deleteMany({});
    await ActivitySubmission.deleteMany({});

    // 👤 Create Student
   const hashedPassword = await bcrypt.hash("password123", 10);

const student = await User.create({
  name: "Arun Kumar",
  email: "arun@student.com",
  password: hashedPassword,
  role: "student",
  rollNo: "CS21B001",
  dept: "Computer Science",
  credits: 24,
});


    console.log("Student created");

    // 🏆 Approved Activities
    const activities = [
      {
        student: student._id,
        activityType: "hackathon",
        title: "Smart India Hackathon 2024 Finalist",
        certificateUrl: "https://example.com/sih.pdf",
        status: "approved",
      },
      {
        student: student._id,
        activityType: "internship",
        title: "TCS Summer Internship",
        certificateUrl: "https://example.com/tcs.pdf",
        status: "approved",
      },
      {
        student: student._id,
        activityType: "certification",
        title: "AWS Cloud Practitioner",
        certificateUrl: "https://example.com/aws.pdf",
        status: "approved",
      },
      {
        student: student._id,
        activityType: "paper",
        title: "IEEE Paper on AI Optimization",
        certificateUrl: "https://example.com/ieee.pdf",
        status: "approved",
      },
    ];

    await ActivitySubmission.insertMany(activities);
    console.log("Approved activities added");

    console.log("✅ SEED COMPLETED SUCCESSFULLY");
    process.exit();

  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seedData();
