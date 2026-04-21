import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const signupUser = async (req, res) => {
  console.log(req.body);

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Body is missing" });
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};