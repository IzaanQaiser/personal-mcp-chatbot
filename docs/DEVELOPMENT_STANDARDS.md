# Development Standards

## Code Style

- TypeScript strict mode
- explicit return types for public functions
- small modules
- no giant files
- clear names
- no clever abstractions too early

## Folder Structure

```txt
src/
  app/
  api/
  agent/
  connectors/
  db/
  mcp/
  models/
  notifications/
  retrieval/
  sync/
  tools/
  types/
  utils/
```

## Logging

Use structured logs.

Never log:

- access tokens
- refresh tokens
- full raw emails unless debugging locally
- secrets

## Validation

Use schemas for:

- tool inputs
- connector outputs
- database writes
- model provider responses

## Data Rules

- Use migrations for schema changes.
- Keep structured fact queries deterministic.
- Keep embedding dimensions and indexes consistent with the selected model.
- Rebuild vector indexes safely when chunking rules change.

## Commits

Prefer small commits by phase.

## Documentation

Update docs when architecture changes.
