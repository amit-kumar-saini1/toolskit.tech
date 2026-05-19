import { createFileRoute, Link } from "@tanstack/react-router";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { FDCalculatorWidget } from "@/pages/tools/FDCalculator";
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
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/fd-calculator"
      h1="FD Calculator – Fixed Deposit Maturity Calculator"
      subtitle="Calculate Fixed Deposit maturity, interest and FD vs SIP comparison instantly."
      tool={<FDCalculatorWidget />}
      content={<Content />}
    />
  );
}

function Content() {
  return (
    <>
      <h2>What is an FD Calculator?</h2>
      <p>
        An FD Calculator is a free online tool that helps you calculate the
        maturity amount and total interest earned on a Fixed Deposit. Enter
        your principal, interest rate and tenure — the FD Calculator does the
        math using quarterly compounding, just like banks do.
      </p>

      <h2>How to use the FD Calculator</h2>
      <ol>
        <li><b>Enter principal amount</b> — from ₹1,000 to ₹1 crore.</li>
        <li><b>Set interest rate</b> — use your bank's current FD rate (typically 6–7.5%).</li>
        <li><b>Choose tenure</b> — from 1 to 25 years.</li>
        <li><b>See maturity amount and total interest instantly.</b></li>
      </ol>

      <h2>FD Calculator Formula</h2>
      <p>
        The FD Calculator uses <b>A = P × (1 + r/n)^(n×t)</b> where P is the
        principal, r is the annual interest rate, n is the compounding
        frequency (4 for quarterly) and t is tenure in years.
      </p>

      <h2>Best FD Interest Rates in 2026</h2>
      <p>
        Top bank FD rates today: <b>SBI 6.50–7.10%</b>, <b>HDFC 7.00–7.40%</b>,
        <b> ICICI 6.90–7.25%</b>, <b>Post Office FD 7.50%</b>. Senior citizens
        get an extra 0.25–0.50%. Use this FD Calculator with any rate.
      </p>

      <h2>FD vs SIP — which gives better returns?</h2>
      <p>
        FDs offer guaranteed 6–7% returns; SIPs in mutual funds have
        historically delivered 12–15% with market risk. The FD Calculator
        includes an FD vs SIP comparison tab so you can see the difference
        side-by-side.
      </p>

      <p className="mt-6">
        Try more free calculators on ToolsKit:
        <Link to="/sip-calculator" className="text-primary underline mx-1">SIP Calculator</Link>,
        <Link to="/ppf-calculator" className="text-primary underline mx-1">PPF Calculator</Link>.
      </p>
    </>
  );
}
