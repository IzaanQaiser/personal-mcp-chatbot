# Phase Plan

## Purpose

This is the single execution plan for Life MCP Hub.

It consolidates:

- build sequencing
- roadmap scope
- setup steps

## Execution Rules

- Build in order.
- Do not jump directly to OAuth.
- Start with mocked/fake data before live connectors.
- Keep critical facts (deadlines/schedules) in structured canonical tables.
- Use vector retrieval as augmentation, not source of truth for date-critical answers.

## Phase 0: Repo + Docs

### Build

- create `/docs`
- define architecture and safety rules
- lock stack choices

### Exit Criteria

- core docs exist and are internally consistent

## Phase 1: Supabase Core

### Build

- TypeScript project bootstrap
- Supabase project setup
- Postgres schema migrations
- `pgvector` extension enablement
- seed data
- query layer
- MCP server + basic MCP tools
- foundational tests

### Setup Checklist

1. Initialize TypeScript project.
2. Create Supabase project.
3. Enable `pgvector`.
4. Add schema migrations.
5. Add fake seed data.
6. Build query layer.
7. Build MCP tools against fake data.

### Exit Criteria

- migrations run cleanly
- seeded data can be queried
- MCP tools return grounded structured outputs

## Phase 2: Runtime Chatbot

### Build

- chat API
- model provider abstraction
- one cheap cloud provider implementation
- tool-calling loop
- hybrid retrieval (structured + vector)
- minimal local web UI shell

### Setup Checklist

1. Add model provider abstraction.
2. Implement one provider.
3. Implement tool-calling loop.
4. Connect runtime to MCP tools.
5. Add hybrid retrieval path.
6. test daily briefing with fake data.

### Exit Criteria

- chatbot can answer schedule/deadline questions using tools
- provider can be swapped with minimal code changes

## Phase 3: Files Knowledge Base

### Build

- `/files` recursive scanner
- file hash change detection
- chunking pipeline
- embedding pipeline
- semantic retrieval MCP tool
- reindex command + tests

### Setup Checklist

1. Implement `/files` scan/index flow.
2. Add chunk + embedding storage.
3. Add semantic file search tool.
4. Validate citations include file path/chunk metadata.

### Exit Criteria

- changed files are re-indexed incrementally
- semantic search returns useful chunks with citations

## Phase 4: Google Calendar Connector

### Build

- Google OAuth flow
- read-only calendar sync
- event normalization
- sync status reporting
- connector tests

### Setup Checklist

1. Create Google Cloud project.
2. Configure OAuth consent.
3. Add calendar read-only scope.
4. Implement connector.
5. Store tokens securely.
6. Run sync.

### Exit Criteria

- Google events sync reliably into canonical tables
- sync state and stale warnings work

## Phase 5: Outlook Connector

### Build

- Microsoft OAuth flow
- calendar sync
- recent mail summary sync
- normalization + sync status
- connector tests

### Setup Checklist

1. Create Azure app registration.
2. Add Microsoft Graph scopes.
3. Implement connector.
4. Sync calendar events.
5. Sync recent mail summaries.

### Exit Criteria

- Outlook calendar + recent mail data is queryable and cited

## Phase 6: D2L Connector

### Build

- D2L API access investigation
- official API connector when available
- fallback ICS/import pathway
- normalization tests

### Setup Checklist

1. Check D2L API access.
2. Implement official connector if available.
3. Otherwise implement ICS/export fallback.
4. Normalize deadlines into canonical tables.

### Exit Criteria

- D2L deadlines are present in unified queries

## Phase 7: Briefings + Notifications

### Build

- daily briefing
- weekly briefing
- conflict alerts
- stale sync alerts
- quiet hours + grouping behavior

### Exit Criteria

- briefings are useful and concise
- notification signals are actionable and not spammy

## Phase 8: Memory

### Build

- session memory
- user preference memory
- editable/deletable long-term memory
- memory embeddings for recall

### Exit Criteria

- memory is inspectable, editable, deletable
- no fabricated memory entries

## Phase 9: Reliability + Hardening

### Build

- RLS policy audit
- retry/backoff tuning
- sync observability improvements
- backup/restore playbook

### Exit Criteria

- security policies reviewed and enforced
- failure modes are visible and recoverable

## Phase 10: Desktop/Mobile

### Build

- desktop app shell
- menu bar companion
- mobile push notifications

### Exit Criteria

- key briefing/alert flows work outside browser tab

## Phase 11: Cowork-Style Workflows

### Build

- proactive workflows
- cross-app orchestration
- explicit confirmation for writes
- background agents

### Exit Criteria

- multi-step workflows execute safely with clear permissions

## MVP Milestone Definition

MVP is complete after Phase 7 when all are true:

- Google + Outlook + D2L (or fallback) sync is operational
- deterministic deadline/schedule answers are reliable
- `/files` semantic retrieval is operational
- daily/weekly briefing quality is acceptable
- stale/failure states are surfaced clearly
