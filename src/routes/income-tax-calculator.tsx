import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const IncomeTaxCalculatorWidget = lazy(
  () => import("@/components/tools/widgets/IncomeTaxCalculatorWidget"),
);

export const Route = createFileRoute("/income-tax-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "Income Tax Calculator FY 2025-26 — New & Old Regime (Free)",
      description:
        "Free Income Tax Calculator for FY 2025-26 (AY 2026-27). Compare New vs Old tax regime, calculate tax payable with standard deduction, cess and Sec 87A rebate instantly.",
      keywords: "income tax calculator, income tax calculator india, new tax regime calculator, old vs new tax regime, tax calculator fy 2025-26",
      path: "/income-tax-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What are the income tax slabs for FY 2025-26?", acceptedAnswer: { "@type": "Answer", text: "Under the new regime: 0% up to ₹4L, 5% from ₹4L–8L, 10% from ₹8L–12L, 15% from ₹12L–16L, 20% from ₹16L–20L, 25% from ₹20L–24L, and 30% above ₹24L. A Section 87A rebate makes income up to ₹12L tax-free after standard deduction." } },
        { "@type": "Question", name: "Should I choose New or Old tax regime?", acceptedAnswer: { "@type": "Answer", text: "Choose Old if you have large deductions (80C, 80D, HRA, home loan interest). Choose New for simpler filing and lower slabs — usually better if your deductions are under ₹3-4 lakh." } },
        { "@type": "Question", name: "Is standard deduction available in both regimes?", acceptedAnswer: { "@type": "Answer", text: "Yes. ₹75,000 standard deduction in the new regime and ₹50,000 in the old regime for salaried employees and pensioners." } },
        { "@type": "Question", name: "Is this calculator accurate?", acceptedAnswer: { "@type": "Answer", text: "It uses the official FY 2025-26 slabs, standard deduction and Sec 87A rebate. Final tax may vary based on capital gains, surcharge for income above ₹50L, and other specific items — consult a CA for filing." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/income-tax-calculator"
      h1="Income Tax Calculator FY 2025-26"
      subtitle="Calculate your income tax under the New & Old Regime — accurate, free, instant."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <IncomeTaxCalculatorWidget />
        </Suspense>
      }
      content={
        <>
          <h2>Income Tax Slabs — New Regime (FY 2025-26)</h2>
          <ul>
            <li>Up to ₹4,00,000 — <b>Nil</b></li>
            <li>₹4,00,001 – ₹8,00,000 — <b>5%</b></li>
            <li>₹8,00,001 – ₹12,00,000 — <b>10%</b></li>
            <li>₹12,00,001 – ₹16,00,000 — <b>15%</b></li>
            <li>₹16,00,001 – ₹20,00,000 — <b>20%</b></li>
            <li>₹20,00,001 – ₹24,00,000 — <b>25%</b></li>
            <li>Above ₹24,00,000 — <b>30%</b></li>
          </ul>
          <p>
            With the ₹75,000 standard deduction and Section 87A rebate,
            salaried individuals earning up to <b>₹12.75 lakh</b> pay zero
            income tax under the new regime — a massive change introduced in
            Budget 2025.
          </p>

          <h2>Income Tax Slabs — Old Regime</h2>
          <ul>
            <li>Up to ₹2,50,000 — Nil</li>
            <li>₹2,50,001 – ₹5,00,000 — 5%</li>
            <li>₹5,00,001 – ₹10,00,000 — 20%</li>
            <li>Above ₹10,00,000 — 30%</li>
          </ul>
          <p>
            The old regime allows HRA, 80C (₹1.5L), 80D, home loan interest
            (₹2L) and several other deductions — making it attractive for
            people with home loans and high investments.
          </p>

          <h2>New vs Old Regime — Which Is Better?</h2>
          <p>
            Use the toggle above to compare both regimes side by side. As a
            quick rule: if your total deductions exceed roughly ₹3.75 lakh,
            the old regime usually saves more tax. Otherwise the new regime,
            with its lower slabs and ₹12L rebate, wins comfortably.
          </p>

          <h2>How the Calculator Works</h2>
          <ol>
            <li>Pick your regime — New or Old.</li>
            <li>Enter annual gross income (salary, business, other income).</li>
            <li>For old regime, enter your total deductions (80C + 80D + HRA + others).</li>
            <li>Get instant tax, cess (4%) and take-home estimates.</li>
          </ol>

          <p className="mt-6">
            Pair this with our
            <Link to="/hra-calculator" className="text-primary underline mx-1">HRA Calculator</Link>,
            <Link to="/sip-calculator" className="text-primary underline mx-1">SIP Calculator</Link>,
            <Link to="/ppf-calculator" className="text-primary underline mx-1">PPF Calculator</Link>,
            and
            <Link to="/fd-calculator" className="text-primary underline mx-1">FD Calculator</Link>
            for end-to-end financial planning.
          </p>
        </>
      }
    />
  );
}