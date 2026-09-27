# AGENTS.md

Conventions for this static site (ModDongGam). Plain HTML/CSS/JS, no build step,
no framework, no dependencies. Cloudflare auto-deploys `main`.

## Card categories

`index.html` groups cards into two sections, each marked with `data-game-section`
and holding its own `[data-game-count]` counter:

| Section | id | Counter noun | Badge |
|---|---|---|---|
| Latest MOD Games | `#games` | `data-noun="game"` | `<span class="cat-badge">🎮 Game</span>` |
| MOD Apps & Utilities | `#apps` | `data-noun="app"` | `<span class="cat-badge">📱 App</span>` |

When adding a new game or app, decide the category first, then place the card:

- **Game** — anything played interactively: arcade, racing, shooter, RPG,
  sandbox, battle royale, party, strategy.
- **App** — anything used rather than played: streaming, entertainment, social,
  productivity, photo/video, utilities, launchers, AI tools.

Put the card in the matching section, add the matching `cat-badge` inside the
`.game-thumb` (next to the existing `.badge` "MOD" mark), and update the
section's counter text. Never mix categories in one section.

## Search

`assets/js/main.js` filters `[data-game-card]` globally, then recounts and hides
each `[data-game-section]` independently, so a query matching only one category
never leaves an empty heading. Keep `data-title` and `data-tags` accurate —
they are the only thing the search reads.

## Conventions

- Brand name is `ModDongGam`; domain is `modongam.eu.cc`; contact is
  `support@modongam.eu.cc`. Update all four together if they ever change.
- Copy is in `<title>`, meta description, `og:`/`twitter:` tags and JSON-LD.
  A content change usually means the same change in all of them.
- Download links are `rel="sponsored noopener"` because the exe.io/Buzzheavier
  mirrors are monetised.
- Files are UTF-8 without BOM. Preserve that when editing.
- Commit and push to `main`; it deploys automatically.
