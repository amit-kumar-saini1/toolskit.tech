import { createFileRoute } from "@tanstack/react-router";
import ImageCompressor from "@/pages/tools/ImageCompressor";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/image-compressor")({
  head: () => buildToolHead("image-compressor"),
  component: ImageCompressor,
});
