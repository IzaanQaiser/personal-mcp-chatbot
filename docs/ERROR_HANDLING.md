# Error Handling

## Principles

Failures should be visible, understandable, and recoverable.

## Connector Errors

Handle:

- expired token
- invalid token
- network failure
- rate limit
- permission denied
- malformed response

## User-Facing Error Style

Good:

> Outlook has not synced in 2 hours because the token expired. Reconnect Outlook.

Bad:

> Error 401.

## Retry Rules

Retry:

- network timeout
- rate limits
- temporary server errors

Do not blindly retry:

- permission denied
- invalid credentials
- missing scopes

## Sync Failure

If sync fails, preserve old data and mark source as stale.
