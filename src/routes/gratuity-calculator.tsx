import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const GratuityCalculatorWidget = lazy(
  () => import("@/components/tools/widgets/GratuityCalculatorWidget"),
);

export const Route = createFileRoute("/gratuity-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "Gratuity Calculator — Free Online (Payment of Gratuity Act 2025)",
      description:
        "Free gratuity calculator as per the Payment of Gratuity Act. Calculate your end-of-service gratuity using last drawn (Basic + DA) and years of service. Includes the ₹20 lakh tax-free limit.",
      keywords: "gratuity calculator, payment of gratuity act calculator, gratuity formula, end of service gratuity, gratuity india",
      path: "/gratuity-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is the gratuity formula?", acceptedAnswer: { "@type": "Answer", text: "For employees covered by the Payment of Gratuity Act: Gratuity = (15 / 26) × Last drawn (Basic + DA) × Years of service. For those not covered, the divisor is 30 instead of 26." } },
        { "@type": "Question", name: "Who is eligible for gratuity?", acceptedAnswer: { "@type": "Answer", text: "Any employee who has completed at least 5 years of continuous service with the same employer is eligible. The 5-year rule is waived in case of death or disablement." } },
        { "@type": "Question", name: "Is gratuity taxable?", acceptedAnswer: { "@type": "Answer", text: "Gratuity is tax-free up to ₹20,00,000 (₹20 lakh) over an employee's lifetime under Section 10(10) of the Income Tax Act. Anything above this limit is taxed as salary." } },
        { "@type": "Question", name: "How are years of service counted?", acceptedAnswer: { "@type": "Answer", text: "Under the Act, service of 6 months or more in the final year is counted as a full year. So 7 years 7 months is treated as 8 years for the calculation." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/gratuity-calculator"
      h1="Gratuity Calculator"
      subtitle="Calculate your gratuity as per the Payment of Gratuity Act, including the ₹20 lakh tax-free limit."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <GratuityCalculatorWidget />
        </Suspense>
      }
      content={
        <>
          <h2>What is Gratuity?</h2>
          <p>
            Gratuity is a lump-sum benefit your employer pays as a token of
            appreciation when you leave the organisation after completing at
            least 5 years of continuous service. It is governed by the
            <b> Payment of Gratuity Act, 1972</b>.
          </p>

          <h2>Gratuity Formula</h2>
          <p><b>Covered by the Act:</b> Gratuity = (15 / 26) × Last drawn (Basic + DA) × Years of service</p>
          <p><b>Not covered:</b> Gratuity = (15 / 30) × Average salary × Completed years</p>

          <h2>Example Calculation</h2>
          <p>
            Last basic + DA = ₹50,000, service = 10 years, employer covered by Act:
          </p>
          <ul>
            <li>Gratuity = (15 / 26) × 50,000 × 10 = <b>₹2,88,461</b></li>
            <li>Fully tax-free (well under the ₹20 lakh limit)</li>
          </ul>

          <h2>Tax Treatment</h2>
          <ul>
            <li>Government employees: <b>fully tax-free</b></li>
            <li>Private employees covered by the Act: tax-free up to <b>₹20 lakh</b> in their lifetime</li>
            <li>Excess over ₹20 lakh: taxable as salary</li>
          </ul>

          <p className="mt-6">
            More retirement & salary tools:
            <Link to="/nps-calculator" className="text-primary underline mx-1">NPS Calculator</Link>,
            <Link to="/ppf-calculator" className="text-primary underline mx-1">PPF Calculator</Link>,
            <Link to="/hra-calculator" className="text-primary underline mx-1">HRA Calculator</Link>,
            <Link to="/income-tax-calculator" className="text-primary underline mx-1">Income Tax Calculator</Link>.
          </p>
        </>
      }
    />
  );
}