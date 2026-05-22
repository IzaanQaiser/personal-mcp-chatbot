# Architecture

## High-Level Architecture

```txt
User
 ↓
Chat UI
 ↓
Backend API
 ↓
Agent Runtime
 ↓
Model Provider
 ↓
Tool Orchestrator
 ↓
MCP Client
 ↓
MCP Server
 ↓
Query Layer
 ↓
SQLite Database
 ↑
Sync Engine
 ↑
Connectors
```

## Runtime Flow

1. User asks a question.
2. Backend sends the request to the agent runtime.
3. Runtime model decides what tools are needed.
4. Tool orchestrator executes MCP tools.
5. MCP tools query the local database.
6. Relevant data is returned to the model.
7. Model generates a grounded answer.

## Sync Flow

1. Sync engine runs manually or on a schedule.
2. Connectors fetch external data.
3. Data is normalized.
4. Normalized records are upserted into SQLite.
5. Sync state is updated.

## Core Components

### Chat UI

Responsibilities:

- user input
- chat history display
- answer display
- source display
- settings page

### Backend API

Responsibilities:

- chat requests
- sync triggers
- auth flows
- provider routing
- tool orchestration

### Agent Runtime

Responsibilities:

- planning
- tool selection
- response generation
- memory injection

### Model Provider Layer

Responsibilities:

- support OpenAI
- support Anthropic
- support Gemini
- support Ollama/local
- hide provider-specific logic

### MCP Server

Responsibilities:

- expose tools
- expose resources
- validate schemas
- query local data

### Connector Layer

Responsibilities:

- OAuth
- API calls
- pagination
- rate limits
- normalization
- retries

### SQLite Database

Responsibilities:

- local source of truth
- normalized data storage
- queryable context
- sync state storage

## Architecture Rules

- Do not query live APIs during normal chatbot answers unless explicitly needed.
- Prefer local DB reads.
- Keep connectors isolated.
- Keep model provider swappable.
- Keep MCP tools deterministic.
- Keep all destructive actions disabled in MVP.
