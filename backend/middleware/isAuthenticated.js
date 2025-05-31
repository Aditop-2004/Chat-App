import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  req.id = decoded.id;
  req.user = user;
  next();
};

export default isAuthenticated;
