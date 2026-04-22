import { createFileRoute } from "@tanstack/react-router";
import CryptoConverter from "@/pages/tools/CryptoConverter";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/crypto-converter")({
  head: () => buildToolHead("crypto-converter"),
  component: CryptoConverter,
});
