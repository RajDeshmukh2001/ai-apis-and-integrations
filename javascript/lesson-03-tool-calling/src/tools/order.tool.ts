export const orderStatusTool = {
    type: "function",
    name: "get_order_status",
    description: "Get the current status, carrier, and estimated delivery date for a specific order.",
    parameters: {
        type: "object",
        properties: {
            order_id: {
                type: "string",
                description: "The order ID, format ORD followed by numbers, e.g. ORD4521"
            }
        },
        required: ["order_id"]
    }
} as const;

export const customerOrdersTool = {
    type: "function",
    name: "list_customer_orders",
    description: "List all orders for a specific customer.",
    parameters: {
        type: "object",
        properties: {
            customer_id: {
                type: "string",
                description: "The customer's unique ID, e.g. CUST5432"
            }
        },
        required: ["customer_id"]
    }
} as const;