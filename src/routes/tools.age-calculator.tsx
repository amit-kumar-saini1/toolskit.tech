import { createFileRoute } from "@tanstack/react-router";
import AgeCalculator from "@/pages/tools/AgeCalculator";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/age-calculator")({
  head: () => buildToolHead("age-calculator"),
  component: AgeCalculator,
});
