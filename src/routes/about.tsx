import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ToolsKit.tech – Free Online Tools by Amit Kumar Saini" },
      {
        name: "description",
        content:
          "Learn about ToolsKit.tech - your trusted source for free online tools. Privacy-first, browser-based image, PDF, calculator, and converter tools.",
      },
      { property: "og:title", content: "About ToolsKit.tech" },
      {
        property: "og:description",
        content:
          "Privacy-first free online tools. No signup, no uploads — everything runs in your browser.",
      },
      { property: "og:url", content: "https://toolskit.tech/about" },
    ],
    links: [{ rel: "canonical", href: "https://toolskit.tech/about" }],
  }),
  component: About,
});
