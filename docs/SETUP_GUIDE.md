# Setup Guide

## Recommended Stack

- TypeScript
- Node.js
- SQLite
- MCP TypeScript SDK
- Next.js for UI
- Simple backend route handlers first
- OAuth provider SDKs/APIs directly

## Cheapest Setup

Start with:

- local Mac runtime
- SQLite
- no cloud hosting
- no paid vector database
- no paid workflow automation tools
- cheap runtime LLM API
- mocked connectors first

## Phase 1 Setup

1. Create repo.
2. Add `/docs`.
3. Initialize TypeScript.
4. Add SQLite.
5. Create schema.
6. Add fake seed data.
7. Build query layer.
8. Build MCP tools against fake data.

## Phase 2 Setup

1. Add model provider abstraction.
2. Add one runtime LLM provider.
3. Add tool-calling loop.
4. Connect model to MCP tools.
5. Test daily briefing using fake data.

## Phase 3 Setup

1. Create Google Cloud project.
2. Configure OAuth consent.
3. Add calendar readonly scope.
4. Implement Google connector.
5. Store tokens locally.
6. Sync events.

## Phase 4 Setup

1. Create Microsoft Azure app registration.
2. Add Microsoft Graph scopes.
3. Implement Outlook connector.
4. Sync calendar events.
5. Sync recent mail summaries.

## Phase 5 Setup

1. Check D2L/Brightspace API access.
2. Try official API.
3. If blocked, use ICS/export fallback.
4. Normalize deadlines into local DB.

## Rule

Do not start with OAuth.

Start with fake data and prove the local agent/MCP flow first.
