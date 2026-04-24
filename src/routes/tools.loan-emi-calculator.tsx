import { createFileRoute } from "@tanstack/react-router";
import LoanEMICalculator from "@/pages/tools/LoanEMICalculator";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/loan-emi-calculator")({
  head: () => buildToolHead("loan-emi-calculator"),
  component: LoanEMICalculator,
});
