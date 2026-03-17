# CLAUDE.md

## Project Overview

**LearnFlow** (`rest-express`) — A full-stack TypeScript landing page for a book about innovative learning methodology. Features glassmorphism design with Korean-language UI.

## Tech Stack

- **Frontend**: React 18 + TypeScript, Vite, Tailwind CSS 3, Shadcn/ui (new-york style), Framer Motion, Wouter (routing), TanStack React Query, React Hook Form + Zod
- **Backend**: Express.js + TypeScript, served on port 5000
- **Database**: Drizzle ORM with PostgreSQL (Neon-compatible); currently uses in-memory storage (`MemStorage`)
- **Build**: Vite (client) + esbuild (server), ESM modules throughout

## Project Structure

```
client/                  # React frontend
  src/
    components/          # React components
      ui/                # Shadcn/ui primitives (60+ components)
      *-section.tsx      # Landing page sections (hero, about, features, etc.)
    pages/               # Route pages (home.tsx, not-found.tsx)
    hooks/               # Custom hooks (use-mobile, use-toast)
    lib/                 # Utilities (queryClient, utils)
    App.tsx              # Root component with routing
    main.tsx             # Entry point
    index.css            # Global styles with CSS variables
server/                  # Express backend
  index.ts               # Server entry point
  routes.ts              # API route definitions
  storage.ts             # IStorage interface + MemStorage implementation
  vite.ts                # Vite dev server integration
shared/                  # Shared between client & server
  schema.ts              # Drizzle ORM schemas + Zod validation
attached_assets/         # External/uploaded assets
```

## Commands

```bash
npm run dev        # Start dev server (tsx + Vite HMR)
npm run build      # Build client (Vite) + server (esbuild)
npm run start      # Run production build
npm run check      # TypeScript type checking (tsc --noEmit)
npm run db:push    # Push Drizzle schema to database
```

## Path Aliases

| Alias       | Resolves To        |
|-------------|--------------------|
| `@/*`       | `client/src/*`     |
| `@shared/*` | `shared/*`         |
| `@assets`   | `attached_assets/` |

Configured in both `tsconfig.json` and `vite.config.ts`.

## API Endpoints

- `POST /api/contacts` — Submit contact form (validated with Zod)
- `GET /api/contacts` — List all contacts (newest first)

## Data Models (shared/schema.ts)

Two tables: `contacts` (id, name, email, message, createdAt) and `users` (id, username, password). Both use UUID primary keys. Insert schemas are derived via `drizzle-zod`.

## Key Conventions

- **Language**: TypeScript strict mode. ESM (`"type": "module"`).
- **UI text**: Korean language for user-facing strings and error messages.
- **Styling**: Tailwind CSS with CSS variables for theming. Dark mode via class strategy. Glassmorphism aesthetic.
- **Components**: Use Shadcn/ui primitives from `@/components/ui/`. Landing page is composed of section components (`*-section.tsx`).
- **Validation**: Zod schemas for both API request validation and form validation. Derive insert schemas from Drizzle table definitions with `createInsertSchema`.
- **Storage**: `IStorage` interface in `server/storage.ts`. Currently `MemStorage` (in-memory). Swap to DB implementation when `DATABASE_URL` is set.
- **Vite base path**: `/ai_book/` — all assets are served under this prefix.
- **Build output**: Client builds to project root (`outDir: "."`), server bundles to `dist/`.

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (required for `db:push`, optional at runtime with MemStorage fallback)
- `NODE_ENV` — `development` or `production`

## What's Missing (as of now)

- No test framework or tests
- No linting/formatting config (ESLint, Prettier)
- No CI/CD pipelines
- No `.gitignore` file
