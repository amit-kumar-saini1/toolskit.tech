import { createFileRoute } from "@tanstack/react-router";
import EtsyFeeCalculator from "@/pages/tools/EtsyFeeCalculator";
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
  component: EtsyFeeCalculator,
});
