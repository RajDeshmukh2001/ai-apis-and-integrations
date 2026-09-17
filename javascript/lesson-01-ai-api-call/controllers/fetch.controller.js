export const fetchModel = async (req, res) => {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "message is required" });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/interactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": process.env.GOOGLE_AI_API_KEY
            },
            body: JSON.stringify({
                model: "gemini-3.1-flash-lite",
                input: message,
                system_instruction: "You are a helpful assistant for a developer learning platform.",
                generation_config: {
                    temperature: 0.7,
                    max_output_tokens: 1000
                }
            })
        });

        if (!response.ok) {
            const error = await response.text();
            return res.status(response.status).json({ error: `Gemini API error: ${error}` });
        }

        const data = await response.json();
        return res.status(200).json({ output: data.output_text, response: data });
    } catch (error) {
        res.status(500).json({ error: `Failed to get AI response: ${error}` });
    }
}