<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: DevEvent

A developer events aggregator — hackathons, meetups, and conferences in one place.

## Tech Stack

- **Next.js 16.2.1** — App Router, `instrumentation-client.ts` for client-side init
- **React 19.2.4** — use React 19 APIs and patterns
- **TypeScript** — strict mode; use interfaces for component props (name them `Props`)
- **Tailwind CSS v4** — utility-first; use `cn()` from `@/lib/utils` to merge classes
- **Base UI** (`@base-ui/react`) — headless primitives; prefer over custom ARIA implementations
- **shadcn** — component scaffolding CLI (`npx shadcn add <component>`)
- **CVA** (`class-variance-authority`) — for variant-based component styling
- **PostHog** (`posthog-js`) — analytics & error tracking (already integrated)
- **Lucide React** — icon library
- **OGL** — WebGL/canvas (used by `LightRays` component)
- **Fonts**: Geist (`--font-sans`), Schibsted Grotesk (`--font-schibsted-grotesk`), Martian Mono (`--font-martian-mono`)

## Project Structure

```
app/              # Next.js App Router pages
  layout.tsx      # Root layout: fonts, Navbar, LightRays background
  page.tsx        # Home page: hero + featured events grid
components/       # Shared React components
  EventCard.tsx   # Client component — card with PostHog capture on click
  ExploreBtn.tsx  # CTA button
  LightRays.tsx   # OGL WebGL background effect
  Navbar.tsx      # Site header with nav links
lib/
  constants.ts    # Static data (events array)
  utils.ts        # cn() helper (clsx + tailwind-merge)
instrumentation-client.ts  # PostHog init (runs once on client)
next.config.ts    # PostHog proxy rewrites (/ingest/* → us.i.posthog.com)
```

## Path Alias

`@/` resolves to the project root. Always use `@/` imports.

## Known Routes

- `/` — Home (featured events)
- `/events` — All events listing
- `/events/[slug]` — Individual event detail
- `/create-event` — Event creation form

## Development Commands

```sh
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # ESLint (eslint-config-next)
```

## Code Style

- **Indentation**: tabs
- **Quotes**: single quotes for strings and JSX attributes
- **Components**: named `Props` interface, default export, `'use client'` when needed
- **Imports**: React first, then Next.js, then local `@/` imports

## PostHog

PostHog is initialized in `instrumentation-client.ts` (Next.js 15.3+ pattern). The proxy is configured in `next.config.ts` — all `/ingest/*` requests route through the app to avoid ad blockers.

- Capture user events in **event handlers** (never in `useEffect`)
- Use `posthog.capture('event_name', { ...properties })` directly from `posthog-js`
- Required env var: `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`
- See skill `integration-nextjs-app-router` for the full PostHog integration pattern

## Event Data Shape

Events come from `lib/constants.ts`:
```ts
{ slug: string; image: string; title: string; location: string; date: string; time: string }
```
