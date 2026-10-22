# Deep Dive into Agentic Coding with Codex / Claude

A three-hour **CityJS** hands-on workshop, hosted at Agile Actors. Build a fictional React conference session planner while practising context engineering, spec-driven development, isolated parallel work, MCP, Skills, bounded autonomy, automated validation, review and release.

- [Live attendee workbook](https://cityjs-agentic-coding-attendees.shivaylamba.chatgpt.site/)
- [Finished reference demo](https://cityjs-agentic-coding-attendees.shivaylamba.chatgpt.site/demo/)
- [Download the workshop packet](https://cityjs-agentic-coding-attendees.shivaylamba.chatgpt.site/workshop-packet.zip)
- [Verification evidence](dist/validation.json)

## subagent prompt 

```
We are practising native subagent delegation.

First confirm the project directory and Git branch.
Do not edit, stage, commit, push or deploy anything.

If this session supports native subagents, delegate these
two read-only tasks. If it does not, stop and say so;
do not pretend that two headings are separate agents.

Worker A — scheduling review:
Inspect scheduling and persistence logic plus relevant tests.
Look for a concrete case involving overlaps, consecutive
sessions, unavailable sessions or invalid restored selections.
Do not edit files or run browser tests.

Worker B — keyboard accessibility review:
Inspect the React controls and existing browser tests.
Review labels, keyboard activation, focus behaviour and feedback.
Distinguish code-level concerns from observed browser failures.
Do not edit files or run browser tests.

Give each worker only the relevant files and requirements.
Ask them to return at most two actionable findings:
- File and line.
- Trigger and expected versus actual behaviour.
- Evidence, or explicitly what remains unverified.
- Smallest suggested verification.

Use at most two subagents, with no nested delegation.
Do not have workers install packages or start servers.

As the lead, combine the reports, remove duplicates and
verify the strongest finding yourself using existing checks.
Run checks sequentially.

Do not invent a defect if none is supported.
Return one final report:
1. What each worker investigated.
2. Confirmed findings.
3. Unverified concerns.
4. Actual checks run.
5. Whether any files changed
```

## Initial AGENTS.md

# Project instructions

We are building a fictional CityJS session planner.

- Use React, TypeScript and Vite.
- This app creates a personal agenda; it does not reserve seats.
- Keep scheduling rules separate from React components.
- Every interactive control must work with the keyboard.
- Run relevant checks after changing code.
- Report failed or unrun checks honestly.
- Do not build application code until asked.


# Lab 5 - prompt 

```
Prepare the component interfaces for filters and favorites.
Do not implement the features yet.

Keep the contracts in src/types.ts:

FilterValue:
- query: string
- room: string

FiltersProps:
- value: FilterValue
- onChange(next: FilterValue): void

FavoritesProps:
- count: number
- only: boolean
- onOnlyChange(next: boolean): void

Ensure typed placeholder components exist at:
- src/features/Filters.tsx
- src/features/Favorites.tsx

Record the contracts in docs/plan.md.

The integrator owns App.tsx, shared types,
persistence, package files and lockfile.
Run typecheck.:
```

## Attendees: start here

Read the guide's prework. Use Codex **or** Claude Code; access to both is not required. Install Node 24 LTS, npm, Git, an editor and the Playwright browser before the session. Your coding agent needs authenticated access. The React app itself needs **no model API key**.

Start the exercises in an **empty repository**, using [lab 01](materials/labs/01.md). The completed reference in this repo is a recovery aid, not the empty starter. Each lab includes decisions to make, an editable task prompt, a failure experiment, evidence to collect and a recovery path.

## Three-hour sequence

| Clock | Lab | Minutes |
|---|---|---:|
| 09:00–09:10 | Opening and target-app demo | 10 |
| 09:10–09:25 | [01 · Project context](materials/labs/01.md) | 15 |
| 09:25–09:45 | [02 · Acceptance criteria and plan](materials/labs/02.md) | 20 |
| 09:45–10:10 | [03 · Verified React slice](materials/labs/03.md) | 25 |
| 10:10–10:30 | [04 · MCP and Skills](materials/labs/04.md) | 20 |
| 10:30–10:40 | Break | 10 |
| 10:40–11:05 | [05 · Parallel worktrees](materials/labs/05.md) | 25 |
| 11:05–11:20 | [06 · Guided versus bounded autonomy](materials/labs/06.md) | 15 |
| 11:20–11:40 | [07 · Review, regression tests and CI](materials/labs/07.md) | 20 |
| 11:40–11:55 | [08 · Deployment and hosted checks](materials/labs/08.md) | 15 |
| 11:55–12:00 | Debrief | 5 |
| **Total** | **Eight labs, opening, break and close** | **180** |

## Run the guide locally

```sh
git clone https://github.com/shivaylamba/cityjs-agentic-coding-workshop.git
cd cityjs-agentic-coding-workshop
python3 -m http.server 3260 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:3260. Notes, prompts and progress work locally; saved progress belongs to that browser origin.

## Run the complete reference app

```sh
cd materials/reference
npm ci
npm run check
npx playwright install chromium
npm run test:e2e
npm run dev
```

Use the Local URL printed by Vite. The reference includes all later features: agenda, conflict prevention, safe local persistence, filters, favorites and export. Using it does not prove you independently completed each exercise.

## Verify the entire package

From the repository root:

```sh
npm ci
npm --prefix materials/reference ci
npx playwright install chromium
npm run verify
```

This runs JavaScript syntax checks, TypeScript, domain tests, the reference production build, content/clock/link/packet checks, seven reference browser tests and seven guide browser tests. Browser tests run with **one worker**. GitHub Actions repeats this workflow from a fresh checkout.

Native Skill discovery, MCP retrieval, coding-agent inference and hosting access depend on your installed client/account. See the evidence report for the exact rehearsed scope and remaining gaps. No check claims that every possible generated app or attendee deployment is correct.

## Source layout

- `materials/labs/`: eight attendee handouts.
- `materials/templates/`: context, spec, plan, Skill, CI, scorecard and release templates.
- `materials/reference/`: complete React recovery application, fixture and tests.
- `dist/`: published attendee guide, downloads and compiled reference demo.
- `content.json`: attendee-only lab content.
- `build.py`: prepares the attendee packet and reference-demo assets.
- `tests/guide/` and `scripts/check-content.py`: guide/content validation.

After editing content, run `python3 build.py`. After changing the reference, rebuild it. Run `python3 build.py` to refresh attendee downloads, then verify. Public GitHub and the hosted Site must be published from the same reviewed source.

## Scope

The programme is fictional. Local storage is browser-local, not cloud sync. This app does not reserve seats, authenticate users, make payments or provide production operations. The workshop teaches reliable engineering habits and a verified demo release; a real booking service needs additional backend, security, privacy, monitoring and operational work.

Keep secrets out of source, screenshots and the frontend. Use normal agent permission controls. At most two agent sessions; one browser worker; use sequential tasks on a smaller laptop.
