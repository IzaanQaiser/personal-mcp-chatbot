# MCP Tools

## Tool Philosophy

MCP tools should expose clean, structured access to local life data.

Tools should usually query the local SQLite database, not live external APIs.

## MVP Tools

### get_today_schedule

Returns today's:

- calendar events
- school deadlines
- conflicts

### get_week_schedule

Returns the next 7 days grouped by day.

### get_upcoming_deadlines

Input:

```ts
{
  daysAhead: number
}
```

Returns upcoming school deadlines.

### search_calendar_events

Input:

```ts
{
  query: string;
  startDate?: string;
  endDate?: string;
}
```

Returns matching calendar events.

### search_school_items

Input:

```ts
{
  query: string;
}
```

Returns matching school deadlines/items.

### search_email_items

Input:

```ts
{
  query: string;
  daysBack?: number;
}
```

Returns matching email summaries.

### get_conflicts

Input:

```ts
{
  startDate: string;
  endDate: string;
}
```

Returns overlapping events.

### daily_briefing

Returns:

- today's events
- upcoming deadlines
- conflicts
- notable emails
- stale sync warnings

### weekly_briefing

Returns:

- events this week
- deadlines this week
- heavy days
- conflicts

### sync_all_sources

Triggers all configured source syncs.

## Tool Output Rules

Every tool should return:

- structured data
- source name
- source record IDs
- timestamps
- stale data warnings if relevant

## Future Tools

- find_free_time
- summarize_unread_messages
- detect_overload
- plan_my_day
- plan_my_week
- create_task_plan
- compare_schedule_options
