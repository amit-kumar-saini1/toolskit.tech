import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const HraCalculatorWidget = lazy(
  () => import("@/components/tools/widgets/HraCalculatorWidget"),
);

export const Route = createFileRoute("/hra-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "HRA Calculator — Free Online HRA Exemption Calculator (FY 2025-26)",
      description:
        "Calculate your HRA exemption instantly. Free online HRA Calculator with metro/non-metro support, accurate formula and tax-saving breakdown for salaried employees in India.",
      keywords: "hra calculator, hra exemption calculator, house rent allowance calculator, hra tax exemption, hra calculator india",
      path: "/hra-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How is HRA exemption calculated?", acceptedAnswer: { "@type": "Answer", text: "HRA exemption is the minimum of three values: (1) actual HRA received, (2) 50% of basic+DA in metro cities or 40% in non-metro, and (3) rent paid minus 10% of basic+DA. The lowest of these three is exempt from tax." } },
        { "@type": "Question", name: "Which cities qualify as metro for HRA?", acceptedAnswer: { "@type": "Answer", text: "Delhi, Mumbai, Kolkata and Chennai are the four metro cities where 50% of basic+DA is used. All other cities use 40%." } },
        { "@type": "Question", name: "Can I claim HRA in the new tax regime?", acceptedAnswer: { "@type": "Answer", text: "No. HRA exemption is available only under the old tax regime. The new regime offers lower slab rates but does not allow HRA, 80C or most other exemptions." } },
        { "@type": "Question", name: "Do I need rent receipts to claim HRA?", acceptedAnswer: { "@type": "Answer", text: "Yes. Submit monthly rent receipts to your employer. If annual rent exceeds ₹1,00,000, the landlord's PAN is also mandatory." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/hra-calculator"
      h1="HRA Calculator — House Rent Allowance Exemption"
      subtitle="Calculate your HRA tax exemption instantly — FY 2025-26 ready, 100% accurate."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <HraCalculatorWidget />
        </Suspense>
      }
      content={
        <>
          <h2>What is HRA?</h2>
          <p>
            House Rent Allowance (HRA) is a salary component paid by employers
            to cover rental housing costs. Under Section 10(13A) of the Income
            Tax Act, a portion of your HRA is exempt from tax — making it one
            of the biggest tax-saving allowances for salaried Indians living
            on rent.
          </p>

          <h2>HRA Exemption Formula</h2>
          <p>The exempt HRA is the <b>minimum of these three</b>:</p>
          <ol>
            <li>Actual HRA received from employer</li>
            <li>50% of (Basic + DA) for metro cities, 40% for non-metro</li>
            <li>Rent paid minus 10% of (Basic + DA)</li>
          </ol>
          <p>
            Whichever is the lowest of the three becomes the tax-free portion.
            The remaining HRA is added to your taxable income.
          </p>

          <h2>Example Calculation</h2>
          <p>
            Suppose your monthly Basic = ₹50,000, HRA received = ₹20,000, and
            you pay ₹18,000 rent in Mumbai (metro):
          </p>
          <ul>
            <li>Actual HRA: ₹2,40,000</li>
            <li>50% of Basic: ₹3,00,000</li>
            <li>Rent − 10% Basic: ₹2,16,000 − ₹60,000 = ₹1,56,000</li>
          </ul>
          <p>The exempt HRA is <b>₹1,56,000</b> — the lowest of the three.</p>

          <h2>HRA in Metro vs Non-Metro</h2>
          <p>
            Only Delhi, Mumbai, Kolkata and Chennai count as metro under the
            HRA rules. Residents of these cities get 50% of basic+DA in the
            second leg of the formula; everyone else gets 40%, which usually
            results in a smaller exemption.
          </p>

          <h2>Documents Required</h2>
          <ul>
            <li>Monthly rent receipts signed by your landlord</li>
            <li>Landlord's PAN if annual rent exceeds ₹1,00,000</li>
            <li>Rent agreement (recommended)</li>
          </ul>

          <p className="mt-6">
            Plan your finances with more calculators:
            <Link to="/sip-calculator" className="text-primary underline mx-1">SIP Calculator</Link>,
            <Link to="/fd-calculator" className="text-primary underline mx-1">FD Calculator</Link>,
            <Link to="/ppf-calculator" className="text-primary underline mx-1">PPF Calculator</Link>,
            and
            <Link to="/gst-calculator" className="text-primary underline mx-1">GST Calculator</Link>.
          </p>
        </>
      }
    />
  );
}