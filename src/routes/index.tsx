import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/")({
  head: () =>
    buildPageHead({
      title:
        "ToolsKit.tech - 100% Free Online Tools | No Signup | PDF, Image, QR & More",
      description:
        "ToolsKit.tech - Best free online tools website. 50+ free tools: PDF converter, image compressor, background remover, QR generator, age calculator. 100% free, no signup, fast & secure.",
      keywords:
        "free online tools, free pdf converter online, free image compressor, free background remover, free qr code generator, free age calculator, free unit converter",
      path: "/",
    }),
  component: Index,
});
