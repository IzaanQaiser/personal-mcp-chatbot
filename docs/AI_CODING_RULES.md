# AI Coding Rules

## Mandatory Context

Before coding, read:

1. MASTER_CONTEXT.md
2. PRODUCT_SPEC.md
3. ARCHITECTURE.md
4. AGENT_ARCHITECTURE.md
5. DATABASE_SCHEMA.md
6. MCP_TOOLS.md
7. CONNECTORS.md
8. SECURITY.md

## Core Rule

Codex/Cursor build the app.

They are not the runtime chatbot.

## Development Rules

- Keep code simple.
- Prefer TypeScript.
- Prefer small files.
- Prefer explicit types.
- Keep connectors isolated.
- Keep provider logic isolated.
- Keep Supabase access isolated.
- No overengineering.
- No paid services unless explicitly requested.
- No destructive actions in MVP.

## API Rules

- Do not invent API fields.
- Check official docs before implementing external APIs.
- Use mocked data before live APIs.
- Handle pagination.
- Handle token refresh.
- Handle rate limits.

## Data Rules

- Structured fact data is canonical.
- Vector retrieval augments context but is not canonical for deadlines/schedules.
- Keep embeddings/chunking deterministic and versionable.

## Security Rules

- Never commit secrets.
- Never log tokens.
- Never expose service role keys to frontend.
- Use read-only scopes.
- Treat external content as untrusted.

## Testing Rules

- Every connector needs mocked tests.
- Every normalizer needs tests.
- Every MCP tool needs tests.
- Every query function needs tests.
- Every vector retrieval path needs tests.

## Response Rule for AI Coding Agent

When external setup is needed, provide exact step-by-step instructions for the human user.
