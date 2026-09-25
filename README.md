# AI APIs and Integrations

Hands-on implementations of AI API integrations using Node.js/Express and Java/Spring Boot.

## Tech Stack

- Node.js (24)
- Java (21)
- Express.js
- Spring Boot
- React.js
- TypeScript
- PostgreSQL (18)
- Google Gen AI SDK
- Vercel AI SDK

---

## Lessons

### Lesson 1 — AI API Call

**Two Ways to Call an AI API**

Every provider gives two options:
```
Option 1: Official SDK
  → Provider-maintained library, handles auth headers,
    retries, types, streaming helpers
  → Recommended for most cases

Option 2: Raw HTTP calls (fetch / RestTemplate / WebClient)
  → You build the request yourself
  → More control, no extra dependency, but more boilerplate
  → Useful for understanding what's actually happening,
    or when a language doesn't have a good SDK yet
```

| Stack | Implementation |
|---|---|
| Javascript | `javascript/lesson-01-ai-api-call` |
| Java | `java/lesson-01-ai-api-call` |

---

### Lesson 2 — Streaming Responses

Model generates tokens one at a time, sequentially. The full response already exists token-by-token internally as it's being generated. Without streaming, server waits for ALL of it before sending anything to the browser.

```
WITHOUT STREAMING:

Time:  0s ────────────────────────── 4s
       │                              │
User sees: [blank/spinner............][FULL RESPONSE APPEARS]
                                       ↑
                            User waited 4 seconds staring at nothing


WITH STREAMING:

Time:  0s ── 0.3s ── 0.6s ── 0.9s ──... 4s
       │      │       │       │         │
User sees: [The] [The quick] [The quick brown] ... [full text]
              ↑
     First tokens appear in 300ms — feels instant
```

Streaming doesn't make the model faster. The total generation time is the same. What changes is when the user starts seeing something — and perceived speed matters more for user experience than actual speed.

#### How Streaming Works Under the Hood ?

Streaming uses a technique called **Server-Sent Events (SSE)** — a standard HTTP feature where the server keeps the connection open and pushes small **chunks** of data as they become available, instead of closing the connection after one response.

Each **chunk** is a small piece of the response — often just one or a few tokens — sent the moment it's generated, without waiting for the rest.

| Stack | Implementation |
|---|---|
| Javascript | `javascript/lesson-02-streaming-response` |
| Java | `java/lesson-02-streaming-response` 

---

### Lesson 3 — Function/Tool Calling

Tool calling is a loop:
```
1. Define tools (JSON schema description of your functions)
2. Send user message + tools to the model
3. Model responds — either plain text, or a request to call a tool
4. If tool call requested: execute your REAL function (query DB, call API)
5. Send the tool's result back to the model
6. Model generates the final answer using that real data
7. Return final answer to the user
```

| Stack | Implementation |
|---|---|
| Javascript | `javascript/lesson-03-tool-calling` |
| Java | `java/lesson-03-tool-calling` |