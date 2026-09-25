package com.ailearning.toolcalling.tools;

import com.google.genai.gaos.models.interactions.Function;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OrderTools {
    public static final Function GET_ORDER_STATUS = createGetOrderStatus();

    private static Function createGetOrderStatus() {
        Map<String, Object> orderIdProp = new HashMap<>();
        orderIdProp.put("type", "string");
        orderIdProp.put("description", "The order ID, format ORD followed by numbers, e.g. ORD4521");

        Map<String, Object> properties = new HashMap<>();
        properties.put("order_id", orderIdProp);

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("type", "object");
        parameters.put("properties", properties);
        parameters.put("required", List.of("order_id"));

        return Function.builder()
                .name("get_order_status")
                .description("Get the current status, carrier, and estimated delivery date for a specific order.")
                .parameters(parameters)
                .build();
    }
}
