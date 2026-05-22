# Agent Architecture

## Philosophy

The app is not a stateless LLM wrapper.

The app is an agent system with tools, memory, context retrieval, and sync infrastructure.

## Agent Runtime Responsibilities

- receive user message
- retrieve relevant context
- decide tool calls
- execute tools through orchestrator
- synthesize answer
- cite sources where possible
- update session memory if needed

## Main Agent Components

### 1. Runtime Model

Handles:

- reasoning
- summarization
- planning
- final response writing

### 2. Tool Orchestrator

Handles:

- tool registration
- tool schemas
- execution
- errors
- retries
- timeouts

### 3. Context Engine

Handles:

- relevant record retrieval
- context ranking
- prompt assembly
- memory injection

### 4. Memory Engine

Handles:

- short-term memory
- session state
- long-term user preferences
- active workflows

### 5. Notification Engine

Handles:

- proactive alerts
- morning briefings
- deadline warnings
- conflict alerts

## Important Design Rule

The model should not hold all intelligence.

The system should rely on:

- clean data
- good retrieval
- deterministic tools
- structured context
- memory
- explicit permissions
