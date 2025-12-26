import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["student", "professor", "placement"],
      required: true
    },

    dept: {
      type: String
    },

    rollNo: {
      type: String
    },

    credits: {
      type: Number,
      default: 0
    },
   about: {
  type: String,
  default: ""
},

skills: {
  type: [String],
  default: []
},

links: {
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  email: { type: String, default: "" }
},
college: {
  type: String,
  default: "R.M.K College of Engineering"
},
year: {
  type: Number,
  min: 1,
  max: 4,
  default: 3
},

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
