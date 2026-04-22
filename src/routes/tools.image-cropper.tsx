import { createFileRoute } from "@tanstack/react-router";
import ImageCropper from "@/pages/tools/ImageCropper";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/image-cropper")({
  head: () => buildToolHead("image-cropper"),
  component: ImageCropper,
});
