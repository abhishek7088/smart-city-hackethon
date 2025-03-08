import express from "express";
import { connectDB } from "./config/database.js"; 
import authRoute from "./routes/Auth.js";
import issueRoute from "./routes/Issue.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { cloudinaryConnect } from "./config/cloudinary.js";
import fileUpload  from "express-fileupload";
import OpenAI from "openai";



import dotenv from "dotenv";
dotenv.config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

connectDB();
cloudinaryConnect();

const PORT = process.env.PORT || 4000; 

const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));


app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)


app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/issues",issueRoute);
app.post("/chat", async (req, res) => {
  const { message, userId } = req.body;

  let botResponse = "I'm here to help with smart city issues!";

  if (message.toLowerCase().includes("report issue")) {
    botResponse = "Please provide the issue category (e.g., Road Damage, Water Leakage, etc.).";
  } 
  else if (message.toLowerCase().includes("check status")) {
    const issue = await Issue.findOne({ user: userId }).sort({ date: -1 });
    botResponse = issue ? `Your latest issue is: ${issue.category} - Status: ${issue.status}` : "No issues found.";
  } 
  else {
    // Use OpenAI GPT for general responses
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    botResponse = aiResponse.choices[0].message.content;
  }

  res.json({ reply: botResponse });
});


app.get("/", (req, res) => {
  res.send("SERVER RUNNING");
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:4000");
});
