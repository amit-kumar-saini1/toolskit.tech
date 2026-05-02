import { createFileRoute } from "@tanstack/react-router";
import MortgageCalculator from "@/pages/tools/MortgageCalculator";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/mortgage-calculator")({
  head: () => buildToolHead("mortgage-calculator"),
  component: MortgageCalculator,
});