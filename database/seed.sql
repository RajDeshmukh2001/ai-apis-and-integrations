/*
    Lesson 03: Tool Calling 
    Insert data command
*/INSERT INTO orders
(id, customer_id, status, carrier, estimated_delivery, total_amount, created_at)
VALUES
('ORD4521', 'CUST9921', 'OUT_FOR_DELIVERY', 'Delhivery', '2026-08-23', 2499.00, '2026-08-20'),
('ORD4522', 'CUST9921', 'DELIVERED', 'BlueDart', '2026-08-18', 899.00, '2026-08-15');