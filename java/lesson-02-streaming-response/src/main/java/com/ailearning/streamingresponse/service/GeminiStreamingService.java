package com.ailearning.streamingresponse.service;

import com.google.genai.Client;
import com.google.genai.gaos.models.interactions.*;
import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
import com.google.genai.gaos.models.operations.CreateInteractionResponse;
import com.google.genai.gaos.utils.EventStream;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

@Service
public class GeminiStreamingService {
    private final Client client;

    public GeminiStreamingService(Client client) {
        this.client = client;
    }

    public Flux<String> stream(String input) {
        return Flux.<String>create(sink -> {

            CreateModelInteraction params = CreateModelInteraction.builder()
                    .model(Model.of("gemini-3.5-flash-lite"))
                    .input(InteractionsInput.of(input))
                    .stream(true)
                    .build();

            CreateInteractionResponse response = client.interactions.create(
                    CreateInteractionRequestBody.of(params)
            );

            try (EventStream<InteractionSSEStreamEvent> events = response.events()) {
                for (InteractionSSEStreamEvent streamEvent : events) {
                    InteractionSSEEvent event = streamEvent.data().orElse(null);

                    if (event instanceof StepDelta stepDelta) {
                        StepDeltaData delta = stepDelta.delta().orElse(null);

                        if (delta instanceof TextDelta textDelta) {
                            textDelta.text().ifPresent(sink::next);
                        }
                    }
                }

                sink.complete();
            } catch (Exception exception) {
                sink.error(exception);
            }
        }).subscribeOn(Schedulers.boundedElastic());
    }
}
