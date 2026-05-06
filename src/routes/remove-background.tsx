import { createFileRoute, Link } from "@tanstack/react-router";
import RemoveBackgroundWidget from "@/components/tools/widgets/RemoveBackgroundWidget";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/remove-background")({
  head: () => {
    const base = buildPageHead({
      title: "Remove Background from Image – AI Background Remover Online Free | ToolsKit.tech",
      description:
        "Free AI background remover. Remove image background instantly and add white, transparent, or custom color background. No signup, no watermark, all in your browser.",
      keywords:
        "remove background, background remover, remove background from image, ai background remover, transparent background, white background photo, remove bg, background eraser, photo background remover free",
      path: "/remove-background",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is the background remover really free?", acceptedAnswer: { "@type": "Answer", text: "Yes, 100% free with no daily limit, no signup, and no watermark on output." } },
        { "@type": "Question", name: "How accurate is the AI?", acceptedAnswer: { "@type": "Answer", text: "Our AI handles people, products, and pets with high accuracy. Complex hair edges may need slight touch-up." } },
        { "@type": "Question", name: "Are my photos uploaded?", acceptedAnswer: { "@type": "Answer", text: "No. The AI model runs in your browser using WebAssembly. Photos never leave your device." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/remove-background"
      h1="Remove Background from Image – Free AI Background Remover"
      subtitle="One-click AI background removal. Add white, transparent, or any color background. 100% free."
      tool={<RemoveBackgroundWidget />}
      content={<Content />}
    />
  );
}

function Content() {
  return (
    <>
      <h2>Free AI Background Remover – Remove Image Background Online</h2>
      <p>
        ToolsKit.tech Background Remover uses artificial intelligence to instantly
        cut out the subject of a photo and give you a clean, transparent PNG. Whether
        you need a white-background passport-style photo for a government form, a
        transparent product shot for your eCommerce store, a clean profile picture
        for LinkedIn, or just want to drop yourself into a new background for fun,
        this free online tool does it in seconds — directly in your browser, with
        no signup, no watermark, and no upload to any server.
      </p>

      <h2>Why use an AI background remover?</h2>
      <p>
        Manually erasing a background in Photoshop or even mobile editors takes
        minutes per photo and leaves rough edges around hair, fingers, and fur. Our
        AI uses a neural network trained on millions of images to detect the
        subject pixel-by-pixel — including tricky areas like flying hair, transparent
        sunglasses, and pet whiskers. The result is a clean cut-out that would have
        cost ₹50–₹200 per image on Fiverr or required a Photoshop skill you do not
        need to learn.
      </p>

      <h2>How to remove a background in 3 steps</h2>
      <ol>
        <li>Click the upload box and select any JPG, PNG, or WebP photo.</li>
        <li>Click <strong>Remove Background</strong>. The AI model processes your image (the first time you use it, the model downloads — about 30–60 seconds).</li>
        <li>Pick a background colour — transparent, pure white, black, or any custom hex — then click <strong>Download PNG</strong>.</li>
      </ol>

      <h2>Common use cases</h2>
      <ul>
        <li><strong>Passport / ID photos:</strong> Generate the white-background photo demanded by passport offices, visa portals, and exam forms (UPSC, SSC, IBPS, NEET, JEE).</li>
        <li><strong>eCommerce product shots:</strong> Get clean, professional product images on white for Amazon, Flipkart, Myntra, Etsy, and Shopify listings.</li>
        <li><strong>Profile pictures:</strong> Create a sharp profile photo for LinkedIn, Twitter, GitHub, Slack, or your company website.</li>
        <li><strong>Marketing creatives:</strong> Drop the subject onto a brand-coloured background for ads, banners, and social posts.</li>
        <li><strong>Wedding &amp; event invites:</strong> Cut out couples or family members and place them on a custom background.</li>
      </ul>

      <h2>Privacy &amp; security</h2>
      <p>
        Your photos never leave your device. The AI model runs locally in your
        browser using WebAssembly and the open-source <code>transformers.js</code>
        library. There is no server upload, no logging, no third-party API. Even if
        you process a personal or sensitive photo like an ID card or a child&apos;s
        picture, it stays 100% on your machine.
      </p>

      <h2>Tips for the best background removal</h2>
      <ul>
        <li><strong>Use good lighting:</strong> Photos with clear contrast between subject and background give the cleanest cut-outs.</li>
        <li><strong>Avoid busy backgrounds:</strong> Plain or blurred backgrounds work best, but the AI can still handle complex scenes.</li>
        <li><strong>Higher resolution = sharper edges:</strong> Upload the original photo, not a low-resolution copy.</li>
        <li><strong>White background for IDs:</strong> Pick the &quot;White&quot; preset for passport / Aadhaar / PAN style photos.</li>
        <li><strong>Touch up if needed:</strong> If the AI misses a small area, you can refine the result in any photo editor.</li>
      </ul>

      <h2>White background photo for government forms</h2>
      <p>
        Most Indian government portals (passport, Aadhaar, PAN, UPSC, SSC, IBPS,
        NEET, JEE, university admissions) require a passport-size photo on a plain
        white background. The fastest workflow is: (1) take a clear selfie or
        portrait, (2) upload here, (3) pick the white background preset, (4)
        download the PNG, and (5) compress it to the required KB size using our
        <Link to="/image-compressor" className="text-primary underline mx-1">Image Compressor</Link>.
      </p>

      <h2>Frequently asked questions</h2>
      <h3>Why does the first run take so long?</h3>
      <p>The AI model (about 100 MB) downloads to your browser the first time. After that, every image processes in 5–10 seconds with no further downloads.</p>
      <h3>Will the output have a watermark?</h3>
      <p>Never. The PNG is 100% clean — no logo, no &quot;remove.bg&quot; tag, nothing.</p>
      <h3>Can I keep the original size?</h3>
      <p>Yes. The processed image keeps the same dimensions as your input.</p>
      <h3>Does it work on phones?</h3>
      <p>Yes, the AI runs on any modern phone browser (Chrome, Safari, Edge, Firefox). Older devices may take longer.</p>

      <p className="mt-6">
        After removing the background, you may want to
        <Link to="/image-compressor" className="text-primary underline mx-1">Compress the photo to KB</Link>
        for upload to a portal, or
        <Link to="/image-to-pdf" className="text-primary underline mx-1">Convert it to PDF</Link>
        — also free and browser-based.
      </p>
    </>
  );
}