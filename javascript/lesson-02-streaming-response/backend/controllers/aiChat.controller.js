import { google } from "@ai-sdk/google";
import {
    convertToModelMessages,
    streamText,
} from "ai";

export const aiChat = async (req, res) => {
    const { messages } = req.body;

    const result = streamText({
        model: google("gemini-3.5-flash-lite"),
        messages: await convertToModelMessages(messages)
    });

    result.pipeUIMessageStreamToResponse(res);
};