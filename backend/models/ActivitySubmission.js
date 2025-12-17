import mongoose from "mongoose";

const activitySubmissionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  activityType: {
    type: String,
    enum: ["hackathon", "internship", "certification", "paper"],
    required: true
  },

  title: {
    type: String,
    required: true
  },

  certificateUrl: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

export default mongoose.model("ActivitySubmission", activitySubmissionSchema);
