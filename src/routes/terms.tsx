import { createFileRoute } from "@tanstack/react-router";
import Terms from "@/pages/Terms";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildPageHead({
      title: "Terms of Service – ToolsKit.tech",
      description:
        "Terms of Service for ToolsKit.tech. By using our free online tools you agree to these terms.",
      path: "/terms",
    }),
  component: Terms,
});
