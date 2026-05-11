import { createFileRoute, Link } from "@tanstack/react-router";
import AgeCalculatorWidget from "@/components/tools/widgets/AgeCalculatorWidget";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/age-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "Age Calculator – Calculate Your Exact Age Online Free | ToolsKit.tech",
      description:
        "Free Age Calculator online. Calculate your exact age in years, months, days, weeks and total days from date of birth. Instant, accurate, no signup.",
      keywords: "age calculator",
      path: "/age-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How does this Age Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Enter your date of birth and click Calculate Age. The Age Calculator instantly shows your exact age in years, months and days, plus total weeks, total days and days remaining until your next birthday." } },
        { "@type": "Question", name: "Is the Age Calculator free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes. The Age Calculator is 100% free with no signup, no watermark and no limit on the number of calculations." } },
        { "@type": "Question", name: "Is my date of birth stored anywhere?", acceptedAnswer: { "@type": "Answer", text: "No. The Age Calculator runs entirely in your browser. Your date of birth is never uploaded or stored on any server." } },
        { "@type": "Question", name: "Can I use the Age Calculator for official forms?", acceptedAnswer: { "@type": "Answer", text: "Yes. The Age Calculator gives an accurate age in years, months and days that matches the format required by passport, PAN, Aadhaar, school admission and government job application forms." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/age-calculator"
      h1="Age Calculator – Calculate Your Exact Age Online"
      subtitle="Find your exact age in years, months, days, weeks and total days from your date of birth. Free & instant."
      tool={<AgeCalculatorWidget />}
      content={<Content />}
    />
  );
}

function Content() {
  return (
    <>
      <h2>Free Age Calculator – Calculate Your Exact Age Online</h2>
      <p>
        ToolsKit.tech Age Calculator is the fastest and most accurate way to find
        out exactly how old you are. Just enter your date of birth and the Age
        Calculator instantly shows your age in years, months and days, plus total
        weeks, total days lived and the number of days remaining until your next
        birthday. Whether you are filling a government form, checking eligibility
        for a competitive exam, planning a birthday surprise, or simply curious
        about your exact age in days, this free online Age Calculator gives you a
        precise answer in one click.
      </p>

      <h2>Why use an Age Calculator?</h2>
      <p>
        Calculating age manually sounds simple but is surprisingly error-prone –
        especially when months have different lengths, leap years are involved, or
        the date of birth falls late in the month. A reliable Age Calculator
        removes all that confusion. Government portals like UPSC, SSC, IBPS,
        Railway and state-level recruitment boards strictly check age in years,
        months and days as on a specific cut-off date. Schools and colleges use
        age in completed years for admissions. Even insurance, loan and pension
        calculations depend on exact age. One small mistake can mean a rejected
        application, so it is always safer to use an accurate Age Calculator.
      </p>

      <h2>How to use this Age Calculator in 2 steps</h2>
      <ol>
        <li>Pick your <strong>Date of Birth</strong> from the date picker above.</li>
        <li>Click <strong>Calculate Age</strong>. The Age Calculator instantly displays your exact age plus total months, weeks, days and days to next birthday.</li>
      </ol>

      <h2>What this Age Calculator shows you</h2>
      <ul>
        <li><strong>Exact age:</strong> Years, months and days – the format required by most official forms.</li>
        <li><strong>Total months lived:</strong> Useful for baby age tracking and EMI / pension calculations.</li>
        <li><strong>Total weeks:</strong> A fun way to see how many weeks you have lived.</li>
        <li><strong>Total days:</strong> Total number of days you have been alive – great for birthday posts.</li>
        <li><strong>Days until next birthday:</strong> So you never miss a celebration.</li>
      </ul>

      <h2>Common use cases for the Age Calculator</h2>
      <ul>
        <li><strong>Government job applications:</strong> Check exact age as on cut-off date for UPSC, SSC, IBPS, Railway, Police, Defence and state PSC exams.</li>
        <li><strong>School & college admissions:</strong> Confirm completed age in years for class 1, 11 and graduation eligibility.</li>
        <li><strong>Passport & Aadhaar:</strong> Fill the exact age block correctly the first time.</li>
        <li><strong>Insurance & loans:</strong> Premium, eligibility and pension are calculated based on exact age.</li>
        <li><strong>Baby age tracking:</strong> Parents can track a baby's age in months and days from birth.</li>
        <li><strong>Birthdays & gifts:</strong> Know exactly how many days are left for the next birthday.</li>
      </ul>

      <h2>Privacy &amp; security</h2>
      <p>
        This Age Calculator runs 100% inside your browser. Your date of birth is
        never sent to any server, never logged and never shared with third parties.
        Close the tab and the data is gone. You can use this Age Calculator for
        sensitive use cases like Aadhaar, PAN or passport with complete peace of
        mind.
      </p>

      <h2>How the Age Calculator handles leap years</h2>
      <p>
        Many free age calculators round off months and ignore leap years, which
        leads to a 1–2 day error. Our Age Calculator uses the actual calendar –
        including February 29 on leap years – so the result matches what an
        official verifier would calculate by hand. People born on 29 February also
        get a correct days-to-next-birthday count.
      </p>

      <h2>Frequently asked questions</h2>
      <h3>Is this Age Calculator accurate as on today?</h3>
      <p>Yes. The Age Calculator uses your device's current date and computes age in years, months and days using the real calendar.</p>
      <h3>Can I calculate age as on a future date?</h3>
      <p>This version computes age as on today. For exam cut-off dates, you can change your device date temporarily, or use it close to the cut-off.</p>
      <h3>Will my date of birth be saved?</h3>
      <p>No. Nothing is uploaded or stored. The Age Calculator works entirely offline in your browser.</p>
      <h3>Is the Age Calculator free with no limit?</h3>
      <p>Yes – completely free, no signup, no watermark and you can calculate as many times as you like.</p>

      <p className="mt-6">
        Need more handy calculators? Try the
        <Link to="/tools/bmi-calculator" className="text-primary underline mx-1">BMI Calculator</Link>,
        the
        <Link to="/tools/sip-calculator" className="text-primary underline mx-1">SIP Calculator</Link>
        or the
        <Link to="/tools/loan-emi-calculator" className="text-primary underline mx-1">Loan EMI Calculator</Link>
        – all free on ToolsKit.tech.
      </p>
    </>
  );
}