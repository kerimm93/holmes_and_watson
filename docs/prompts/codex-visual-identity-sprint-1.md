# Codex Prompt · BakerstreetRPG Visual Identity Sprint 1

## Sprint Title

🕯️ BakerstreetRPG: Visual Identity Sprint 1 · Gaslight-Noir Polish

## Goal

Implement a minimal-invasive visual polish sprint for BakerstreetRPG.

The goal is to make the existing app feel more like a Gaslight-Noir Sherlock-Holmes detective game without changing game logic, state management, case loading, save/export/import, or sync behavior.

## Required Reference Material

Before implementing, read:

- `AGENTS.md`
- `docs/design/gaslight-noir/README.md`
- `docs/design/gaslight-noir/Design-Handoff.html` if present

If a prototype exists under `docs/design/gaslight-noir/prototype/`, use it only as visual reference.

## Do Not Use Prototype Code As Production Code

If these files exist:

```text
docs/design/gaslight-noir/prototype/Prototyp.html
docs/design/gaslight-noir/prototype/proto/styles.css
docs/design/gaslight-noir/prototype/proto/data.js
docs/design/gaslight-noir/prototype/proto/icons.jsx
docs/design/gaslight-noir/prototype/proto/screens.jsx
docs/design/gaslight-noir/prototype/proto/overlays.jsx
docs/design/gaslight-noir/prototype/proto/app.jsx
```

then:

* Do not copy React code.
* Do not copy Babel/CDN setup.
* Do not copy prototype app shell.
* Do not import prototype data into the production app.
* Use prototype files only to understand the intended visual direction.

## In Scope

Implement only these five visual changes:

1. Wax-seal signet
2. Phase stepper
3. Evidence cards as asservat/dossier cards
4. Distinct narrative message voices
5. Verdict drama light variant

## Out of Scope

Do not implement:

* interactive London map
* deduction pinboard
* full Paget illustration pipeline
* full verdict portrait-grid rewrite
* new game systems
* case registry changes
* save-system changes
* Gist sync changes
* React/Babel/framework migration

## Implementation Rules

* Work mainly in `index.html`.
* Prefer CSS changes.
* Add markup only if necessary and only minimally.
* Preserve existing IDs/classes/event hooks.
* Do not rename existing selectors.
* Do not change data logic inside render functions.
* Do not change persistence or sync.
* Do not introduce external asset dependencies.
* Use inline SVG only if a visual ornament is needed.
* Keep mobile layout usable.
* Respect reduced-motion preferences if animation is added.

## Validation

After implementation:

1. Run a JavaScript syntax check.
2. Open the app locally.
3. Verify splash/case start.
4. Verify chat input.
5. Verify evidence display.
6. Verify phase/progress display.
7. Verify verdict flow.
8. Verify desktop layout.
9. Verify mobile layout.
10. Confirm no new console errors.

## Expected Result

At the end, report:

* files changed
* selectors changed
* functions touched, if any
* validation result
* any parked or deferred visual ideas
