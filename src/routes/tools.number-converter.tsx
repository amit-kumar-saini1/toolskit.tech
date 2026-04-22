import { createFileRoute } from "@tanstack/react-router";
import NumberConverter from "@/pages/tools/NumberConverter";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/number-converter")({
  head: () => buildToolHead("number-converter"),
  component: NumberConverter,
});
