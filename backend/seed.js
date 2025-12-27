import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "./models/User.js";
import ActivitySubmission from "./models/ActivitySubmission.js";
import JobDrive from "./models/JobDrive.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedData = async () => {
  try {
    /* ================= CONNECT ================= */
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    /* ================= CLEAN DATABASE ================= */
    await User.deleteMany({});
    await ActivitySubmission.deleteMany({});
    await JobDrive.deleteMany({});
    console.log("🧹 Old data cleared");

    /* ================= PASSWORD ================= */
    const hashedPassword = await bcrypt.hash("password123", 10);

    /* ================= PLACEMENT USER ================= */
    const placementUser = await User.create({
      name: "Placement Officer",
      email: "placement@college.com",
      password: hashedPassword,
       dept: "CSE",
      role: "placement"
    });

    console.log("🏢 Placement user created");

    /* ================= STUDENT USER ================= */
    const student = await User.create({
      name: "Arun Kumar",
      email: "arun@student.com",
      password: hashedPassword,
      role: "student",

      rollNo: "CS21B001",
      dept: "CSE",
      college: "R.M.K College of Engineering",
      year: 3,
      credits: 24,

      about:
        "I am a Computer Science undergraduate with hands-on experience in full-stack web development. I actively participate in hackathons, internships, and technical projects to build real-world solutions.",

      skills: [
        "JavaScript",
        "React",
        "HTML",
        "CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
        "Git",
        "GitHub",
        "Postman",
        "OOPs",
        "DBMS",
        "Basic System Design"
      ],

      links: {
        github: "https://github.com/arunkumar-dev",
        linkedin: "https://www.linkedin.com/in/arun-kumar",
        email: "arun@student.com"
      }
    });

    console.log("👤 Student created");

    /* ================= ACTIVITIES ================= */
    await ActivitySubmission.insertMany([
      {
        student: student._id,
        activityType: "hackathon",
        title: "Smart India Hackathon 2024 – Finalist",
        certificateUrl: "https://example.com/sih.pdf",
        status: "approved"
      },
      {
        student: student._id,
        activityType: "internship",
        title: "TCS Summer Internship",
        certificateUrl: "https://example.com/tcs.pdf",
        status: "approved"
      },
      {
        student: student._id,
        activityType: "certification",
        title: "AWS Cloud Practitioner Certification",
        certificateUrl: "https://example.com/aws.pdf",
        status: "approved"
      },
      {
        student: student._id,
        activityType: "paper",
        title: "IEEE Research Paper on AI Optimization",
        certificateUrl: "https://example.com/ieee.pdf",
        status: "approved"
      }
    ]);

    console.log("🏆 Approved activities added");

    /* ================= JOB DRIVES ================= */
    /* ================= JOB DRIVES ================= */
await JobDrive.insertMany([
  {
    companyName: "TCS",
    jobRole: "Software Engineer",             // ✅ correct field
    description: "Full stack development role",

    department: "CSE",                // ✅ required
    year: 3,                                  // ✅ required
    registrationDeadline: new Date("2024-12-20"),

    startDate: new Date("2024-12-15"),
    endDate: new Date("2024-12-25"),

    createdBy: placementUser._id,
    applicants: [
      { student: student._id }
    ]
  },
  {
    companyName: "Infosys",
    jobRole: "Digital Specialist Engineer",
    description: "Backend focused role",

    department: "IT",
    year: 3,
    registrationDeadline: new Date("2024-12-28"),

    startDate: new Date("2024-12-20"),
    endDate: new Date("2025-01-05"),

    createdBy: placementUser._id,
    applicants: []
  }
]);


    console.log("💼 Job drives created");

    console.log("🎉 SEED COMPLETED SUCCESSFULLY");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seedData();
