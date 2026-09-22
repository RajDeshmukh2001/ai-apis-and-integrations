package com.ailearning.streamingresponse.controller;

import com.ailearning.streamingresponse.dto.ChatRequest;
import com.ailearning.streamingresponse.service.GeminiStreamingService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api")
public class StreamingController {

    private final GeminiStreamingService geminiStreamingService;

    public StreamingController(GeminiStreamingService geminiStreamingService) {
        this.geminiStreamingService = geminiStreamingService;
    }

    @PostMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> stream(@RequestBody ChatRequest request) {
        return geminiStreamingService.stream(request.input());
    }
}
