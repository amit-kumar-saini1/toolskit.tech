import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";
import { blogPostsList } from "@/lib/blogMeta";
import { buildPageHead } from "@/lib/toolHead";

const SITE = "https://toolskit.tech";
const toAbsolute = (src: string) => {
  const sized = src.replace("w=600&h=400", "w=1200&h=630");
  return sized.startsWith("http")
    ? sized
    : `${SITE}${sized.startsWith("/") ? "" : "/"}${sized}`;
};

const blogStructuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "ToolsKit.tech Blog",
  description:
    "Tips, tutorials, and guides for using free online tools effectively.",
  url: "https://toolskit.tech/blog",
  publisher: {
    "@type": "Organization",
    name: "ToolsKit.tech",
    logo: {
      "@type": "ImageObject",
      url: "https://storage.googleapis.com/gpt-engineer-file-uploads/di7j8UAQsIVOsCbK58eG1NP3xrh2/uploads/1765097322356-mast logo.png",
    },
  },
  blogPost: blogPostsList.slice(0, 10).map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE}/blog/${post.slug}`,
    datePublished: `${post.date}T00:00:00+05:30`,
    image: toAbsolute(post.image),
  })),
};

export const Route = createFileRoute("/blog/")({
  head: () => {
    const base = buildPageHead({
      title: "Blog – Tips & Tutorials for Free Online Tools | ToolsKit.tech",
      description:
        "Read the ToolsKit.tech blog for tips, tutorials, and guides on image compression, QR codes, PDF conversion, calculators, and more free online tools.",
      keywords:
        "online tools blog, image compression tips, qr code guide, pdf converter tutorial, free tools tips",
      path: "/blog",
    });
    return {
      ...base,
      scripts: [
        ...base.scripts,
        {
          type: "application/ld+json",
          children: JSON.stringify(blogStructuredData),
        },
      ],
    };
  },
  component: Blog,
});
