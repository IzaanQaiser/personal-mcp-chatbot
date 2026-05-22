# Product Specification

## Name

Life MCP Hub

## Objective

Create a personal AI interface that can answer questions and provide briefings using synced life context.

## MVP User Stories

The user can ask:

- What is due today?
- What is due this week?
- What meetings do I have today?
- What meetings do I have tomorrow?
- Do I have schedule conflicts?
- What important emails did I receive?
- What changed in D2L?
- Give me my daily briefing.
- Search for a school deadline.
- Search for a calendar event.
- Search my local `/files` knowledge base.

## MVP Features

### 1. Source Sync

Sync data from:

- Google Calendar
- Outlook Calendar
- Outlook Mail
- D2L/Brightspace

### 2. Supabase Data Platform

Store normalized data in Supabase Postgres.

Store embeddings in Supabase `pgvector` for semantic retrieval.

### 3. Local Files Ingestion

Index repository `/files` documents into chunk + embedding records.

### 4. MCP Server

Expose personal data through MCP tools/resources.

### 5. Runtime Chatbot

Use a separate LLM provider for the chatbot.

### 6. Daily Briefing

Generate a daily summary with:

- today's schedule
- upcoming deadlines
- conflicts
- important unread emails
- notable changes

### 7. Conflict Detection

Detect overlapping events.

### 8. Search

Search across calendar events, deadlines, emails, and `/files`.

## Non-Goals for MVP

The MVP will not:

- send emails
- create calendar events
- delete data
- write to D2L
- support multi-user accounts
- do autonomous destructive actions

## Success Criteria

The MVP is successful when:

- Google Calendar sync works
- Outlook sync works
- D2L sync or fallback import works
- Supabase stores normalized source data
- Supabase vector retrieval works for `/files`
- MCP tools return useful data
- chatbot can answer grounded questions
- daily briefing is genuinely useful
