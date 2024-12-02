import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Register
const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({
        message: "User already exists", // Use 409 (CONFLICT) for duplicate resource
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(httpStatus.CREATED).json({
      message: "User registered successfully",
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Error registering user: ${error.message}`,
    });
  }
};

// Login
const login = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Please enter both username and password",
    });
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found", // Explicit "User not found" error
      });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid password", // Explicit "Invalid password" error
      });
    }

    // Generate token
    const token = crypto.randomBytes(20).toString("hex");
    user.token = token; // Save token to user model
    await user.save();

    return res.status(httpStatus.OK).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Something went wrong: ${error.message}`,
    });
  }
};

export { login, register };
