import express from "express";
import { callModel } from "../controllers/sdk.controller.js";

const router = express.Router();

router.post("/chat", callModel);

export default router;