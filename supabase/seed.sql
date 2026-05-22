-- Minimal phase 1 seed data
insert into calendar_events (
  id,
  source,
  external_id,
  calendar_id,
  title,
  description,
  location,
  start_time,
  end_time,
  is_all_day,
  attendees_json,
  url,
  raw_json,
  last_synced_at
) values
  (
    '11111111-1111-4111-8111-111111111111',
    'google_calendar',
    'gcal_evt_1',
    'primary',
    'ECE318 Lab',
    'Lab block',
    'ENG Building',
    '2026-05-23T13:00:00Z',
    '2026-05-23T15:00:00Z',
    false,
    '[]'::jsonb,
    'https://calendar.google.com',
    '{}'::jsonb,
    now()
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'outlook_calendar',
    'outlook_evt_1',
    'default',
    'Project Standup',
    'Weekly check-in',
    'Online',
    '2026-05-23T14:00:00Z',
    '2026-05-23T14:30:00Z',
    false,
    '[]'::jsonb,
    'https://outlook.office.com',
    '{}'::jsonb,
    now()
  )
on conflict (source, external_id) do update
set
  title = excluded.title,
  description = excluded.description,
  location = excluded.location,
  start_time = excluded.start_time,
  end_time = excluded.end_time,
  updated_at = now(),
  last_synced_at = now();

insert into school_deadlines (
  id,
  source,
  external_id,
  course_id,
  course_name,
  title,
  description,
  type,
  due_at,
  url,
  status,
  raw_json,
  last_synced_at
) values
  (
    '33333333-3333-4333-8333-333333333333',
    'd2l',
    'd2l_deadline_1',
    'ECE318',
    'ECE318',
    'Lab Report 2',
    'Upload PDF',
    'assignment',
    '2026-05-24T03:59:00Z',
    'https://d2l.example.com',
    'open',
    '{}'::jsonb,
    now()
  )
on conflict (source, external_id) do update
set
  title = excluded.title,
  due_at = excluded.due_at,
  status = excluded.status,
  updated_at = now(),
  last_synced_at = now();

insert into email_items (
  id,
  source,
  external_id,
  sender,
  sender_email,
  subject,
  snippet,
  importance,
  is_read,
  received_at,
  url,
  raw_json,
  last_synced_at
) values
  (
    '44444444-4444-4444-8444-444444444444',
    'outlook_mail',
    'mail_1',
    'Course Admin',
    'admin@example.com',
    'Deadline Reminder',
    'Lab Report 2 is due this week',
    'high',
    false,
    now() - interval '2 hours',
    'https://outlook.office.com/mail',
    '{}'::jsonb,
    now()
  )
on conflict (source, external_id) do update
set
  subject = excluded.subject,
  snippet = excluded.snippet,
  is_read = excluded.is_read,
  updated_at = now(),
  last_synced_at = now();

insert into sync_state (source, last_sync_at, sync_status, records_synced, updated_at)
values
  ('google_calendar', now(), 'success', 1, now()),
  ('outlook_calendar', now(), 'success', 1, now()),
  ('outlook_mail', now(), 'success', 1, now()),
  ('d2l', now(), 'success', 1, now())
on conflict (source) do update
set
  last_sync_at = excluded.last_sync_at,
  sync_status = excluded.sync_status,
  records_synced = excluded.records_synced,
  updated_at = now();
