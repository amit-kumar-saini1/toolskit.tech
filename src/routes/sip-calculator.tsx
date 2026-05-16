import { createFileRoute } from "@tanstack/react-router";
import SIPCalculator from "@/pages/tools/SIPCalculator";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/sip-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "SIP Calculator – Mutual Fund SIP Return Calculator Online | ToolsKit.tech",
      description:
        "Free SIP Calculator. Calculate mutual fund SIP returns, maturity amount, total invested & estimated returns instantly. ₹1000, ₹5000, ₹10000 monthly SIP — 10, 20, 30 year returns.",
      keywords: "sip calculator",
      path: "/sip-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How does this SIP Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Enter monthly investment, expected return rate and time period. The SIP Calculator instantly shows total invested amount, estimated returns and maturity value using the standard SIP formula FV = P × ((1+r)^n − 1) / r × (1+r)." } },
        { "@type": "Question", name: "Is the SIP Calculator free?", acceptedAnswer: { "@type": "Answer", text: "Yes, the SIP Calculator is 100% free with no signup and unlimited use." } },
        { "@type": "Question", name: "What return rate should I use in the SIP Calculator?", acceptedAnswer: { "@type": "Answer", text: "For equity mutual funds, 12% per annum is the typical long-term assumption. For debt funds use 7-8%. The SIP Calculator lets you adjust the rate from 1% to 30%." } },
        { "@type": "Question", name: "How much will ₹5000 monthly SIP become in 20 years?", acceptedAnswer: { "@type": "Answer", text: "At 12% expected return, a ₹5000 monthly SIP grows to approximately ₹50 lakh in 20 years. Use the SIP Calculator above for your exact numbers." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: SIPCalculator,
});
