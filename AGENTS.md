# AGENTS.md

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

A crypto airdrop listing site — **AirdropHunter** — with search, category filtering, status filtering, and sorting. Built with TanStack Start (React 19) and Tailwind CSS v4, deployed on Netlify.

## Directory Structure

```
src/
  routes/
    __root.tsx      # Root layout: HTML shell, global head meta (title, description)
    index.tsx       # Main page: all airdrop data, filtering, sorting, and UI components
  router.tsx        # TanStack Router setup
  styles.css        # Tailwind import + global base styles
public/             # Static assets (favicon, logos)
netlify.toml        # Netlify build config
vite.config.ts      # Vite + TanStack Start + Netlify plugin + Tailwind
```

## Key Concepts

### All Data Is Static
The `airdrops` array in `src/routes/index.tsx` is the data source. To make it dynamic, use Netlify Database (`netlify-database` skill) with a Drizzle ORM schema in `db/schema.ts`, and replace the static array with a TanStack Start server loader.

### Client-Side Filtering
Search, category, status, and sort state live in `useState` hooks; the filtered list is derived via `useMemo`. If data moves to a database, push filtering to the server loader.

### Component Architecture
All components (`AirdropCard`, `StatusBadge`, `DifficultyBadge`) are colocated in `src/routes/index.tsx`. Extract to `src/components/` only when reused across routes.

### Adding New Airdrops
Append entries to the `airdrops` array in `src/routes/index.tsx`, following the `Airdrop` interface defined in the same file.

## Configuration

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify, Tailwind, tsconfig paths |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command, publish directory, dev server settings |
| `styles.css` | Tailwind v4 import + base font/body resets |

## Conventions

- Tailwind utility classes directly on JSX; no CSS modules
- Type definitions and config maps at the top of each route file
- PascalCase components, camelCase utilities, kebab-case route files
