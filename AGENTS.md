# AGENTS.md — BakerstreetRPG

## Project

BakerstreetRPG is a Sherlock-Holmes detective game as a Single-File HTML app.

The production app is intentionally simple:
- Vanilla HTML/CSS/JavaScript
- no React
- no framework
- no build step
- localStorage-based
- GitHub Pages compatible

## Production Files

The live app is primarily:

- `index.html`
- `manifest.json`
- `sw.js`
- `cases/`

Treat these files as production files.

## Architecture Rules

- Keep the production app Vanilla HTML/CSS/JavaScript.
- Do not introduce React, Babel, a bundler, or a framework.
- Do not change save, load, localStorage, export/import, case-loading, registry, or sync logic unless the task explicitly asks for it.
- Do not store API keys, tokens, secrets, or credentials in repo files.
- Preserve existing IDs, classes, and event hooks unless a task explicitly asks for a change.

## Design Reference Rules

Design materials may live under:

- `docs/design/`

These materials are reference material, not production architecture.

If a Claude Design prototype is added under `docs/design/gaslight-noir/prototype/`, treat it as visual reference only.

Do not copy React/Babel/prototype shell code into the production app.

Translate useful visual patterns into the existing Single-File Vanilla app.

## Current Design Direction

The current visual design direction is:

- Gaslight Noir
- Victorian detective dossier
- Baker Street / Holmes / Watson atmosphere
- paper, ink, wax seal, evidence cards, case file, verdict drama
- strong game feel without sacrificing readability

## Current Design Sprint Scope

The planned Visual Identity Sprint should focus only on:

1. Wax-seal signet
2. Phase stepper
3. Evidence cards as asservat/dossier cards
4. Distinct narrative message voices
5. Verdict drama light variant

## Out of Scope

Do not implement in the first visual sprint:

- interactive London map
- deduction pinboard with strings
- Paget illustration pipeline
- full verdict portrait-grid rewrite
- new game systems
- case registry changes
- save-system changes
- Gist sync changes
- framework migration

## Validation

After code edits in future implementation sprints:

- Run a JavaScript syntax check.
- Open the app locally.
- Test splash/case start.
- Test chat input.
- Test evidence display.
- Test phase/progress display.
- Test verdict flow.
- Check desktop and mobile layout.
