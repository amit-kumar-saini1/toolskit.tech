import { createFileRoute, Link } from "@tanstack/react-router";
import ImageToPDFWidget from "@/components/tools/widgets/ImageToPDFWidget";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/image-to-pdf")({
  head: () => {
    const base = buildPageHead({
      title: "Image to PDF Converter – JPG to PDF Online Free | ToolsKit.tech",
      description:
        "Convert JPG, PNG, WebP images to PDF online for free. Combine multiple images into one PDF document instantly. No signup, no watermark, secure browser-based conversion.",
      keywords:
        "image to pdf, jpg to pdf, png to pdf, convert image to pdf, photo to pdf, multiple images to pdf, image to pdf converter online free, combine images into pdf",
      path: "/image-to-pdf",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Can I combine multiple images into one PDF?", acceptedAnswer: { "@type": "Answer", text: "Yes. Upload as many images as you like and they will be merged into a single PDF in the order you added them." } },
        { "@type": "Question", name: "Is it safe to convert sensitive documents?", acceptedAnswer: { "@type": "Answer", text: "Yes. Your images are converted entirely in your browser. No upload, no logging." } },
        { "@type": "Question", name: "Is there a file size limit?", acceptedAnswer: { "@type": "Answer", text: "No daily limit. The only limit is your device's available memory." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/image-to-pdf"
      h1="Image to PDF Converter – JPG, PNG to PDF Online"
      subtitle="Combine JPG, PNG and WebP images into a single PDF instantly. Free, no signup."
      tool={<ImageToPDFWidget />}
      content={<Content />}
    />
  );
}

function Content() {
  return (
    <>
      <h2>Free Image to PDF Converter – JPG &amp; PNG to PDF Online</h2>
      <p>
        ToolsKit.tech Image to PDF Converter lets you turn one or many photos into a
        clean, professional PDF document in just a few clicks. Whether you are
        submitting scanned answer sheets to a teacher, uploading documents to a
        government portal that only accepts PDF, sending product photos to a client,
        or archiving family pictures in a single shareable file, this free online
        tool gets the job done in seconds — fully inside your browser, with no
        signup, no watermark, and no upload to any server.
      </p>

      <h2>Why convert images to PDF?</h2>
      <p>
        PDF is the universal document standard. Unlike a folder of loose JPGs, a PDF
        keeps your pages in order, opens identically on every device, prints
        consistently, and can be password-protected later if needed. Most government
        and academic portals — UPSC, SSC, IBPS, university admission forms, banking
        KYC, RTO and passport services — accept only PDF for documents like ID
        proofs, mark sheets, signatures and certificates. Sending a single
        well-named PDF also looks far more professional than five separate
        screenshots in an email.
      </p>

      <h2>How to convert images to PDF in 3 steps</h2>
      <ol>
        <li>Click <strong>Select Image</strong> and choose one or several JPG, PNG, or WebP files. You can also click <em>Add More</em> to keep adding pages.</li>
        <li>Drag images to reorder them, or remove any thumbnail you do not need.</li>
        <li>Type a clear file name — for example <em>aadhaar-front-back</em> or <em>product-photos-oct-2026</em> — and click <strong>Convert to PDF</strong>. Your PDF downloads instantly.</li>
      </ol>

      <h2>Common use cases</h2>
      <ul>
        <li><strong>Government uploads:</strong> Convert scanned ID cards, certificates, address proofs and signatures to PDF for portals that reject JPG.</li>
        <li><strong>Students:</strong> Combine handwritten assignment pages, lab worksheets, or notes into a single PDF before emailing the teacher.</li>
        <li><strong>Business:</strong> Bundle product photos, delivery proofs, or invoices for clients.</li>
        <li><strong>Personal:</strong> Archive recipes, screenshots, or trip photos as a single shareable file.</li>
        <li><strong>Property &amp; legal:</strong> Convert photos of agreements, receipts and bills into one PDF for safekeeping.</li>
      </ul>

      <h2>Privacy &amp; security</h2>
      <p>
        Your images stay 100% on your device. The PDF is built inside your browser
        using the open-source <code>jsPDF</code> library — there is no upload, no
        cloud processing, and no third-party API. Even sensitive documents like
        Aadhaar, PAN card, or salary slips can be converted with full peace of mind.
        Close the tab and the data is gone forever.
      </p>

      <h2>Tips for the best PDF output</h2>
      <ul>
        <li><strong>Compress first:</strong> If your photos are very large (5+ MB each), compress them with our <Link to="/image-compressor" className="text-primary underline">Image Compressor</Link> first. The PDF will be much smaller and easier to email.</li>
        <li><strong>Crop before converting:</strong> Trim white borders so each page fills the PDF cleanly.</li>
        <li><strong>Use consistent orientation:</strong> Either all portrait or all landscape gives a cleaner PDF.</li>
        <li><strong>Name your file well:</strong> A descriptive name like <em>kyc-documents-2026</em> is far more useful than <em>scan_001</em>.</li>
      </ul>

      <h2>Image to PDF for government portals</h2>
      <p>
        Many Indian government portals require &quot;document in PDF, less than 200
        KB&quot; or similar limits. The workflow is: (1) compress each image to ~50
        KB using the Image Compressor, (2) upload them here in correct order, (3)
        download the merged PDF. The result is a small, portal-ready PDF that meets
        almost every common upload requirement.
      </p>

      <h2>Frequently asked questions</h2>
      <h3>Can I add a password to the PDF?</h3>
      <p>Not directly here. After downloading, you can use a free PDF tool to add a password. But for most uploads, the PDF does not need one.</p>
      <h3>Will the PDF have a watermark?</h3>
      <p>No. The PDF is 100% clean — no logo, no &quot;converted by&quot; line, nothing.</p>
      <h3>Is there a page count limit?</h3>
      <p>No fixed limit. Convert as many pages as your device&apos;s memory can hold.</p>
      <h3>Are PNG transparency preserved?</h3>
      <p>PDF pages have a white background. Transparent PNG areas appear white in the final PDF.</p>

      <p className="mt-6">
        Need to do the reverse? Try our
        <Link to="/pdf-to-image" className="text-primary underline mx-1">PDF to Image Converter</Link>
        to extract pages back as JPG/PNG, or use the
        <Link to="/image-compressor" className="text-primary underline mx-1">Image Compressor</Link>
        to shrink files before merging.
      </p>
    </>
  );
}