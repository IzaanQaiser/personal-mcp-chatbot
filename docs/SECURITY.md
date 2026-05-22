# Security

## Threat Model

The app handles sensitive personal information across local runtime components and Supabase-hosted storage.

Risks:

- leaked OAuth tokens
- leaked Supabase service role key
- weak or missing RLS policies
- exposed local server
- prompt injection through emails/messages
- accidental public repo commits
- over-permissioned tools
- malicious connected content

## Rules

- Bind local app servers to localhost only by default.
- Never expose MCP server publicly.
- Never commit `.env`.
- Never commit OAuth token files.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to frontend code.
- Use read-only scopes in MVP.
- Validate all tool inputs.
- Avoid arbitrary code execution tools.
- Avoid unrestricted filesystem access.
- Do not log secrets.
- Minimize raw private data sent to LLM providers.

## Supabase Security Rules

- Enable and audit RLS on all user data tables.
- Use service role keys only in trusted backend processes.
- Prefer narrowly scoped policies, even for single-user MVP.
- Rotate leaked keys immediately.

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

Emails, calendar descriptions, D2L content, and files may contain malicious instructions.

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
