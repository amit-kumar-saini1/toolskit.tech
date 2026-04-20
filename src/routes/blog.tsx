import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog – Tips & Tutorials for Free Online Tools | ToolsKit.tech" },
      {
        name: "description",
        content:
          "Read the ToolsKit.tech blog for tips, tutorials, and guides on image compression, QR codes, PDF conversion, calculators, and more free online tools.",
      },
      {
        name: "keywords",
        content:
          "online tools blog, image compression tips, qr code guide, pdf converter tutorial, free tools tips",
      },
      { property: "og:title", content: "ToolsKit.tech Blog" },
      {
        property: "og:description",
        content: "Tips, tutorials and guides for getting the most out of free online tools.",
      },
      { property: "og:url", content: "https://toolskit.tech/blog" },
    ],
    links: [{ rel: "canonical", href: "https://toolskit.tech/blog" }],
  }),
  component: Blog,
});
