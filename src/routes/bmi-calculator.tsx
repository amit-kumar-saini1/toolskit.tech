import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const BmiCalculatorWidget = lazy(
  () => import("@/components/tools/widgets/BmiCalculatorWidget"),
);

export const Route = createFileRoute("/bmi-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "BMI Calculator — Free Online Body Mass Index (kg/cm & lb/ft)",
      description:
        "Free BMI calculator: enter your height and weight in metric or imperial units to instantly get your Body Mass Index and healthy weight category.",
      keywords: "bmi calculator, body mass index calculator, bmi calculator for women, bmi calculator for men, healthy weight calculator, bmi chart",
      path: "/bmi-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is a healthy BMI?", acceptedAnswer: { "@type": "Answer", text: "For most adults, a BMI between 18.5 and 24.9 is considered a healthy weight. Below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is obese." } },
        { "@type": "Question", name: "How is BMI calculated?", acceptedAnswer: { "@type": "Answer", text: "BMI = weight (kg) ÷ height (m)². In imperial units the formula becomes BMI = (weight in lb × 703) ÷ height (in)²." } },
        { "@type": "Question", name: "Is BMI accurate for athletes?", acceptedAnswer: { "@type": "Answer", text: "BMI does not distinguish between muscle and fat. Very muscular people may show a high BMI without being overweight; combine BMI with waist measurement and body-fat percentage for a fuller picture." } },
        { "@type": "Question", name: "Is BMI different for men and women?", acceptedAnswer: { "@type": "Answer", text: "The standard adult BMI formula is the same for men and women. Body composition differs, but the WHO BMI ranges are applied to both genders for screening." } },
        { "@type": "Question", name: "What is a healthy BMI for Indians/Asians?", acceptedAnswer: { "@type": "Answer", text: "Indian/Asian guidelines use a tighter range: 18.0–22.9 is normal, 23–24.9 is overweight, and 25+ is obese — because cardiovascular risk rises at lower BMI in South Asian populations." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/bmi-calculator"
      h1="BMI Calculator (Body Mass Index)"
      subtitle="Calculate your Body Mass Index in metric (kg/cm) or imperial (lb/ft) units — instantly, free, and 100% private."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <BmiCalculatorWidget />
        </Suspense>
      }
      content={
        <>
          <h2>What Is BMI?</h2>
          <p>
            Body Mass Index (BMI) is a simple number calculated from your height and weight that screens for whether you fall into an underweight, healthy, overweight, or obese range. Developed by Belgian mathematician Adolphe Quetelet in the 1830s and later popularised by physiologist Ancel Keys in 1972, BMI is now used by the World Health Organization (WHO), the CDC, the NHS, and almost every public-health agency in the world as a quick first-pass measure of body composition. It is not a diagnosis — it is a screening tool that tells you and your doctor whether further checks (waist circumference, blood pressure, lipid profile, blood sugar) are worth doing.
          </p>

          <h2>BMI Formula</h2>
          <ul>
            <li><b>Metric:</b> BMI = weight (kg) ÷ [height (m)]²</li>
            <li><b>Imperial:</b> BMI = [weight (lb) × 703] ÷ [height (in)]²</li>
          </ul>
          <p>
            Example: a person who is 170 cm (1.70 m) tall and weighs 65 kg has a BMI of 65 ÷ (1.70 × 1.70) = 22.5, which sits comfortably in the healthy range. The same person at 85 kg would have a BMI of 29.4 — overweight, almost obese — which is when most doctors would start a conversation about diet, exercise, and lifestyle.
          </p>

          <h2>WHO BMI Categories (Adults)</h2>
          <ul>
            <li><b>Underweight:</b> below 18.5</li>
            <li><b>Normal weight:</b> 18.5 – 24.9</li>
            <li><b>Overweight:</b> 25.0 – 29.9</li>
            <li><b>Obese class I:</b> 30.0 – 34.9</li>
            <li><b>Obese class II:</b> 35.0 – 39.9</li>
            <li><b>Obese class III (severe):</b> 40 and above</li>
          </ul>

          <h2>Asian / Indian BMI Cut-offs</h2>
          <p>
            South Asians (Indian, Pakistani, Bangladeshi, Sri Lankan) and East Asians develop diabetes, hypertension and heart disease at a lower BMI than people of European descent. The Indian Council of Medical Research (ICMR) and the WHO Asia-Pacific guidelines therefore recommend tighter cut-offs:
          </p>
          <ul>
            <li><b>Normal:</b> 18.0 – 22.9</li>
            <li><b>Overweight:</b> 23.0 – 24.9</li>
            <li><b>Obese:</b> 25.0 and above</li>
          </ul>
          <p>
            If you are Indian or of Asian descent, treat a BMI of 23 as the point where lifestyle changes should begin, not 25.
          </p>

          <h2>BMI for Children, Teens and Seniors</h2>
          <p>
            For people under 20, BMI is interpreted as a percentile against age and sex (CDC growth charts) rather than as a fixed range — a BMI in the 85th–94th percentile is overweight, and 95th and above is obese. For adults over 65, a slightly higher BMI (up to 27) is often associated with the lowest mortality risk because some extra reserve helps recovery from illness. Pregnant women, very tall or very short adults, and elite athletes should not rely on BMI alone.
          </p>

          <h2>BMI vs Body-Fat Percentage</h2>
          <p>
            BMI cannot distinguish between fat and muscle. A 100 kg bodybuilder with 8% body fat and a 100 kg desk worker with 35% body fat have the same BMI but very different health profiles. Pair BMI with at least one of these:
          </p>
          <ul>
            <li><b>Waist circumference:</b> over 90 cm for Asian men or 80 cm for Asian women indicates central obesity.</li>
            <li><b>Waist-to-hip ratio:</b> WHO at-risk thresholds are 0.90 for men and 0.85 for women.</li>
            <li><b>Body-fat percentage:</b> measured with calipers, smart scales (BIA), or DEXA scan.</li>
          </ul>

          <h2>How to Improve Your BMI</h2>
          <p>
            If your BMI is above the healthy range, the goal is a steady 0.5–1 kg loss per week — about a 500 kcal daily deficit. Crash diets rebound; small consistent habits stick. Practical changes that work:
          </p>
          <ul>
            <li>Cut sugary drinks and replace with water, lemon water, or unsweetened tea.</li>
            <li>Fill half your plate with vegetables; quarter with protein; quarter with whole grains.</li>
            <li>Walk 7,000–10,000 steps a day. A 30-minute brisk walk burns 150–200 kcal.</li>
            <li>Strength train 2–3 times a week to preserve muscle while losing fat — this keeps BMI loss from being purely water and muscle.</li>
            <li>Sleep 7–8 hours; poor sleep raises hunger hormones (ghrelin) and lowers satiety hormones (leptin).</li>
          </ul>
          <p>
            If your BMI is below 18.5, focus on calorie-dense whole foods (nuts, nut butters, dairy, eggs, paneer, ghee, whole-milk yogurt) and resistance training to add muscle rather than just fat.
          </p>

          <h2>Why Use This BMI Calculator?</h2>
          <ul>
            <li><b>Both unit systems:</b> switch between kg/cm and lb/ft with a single click.</li>
            <li><b>Instant result:</b> no signup, no ads inside the calculator, no waiting.</li>
            <li><b>100% private:</b> calculation happens in your browser — your height and weight never leave your device.</li>
            <li><b>Mobile-friendly:</b> works in any browser on phone, tablet, or laptop.</li>
          </ul>

          <p className="mt-6">
            Related calculators on ToolsKit:
            <Link to="/age-calculator" className="text-primary underline mx-1">Age Calculator</Link>,
            <Link to="/percentage-calculator" className="text-primary underline mx-1">Percentage Calculator</Link>,
            <Link to="/tip-calculator" className="text-primary underline mx-1">Tip Calculator</Link>,
            <Link to="/sip-calculator" className="text-primary underline mx-1">SIP Calculator</Link>.
          </p>
        </>
      }
    />
  );
}