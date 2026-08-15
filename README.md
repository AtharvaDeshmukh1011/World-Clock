# World Clock Dashboard

An advanced real-time world-clock dashboard built with React + Vite. It combines
analog and digital clocks, multi-region timezone management, alarms, and dynamic
UI controls in a single responsive interface with smooth, performance-friendly
animation.

## Features

- Analog (SVG) and digital clocks sharing one shared, tick-synchronized time source
- Add/remove any IANA timezone to a responsive world-clock grid, with UTC offset and zone abbreviation shown per card
- Alarms with labels, per-alarm timezone, enable/disable toggle, and audible (Web Audio) + visual alerts when triggered
- Light/dark theme, 12h/24h time format, and smooth-sweep vs classic-tick second hand — all persisted to `localStorage`
- Pauses its ticking timer when the browser tab is hidden, and respects `prefers-reduced-motion`

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Tech stack

- React 18 + Vite
- Plain CSS (custom properties for theming)
- `Intl.DateTimeFormat` / `Intl.supportedValuesOf` for all timezone math — no external date library
- Web Audio API for alarm tones — no external audio assets
