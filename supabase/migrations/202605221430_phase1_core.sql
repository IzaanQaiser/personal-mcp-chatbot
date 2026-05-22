-- Phase 1 core schema for Life MCP Hub
create extension if not exists vector;
create extension if not exists pgcrypto;

create table if not exists calendar_events (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  external_id text not null,
  calendar_id text,
  title text,
  description text,
  location text,
  start_time timestamptz,
  end_time timestamptz,
  is_all_day boolean default false,
  attendees_json jsonb,
  url text,
  raw_json jsonb,
  last_synced_at timestamptz not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (source, external_id)
);

create table if not exists school_deadlines (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  external_id text,
  course_id text,
  course_name text,
  title text not null,
  description text,
  type text,
  due_at timestamptz,
  url text,
  status text,
  raw_json jsonb,
  last_synced_at timestamptz not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (source, external_id)
);

create table if not exists email_items (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  external_id text not null,
  sender text,
  sender_email text,
  subject text,
  snippet text,
  importance text,
  is_read boolean,
  received_at timestamptz,
  url text,
  raw_json jsonb,
  last_synced_at timestamptz not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (source, external_id)
);

create table if not exists files (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  title text,
  content_hash text not null,
  mime_type text,
  size_bytes bigint,
  modified_at timestamptz,
  indexed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists file_chunks (
  id uuid primary key default gen_random_uuid(),
  file_id uuid not null references files(id) on delete cascade,
  chunk_index integer not null,
  content text not null,
  token_count integer,
  embedding vector(1536),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (file_id, chunk_index)
);

create table if not exists sync_state (
  source text primary key,
  last_sync_at timestamptz,
  cursor_value text,
  sync_status text,
  error_message text,
  records_synced integer default 0,
  updated_at timestamptz default now()
);

create table if not exists user_memory (
  id uuid primary key default gen_random_uuid(),
  memory_type text not null,
  content text not null,
  source text,
  importance integer default 1,
  embedding vector(1536),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists conversation_sessions (
  id uuid primary key default gen_random_uuid(),
  title text,
  summary text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_calendar_events_start_time on calendar_events(start_time);
create index if not exists idx_school_deadlines_due_at on school_deadlines(due_at);
create index if not exists idx_email_items_received_at on email_items(received_at);
create index if not exists idx_calendar_events_source on calendar_events(source);
create index if not exists idx_school_deadlines_course on school_deadlines(course_name);
create index if not exists idx_files_path on files(path);
create index if not exists idx_file_chunks_embedding
  on file_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);
create index if not exists idx_user_memory_embedding
  on user_memory using ivfflat (embedding vector_cosine_ops)
  with (lists = 50);
