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
  enum: ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"],
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
  enum: ["NONE", "GT_7_5", "GT_8_5"],
  default: "NONE"
},


   arrearCriteria: {
  type: String,
  enum: ["ALL", "NO_HISTORY", "NO_STANDING", "WITH_ARREAR"],
  default: "ALL"
},


    registrationDeadline: {
      type: Date,
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
   applicants: [
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  }
],


  },
  { timestamps: true }
);

export default mongoose.model("JobDrive", jobDriveSchema);
