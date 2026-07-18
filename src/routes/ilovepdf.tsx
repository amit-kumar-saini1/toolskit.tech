import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const ImageToPDFWidget = lazy(() => import("@/components/tools/widgets/ImageToPDFWidget"));

export const Route = createFileRoute("/ilovepdf")({
  head: () => {
    const base = buildPageHead({
      title: "iLovePDF Alternative — Free Online PDF Tools (No Signup)",
      description:
        "Free iLovePDF alternative. Convert images to PDF, PDF to images, compress images and more — 100% online, no signup, no watermark, files stay on your device.",
      keywords:
        "ilovepdf, i love pdf, ilovepdf alternative, free pdf tools, image to pdf, pdf to image, jpg to pdf, online pdf converter",
      path: "/ilovepdf",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is this a free iLovePDF alternative?", acceptedAnswer: { "@type": "Answer", text: "Yes. ToolsKit.tech offers a 100% free iLovePDF alternative with no signup, no watermark and no daily limit on conversions." } },
        { "@type": "Question", name: "Are my PDF files uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. All PDF conversions run inside your browser using JavaScript. Your files never leave your device, which makes it safer than most iLovePDF style websites." } },
        { "@type": "Question", name: "Can I convert JPG to PDF for free?", acceptedAnswer: { "@type": "Answer", text: "Yes. Use the Image to PDF tool on this page to merge JPG, PNG or WebP photos into a single PDF document in seconds." } },
        { "@type": "Question", name: "Does it work on mobile?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every PDF tool works on Android and iPhone browsers — Chrome, Safari, Firefox and Edge — without installing any app." } },
        { "@type": "Question", name: "Is there a file size limit?", acceptedAnswer: { "@type": "Answer", text: "There is no fixed server limit because files are processed locally. Practical limits depend on your device's memory — usually 100MB+ works fine on a modern phone or laptop." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

const pdfTools: { to: string; title: string; desc: string }[] = [
  { to: "/image-to-pdf", title: "Image to PDF", desc: "Merge JPG, PNG, WebP photos into one PDF — drag, reorder, download." },
  { to: "/pdf-to-image", title: "PDF to Image", desc: "Convert every page of a PDF into high-quality PNG images." },
  { to: "/image-compressor", title: "Image Compressor", desc: "Compress JPG/PNG before adding them to a PDF to keep file size small." },
  { to: "/photo-cropper", title: "Photo Cropper", desc: "Crop a photo to exact dimensions before turning it into a PDF page." },
  { to: "/kb-resize-pixel", title: "Resize Image in KB", desc: "Resize images by KB target — perfect for online form PDFs." },
  { to: "/kb-to-mb-converter", title: "KB to MB Converter", desc: "Check file size before uploading a PDF to government portals." },
];

function Page() {
  return (
    <SeoToolShell
      currentPath="/ilovepdf"
      h1="iLovePDF Alternative — Free Online PDF Tools"
      subtitle="All the PDF tools you love — convert, merge and compress — 100% free, no signup, no watermark, files stay on your device."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <ImageToPDFWidget />
        </Suspense>
      }
      content={
        <>
          <h2>A Free, Private iLovePDF Alternative</h2>
          <p>
            Looking for an <b>iLovePDF alternative</b> that doesn't ask you to sign up, doesn't slap a watermark on your file, and doesn't push you to a paid plan after two conversions? ToolsKit.tech bundles the most-used PDF tools — Image to PDF, PDF to Image, image compression and resizing — into one fast, mobile-friendly page. Everything runs inside your browser using JavaScript and the HTML5 canvas API, which means your documents are never uploaded to a third-party server. That single difference makes it safer than 90% of the "free online PDF" sites you'll find on Google.
          </p>
          <p>
            iLovePDF popularised the idea that PDF tools should be one click away in a browser, and we love them for it. But the free tier has tightened over the years: hourly limits, file-size caps, forced signups for OCR and a "Premium" upsell on almost every action. If you only need to turn a few photos into a PDF for a college admission form, attach a scanned Aadhaar to an email, or send a single-page invoice to a client, you shouldn't have to create an account. This page is built for exactly that — quick, anonymous, zero-friction PDF work.
          </p>

          <h2>All PDF Tools in One Place</h2>
          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            {pdfTools.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="block border border-border rounded-xl p-4 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="font-semibold text-primary">{t.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{t.desc}</div>
              </Link>
            ))}
          </div>

          <h2>Why People Search for "iLovePDF"</h2>
          <p>
            "iLovePDF" has become a generic verb in India, the Philippines, Brazil and across the Middle East — when someone says "let me ilovepdf this", they usually mean one of three things: convert images to a single PDF, split a PDF back into images, or compress a PDF that's too big to upload. Our toolkit covers all three workflows without forcing you through a paywall. The <Link to="/image-to-pdf">Image to PDF</Link> tool handles the most common case: take 1–50 JPG or PNG photos from your phone, arrange them in the right order, and download a single PDF named anything you want. The <Link to="/pdf-to-image">PDF to Image</Link> tool does the reverse — drop a PDF and get one high-resolution PNG per page, which you can then crop, edit or share individually.
          </p>

          <h2>Built for Students, Freelancers and Small Businesses</h2>
          <p>
            <b>Students</b> use these tools to convert handwritten notes into PDFs before uploading to Google Classroom or Moodle, to compress an admission-form scan that won't fit inside a 200KB upload limit, and to crop screenshots of online textbooks into shareable study sets. <b>Freelancers</b> turn invoice screenshots into branded PDFs to email to clients, merge multiple receipts for monthly expense reports, and combine logo concepts into a single PDF mood-board to send through WhatsApp. <b>Small businesses</b> rely on the same flow for purchase orders, GST invoices, vendor agreements and customs paperwork. None of it needs a desktop app like Adobe Acrobat — a browser tab is enough.
          </p>

          <h2>Privacy: Your PDFs Never Leave Your Device</h2>
          <p>
            Most "free online PDF" websites — including iLovePDF, Smallpdf and PDF24 — upload your file to their server, run the conversion there, then delete it after some number of hours. That's fine for a meme, but risky for a salary slip, an Aadhaar card, a passport scan, a bank statement or a contract. ToolsKit.tech takes a different approach: every byte of your PDF is processed inside your browser by JavaScript that we ship along with the page. The page works offline once it has loaded, which is the easiest way to verify the claim — open the tool, switch your phone to airplane mode, and convert a PDF anyway. No upload, no server log, no retention policy to read.
          </p>

          <h2>How to Convert Images to PDF</h2>
          <ol>
            <li>Click <b>Select Image</b> above and choose one or more JPG, PNG or WebP photos from your device.</li>
            <li>Drag thumbnails to reorder them — page 1 of the PDF will be the first thumbnail, page 2 the second, and so on.</li>
            <li>Remove any photo with the small red ×, or click <b>Add More</b> to keep adding pages.</li>
            <li>Type a file name (e.g. <code>admission-form</code>) and click <b>Convert to PDF</b>.</li>
            <li>The browser downloads <code>admission-form.pdf</code> straight to your device. Done.</li>
          </ol>

          <h2>How to Convert a PDF Back to Images</h2>
          <p>
            Open the <Link to="/pdf-to-image">PDF to Image</Link> tool, upload a PDF, and the page renders every page as a 2× resolution PNG using the open-source <code>pdf.js</code> engine. You can download a single page or all pages at once. This is the most common workaround when a website asks for "passport-size photo as JPG" but you only have a scanned PDF — convert to image, then crop with the <Link to="/photo-cropper">Photo Cropper</Link>.
          </p>

          <h2>How to Shrink a PDF Before Upload</h2>
          <p>
            Government portals (IRCTC, UPSC, SSC, university admissions, RTO, GST e-Way Bill) often cap PDF uploads at 100KB, 200KB or 500KB. The trick is to compress the source images before merging them into the PDF. Run each photo through the <Link to="/image-compressor">Image Compressor</Link> at 70–80% quality, or use <Link to="/kb-resize-pixel">Resize in KB</Link> to hit an exact KB target, then re-run Image to PDF. A 4MB PDF usually drops to 200–400KB without visible quality loss.
          </p>

          <h2>iLovePDF vs ToolsKit.tech — Quick Comparison</h2>
          <ul>
            <li><b>Signup:</b> iLovePDF nudges you to a free account after a few uses. ToolsKit.tech never asks.</li>
            <li><b>Watermark:</b> Both are clean on the free tier today, but ToolsKit.tech guarantees no watermark, ever.</li>
            <li><b>Privacy:</b> iLovePDF uploads to their servers. ToolsKit.tech runs everything in your browser.</li>
            <li><b>Speed:</b> Local processing is usually faster on mid-range Android phones because there's no upload round-trip.</li>
            <li><b>Offline:</b> ToolsKit.tech tools work once loaded; iLovePDF requires a live server connection.</li>
            <li><b>Cost:</b> Always free here. iLovePDF Premium is roughly ₹600/month in India.</li>
          </ul>

          <h2>FAQ</h2>
          <p><b>Is "ilovepdf" the same as "i love pdf"?</b> Yes — both spellings refer to the same popular PDF brand. People also search "ilovepdf merge", "ilovepdf jpg to pdf" and "ilovepdf compress". This page covers all three workflows.</p>
          <p><b>Can I merge two PDFs here?</b> Today you can merge images into one PDF. For merging existing PDFs, convert each PDF to images first, then re-combine with Image to PDF — it's a two-step workaround that works without uploading.</p>
          <p><b>Does it support password-protected PDFs?</b> No. Remove the password in your PDF viewer (e.g. Chrome's "Save as PDF" print trick) before uploading.</p>
          <p><b>Will the PDF open in Adobe Reader?</b> Yes — output uses the standard PDF 1.4 format generated by jsPDF, which opens in Adobe Reader, Foxit, Preview, Chrome and every mobile PDF viewer.</p>
          <p><b>Is it really free forever?</b> Yes. ToolsKit.tech is funded by Google AdSense, so the tools stay free and unlimited for users.</p>
        </>
      }
    />
  );
}