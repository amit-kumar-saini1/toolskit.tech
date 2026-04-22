import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/about")({
  head: () =>
    buildPageHead({
      title: "About ToolsKit.tech – Free Online Tools by Amit Kumar Saini",
      description:
        "Learn about ToolsKit.tech - your trusted source for free online tools. Privacy-first, browser-based image, PDF, calculator, and converter tools.",
      keywords:
        "about toolskit, toolskit team, free online tools, privacy first tools",
      path: "/about",
    }),
  component: About,
});
