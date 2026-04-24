import { createFileRoute } from "@tanstack/react-router";
import QRGenerator from "@/pages/tools/QRGenerator";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/qr-generator")({
  head: () => buildToolHead("qr-generator"),
  component: QRGenerator,
});
