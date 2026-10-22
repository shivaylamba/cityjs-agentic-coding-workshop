---
name: release-check
description: Inspect a release candidate and produce an honest report of diff review, validation results, missing checks and release blockers. Use before a local handoff or proposed release.
---

Read AGENTS.md and docs/spec.md. Identify the candidate commit and dirty files.
Read package.json to discover the actual checks. Expected: typecheck, test, build,
and test:e2e. Missing commands are blockers, not permission to invent success.
Inspect the diff for acceptance regressions and unexpected scope changes.
Run the checks that exist, with a single browser worker. Record exact commands,
exit status and failed assertions. If a command cannot run, mark NOT RUN and why.
Do not edit tests or application code while evaluating the candidate.
Write docs/release-evidence.md with commit SHA, dirty state, each check result,
browser observations actually made, unresolved findings, and a release decision.
Changes after validation invalidate the affected evidence; request a rerun.
Do not push, merge, deploy or promote a deployment. Prepare a reviewable report.
Report BLOCKED when a required check fails or was not run. No invented badges.
