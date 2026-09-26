import express from "express";
import "dotenv/config";

import classifyTicketRoute from "./routes/classifyTicket.route.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api", classifyTicketRoute);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));