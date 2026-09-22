package com.ailearning.streamingresponse.config;

import com.google.genai.Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelConfig {

    @Bean
    public Client geminiClient(@Value("${google.ai.api-key}") String apiKey) {
        return Client.builder()
                .apiKey(apiKey)
                .build();
    }
}
