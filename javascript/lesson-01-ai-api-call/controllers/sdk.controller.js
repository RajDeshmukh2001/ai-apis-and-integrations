import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });

export const callModel = async (req, res) => {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "message is required" });
    }

    try {
        const response = await client.interactions.create({
            model: "gemini-3.1-flash-lite",
            input: message,
            system_instruction: "You are a helpful assistant for a developer learning platform.",
            generation_config: {
                temperature: 0.7,
                max_output_tokens: 1000
            }
        });

        res.json({ output: response.output_text, response: response });
    } catch (error) {
        console.error("Claude API error:", error);
        res.status(500).json({ error: "Failed to get AI response" });
    }
};