# Master Context

## Project

Life MCP Hub is a local-first personal AI operating layer.

It aggregates the user's personal data from tools like Google Calendar, Outlook, D2L/Brightspace, and future services into one AI-accessible system.

The goal is to let the user ask one chatbot questions like:

- What do I have today?
- What is due this week?
- What changed since yesterday?
- Do I have schedule conflicts?
- What should I focus on next?
- Give me a morning briefing.
- Summarize important school/work updates.

## Important Distinction

Codex/Cursor are only development agents.

The runtime chatbot inside the app uses a separate LLM provider.

Possible runtime LLMs:

- OpenAI
- Anthropic
- Google Gemini
- Ollama/local models

The app must not depend on Codex at runtime.

## Product Category

This is not just a chatbot.

It is a personal AI operating layer with:

- synced personal context
- MCP tools
- local database
- agent runtime
- persistent memory
- notifications
- cross-source search
- proactive briefings
- future workflow automation

## Initial Integrations

MVP:

- Google Calendar
- Outlook Calendar
- Outlook Mail
- D2L/Brightspace

Future:

- Discord
- Slack
- WhatsApp
- Google Drive
- Notion
- GitHub
- Apple Notes
- Apple Reminders
- local filesystem
- browser history/bookmarks
- SMS/iMessage where legally and technically possible

## Core Principles

- Local-first
- Cheap/free to operate
- Read-only by default
- Modular connectors
- Provider-agnostic model layer
- MCP-native tool access
- Secure token handling
- Grounded answers only
- No fabricated information
- User-controlled memory
