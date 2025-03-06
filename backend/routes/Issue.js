import express from "express";
import { createIssue } from "../controllers/issueController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); 

router.post("/", authenticateUser, upload.single("attachment"), createIssue);

export default router;
