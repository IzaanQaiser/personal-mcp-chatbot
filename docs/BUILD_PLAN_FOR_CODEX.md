# Build Plan for Codex

Canonical phase plan: `docs/PHASE_PLAN.md`

## Instruction

Codex should build the app in phases.

Do not jump directly to OAuth.

## Phase 1

Build the core data platform:

- Supabase project setup
- Postgres schema migrations
- `pgvector` setup
- seed data
- query functions
- MCP server
- MCP tools
- tests

## Phase 2

Build runtime chatbot:

- model provider interface
- one provider implementation
- tool-calling loop
- hybrid retrieval (structured + vector)
- chat endpoint
- minimal UI

## Phase 3

Build files indexing:

- `/files` scanner
- chunking pipeline
- embedding pipeline
- semantic retrieval tool
- reindex command + tests

## Phase 4

Build Google connector:

- OAuth setup instructions
- token storage
- calendar sync
- tests

## Phase 5

Build Outlook connector:

- OAuth setup instructions
- calendar sync
- mail summary sync
- tests

## Phase 6

Build D2L connector:

- API investigation helper
- official API connector if possible
- ICS fallback
- tests

## Phase 7

Build briefings:

- daily briefing
- weekly briefing
- conflict detection
- stale sync warnings

## Phase 8

Build notifications:

- local notifications
- configurable quiet hours
- sync failure alerts
