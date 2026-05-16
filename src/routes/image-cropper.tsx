import { createFileRoute } from "@tanstack/react-router";
import ImageCropper from "@/pages/tools/ImageCropper";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/image-cropper")({
  head: () => {
    const base = buildPageHead({
      title: "Image Cropper – Crop JPG, PNG Photos Online Free | ToolsKit.tech",
      description:
        "Free online Image Cropper. Crop JPG, PNG, WebP photos to any size in the browser. No upload, no signup, no watermark. Fast, secure and 100% free.",
      keywords: "image cropper",
      path: "/image-cropper",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is this Image Cropper free?", acceptedAnswer: { "@type": "Answer", text: "Yes. The Image Cropper is 100% free with no signup, no watermark and unlimited use." } },
        { "@type": "Question", name: "Are my photos uploaded by the Image Cropper?", acceptedAnswer: { "@type": "Answer", text: "No. The Image Cropper runs entirely in your browser. Photos never leave your device." } },
        { "@type": "Question", name: "Which formats does the Image Cropper support?", acceptedAnswer: { "@type": "Answer", text: "The Image Cropper accepts JPG, PNG, WebP and any image format your browser can decode, and exports a high-quality PNG." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: ImageCropper,
});
