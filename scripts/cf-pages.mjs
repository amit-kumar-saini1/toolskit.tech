// Post-build: prepare dist/client for Cloudflare Pages (Advanced Mode).
// TanStack Start emits dist/client (static) + dist/server/server.js (Worker).
// Cloudflare Pages will serve dist/client/ and run _worker.js for SSR.
import { copyFileSync, existsSync, mkdirSync, cpSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

const root = resolve(process.cwd());
const clientDir = resolve(root, "dist/client");
const serverFile = resolve(root, "dist/server/server.js");
const serverAssetsDir = resolve(root, "dist/server/assets");

if (!existsSync(serverFile)) {
  console.error("[cf-pages] dist/server/server.js not found — did vite build run?");
  process.exit(1);
}
if (!existsSync(clientDir)) mkdirSync(clientDir, { recursive: true });

// Copy SSR worker as _worker.js
copyFileSync(serverFile, resolve(clientDir, "_worker.js"));

// Copy server-side dynamic imports (route chunks) so the worker can import them.
if (existsSync(serverAssetsDir)) {
  cpSync(serverAssetsDir, resolve(clientDir, "assets"), { recursive: true });
}

// _routes.json: tell Pages which paths bypass the worker (static assets).
writeFileSync(
  resolve(clientDir, "_routes.json"),
  JSON.stringify(
    {
      version: 1,
      include: ["/*"],
      exclude: [
        "/assets/*",
        "/favicon.ico",
        "/favicon-32x32.png",
        "/apple-touch-icon.png",
        "/android-chrome-192x192.png",
        "/og-logo.png",
        "/placeholder.svg",
        "/robots.txt",
        "/ads.txt",
        "/_redirects",
      ],
    },
    null,
    2,
  ),
);

console.log("[cf-pages] _worker.js + _routes.json written to dist/client/");
