import { createFileRoute } from "@tanstack/react-router";
import FDCalculator from "@/pages/tools/FDCalculator";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/fd-calculator")({
  head: () => buildToolHead("fd-calculator"),
  component: FDCalculator,
});
