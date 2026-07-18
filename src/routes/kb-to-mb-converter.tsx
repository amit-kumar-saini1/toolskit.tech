import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const KbToMbConverterWidget = lazy(
  () => import("@/components/tools/widgets/KbToMbConverterWidget"),
);

export const Route = createFileRoute("/kb-to-mb-converter")({
  head: () => {
    const base = buildPageHead({
      title: "KB to MB Converter — Free Online File Size Converter",
      description:
        "Convert KB to MB, MB to GB, bytes to KB and more — free online file size converter. Accurate binary (1024) calculation used by Windows, macOS and Linux.",
      keywords:
        "kb to mb converter, kb to mb, mb to kb, mb to gb, bytes to kb, file size converter, kilobytes to megabytes",
      path: "/kb-to-mb-converter",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How many KB are in 1 MB?", acceptedAnswer: { "@type": "Answer", text: "1 MB equals 1024 KB using the binary standard used by Windows, macOS and Linux file managers. Some manufacturers use the decimal standard where 1 MB = 1000 KB." } },
        { "@type": "Question", name: "How do I convert KB to MB?", acceptedAnswer: { "@type": "Answer", text: "Divide the KB value by 1024. For example, 2048 KB / 1024 = 2 MB. This converter does it instantly for you." } },
        { "@type": "Question", name: "Is 1 GB equal to 1000 MB or 1024 MB?", acceptedAnswer: { "@type": "Answer", text: "Operating systems treat 1 GB as 1024 MB. Hard drive and SSD manufacturers advertise capacity using 1 GB = 1000 MB, which is why a '1 TB' drive appears as ~931 GB in Windows." } },
        { "@type": "Question", name: "Is this file size converter free?", acceptedAnswer: { "@type": "Answer", text: "Yes. The ToolsKit.tech KB to MB converter is free, requires no signup and runs entirely in your browser." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/kb-to-mb-converter"
      h1="KB to MB Converter"
      subtitle="Convert bytes, KB, MB, GB and TB instantly with accurate binary math — free and online."
      tool={
        <Suspense fallback={<div className="h-40 animate-pulse bg-muted rounded-xl" />}>
          <KbToMbConverterWidget />
        </Suspense>
      }
      content={
        <>
          <h2>About the KB to MB Converter</h2>
          <p>
            The ToolsKit.tech <b>KB to MB Converter</b> is a free online file size calculator that instantly converts between <b>bytes (B), kilobytes (KB), megabytes (MB), gigabytes (GB)</b> and <b>terabytes (TB)</b>. Whether you're checking if your résumé PDF fits a 2 MB upload limit, measuring how much storage a video will need, or working out why your "1 TB" SSD only shows 931 GB in Windows, this converter gives you the answer in real time — no signup, no ads inside the result, and full binary accuracy.
          </p>
          <p>
            Most "kb to mb" pages quietly use the wrong formula. They divide by 1000 because it's easier, but that's the decimal standard that storage marketers prefer. Your computer's file manager — Windows Explorer, macOS Finder, Ubuntu Files — divides by <b>1024</b>. That tiny difference matters when you're trying to hit an exact upload limit on Naukri, LinkedIn, a government form or a college portal. This tool uses the binary standard by default, so the number you see here matches the number your operating system reports.
          </p>

          <h2>The KB / MB / GB Conversion Table</h2>
          <ul>
            <li><b>1 KB</b> = 1,024 bytes</li>
            <li><b>1 MB</b> = 1,024 KB = 1,048,576 bytes</li>
            <li><b>1 GB</b> = 1,024 MB = 1,048,576 KB</li>
            <li><b>1 TB</b> = 1,024 GB = 1,048,576 MB</li>
            <li><b>500 KB</b> ≈ 0.488 MB</li>
            <li><b>2,048 KB</b> = exactly 2 MB</li>
            <li><b>5,000 KB</b> ≈ 4.88 MB</li>
            <li><b>10 MB</b> = 10,240 KB</li>
            <li><b>100 MB</b> = 102,400 KB ≈ 0.0977 GB</li>
          </ul>

          <h2>Why KB vs MB Matters for File Uploads</h2>
          <p>
            Indian and international portals usually specify upload limits in KB or MB — and most reject the file silently if you're even 1 KB over. A few common limits you'll bump into:
          </p>
          <ul>
            <li><b>UPSC / SSC photo:</b> 20–50 KB</li>
            <li><b>UPSC signature:</b> 1–20 KB</li>
            <li><b>Naukri / LinkedIn resume:</b> up to 2 MB (2,048 KB)</li>
            <li><b>Aadhaar update document:</b> up to 2 MB PDF</li>
            <li><b>WhatsApp document:</b> up to 100 MB</li>
            <li><b>Gmail attachment:</b> up to 25 MB</li>
            <li><b>Instagram video:</b> up to 4 GB</li>
            <li><b>YouTube unverified upload:</b> 15 minutes / up to 256 GB</li>
          </ul>
          <p>
            If your file is too big, use our <Link to="/image-compressor" className="text-primary underline">Image Compressor</Link> or <Link to="/kb-resize-pixel" className="text-primary underline">KB Resize Pixel</Link> tool to bring it under the limit, then come back here to double-check the final size.
          </p>

          <h2>Binary vs Decimal — Why "1 TB" Becomes 931 GB</h2>
          <p>
            Storage manufacturers (Samsung, WD, Seagate, SanDisk) advertise drives using the <b>decimal</b> standard: 1 TB = 1,000,000,000,000 bytes. Operating systems use the <b>binary</b> standard: 1 TB = 1,099,511,627,776 bytes. Divide one by the other and you get the famous "missing" capacity:
          </p>
          <ul>
            <li>A "1 TB" SSD shows as <b>≈ 931 GB</b> in Windows.</li>
            <li>A "500 GB" drive shows as <b>≈ 465 GB</b>.</li>
            <li>A "64 GB" pen drive shows as <b>≈ 59.6 GB</b>.</li>
          </ul>
          <p>
            Nothing is missing — it's just two different ways of counting. The standards body IEC even proposed unique names for the binary units (KiB, MiB, GiB) to remove the ambiguity, but the binary names never caught on with everyday users.
          </p>

          <h2>How to Use This Converter</h2>
          <ol>
            <li>Type your value into the input box.</li>
            <li>Pick the unit you're starting from — B, KB, MB, GB or TB.</li>
            <li>Read all five conversions at once in the result grid.</li>
          </ol>
          <p>
            That's it — no math, no rounding errors, no Excel formula. Because everything runs inside your browser, there's no server round-trip, no login wall, and nothing is stored or logged.
          </p>

          <h2>Quick Real-World Examples</h2>
          <p>
            <b>"My resume PDF is 1,800 KB — will Naukri accept it?"</b> Yes — Naukri allows up to 2 MB, and 1,800 KB = 1.76 MB. <b>"How many photos fit on a 32 GB SD card if each is 4 MB?"</b> 32 GB ≈ 32,768 MB; 32,768 / 4 ≈ <b>8,192 photos</b>. <b>"How big is a 90-minute 1080p video?"</b> At a 5 Mbps bitrate that's roughly 3.4 GB. <b>"My UPSC photo must be under 40 KB — mine is 0.2 MB."</b> 0.2 MB = 204.8 KB, so you'll need to compress it by ~80%.
          </p>

          <h2>Frequently Asked Questions</h2>
          <h3>Is 1024 KB really 1 MB?</h3>
          <p>In the binary (IEC) standard used by your OS, yes. In the decimal (SI) standard used by storage marketers, 1 MB = 1000 KB.</p>
          <h3>Why does my phone show storage differently from the spec sheet?</h3>
          <p>Same reason — phones report binary GB while the spec sheet quotes decimal GB. A "128 GB" phone has roughly 119 GB of binary capacity, minus the OS.</p>
          <h3>What's the difference between MB and Mb (megabyte vs megabit)?</h3>
          <p>1 MB (megabyte) = 8 Mb (megabits). Internet plans are advertised in Mbps (megabits per second), which is why a "100 Mbps" connection downloads at roughly 12.5 MB/s.</p>

          <h2>More Free Tools</h2>
          <p>
            Pair this converter with our <Link to="/image-compressor" className="text-primary underline">Image Compressor</Link>, <Link to="/kb-resize-pixel" className="text-primary underline">KB Resize Pixel</Link>, <Link to="/photo-cropper" className="text-primary underline">Photo Cropper</Link> and <Link to="/image-to-pdf" className="text-primary underline">Image to PDF</Link> to prep any document for an online form in under a minute.
          </p>
        </>
      }
    />
  );
}