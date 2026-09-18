package com.ailearning.aiapicall.service;

import com.ailearning.aiapicall.dto.ChatRequest;
import com.ailearning.aiapicall.dto.ChatResponse;
import com.google.genai.Client;
import com.google.genai.gaos.models.interactions.*;
import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
import org.springframework.stereotype.Service;

@Service
public class SDKChatService {
    private final Client client;

    public SDKChatService(Client client) {
        this.client = client;
    }

    public ChatResponse generate(ChatRequest request) {
        CreateModelInteraction params = CreateModelInteraction.builder()
                .model("gemini-3.1-flash-lite")
                .input(InteractionsInput.of(request.input()))
                .systemInstruction("You are a helpful assistant for a developer learning platform.")
                .generationConfig(
                        GenerationConfig.builder()
                                .maxOutputTokens(1000)
                                .build()
                )
                .build();

        Interaction interaction = client.interactions
                .create(CreateInteractionRequestBody.of(params))
                .interaction()
                .get();

        return new ChatResponse(
                interaction.outputText().orElse("")
        );
    }
}
