import { createFileRoute } from "@tanstack/react-router";
import TextOnPhoto from "@/pages/tools/TextOnPhoto";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/text-on-photo")({
  head: () => buildToolHead("text-on-photo"),
  component: TextOnPhoto,
});
