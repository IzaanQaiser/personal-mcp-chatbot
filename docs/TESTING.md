# Testing

## Philosophy

Most bugs will come from:

- OAuth
- timezones
- normalization
- duplicate syncing
- stale data
- API pagination
- provider-specific model behavior
- chunking/embedding drift

## Required Test Areas

### Database + Migrations

- migration apply/rollback
- insert event
- update event
- deduplicate event (`source + external_id`)
- query date range
- query upcoming deadlines
- vector similarity query sanity

### Connectors

- Google event normalization
- Outlook event normalization
- Outlook mail normalization
- D2L deadline normalization
- pagination handling
- failed API response handling

### Files Indexing

- recursive scan
- hash-based change detection
- chunk boundaries
- embedding generation failure handling
- reindex behavior

### MCP Tools

- get_today_schedule
- get_week_schedule
- get_upcoming_deadlines
- search_calendar_events
- get_conflicts
- search_files_semantic
- daily_briefing

### Model Provider

- mock provider response
- tool call execution
- provider swap behavior

### Sync Engine

- manual sync
- scheduled sync
- failed sync
- stale source detection

## Edge Cases

- all-day events
- timezone mismatches
- recurring events
- missing titles
- empty calendars
- duplicate external IDs
- invalid dates
- expired tokens
- network failures
- vector dimension mismatch
- very large files
- binary files in `/files`

## Rule

Use mocked API responses first.

Live API tests should be optional.
