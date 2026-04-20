import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "ToolsKit.tech - 100% Free Online Tools | No Signup | PDF, Image, QR & More",
      },
      {
        name: "description",
        content:
          "ToolsKit.tech - Best free online tools website. 50+ free tools: PDF converter, image compressor, background remover, QR generator, age calculator. 100% free, no signup, fast & secure.",
      },
      {
        name: "keywords",
        content:
          "free online tools, free pdf converter online, free image compressor, free background remover, free qr code generator, free age calculator, free unit converter",
      },
      { property: "og:title", content: "ToolsKit.tech - 100% Free Online Tools" },
      {
        property: "og:description",
        content:
          "50+ free online tools: PDF converter, image compressor, background remover, QR generator. No signup, fast & secure.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://toolskit.tech/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://toolskit.tech/" }],
  }),
  component: Index,
});
