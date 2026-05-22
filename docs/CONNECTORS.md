# Connectors

## Connector Philosophy

Each connector must be isolated, testable, and replaceable.

Each connector should:

- authenticate
- fetch data
- normalize data
- handle pagination
- handle rate limits
- handle token refresh
- upsert into database
- update sync state

## Connector Interface

```ts
export interface Connector {
  source: string;
  sync(): Promise<SyncResult>;
}
```

## SyncResult

```ts
export type SyncResult = {
  source: string;
  status: "success" | "partial" | "failed";
  recordsSynced: number;
  errors?: string[];
  syncedAt: string;
};
```

## Google Calendar Connector

### Purpose

Sync Google Calendar events into `calendar_events`.

### Scope

Use read-only calendar access.

### Data Window

MVP sync window:

- 30 days in the past
- 90 days in the future

### Normalization

Google event → CalendarEvent

Required fields:

- external_id
- title
- description
- start_time
- end_time
- location
- attendees
- url
- raw_json

## Outlook Connector

### Purpose

Sync Outlook Calendar and optional Outlook Mail.

### Calendar

Microsoft Graph calendar events → CalendarEvent

### Mail

Microsoft Graph messages → EmailItem

MVP should only fetch recent messages, not the entire mailbox.

Recommended mail window:

- last 7 days
- unread or important first

## D2L/Brightspace Connector

### Purpose

Sync school calendar items and deadlines.

### Preferred Path

Use official D2L/Brightspace Valence APIs if available.

### Data to Fetch

- courses/org units
- calendar events
- assignment due dates
- quiz due dates
- content items with due dates if available

### Fallback Paths

If API access is unavailable:

1. D2L calendar ICS subscription
2. manual ICS export
3. CSV import
4. manual file import
5. browser-assisted export with user permission

## Connector Rules

- Never store access tokens in raw logs.
- Never print secrets.
- Store raw JSON only for fetched records, not auth responses.
- Use exponential backoff on retryable failures.
- Fail gracefully.
- Keep each connector independently runnable.
