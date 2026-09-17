package com.ailearning.aiapicall.controller;

import com.ailearning.aiapicall.dto.ChatRequest;
import com.ailearning.aiapicall.dto.ChatResponse;
import com.ailearning.aiapicall.service.SDKChatService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sdk")
public class SDKChatController {
    private final SDKChatService sdkChatService;

    public SDKChatController(SDKChatService sdkChatService) {
        this.sdkChatService = sdkChatService;
    }

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {
        if (request.input() == null || request.input().isBlank()) {
            throw new IllegalArgumentException("Input is required");
        }

        return sdkChatService.generate(request);
    }
}
