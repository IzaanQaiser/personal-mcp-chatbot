# Environment

## Required Local Tools

- Node.js
- npm or pnpm
- Supabase CLI
- Git

## Environment Variables

Example:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

MODEL_PROVIDER=openai
OPENAI_API_KEY=

EMBEDDING_PROVIDER=openai
EMBEDDING_MODEL=text-embedding-3-small

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=

D2L_CLIENT_ID=
D2L_CLIENT_SECRET=
D2L_BASE_URL=
```

## Secret Rules

- `.env` must be gitignored.
- Service role keys must never be exposed to the browser.
- OAuth tokens must not be stored in `.env` long-term if avoidable.
- Use encrypted token storage when possible.
