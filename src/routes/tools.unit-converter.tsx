import { createFileRoute } from "@tanstack/react-router";
import UnitConverter from "@/pages/tools/UnitConverter";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/unit-converter")({
  head: () => buildToolHead("unit-converter"),
  component: UnitConverter,
});
