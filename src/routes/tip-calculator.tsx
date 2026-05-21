import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const TipCalculatorWidget = lazy(
  () => import("@/components/tools/widgets/TipCalculatorWidget"),
);

export const Route = createFileRoute("/tip-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "Tip Calculator — Free Online (Split the Bill Instantly)",
      description:
        "Free tip calculator: enter the bill, choose a tip percentage, and split between any number of people. Calculates tip, total and per-person amount instantly.",
      keywords: "tip calculator, bill splitter, gratuity calculator, restaurant tip, split bill calculator",
      path: "/tip-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How much should I tip?", acceptedAnswer: { "@type": "Answer", text: "A standard tip is 15–20% for good service. 10–12% for average service, and 20%+ for exceptional service. In India, 5–10% is customary at restaurants when service charge isn't already added." } },
        { "@type": "Question", name: "How do I calculate tip on a bill?", acceptedAnswer: { "@type": "Answer", text: "Multiply the bill by the tip percentage divided by 100. For example, 15% tip on a ₹1,000 bill = 1,000 × 15 / 100 = ₹150." } },
        { "@type": "Question", name: "How do I split the bill evenly?", acceptedAnswer: { "@type": "Answer", text: "Add the tip to the bill to get the total, then divide by the number of people. This calculator does it automatically." } },
        { "@type": "Question", name: "Should I tip on tax?", acceptedAnswer: { "@type": "Answer", text: "Most people tip on the pre-tax amount, but tipping on the total (tax included) is also common and slightly more generous." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/tip-calculator"
      h1="Tip Calculator"
      subtitle="Split any restaurant bill in seconds — calculate the tip, the total, and what each person owes."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <TipCalculatorWidget />
        </Suspense>
      }
      content={
        <>
          <h2>How to Use the Tip Calculator</h2>
          <ol>
            <li>Enter the bill amount.</li>
            <li>Pick a tip percentage with the slider or a preset (10–25%).</li>
            <li>Enter the number of people splitting the bill.</li>
            <li>See the tip, total and per-person share update instantly.</li>
          </ol>

          <h2>How Much to Tip?</h2>
          <ul>
            <li><b>Excellent service:</b> 20–25%</li>
            <li><b>Good service:</b> 15–18%</li>
            <li><b>Average service:</b> 10–12%</li>
            <li><b>Poor service:</b> 5% or speak with the manager</li>
          </ul>

          <h2>Tipping in India vs Abroad</h2>
          <p>
            In India, restaurants often already include a 5–10% service charge — tipping on top is optional. In the US, a 15–20% tip is expected since servers depend on it. Europe and Australia generally tip 5–10%, and Japan does not tip at all.
          </p>

          <p className="mt-6">
            More handy calculators:
            <Link to="/gst-calculator" className="text-primary underline mx-1">GST Calculator</Link>,
            <Link to="/compound-interest-calculator" className="text-primary underline mx-1">Compound Interest</Link>,
            <Link to="/sip-calculator" className="text-primary underline mx-1">SIP Calculator</Link>.
          </p>
        </>
      }
    />
  );
}