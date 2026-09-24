import { db } from "../database/db.js"

export const getOrderStatus = async (orderId: string) => {
    const result = await db.query(`
        SELECT id, status, carrier, estimated_delivery, total_amount 
        FROM orders
        WHERE id = $1`,
        [orderId]
    );

    if (result.rows.length === 0) {
        return { error: `No order found with ID ${orderId}` }
    }

    return result.rows[0];
};

export const listCustomerOrders = async (customerId: string) => {
    const result = await db.query(`
        SELECT id, status, total_amount, created_at
        FROM orders
        WHERE customer_id = $1
        ORDER BY created_at DESC`,
        [customerId]
    );

    return { orders: result.rows };
};