import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });

export const chat = async (req, res) => {
    const { input } = req.body;

    if (!input || typeof input !== "string") {
        return res.status(400).json({ error: "input is required" });
    }

    // Set headers for Server-Sent Events
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    try {
        const stream = await client.interactions.create({
            model: "gemini-3.5-flash-lite",
            input,
            system_instruction: "You are a helpful assistant for a developer learning platform.",
            generation_config: {
                temperature: 0.7,
                max_output_tokens: 1000
            },
            stream: true
        });

        for await (const event of stream) {
            if (event.event_type === "step.delta") {
                if (event.delta.type === "text") {
                    res.write(`data: ${JSON.stringify(event.delta.text)}\n\n`);
                }
            }
        }
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
    } catch (error) {
        console.error("Gemini API error:", error);
        res.write(`data:${JSON.stringify({ error: 'Failed to start' })}\n\n`);
        res.end();
    }
}