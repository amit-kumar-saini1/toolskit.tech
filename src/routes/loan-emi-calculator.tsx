import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const LoanEmiCalculatorWidget = lazy(
  () => import("@/components/tools/widgets/LoanEmiCalculatorWidget"),
);

export const Route = createFileRoute("/loan-emi-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "Loan EMI Calculator — Free Online (Home, Car, Personal Loan)",
      description:
        "Free Loan EMI Calculator. Calculate monthly EMI, total interest and total payment for home loan, car loan, personal loan or any loan — instantly.",
      keywords: "loan emi calculator, emi calculator, home loan emi calculator, personal loan emi calculator, car loan emi calculator, monthly emi",
      path: "/loan-emi-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How is EMI calculated?", acceptedAnswer: { "@type": "Answer", text: "EMI = [P × R × (1+R)^N] / [(1+R)^N − 1], where P is principal, R is monthly interest rate (annual rate ÷ 12 ÷ 100), and N is total months." } },
        { "@type": "Question", name: "Does paying a higher EMI save money?", acceptedAnswer: { "@type": "Answer", text: "Yes. A shorter tenure means a higher EMI but a much lower total interest payout. Use part-prepayments to cut the principal whenever possible." } },
        { "@type": "Question", name: "What is a good interest rate for a home loan in India?", acceptedAnswer: { "@type": "Answer", text: "As of 2024–25, leading Indian banks offer home loans between 8.5% and 9.5% for salaried borrowers with strong credit. Personal loans are typically 10–18%." } },
        { "@type": "Question", name: "Is EMI fixed for the whole loan?", acceptedAnswer: { "@type": "Answer", text: "For fixed-rate loans, yes. For floating-rate loans (most Indian home loans), EMI or tenure changes when the bank's reference rate changes." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/loan-emi-calculator"
      h1="Loan EMI Calculator"
      subtitle="Calculate Equated Monthly Installment for home, car or personal loans — see EMI, total interest, and total payment instantly."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <LoanEmiCalculatorWidget />
        </Suspense>
      }
      content={
        <>
          <h2>What Is EMI?</h2>
          <p>
            EMI stands for <b>Equated Monthly Installment</b> — the fixed amount you pay your lender each month until the loan is fully repaid. Every EMI has two parts: an <b>interest</b> portion and a <b>principal</b> portion. In the early months, most of your EMI goes to interest; near the end, most of it goes to principal. This is called an <i>amortising</i> loan, and it is how home loans, car loans, personal loans and most business loans work in India and most of the world.
          </p>

          <h2>EMI Formula</h2>
          <p>
            <code>EMI = [P × R × (1 + R)^N] / [(1 + R)^N − 1]</code>
          </p>
          <ul>
            <li><b>P</b> = principal (loan amount)</li>
            <li><b>R</b> = monthly interest rate = annual rate / 12 / 100</li>
            <li><b>N</b> = number of monthly installments (years × 12)</li>
          </ul>
          <p>
            Worked example: a ₹5,00,000 personal loan at 9.5% for 5 years gives R = 0.00792 and N = 60. EMI ≈ ₹10,494 per month. Over 5 years you pay back ₹6,29,628, of which ₹1,29,628 is interest. The calculator above does the math for any combination of amount, rate and tenure.
          </p>

          <h2>How to Use the EMI Calculator</h2>
          <ol>
            <li>Enter the loan amount you plan to borrow.</li>
            <li>Enter the annual interest rate offered by the bank/NBFC.</li>
            <li>Enter the tenure in years.</li>
            <li>The tool instantly shows your EMI, the total interest you'll pay, and the total amount you'll repay.</li>
          </ol>

          <h2>Tips to Lower Your EMI Burden</h2>
          <ul>
            <li><b>Shorter tenure, lower interest:</b> a 10-year home loan can save you 35–40% in total interest compared to a 20-year loan, even though the monthly EMI is higher.</li>
            <li><b>Larger down payment:</b> putting 25–30% down instead of the minimum 10–15% cuts your principal, EMI and interest in one move.</li>
            <li><b>Improve your credit score:</b> a CIBIL/Experian score above 750 typically gets the lowest advertised rate. Even 0.25% off a ₹50 lakh home loan saves over ₹2 lakh across 20 years.</li>
            <li><b>Prepay when you can:</b> use bonuses, tax refunds and salary hikes to make annual lump-sum prepayments. Apply them to principal, not future EMIs.</li>
            <li><b>Refinance / balance transfer:</b> if your existing rate is more than 0.75% above current market rates, transferring your loan to another bank usually pays off the processing fee within a year.</li>
          </ul>

          <h2>Home Loan vs Personal Loan vs Car Loan</h2>
          <ul>
            <li><b>Home loan:</b> longest tenure (up to 30 years), lowest interest (8.5–9.5%), secured by the property. Tax benefits under Sections 24(b) and 80C.</li>
            <li><b>Car loan:</b> tenure 3–7 years, rates 8.75–11%, secured by the vehicle. The car depreciates faster than the loan — try to keep tenure ≤5 years.</li>
            <li><b>Personal loan:</b> tenure 1–5 years, rates 10.5–18%, unsecured. Use only for emergencies or one-off expenses; the high rate makes it expensive for general spending.</li>
            <li><b>Education loan:</b> tenure up to 15 years, with a moratorium during study. Interest is tax-deductible under Section 80E.</li>
          </ul>

          <h2>Fixed vs Floating Interest Rates</h2>
          <p>
            A <b>fixed-rate</b> loan keeps your EMI the same for the full tenure, which is great for predictability but usually starts 1–2% higher than a floating rate. A <b>floating-rate</b> loan tracks the bank's external benchmark (RBI repo rate + spread). When rates fall, your EMI or tenure shrinks; when they rise, you pay more. For long-term home loans, floating rates usually win in India because RBI's long-run trend is downward, but it depends on your risk tolerance.
          </p>

          <h2>What Affects Your Loan Eligibility?</h2>
          <ul>
            <li><b>Income:</b> banks typically allow EMIs that don't exceed 40–50% of your net monthly income.</li>
            <li><b>Credit score:</b> 750+ unlocks the best rates; below 650 usually means rejection or a much higher rate.</li>
            <li><b>Employer stability:</b> public-sector employees, government employees and MNC employees get priority.</li>
            <li><b>Existing EMIs:</b> car loans, credit-card balances and BNPL commitments reduce the EMI capacity you have left.</li>
          </ul>

          <h2>Why Use This EMI Calculator?</h2>
          <ul>
            <li><b>Instant:</b> no signup, no ads inside the tool, no page reload.</li>
            <li><b>Accurate:</b> uses the standard amortisation formula every Indian bank uses.</li>
            <li><b>Private:</b> calculation runs in your browser — your numbers are never sent anywhere.</li>
            <li><b>Mobile-ready:</b> works on any device, anywhere.</li>
          </ul>

          <p className="mt-6">
            More money calculators:
            <Link to="/sip-calculator" className="text-primary underline mx-1">SIP Calculator</Link>,
            <Link to="/fd-calculator" className="text-primary underline mx-1">FD Calculator</Link>,
            <Link to="/ppf-calculator" className="text-primary underline mx-1">PPF Calculator</Link>,
            <Link to="/compound-interest-calculator" className="text-primary underline mx-1">Compound Interest</Link>.
          </p>
        </>
      }
    />
  );
}