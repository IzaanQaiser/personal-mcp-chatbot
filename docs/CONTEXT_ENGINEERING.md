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
- indexed `/files` chunks
- future connected sources

## Retrieval Strategy

1. Understand the user query.
2. Determine whether the query is fact/date-critical or semantic.
3. Run deterministic structured retrieval from Supabase tables.
4. Run vector retrieval for fuzzy text context when helpful.
5. Rank and merge results by relevance, freshness, and source confidence.
6. Compress or summarize if needed.
7. Inject structured context into the model.

## Prompt Context Rules

- Do not dump entire tables into the prompt.
- Prefer structured JSON.
- Include source IDs.
- Include timestamps.
- Include URLs where available.
- Mark stale data clearly.
- Mark missing data clearly.
- Include retrieval type (`structured` or `vector`) per result.

## Grounding Rule

If the data is not present, the model must say it is not present.

Never fabricate deadlines, events, emails, or source details.

## Reliability Rule

For critical answers (deadlines, schedules, conflicts), prefer deterministic structured retrieval.

Use vector retrieval as augmentation, not the final authority for time-sensitive facts.
