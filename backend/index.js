import express from "express";
import { connectDB } from "./config/database.js"; 
import authRoute from "./routes/Auth.js";
import issueRoute from "./routes/Issue.js";
import cors from "cors";
import cookieParser from "cookie-parser";



import dotenv from "dotenv";
dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 4000; 

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
}))

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/issue",issueRoute);


app.get("/", (req, res) => {
  res.send("SERVER RUNNING");
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:4000");
});
