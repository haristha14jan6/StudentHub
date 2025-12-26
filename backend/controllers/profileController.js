import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const studentId = req.user.id;

    const { about, skills, links, college, year } = req.body;

    const user = await User.findByIdAndUpdate(
      studentId,
      {
        about,
        skills,
        links,
        college,
        year
      },
      { new: true }
    ).select("about skills links college year");

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const studentId = req.user.id;

    const user = await User.findById(studentId).select(
  "name rollNo about skills links college year profileImage"
);


    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
