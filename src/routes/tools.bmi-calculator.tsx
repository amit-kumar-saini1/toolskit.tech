import { createFileRoute } from "@tanstack/react-router";
import BMICalculator from "@/pages/tools/BMICalculator";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/bmi-calculator")({
  head: () => buildToolHead("bmi-calculator"),
  component: BMICalculator,
});
