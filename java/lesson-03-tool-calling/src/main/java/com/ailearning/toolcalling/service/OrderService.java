package com.ailearning.toolcalling.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class OrderService {
    private final JdbcTemplate jdbcTemplate;

    public OrderService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Map<String, Object> getOrderStatus(String orderId) {
        String sql = """
                SELECT id, status, carrier, estimated_delivery, total_amount
                FROM orders
                WHERE id = ?
                """;

        return jdbcTemplate.queryForMap(sql, orderId);
    }
}
