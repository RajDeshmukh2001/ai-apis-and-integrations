const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const output = document.getElementById("output");

sendBtn.addEventListener("click", async () => {
    const userInput = input.value.trim();

    if (!userInput) {
        return;
    }

    output.textContent = "";

    const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userInput })
    });

    if (!response.ok) {
        output.textContent = "Something went wrong.";
        return
    }

    const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
    
    let buffer = "";

    while(true) {
        const { value, done } = await reader.read();
        console.log(value);

        if (done) {
            break;
        }

        buffer += value;

        const lines = buffer.split("\n\n");
        buffer = lines.pop();

        for (const line of lines) {
            if (line.startsWith("data: ")) {
                const data = line.slice(6);

                const text = JSON.parse(data);

                if (text.done) {
                    return;
                }

                output.textContent += text;
            }
        }
    }
});