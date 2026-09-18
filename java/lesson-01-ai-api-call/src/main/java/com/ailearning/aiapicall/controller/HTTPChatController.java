package com.ailearning.aiapicall.controller;

import com.ailearning.aiapicall.dto.ChatRequest;
import com.ailearning.aiapicall.dto.ChatResponse;
import com.ailearning.aiapicall.service.HTTPChatService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/http")
public class HTTPChatController {
    private final HTTPChatService chatService;

    public HTTPChatController(HTTPChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {
        if (request.input() == null || request.input().isBlank()) {
            throw new IllegalArgumentException("Input is required");
        }

        return chatService.generate(request);
    }
}
