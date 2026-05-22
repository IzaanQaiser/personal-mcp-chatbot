# Database Schema

## Database

Use SQLite for MVP.

## calendar_events

```sql
CREATE TABLE calendar_events (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  external_id TEXT NOT NULL,
  calendar_id TEXT,
  title TEXT,
  description TEXT,
  location TEXT,
  start_time TEXT,
  end_time TEXT,
  is_all_day INTEGER DEFAULT 0,
  attendees_json TEXT,
  url TEXT,
  raw_json TEXT,
  last_synced_at TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## school_deadlines

```sql
CREATE TABLE school_deadlines (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  external_id TEXT,
  course_id TEXT,
  course_name TEXT,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT,
  due_at TEXT,
  url TEXT,
  status TEXT,
  raw_json TEXT,
  last_synced_at TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## email_items

```sql
CREATE TABLE email_items (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  external_id TEXT NOT NULL,
  sender TEXT,
  sender_email TEXT,
  subject TEXT,
  snippet TEXT,
  importance TEXT,
  is_read INTEGER,
  received_at TEXT,
  url TEXT,
  raw_json TEXT,
  last_synced_at TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## sync_state

```sql
CREATE TABLE sync_state (
  source TEXT PRIMARY KEY,
  last_sync_at TEXT,
  cursor_value TEXT,
  sync_status TEXT,
  error_message TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## user_memory

```sql
CREATE TABLE user_memory (
  id TEXT PRIMARY KEY,
  memory_type TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT,
  importance INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## conversation_sessions

```sql
CREATE TABLE conversation_sessions (
  id TEXT PRIMARY KEY,
  title TEXT,
  summary TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## indexes

```sql
CREATE INDEX idx_calendar_events_start_time ON calendar_events(start_time);
CREATE INDEX idx_school_deadlines_due_at ON school_deadlines(due_at);
CREATE INDEX idx_email_items_received_at ON email_items(received_at);
CREATE INDEX idx_calendar_events_source ON calendar_events(source);
CREATE INDEX idx_school_deadlines_course ON school_deadlines(course_name);
```
