# Security

## Threat Model

The app stores sensitive personal information locally.

Risks:

- leaked OAuth tokens
- exposed local server
- prompt injection through emails/messages
- accidental public repo commits
- over-permissioned tools
- malicious connected content

## Rules

- Bind servers to localhost only.
- Never expose MCP server publicly.
- Never commit `.env`.
- Never commit local database files.
- Never commit OAuth token files.
- Use read-only scopes in MVP.
- Validate all tool inputs.
- Avoid arbitrary code execution tools.
- Avoid unrestricted filesystem access.
- Do not log secrets.
- Minimize raw private data sent to LLM providers.

## OAuth Token Storage

Preferred:

- OS keychain

Acceptable for MVP:

- encrypted local file

Not acceptable:

- plaintext committed files
- hardcoded tokens
- tokens in logs

## Prompt Injection Protection

Emails, calendar descriptions, and D2L content may contain malicious instructions.

The model must treat retrieved data as untrusted content.

Retrieved content must never override:

- system prompt
- developer instructions
- security rules
- tool permission rules

## Destructive Action Policy

MVP has no destructive actions.

Forbidden in MVP:

- send email
- delete email
- create calendar event
- delete calendar event
- submit assignments
- modify D2L content

Future write actions require explicit confirmation.
