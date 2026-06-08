# BakerstreetRPG

**BakerstreetRPG** is a Sherlock Holmes detective game platform in a Victorian Gaslight-Noir style.

The player takes the role of Sherlock Holmes and investigates cases through free text input, deterministic evidence triggers, a Watson-style narrative AI layer, case progress, evidence tracking, locations, suspects, and a final verdict system.

The long-term goal is not just a single *A Study in Scarlet* game, but a reusable platform for multiple Sherlock Holmes cases, novels, chapters, and short stories.

---

## Current Status

The current playable case is:

**Eine Studie in Scharlachrot**
based on *A Study in Scarlet* by Arthur Conan Doyle.

The app currently includes:

* a Victorian / Gaslight-Noir visual design
* a splash screen and case selector
* free text investigation input
* Watson-style AI narration
* deterministic evidence triggers
* evidence cards
* suspect and casefile panels
* locations
* investigation phase progress
* verdict / accusation overlay
* score panel
* ambient audio options
* optional text-to-speech
* local save state via `localStorage`
* JSON-based case loading
* basic registry support for future multi-case structure
* GitHub Pages-compatible deployment

The latest visual sprint added:

* SH wax-seal signet
* investigation phase stepper
* asservat / dossier-style evidence cards
* clearer narrative message voices
* more dramatic verdict / score presentation
* Gaslight-Noir polish based on Claude Design reference material

---

## Project Goals

BakerstreetRPG aims to become a local-first detective game platform for Sherlock Holmes stories.

Core goals:

* keep the game playable as a lightweight web app
* use deterministic game logic for evidence and progress
* use AI only for narration, atmosphere, and flexible Watson responses
* support multiple cases through JSON files
* keep case facts grounded in canonical source material
* make the app deployable on GitHub Pages
* avoid frameworks, build steps, and server dependencies
* support later source-to-case workflows for public-domain Holmes texts

---

## Architecture

BakerstreetRPG follows the Single-File App principles used in Kerim’s local-first app ecosystem.

The production app is intentionally simple:

* `index.html`
* Vanilla JavaScript
* inline CSS
* no React
* no framework
* no build step
* `localStorage` persistence
* static JSON case files
* GitHub Pages deployment

The app keeps a strong separation between:

* **Case data** — canonical facts, evidence, locations, suspects, phases
* **Runtime state** — found evidence, visited locations, hints used, progress
* **Narration** — Watson-style AI or scripted responses
* **UI** — Victorian game interface
* **Future sync / persistence** — planned, but not required for current play

---

## Repository Structure

Expected structure:

```text
.
├─ index.html
├─ manifest.json
├─ sw.js
├─ cases/
│  ├─ registry.json
│  └─ study-in-scarlet.json
├─ docs/
│  ├─ design/
│  │  └─ gaslight-noir/
│  │     ├─ README.md
│  │     ├─ Design-Handoff.html
│  │     └─ prototype/
│  │        ├─ Prototyp.html
│  │        └─ proto/
│  │           ├─ styles.css
│  │           ├─ data.js
│  │           ├─ icons.jsx
│  │           ├─ screens.jsx
│  │           ├─ overlays.jsx
│  │           └─ app.jsx
│  ├─ prompts/
│  │  └─ codex-visual-identity-sprint-1.md
│  └─ handoffs/
└─ AGENTS.md
```

Important distinction:

* `index.html` is the real app.
* `docs/design/gaslight-noir/Design-Handoff.html` is design specification material.
* `docs/design/gaslight-noir/prototype/` is visual reference only.
* Prototype React / JSX code must not be copied into the production app.

---

## Running Locally

Because the app loads local JSON case files, run it through a local web server.

Example with Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Do not open `index.html` directly with `file://` if you want JSON loading to work reliably.

---

## Deployment

The app is designed for GitHub Pages.

A simple deployment can serve the repository root directly:

```text
index.html
manifest.json
sw.js
cases/
```

The app does not require a backend for the current local-first mode.

---

## API / AI Modes

The current app can use an API key for AI narration.

The intended direction is:

### Demo Mode

No API key required.

The app should remain playable with deterministic triggers, scripted Watson responses, hints, evidence logic, and case progress.

### Own API Key Mode

The player can enter their own API key in the settings.

The key should stay local in the browser and must not be committed to the repository.

Possible future provider options:

* OpenAI-compatible API
* OpenRouter-compatible API
* DeepSeek-compatible API
* other OpenAI-style chat completion endpoints

### Hosted Mode

A later optional mode could use a small backend or proxy, but this is not part of the current static GitHub Pages architecture.

Important rule:

**Never hardcode a private API key in `index.html` or any repository file.**

---

## Current Case System

The embedded and external case data model currently includes:

* case ID
* title
* year
* victim information
* evidence
* evidence triggers
* locations
* suspects
* investigation phases
* solution
* Watson persona
* hint material

The current case system supports deterministic evidence discovery through:

* player text keywords
* current location
* trigger type
* evidence prerequisites
* phase progression

The AI narrator may describe events, but the canonical truth of the case should remain in the case data.

---

## Known Technical Debt

The current app is playable, but several areas still need cleanup.

### Registry / Multi-Case

The registry can list future cases and novels, but some Roman index files are still missing. This may cause visible `404` console errors for planned-but-not-yet-existing files.

Planned cleanup:

* handle missing `cases/<roman>/index.json` defensively
* avoid noisy console errors for locked or future cases
* clarify the convention for novels, chapters, and collections

### Global Save State

The current local state is still effectively global.

Future multi-case support should isolate saves by case ID.

Planned direction:

```text
savesByCaseId[caseId]
```

or an equivalent structure.

### Hardcoded Verdict Suspects

The verdict dropdown is currently still partly hardcoded.

Future direction:

* render verdict suspects from `CASE.suspects`
* keep fallback handling for incomplete case data
* avoid per-case HTML edits

### Legacy Audio Code

Some legacy audio functions may still exist alongside the newer music overlay.

Future cleanup:

* remove unused audio paths
* keep procedural audio, local audio, and YouTube embed behavior clear
* avoid references to removed DOM elements

---

## Planned Roadmap

Near-term candidates:

1. **Visual Polish 1.1**

   * refine splash / case selector
   * improve dossier and suspect cards
   * compact mobile verdict view
   * small spacing and typography pass

2. **Registry 404 Cleanup**

   * prevent noisy missing Roman index errors
   * clarify locked / future cases
   * improve loader feedback

3. **Case Identity & Multi-Case Save Isolation**

   * consistent case IDs
   * per-case save state
   * safer fallback behavior
   * clearer case loading model

4. **Dynamic Verdict Suspects**

   * generate verdict choices from `CASE.suspects`
   * remove hardcoded suspect dropdown options

5. **Co-Pilot Evidence Dependency Mode**

   * read found evidence, current location, current phase
   * understand `requires` dependencies
   * give spoiler-safe Watson hints or optional input suggestions

6. **Scripted Events / Core Events**

   * model mandatory narrative beats
   * support chapter-based progression
   * avoid relying purely on free input for key story moments

7. **Source-to-Case Pipeline**

   * use public-domain Sherlock Holmes source texts
   * split books into chapters based on existing table of contents
   * extract chapter-level places, characters, evidence, events, and dependencies
   * validate chapter overlap and spoiler boundaries
   * generate reviewed case JSON files

---

## Source-to-Case Direction

Long-term, BakerstreetRPG can use public-domain Sherlock Holmes texts as structured source material.

Preferred workflow:

```text
source text
→ chapter files
→ chapter analysis
→ case/chapter JSON proposals
→ validation
→ reviewed game case files
```

The app itself should not parse full books at runtime.

The source pipeline should remain outside the production game loop.

---

## Design References

The Gaslight-Noir redesign was prepared with Claude Design and stored under:

```text
docs/design/gaslight-noir/
```

Reference priority:

1. `Design-Handoff.html` — design specification
2. `prototype/proto/styles.css` — visual pattern reference
3. `prototype/proto/icons.jsx` — SVG / ornament reference
4. `prototype/proto/screens.jsx` and `overlays.jsx` — screen structure reference
5. `prototype/proto/data.js` — dummy content only
6. `prototype/proto/app.jsx` and `Prototyp.html` — clickable prototype only

Do not treat the prototype as production architecture.

---

## Development Rules

When editing the app:

* keep the production app Vanilla HTML / CSS / JS
* avoid frameworks and build steps
* preserve existing IDs and event hooks unless explicitly changing them
* do not change save/load/sync behavior during visual sprints
* do not mix design polish with registry or persistence changes
* validate JavaScript syntax after edits
* test the app in browser after meaningful changes
* check both desktop and mobile layouts

Useful checks:

```bash
git diff --check
```

If Node.js is available, run a JS syntax check appropriate for the edited script.

---

## Security Notes

Do not commit:

* API keys
* tokens
* secrets
* private credentials
* user save data

API keys entered in the app should remain local to the browser.

The app should be playable in a demo mode without requiring a private key.

---

## License / Source Material

This project is a fan-made, educational, local-first game experiment based on public-domain Sherlock Holmes material.

Before including any text, translation, illustration, or audio asset, verify that the specific edition or asset is legally usable for this repository.

Arthur Conan Doyle’s original Sherlock Holmes texts are suitable as a long-term source direction, but individual editions, translations, illustrations, and prepared digital files may have their own licensing conditions.

---

## Current Project Focus

The immediate project focus is:

**Visual Polish 1.1 · Prototype-Parity Cleanup**

This sprint should only improve visual polish and must not change game logic, registry loading, save state, or sync behavior.

After that, the project should return to:

**Registry cleanup and multi-case architecture.**
