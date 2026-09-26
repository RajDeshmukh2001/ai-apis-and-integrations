import express from "express";
import { classifyTicket } from "../controllers/classifyTicket.controller.js";

const router = express.Router();

router.post("/chat", classifyTicket);

export default router;