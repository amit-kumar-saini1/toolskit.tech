import { createFileRoute, Link } from "@tanstack/react-router";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { EtsyFeeCalculatorWidget } from "@/pages/tools/EtsyFeeCalculator";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/etsy-fee-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "Etsy Fee Calculator – Calculate Etsy Seller Fees & Profit 2026 | ToolsKit.tech",
      description:
        "Free Etsy Fee Calculator 2026. Calculate listing fee, 6.5% transaction fee, payment processing & offsite ads in USD, GBP, EUR, CAD, AUD, INR. See exact profit and margin per sale.",
      keywords: "etsy fee calculator",
      path: "/etsy-fee-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How accurate is this Etsy Fee Calculator?", acceptedAnswer: { "@type": "Answer", text: "The Etsy Fee Calculator uses Etsy's official 2026 fee structure: $0.20 listing fee, 6.5% transaction fee on item + shipping, country-specific payment processing and 15% offsite ads fee. Results match Etsy's seller dashboard to the cent." } },
        { "@type": "Question", name: "Does the Etsy Fee Calculator include offsite ads?", acceptedAnswer: { "@type": "Answer", text: "Yes. Toggle the Offsite Ads switch in the Etsy Fee Calculator to add the 15% fee. This fee is mandatory for shops earning over $10,000/year and optional for smaller shops." } },
        { "@type": "Question", name: "Is the Etsy Fee Calculator free?", acceptedAnswer: { "@type": "Answer", text: "Yes — the Etsy Fee Calculator is 100% free, with no signup and unlimited calculations." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/etsy-fee-calculator"
      h1="Etsy Fee Calculator – Seller Fees & Profit 2026"
      subtitle="Calculate Etsy listing, transaction, processing and offsite ads fees in USD, GBP, EUR, CAD, AUD or INR."
      tool={<EtsyFeeCalculatorWidget />}
      content={<Content />}
    />
  );
}

function Content() {
  return (
    <>
      <h2>What is the Etsy Fee Calculator?</h2>
      <p>
        The Etsy Fee Calculator is a free tool that computes every fee Etsy
        charges sellers — listing fee, 6.5% transaction fee, payment
        processing fee and the optional 15% offsite ads fee — so you can see
        the real profit on every sale before you list.
      </p>

      <h2>Etsy fee structure (2026)</h2>
      <ul>
        <li><b>Listing fee:</b> $0.20 per listing, renewed every 4 months or after each sale.</li>
        <li><b>Transaction fee:</b> 6.5% of item price + shipping.</li>
        <li><b>Payment processing:</b> country-specific (e.g. 3% + $0.25 in the US).</li>
        <li><b>Offsite ads:</b> 15% — mandatory for shops earning over $10,000/year.</li>
      </ul>

      <h2>How to use this Etsy Fee Calculator</h2>
      <ol>
        <li><b>Pick your currency</b> — USD, GBP, EUR, CAD, AUD or INR.</li>
        <li><b>Enter item price, shipping and your item cost (COGS).</b></li>
        <li><b>Set quantity</b> if selling more than one unit.</li>
        <li><b>Toggle Offsite Ads</b> if it applies to your shop.</li>
        <li><b>See net profit and margin instantly</b> in the result card.</li>
      </ol>

      <h2>Why every Etsy seller needs a fee calculator</h2>
      <p>
        Etsy's stacked fees can quietly eat 25–35% of your sale price. The
        Etsy Fee Calculator above shows exactly where every dollar goes so you
        can price products for real profit, not surprise losses.
      </p>

      <p className="mt-6">
        More free tools on ToolsKit:
        <Link to="/image-cropper" className="text-primary underline mx-1">Image Cropper</Link>,
        <Link to="/sip-calculator" className="text-primary underline mx-1">SIP Calculator</Link>.
      </p>
    </>
  );
}
