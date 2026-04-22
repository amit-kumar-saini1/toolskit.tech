import { createFileRoute } from "@tanstack/react-router";
import AllTools from "@/pages/AllTools";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "All Free Online Tools – ToolsKit.tech" },
      {
        name: "description",
        content:
          "Browse 50+ free online tools at ToolsKit.tech: image compressor, PDF converter, QR generator, calculators, converters, and more. No signup required.",
      },
      {
        name: "keywords",
        content:
          "all online tools, free tools list, image tools, pdf tools, calculators, converters, qr generator",
      },
      { property: "og:title", content: "All Free Online Tools – ToolsKit.tech" },
      {
        property: "og:description",
        content: "Browse 50+ free online tools — image, PDF, calculators, converters and more.",
      },
      { property: "og:url", content: "https://toolskit.tech/tools" },
    ],
    links: [{ rel: "canonical", href: "https://toolskit.tech/tools" }],
  }),
  component: AllTools,
});
