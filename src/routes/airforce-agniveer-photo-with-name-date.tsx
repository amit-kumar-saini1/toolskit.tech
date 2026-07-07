import { createFileRoute, Link } from "@tanstack/react-router";
import AgniveerPhotoWidget from "@/components/tools/widgets/AgniveerPhotoWidget";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/airforce-agniveer-photo-with-name-date")({
  head: () => {
    const base = buildPageHead({
      title: "Airforce Agniveervayu 02/2027 Photo with Name & Date — Free",
      description:
        "Free online tool to make Indian Air Force Agniveervayu Intake 02/2027 photo with your name and date on a black slate in white chalk (100–200 KB JPG) as per official IAF guidelines.",
      keywords:
        "agniveervayu 02 2027 photo, airforce agniveer photo with name and date, iaf agniveer photo maker, agnipath photo, indian air force photo slate name date",
      path: "/airforce-agniveer-photo-with-name-date",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What are the photo rules for IAF Agniveervayu Intake 02/2027?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "As per the official advertisement, the photo must be a recent (within 1 month) passport-size colour photo on a light background, front portrait, no facemask or headgear (except Sikhs). The candidate must hold a black slate with name and date written in white chalk in CAPITAL letters. File format .jpg/.jpeg, size 100 KB to 200 KB.",
          },
        },
        {
          "@type": "Question",
          name: "Can I add name and date on my Agniveer photo online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Upload your passport photo, type your name in capitals and the date, and download a JPG that adds a black slate with white chalk-style name and date exactly as required by IAF Agniveervayu 02/2027.",
          },
        },
        {
          "@type": "Question",
          name: "What is the required file size for the Agniveer photo upload?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The IAF portal accepts JPG/JPEG files between 100 KB and 200 KB. Our tool auto-tunes JPG quality so the downloaded file falls in this range.",
          },
        },
        {
          "@type": "Question",
          name: "Is this tool free and safe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. It is 100% free, no signup, no watermark. All processing happens inside your browser — your photo is never uploaded to any server.",
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
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/airforce-agniveer-photo-with-name-date"
      h1="Airforce Agniveervayu 02/2027 Photo with Name & Date"
      subtitle="Free online tool to create your IAF Agniveer application photo (100–200 KB JPG) with name & date on a black slate — as per official guidelines."
      tool={<AgniveerPhotoWidget />}
      content={<Content />}
    />
  );
}

function Content() {
  return (
    <>
      <p>
        The Indian Air Force has opened online registration for
        <b> Agniveervayu Intake 02/2027 </b> under the Agnipath Scheme
        (registration 06 July 2026 – 26 July 2026, online exam on 22–23
        September 2026). One of the most common reasons applications get
        rejected is an incorrect photo upload. This free ToolsKit tool creates
        a compliant photo with your <b>name and date on a black slate</b> in
        white chalk-style writing — exactly matching the IAF specification.
      </p>

      <h2>IAF Agniveervayu 02/2027 Photo Guidelines (Official)</h2>
      <p>
        As per Para 42.3.1 of the official advertisement (Advt Agniveervayu
        02/2027):
      </p>
      <ul>
        <li>Passport-size <b>recent colour photograph</b> (taken not before one month from date of registration).</li>
        <li>Format: <b>.jpg or .jpeg only</b>.</li>
        <li>File size: <b>100 KB to 200 KB</b>.</li>
        <li><b>Front portrait</b>, light background, without facemask and headgear (Sikhs exempt).</li>
        <li>Candidate must hold a <b>black slate</b> in front of the chest.</li>
        <li>Name and date of photo <b>written in white chalk, CAPITAL letters</b>.</li>
        <li>Look straight at the camera with a relaxed face.</li>
      </ul>
      <p>
        <b>Note:</b> Change in appearance (beard, hairstyle, headgear) between
        this photo and Phase-II can lead to cancellation. Take the photo close
        to your registration date.
      </p>

      <h2>How to Use the Agniveer Photo Tool</h2>
      <ol>
        <li><b>Click upload</b> and choose your passport-size photo (light background, front face).</li>
        <li>Enter your <b>full name in CAPITAL letters</b> exactly as in Aadhaar / class 10 marksheet.</li>
        <li>Enter today's <b>date in DD/MM/YYYY</b> format.</li>
        <li>Preview the black slate with white chalk name & date under your photo.</li>
        <li>Click <b>Download JPG</b> — the file is auto-compressed to 100–200 KB.</li>
        <li>Upload the downloaded JPG on <a href="https://iafrecruitment.edcil.co.in" target="_blank" rel="noopener noreferrer">iafrecruitment.edcil.co.in</a>.</li>
      </ol>

      <h2>Why Use ToolsKit for Your Agniveer Photo?</h2>
      <ul>
        <li><b>100% free</b> — no signup, no watermark, no daily limit.</li>
        <li><b>Auto file-size tuning</b> — output JPG always in 100–200 KB range.</li>
        <li><b>Private</b> — the photo never leaves your browser.</li>
        <li><b>Format matches IAF spec</b> — passport aspect, black slate, white chalk-style capital text.</li>
      </ul>

      <h2>Key Dates — Agniveervayu Intake 02/2027</h2>
      <ul>
        <li>Online registration: <b>06 July 2026 to 26 July 2026</b></li>
        <li>Online examination (Phase-I): <b>22–23 September 2026</b></li>
        <li>Eligible date of birth: <b>01 July 2005 to 01 January 2010</b></li>
        <li>Application fee: <b>₹550/- + 18% GST</b> (non-refundable)</li>
        <li>Official portal: <a href="https://iafrecruitment.edcil.co.in" target="_blank" rel="noopener noreferrer">iafrecruitment.edcil.co.in</a></li>
      </ul>

      <h2>Other Documents You Will Need</h2>
      <p>Along with this name-and-date photo, you also need:</p>
      <ul>
        <li>Candidate's signature (black ink on white paper, 80–150 KB JPG).</li>
        <li>Left thumb impression (50–100 KB JPG).</li>
        <li>Parent's signature (if candidate is below 18).</li>
        <li>Live webcam capture during registration.</li>
      </ul>

      <p className="mt-6">
        You can resize your signature and thumb impression with our free
        <Link to="/tools/kb-converter" className="text-primary underline mx-1">Increase Image Size in KB</Link>
        tool, remove photo background with the
        <Link to="/remove-background" className="text-primary underline mx-1">Remove Background</Link>
        tool, or add name & date to any other document photo using
        <Link to="/name-and-date-on-photo" className="text-primary underline mx-1">Name & Date on Photo</Link>.
      </p>

      <p className="text-xs text-muted-foreground mt-6">
        Disclaimer: ToolsKit.tech is not affiliated with the Indian Air Force
        or EdCIL. Photo guidelines are summarised from the official
        Agniveervayu 02/2027 advertisement. Always cross-check the latest
        rules on <a href="https://iafrecruitment.edcil.co.in" target="_blank" rel="noopener noreferrer">iafrecruitment.edcil.co.in</a>.
      </p>
    </>
  );
}
