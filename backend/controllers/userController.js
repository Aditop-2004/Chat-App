import User from "../models/userModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password do not match",
        success: false,
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        message: "Username already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilephoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log("kuch to garbad hai daya");
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    if (user) {
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true, //cookie only accessible by server
          sameSite: "strict", //cookie only accessible by same site
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ message: "User logged in successfully", success: true, user });
    }
  } catch (error) {
    console.log("kuch to garbad hai daya");
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.log("kuch to garbad hai daya");
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const loggedinUser = req.user;
    const otherUsers = await User.find({
      _id: { $ne: loggedinUser._id },
    }).select("-password"); //select all fields except password
    return res.status(200).json({
      message: "Other Users fetched successfully",
      success: true,
      otherUsers,
    });
  } catch (error) {
    console.log("kuch to garbad hai daya");
    return res.status(500).json({ message: error.message, success: false });
  }
};
