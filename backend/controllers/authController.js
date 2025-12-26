import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// 📝 Register
export const register = async (req, res) => {
  try {
    const { name, email, password, role, dept, rollNo } = req.body;

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: "Email already registered" });

    // Check if Roll Number already exists (Only for students)
    if (role === 'student' && rollNo) {
      const rollExists = await User.findOne({ rollNo });
      if (rollExists) return res.status(400).json({ message: "Roll Number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object - rollNo will be undefined for non-students
    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
      dept,
      ...(role === 'student' && { rollNo }) 
    };

    await User.create(userData);
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    // This will catch MongoDB unique constraint errors
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate entry found (Email or Roll Number)" });
    }
    res.status(500).json({ error: error.message });
  }
};
// 🔑 Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
