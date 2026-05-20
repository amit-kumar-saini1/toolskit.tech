import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const CompoundInterestCalculatorWidget = lazy(
  () => import("@/components/tools/widgets/CompoundInterestCalculatorWidget"),
);

export const Route = createFileRoute("/compound-interest-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "Compound Interest Calculator — Free Online (Daily, Monthly, Yearly)",
      description:
        "Free online compound interest calculator. Instantly calculate maturity amount and interest earned with daily, monthly, quarterly, half-yearly or yearly compounding. Indian rupee ready.",
      keywords: "compound interest calculator, compound interest calculator india, ci calculator, monthly compound interest, daily compound interest",
      path: "/compound-interest-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is the compound interest formula?", acceptedAnswer: { "@type": "Answer", text: "A = P × (1 + r/n)^(n·t). A is the maturity amount, P is the principal, r is the annual rate as a decimal, n is the number of compounding periods per year, and t is the time in years." } },
        { "@type": "Question", name: "What is the difference between simple and compound interest?", acceptedAnswer: { "@type": "Answer", text: "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus all previously earned interest, so your money grows faster over time." } },
        { "@type": "Question", name: "Which compounding frequency is best?", acceptedAnswer: { "@type": "Answer", text: "The more frequent the compounding, the more interest you earn. Daily compounding yields slightly more than monthly, which yields more than quarterly or yearly — though the differences shrink at higher frequencies." } },
        { "@type": "Question", name: "Is this calculator free?", acceptedAnswer: { "@type": "Answer", text: "Yes — 100% free, runs entirely in your browser, no signup or download required." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/compound-interest-calculator"
      h1="Compound Interest Calculator"
      subtitle="Calculate compound interest with daily, monthly, quarterly or yearly compounding — free and instant."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <CompoundInterestCalculatorWidget />
        </Suspense>
      }
      content={
        <>
          <h2>What is Compound Interest?</h2>
          <p>
            Compound interest is interest calculated on the initial principal plus
            all the accumulated interest from previous periods. It is often called
            the "eighth wonder of the world" because of how dramatically it can
            grow your money over time, compared to simple interest which is paid
            only on the original principal.
          </p>

          <h2>Compound Interest Formula</h2>
          <p>The standard formula used by this calculator is:</p>
          <p><b>A = P × (1 + r/n)<sup>n·t</sup></b></p>
          <ul>
            <li><b>A</b> — Maturity amount (principal + interest)</li>
            <li><b>P</b> — Principal (initial amount invested)</li>
            <li><b>r</b> — Annual interest rate as a decimal (8% = 0.08)</li>
            <li><b>n</b> — Compounding frequency per year (1, 2, 4, 12, 365)</li>
            <li><b>t</b> — Time period in years</li>
          </ul>

          <h2>Example Calculation</h2>
          <p>
            Invest ₹1,00,000 at 8% annual rate, compounded yearly, for 5 years:
          </p>
          <ul>
            <li>A = 1,00,000 × (1 + 0.08/1)<sup>1×5</sup> = ₹1,46,933</li>
            <li>Interest earned = ₹46,933</li>
          </ul>
          <p>
            Switch the same investment to <b>monthly</b> compounding and the maturity
            grows to ₹1,48,985 — about ₹2,000 more from frequency alone.
          </p>

          <h2>Simple vs Compound Interest</h2>
          <p>
            On ₹1 lakh at 8% for 10 years: simple interest gives ₹80,000 total
            interest, while annual compounding gives ₹1,15,892 — over <b>44% more</b>.
            The longer the duration, the bigger the gap.
          </p>

          <h2>Where Compound Interest Applies</h2>
          <ul>
            <li>Fixed Deposits (FDs) and Recurring Deposits (RDs)</li>
            <li>PPF, EPF and other long-term savings schemes</li>
            <li>Mutual funds and SIPs (effective compounding via NAV growth)</li>
            <li>Savings accounts (usually quarterly compounding)</li>
            <li>Credit card debt — works against you here</li>
          </ul>

          <p className="mt-6">
            Pair this with our other financial planners:
            <Link to="/sip-calculator" className="text-primary underline mx-1">SIP Calculator</Link>,
            <Link to="/fd-calculator" className="text-primary underline mx-1">FD Calculator</Link>,
            <Link to="/ppf-calculator" className="text-primary underline mx-1">PPF Calculator</Link>,
            <Link to="/income-tax-calculator" className="text-primary underline mx-1">Income Tax Calculator</Link>,
            and
            <Link to="/hra-calculator" className="text-primary underline mx-1">HRA Calculator</Link>.
          </p>
        </>
      }
    />
  );
}