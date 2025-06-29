import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilephoto: { type: String, default: "" },
  gender: { type: String, enum: ["male", "female"], required: true },
});

export default mongoose.model("User", userModel);
