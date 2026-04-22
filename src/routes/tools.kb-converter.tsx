import { createFileRoute } from "@tanstack/react-router";
import KBConverter from "@/pages/tools/KBConverter";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/kb-converter")({
  head: () => buildToolHead("kb-converter"),
  component: KBConverter,
});
