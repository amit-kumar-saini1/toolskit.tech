import { createFileRoute } from "@tanstack/react-router";
import ImageToPDF from "@/pages/tools/ImageToPDF";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/image-to-pdf")({
  head: () => buildToolHead("image-to-pdf"),
  component: ImageToPDF,
});
