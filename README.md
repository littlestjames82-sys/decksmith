# Decksmith

**Decksmith** — the cyberdeck design & fabrication studio by **Ghost Developer Studio**.

Decksmith unifies the tools cyberdeck makers, embedded engineers, and field
operators need in one application:

- **Modular Blueprint Studio** — 10-slot hardware stacking (SBCs, ultrawide bar
  displays, mechanical keyboards, battery management, SDR/LoRa, cooling,
  sensors) with a GPIO / I2C / SPI / UART pinout conflict matrix and a one-click
  fabrication dossier export (BOM, pinout allocation, boot config, setup scripts).
- **3D CAD, Enclosure & CNC Studio** — interactive Three.js WebGL viewer,
  exploded assembly view, parametric OpenSCAD enclosure generator with
  laser-cut kerf compensation, and STL / DXF / SVG / G-code exporters.
- **OS Flasher & Modeline Provisioning** — ultrawide bar-display modeline
  injection, cloud-init pre-seeding (Wi-Fi, SSH keys, hostname), and first-boot
  setup scripts.
- **Field Companion & Telemetry HUD** — live CPU / thermal / battery telemetry,
  I2C bus scanner, 9-DOF IMU compass, LoRa mesh packet scope, and a built-in
  self-test.
- **Keyboard Matrix Studio** — ergonomic layout presets (Planck, Corne/Sweep,
  thumbpads), diode-matrix auto-routing for RP2040 / Pro Micro / STM32, QMK /
  KMK / Vial firmware export, and parametric switch-plate generation.
- **Solar & Off-Grid Studio** — daily energy balance, geographic insolation
  modeling, battery chemistry / depth-of-discharge lifetime modeling, and
  autonomy reserve calculation.
- **RF Link Budget Studio** — free-space path loss and link budgets, Fresnel
  zone clearance, radio-horizon line-of-sight, and coax attenuation tables.
- **Thermal Studio** — SoC heat profiles, heatsink / fan convection modeling,
  and junction-temperature estimates.

## Repository layout — please read

This repo's `main` branch is Decksmith's public face and deploy-mirror entry
point, so it stays intentionally lean (this README and the project license).
The full application monorepo — React + Three.js web app, API, Prisma database
package, and the Android app — lives on the deploy branches:

- `render-turso-deploy` — Render + Turso deployment branch
- `netlify-deploy` — Netlify deployment branch
- `vercel-deploy` — Vercel deployment branch

## Trying the app

Prerequisites: Node.js 20+ and pnpm 9+.

```bash
git clone https://github.com/littlestjames82-sys/decksmith.git
cd decksmith
git checkout render-turso-deploy
pnpm install
pnpm prisma generate
pnpm prisma db push
pnpm --filter @decksmith/database seed
pnpm dev
```

## Status

Built: the full studio lineup above ships in the application on the deploy
branches, and an Android build of Decksmith has been packaged for sideloading.

## License

MIT — see `LICENSE`.

## More from Ghost Developer Studio

Ghost Developer Studio builds developer tools, AI-agent safety software, apps,
and websites — and sells by showing working software.

- **Roadmap board** — where every studio product stands, on one page:
  https://github.com/littlestjames82-sys/ghost-roadmaps
- [Agent Seatbelt](https://github.com/littlestjames82-sys/agent-seatbelt) — deterministic guardrails for AI coding agents
- [GhostGuard](https://github.com/littlestjames82-sys/ghostguard) — record-first governance gateway for AI agents
- [Ghost Hands](https://github.com/littlestjames82-sys/ghost-hands) — governed, recorded, replayable agent hands
- [GhostBus](https://github.com/littlestjames82-sys/ghostbus) — agent-to-agent message bus, exposed as an MCP server
- [Ghost Bridge](https://github.com/littlestjames82-sys/ghost-bridge) — MCP bridge + relay for handing tasks between agents
- [GhostChat](https://github.com/littlestjames82-sys/ghostchat) — live chat & omnichannel inbox for small businesses
- [Storefront](https://github.com/littlestjames82-sys/storefront) — one-page websites for trades businesses
