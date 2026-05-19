import { createFileRoute, Link } from "@tanstack/react-router";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { PPFCalculatorWidget } from "@/pages/tools/PPFCalculator";
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
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/ppf-calculator"
      h1="PPF Calculator – Public Provident Fund Calculator"
      subtitle="Calculate PPF maturity, interest and year-wise balance at the latest 7.1% rate."
      tool={<PPFCalculatorWidget />}
      content={<Content />}
    />
  );
}

function Content() {
  return (
    <>
      <h2>What is a PPF Calculator?</h2>
      <p>
        A PPF Calculator is a free online tool to compute the maturity amount,
        total interest and year-wise growth of your Public Provident Fund
        investment. PPF is India's most popular tax-free savings scheme,
        currently paying 7.1% per annum (Q1 2026).
      </p>

      <h2>How to use this PPF Calculator</h2>
      <ol>
        <li><b>Enter yearly investment</b> — from ₹500 to ₹1,50,000 (the PPF annual limit).</li>
        <li><b>Set interest rate</b> — defaults to 7.1% (current PPF rate).</li>
        <li><b>Choose tenure</b> — minimum 15 years, extendable in 5-year blocks.</li>
        <li><b>View maturity amount, total interest and year-wise balance.</b></li>
      </ol>

      <h2>PPF benefits in 2026</h2>
      <ul>
        <li><b>Tax-free returns</b> — Section 80C deduction + tax-free maturity (EEE status).</li>
        <li><b>Government guarantee</b> — 100% safe, sovereign-backed.</li>
        <li><b>7.1% interest rate</b>, compounded annually.</li>
        <li><b>Loan facility</b> between the 3rd and 6th year.</li>
        <li><b>Partial withdrawal</b> allowed from the 7th year.</li>
      </ul>

      <h2>PPF vs SIP — which is better?</h2>
      <p>
        PPF gives guaranteed, tax-free returns. SIPs in equity mutual funds
        have historically delivered higher returns but with market risk. The
        PPF Calculator includes a PPF vs SIP comparison tab so you can see
        both side-by-side for the same monthly outflow.
      </p>

      <p className="mt-6">
        Try more free calculators on ToolsKit:
        <Link to="/sip-calculator" className="text-primary underline mx-1">SIP Calculator</Link>,
        <Link to="/fd-calculator" className="text-primary underline mx-1">FD Calculator</Link>.
      </p>
    </>
  );
}
