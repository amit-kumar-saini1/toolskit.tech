import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdBanner from "@/components/AdBanner";
import { buildPageHead } from "@/lib/toolHead";
import KbResizePixelTool from "@/components/KbResizePixelTool";

export const Route = createFileRoute("/kb-resize-pixel")({
  head: () => {
    const base = buildPageHead({
      title:
        "KB Resize Pixel – Resize Image in KB and Pixels Online (USA) | ToolsKit.tech",
      description:
        "Free KB resize pixel tool for USA users. Resize photos to exact KB size and pixel dimensions for passport, visa, DMV, job applications and government forms — fast, secure, no signup.",
      keywords:
        "kb resize pixel, resize image in kb, resize photo to pixels, image resizer usa, passport photo resizer usa, dmv photo size, visa photo resizer, reduce image size kb, jpg pixel resizer, photo size converter usa",
      path: "/kb-resize-pixel",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is KB resize pixel?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "KB resize pixel means changing both the file size (in kilobytes) and the pixel dimensions of an image so it meets requirements for forms, passports, visas, or job portals in the USA.",
          },
        },
        {
          "@type": "Question",
          name: "Is this tool free for US users?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, ToolsKit.tech KB resize pixel is 100% free for everyone in the United States. No signup, no watermark, and your photo is processed locally in your browser.",
          },
        },
      ],
    };
    return {
      ...base,
      scripts: [
        ...base.scripts,
        { type: "application/ld+json", children: JSON.stringify(faqLd) },
      ],
    };
  },
  component: KbResizePixelPage,
});

function AutorelaxedAd() {
  const ref = useRef<HTMLModElement>(null);
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) return;
    const tryPush = (n = 0) => {
      if (loaded.current) return;
      const ag = (window as any).adsbygoogle;
      if (ag && ref.current && ref.current.offsetWidth > 0) {
        try {
          ag.push({});
          loaded.current = true;
        } catch (e) {
          /* ignore */
        }
        return;
      }
      if (n < 12) window.setTimeout(() => tryPush(n + 1), 500);
    };
    tryPush();
  }, []);
  return (
    <div className="my-6">
      <p className="text-xs text-muted-foreground text-center mb-2">Advertisement</p>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-1909827564331292"
        data-ad-slot="6789447857"
      />
    </div>
  );
}

function KbResizePixelPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-8" role="main">
        <article className="container max-w-3xl px-4 mx-auto space-y-6">
          <header className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
              KB Resize Pixel — Resize Image in KB and Pixels for USA Forms
            </h1>
            <p className="text-muted-foreground">
              Resize any photo to exact pixel dimensions and target KB file size
              for US passport applications, DMV driver's license uploads, visa
              forms, college applications, and online job portals — all in your
              browser.
            </p>
          </header>

          {/* Working in-page tool */}
          <section
            id="tool"
            aria-label="KB Resize Pixel Tool"
            className="rounded-2xl border border-border bg-card p-4 md:p-6"
          >
            <KbResizePixelTool />
          </section>

          <section className="prose prose-sm md:prose-base max-w-none text-foreground">
            <h2>Why KB and pixel size matter in the United States</h2>
            <p>
              Almost every American government and corporate web form has
              strict photo upload rules. The US Department of State requires a
              passport photo that is exactly 600 × 600 pixels and under 240 KB.
              The USCIS green card and naturalization portals demand similar
              square dimensions. Most state DMV websites — California,
              Texas, Florida, New York — limit driver's license document
              uploads to between 100 KB and 2 MB with specific minimum
              resolutions. If your image is even one kilobyte larger or one
              pixel smaller, the upload fails. That is why a dedicated KB
              resize pixel workflow saves hours of frustration.
            </p>

            <h2>What this page does</h2>
            <p>
              This page is a guide and quick launcher for our free
              <Link to="/tools/kb-converter" className="text-primary underline mx-1">KB Converter</Link>
              and
              <Link to="/tools/image-cropper" className="text-primary underline mx-1">Image Cropper</Link>
              tools. Together they let you do two things in under a minute:
              shrink the file to a precise kilobyte target, and crop or scale
              the photo to the exact pixel dimensions a US form expects. No
              account, no email, no watermark — your image never leaves your
              device because all processing happens with the browser's native
              Canvas API.
            </p>

            <div className="my-6">
              <AdBanner slot="9647130857" format="auto" responsive showLabel />
            </div>

            <h2>How to resize an image in KB and pixels</h2>
            <ol>
              <li>
                Open the
                <Link to="/tools/image-cropper" className="text-primary underline mx-1">Image Cropper</Link>
                and load your photo. Pick the aspect ratio that matches your
                form — 1:1 for US passport, 2:2 inches for visa, 4:6 for most
                state ID cards.
              </li>
              <li>
                Crop tightly around the head and shoulders (US passport rules
                require the head to be 1 to 1⅜ inches from chin to crown).
                Download the cropped JPEG.
              </li>
              <li>
                Open the
                <Link to="/tools/kb-converter" className="text-primary underline mx-1">KB Converter</Link>
                and upload the cropped image. Type your KB target — for
                example 240 for US passport, 100 for many DMVs, 50 for the
                SAVE / E-Verify portal.
              </li>
              <li>
                Click Convert. The tool runs a quality bisection in a Web
                Worker until the JPEG matches your target within a few bytes,
                then offers an instant download.
              </li>
            </ol>

            <h2>Common US photo specifications</h2>
            <ul>
              <li>US Passport (Department of State): 600 × 600 px, under 240 KB, JPEG.</li>
              <li>USCIS / Green Card: 600 × 600 px, between 54 KB and 240 KB.</li>
              <li>California DMV upload: minimum 1200 × 900 px, under 2 MB.</li>
              <li>Texas DPS REAL ID portal: under 1 MB, JPG or PNG.</li>
              <li>New York DMV: under 4 MB, recommended 600 px on the short side.</li>
              <li>SAT / College Board photo: 640 × 480 px minimum, under 5 MB.</li>
              <li>LinkedIn profile picture: 400 × 400 px recommended, under 8 MB.</li>
            </ul>

            <h2>Why use a browser-side tool</h2>
            <p>
              Many free online resizers in the United States upload your photo
              to a remote server in another country. That is a privacy risk
              you do not need when handling identification photos. ToolsKit.tech
              processes everything on your own computer using a transferable
              ImageBitmap and a Web Worker. Nothing is uploaded, nothing is
              logged, and the page works offline once it has loaded. Even on a
              modest Chromebook the conversion of a 4 MB camera photo down to
              a 100 KB JPEG takes less than two seconds.
            </p>

            <div className="my-6">
              <AdBanner slot="2745516861" format="auto" responsive showLabel />
            </div>

            <AutorelaxedAd />

            <h2>Tips for keeping quality high</h2>
            <p>
              Always start from the largest source image you have. Down-scaling
              a 4000 × 3000 px photo to 600 × 600 px keeps the face sharp,
              while up-scaling a tiny thumbnail produces blurry pixels that
              federal reviewers will reject. Use natural daylight, a plain
              white or off-white background, and keep the JPEG quality around
              85 percent. If the converter has to drop quality below 50
              percent to hit your KB target, crop tighter or reduce pixel
              dimensions first — you will get a cleaner photo than letting
              compression do all the work.
            </p>

            <h2>Pixel-to-inch conversions for printable photos</h2>
            <p>
              For US printable photos at 300 DPI, 2 × 2 inches equals 600 × 600
              pixels, 1 × 1.25 inches equals 300 × 375 pixels, and 4 × 6
              inches equals 1200 × 1800 pixels. If you are submitting digitally
              the DPI does not matter, only the absolute pixel count and the
              file size in KB. Our tools display both numbers live as you work,
              so you can stop tweaking the moment your image fits the spec.
            </p>

            <h2>Frequently asked questions</h2>
            <h3>Is the KB resize pixel tool really free?</h3>
            <p>
              Yes. ToolsKit.tech earns from optional advertising on the page
              but the tool itself is unrestricted, unlimited, and free for all
              United States visitors.
            </p>
            <h3>Will my passport photo be uploaded anywhere?</h3>
            <p>
              No. Image processing happens with the browser Canvas API on your
              device. We never see your photo and we never store it.
            </p>
            <h3>What format should I use?</h3>
            <p>
              JPEG is the universally accepted format for US ID photos and
              gives the smallest file size at high quality. Use PNG only when
              the form explicitly requests it.
            </p>

            <p className="mt-6">
              Ready to start? Open the
              <Link to="/tools/kb-converter" className="text-primary underline mx-1">KB Converter</Link>
              now and resize your image in KB and pixels in seconds.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}