# Design Language: "Frost"

A light glassmorphism system on an Apple-like canvas. All tokens and
semantic classes are defined in `styles/globals.css`. This document is
the reference for how to compose them.

## Principles

1. **One canvas, two materials.** The page background is a flat light
   gray (`#f5f5f7`). **Glass** (translucent, blurred, saturated) is for
   chrome and cards; **paper** (opaque white) is for long-form reading.
   Never put article body text on glass.
2. **Depth comes from light, not borders.** Cards use a barely-visible
   border (`black/5`), a faint shadow (`shadow-sm shadow-black/5`), and
   a top-left "shine" gradient. Never heavy borders or dark shadows.
3. **Color appears only as decoration — with one exception.** Tinted
   gradient washes and soft blurred "glow blobs" live _behind_ glass
   surfaces at low opacity. Text and controls stay neutral (ink /
   neutrals). The single functional color is the dusty-rose brand
   accent `highlight` (`#eecfcf`): link highlighter, focus rings,
   text selection.
4. **One column.** All content lives in a single 720px column
   (`max-w-content`), centered.

## Tokens (`@theme` in globals.css)

| Token               | Value                    | Usage                                                   |
| ------------------- | ------------------------ | ------------------------------------------------------- |
| `white-readable`    | `#f5f5f7`                | Page canvas (`body`), light text on ink                 |
| `black-readable`    | `#1d1d1f`                | Primary ink, solid button fill                          |
| `secondary`         | `#f6f6f6`                | Hover wash (`secondbg`)                                 |
| `highlight`         | `#eecfcf`                | Brand accent: article links, focus rings, `::selection` |
| `container-content` | `720px`                  | `max-w-content` — the single column                     |
| `font-title`        | Lato                     | UI chrome: headings, nav, buttons, post titles          |
| `font-article`      | Fira Sans + Noto Sans SC | Article body, summaries                                 |
| `font-mono`         | JetBrains Mono           | Code, tags                                              |
| `font-sans`         | Fira Sans system stack   | Default                                                 |

**Gray scale: `neutral` only.** The canvas/ink are pure grays; never
use Tailwind's `gray`/`slate`/`zinc` — their undertones fight the
decorations.

## Radius scale (semantic)

| Class          | Meaning                                                 |
| -------------- | ------------------------------------------------------- |
| `rounded-md`   | Tightest UI: segmented items, bubble tail corner        |
| `rounded-lg`   | Chips, inline code, small controls                      |
| `rounded-xl`   | Buttons, icon tiles, list items                         |
| `rounded-2xl`  | Inner/nested cards (callout, hover areas)               |
| `rounded-3xl`  | **Primary cards and panels** (default for `glass-card`) |
| `rounded-full` | Avatars, glow blobs                                     |

## Semantic classes (`@layer components`)

Because these live in `@layer components`, any Tailwind utility
overrides them (e.g. `glass-card rounded-2xl p-4 backdrop-blur-sm`).

### Surfaces

- **`glass-card`** — the primary card surface: frosted
  (`bg-white/30` + blur + `backdrop-saturate-150`), rounded-3xl,
  hairline border, soft shadow. Padding is intentionally _not_ baked
  in; set it per instance (`p-4`, `p-6 lg:p-8`, ...).
- **`panel`** — translucent white page container (post list).
- **`paper`** — opaque white reading surface (articles). Rounded-3xl
  from `sm:` up, full-bleed square on mobile.
- **`secondbg`** (`@utility`) — hover wash for clickable rows
  (`group-hover:secondbg`).
- **`primary`** (`@utility`) — plain white rounded-2xl card (footer).

Frosted glass recipe: **blur + `backdrop-saturate-150`**. Saturation
is what makes colors behind the glass feel alive; blur alone just
smears them.

### Card decorations

Compose inside a `glass-card` (or any `relative overflow-hidden`
surface). Order in DOM: tint → blobs → shine → content.

```tsx
<div className="glass-card p-6">
  <div className="glass-tint from-blue-100/30 via-purple-50/20 to-pink-100/30" />
  <div className="glow-blob top-4 left-4 h-24 w-24 from-blue-200/20 to-cyan-200/20 blur-xl" />
  <div className="glass-shine" />
  <div className="relative z-10">{/* content */}</div>
</div>
```

- **`glass-tint`** — full-card gradient wash (`-z-10`). Pick color
  stops inline; keep opacity ≤ 40.
- **`glow-blob`** — blurred gradient circle (`-z-10`). Set position,
  size (`h-* w-*`), gradient stops, and `blur-lg/xl/2xl` inline.
  Larger blob → stronger blur.
- **`glass-shine`** — top-left light sweep, no z-index (sits above the
  card background, below `z-10` content).

Existing tint palettes: blue/purple/pink (WelcomeCard, error page),
red/orange (Series), neutral (QuoteComponent).

### Buttons

- **`btn-glass`** — translucent glass button, subtle lift
  (`scale-[1.02]`) on hover. For actions on glass surfaces.
- **`btn-solid`** — solid ink button. For single primary actions.

### Chat bubbles (MDX `<Dialog>` / `<DialogBack>`)

- **`bubble`** — base iMessage-style bubble (includes tail via
  `::after` and `↗` arrows on links).
- **`bubble-me`** — outgoing: blue gradient, tail bottom-right.
- **`bubble-peer`** — incoming: gray gradient, tail bottom-left.

### Controls

- **`icon-tile`** — 10×10 rounded-xl tile framing a small icon; set the
  gradient inline (`bg-gradient-to-br from-red-500/20 to-orange-500/20`).
- **`segmented`** / **`segmented-item`** + **`segmented-active`** /
  **`segmented-idle`** — segmented control (language switcher).
- **`nav-link`** + **`nav-link-active`** — header navigation links.

### Chrome

- **`header-bar`** — sticky blurred site header.

## Typography conventions

- Headings / UI labels / **post titles**: `font-title`,
  `font-semibold`–`font-bold`, `tracking-tight` for display sizes,
  `tracking-wide` for small labels.
- Body / summaries: `font-article` + `leading-relaxed`.
- UI text sizes: `text-sm` is the default UI size; `text-xs` for
  captions/metadata; `text-lg–3xl` reserved for headings.
- Muted text: `text-neutral-500/600/700`, or `text-black-readable/80`.

## Motion

- Interactions are **calm**: `duration-200`, and lifts never exceed
  `scale-[1.02]` (Depth3D tilt already provides the playfulness).
- Links: `transition-colors duration-150`.
- Hover language: subtle lift (`hover:scale-[1.02]`), increased
  translucency (`hover:bg-white/40`), or the `secondbg` wash — never
  color changes alone.

## Accessibility

- Every interactive element gets a visible keyboard focus ring:
  `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight`.
  This is baked into `btn-glass`, `btn-solid`, `nav-link`, and
  `segmented-item` — add it to anything new that is clickable.

## Rules of thumb

- Reach for a semantic class **before** writing raw utilities. If you
  repeat an inline pattern three times, promote it to
  `@layer components`.
- Keep decorations (`glass-tint`, `glow-blob`) behind content
  (`-z-10`) and content wrapped in `relative z-10` when decorations
  are present.
- Cards inside cards step _down_ the radius scale
  (3xl surface → 2xl inner → xl controls).
- Single-use flourishes (e.g. the quote card's serif quote marks) stay
  inline; the system only covers repeated patterns.
