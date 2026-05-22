# Architecture

## High-Level Architecture

```txt
User
 ↓
Web UI (local app)
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
Supabase (Postgres + pgvector)
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
5. MCP tools query Supabase structured tables and vector indexes.
6. Relevant records are returned to the model with source references.
7. Model generates a grounded answer.

## Sync Flow

1. Sync engine runs manually or on a schedule.
2. Connectors fetch external data.
3. Data is normalized.
4. Normalized records are upserted into Supabase Postgres tables.
5. Embeddings are generated for eligible text records and upserted into `pgvector` columns/tables.
6. Sync state is updated.

## Core Components

### Web UI

Responsibilities:

- user input
- chat history display
- answer display
- source display
- MCP connection settings
- files indexing status

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
- query Supabase data

### Connector Layer

Responsibilities:

- OAuth
- API calls
- pagination
- rate limits
- normalization
- retries

### Supabase Data Layer

Responsibilities:

- canonical structured storage for facts
- vector storage for semantic retrieval
- sync state storage
- memory and conversation storage
- file/chunk indexing storage

### Retrieval Layer

Responsibilities:

- deterministic SQL retrieval for exact date/fact questions
- vector similarity retrieval for fuzzy file/content queries
- hybrid ranking and context packing

## Architecture Rules

- Do not query live APIs during normal chatbot answers unless explicitly needed.
- Prefer Supabase reads.
- Keep connectors isolated.
- Keep model provider swappable.
- Keep MCP tools deterministic.
- Keep destructive actions disabled in MVP.
- Deadline and schedule answers must prioritize structured deterministic queries.
