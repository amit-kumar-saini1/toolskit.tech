import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const PercentageCalculatorWidget = lazy(
  () => import("@/components/tools/widgets/PercentageCalculatorWidget"),
);

export const Route = createFileRoute("/percentage-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "Percentage Calculator — Free Online (% of, Increase, Decrease)",
      description:
        "Free online percentage calculator. Calculate X% of Y, find what percentage one number is of another, and compute percentage increase or decrease — instantly.",
      keywords: "percentage calculator, percent calculator, percentage increase calculator, percentage decrease calculator, percentage change",
      path: "/percentage-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How do I calculate a percentage of a number?", acceptedAnswer: { "@type": "Answer", text: "Multiply the number by the percentage and divide by 100. For example, 20% of 150 = (20 × 150) / 100 = 30." } },
        { "@type": "Question", name: "How do I calculate percentage increase?", acceptedAnswer: { "@type": "Answer", text: "Percentage increase = ((New value − Original value) / Original value) × 100. If a price rises from 200 to 250, the increase is ((250 − 200) / 200) × 100 = 25%." } },
        { "@type": "Question", name: "How do I find what percentage one number is of another?", acceptedAnswer: { "@type": "Answer", text: "Divide the part by the whole and multiply by 100. For example, 30 is what % of 150? → (30 / 150) × 100 = 20%." } },
        { "@type": "Question", name: "How do I calculate percentage decrease?", acceptedAnswer: { "@type": "Answer", text: "Same formula as increase — it just turns negative. If a value drops from 500 to 400: ((400 − 500) / 500) × 100 = −20%, i.e. a 20% decrease." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/percentage-calculator"
      h1="Percentage Calculator"
      subtitle="Calculate percentages, percentage of a number, and percentage change (increase or decrease) — instantly and free."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <PercentageCalculatorWidget />
        </Suspense>
      }
      content={
        <>
          <h2>Three Percentage Modes</h2>
          <ul>
            <li><b>X% of Y</b> — what is 20% of 150? Answer: 30</li>
            <li><b>X is what % of Y</b> — 30 is what % of 150? Answer: 20%</li>
            <li><b>% Increase / Decrease</b> — change from 200 to 250 = +25%</li>
          </ul>

          <h2>Percentage Formulas</h2>
          <ul>
            <li><b>Percentage of a number:</b> (X × Y) / 100</li>
            <li><b>What % is X of Y:</b> (X / Y) × 100</li>
            <li><b>Percentage change:</b> ((New − Old) / Old) × 100</li>
          </ul>

          <h2>Real-Life Uses</h2>
          <ul>
            <li>Calculating discounts (e.g. 30% off ₹1,499)</li>
            <li>Tax and GST (see our <Link to="/gst-calculator" className="text-primary underline">GST Calculator</Link>)</li>
            <li>Exam marks and grade percentages</li>
            <li>Salary hikes, profit margins and growth rates</li>
            <li>Interest, tips and EMI calculations</li>
          </ul>

          <p className="mt-6">
            More money calculators:
            <Link to="/tip-calculator" className="text-primary underline mx-1">Tip Calculator</Link>,
            <Link to="/sip-calculator" className="text-primary underline mx-1">SIP Calculator</Link>,
            <Link to="/compound-interest-calculator" className="text-primary underline mx-1">Compound Interest</Link>.
          </p>
        </>
      }
    />
  );
}