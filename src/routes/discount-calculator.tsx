import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const DiscountCalculatorWidget = lazy(
  () => import("@/components/tools/widgets/DiscountCalculatorWidget"),
);

export const Route = createFileRoute("/discount-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "Discount Calculator — Free Online (% Off Sale Price Calculator)",
      description:
        "Free discount calculator. Enter original price and discount %, get the sale price and amount saved instantly. Perfect for shopping, sales and e-commerce.",
      keywords: "discount calculator, percentage off calculator, sale price calculator, percent discount calculator, price discount calculator, shopping calculator",
      path: "/discount-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How do I calculate a discount?", acceptedAnswer: { "@type": "Answer", text: "Multiply the original price by the discount percentage divided by 100. Sale price = Original price − (Original × Discount / 100). For a ₹1,999 item at 25% off: 1999 − (1999 × 25/100) = ₹1,499.25." } },
        { "@type": "Question", name: "How do I calculate 20% off?", acceptedAnswer: { "@type": "Answer", text: "Multiply the price by 0.20 to get the discount, then subtract from the original. Shortcut: multiply price by 0.80 to get the final price directly." } },
        { "@type": "Question", name: "How do I find the original price from a sale price?", acceptedAnswer: { "@type": "Answer", text: "Divide the sale price by (1 − discount/100). If a shirt is ₹800 after 20% off: Original = 800 / 0.80 = ₹1,000." } },
        { "@type": "Question", name: "What is the difference between discount and markup?", acceptedAnswer: { "@type": "Answer", text: "Discount reduces the selling price for the customer. Markup is added to the cost price by the seller to set the selling price. A 50% markup is NOT the same as a 50% discount." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/discount-calculator"
      h1="Discount Calculator"
      subtitle="Find the final sale price and amount saved on any item — enter original price and discount percentage, get the answer instantly."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <DiscountCalculatorWidget />
        </Suspense>
      }
      content={
        <>
          <h2>How to Calculate Discount</h2>
          <p>
            A discount is a reduction in the original price of a product or service, usually expressed as a percentage. The formulas you need are short:
          </p>
          <ul>
            <li><b>Amount saved</b> = Original price × (Discount % / 100)</li>
            <li><b>Sale price</b> = Original price − Amount saved</li>
            <li><b>Shortcut</b>: Sale price = Original price × (1 − Discount / 100)</li>
          </ul>
          <p>
            Worked example: a jacket priced at ₹2,499 has a 40% Black Friday discount. Amount saved = 2,499 × 0.40 = ₹999.60. Sale price = 2,499 − 999.60 = ₹1,499.40. The calculator above does this automatically for any price and any discount.
          </p>

          <h2>Reverse Discount: Finding the Original Price</h2>
          <p>
            Sometimes you see only the sale price and want to know whether the "60% off" tag is real. Use:
          </p>
          <p>
            <code>Original Price = Sale Price ÷ (1 − Discount / 100)</code>
          </p>
          <p>
            If a sale tag says ₹1,200 at 40% off, the claimed original is 1,200 / 0.60 = ₹2,000. If the brand's MRP card actually says ₹1,800, the "40% off" is closer to 33%.
          </p>

          <h2>Stacking Multiple Discounts</h2>
          <p>
            "50% off + extra 20% off at checkout" sounds like 70% off but is actually 60% off. Multiple discounts are applied <b>sequentially</b>, not added together:
          </p>
          <ul>
            <li>Original: ₹1,000</li>
            <li>After 50% off: ₹500</li>
            <li>Extra 20% off the ₹500: ₹400</li>
            <li>Effective discount: 60%, not 70%</li>
          </ul>
          <p>
            Formula for two stacked discounts: Final price = Original × (1 − d1) × (1 − d2). Effective discount = 1 − (1 − d1) × (1 − d2).
          </p>

          <h2>Discount, GST, and Coupon Codes</h2>
          <p>
            In India, discounts are usually applied <b>before</b> GST. So if an item is ₹1,000 MRP, the seller subtracts the discount first, then adds GST on the discounted amount. Example:
          </p>
          <ul>
            <li>MRP: ₹1,000</li>
            <li>After 20% discount: ₹800</li>
            <li>GST 18%: ₹144</li>
            <li>Final invoice: ₹944</li>
          </ul>
          <p>
            Coupon codes that say "FLAT ₹200 OFF" are subtracted as a fixed amount, not a percentage — much easier to track. Always check whether minimum order value or maximum discount caps apply.
          </p>

          <h2>Common Discount Percentages — Cheat Sheet</h2>
          <ul>
            <li><b>10% off:</b> multiply price by 0.90</li>
            <li><b>15% off:</b> multiply price by 0.85</li>
            <li><b>20% off:</b> multiply price by 0.80</li>
            <li><b>25% off:</b> divide price by 4, subtract from original (or × 0.75)</li>
            <li><b>30% off:</b> multiply price by 0.70</li>
            <li><b>40% off:</b> multiply price by 0.60</li>
            <li><b>50% off:</b> halve the price</li>
            <li><b>70% off:</b> multiply price by 0.30</li>
            <li><b>Buy 1 Get 1 Free:</b> effective discount = 50%</li>
            <li><b>Buy 2 Get 1 Free:</b> effective discount = 33.3%</li>
            <li><b>Buy 3 Get 1 Free:</b> effective discount = 25%</li>
          </ul>

          <h2>Discount Calculator for Shoppers</h2>
          <p>
            During big sales like Amazon Great Indian Festival, Flipkart Big Billion Days, Myntra End of Reason Sale, Black Friday and Cyber Monday, brands often inflate the MRP and then "discount" it back to the regular price. Use this calculator + a price-history tool (like Keepa or Amazon Price Tracker) to verify the deal is real before buying. If the calculated original is far above the historical price, the discount is mostly cosmetic.
          </p>

          <h2>Discount Calculator for Sellers and Marketers</h2>
          <p>
            If you run a Shopify, WooCommerce, Etsy or Amazon store, model discounts before you launch a sale. A 30% discount looks attractive to customers, but if your margin is only 35%, you are left with 5% — and if the sale doubles your volume, you actually make less profit per hour spent fulfilling orders. Match the discount you offer to the margin you have, and consider tiered discounts (10% on ₹1,000, 15% on ₹2,000, 20% on ₹3,000) to lift the average order value rather than just slashing price.
          </p>

          <h2>Why Use This Discount Calculator?</h2>
          <ul>
            <li><b>Instant:</b> result updates as you type, no submit button needed.</li>
            <li><b>Mobile-friendly:</b> use it standing in a store, comparing prices on the shelf.</li>
            <li><b>Free forever:</b> no signup, no paywall, no installs.</li>
            <li><b>Private:</b> calculation happens locally in your browser — no data is sent anywhere.</li>
          </ul>

          <p className="mt-6">
            Related calculators:
            <Link to="/percentage-calculator" className="text-primary underline mx-1">Percentage Calculator</Link>,
            <Link to="/gst-calculator" className="text-primary underline mx-1">GST Calculator</Link>,
            <Link to="/tip-calculator" className="text-primary underline mx-1">Tip Calculator</Link>,
            <Link to="/etsy-fee-calculator" className="text-primary underline mx-1">Etsy Fee Calculator</Link>.
          </p>
        </>
      }
    />
  );
}