# BakerstreetRPG · Gaslight Noir Design Reference

This folder contains Claude Design reference material for a planned visual redesign of BakerstreetRPG.

## Purpose

The goal is to improve the visual identity of BakerstreetRPG without changing the app architecture.

Design direction:

- Gaslight Noir
- Victorian detective dossier
- Sherlock Holmes / Watson atmosphere
- paper, ink, wax seal, evidence cards, case file, verdict drama
- more game feel, while keeping strong readability

## Important Rule

This folder is reference material only.

The production app remains:

- `index.html`
- Vanilla JavaScript
- no React
- no Babel
- no framework
- no build step

If a clickable Claude Design prototype is placed in `prototype/`, it must not be copied into the production app as code.

Use the prototype only to understand visual patterns and interaction intent.

## Expected Files To Add Later

Manually place the Claude Design files here later:

```text
docs/design/gaslight-noir/
├─ Design-Handoff.html
└─ prototype/
   ├─ Prototyp.html
   └─ proto/
      ├─ styles.css
      ├─ data.js
      ├─ icons.jsx
      ├─ screens.jsx
      ├─ overlays.jsx
      └─ app.jsx
```

## How Codex Should Use This Folder

Priority order:

1. `Design-Handoff.html` is the design specification.
2. `prototype/proto/styles.css` is visual pattern reference.
3. `prototype/proto/icons.jsx` may be used as SVG/ornament reference.
4. `prototype/proto/screens.jsx` and `prototype/proto/overlays.jsx` may clarify visual structure.
5. `prototype/proto/data.js` is dummy content only.
6. `prototype/proto/app.jsx` and `Prototyp.html` are not production code.

## Planned MVP Visual Changes

1. Wax-seal signet
2. Phase stepper
3. Evidence cards as asservat/dossier cards
4. Distinct narrative message voices
5. Verdict drama light variant

## Parked Ideas

These ideas are intentionally not part of the first visual sprint:

* interactive London map
* deduction pinboard with strings
* full Paget illustration pipeline
* full verdict portrait-grid rewrite
* large animations
* new asset pipeline
