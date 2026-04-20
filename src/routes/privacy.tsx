import { createFileRoute } from "@tanstack/react-router";
import Privacy from "@/pages/Privacy";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy – ToolsKit.tech" },
      {
        name: "description",
        content:
          "Read the ToolsKit.tech privacy policy. We process all files locally in your browser — your data never leaves your device.",
      },
      { property: "og:title", content: "Privacy Policy – ToolsKit.tech" },
      {
        property: "og:description",
        content:
          "All file processing happens locally in your browser. Your data is never uploaded.",
      },
      { property: "og:url", content: "https://toolskit.tech/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://toolskit.tech/privacy" }],
  }),
  component: Privacy,
});
