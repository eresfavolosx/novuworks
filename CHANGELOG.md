# Changelog

All notable changes to the Novu Works portfolio are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased] — 2026-10-29

### Fixed
- **3D visualizer blurry on mobile Safari** (`src/canvas3d.js`)
  - Turned off `preserveDrawingBuffer`. It was never used, and it forced Safari onto a slow, blurry compositing path.
  - Raised the mobile render pixel ratio cap from 1.25 to 1.5 for sharper output on Retina iPhones.
  - The particle shader's `uPixelRatio` now uses the renderer's exact DPR. Before, the shader used 2 while the renderer used 1.25, so particles looked oversized and soft.
  - The pixel ratio is recalculated on resize and orientation change.
- **Project splash screens not opening on mobile** (`src/main.js`)
  - Root cause: `window.open` ran after the async splash animation, outside Safari's user-activation window, so mobile Safari blocked it silently.
  - On touch and small screens, the splash now plays and then navigates in the same tab. That can never be blocked, and Back returns to the portfolio.
  - On desktop, the splash opens a new tab as before. If the browser blocks it, the current tab navigates instead.

### Changed
- README: corrected the license badge, tech stack, and Three.js version; aligned metrics with the live site; added the Live Projects table and repository structure.
- Added this `CHANGELOG.md`.
- GitHub metadata: homepage and topics for this repo; descriptions, homepages, topics, READMEs, and CHANGELOGs added across BizPay, Picta, NFC, hackeaporunacausa, and TokenFund.

## [2026-10-25]

### Added
- Unique logos per project; Viva Advertising website link.
- BizPay modernized responsive UI with ATH Móvil Business test integration.
- Cross-subdomain theme sync, subdomain splash descriptions, and Safari intro animation.

### Fixed
- Safari `low-spec-device` backdrop-filter bug; unified light/dark backgrounds.
- Light mode surfaces and contrast across Intel Feed, Dossier, Case Studies, and modals.
- RevOps query output table responsiveness; ultrawide navbar overflow.
- 403 CDN URLs in subdomains; missing i18n keys; defensive WebGL feature detection.

## [2026-10-24]

### Added
- Cinematic 3D particle loading screen; Three.js visualizer isolated to its own secondary screen.
- Automatic dark/light mode from device preference.
- Authentic vector brand logos with adaptive contrast.
- Picta assistive CVD camera; project transition splash screens.
- Adaptive device tiers, intersection-based render pausing, and resource throttling.

### Security
- `upgrade-insecure-requests` CSP, HSTS preload, mixed-content fixes, and NFC client key hardening.
