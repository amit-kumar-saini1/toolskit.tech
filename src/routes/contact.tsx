import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildPageHead({
      title: "Contact Us - ToolsKit.tech | Get Support & Feedback",
      description:
        "Contact ToolsKit.tech for support, feedback, or inquiries about our free online tools. Email: toolskit.tech@outlook.com.",
      keywords:
        "contact toolskit, toolskit support, toolskit help, toolskit feedback",
      path: "/contact",
    }),
  component: Contact,
});
