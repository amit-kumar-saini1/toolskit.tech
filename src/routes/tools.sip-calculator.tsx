import { createFileRoute } from "@tanstack/react-router";
import SIPCalculator from "@/pages/tools/SIPCalculator";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/sip-calculator")({
  head: () => buildToolHead("sip-calculator"),
  component: SIPCalculator,
});
