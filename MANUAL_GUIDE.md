# ToolsKit.tech – Manual Developer Guide (Hindi + English)

Yeh file un sab cheezon ka manual hai jo ab tak Lovable AI se karwaye gaye hain. Agar aap khud (manually) code karna chahein to is guide ko follow karein.

---

## 1. Project Stack

- **Framework:** TanStack Start v1 (React 19 + SSR)
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4 (`src/styles.css`)
- **UI:** shadcn/ui + Radix
- **Routing:** TanStack Router (file-based — `src/routes/`)
- **Deploy:** Cloudflare Pages (branch `blogs` se deploy hota hai; `main` → `blogs` auto-sync GitHub Action se)

Local commands:
```bash
bun install      # dependencies
bun run dev      # dev server (HMR)
bun run build    # production build
bun run start    # preview prod build
```

---

## 2. SSR vs CSR — Kaise pehchanein?

### Default rule
Is project me **har route SSR hai by default**. Server pe HTML render hota hai, fir browser me hydrate hota hai. Fayda: Google ko ready HTML milta hai (SEO + Discover ke liye zaroori).

### Kaise check karein ki ek page SSR hai ya CSR?

**Method 1 — Code dekho:**
File: `src/routes/<route>.tsx`
- `ssr: false` likha hai → **CSR only** (server pe render nahi).
  ```ts
  export const Route = createFileRoute("/example")({
    ssr: false,
    component: Example,
  });
  ```
- `ssr` likha hi nahi hai ya `ssr: true` → **SSR** (default).
- `ssr: "data-only"` → server data fetch karega, HTML client pe render hoga.

**Method 2 — Browser me test:**
1. Page kholo (e.g. `https://toolskit.tech/tools/qr-generator`)
2. Right-click → **View Page Source** (Ctrl+U)
3. Source me actual content (heading, paragraph) dikh raha hai → **SSR**
4. Sirf `<div id="root"></div>` aur scripts dikhe, content nahi → **CSR**

**Method 3 — curl se:**
```bash
curl -s https://toolskit.tech/tools/qr-generator | grep -i "<h1"
```
Text return ho → SSR. Empty → CSR.

### Is project me kya kya SSR hai?
- **Sab tool pages, blog pages, home, about, contact, sitemap** → SSR
- **Ads (`AdBanner`, `AutorelaxedAd`) aur Analytics (`AdSenseLoader`)** → Client-side only (intentional, kyunki AdSense `window` use karta hai)
- **`KbResizePixelTool` jaisa interactive tool** → Component SSR ho jata hai par image processing client (browser canvas) pe hoti hai.

### Kab `ssr: false` use karein?
Sirf jab koi library `window` / `document` ko **import time pe** access kare aur `useEffect` me wrap karna possible na ho. 99% cases me `useEffect` se kaam ho jata hai — `ssr: false` mat lagao warna SEO marr jayega.

---

## 3. Naya Tool Page Banana — Step by Step

Maan lo `/tools/word-counter` banana hai.

### Step 1: Tool ka UI component
File: `src/pages/tools/WordCounter.tsx`
```tsx
import ToolLayout from "@/components/tools/ToolLayout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  return (
    <ToolLayout title="Word Counter" description="Free online word counter.">
      <Card className="p-6">
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} />
        <div className="mt-4 flex gap-6">
          <span>Words: <b>{words}</b></span>
          <span>Characters: <b>{chars}</b></span>
        </div>
      </Card>
    </ToolLayout>
  );
}
```

### Step 2: Route file
File: `src/routes/tools.word-counter.tsx`
(File name me dot `.` = slash → `tools.word-counter` ka URL `/tools/word-counter`)
```tsx
import { createFileRoute } from "@tanstack/react-router";
import WordCounter from "@/pages/tools/WordCounter";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/word-counter")({
  head: () => buildToolHead("word-counter"),
  component: WordCounter,
});
```

### Step 3: SEO metadata
File: `src/lib/seoData.ts` me entry add karo:
```ts
"word-counter": {
  title: "Free Word Counter Online | ToolsKit.tech",
  description: "Free online word counter. Count words, characters, sentences instantly.",
  keywords: "word counter, character counter",
  path: "/tools/word-counter",
  ogImage: "/og-word-counter.jpg",
},
```

### Step 4: Listing me add karo
- `src/pages/AllTools.tsx`
- `src/components/home/ToolsGrid.tsx`

### Step 5: Sitemap
File: `src/routes/sitemap[.]xml.tsx` me `/tools/word-counter` add karo.

### Step 6: Build aur test
```bash
bun run build && bun run start
```
`http://localhost:3000/tools/word-counter` kholo, View Source se SSR confirm karo.

> **Note:** `src/routeTree.gen.ts` apne aap update hoti hai — manually mat chedo.

---

## 4. Naya Blog Post

1. `src/lib/blogMeta.ts` me entry add karo (slug, title, date, excerpt, image, content).
2. Route automatic — `src/routes/blog.$slug.tsx` saare slugs handle karta hai.
3. Sitemap me bhi add karo.

---

## 5. Hidden Page (Sitemap me ho, navigation me na ho)
Example: `/kb-resize-pixel`.

1. `src/routes/<page>.tsx` banao.
2. Header / Footer / ToolsGrid me link **mat** add karo.
3. Sirf `sitemap[.]xml.tsx` me URL add karo.

---

## 6. Ads Manually Add Karna

Setup already done — `AdSenseLoader` site-wide active hai (`src/App.tsx`).

Ek normal ad:
```tsx
import AdBanner from "@/components/AdBanner";
<AdBanner slot="1234567890" format="auto" />
```

High-paying multiplex (autorelaxed):
```tsx
import AutorelaxedAd from "@/components/AutorelaxedAd";
<AutorelaxedAd />
```

**Rules:**
- `<script>` tag JSX me directly mat likho — React strip karega.
- Ads hamesha component ke through (jo `useEffect` use karta hai).
- Ek page pe 3 se zyada ad units mat dalo (AdSense policy).

---

## 7. Google Analytics

- GA4 ID: `G-8FFBL49HVN` (file: `src/components/AdSenseLoader.tsx`)
- Test: site browse karo → GA → **Realtime** report.
- Debug: DevTools Network tab me `collect?v=2` search karo, AdBlock band karo, console me `window.gtag` check karo.

---

## 8. JSON-LD / Structured Data

- Har tool/blog page ke `head()` me `scripts` array me JSON-LD jata hai.
- Test: https://search.google.com/test/rich-results me URL daalo.
- Use ho rahe: `WebSite`, `Organization`, `ItemList`, `BreadcrumbList`, `FAQPage`, `Article`, `SoftwareApplication`.

---

## 9. Deploy Flow

1. `main` branch me commit.
2. GitHub Action (`.github/workflows/sync.yml`) automatic `main` → `blogs` push.
3. Cloudflare Pages `blogs` branch se deploy.
4. 1–2 min me live `https://toolskit.tech`.

---

## 10. Common Pitfalls

| Galti | Result | Fix |
|---|---|---|
| `ssr: false` har route pe | SEO khatam | Hatado, default SSR rakho |
| `localStorage` loader me | SSR crash | `typeof window !== "undefined"` check |
| `<script>` JSX me likhna | React strip karega | `useEffect` + `document.createElement` |
| Hash anchors (`/#about`) | Google index nahi karega | Alag route file banao |
| `routeTree.gen.ts` manually edit | Build break | Mat chedo, auto-generate |
| Same `og:image` har page | Discover boost nahi milega | Per-page unique image |

---

Bas! Is file ko reference ki tarah use karein.
