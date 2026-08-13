import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  console.log("========== JWT DEBUG ==========");
  console.log("JWT generated:", !!token);
  console.log(
    "JWT_SECRET exists:",
    !!process.env.JWT_SECRET
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  console.log("JWT cookie set");
  console.log("===============================");

  return token;
};