import { createFileRoute, Link } from "@tanstack/react-router";
import SeoToolShell from "@/components/seo/SeoToolShell";
import ImageConvertWidget from "@/components/tools/widgets/WebpToJpgWidget";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/png-to-jpg")({
  head: () => {
    const base = buildPageHead({
      title: "PNG to JPG Converter — Free Online, No Upload",
      description:
        "Convert PNG to JPG online for free. Batch convert transparent PNG images to high-quality JPG with white background — runs entirely in your browser, no signup.",
      keywords: "png to jpg, png to jpeg, convert png to jpg, png to jpg converter, change png to jpg",
      path: "/png-to-jpg",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How do I convert PNG to JPG without losing quality?", acceptedAnswer: { "@type": "Answer", text: "Upload your PNG file and select 90–100% JPG quality. The tool uses a high-fidelity browser canvas, so visual loss is minimal while file size drops dramatically." } },
        { "@type": "Question", name: "What happens to PNG transparency?", acceptedAnswer: { "@type": "Answer", text: "JPG does not support transparency. Transparent areas are filled with white, which matches how most apps and documents display the result." } },
        { "@type": "Question", name: "Is the PNG to JPG converter free?", acceptedAnswer: { "@type": "Answer", text: "Yes — 100% free, no signup, no watermark, no file-size limit." } },
        { "@type": "Question", name: "Are my images uploaded anywhere?", acceptedAnswer: { "@type": "Answer", text: "No. Everything runs locally in your browser using the Canvas API. Your files never leave your device." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/png-to-jpg"
      h1="PNG to JPG Converter"
      subtitle="Convert PNG images to JPG online — free, fast, and 100% private."
      tool={
        <ImageConvertWidget
          fromLabel="PNG"
          targetMime="image/jpeg"
          targetExt="jpg"
          accept="image/png"
        />
      }
      content={
        <>
          <h2>Why Convert PNG to JPG?</h2>
          <p>
            PNG is a lossless image format that preserves transparency and sharp
            edges — perfect for logos, screenshots and graphics. But PNG files
            are often 3–10× larger than the JPG equivalent for the same photo.
            Converting PNG to JPG shrinks file size dramatically, making it
            ideal for email attachments, faster website loading, WhatsApp
            sharing, resume uploads on government portals, and any form that
            enforces a small file-size limit.
          </p>

          <h2>How to Convert PNG to JPG Online</h2>
          <ol>
            <li><b>Upload:</b> Drag and drop one or many PNG files into the converter.</li>
            <li><b>Choose quality:</b> 90% is the sweet spot — great quality, small size.</li>
            <li><b>Download:</b> Save each JPG individually or use Download All for batch.</li>
          </ol>

          <h2>PNG vs JPG — Key Differences</h2>
          <ul>
            <li><b>Compression:</b> PNG is lossless, JPG is lossy — JPG files are much smaller.</li>
            <li><b>Transparency:</b> PNG supports transparent backgrounds, JPG does not.</li>
            <li><b>Best for photos:</b> JPG — smaller files, virtually indistinguishable quality at 85–95%.</li>
            <li><b>Best for graphics & text:</b> PNG — sharper edges, no compression artifacts.</li>
          </ul>

          <h2>Features</h2>
          <ul>
            <li><b>Batch conversion</b> of multiple PNG files at once.</li>
            <li><b>Quality slider</b> from 30% to 100% to balance size vs clarity.</li>
            <li><b>Browser-only:</b> nothing uploaded, fully private.</li>
            <li><b>No watermark, no signup, no limits.</b></li>
          </ul>

          <p className="mt-6">
            Need more image tools? Try the
            <Link to="/webp-to-jpg" className="text-primary underline mx-1">WebP to JPG Converter</Link>,
            <Link to="/image-compressor" className="text-primary underline mx-1">Image Compressor</Link>,
            or
            <Link to="/image-to-pdf" className="text-primary underline mx-1">Image to PDF</Link>
            — all free on ToolsKit.tech.
          </p>
        </>
      }
    />
  );
}