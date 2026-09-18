package com.ailearning.aiapicall.dto;

public record GeminiRequestBody(
        String model,
        String input,
        String system_instruction,
        GenerationConfig generation_config
) {
    public record GenerationConfig(
            Float temperature,
            Integer max_output_tokens
    ) {

    }
}
