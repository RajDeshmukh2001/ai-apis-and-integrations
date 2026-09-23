/*
    Lesson 03: Tool Calling 
    Create table command
*/
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(20) PRIMARY KEY,
    customer_id VARCHAR(20) NOT NULL,
    status VARCHAR(30) NOT NULL,
    carrier VARCHAR(50),
    estimated_delivery DATE,
    total_amount DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW()
);