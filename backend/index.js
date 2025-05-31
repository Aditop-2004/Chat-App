import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({});

import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";

import connectDB from "./config/database.js";

const app = express();

const PORT = process.env.PORT || 8080;

// app.post("/login", (req, res) => {
//    res.send("Login");
// });//ham aise bhi routes bana ke business logic likh sakte hai isliye ham alag alag folders banate hai =>controllers,routes

//middleware must for parsing json data in req.body when doing post request
app.use(express.json());
app.use(cookieParser()); // needed to parse cookies
//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
