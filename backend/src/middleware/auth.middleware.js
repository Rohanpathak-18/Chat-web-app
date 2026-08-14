import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    console.log("========== AUTH DEBUG ==========");

    const authHeader = req.headers.authorization;

    console.log("Authorization header:", authHeader);
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No token provided");

      return res.status(401).json({
        message: "Unauthorized - No Token Provided",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("✅ Token received:", !!token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(
      decoded.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;

    console.log("✅ Authenticated user:", user.email);
    console.log("================================");

    next();

  } catch (error) {
    console.log("❌ Auth error:", error.message);

    return res.status(401).json({
      message: "Unauthorized - Invalid Token",
    });
  }
};