import { createFileRoute } from "@tanstack/react-router";
import EtsyFeeCalculator from "@/pages/tools/EtsyFeeCalculator";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/etsy-fee-calculator")({
  head: () => buildToolHead("etsy-fee-calculator"),
  component: EtsyFeeCalculator,
});
