package com.ailearning.aiapicall.dto;

import java.util.List;

public record GeminiResponse(
        List<GeminiStep> steps
) {
    public record GeminiStep(
            String type,
            List<GeminiContent> content
    ) {
        public record GeminiContent(
                String type,
                String text
        ) {

        }
    }
}
