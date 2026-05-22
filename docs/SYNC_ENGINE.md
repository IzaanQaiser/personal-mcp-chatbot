# Sync Engine

## Purpose

Keep local data fresh.

## MVP Sync Types

### Manual Sync

User triggers sync.

### Scheduled Sync

Runs every configurable interval.

Recommended MVP interval:

- calendar: every 15 minutes
- mail: every 15-30 minutes
- D2L: every 30-60 minutes

## Sync Rules

- sync should be idempotent
- use upserts
- store sync state
- log failures safely
- avoid duplicate records
- handle expired tokens
- handle network failure

## Staleness

A source is stale if it has not synced within its configured freshness window.

Example:

- calendar stale after 60 minutes
- mail stale after 60 minutes
- D2L stale after 3 hours

## Sync Status

Each source should expose:

- last_sync_at
- sync_status
- records_synced
- last_error
