import { createFileRoute, Link } from "@tanstack/react-router";
import SeoToolShell from "@/components/seo/SeoToolShell";
import ImageConvertWidget from "@/components/tools/widgets/WebpToJpgWidget";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/jpg-to-png")({
  head: () => {
    const base = buildPageHead({
      title: "JPG to PNG Converter — Free Online, Transparent Support",
      description:
        "Convert JPG to PNG online for free. Batch convert JPG/JPEG images to lossless PNG directly in your browser — no signup, no watermark, fully private.",
      keywords: "jpg to png, jpeg to png, convert jpg to png, jpg to png converter, image to png",
      path: "/jpg-to-png",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How do I convert JPG to PNG?", acceptedAnswer: { "@type": "Answer", text: "Upload your JPG files, and the tool instantly converts them to lossless PNG. Click Download to save." } },
        { "@type": "Question", name: "Is JPG to PNG conversion lossless?", acceptedAnswer: { "@type": "Answer", text: "The PNG output is lossless, but the source JPG was already compressed — so converting cannot restore lost detail. PNG is ideal when you want to edit further without additional quality loss." } },
        { "@type": "Question", name: "Are my files uploaded anywhere?", acceptedAnswer: { "@type": "Answer", text: "No. All conversion happens in your browser. Files never leave your device." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/jpg-to-png"
      h1="JPG to PNG Converter"
      subtitle="Convert JPG / JPEG images to high-quality PNG online — free and private."
      tool={
        <ImageConvertWidget
          fromLabel="JPG / JPEG"
          targetMime="image/png"
          targetExt="png"
          accept="image/jpeg"
        />
      }
      content={
        <>
          <h2>Why Convert JPG to PNG?</h2>
          <p>
            PNG is a lossless image format that preserves every pixel exactly. Unlike
            JPG, which uses lossy compression, PNG never degrades when you re-save.
            Convert JPG to PNG when you need to edit a photo repeatedly, add
            transparency, upload to platforms that require PNG, or paste into design
            software like Figma or Photoshop without quality loss.
          </p>

          <h2>How to Convert JPG to PNG Online</h2>
          <ol>
            <li><b>Upload:</b> Drop one or many JPG / JPEG files into the box.</li>
            <li><b>Convert:</b> Each file is converted to PNG instantly in your browser.</li>
            <li><b>Download:</b> Save one file or click Download All for batch.</li>
          </ol>

          <h2>JPG vs PNG — Key Differences</h2>
          <ul>
            <li><b>Compression:</b> JPG is lossy (smaller files); PNG is lossless (larger files, perfect quality).</li>
            <li><b>Transparency:</b> JPG cannot store transparency; PNG supports full alpha channels.</li>
            <li><b>Best for:</b> JPG for photos on the web; PNG for screenshots, logos, graphics with text, and any image you'll edit further.</li>
          </ul>

          <h2>Privacy &amp; Security</h2>
          <p>
            Every conversion runs locally in your browser using the HTML5 Canvas API.
            Your JPG files are never uploaded to our servers — making this tool safe
            for sensitive screenshots, ID photos, and personal images.
          </p>

          <p className="mt-6">
            More handy converters:
            <Link to="/webp-to-jpg" className="text-primary underline mx-1">WebP to JPG</Link>,
            <Link to="/image-compressor" className="text-primary underline mx-1">Image Compressor</Link>,
            <Link to="/image-to-pdf" className="text-primary underline mx-1">Image to PDF</Link>
            — all free on ToolsKit.tech.
          </p>
        </>
      }
    />
  );
}
