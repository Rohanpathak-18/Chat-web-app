import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    console.log("========== AUTH DEBUG ==========");
    console.log("Cookie header:", req.headers.cookie);
    console.log(
      "JWT exists:",
      !!req.cookies?.jwt
    );
    console.log("===============================");

    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No Token Provided",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(
      decoded.userId
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {
    console.log(
      "Auth middleware error:",
      error.message
    );

    return res.status(401).json({
      message: "Unauthorized - Invalid Token",
    });
  }
};