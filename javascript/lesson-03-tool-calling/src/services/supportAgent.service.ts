import { GoogleGenAI } from "@google/genai";
import { customerOrdersTool, orderStatusTool } from "../tools/order.tool.js";
import { getOrderStatus, listCustomerOrders } from "./order.service.js";

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
    const interaction = await client.interactions.create({
        model: "gemini-3.5-flash-lite",
        input,
        system_instruction: SYSTEM_PROMPT,
        tools: [orderStatusTool, customerOrdersTool]
    });

    const step = interaction.steps.find((s) => s.type === "function_call");

    if (step?.type === "function_call") {
        let result;
        
        if (step.name === "get_order_status") {
            result = await getOrderStatus(step.arguments.order_id);

            console.log("Tool result: ", result);
        }

        if (step.name === "list_customer_orders") {
            result = await listCustomerOrders(step.arguments.customer_id);

            console.log("Tool result: ", result);
        }

        const response = await client.interactions.create({
            model: "gemini-3.5-flash-lite",
            previous_interaction_id: interaction.id,
            input: [
                {
                    type: "function_result",
                    name: step.name,
                    call_id: step.id,
                    result: JSON.stringify(result),
                }
            ]
        });

        return response;
    }

    return interaction;
};