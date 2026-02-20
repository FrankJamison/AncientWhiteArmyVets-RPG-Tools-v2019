# AncientWhiteArmyVet's RPG Tools v2019

A lightweight, single-page static web app that provides tabletop RPG helper tools for Dungeons & Dragons 5E character creation.

Live preview:

- https://ancientwhitearmyvet2019.fcjamison.com/

This repository is intentionally “low ceremony” (static HTML/CSS/JS) to demonstrate fundamentals: DOM-driven UI, data modeling, algorithmic generation (dice mechanics), and a themed responsive layout.

## Project goals

This project stays intentionally “low ceremony” (plain HTML/CSS/JS) and focuses on understandable, DOM-driven logic.

- Small, reviewable, no-build setup
- Data + logic separation (race data objects consumed by generators)
- Deterministic UI wiring (jQuery + DOM updates)
- Themed responsive layout (Bootstrap + custom CSS)

## Features

### 1) D&D 5E Random Physical Stat Generator

Generates **age**, **height**, and **weight** based on a selected race.

User flow:

1. Choose a race from the dropdown
2. Click **Calculate Characteristics**
3. View:
   - **Racial Stat Ranges** (computed min/max bounds)
   - **Your Stats** (one randomized result)

Implementation highlights:

- Race metadata includes `AdultAge`, `MaxAge`, `BaseHeight`, `HeightModifier`, `BaseWeight`, `WeightModifier`.
- Dice modifiers are represented as strings like `2d10` and parsed at runtime.
- Derived ranges are computed up front (e.g., min/max height and weight) and then displayed.

### 2) D&D 5E Random Ability Generator

Rolls six ability scores using the classic approach:

- **4d6, drop the lowest**, repeated 6 times

Results are displayed two ways:

- **Assigned Abilities:** the six rolls mapped in order to STR/DEX/CON/INT/WIS/CHA
- **Ordered Abilities:** the same six rolls sorted from highest to lowest

### 3) PreGens (Pre-generated Characters)

A curated, static set of pre-generated D&D 5E character cards grouped by class.

Note: some outbound sheet links are historical and may no longer resolve.

## Tech stack

- **HTML5 + CSS3** (static site)
- **Bootstrap** (layout/grid/components)
- **jQuery** (event handling + DOM updates)
- **Google Fonts** (Cinzel / Cinzel Decorative)

No build toolchain is required to run the site.

## Repository layout (developer tour)

Entry point

- `index.html` — page structure, tool sections, script/style includes

Data + generators

- `js/races.js` — the `character` model plus race data objects
- `js/physicalCharacteristics.js` — physical stat generation + rendering
- `js/abilityGenerator.js` — ability rolling + rendering

Styling

- `css/styles.css` — main stylesheet (includes vendor Bootstrap CSS)
- `css/scss/styles.sass` — Sass source (optional; not required to run)

Assets

- `img/` — branding, textures, UI imagery

## Notable implementation details

### Dice parsing + randomization

The physical generator uses dice expressions like `2d8`:

- Split on `d` to get **die count** and **number of sides**
- Roll `dieCount` times via `Math.random()`
- Sum rolls to get the modifier

Weight is calculated using the same approach as the common 5E guidance:

- Height roll determines the height modifier
- Weight = base weight + (height modifier × weight roll)

### Calculated “range” output

The UI intentionally shows both:

- **a range** (min/max) to communicate boundaries to the user
- **a single roll** to provide a concrete output for character creation

### UX & design

- Single-page, section-based layout with anchored navigation
- Themed presentation (textures, gold-on-dark palette, display typography)
- Responsive layout through Bootstrap’s grid system

## Running locally

Primary local URL:

- http://ancientwhitearmyvetsrpgtoolsv2019.localhost/

### Option A: open directly (simplest)

Open `index.html` in a modern browser.

### Option B: serve over HTTP (recommended)

Use any static web server.

If you already have a local web server (IIS/Apache/nginx/etc) mapped to this folder and bound to `ancientwhitearmyvetsrpgtoolsv2019.localhost`, you can simply browse to:

- http://ancientwhitearmyvetsrpgtoolsv2019.localhost/

Example (Python 3)

1. From the project root, start a static server on port 80:
   - `python -m http.server 80 --bind 127.0.0.1`
2. Visit:
   - http://ancientwhitearmyvetsrpgtoolsv2019.localhost/

Note: on Windows, port 80 may require elevated privileges. If you don’t want to run on port 80, use a high port instead (e.g. 8080) and browse to `http://127.0.0.1:8080/`.

### VS Code task

This repo includes a VS Code task in `.vscode/tasks.json`:

- **Open in Browser** — opens http://ancientwhitearmyvetsrpgtoolsv2019.localhost/ in Chrome.

## Common development tasks

### Add a new race to the Physical Stat Generator

You’ll update three places:

1. **Race data:** add a new race object in `js/races.js`
2. **UI dropdown:** add an `<option>` in `index.html`
3. **Mapping:** wire the race name in `prepCharacter(...)` in `js/physicalCharacteristics.js`

### Change ability rolling rules

Update the roller in `js/abilityGenerator.js`.

Common variants:

- Change dice (e.g., `3d6`, `2d6+6`)
- Add reroll rules (e.g., reroll 1s)
- Allow assignment by user choice (instead of fixed STR→CHA order)

## Notes / known improvements

If I were continuing this project today, I’d prioritize:

- **Dependency cleanup:** avoid loading multiple versions of jQuery on the same page.
- **Maintainability:** replace the long `prepCharacter(...)` if/else chain with a data-driven lookup keyed by the `<option value>`.
- **Accessibility:** verify keyboard navigation, focus states, and contrast across the theme.
- **Testing:** add small unit tests for dice parsing and range calculations.

## Disclaimer

This project is fan-made and not affiliated with Wizards of the Coast, D&D Beyond, or any other rights holders. Dungeons & Dragons and related marks are trademarks of their respective owners.
