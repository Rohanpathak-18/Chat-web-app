import express from "express";

import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

// Check authentication
router.get("/check", protectRoute, checkAuth);

// Update profile
router.put(
  "/update-profile",
  protectRoute,
  updateProfile
);

export default router;