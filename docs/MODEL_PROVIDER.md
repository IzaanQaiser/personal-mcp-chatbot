# Model Provider Layer

## Purpose

The runtime chatbot should use a separate LLM provider.

Codex/Cursor are only used to build the app.

## Supported Providers

Cloud:

- OpenAI
- Anthropic
- Google Gemini

Local:

- Ollama

## Provider Interface

```ts
export interface ModelProvider {
  generateResponse(input: ChatInput): Promise<ChatResponse>;
}
```

## ChatInput

```ts
export type ChatInput = {
  messages: ChatMessage[];
  tools: ToolDefinition[];
  context?: RetrievedContext[];
  systemPrompt: string;
};
```

## ChatResponse

```ts
export type ChatResponse = {
  text: string;
  toolCalls?: ToolCall[];
  sources?: SourceReference[];
  usage?: TokenUsage;
};
```

## Rules

- Never hardcode provider-specific logic into app business logic.
- Keep provider clients isolated.
- Runtime model must be swappable.
- Tool schemas must be provider-agnostic.
- The app should work with a cheap cloud model first.
- Ollama/local support can come later.

## MVP Recommendation

Use Gemini Flash or a cheap OpenAI model for MVP.

Reason:

- low cost
- decent tool calling
- easier setup than fully local models
