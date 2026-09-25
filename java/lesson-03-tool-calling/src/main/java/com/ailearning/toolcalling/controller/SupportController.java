package com.ailearning.toolcalling.controller;

import com.ailearning.toolcalling.service.SupportAgentService;
import com.google.genai.gaos.models.interactions.Interaction;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class SupportController {
    private final SupportAgentService supportAgentService;

    public SupportController(SupportAgentService supportAgentService) {
        this.supportAgentService = supportAgentService;
    }

    @PostMapping("/support")
    public Map<String, String> support(@RequestBody Map<String, String> request) {
        String input = request.get("input");

        String response = supportAgentService.runAgent(input);

        return Map.of("response", response);
    }
}
