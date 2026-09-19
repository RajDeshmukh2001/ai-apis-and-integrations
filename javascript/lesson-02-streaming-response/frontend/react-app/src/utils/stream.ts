export const readStream = async (
    response: Response,
    onText: (text: string) => void
): Promise<void> => {
    if (!response.body) {
        return
    }

    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

    let buffer: string = "";

    while (true) {
        const { value, done } = await reader.read();

        if (done) {
            break;
        }

        buffer += value;

        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
            if (!line.startsWith("data: ")) {
                continue;
            }

            const data: unknown = JSON.parse(line.slice(6));

            if (
                typeof data === "object" &&
                data !== null &&
                "done" in data
            ) {
                return;
            }

            if (typeof data === "string") {
                onText(data);
            }
        }
    }
}