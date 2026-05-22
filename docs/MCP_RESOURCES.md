# MCP Resources

## Purpose

Resources expose read-only context that the model/client can inspect.

## MVP Resources

### lifehub://schedule/today

Today's schedule.

### lifehub://schedule/week

Current week schedule.

### lifehub://deadlines/upcoming

Upcoming school deadlines.

### lifehub://emails/recent-important

Recent important emails.

### lifehub://files/index-status

Current `/files` index status.

### lifehub://sync/status

Status of all source syncs.

## Resource Rules

- Resources are read-only.
- Resources should be compact.
- Resources should show freshness.
- Resources should never expose secrets.
