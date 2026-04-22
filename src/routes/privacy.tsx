import { createFileRoute } from "@tanstack/react-router";
import Privacy from "@/pages/Privacy";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildPageHead({
      title: "Privacy Policy – ToolsKit.tech",
      description:
        "Read the ToolsKit.tech privacy policy. We process all files locally in your browser — your data never leaves your device.",
      path: "/privacy",
    }),
  component: Privacy,
});
