# Database Schema

## Database

Use Supabase Postgres + `pgvector` for MVP.

## Required Extension

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

## calendar_events

```sql
CREATE TABLE calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  external_id TEXT NOT NULL,
  calendar_id TEXT,
  title TEXT,
  description TEXT,
  location TEXT,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  is_all_day BOOLEAN DEFAULT FALSE,
  attendees_json JSONB,
  url TEXT,
  raw_json JSONB,
  last_synced_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (source, external_id)
);
```

## school_deadlines

```sql
CREATE TABLE school_deadlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  external_id TEXT,
  course_id TEXT,
  course_name TEXT,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT,
  due_at TIMESTAMPTZ,
  url TEXT,
  status TEXT,
  raw_json JSONB,
  last_synced_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (source, external_id)
);
```

## email_items

```sql
CREATE TABLE email_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  external_id TEXT NOT NULL,
  sender TEXT,
  sender_email TEXT,
  subject TEXT,
  snippet TEXT,
  importance TEXT,
  is_read BOOLEAN,
  received_at TIMESTAMPTZ,
  url TEXT,
  raw_json JSONB,
  last_synced_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (source, external_id)
);
```

## files

```sql
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL UNIQUE,
  title TEXT,
  content_hash TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  modified_at TIMESTAMPTZ,
  indexed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## file_chunks

```sql
CREATE TABLE file_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id UUID NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  token_count INTEGER,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (file_id, chunk_index)
);
```

## sync_state

```sql
CREATE TABLE sync_state (
  source TEXT PRIMARY KEY,
  last_sync_at TIMESTAMPTZ,
  cursor_value TEXT,
  sync_status TEXT,
  error_message TEXT,
  records_synced INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## user_memory

```sql
CREATE TABLE user_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  memory_type TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT,
  importance INTEGER DEFAULT 1,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## conversation_sessions

```sql
CREATE TABLE conversation_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## indexes

```sql
CREATE INDEX idx_calendar_events_start_time ON calendar_events(start_time);
CREATE INDEX idx_school_deadlines_due_at ON school_deadlines(due_at);
CREATE INDEX idx_email_items_received_at ON email_items(received_at);
CREATE INDEX idx_calendar_events_source ON calendar_events(source);
CREATE INDEX idx_school_deadlines_course ON school_deadlines(course_name);
CREATE INDEX idx_files_path ON files(path);

CREATE INDEX idx_file_chunks_embedding
  ON file_chunks USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

CREATE INDEX idx_user_memory_embedding
  ON user_memory USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 50);
```

## Notes

- `file_chunks.embedding` dimension must match the selected embedding model.
- Structured date/time answers should come from canonical tables, not vector-only retrieval.
- Treat vector indexes as derived data that can be rebuilt.
