import express from "express";
import { aiChat } from "../controllers/aiChat.controller.js";

const router = express.Router();

router.post("/aichat", aiChat);

export default router;