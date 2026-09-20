import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import React, { useState } from "react";

const AIStreamingChat = (): React.JSX.Element => {
    const [input, setInput] = useState<string>("");
    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: "http://localhost:3000/api/aichat"
        })
    });
    console.log(messages);

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault();
        sendMessage({ text: input.trim() });
        setInput("");
    }

    return (
        <div className="flex flex-col">
            <div className="space-y-6 whitespace-pre-wrap text-justify">
                {messages.map((message) => (
                    <div key={message.id}>
                        {message.parts.map((part, index) => {
                            if (part.type === "text") {
                                return (
                                    <div key={`${message.id}-${index}`} className={`${message.role === "user" ? "p-4 bg-stone-900 rounded-lg" : ""}`}>
                                        {part.text}
                                    </div>
                                )
                            }
                        })}
                    </div>
                ))}
            </div>

            <form method="post" onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <textarea
                    id="input"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask something..."
                    className="w-full border rounded p-2 text-base"
                />

                <button
                    className="w-fit bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 self-end cursor-pointer"
                >
                    {status === "streaming" ? "Generating..." : "Send"}
                </button>
            </form>
        </div>
    )
}

export default AIStreamingChat;