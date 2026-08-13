import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  console.log("JWT generated:", !!token);

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  console.log("JWT cookie set");

  return token;
};