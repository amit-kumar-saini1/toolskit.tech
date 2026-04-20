import { createFileRoute } from "@tanstack/react-router";
import Terms from "@/pages/Terms";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service – ToolsKit.tech" },
      {
        name: "description",
        content:
          "Terms of Service for ToolsKit.tech. By using our free online tools you agree to these terms.",
      },
      { property: "og:title", content: "Terms of Service – ToolsKit.tech" },
      {
        property: "og:description",
        content: "Terms governing the use of ToolsKit.tech free online tools.",
      },
      { property: "og:url", content: "https://toolskit.tech/terms" },
    ],
    links: [{ rel: "canonical", href: "https://toolskit.tech/terms" }],
  }),
  component: Terms,
});
