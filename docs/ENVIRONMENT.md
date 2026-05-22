# Environment

## Required Local Tools

- Node.js
- npm or pnpm
- SQLite
- Git

## Environment Variables

Example:

```env
DATABASE_URL=file:./data/lifehub.sqlite

MODEL_PROVIDER=openai
OPENAI_API_KEY=

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
- OAuth tokens must not be stored in `.env` long-term if avoidable.
- Use encrypted token storage when possible.
