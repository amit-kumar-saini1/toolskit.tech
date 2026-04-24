# ToolsKit.tech

**Live site**: https://toolskit.tech

Free online tools — image compression, QR generator, PDF/image converters, calculators (SIP, FD, PPF, EMI, BMI, Age), unit/currency/crypto converters, and more. Built with TanStack Start (SSR) on Cloudflare Pages .

## Tech Stack

- **Framework**: TanStack Start v1 (React 19, SSR/SSG)
- **Build tool**: Vite 7
- **Styling**: Tailwind CSS v4 (via `src/styles.css`)
- **UI**: shadcn/ui + Radix
- **Routing**: TanStack Router (file-based, type-safe)
- **Deployment**: Cloudflare Pages (Edge Workers, `nodejs_compat`)

## Local Development

Requires Node.js 20+ and `bun` (or npm).

```sh
# Install
bun install     .

# Dev server (with HMR)
bun run dev

# Production build
bun run build

# Preview production build
bun run start
```

## Project Structure

```
src/
  routes/         # File-based routes (auto-generates routeTree.gen.ts)
  pages/          # Page components imported by routes
  components/     # Reusable UI + layout
  lib/            # Helpers (toolHead, seoData, blogMeta, utils)
  assets/         # Imported images
  styles.css      # Tailwind v4 + design tokens
```

Do **not** edit `src/routeTree.gen.ts` — it is auto-generated.

## Deployment

This project deploys to **Cloudflare Pages**.

- Build command: `bun run build`
- Output directory: `dist/client`
- Compatibility flag: `nodejs_compat`

The build emits a static client bundle plus an SSR worker. A postbuild
script (`scripts/cf-pages.mjs`) copies the SSR worker to
`dist/client/_worker.js` and writes `_routes.json` so Cloudflare Pages
serves static assets directly and routes everything else through SSR.

## Repo Sync (GitHub Actions)

Every push to `main` is automatically mirrored to the `blogs` branch in the   .
**same** repo via `.github/workflows/sync.yml`. Cloudflare Pages (or any other
consumer) can deploy from `blogs` while Lovable continues writing to `main`.

- **No PAT / secret required** — uses the built-in `GITHUB_TOKEN` with
  `contents: write` permission scoped to this repo.
- **Force-push**: `blogs` is always overwritten to match `main` exactly. Do
  **not** commit directly to `blogs`; commits there will be lost on the next
  sync.
- **Manual run**: Actions tab → *Sync main → blogs* → *Run workflow*.

## License

© ToolsKit.tech — All rights reserved.
