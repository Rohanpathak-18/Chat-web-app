export const sanitizeProfilePicture = (profilePicture = "") => {
  if (!profilePicture || typeof profilePicture !== "string") {
    return "";
  }

  // Old records may still contain raw base64 image data.
  if (profilePicture.startsWith("data:image")) {
    return "";
  }

  return profilePicture.trim();
};

export const serializeUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  profilePicture: sanitizeProfilePicture(user.profilePicture),
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
