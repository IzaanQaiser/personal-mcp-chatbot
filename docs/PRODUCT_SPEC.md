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

## MVP Features

### 1. Local Sync

Sync data from:

- Google Calendar
- Outlook Calendar
- Outlook Mail
- D2L/Brightspace

### 2. Unified Local Database

Store normalized data in SQLite.

### 3. MCP Server

Expose personal data through MCP tools/resources.

### 4. Runtime Chatbot

Use a separate LLM provider for the chatbot.

### 5. Daily Briefing

Generate a daily summary with:

- today's schedule
- upcoming deadlines
- conflicts
- important unread emails
- notable changes

### 6. Conflict Detection

Detect overlapping events.

### 7. Search

Search across calendar events, deadlines, and emails.

## Non-Goals for MVP

The MVP will not:

- send emails
- create calendar events
- delete data
- write to D2L
- support multi-user accounts
- require cloud hosting
- expose the MCP server publicly
- do autonomous destructive actions

## Success Criteria

The MVP is successful when:

- Google Calendar sync works
- Outlook sync works
- D2L sync or fallback import works
- local DB stores normalized data
- MCP tools return useful data
- chatbot can answer grounded questions
- daily briefing is genuinely useful
