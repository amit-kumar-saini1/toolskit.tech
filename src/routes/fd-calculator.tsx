import { createFileRoute } from "@tanstack/react-router";
import FDCalculator from "@/pages/tools/FDCalculator";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/fd-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "FD Calculator – Fixed Deposit Maturity & Interest Calculator 2026 | ToolsKit.tech",
      description:
        "Free FD Calculator 2026. Calculate Fixed Deposit maturity amount, total interest and FD vs SIP comparison. Supports any principal, interest rate and tenure from 1 to 25 years.",
      keywords: "fd calculator",
      path: "/fd-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How does this FD Calculator work?", acceptedAnswer: { "@type": "Answer", text: "The FD Calculator uses the standard quarterly compounding formula A = P × (1 + r/4)^(4n) to compute the maturity amount of any Fixed Deposit. Just enter principal, interest rate and tenure." } },
        { "@type": "Question", name: "What is the FD interest rate in 2026?", acceptedAnswer: { "@type": "Answer", text: "Major bank FD rates in 2026 are: SBI 6.50-7.10%, HDFC 7.00-7.40%, ICICI 6.90-7.25% and Post Office FD 7.50%. Senior citizens get an extra 0.25-0.50%. The FD Calculator lets you input any rate." } },
        { "@type": "Question", name: "Is the FD Calculator free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes — the FD Calculator is 100% free, no signup, unlimited use." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: FDCalculator,
});
