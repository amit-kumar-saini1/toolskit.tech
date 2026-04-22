import { createFileRoute } from "@tanstack/react-router";
import PincodeLookup from "@/pages/tools/PincodeLookup";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/pincode-lookup")({
  head: () => buildToolHead("pincode-lookup"),
  component: PincodeLookup,
});
