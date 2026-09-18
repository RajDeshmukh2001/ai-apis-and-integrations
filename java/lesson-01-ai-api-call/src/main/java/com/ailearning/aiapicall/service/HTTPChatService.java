package com.ailearning.aiapicall.service;

import com.ailearning.aiapicall.dto.ChatRequest;
import com.ailearning.aiapicall.dto.ChatResponse;
import com.ailearning.aiapicall.dto.GeminiRequestBody;
import com.ailearning.aiapicall.dto.GeminiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class HTTPChatService {
    private final RestClient restClient;

    @Value("${google.ai.api-key}")
    private String apiKey;

    public HTTPChatService() {
        this.restClient = RestClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com")
                .build();
    }

    private String extractOutputText(GeminiResponse response) {
        return response.steps()
                .stream()
                .filter(step -> "model_output".equals(step.type()))
                .flatMap(step -> step.content().stream())
                .filter(content -> "text".equals(content.type()))
                .map(GeminiResponse.GeminiStep.GeminiContent::text)
                .findFirst()
                .orElse("");
    }

    public ChatResponse generate(ChatRequest request) {
        GeminiRequestBody requestBody = new GeminiRequestBody(
                "gemini-3.1-flash-lite",
                request.input(),
                "You are a helpful assistant for a developer learning platform."
        );

        GeminiResponse response = restClient.post()
                .uri("/v1beta/interactions")
                .header("x-goog-api-key", apiKey)
                .header("Content-Type", "application/json")
                .body(requestBody)
                .retrieve()
                .body(GeminiResponse.class);

        return new ChatResponse(extractOutputText(response));
    }
}
