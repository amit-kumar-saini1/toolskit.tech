import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { buildPageHead } from "@/lib/toolHead";

const SITE = "https://toolskit.tech";
const LOGO =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/di7j8UAQsIVOsCbK58eG1NP3xrh2/uploads/1765097322356-mast logo.png";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ToolsKit.tech",
  alternateName: ["ToolsKit", "Tools Kit", "ToolsKit Tech"],
  url: SITE,
  description:
    "Best free online tools website with 50+ free tools including PDF converter, image compressor, background remover, QR generator, and more.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE}/tools?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "ToolsKit.tech",
    logo: { "@type": "ImageObject", url: LOGO },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ToolsKit.tech",
  url: SITE,
  logo: LOGO,
  sameAs: [
    "https://x.com/AmitSaini184544",
    "https://www.linkedin.com/in/amit-kumar-saini-38b6143a0/",
    "https://github.com/amit-kumar-saini",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${SITE}/contact`,
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Online Tools",
  description: "Collection of free online tools for everyday use",
  numberOfItems: 13,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Image Compressor", url: `${SITE}/tools/image-compressor` },
    { "@type": "ListItem", position: 2, name: "Image to PDF", url: `${SITE}/tools/image-to-pdf` },
    { "@type": "ListItem", position: 3, name: "Remove Background", url: `${SITE}/tools/remove-background` },
    { "@type": "ListItem", position: 4, name: "QR Code Generator", url: `${SITE}/tools/qr-generator` },
    { "@type": "ListItem", position: 5, name: "Age Calculator", url: `${SITE}/tools/age-calculator` },
    { "@type": "ListItem", position: 6, name: "BMI Calculator", url: `${SITE}/tools/bmi-calculator` },
    { "@type": "ListItem", position: 7, name: "Image Cropper", url: `${SITE}/tools/image-cropper` },
    { "@type": "ListItem", position: 8, name: "Color Picker", url: `${SITE}/tools/color-picker` },
    { "@type": "ListItem", position: 9, name: "Unit Converter", url: `${SITE}/tools/unit-converter` },
    { "@type": "ListItem", position: 10, name: "PDF to Image", url: `${SITE}/tools/pdf-to-image` },
    { "@type": "ListItem", position: 11, name: "KB Converter", url: `${SITE}/tools/kb-converter` },
    { "@type": "ListItem", position: 12, name: "Text on Photo", url: `${SITE}/tools/text-on-photo` },
    { "@type": "ListItem", position: 13, name: "Number Converter", url: `${SITE}/tools/number-converter` },
  ],
};

export const Route = createFileRoute("/")({
  head: () => {
    const base = buildPageHead({
      title:
        "ToolsKit.tech - 100% Free Online Tools | No Signup | PDF, Image, QR & More",
      description:
        "ToolsKit.tech - Best free online tools website. 50+ free tools: PDF converter, image compressor, background remover, QR generator, age calculator. 100% free, no signup, fast & secure.",
      keywords:
        "free online tools, free pdf converter online, free image compressor, free background remover, free qr code generator, free age calculator, free unit converter",
      path: "/",
    });
    return {
      ...base,
      scripts: [
        ...base.scripts,
        { type: "application/ld+json", children: JSON.stringify(websiteSchema) },
        { type: "application/ld+json", children: JSON.stringify(organizationSchema) },
        { type: "application/ld+json", children: JSON.stringify(itemListSchema) },
      ],
    };
  },
  component: Index,
});
