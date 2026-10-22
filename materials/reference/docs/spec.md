# CityJS Session Planner — example approved spec

Use fictional sessions on one conference day, in Europe/Athens local clock time.
Times are integer minutes from midnight. Display HH:MM without timezone conversion.
This is a personal agenda, not a booking or seat reservation service.

## Acceptance criteria

- AC1: Render every valid fixture session with stable ID, title, room, times and availability.
- AC2: Add/remove a session. Reject duplicate IDs and full sessions; a rejection preserves the agenda.
- AC3: Reject overlapping selections even in different rooms. Use half-open intervals:
  a.startMinute < b.endMinute && b.startMinute < a.endMinute.
  Back-to-back sessions are allowed. Invalid intervals cannot be selected.
- AC4: Reload preserves valid selections and favorites in this browser only. Corrupt,
  stale, full, duplicate or conflicting stored selections are repaired or ignored.
  A storage access error must not crash the app. No cross-device sync claim.
- AC5: Title search and room filtering compose with AND. A no-results state is visible.
- AC6: Toggle favorites independently from the agenda. Favorites-only composes with AC5.
- AC7: Export selected sessions as cityjs-agenda.txt, sorted by start minute then ID,
  preserving exact titles and showing time and room. Empty agenda: message, no download.
- AC8: Keyboard-operable controls, explicit labels, visible add/rejection feedback,
  narrow-screen usability, real validation scripts and hosted smoke-test evidence.

## Frozen feature contracts (approve before parallel work)

Session = { id: string; title: string; room: string; startMinute: number;
endMinute: number; available: boolean }.
FilterValue = { query: string; room: string }.
Filters props: { value: FilterValue; onChange(next: FilterValue): void }.
Favorites props: { count: number; only: boolean; onOnlyChange(next: boolean): void }.
Filter helper: filterSessions(sessions: Session[], value: FilterValue): Session[].
Favorite helper: toggleFavorite(ids: string[], id: string): string[].
One integrator owns App.tsx, shared types, persistence, package files and lockfile.

## Required checks

npm run typecheck; npm test; npm run build; npm run test:e2e.
npm run check combines the first three. Browser tests use one worker.

## Explicit exclusions

Authentication, backend storage, payments, AI runtime features, real programme data,
real availability, real attendees, cloud sync and production operations are out of scope.

## Decisions attendees must make

Choose the conflict message and empty-agenda presentation. Add a ninth acceptance
criterion of your own and implement/test it if time remains. Do not merely copy this spec.
