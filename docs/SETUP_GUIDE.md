# Setup Guide

Canonical phase plan: `docs/PHASE_PLAN.md`

## Recommended Stack

- TypeScript
- Node.js
- Supabase (Postgres + pgvector)
- MCP TypeScript SDK
- Next.js for UI
- Simple backend route handlers first
- OAuth provider SDKs/APIs directly

## Cheapest Setup

Start with:

- local Mac runtime
- Supabase free tier
- no cloud hosting for app server
- cheap runtime LLM API
- mocked connectors first

## Phase 1 Setup

1. Create repo.
2. Add `/docs`.
3. Initialize TypeScript.
4. Create Supabase project.
5. Enable `pgvector`.
6. Add schema migrations.
7. Add fake seed data.
8. Build query layer.
9. Build MCP tools against fake data.

## Phase 2 Setup

1. Add model provider abstraction.
2. Add one runtime LLM provider.
3. Add tool-calling loop.
4. Connect model to MCP tools.
5. Add hybrid retrieval path.
6. Test daily briefing using fake data.

## Phase 3 Setup

1. Add `/files` indexing pipeline.
2. Add chunking + embeddings.
3. Add semantic retrieval tool.
4. Validate source citations from file chunks.

## Phase 4 Setup

1. Create Google Cloud project.
2. Configure OAuth consent.
3. Add calendar readonly scope.
4. Implement Google connector.
5. Store tokens locally.
6. Sync events.

## Phase 5 Setup

1. Create Microsoft Azure app registration.
2. Add Microsoft Graph scopes.
3. Implement Outlook connector.
4. Sync calendar events.
5. Sync recent mail summaries.

## Phase 6 Setup

1. Check D2L/Brightspace API access.
2. Try official API.
3. If blocked, use ICS/export fallback.
4. Normalize deadlines into canonical tables.

## Rule

Do not start with OAuth.

Start with fake data and prove the retrieval + MCP flow first.
