# Stack Decisions

## Status

Locked for MVP implementation.

Last updated: 2026-05-22.

## Core Runtime

- Language: TypeScript
- Runtime: Node.js (local development)
- Package manager: npm or pnpm
- Web app framework: Next.js

## Data Platform

- Primary database: Supabase Postgres
- Vector storage: Supabase `pgvector`
- Migration strategy: SQL migrations committed in repo
- Canonical fact storage: structured Postgres tables
- Semantic retrieval: vector similarity over chunked content

## AI Layer

- Runtime chatbot: provider-agnostic interface
- Initial provider: cheap cloud provider with tool calling
- Supported targets: OpenAI, Anthropic, Gemini, Ollama (later)
- Embeddings: provider-backed embeddings, stored in `pgvector`

## Integration Layer

- Protocol: MCP for tool/resource exposure
- Connectors (MVP): Google Calendar, Outlook Calendar/Mail, D2L
- Files knowledge base: local repo `/files` indexed into chunks + vectors

## Security Baseline

- Read-only first
- No destructive actions in MVP
- OAuth scopes minimized
- Secrets in `.env` and secure storage only
- `SUPABASE_SERVICE_ROLE_KEY` backend-only
- RLS enabled and audited

## Non-Goals for MVP

- autonomous write actions
- public MCP exposure
- multi-user accounts
