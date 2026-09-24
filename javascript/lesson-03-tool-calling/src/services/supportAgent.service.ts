import { GoogleGenAI } from "@google/genai";
import { executeTool } from "./toolDispatcher.service.js";
import { customerOrdersTool, orderStatusTool } from "../tools/order.tool.js";

const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
    throw new Error("Google Gemini API key is not configured");
}

const client = new GoogleGenAI({ apiKey });

const SYSTEM_PROMPT = `You are a customer support assistant for ShopEasy.
Use the available tools to look up real order information — never guess
or make up order details. If a tool returns an error, tell the customer
clearly and suggest they double-check the order ID.`;

export const runSupportAgent = async (input: string) => {
    let interaction = await client.interactions.create({
        model: "gemini-3.5-flash-lite",
        input,
        system_instruction: SYSTEM_PROMPT,
        tools: [orderStatusTool, customerOrdersTool]
    });

    while (interaction.status === "requires_action") {
        const functionCalls = interaction.steps.filter(
            (step) => step.type === "function_call"
        );

        const toolResults = await Promise.all(
            functionCalls.map(async (step) => ({
                type: "function_result" as const,
                name: step.name,
                call_id: step.id,
                result: JSON.stringify(
                    await executeTool(step.name, step.arguments)
                )
            }))
        );

        interaction = await client.interactions.create({
            model: "gemini-3.5-flash-lite",
            previous_interaction_id: interaction.id,
            input: toolResults,
        });
    }

    return interaction;
};