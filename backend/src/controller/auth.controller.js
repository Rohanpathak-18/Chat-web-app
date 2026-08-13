import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../lib/cloudinary.js";
import { serializeUser } from "../lib/userResponse.js";

// =========================
// SIGNUP
// =========================

export const signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters",
      });
    }

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // IMPORTANT
    generateToken(
      newUser._id,
      res
    );

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePicture:
        newUser.profilePicture || "",
      createdAt: newUser.createdAt,
    });

  } catch (error) {
    console.log(
      "Error in signup:",
      error.message
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// =========================
// LOGIN
// =========================

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    //  THIS IS IMPORTANT
    generateToken(user._id, res);

    console.log(
      "Login successful for:",
      user.email
    );

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture:
        user.profilePicture || "",
      createdAt: user.createdAt,
    });

  } catch (error) {
    console.log(
      "Error in login controller:",
      error.message
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// =========================
// LOGOUT
// =========================

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.status(200).json({
      message: "Logged out successfully",
    });

  } catch (error) {
    console.log(
      "Error in logout controller:",
      error.message
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// =========================
// UPDATE PROFILE
// =========================

export const updateProfile = async (
  req,
  res
) => {
  try {
    const { profilePicture } = req.body;

    const userId = req.user._id;

    if (!profilePicture) {
      return res.status(400).json({
        message:
          "Profile picture is required",
      });
    }

    const uploadResponse =
      await cloudinary.uploader.upload(
        profilePicture,
        {
          folder: "chat-app-profiles",
        }
      );

    const updatedUser =
      await User.findByIdAndUpdate(
        userId,
        {
          profilePicture:
            uploadResponse.secure_url,
        },
        {
          new: true,
        }
      );

    res.status(200).json(
      serializeUser(updatedUser)
    );
  } catch (error) {
    console.log(
      "Error in updateProfile:",
      error.message
    );

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// =========================
// CHECK AUTH
// =========================

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(
      serializeUser(req.user)
    );
  } catch (error) {
    console.log(
      "Error in checkAuth controller:",
      error.message
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};