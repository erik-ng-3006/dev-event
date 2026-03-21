<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your DevEvent Next.js 16 App Router project.

## Summary of changes

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side via the Next.js 15.3+ instrumentation API. Includes exception capture for error tracking and debug mode in development.
- **`next.config.ts`** (updated): Added reverse proxy rewrites so PostHog requests route through `/ingest`, reducing the chance of being blocked by ad blockers.
- **`.env.local`** (new): Created with `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.
- **`components/ExploreBtn.tsx`** (updated): Captures `explore_events_clicked` when the user clicks the "Explore Events" button.
- **`components/EventCard.tsx`** (updated): Added `'use client'` directive and captures `event_card_clicked` with event metadata (title, slug, location, date) when a user clicks an event card.

## Events instrumented

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" button on the homepage | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks a featured event card; includes `event_title`, `event_slug`, `event_location`, `event_date` properties | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard** — [Analytics basics](https://us.posthog.com/project/351309/dashboard/1384216)
- **Insight** — [Event Engagement Overview](https://us.posthog.com/project/351309/insights/bVzxCr28): Daily trend of both events side-by-side
- **Insight** — [Discovery to Click Conversion Funnel](https://us.posthog.com/project/351309/insights/wzuZt7dS): Funnel from Explore button → Event Card click
- **Insight** — [Most Popular Events](https://us.posthog.com/project/351309/insights/z18hgjg5): Bar chart of most-clicked events broken down by event title
- **Insight** — [Weekly Active Users Engaging with Events](https://us.posthog.com/project/351309/insights/pdIAkm3x): Weekly unique users clicking event cards

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
