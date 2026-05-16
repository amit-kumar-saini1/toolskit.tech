import { createFileRoute } from "@tanstack/react-router";
import ToolsHub from "@/pages/ToolsHub";
import { buildPageHead } from "@/lib/toolHead";

const SITE = "https://toolskit.tech";

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "All Free Online Tools — ToolsKit.tech",
  description:
    "Complete hub of free online tools: image compressor, image cropper, PDF converter, SIP calculator, EMI calculator, QR generator and more.",
  url: `${SITE}/pages`,
  hasPart: [
    { "@type": "WebPage", name: "Image Compressor", url: `${SITE}/tools/image-compressor` },
    { "@type": "WebPage", name: "Image Cropper", url: `${SITE}/tools/image-cropper` },
    { "@type": "WebPage", name: "KB Converter", url: `${SITE}/tools/kb-converter` },
    { "@type": "WebPage", name: "Background Remover", url: `${SITE}/tools/remove-background` },
    { "@type": "WebPage", name: "Image to PDF", url: `${SITE}/tools/image-to-pdf` },
    { "@type": "WebPage", name: "PDF to Image", url: `${SITE}/tools/pdf-to-image` },
    { "@type": "WebPage", name: "SIP Calculator", url: `${SITE}/tools/sip-calculator` },
    { "@type": "WebPage", name: "FD Calculator", url: `${SITE}/tools/fd-calculator` },
    { "@type": "WebPage", name: "PPF Calculator", url: `${SITE}/tools/ppf-calculator` },
    { "@type": "WebPage", name: "Etsy Fee Calculator", url: `${SITE}/tools/etsy-fee-calculator` },
    { "@type": "WebPage", name: "Age Calculator", url: `${SITE}/tools/age-calculator` },
    { "@type": "WebPage", name: "QR Code Generator", url: `${SITE}/tools/qr-generator` },
  ],
};

export const Route = createFileRoute("/pages")({
  head: () => {
    const base = buildPageHead({
      title:
        "All Pages — Free Online Tools Hub | ToolsKit.tech",
      description:
        "Browse every ToolsKit.tech page: image compressor, image cropper, KB converter, PDF tools, SIP calculator, EMI calculator, Etsy fee calculator and more — all 100% free.",
      keywords:
        "free online tools, image compressor, image cropper, kb converter, compress image to 20kb, etsy fee calculator, sip calculator, ppf calculator, fd calculator, pdf to image, image to pdf",
      path: "/pages",
    });
    return {
      ...base,
      scripts: [
        ...base.scripts,
        {
          type: "application/ld+json",
          children: JSON.stringify(collectionSchema),
        },
      ],
    };
  },
  component: ToolsHub,
});
