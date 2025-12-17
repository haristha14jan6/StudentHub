import mongoose from "mongoose";

const jobDriveSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true
    },

    jobRole: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    skillsRequired: {
      type: [String]
    },

    cgpaCriteria: {
      type: String,
      enum: ["nil", ">7.5", ">8.5"],
      default: "nil"
    },

    arrearCriteria: {
      type: String,
      enum: ["no history", "no standing arrear", "with arrear", "all"],
      default: "all"
    },

    registrationDeadline: {
      type: Date,
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("JobDrive", jobDriveSchema);
