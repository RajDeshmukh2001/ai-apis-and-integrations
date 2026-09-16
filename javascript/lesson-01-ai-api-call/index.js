import express from "express";
import "dotenv/config";

import sdkRouter from "./routes/sdk.route.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("AI API Call");
});

app.use("/api/sdk", sdkRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));