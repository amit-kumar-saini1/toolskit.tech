import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const PhotoCropperWidget = lazy(() =>
  import("@/pages/tools/ImageCropper").then((m) => ({ default: m.ImageCropperWidget })),
);

export const Route = createFileRoute("/photo-cropper")({
  head: () => {
    const base = buildPageHead({
      title: "Photo Cropper — Free Online Photo Crop Tool",
      description:
        "Free online photo cropper. Crop photos for Instagram, passport size, profile pictures and WhatsApp DP. No upload, 100% private, works in your browser.",
      keywords:
        "photo cropper, crop photo online, image cropper, passport size photo cropper, instagram crop, profile picture cropper",
      path: "/photo-cropper",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is this photo cropper free?", acceptedAnswer: { "@type": "Answer", text: "Yes. The ToolsKit.tech photo cropper is 100% free with no signup, no watermark and no daily limits." } },
        { "@type": "Question", name: "Are my photos uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. Cropping happens fully inside your browser using HTML5 canvas. Your photos never leave your device." } },
        { "@type": "Question", name: "Can I crop a photo to passport size?", acceptedAnswer: { "@type": "Answer", text: "Yes. Upload your photo, drag the crop box to a 35mm x 45mm style square and download the result as PNG." } },
        { "@type": "Question", name: "Does it work on mobile?", acceptedAnswer: { "@type": "Answer", text: "Yes. The photo cropper works on Android, iPhone and iPad browsers — Chrome, Safari, Firefox and Edge." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/photo-cropper"
      h1="Photo Cropper"
      subtitle="Crop photos online for Instagram, passport, WhatsApp DP and profile pictures — free, fast and private."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <PhotoCropperWidget />
        </Suspense>
      }
      content={
        <>
          <h2>About the Photo Cropper</h2>
          <p>
            The ToolsKit.tech <b>Photo Cropper</b> is a free online tool that lets you crop any photo in seconds — without installing software, without signing up, and without uploading your image to a third-party server. Drop in a JPG, PNG or WebP, drag the crop box to the area you want to keep, and download a clean PNG that's ready for Instagram, your LinkedIn profile, a college admission form or a WhatsApp display picture.
          </p>
          <p>
            Built for speed on both desktop and mobile browsers, the cropper uses the HTML5 <code>canvas</code> API to slice your photo locally. That means the original quality is preserved, EXIF rotation is respected, and your photo never leaves your device. For students preparing passport photos, freelancers framing portfolio shots, or marketers cutting product photography for an ad campaign, this is the fastest path from "raw photo" to "publish-ready image".
          </p>

          <h2>Why People Crop Photos</h2>
          <ul>
            <li><b>Social media:</b> Instagram, Facebook and X each prefer specific aspect ratios — square 1:1, portrait 4:5, story 9:16.</li>
            <li><b>Profile pictures:</b> LinkedIn, WhatsApp and Gmail all show your photo inside a circle, so the subject must sit dead-centre.</li>
            <li><b>Passport & ID:</b> Government forms in India, the US and UK require a tight crop around the face with neutral background.</li>
            <li><b>E-commerce:</b> Amazon, Flipkart and Etsy reject listings whose photos don't meet the platform's minimum frame ratio.</li>
            <li><b>Print:</b> A 4x6 print, a 5x7 photo frame, or a wedding album each need their own crop ratio to avoid white borders.</li>
          </ul>
          <p>
            Cropping is one of the highest-leverage edits in photography. A bad crop wastes a beautiful shot; a smart crop turns an average snap into a scroll-stopping image. By cutting away dead space, you make the subject the obvious hero of the frame — exactly what platform algorithms reward.
          </p>

          <h2>Common Photo Crop Sizes</h2>
          <ul>
            <li><b>Instagram square post:</b> 1080 x 1080 px (1:1)</li>
            <li><b>Instagram portrait post:</b> 1080 x 1350 px (4:5)</li>
            <li><b>Instagram story / reel:</b> 1080 x 1920 px (9:16)</li>
            <li><b>Facebook cover:</b> 820 x 312 px</li>
            <li><b>YouTube thumbnail:</b> 1280 x 720 px (16:9)</li>
            <li><b>LinkedIn profile photo:</b> 400 x 400 px</li>
            <li><b>WhatsApp DP:</b> 500 x 500 px (square)</li>
            <li><b>Passport photo (India):</b> 35 x 45 mm at 200–300 DPI</li>
            <li><b>US visa photo:</b> 600 x 600 px (2x2 inch)</li>
            <li><b>Twitter / X header:</b> 1500 x 500 px</li>
          </ul>

          <h2>How to Crop a Photo Online</h2>
          <ol>
            <li>Click the upload box and select your photo from your phone, laptop or Google Drive.</li>
            <li>Drag the blue crop frame to move it, or pull the bottom-right corner to resize it.</li>
            <li>Set a custom file name if you need one.</li>
            <li>Hit <b>Download Cropped</b> — a high-quality PNG is saved to your device.</li>
          </ol>

          <h2>Tips for a Better Crop</h2>
          <p>
            <b>Use the rule of thirds.</b> Imagine a 3x3 grid over the frame and place the subject's eyes on the upper third line — almost every Vogue cover does this. <b>Leave breathing room.</b> Don't crop right up against the forehead or chin; a small margin keeps the photo looking professional. <b>Match the platform.</b> A great Instagram crop will look awful on LinkedIn if you ignore the circular mask. Crop a separate version for each channel. <b>Watch the resolution.</b> Cropping aggressively into a low-res photo will produce blurry results — always start with the highest-quality source you have.
          </p>

          <h2>Privacy & Security</h2>
          <p>
            Your photos contain personal information — faces, location data, document numbers. Uploading them to random "free crop" websites is risky. The ToolsKit.tech photo cropper runs <b>100% in your browser</b>: there is no upload, no server processing and no temporary copy. Once you close the tab, the photo is gone from our reach. This is the same approach our <Link to="/image-compressor" className="text-primary underline">image compressor</Link>, <Link to="/remove-background" className="text-primary underline">background remover</Link> and <Link to="/image-to-pdf" className="text-primary underline">image to PDF converter</Link> use — privacy by design, not as an afterthought.
          </p>

          <h2>Frequently Asked Questions</h2>
          <h3>Can I crop a photo into a circle?</h3>
          <p>This tool crops to a rectangle; LinkedIn, WhatsApp and Instagram will automatically mask your square crop into a circle on display. Crop a tight square here, upload it, and the platform handles the circular frame.</p>
          <h3>What file formats are supported?</h3>
          <p>Upload JPG, JPEG, PNG, WebP, GIF or BMP. The output is downloaded as a PNG to preserve maximum quality.</p>
          <h3>Is there a file size limit?</h3>
          <p>Because everything runs locally, the limit is your device's memory. On modern phones and laptops, photos up to 30–40 MB crop without issue.</p>
          <h3>Will the tool reduce my photo quality?</h3>
          <p>No. The cropper renders at the photo's native resolution, so the kept area stays as sharp as the original.</p>

          <h2>Related Free Photo Tools</h2>
          <p>
            Need to do more than crop? Try our <Link to="/image-compressor" className="text-primary underline">Image Compressor</Link> to shrink file size, the <Link to="/remove-background" className="text-primary underline">Background Remover</Link> for clean product shots, the <Link to="/kb-resize-pixel" className="text-primary underline">KB Resize Pixel</Link> tool to hit an exact upload limit, or <Link to="/image-to-pdf" className="text-primary underline">Image to PDF</Link> to bundle multiple cropped photos into one document. All of them are free, browser-based and privacy-first.
          </p>
        </>
      }
    />
  );
}