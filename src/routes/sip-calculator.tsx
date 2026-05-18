import { createFileRoute, Link } from "@tanstack/react-router";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { SIPCalculatorWidget } from "@/pages/tools/SIPCalculator";
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
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/sip-calculator"
      h1="SIP Calculator – Mutual Fund SIP Return Calculator"
      subtitle="Calculate your SIP returns instantly. ₹1000, ₹5000, ₹10000 monthly SIP — 10, 20, 30 year returns at a glance."
      tool={<SIPCalculatorWidget />}
      content={<Content />}
    />
  );
}

function Content() {
  return (
    <>
      <h2>What is a SIP Calculator?</h2>
      <p>
        A SIP Calculator is a free online tool that helps you estimate the
        future value of your monthly mutual fund SIP (Systematic Investment
        Plan). Enter your monthly investment, expected annual return and time
        period — the SIP Calculator does the rest.
      </p>
      <p>
        SIP investments are one of the simplest ways to build long-term wealth.
        A modest ₹5,000 per month at 12% expected return can grow to about
        ₹50 lakh in 20 years. The SIP Calculator above shows exactly how the
        magic of compounding works on your money.
      </p>

      <h2>How to use this SIP Calculator</h2>
      <ol>
        <li><b>Enter monthly investment</b> — anywhere from ₹500 to ₹5,00,000.</li>
        <li><b>Set expected return rate</b> — 12% for equity funds, 7–8% for debt funds.</li>
        <li><b>Choose time period</b> — from 1 to 40 years.</li>
        <li><b>See total value, invested amount and estimated returns instantly.</b></li>
      </ol>

      <h2>SIP Calculator Formula</h2>
      <p>
        The SIP Calculator uses the standard future value formula
        <b> FV = P × ((1 + r)^n − 1) / r × (1 + r)</b> where P is the monthly
        investment, r is the monthly rate of return, and n is the total number
        of months.
      </p>

      <h2>SIP vs FD — which is better?</h2>
      <p>
        FDs give a fixed 6–7% return with zero risk. SIPs in equity mutual
        funds have historically delivered 12–15% over the long term, but with
        market risk. The SIP Calculator above lets you experiment with
        different return rates so you can pick what suits your risk appetite.
      </p>

      <p className="mt-6">
        Explore more free finance tools on ToolsKit:
        <Link to="/fd-calculator" className="text-primary underline mx-1">FD Calculator</Link>,
        <Link to="/ppf-calculator" className="text-primary underline mx-1">PPF Calculator</Link>
        or the
        <Link to="/etsy-fee-calculator" className="text-primary underline mx-1">Etsy Fee Calculator</Link>.
      </p>
    </>
  );
}
