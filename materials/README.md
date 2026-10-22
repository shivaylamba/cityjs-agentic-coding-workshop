# CityJS — Agentic Coding workshop packet

Three hours; eight labs. Start in a genuinely empty repository for the main path.
The labs describe outcomes and experiments. They are not 1–2-line TODO patches.
Choose at least one product decision and acceptance example yourselves.

templates/ contains context, spec, plan, Skill, scorecard and release evidence examples.
The .txt extension prevents example instruction/Skill files from being loaded as instructions
in an unintended project. Copy their contents into the paths shown by each lab.
The reference/ app is a COMPLETE recovery solution, including later features; use it
in a separate folder if blocked. It is not the empty starter and must not be represented
as evidence of having built each exercise. The host can demo it before the workshop.

Reference run: cd reference; npm ci; npm run check; npm run dev.
Browser checks: npx playwright install chromium; npm run test:e2e.
No model key is required by the app. Your coding agent needs its own authenticated access.

This app uses fictional sessions and browser-local storage. It does not book seats,
sync to other devices, authenticate users, or demonstrate production operations.
Use the guide's hosted smoke checks before claiming any attendee deployment succeeded.
The packet itself does not provision accounts, publish a GitHub repo, or deploy an attendee app.
