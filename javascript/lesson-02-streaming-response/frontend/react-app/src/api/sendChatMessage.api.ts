export const sendChatMessage = async (
    input: string,
    signal: AbortSignal
): Promise<Response> => {
    const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ input }),
        signal
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
}