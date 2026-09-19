import React, { useRef, useState } from "react";
import { readStream } from "../utils/stream.ts";
import { sendChatMessage } from "../api/sendChatMessage.api.ts";
import Markdown from "react-markdown";

const StreamingChat = (): React.JSX.Element => {
    const [input, setInput] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [isStreaming, setIsStreaming] = useState<boolean>(false);

    const abortController = useRef<AbortController | null>(null);

    const handleSubmit = async (): Promise<void> => {
        if (!input.trim()) {
            return;
        }

        setResponse("");
        setIsStreaming(true);

        const controller = new AbortController();
        abortController.current = controller;

        try {
            const apiResponse = await sendChatMessage(input.trim(), controller.signal);

            await readStream(apiResponse, (text) => {
                setResponse((previous) => previous + text);
            })
        } catch (error) {
            console.error(error);
        } finally {
            setIsStreaming(false);
        }
    }

    const handleStop = (): void => {
        abortController.current?.abort();
        setIsStreaming(false);
    }

    return (
        <div>
            <div className="flex flex-col">
                <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="w-full border rounded p-2 text-base"
                    placeholder="Ask something..."
                />

                <div className="mt-2 flex items-center justify-end gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={isStreaming}
                        className="w-fit bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 self-end cursor-pointer"
                    >
                        {isStreaming ? "Generating" : "Send"}
                    </button>

                    {isStreaming &&
                        <button
                            onClick={handleStop}
                            className="w-fit bg-red-600 text-white px-4 py-2 rounded self-end cursor-pointer"
                        >
                            Stop
                        </button>
                    }
                </div>

                <div className="mt-6 whitespace-pre-wrap text-justify">
                    <Markdown>{response}</Markdown>
                    {isStreaming && <span className="animate-pulse">▊</span>}
                </div>
            </div>
        </div>
    )
}

export default StreamingChat;