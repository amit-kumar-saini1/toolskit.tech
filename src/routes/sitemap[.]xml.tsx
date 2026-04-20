import { createFileRoute } from "@tanstack/react-router";
import { blogPostsList } from "@/lib/blogMeta";
import { toolsSEO } from "@/lib/seoData";

const SITE = "https://toolskit.tech";

const STATIC_PAGES: { path: string; priority: string; changefreq: string }[] = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/tools", priority: "0.9", changefreq: "weekly" },
  { path: "/blog", priority: "0.9", changefreq: "daily" },
  { path: "/about", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.5", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];

function buildSitemap(): string {
  const today = new Date().toISOString().split("T")[0];

  const staticUrls = STATIC_PAGES.map(
    (p) =>
      `  <url>\n    <loc>${SITE}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
  );

  const toolUrls = Object.keys(toolsSEO).map(
    (slug) =>
      `  <url>\n    <loc>${SITE}/tools/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
  );

  const blogUrls = blogPostsList.map(
    (post) =>
      `  <url>\n    <loc>${SITE}/blog/${post.slug}</loc>\n    <lastmod>${post.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...toolUrls, ...blogUrls].join("\n")}
</urlset>
`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        }),
    },
  },
});
