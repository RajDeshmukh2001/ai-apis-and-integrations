import express from "express";
import cors from "cors";
import "dotenv/config";

import chatRouter from "./routes/chat.route.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Streaming Response");
});

app.use("/api", chatRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));