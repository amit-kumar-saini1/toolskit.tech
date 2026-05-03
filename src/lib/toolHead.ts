import { toolsSEO, getToolStructuredData } from "@/lib/seoData";

const SITE = "https://toolskit.tech";
const BRAND_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/di7j8UAQsIVOsCbK58eG1NP3xrh2/social-images/social-1765097169869-mast logo.png";
const TWITTER_HANDLE = "@AmitSaini184544";

interface MetaTag {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
  charSet?: string;
}

interface ScriptTag {
  type?: string;
  children?: string;
}

interface LinkTag {
  rel: string;
  href: string;
}

export interface RouteHead {
  meta: MetaTag[];
  links: LinkTag[];
  scripts: ScriptTag[];
}

/**
 * Returns a complete TanStack Router head() payload for a tool page,
 * including title/description/keywords, OG + Twitter cards, canonical link,
 * and SoftwareApplication + FAQPage JSON-LD structured data.
 */
export function buildToolHead(slug: string): RouteHead {
  const seo = toolsSEO[slug];
  const url = `${SITE}/tools/${slug}`;

  if (!seo) {
    // Fallback — should not happen for known tools
    return {
      meta: [{ title: "Free Online Tool — ToolsKit.tech" }],
      links: [{ rel: "canonical", href: url }],
      scripts: [],
    };
  }

  const title = seo.title;
  const description = seo.description;
  const ogImage = seo.ogImage ?? BRAND_OG_IMAGE;
  const ogImageAlt = seo.ogImageAlt ?? title;

  const softwareSchema = getToolStructuredData(
    slug,
    seo.h1Title || seo.title,
    seo.description
  );

  const faqSchema = seo.faqs && seo.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: seo.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      }
    : null;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: seo.keywords },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: ogImageAlt },
      { property: "og:site_name", content: "ToolsKit.tech" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: TWITTER_HANDLE },
      { name: "twitter:creator", content: TWITTER_HANDLE },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(softwareSchema),
      },
      ...(faqSchema
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(faqSchema),
            },
          ]
        : []),
    ],
  };
}

/**
 * Generic head() helper for non-tool pages (home, about, blog index, etc.)
 * Adds canonical, OG, Twitter card, and brand image consistently.
 */
export function buildPageHead(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}): RouteHead {
  const url = `${SITE}${opts.path}`;
  const ogImage = opts.ogImage ?? BRAND_OG_IMAGE;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      ...(opts.keywords
        ? [{ name: "keywords", content: opts.keywords }]
        : []),
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:type", content: opts.ogType ?? "website" },
      { property: "og:url", content: url },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "ToolsKit.tech" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: TWITTER_HANDLE },
      { name: "twitter:creator", content: TWITTER_HANDLE },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [],
  };
}
