import { createFileRoute, Link } from "@tanstack/react-router";
import SeoToolShell from "@/components/seo/SeoToolShell";
import ImageConvertWidget from "@/components/tools/widgets/WebpToJpgWidget";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/webp-to-jpg")({
  head: () => {
    const base = buildPageHead({
      title: "WebP to JPG Converter — Free Online, No Upload",
      description:
        "Convert WebP to JPG online for free. Batch convert multiple WebP images to high-quality JPG in your browser — no signup, no watermark, 100% private.",
      keywords: "webp to jpg, webp to jpeg, convert webp to jpg, webp to jpg converter, webp converter",
      path: "/webp-to-jpg",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How do I convert WebP to JPG?", acceptedAnswer: { "@type": "Answer", text: "Drop your WebP files into the converter, choose JPG quality, and click Download. Files are converted instantly in your browser." } },
        { "@type": "Question", name: "Is the WebP to JPG converter free?", acceptedAnswer: { "@type": "Answer", text: "Yes. 100% free, no signup, no watermark, no upload limit." } },
        { "@type": "Question", name: "Are my files uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. The conversion runs entirely in your browser. Your images never leave your device." } },
        { "@type": "Question", name: "Can I convert multiple WebP files at once?", acceptedAnswer: { "@type": "Answer", text: "Yes. Select multiple WebP files and download them all as JPG with one click." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/webp-to-jpg"
      h1="WebP to JPG Converter"
      subtitle="Convert WebP images to JPG online — free, fast, and 100% private."
      tool={
        <ImageConvertWidget
          fromLabel="WebP"
          targetMime="image/jpeg"
          targetExt="jpg"
          accept="image/webp"
        />
      }
      content={
        <>
          <h2>Why Convert WebP to JPG?</h2>
          <p>
            WebP is a modern image format developed by Google that delivers excellent
            compression, but many older devices, social apps, document editors and
            printers still don't support it. Converting WebP to JPG ensures your
            photos work everywhere — WhatsApp, Word, PowerPoint, Photoshop, email
            attachments, government portals and resume uploads all happily accept
            JPG.
          </p>

          <h2>How to Convert WebP to JPG Online</h2>
          <ol>
            <li><b>Upload:</b> Click the upload box or drag and drop one or many WebP files.</li>
            <li><b>Choose quality:</b> Slide between 30% and 100% — 90% is a great default.</li>
            <li><b>Download:</b> Click Download to save each JPG, or Download All for batch.</li>
          </ol>

          <h2>Features</h2>
          <ul>
            <li><b>Batch conversion:</b> Convert dozens of WebP files at once.</li>
            <li><b>Adjustable quality:</b> Pick the perfect file-size to quality ratio.</li>
            <li><b>Browser-only:</b> Nothing is uploaded — your images stay on your device.</li>
            <li><b>No watermark, no signup, no limits.</b></li>
          </ul>

          <h2>WebP vs JPG — Which Should You Use?</h2>
          <p>
            <b>WebP</b> wins on file size — typically 25–35% smaller than equivalent
            JPGs — making it perfect for websites. <b>JPG</b> wins on compatibility:
            it is the universal photo format, supported by every app, OS and printer
            in existence. If you need to send a photo to someone or upload to a form
            that rejects WebP, converting to JPG is the right move.
          </p>

          <p className="mt-6">
            Looking for more image tools? Try the
            <Link to="/image-compressor" className="text-primary underline mx-1">Image Compressor</Link>,
            <Link to="/image-to-pdf" className="text-primary underline mx-1">Image to PDF</Link>,
            or
            <Link to="/remove-background" className="text-primary underline mx-1">Remove Background</Link>
            — all free on ToolsKit.tech.
          </p>
        </>
      }
    />
  );
}
