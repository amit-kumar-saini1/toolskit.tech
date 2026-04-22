import { createFileRoute } from "@tanstack/react-router";
import AllTools from "@/pages/AllTools";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/")({
  head: () =>
    buildPageHead({
      title: "All Free Online Tools – ToolsKit.tech",
      description:
        "Browse 50+ free online tools at ToolsKit.tech: image compressor, PDF converter, QR generator, calculators, converters, and more. No signup required.",
      keywords:
        "all online tools, free tools list, image tools, pdf tools, calculators, converters, qr generator",
      path: "/tools",
    }),
  component: AllTools,
});
