# Example task graph

Context → spec → shared Session/FilterValue and feature prop contracts → first slice.
The first slice contains catalog, domain rules, persistence, App and empty feature controls.
At the committed parallel-base:
  Worker A owns Filters.tsx + filter.ts + its test.
  Worker B owns Favorites.tsx + favorites.ts + its test.
They may read but cannot change shared types, App, storage or package files.
Both return their required wiring. Integrator owns App wiring after inspecting both commits.
Then export → review/regression → CI → preview deploy → smoke → production decision.

Per task: acceptance IDs; owned files; prerequisite; contract; checks; return format.
Do not introduce a second state store or change a frozen prop without integrator approval.
