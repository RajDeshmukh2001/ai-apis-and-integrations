import express from "express";
import { fetchModel } from "../controllers/fetch.controller.js";

const router = express.Router();

router.post("/chat", fetchModel);

export default router;