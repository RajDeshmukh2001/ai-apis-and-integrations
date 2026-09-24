import { getOrderStatus, listCustomerOrders } from "./order.service.js"

export const executeTool = async (
    toolName: string,
    toolArguments: Record<string, unknown>
) => {
    switch (toolName) {
        case "get_order_status":
            return await getOrderStatus(toolArguments.order_id as string);

        case "list_customer_orders":
            return await listCustomerOrders(toolArguments.customer_id as string);

        default:
            return { error: `Unknown tool:${toolName}` }
    }
};