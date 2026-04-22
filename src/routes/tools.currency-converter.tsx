import { createFileRoute } from "@tanstack/react-router";
import CurrencyConverter from "@/pages/tools/CurrencyConverter";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/currency-converter")({
  head: () => buildToolHead("currency-converter"),
  component: CurrencyConverter,
});
