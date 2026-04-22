# ToolsKit.tech

**Live site**: https://toolskit.tech

Free online tools — image compression, QR generator, PDF/image converters, calculators (SIP, FD, PPF, EMI, BMI, Age), unit/currency/crypto converters, and more. Built with TanStack Start (SSR) on Cloudflare Pages.

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
bun install

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
- Output directory: `.output/public`
- Compatibility flag: `nodejs_compat`

## Repo Sync (GitHub Actions)

Every push to `main` in the source (Lovable) repo is automatically mirrored to the hosting repo's `blogs` branch via `.github/workflows/sync.yml`.

**Setup required (one-time):**

1. Create a GitHub Personal Access Token (Fine-grained or Classic) with **Contents: Read & Write** on the hosting repo `amit-kumar-saini1/toolskit.tech`.
2. In **this** (source) repo, go to **Settings → Secrets and variables → Actions → New repository secret**.
3. Name it `HOSTING_REPO_PAT` and paste the token value.
4. Done — next push to `main` will trigger sync. You can also run it manually from the **Actions** tab → *Sync to Hosting Repo* → *Run workflow*.

The workflow uses `rsync --delete` so the hosting `blogs` branch always mirrors the source repo exactly (excluding `.git` and the workflow file itself).

## License

© ToolsKit.tech — All rights reserved.
