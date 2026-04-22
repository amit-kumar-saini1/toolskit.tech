import { createFileRoute } from "@tanstack/react-router";
import PDFToImage from "@/pages/tools/PDFToImage";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/pdf-to-image")({
  head: () => buildToolHead("pdf-to-image"),
  component: PDFToImage,
});
