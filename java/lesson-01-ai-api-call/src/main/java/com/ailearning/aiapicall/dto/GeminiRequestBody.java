package com.ailearning.aiapicall.dto;

public record GeminiRequestBody(
        String model,
        String input,
        String system_instruction
) {
}
