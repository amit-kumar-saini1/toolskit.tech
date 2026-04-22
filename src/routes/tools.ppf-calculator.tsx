import { createFileRoute } from "@tanstack/react-router";
import PPFCalculator from "@/pages/tools/PPFCalculator";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/ppf-calculator")({
  head: () => buildToolHead("ppf-calculator"),
  component: PPFCalculator,
});
