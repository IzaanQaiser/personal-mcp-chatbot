# Roadmap

Canonical phase plan: `docs/PHASE_PLAN.md`

## Phase 0: Repo + Docs

- create `/docs`
- add all architecture docs
- setup coding rules
- decide initial stack

## Phase 1: Supabase Core

- TypeScript project
- Supabase project
- Postgres schema
- `pgvector` enablement
- fake seed data
- query layer
- basic MCP tools

## Phase 2: Runtime Chatbot

- chat API
- model provider abstraction
- cheap cloud model provider
- tool calling
- structured + vector retrieval

## Phase 3: Files Knowledge Base

- `/files` recursive indexing
- chunking + embeddings
- semantic file search tool
- reindex pipeline

## Phase 4: Google Calendar

- Google OAuth
- calendar sync
- event normalization
- sync status

## Phase 5: Outlook

- Microsoft OAuth
- calendar sync
- mail summary sync
- sync status

## Phase 6: D2L

- investigate official API access
- implement API connector if available
- otherwise implement ICS/import fallback

## Phase 7: Briefings + Notifications

- daily briefing
- weekly briefing
- conflict alerts
- stale sync alerts

## Phase 8: Memory

- session memory
- user preferences
- editable long-term memory
- memory embeddings

## Phase 9: Reliability + Hardening

- RLS policy audit
- retry/backoff tuning
- sync observability
- backup/restore playbook

## Phase 10: Desktop/Mobile

- desktop app
- menu bar app
- mobile push notifications

## Phase 11: Cowork-Style Workflows

- proactive workflows
- cross-app orchestration
- confirmed write actions
- background agents
