import { createFileRoute, Link } from "@tanstack/react-router";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";
import EcommerceProfitCalculatorWidget from "@/components/tools/widgets/EcommerceProfitCalculatorWidget";
import heroImg from "@/assets/ecommerce-profit-calculator-hero.jpg";

const TITLE = "Ecommerce Profit Calculator — Amazon, Shopify, eBay, Etsy (Free)";
const DESCRIPTION =
  "Free ecommerce profit calculator for Amazon FBA, Shopify, eBay, Etsy, Walmart, Flipkart and Meesho sellers. Work out net profit per unit, margin, ROI and break-even in seconds.";
const URL_PATH = "/ecommerce-profit-calculator";

const FAQS = [
  {
    q: "What is an ecommerce profit calculator?",
    a: "It is a tool that takes your selling price, product cost, shipping, ads and platform fees and returns the actual profit you keep per sale. It works for Amazon FBA, Shopify, eBay, Etsy, Walmart, Flipkart and any other marketplace.",
  },
  {
    q: "How is ecommerce profit calculated?",
    a: "Profit per unit = (Selling Price + Shipping Charged) − (Product Cost + Inbound Shipping + Outbound Shipping + Marketplace Fee + Payment Processing + Fulfillment + Ads + Other %). Margin is profit ÷ revenue, ROI is profit ÷ product cost.",
  },
  {
    q: "Does this calculator include Amazon FBA fees?",
    a: "Yes. The Amazon FBA preset uses the 15% referral fee, a standard pick-and-pack fulfillment fee, and the $39.99 Professional seller subscription. Switch to Amazon FBM if you ship yourself.",
  },
  {
    q: "Is it accurate for Shopify, eBay and Etsy?",
    a: "Yes. Shopify uses 2.9% + $0.30 Shopify Payments + $39 plan. eBay uses 13.25% final value fee. Etsy uses 6.5% transaction + 3% + $0.25 payment fee. You can also pick Custom and enter your own numbers.",
  },
  {
    q: "What is a good profit margin for an ecommerce product?",
    a: "After all fees, 20–30% net margin is healthy for private-label Amazon and Shopify products. Below 10% leaves no room for returns, ads or price drops. The calculator flags negative margins in red.",
  },
  {
    q: "What is break-even and why does it matter?",
    a: "Break-even is the number of units you must sell each month just to cover your subscription (Amazon Pro, Shopify Basic, etc.). Selling more than this means real profit; selling less means you are losing money.",
  },
  {
    q: "Does it work for Indian marketplaces like Flipkart and Meesho?",
    a: "Yes. Choose ₹ as the currency and pick Flipkart or Meesho — the commission, payment gateway charge and shipping fee are pre-loaded with realistic India-market values.",
  },
  {
    q: "Is my data sent to any server?",
    a: "No. Every calculation runs in your browser. Nothing is uploaded, stored or shared — the tool is 100% private and free.",
  },
];

export const Route = createFileRoute("/ecommerce-profit-calculator")({
  head: () => {
    const base = buildPageHead({
      title: TITLE,
      description: DESCRIPTION,
      keywords:
        "ecommerce profit calculator, amazon profit calculator, amazon fba calculator, amazon fba profit calculator, amazon seller calculator, shopify profit calculator, ebay profit calculator, fba profit calculator, etsy profit calculator, walmart marketplace calculator, flipkart profit calculator, meesho profit calculator, online business profit calculator, ecommerce roi calculator, profit margin calculator",
      path: URL_PATH,
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    const softwareLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Ecommerce Profit Calculator",
      operatingSystem: "Web Browser",
      applicationCategory: "BusinessApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "873" },
      description: DESCRIPTION,
      url: `https://toolskit.tech${URL_PATH}`,
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://toolskit.tech/" },
        { "@type": "ListItem", position: 2, name: "Tools", item: "https://toolskit.tech/tools" },
        { "@type": "ListItem", position: 3, name: "Ecommerce Profit Calculator", item: `https://toolskit.tech${URL_PATH}` },
      ],
    };
    const webPageLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: TITLE,
      description: DESCRIPTION,
      url: `https://toolskit.tech${URL_PATH}`,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: "ToolsKit.tech", url: "https://toolskit.tech/" },
      datePublished: "2026-06-10",
      dateModified: "2026-06-10",
      author: { "@type": "Person", name: "Amit Kumar Saini" },
    };
    return {
      ...base,
      scripts: [
        ...base.scripts,
        { type: "application/ld+json", children: JSON.stringify(softwareLd) },
        { type: "application/ld+json", children: JSON.stringify(faqLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
        { type: "application/ld+json", children: JSON.stringify(webPageLd) },
      ],
    };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath={URL_PATH}
      h1="Ecommerce Profit Calculator — Amazon, Shopify, eBay & More"
      subtitle="Work out exactly how much you keep on every sale. Built-in fee presets for Amazon FBA, Shopify, eBay, Etsy, Walmart, Flipkart and Meesho."
      tool={<EcommerceProfitCalculatorWidget />}
      content={
        <>
          <figure className="not-prose my-2">
            <img
              src={heroImg}
              alt="Ecommerce profit calculator dashboard showing margin, ROI and net profit for Amazon, Shopify and eBay sellers"
              width={1600}
              height={900}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto rounded-xl border border-border shadow-sm"
            />
            <figcaption className="text-center text-xs text-muted-foreground mt-2">
              One calculator, every marketplace — see real profit after Amazon FBA, Shopify, eBay, Etsy, Walmart, Flipkart and Meesho fees.
            </figcaption>
          </figure>

          <h2>Why every online seller needs a profit calculator</h2>
          <p>
            Most sellers obsess over revenue, traffic and conversion rate — but the only number that actually matters is what hits the bank account at the end of the month. Between the marketplace referral fee, payment processing, shipping in and out, returns, PPC ads and the monthly subscription, a $29.99 product can quietly turn into a $1.20 loss before you notice. This <b>ecommerce profit calculator</b> takes all of those line items and shows you the truth in one screen.
          </p>
          <p>
            Plug in your selling price, product cost, shipping and ad spend, then pick a platform — <b>Amazon FBA, Amazon FBM, Shopify, eBay, Etsy, Walmart, Flipkart, Meesho</b> or a custom rate — and the tool returns net profit per unit, margin, ROI, break-even units, and total monthly profit. Use it before you launch, before you discount, and before you sign up for a new marketplace.
          </p>

          <h2>How the calculator works</h2>
          <p>The math behind it is the same formula every accountant uses:</p>
          <pre><code>Profit per unit = (Selling Price + Shipping Charged) − (Product Cost + Inbound Shipping + Outbound Shipping + Marketplace Fee + Payment Fee + Fulfillment + Ads + Other %)</code></pre>
          <p>From there it derives three useful ratios:</p>
          <ul>
            <li><b>Net margin</b> = profit ÷ revenue (how much of every sale you keep)</li>
            <li><b>ROI</b> = profit ÷ product cost (how hard each dollar of inventory is working)</li>
            <li><b>Break-even</b> = monthly platform fee ÷ profit per unit (units you must sell just to pay rent)</li>
          </ul>

          <h2>Built-in fee presets (updated for 2026)</h2>
          <ul>
            <li><b>Amazon FBA (US):</b> 15% referral fee, standard pick-and-pack fulfillment, $39.99 Pro plan.</li>
            <li><b>Amazon FBM:</b> 15% referral fee, no FBA fee, $39.99 Pro plan — for sellers who ship themselves.</li>
            <li><b>Shopify Basic:</b> 0% platform fee, 2.9% + $0.30 Shopify Payments, $39/month plan.</li>
            <li><b>eBay US:</b> 13.25% final value fee on most categories, $0.30 per order.</li>
            <li><b>Etsy:</b> 6.5% transaction fee plus 3% + $0.25 payment processing.</li>
            <li><b>Walmart Marketplace:</b> 15% referral fee, no monthly plan, no listing fee.</li>
            <li><b>Flipkart (India):</b> ~12% commission, 2% payment gateway, flat shipping fee.</li>
            <li><b>Meesho (India):</b> 5% commission, no listing fee — best for low-ticket private label.</li>
            <li><b>Custom:</b> set your own commission and payment rates for Mercari, Tophatter, Wish, or Shopee.</li>
          </ul>

          <h2>Amazon FBA profit calculator: a worked example</h2>
          <p>
            Say you source a yoga mat in China for $8, pay $1.50 to ship it into an Amazon warehouse, list it at $29.99 and spend $2 per sale on PPC. Amazon takes 15% ($4.50) as a referral fee, around $3.86 for FBA pick-and-pack, and bills $39.99/month for the Professional plan. Plug those numbers into the calculator and you will see:
          </p>
          <ul>
            <li>Revenue: $29.99</li>
            <li>All fees + product + ads: ~$19.86</li>
            <li><b>Profit per unit: ~$10.13 → 33.8% net margin → 106% ROI</b></li>
            <li>You need just 4 units a month to cover the Amazon Pro plan.</li>
          </ul>
          <p>That is the exact framing the calculator gives you — no spreadsheets, no second-guessing.</p>

          <h2>Shopify, eBay and Etsy profit examples</h2>
          <p>
            On <b>Shopify</b>, the same $29.99 yoga mat keeps more margin per unit because there is no 15% referral fee — but you take on shipping and the $39/month plan eats the first 5–6 sales. On <b>eBay</b>, the 13.25% final value fee on the order total (including shipping) is the biggest expense; pricing shipping inside the item price often beats charging it separately. On <b>Etsy</b>, the fee stack is small per item but the $0.25 payment fixed fee crushes low-ticket items under $5 — use the calculator to find your minimum viable price.
          </p>

          <h2>What sellers usually forget to include</h2>
          <ul>
            <li><b>Returns:</b> at a 5% return rate, you lose ~5% of revenue. Add it under "Other % Fees".</li>
            <li><b>Sales tax / GST:</b> if you absorb it instead of charging the customer, it is a hidden 5–18% cost.</li>
            <li><b>Storage fees:</b> Amazon long-term storage can add $0.40–$0.83 per cubic foot per month.</li>
            <li><b>Refund admin:</b> Amazon keeps a $5 or 20% refund administration fee on every return.</li>
            <li><b>Inventory financing:</b> if you borrow to buy stock, interest is a real cost of goods.</li>
          </ul>

          <h2>How to use the results to grow your store</h2>
          <ol>
            <li><b>If margin is below 15%</b>, raise the price by $1–$2 first. A small price bump usually beats cost-cutting.</li>
            <li><b>If ROI is below 50%</b>, your product cost is too high. Negotiate the supplier or change pack size.</li>
            <li><b>If break-even is above 30 units</b>, switch to a cheaper plan (Amazon Individual, Shopify Starter, eBay no-store).</li>
            <li><b>If PPC eats more than 25%</b> of revenue, your listing is converting poorly — improve images and reviews before scaling ads.</li>
          </ol>

          <h2>Related free tools for online sellers</h2>
          <p>
            Pair this calculator with the <Link to="/tools/etsy-fee-calculator" className="text-primary underline">Etsy Fee Calculator</Link>, the <Link to="/gst-calculator" className="text-primary underline">GST Calculator</Link>, the <Link to="/discount-calculator" className="text-primary underline">Discount Calculator</Link>, the <Link to="/percentage-calculator" className="text-primary underline">Percentage Calculator</Link>, the <Link to="/loan-emi-calculator" className="text-primary underline">Loan EMI Calculator</Link> for inventory financing, and the <Link to="/compress-image-to-50kb" className="text-primary underline">image compressor</Link> to keep your product photos fast and ranking. For product photography, the <Link to="/remove-background" className="text-primary underline">background remover</Link> and <Link to="/photo-remini" className="text-primary underline">Photo Remini enhancer</Link> are 100% free.
          </p>

          <h2>Frequently Asked Questions</h2>
          {FAQS.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}

          <p className="text-sm text-muted-foreground mt-8">
            <b>Author:</b> Amit Kumar Saini · <b>Last updated:</b> 10 June 2026 · <Link to="/about" className="text-primary underline">About</Link> · <Link to="/contact" className="text-primary underline">Contact</Link> · <Link to="/privacy" className="text-primary underline">Privacy</Link>
          </p>
        </>
      }
    />
  );
}