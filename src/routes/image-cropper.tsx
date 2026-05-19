import { createFileRoute, Link } from "@tanstack/react-router";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { ImageCropperWidget } from "@/pages/tools/ImageCropper";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/image-cropper")({
  head: () => {
    const base = buildPageHead({
      title: "Image Cropper – Crop JPG, PNG Photos Online Free | ToolsKit.tech",
      description:
        "Free online Image Cropper. Crop JPG, PNG, WebP photos to any size in the browser. No upload, no signup, no watermark. Fast, secure and 100% free.",
      keywords: "image cropper",
      path: "/image-cropper",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is this Image Cropper free?", acceptedAnswer: { "@type": "Answer", text: "Yes. The Image Cropper is 100% free with no signup, no watermark and unlimited use." } },
        { "@type": "Question", name: "Are my photos uploaded by the Image Cropper?", acceptedAnswer: { "@type": "Answer", text: "No. The Image Cropper runs entirely in your browser. Photos never leave your device." } },
        { "@type": "Question", name: "Which formats does the Image Cropper support?", acceptedAnswer: { "@type": "Answer", text: "The Image Cropper accepts JPG, PNG, WebP and any image format your browser can decode, and exports a high-quality PNG." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/image-cropper"
      h1="Image Cropper – Crop Photos Online Free"
      subtitle="Crop JPG, PNG and WebP photos to any size — directly in your browser. No upload, no watermark."
      tool={<ImageCropperWidget />}
      content={<Content />}
    />
  );
}

function Content() {
  return (
    <>
      <h2>What is the Image Cropper?</h2>
      <p>
        The Image Cropper is a free online tool that lets you crop any photo
        to the exact size you need — for profile pictures, social posts,
        thumbnails, product images or document uploads. Everything happens in
        your browser, so your photos never leave your device.
      </p>

      <h2>How to crop a photo</h2>
      <ol>
        <li><b>Upload your photo</b> — JPG, PNG or WebP.</li>
        <li><b>Drag the crop box</b> to position it over the area you want.</li>
        <li><b>Resize the crop box</b> using the bottom-right handle.</li>
        <li><b>Name your file</b> and click Download.</li>
      </ol>

      <h2>Key features of this Image Cropper</h2>
      <ul>
        <li><b>100% free</b> — no signup, no watermark, unlimited use.</li>
        <li><b>Privacy-first</b> — photos are processed in your browser.</li>
        <li><b>Any size</b> — drag the handle to crop to any custom dimensions.</li>
        <li><b>High quality</b> — exports a sharp PNG of the cropped region.</li>
        <li><b>Works on mobile and desktop</b> — no app install needed.</li>
      </ul>

      <h2>Why use an online Image Cropper?</h2>
      <p>
        Desktop editors are overkill for a quick crop. The Image Cropper
        above opens instantly, runs entirely offline after page load, and
        gives you a ready-to-share image in seconds.
      </p>

      <p className="mt-6">
        Need more photo tools? Try the
        <Link to="/image-compressor" className="text-primary underline mx-1">Image Compressor</Link>,
        the
        <Link to="/remove-background" className="text-primary underline mx-1">Remove Background</Link>
        tool or the
        <Link to="/name-and-date-on-photo" className="text-primary underline mx-1">Name & Date on Photo</Link>
        tool.
      </p>
    </>
  );
}
