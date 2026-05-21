import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const NpsCalculatorWidget = lazy(
  () => import("@/components/tools/widgets/NpsCalculatorWidget"),
);

export const Route = createFileRoute("/nps-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "NPS Calculator — National Pension Scheme Maturity & Pension Calculator",
      description:
        "Free NPS calculator: estimate your National Pension Scheme corpus, tax-free lump sum and monthly pension at retirement. Adjust monthly investment, age, return and annuity rate.",
      keywords: "nps calculator, national pension scheme calculator, nps pension calculator, nps maturity calculator, nps return calculator",
      path: "/nps-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How is NPS maturity calculated?", acceptedAnswer: { "@type": "Answer", text: "NPS uses the standard SIP / annuity-due formula: FV = P × ((1 + r)^n − 1) / r × (1 + r), where P is the monthly contribution, r is the monthly return and n is the number of months until retirement." } },
        { "@type": "Question", name: "How much pension will I get from NPS?", acceptedAnswer: { "@type": "Answer", text: "At retirement, at least 40% of your NPS corpus must be used to buy an annuity. Monthly pension = (annuity corpus × annuity rate) / 12. Typical annuity rates are 5–7% per year." } },
        { "@type": "Question", name: "Is NPS tax-free at maturity?", acceptedAnswer: { "@type": "Answer", text: "60% of the NPS corpus can be withdrawn as a tax-free lump sum at retirement. The remaining 40% (or more) buys an annuity — the pension you receive is taxable as income." } },
        { "@type": "Question", name: "Is NPS a good investment?", acceptedAnswer: { "@type": "Answer", text: "NPS offers an extra ₹50,000 deduction under Section 80CCD(1B) beyond 80C, low fund-management charges, and equity exposure up to 75%. It's well-suited for long-term retirement planning." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/nps-calculator"
      h1="NPS Calculator — National Pension Scheme"
      subtitle="Estimate your NPS retirement corpus, tax-free lump sum and monthly pension — all in seconds."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <NpsCalculatorWidget />
        </Suspense>
      }
      content={
        <>
          <h2>What is NPS?</h2>
          <p>
            The <b>National Pension System (NPS)</b> is a government-backed
            retirement savings scheme managed by the PFRDA. You invest regularly
            until age 60, and at retirement a part of the corpus is paid out as
            a tax-free lump sum and the rest is used to buy an annuity that
            pays a monthly pension.
          </p>

          <h2>NPS Calculation Formula</h2>
          <p>
            <b>Maturity Corpus = P × ((1 + r)<sup>n</sup> − 1) / r × (1 + r)</b>
          </p>
          <ul>
            <li><b>P</b> — Monthly contribution</li>
            <li><b>r</b> — Monthly return (annual return ÷ 12)</li>
            <li><b>n</b> — Number of months until retirement</li>
          </ul>
          <p>
            <b>Monthly Pension = (Annuity Corpus × Annuity Rate) / 12</b> — where
            annuity corpus is at least 40% of the maturity amount.
          </p>

          <h2>Tax Benefits of NPS</h2>
          <ul>
            <li>₹1.5 lakh under <b>Section 80C</b> (combined with EPF, PPF, etc.)</li>
            <li>Extra <b>₹50,000</b> exclusive to NPS under Section 80CCD(1B)</li>
            <li>Employer NPS contribution up to 10% of salary is tax-deductible under 80CCD(2)</li>
            <li>60% lump-sum withdrawal at retirement is <b>fully tax-free</b></li>
          </ul>

          <p className="mt-6">
            Plan more of your retirement with:
            <Link to="/ppf-calculator" className="text-primary underline mx-1">PPF Calculator</Link>,
            <Link to="/sip-calculator" className="text-primary underline mx-1">SIP Calculator</Link>,
            <Link to="/fd-calculator" className="text-primary underline mx-1">FD Calculator</Link>,
            and
            <Link to="/income-tax-calculator" className="text-primary underline mx-1">Income Tax Calculator</Link>.
          </p>
        </>
      }
    />
  );
}