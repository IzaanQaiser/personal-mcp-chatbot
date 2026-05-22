# Context Engineering

## Purpose

The chatbot should answer using the right context, not all context.

## Context Sources

- calendar events
- school deadlines
- email summaries
- sync metadata
- session memory
- user preferences
- future connected sources

## Retrieval Strategy

1. Understand the user query.
2. Determine relevant source types.
3. Query local database.
4. Rank by date, relevance, and importance.
5. Compress or summarize if needed.
6. Inject structured context into the model.

## Prompt Context Rules

- Do not dump entire tables into the prompt.
- Prefer structured JSON.
- Include source IDs.
- Include timestamps.
- Include URLs where available.
- Mark stale data clearly.
- Mark missing data clearly.

## Grounding Rule

If the data is not present, the model must say it is not present.

Never fabricate deadlines, events, emails, or source details.

## Future

Add embeddings for semantic search after basic keyword/date search works.
