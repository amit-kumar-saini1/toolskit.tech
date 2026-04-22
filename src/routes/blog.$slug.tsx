import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import { blogPostsMeta } from "@/lib/blogMeta";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPostsMeta[params.slug];
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return {
        meta: [
          { title: "Post Not Found | ToolsKit.tech Blog" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const url = `https://toolskit.tech/blog/${post.slug}`;
    // Upgrade Unsplash thumbnails to OG-friendly 1200x630, then ensure
    // the URL is absolute (local asset imports become /_build/... paths
    // that social crawlers cannot resolve without a host).
    const sized = post.image.replace("w=600&h=400", "w=1200&h=630");
    const ogImage = sized.startsWith("http")
      ? sized
      : `https://toolskit.tech${sized.startsWith("/") ? "" : "/"}${sized}`;
    const keywords = `${post.category.toLowerCase()}, online tools, free tools, ${post.title.toLowerCase()}`;
    const isoDate = `${post.date}T00:00:00+05:30`;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      headline: post.title,
      description: post.excerpt,
      image: { "@type": "ImageObject", url: ogImage, width: 1200, height: 630 },
      datePublished: isoDate,
      dateModified: isoDate,
      author: {
        "@type": "Person",
        name: "ToolsKit Team",
        url: "https://toolskit.tech/about",
      },
      publisher: {
        "@type": "Organization",
        name: "ToolsKit.tech",
        logo: {
          "@type": "ImageObject",
          url: "https://storage.googleapis.com/gpt-engineer-file-uploads/di7j8UAQsIVOsCbK58eG1NP3xrh2/uploads/1765097322356-mast logo.png",
          width: 600,
          height: 60,
        },
      },
    };

    return {
      meta: [
        { title: `${post.title} | ToolsKit.tech Blog` },
        { name: "description", content: post.excerpt },
        { name: "keywords", content: keywords },
        {
          name: "robots",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        { property: "article:published_time", content: isoDate },
        { property: "article:modified_time", content: isoDate },
        { property: "article:section", content: post.category },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:site_name", content: "ToolsKit.tech" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@AmitSaini184544" },
        { name: "twitter:creator", content: "@AmitSaini184544" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(structuredData),
        },
      ],
    };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <main className="container py-20 text-center">
      <h1 className="text-3xl font-bold mb-2">Blog post not found</h1>
      <p className="text-muted-foreground">
        The article you're looking for doesn't exist.
      </p>
      <a
        href="/blog"
        className="mt-6 inline-block rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Back to Blog
      </a>
    </main>
  ),
});
