import { createFileRoute } from "@tanstack/react-router";
import RemoveBackground from "@/pages/tools/RemoveBackground";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/remove-background")({
  head: () => buildToolHead("remove-background"),
  component: RemoveBackground,
});
