---
name: on-page-seo-100
description: 100% on-page SEO checklist for new tool/landing pages on toolskit.tech — keyword research, title/meta rules, heading structure, schema markup, internal linking, E-E-A-T, and SEO template. Apply whenever building a new SEO-targeted page.
---

# 100% On-Page SEO Document

Apply every section when creating a new tool or landing page targeted at organic search. Follow the layout pattern of `src/routes/photo-remini.tsx` (uses `SeoToolShell` + `buildPageHead`).

## 1. Keyword Research
- 1 Primary Keyword
- 5–10 Secondary Keywords
- 10–20 Long-Tail Keywords
- Related Questions (People Also Ask)

Use Semrush tools (`semrush--keyword_research`, `semrush--keyword_compare`, `semrush--serp_analysis`) to find low-difficulty (KD < 30), high-volume keywords before writing.

## 2. SEO Title
- Primary keyword at the beginning
- 50–60 characters
- Add a number or power word (Free, Best, 2026)

## 3. Meta Description
- 140–160 characters
- Include primary keyword
- End with a CTA

## 4. URL Structure
- Good: `/compress-image-to-50kb`
- Bad: `/page?id=123`

## 5. Heading Structure
- One H1 (contains primary keyword)
- 5–10 H2 sections
- H3 under H2 for FAQs / sub-topics

## 6. Content
- 1500–3000 words
- Primary keyword density 1–2 %
- Secondary keywords used naturally
- Lists, tables, examples, FAQs

## 7. Image SEO
- Descriptive `alt` text with the primary keyword
- WebP/JPG, compressed
- Filename: `compress-image-to-50kb-hero.jpg`
- Set explicit `width`/`height`, `loading="eager"` only for the LCP/hero

## 8. Internal Linking
Link to related tools, related blog posts, and the homepage.

## 9. FAQ Section
At least 5–10 FAQs rendered as H3 + paragraph AND embedded in FAQPage JSON-LD.

## 10. Schema Markup (must include)
- `SoftwareApplication` (with offers price 0 + aggregateRating)
- `FAQPage`
- `BreadcrumbList`
- `WebPage` (with author, datePublished, dateModified)

## 11. Technical SEO
- Mobile friendly, HTTPS, fast load (<2 s)
- Page added to `src/routes/sitemap[.]xml.tsx` `STATIC_PAGES`
- Canonical URL via `buildPageHead({ path })`
- Robots: `index, follow, max-image-preview:large`

## 12. E-E-A-T Signals
At the bottom of every SEO page show: Author name, Last updated date, links to About / Contact / Privacy.

## 13. Implementation Template
Copy `src/routes/photo-remini.tsx` and `src/routes/compress-image-to-50kb.tsx` as the canonical layout. Required pieces:

1. `createFileRoute("/<slug>")` with `head()` returning `buildPageHead(...)` plus appended JSON-LD scripts (SoftwareApplication + FAQPage + BreadcrumbList + WebPage).
2. `<SeoToolShell h1 subtitle tool content currentPath />` wrapper.
3. Hero `<figure>` with eager-loaded image, alt text containing primary keyword.
4. H2 sections: What Is · Why You Need · How to Use (steps) · Best Settings / Use Cases · How It Works · vs Other Tools · Privacy · Who Uses · FAQs · Try More Tools.
5. Internal links to at least 5 other tool routes.
6. Add the new path to `STATIC_PAGES` in `src/routes/sitemap[.]xml.tsx` AND to `src/components/home/ToolsGrid.tsx` + `src/pages/AllTools.tsx`.
7. E-E-A-T footer line with author + last updated.

## SEO Template Fill-In
```
Page Name:
Primary Keyword:
Secondary Keywords: 1. 2. 3. 4. 5.
Long Tail Keywords: 1.-10.
People Also Ask: 1.-5.
SEO Title:
Meta Description:
URL:
H1:
H2s: 1.-5.
FAQs: 1.-5.
```