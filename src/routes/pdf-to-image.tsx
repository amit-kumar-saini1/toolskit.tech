import { createFileRoute, Link } from "@tanstack/react-router";
import PDFToImageWidget from "@/components/tools/widgets/PDFToImageWidget";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/pdf-to-image")({
  head: () => {
    const base = buildPageHead({
      title: "PDF to Image Converter – PDF to JPG / PNG Online Free | ToolsKit.tech",
      description:
        "Convert PDF pages to high-quality JPG or PNG images online for free. Extract every page as a separate image. No signup, no watermark, all in your browser.",
      keywords:
        "pdf to image, pdf to jpg, pdf to png, convert pdf to jpg, pdf to image converter, pdf page to image, extract image from pdf, pdf to picture online free",
      path: "/pdf-to-image",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What format are the output images?", acceptedAnswer: { "@type": "Answer", text: "Each PDF page is exported as a high-resolution PNG (2x scale) for crisp text and graphics." } },
        { "@type": "Question", name: "Is my PDF uploaded?", acceptedAnswer: { "@type": "Answer", text: "No. Conversion runs entirely in your browser using PDF.js. Files never leave your device." } },
        { "@type": "Question", name: "Are there page limits?", acceptedAnswer: { "@type": "Answer", text: "No. Convert PDFs of any page count, free forever." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/pdf-to-image"
      h1="PDF to Image Converter – PDF to JPG / PNG Online"
      subtitle="Convert every PDF page to a high-quality PNG image. Free, browser-based, no signup."
      tool={<PDFToImageWidget />}
      content={<Content />}
    />
  );
}

function Content() {
  return (
    <>
      <h2>Free PDF to Image Converter – PDF to JPG &amp; PNG Online</h2>
      <p>
        ToolsKit.tech PDF to Image Converter turns every page of a PDF into a
        high-resolution PNG image in seconds. Whether you need a single thumbnail
        for a website, individual pages to share on WhatsApp, or full document
        captures for an academic project, our free online tool gives you crisp,
        print-ready images without any signup, watermark, or upload to a remote
        server.
      </p>

      <h2>Why convert PDF to image?</h2>
      <p>
        Images open faster than PDFs on phones, can be embedded directly into
        WhatsApp, Instagram, Twitter and PowerPoint slides, and can be cropped or
        annotated with any photo editor. Students often need PDF pages as JPG to
        upload to assignment portals that reject PDF. Designers want PDF pages as
        PNG for use inside Figma or Canva. Lawyers and accountants extract specific
        pages from contracts as images so they can highlight or share without
        sending the full document.
      </p>

      <h2>How to convert a PDF to images in 3 steps</h2>
      <ol>
        <li>Click the upload box and select any PDF from your phone or computer.</li>
        <li>Wait a few seconds while every page is rendered to a high-resolution PNG inside your browser.</li>
        <li>Hover any thumbnail and click <strong>Page X</strong> to download a single page, or click <strong>Download All</strong> to save every page at once.</li>
      </ol>

      <h2>What quality do you get?</h2>
      <p>
        We render each page at a 2× scale factor, which means a standard A4 page
        becomes roughly 1240 × 1754 pixels — sharp enough for screen viewing,
        social media sharing, and even basic printing. Text in the converted images
        stays crisp and readable. The trade-off is file size: a 10-page PDF can
        easily produce 5–15 MB of images. If you only need lower-resolution
        thumbnails, compress them afterwards using our
        <Link to="/image-compressor" className="text-primary underline mx-1">Image Compressor</Link>.
      </p>

      <h2>Common use cases</h2>
      <ul>
        <li><strong>Students:</strong> Convert PDF question papers, sample answers, or notes into JPG to share on WhatsApp study groups.</li>
        <li><strong>Office work:</strong> Pull a single page from a long contract for a quick screenshot or email.</li>
        <li><strong>Social media:</strong> Turn a PDF report or eBook cover into a shareable image for LinkedIn, Twitter, or Instagram.</li>
        <li><strong>Designers:</strong> Use PDF pages as raster references inside Figma, Canva, Photoshop, or PowerPoint.</li>
        <li><strong>Government uploads:</strong> Some portals accept JPG but reject PDF — convert just the pages you need.</li>
      </ul>

      <h2>Privacy &amp; security</h2>
      <p>
        Your PDF never leaves your device. The entire conversion uses
        Mozilla&apos;s <code>pdf.js</code> library running locally in your browser.
        There is no server upload, no logging, no tracking pixels. Even if you
        convert a confidential document like a salary slip, contract, or banking
        statement, it stays 100% on your machine. Close the tab and the file is
        gone forever.
      </p>

      <h2>Tips for the best results</h2>
      <ul>
        <li>For very large PDFs (50+ pages), convert in batches by splitting the PDF first.</li>
        <li>If output images are too large, run them through our Image Compressor afterwards to shrink to KB.</li>
        <li>For sharing on WhatsApp, compress to under 100 KB per page so the image stays sharp on the recipient&apos;s phone.</li>
        <li>For embedding in PowerPoint or Google Slides, PNG is best — it preserves text edges crisply.</li>
      </ul>

      <h2>Frequently asked questions</h2>
      <h3>Can I convert only specific pages?</h3>
      <p>Yes — we render every page, but you can choose to download only the pages you need by hovering and clicking each thumbnail.</p>
      <h3>Are scanned PDFs supported?</h3>
      <p>Yes. Scanned PDFs convert just as easily as digital PDFs.</p>
      <h3>Will the original PDF be modified?</h3>
      <p>Never. We only read your file in memory; the original PDF on your disk stays untouched.</p>
      <h3>What is the maximum PDF size?</h3>
      <p>There is no fixed cap, but very large PDFs (200+ MB) may slow down your browser. For best performance, stay under 50 MB.</p>

      <p className="mt-6">
        Need to do the reverse? Try our
        <Link to="/image-to-pdf" className="text-primary underline mx-1">Image to PDF Converter</Link>
        to combine images back into a single PDF, or use the
        <Link to="/image-compressor" className="text-primary underline mx-1">Image Compressor</Link>
        to shrink the exported images.
      </p>
    </>
  );
}