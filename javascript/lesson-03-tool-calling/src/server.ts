import express from "express";
import "dotenv/config";
import { runSupportAgent } from "./services/supportAgent.service.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/api/support", async (req, res) => {
    const { input } = req.body;

    const interaction = await runSupportAgent(input);

    console.log(JSON.stringify(interaction, null, 2));

    res.json({
        response: interaction.output_text
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));