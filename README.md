# AI APIs and Integrations

Hands-on implementations of AI API integrations using Node.js/Express and Java/Spring Boot.

## Stacks

- Node.js / Express
- Java / Spring Boot

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
| Node.js / Express | `node-express/lesson-01-ai-api-call` |
| Spring Boot | `spring-boot/lesson-01-ai-api-call` |