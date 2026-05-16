import { createFileRoute } from "@tanstack/react-router";
import PPFCalculator from "@/pages/tools/PPFCalculator";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/ppf-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "PPF Calculator – Public Provident Fund Maturity Calculator 2026 | ToolsKit.tech",
      description:
        "Free PPF Calculator. Calculate Public Provident Fund maturity amount, total interest and year-wise balance at the latest 7.1% PPF interest rate. Includes PPF vs SIP comparison.",
      keywords: "ppf calculator",
      path: "/ppf-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is the current PPF interest rate?", acceptedAnswer: { "@type": "Answer", text: "The current PPF interest rate is 7.1% per annum, compounded yearly. The PPF Calculator above uses this rate by default and lets you change it." } },
        { "@type": "Question", name: "How much will ₹1.5 lakh yearly become in 15 years?", acceptedAnswer: { "@type": "Answer", text: "At 7.1% PPF interest, ₹1,50,000 yearly grows to approximately ₹43.2 lakh in 15 years — fully tax-free. Use the PPF Calculator for exact numbers." } },
        { "@type": "Question", name: "Is PPF maturity tax-free?", acceptedAnswer: { "@type": "Answer", text: "Yes. PPF enjoys EEE status — investment qualifies for Section 80C deduction, interest is tax-free, and the maturity amount is fully tax-free." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: PPFCalculator,
});
