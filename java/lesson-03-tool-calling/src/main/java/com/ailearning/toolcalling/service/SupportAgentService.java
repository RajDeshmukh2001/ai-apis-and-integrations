package com.ailearning.toolcalling.service;

import com.ailearning.toolcalling.tools.OrderTools;
import com.google.genai.Client;
import com.google.genai.gaos.models.interactions.*;
import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SupportAgentService {
    private final Client client;
    private final OrderService orderService;

    public SupportAgentService(Client client, OrderService orderService) {
        this.client = client;
        this.orderService = orderService;
    }

    public String runAgent(String input) {
        CreateModelInteraction params = CreateModelInteraction.builder()
                .model(Model.of("gemini-3.5-flash-lite"))
                .input(InteractionsInput.of(input))
                .tools(List.of(OrderTools.GET_ORDER_STATUS))
                .build();

        Interaction interaction = client.interactions
                .create(CreateInteractionRequestBody.of(params))
                .interaction()
                .orElseThrow();

        FunctionCallStep functionCall = null;

        if (interaction.steps().isPresent()) {
            for (Step step : interaction.steps().get()) {

                if (step instanceof FunctionCallStep fcStep) {
                    functionCall = fcStep;
                    break;
                }
            }
        }

        if (functionCall == null) {
            return interaction.outputText().orElse("");
        }

        String orderId = (String) functionCall
                .arguments()
                .orElseThrow()
                .get("order_id");

        Map<String, Object> result =
                orderService.getOrderStatus(orderId);

        String resultJson = result.toString();

        FunctionResultStep resultStep =
                FunctionResultStep.builder()
                        .name(functionCall.name().orElse(""))
                        .callId(functionCall.id().orElse(""))
                        .result(
                                FunctionResultStepResultUnion.of(
                                        List.<FunctionResultSubcontent>of(
                                                TextContent.builder()
                                                        .text(resultJson)
                                                        .build()
                                        )
                                )
                        )
                        .build();

        CreateModelInteraction finalParams =
                CreateModelInteraction.builder()
                        .model(Model.of("gemini-3.5-flash-lite"))
                        .previousInteractionId(
                                interaction.id().orElse("")
                        )
                        .tools(
                                List.of(
                                        OrderTools.GET_ORDER_STATUS
                                )
                        )
                        .input(
                                InteractionsInput.ofStep(
                                        List.<Step>of(resultStep)
                                )
                        )
                        .build();

        Interaction finalInteraction =
                client.interactions
                        .create(
                                CreateInteractionRequestBody.of(finalParams)
                        )
                        .interaction()
                        .orElseThrow();

        System.out.println(finalInteraction);

        return finalInteraction.outputText().orElse("");
    }
}
