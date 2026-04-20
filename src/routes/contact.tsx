import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us - ToolsKit.tech | Get Support & Feedback" },
      {
        name: "description",
        content:
          "Contact ToolsKit.tech for support, feedback, or inquiries about our free online tools. Email: toolskit.tech@outlook.com.",
      },
      {
        name: "keywords",
        content:
          "contact toolskit, toolskit support, toolskit help, toolskit feedback",
      },
      { property: "og:title", content: "Contact ToolsKit.tech" },
      {
        property: "og:description",
        content: "Get in touch with the ToolsKit.tech team — we typically reply within 24-48 hours.",
      },
      { property: "og:url", content: "https://toolskit.tech/contact" },
    ],
    links: [{ rel: "canonical", href: "https://toolskit.tech/contact" }],
  }),
  component: Contact,
});
