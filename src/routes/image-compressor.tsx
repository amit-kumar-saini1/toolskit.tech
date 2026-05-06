import { createFileRoute, Link } from "@tanstack/react-router";
import ImageCompressorWidget from "@/components/tools/widgets/ImageCompressorWidget";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/image-compressor")({
  head: () => {
    const base = buildPageHead({
      title: "Image Compressor – Compress JPG, PNG to KB Online Free | ToolsKit.tech",
      description:
        "Free online image compressor. Compress JPG, PNG, WebP images to KB or MB without losing quality. Reduce image size for WhatsApp, email, websites — no signup, no watermark.",
      keywords:
        "image compressor, compress image, compress jpg, compress png, reduce image size, image size reducer, compress image to 100kb, compress image to 50kb, compress image online free, photo compressor, image optimizer",
      path: "/image-compressor",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is this image compressor really free?", acceptedAnswer: { "@type": "Answer", text: "Yes, 100% free, unlimited use, no signup, no watermark." } },
        { "@type": "Question", name: "Will compression reduce the quality?", acceptedAnswer: { "@type": "Answer", text: "You control quality with the slider. 70-80% gives ~60% size reduction with almost no visible difference." } },
        { "@type": "Question", name: "Are my images uploaded?", acceptedAnswer: { "@type": "Answer", text: "No. Compression happens in your browser. Files never leave your device." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/image-compressor"
      h1="Image Compressor – Reduce JPG & PNG Size Online"
      subtitle="Compress images to KB without losing visible quality. 100% free, in-browser, no signup."
      tool={<ImageCompressorWidget />}
      content={<Content />}
    />
  );
}

function Content() {
  return (
    <>
      <h2>Free Online Image Compressor – Reduce Image Size in KB</h2>
      <p>
        ToolsKit.tech Image Compressor is a fast, secure, and 100% free online tool that
        helps you reduce image file size without sacrificing visible quality. Whether you
        need to compress a photo for WhatsApp, shrink a screenshot for an email
        attachment, optimise product images for an eCommerce store, or upload an Aadhaar
        / PAN card photo to a government portal that demands &quot;less than 100 KB&quot;,
        our compressor handles it in seconds — directly inside your browser, with no
        upload, no signup, and no watermark.
      </p>

      <h2>Why compress your images?</h2>
      <p>
        Modern smartphones produce 4-12 MB photos. That is fine for printing, but
        terrible for the web — a heavy image slows down page loads, eats mobile data,
        and frustrates visitors. Studies by Google show that pages which take longer
        than 3 seconds to load lose 53% of mobile visitors. Compressing images is the
        single highest-impact change you can make to speed up a website, improve Core
        Web Vitals, and rank higher on Google. For everyday use, smaller images mean
        faster WhatsApp sends, smaller email attachments, and the ability to upload to
        portals with strict size limits like SSC, UPSC, banking KYC, and university
        admission forms.
      </p>

      <h2>How does our image compressor work?</h2>
      <p>
        We use the HTML5 Canvas API and the browser&apos;s native JPEG encoder to
        re-encode your photo at the quality level you choose. JPEG is a lossy format,
        which means a clever algorithm throws away the parts of the image your eye
        cannot see — fine colour gradients, very high-frequency detail in busy areas —
        while keeping the parts you do notice. Drop the quality slider to 70% and you
        will typically save 60–80% file size with almost no visible difference. Drop it
        to 40% and you will save more than 90% with only a slight softening, which is
        perfect for thumbnails and chat avatars.
      </p>

      <h2>How to compress an image in 4 steps</h2>
      <ol>
        <li>Click the upload box and choose any JPG, PNG, or WebP photo from your phone or computer.</li>
        <li>Use the quality slider to balance file size against visible quality. The compressed preview updates live.</li>
        <li>Type a clear file name — for example <em>passport-photo-50kb</em>.</li>
        <li>Click <strong>Download</strong>. The compressed JPG is saved instantly.</li>
      </ol>

      <h2>Compress image to a specific size (50 KB, 100 KB, 200 KB)</h2>
      <p>
        Indian government portals routinely ask for photos &quot;under 50 KB&quot;,
        &quot;between 20–50 KB&quot;, or &quot;less than 200 KB&quot;. To hit a target
        size, start at 80% quality and drop in steps of 10% until the compressed size
        on the right shows the value you need. If you still need a smaller file, first
        crop the image to remove blank borders — smaller pixel dimensions plus quality
        compression always wins. For very tight limits like 20 KB, lower quality to 30%
        and reduce dimensions to around 600 × 800.
      </p>

      <h2>Privacy &amp; security</h2>
      <p>
        Your photos never leave your device. The entire compression runs inside the
        browser tab using JavaScript — there is no upload to our server, no log file,
        no third-party API. Even if you compress a sensitive document like an ID card
        or salary slip, it stays 100% on your machine. Close the tab and the image is
        gone forever.
      </p>

      <h2>Supported formats &amp; output</h2>
      <ul>
        <li>Input: JPG, JPEG, PNG, WebP, BMP, AVIF — any format your browser can decode.</li>
        <li>Output: optimised JPG (best universal compatibility, smallest size for photos).</li>
        <li>No size cap — compress images up to your device&apos;s memory limit.</li>
        <li>No daily or monthly usage limit.</li>
      </ul>

      <h2>Tips for the best compression results</h2>
      <ul>
        <li>For photos with people / nature: 70–80% quality is the sweet spot.</li>
        <li>For screenshots with text: stay above 85% to keep letters crisp, or use a PNG-specific tool.</li>
        <li>For social media uploads: 75% is typically enough — Facebook, Instagram and WhatsApp re-compress anyway.</li>
        <li>For emails: target under 1 MB total per attachment for the smoothest delivery.</li>
      </ul>

      <h2>Frequently asked questions</h2>
      <h3>Will the dimensions change?</h3>
      <p>No, only the file size shrinks. The pixel dimensions of your image stay the same.</p>
      <h3>Why is my PNG still large after compression?</h3>
      <p>PNG is a lossless format and works best for graphics, not photos. We re-encode to JPG, which gives 5–10× more compression on photos. If you specifically need PNG output, use a PNG-only optimiser.</p>
      <h3>Is there a daily limit?</h3>
      <p>No. Compress as many images as you like, free forever.</p>

      <p className="mt-6">
        Need to convert images to PDF or remove a background after compressing? Try our
        <Link to="/image-to-pdf" className="text-primary underline mx-1">Image to PDF Converter</Link>
        or
        <Link to="/remove-background" className="text-primary underline mx-1">Background Remover</Link>
        — also browser-based and free.
      </p>
    </>
  );
}