# Agent Guidelines for blog-1999

This document provides coding agents with essential information about the blog-1999 codebase.

## Project Overview

Next.js (App Router) blog system with MDX content and Notion CMS integration. Uses TypeScript, Tailwind CSS v4, React 19, and server-side rendering. The toolchain is Nix-managed (Node 22 / pnpm 10).

## Build & Development Commands

```bash
# Install dependencies (uses pnpm 10)
pnpm install

# Development server (http://localhost:3000)
pnpm run dev

# Production build
pnpm run build

# Start production server
pnpm run start

# Lint all files (ESLint flat config)
pnpm run lint

# Auto-fix lint/formatting issues
pnpm run lint:fix

# Export static site
pnpm run export
```

### Nix (Blueprint layout)

The repo is Nix-managed via [numtide/blueprint](https://numtide.github.io/blueprint/),
with all Nix files under `nix/` (prefix configured in `flake.nix`).

```bash
nix develop        # reproducible dev shell (Node 22, pnpm 10, TypeScript) + installs git hooks
nix flake check    # runs lint + typecheck checks in an offline sandbox
nix fmt            # treefmt: prettier (project) + nixfmt (*.nix)
```

With [direnv](https://direnv.net), `.envrc` (`use flake`) auto-loads the dev
shell on `cd` (run `direnv allow` once).

- `nix/devshell.nix` - default dev shell; its shellHook installs the git-hooks.
- `nix/formatter.nix` + `nix/treefmt.nix` - `nix fmt` (shared treefmt config).
- `nix/pre-commit-check.nix` - [git-hooks.nix](https://github.com/cachix/git-hooks.nix)
  config (treefmt, eslint, tsc, nil, statix). Devshell-only (not a flake check),
  because eslint/tsc/prettier need the project-local `node_modules`. Runs on
  every `git commit`; the generated `.pre-commit-config.yaml` is gitignored.
- `nix/checks/{lint,typecheck}.nix` - flake checks (consume the deps package via
  `perSystem.self.pnpm-deps`). These provide the offline/CI lint+typecheck
  coverage that the working-tree git hooks cannot run in the sandbox.
- `nix/packages/pnpm-deps.nix` - offline pnpm dependency store, exposed as
  `packages.<system>.pnpm-deps` (a fixed-output derivation). **When
  `pnpm-lock.yaml` changes, the `hash` here must be regenerated**: set it to
  `pkgs.lib.fakeHash`, run a build, copy the `got:` hash.

### Testing

- No automated test suite currently configured
- Manual testing via `pnpm run dev` and browser verification
- Type checking via TypeScript compiler: `npx tsc --noEmit`
- CI-style verification: `nix flake check` (lint + typecheck, fully offline)

## Code Style & Formatting

### Prettier Configuration

- **Print Width**: 70 characters
- **Indentation**: 2 spaces, no tabs
- **Quotes**: Double quotes for strings
- **Semicolons**: Required
- **Trailing Commas**: Always (ES5+ compatible)
- **Arrow Functions**: Avoid parentheses when possible (`x => x`)
- **Bracket Spacing**: Enabled (`{ foo }` not `{foo}`)
- **JSX**: Brackets on same line as last prop
- **Plugins**: prettier-plugin-tailwindcss (auto-sorts classes)

### ESLint Rules

- **Flat config**: `eslint.config.mjs` (ESLint 9 flat config; the legacy
  `.eslintrc.json` has been removed)
- Composes: `@eslint/js` recommended, `eslint-config-next` (core-web-vitals +
  typescript), `typescript-eslint` recommended, and
  `eslint-plugin-prettier/recommended`
- **Unused vars**: Error
- **Explicit any**: Error (avoid `any` type)
- Prettier integration enabled
- Run directly with `pnpm run lint` (`eslint .`); `next lint` is removed in
  Next 16

## TypeScript Configuration

### Strict Mode

- `strict: false` (permissive mode)
- `strictNullChecks: false`
- Use optional chaining (`?.`) and nullish coalescing (`??`) liberally

### Path Aliases

```typescript
@/components/* → components/*
@/lib/*        → lib/*
@/data/*       → data/*
@/public/*     → public/*
```

### Target & Module

- Target: ES2017
- Module: esnext, Node resolution
- JSX: react-jsx (React 17+ transform)

## Project Structure

```
app/               - Next.js 13+ App Router pages
  (root)/          - Main site pages with root layout
  (dyn)/           - Dynamic Notion-based content
components/        - React components
  UI/              - User interface components
  MDX/             - MDX content components
  Scripts/         - Analytics and scripts
  Layouts/         - Layout components
  Widgets/         - Reusable widgets
lib/               - Utilities and external service integrations
data/              - Static content (MDX blog posts, metadata)
  blog/            - MDX blog post files
public/            - Static assets (images, files, etc.)
styles/            - Global CSS, Prism themes, KaTeX styles
locales/           - i18n translations (en, zh)
```

## Naming Conventions

### Files & Directories

- **Components**: PascalCase (`WelcomeCard.tsx`, `PostPage.tsx`)
- **Utilities**: camelCase (`blog.ts`, `spotify.ts`)
- **Directories**: PascalCase for component folders, lowercase for utility folders
- **Route Segments**: Next.js conventions (`[lang]`, `(root)`, `layout.tsx`, `page.tsx`)

### Code

- **React Components**: PascalCase, default export
- **Functions**: camelCase
- **Types/Interfaces**: PascalCase
- **Constants**: camelCase (not SCREAMING_SNAKE_CASE)
- **Type suffix**: Use `type` keyword for aliases, `interface` for object shapes

## Import Style

### Order (enforced by prettier-plugin-tailwindcss)

1. React/Next.js imports
2. Third-party packages
3. Path alias imports (`@/...`)
4. Relative imports (`./`, `../`)
5. Asset imports (images, styles)

### Example

```typescript
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { somePackage } from "some-package";
import ComponentName from "@/components/UI/ComponentName";
import { utilFunction } from "@/lib/utils";
import helloPic from "@/public/img/face.png";
```

## Component Patterns

### Server Components (default)

- Use async/await for data fetching
- No useState, useEffect, or browser APIs
- Access file system, environment variables directly

### Client Components

- Add `"use client"` directive at top
- Use for interactivity, hooks, browser APIs

### Props & Types

```typescript
interface ComponentProps {
  title: string;
  description?: string; // optional
  children?: React.ReactNode;
}

const Component = ({
  title,
  description = "default",
}: ComponentProps) => {
  // implementation
};

export default Component;
```

## Styling with Tailwind

- Use Tailwind utility classes extensively
- Custom colors defined: `white-readable`, `black-readable`
- Custom fonts: `font-title` (Lato), `font-article` (Noto Sans SC), `font-mono` (JetBrains Mono)
- Responsive: mobile-first (`sm:`, `md:`, `lg:`)
- Dark mode: not currently implemented

## Error Handling

- Use try/catch for async operations
- Throw errors with descriptive messages
- Return `undefined` or `null` for missing data (not errors)
- Use optional chaining for potentially undefined values

```typescript
export function getBlogPost(slug: string): BlogPost | undefined {
  const all = getAllBlogPosts();
  return all.find(p => p.slug === slug) ?? undefined;
}
```

## Content Management

### MDX Blog Posts

- Location: `data/blog/*.mdx`
- Frontmatter: `title`, `summary`, `publishDate`, `lang` (en|zh), `series`
- Filename pattern: `slug.mdx` or `slug.en.mdx` / `slug.zh.mdx`
- Access via `lib/blog.ts`: `getAllBlogPosts()`, `getBlogPost(slug, lang)`

### Notion Integration

- Dynamic content in `app/(dyn)/` routes
- Uses `react-notion-x` for rendering

## Common Gotchas

1. **No `any` types**: ESLint will error on explicit `any`
2. **Image optimization**: Always use `next/image` for images
3. **Font loading**: Fonts configured in `app/(root)/layout.tsx`
4. **Path aliases**: Use `@/` imports, not relative paths across directories
5. **Caching**: Blog posts cached in memory, cleared with `clearBlogCache()`
6. **Date handling**: Posts have timezone logic (pre-2022: UTC+8, post-2022: UTC-6)
7. **pnpm config**: Dependency `overrides` / `onlyBuiltDependencies` live in
   `pnpm-workspace.yaml` (pnpm 10), not the deprecated `pnpm` field in
   `package.json`.
8. **Nix deps hash**: After changing `pnpm-lock.yaml`, regenerate the hash in
   `nix/packages/pnpm-deps.nix` or `nix flake check` will fail.

## Before Committing

1. Run `pnpm run lint` to catch issues
2. Verify TypeScript: `npx tsc --noEmit`
3. Test in browser with `pnpm run dev`
4. Ensure build succeeds: `pnpm run build`
5. Or run all checks at once: `nix flake check`
