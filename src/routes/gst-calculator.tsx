import { createFileRoute, Link } from "@tanstack/react-router";
import SeoToolShell from "@/components/seo/SeoToolShell";
import GstCalculatorWidget from "@/components/tools/widgets/GstCalculatorWidget";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/gst-calculator")({
  head: () => {
    const base = buildPageHead({
      title: "GST Calculator — Add & Remove GST Online (India)",
      description:
        "Free online GST calculator for India. Instantly add or remove GST at 3%, 5%, 12%, 18% or 28% — with CGST & SGST breakdown. Perfect for invoices and small businesses.",
      keywords: "gst calculator, gst calculator india, add gst, remove gst, gst calculation, cgst sgst calculator",
      path: "/gst-calculator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How is GST calculated?", acceptedAnswer: { "@type": "Answer", text: "To add GST: GST = (Net × Rate) / 100; Total = Net + GST. To remove GST from a gross price: Net = (Gross × 100) / (100 + Rate); GST = Gross − Net." } },
        { "@type": "Question", name: "What are the GST rates in India?", acceptedAnswer: { "@type": "Answer", text: "India has five main GST slabs: 0%, 3% (for gold), 5%, 12%, 18% and 28%. Most goods and services fall under 5%, 12% or 18%." } },
        { "@type": "Question", name: "What is the difference between CGST and SGST?", acceptedAnswer: { "@type": "Answer", text: "For intra-state transactions, GST is split equally into CGST (Central GST) and SGST (State GST). For inter-state transactions, IGST is charged instead, equal to the full GST rate." } },
        { "@type": "Question", name: "Is this GST calculator free?", acceptedAnswer: { "@type": "Answer", text: "Yes — it is 100% free, works offline in your browser, and requires no signup." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/gst-calculator"
      h1="GST Calculator — Add or Remove GST Online"
      subtitle="Quickly calculate GST in India with CGST / SGST breakdown — free, instant, accurate."
      tool={<GstCalculatorWidget />}
      content={
        <>
          <h2>What is GST?</h2>
          <p>
            Goods and Services Tax (GST) is an indirect tax levied on the supply of
            goods and services in India. Introduced on 1st July 2017, it replaced a
            web of indirect taxes including VAT, service tax and excise duty with a
            single unified system. Whether you are a freelancer, shopkeeper, online
            seller or buyer comparing prices, knowing the exact GST amount on a bill
            is essential.
          </p>

          <h2>GST Calculation Formula</h2>
          <p>Our calculator supports both directions:</p>
          <ul>
            <li><b>Add GST</b> (exclusive amount): <code>GST = (Net × Rate) ÷ 100</code> and <code>Gross = Net + GST</code></li>
            <li><b>Remove GST</b> (inclusive amount): <code>Net = (Gross × 100) ÷ (100 + Rate)</code> and <code>GST = Gross − Net</code></li>
          </ul>

          <h2>GST Slabs in India</h2>
          <ul>
            <li><b>0%</b> — Essentials like fresh fruits, vegetables, milk, books.</li>
            <li><b>3%</b> — Gold and silver jewellery.</li>
            <li><b>5%</b> — Packaged food, footwear under ₹1,000, economy air travel.</li>
            <li><b>12%</b> — Processed food, business-class air travel, butter, ghee.</li>
            <li><b>18%</b> — Most services, smartphones, IT, restaurants (AC).</li>
            <li><b>28%</b> — Luxury items, automobiles, tobacco, aerated drinks.</li>
          </ul>

          <h2>CGST, SGST and IGST</h2>
          <p>
            For sales <b>within the same state</b>, the total GST is split equally
            between <b>CGST</b> (Central) and <b>SGST</b> (State). For sales{" "}
            <b>between different states</b>, a single <b>IGST</b> is charged equal
            to the full GST rate. Our calculator automatically shows the CGST and
            SGST split for intra-state transactions.
          </p>

          <h2>Who Should Use This Calculator?</h2>
          <ul>
            <li>Small businesses and freelancers preparing invoices.</li>
            <li>Online sellers (Amazon, Flipkart, Meesho, Etsy) computing taxes.</li>
            <li>Buyers verifying GST charged on a bill.</li>
            <li>Accountants and students learning GST math.</li>
          </ul>

          <p className="mt-6">
            More financial tools:
            <Link to="/sip-calculator" className="text-primary underline mx-1">SIP Calculator</Link>,
            <Link to="/fd-calculator" className="text-primary underline mx-1">FD Calculator</Link>,
            <Link to="/ppf-calculator" className="text-primary underline mx-1">PPF Calculator</Link>,
            <Link to="/etsy-fee-calculator" className="text-primary underline mx-1">Etsy Fee Calculator</Link>
            — all free on ToolsKit.tech.
          </p>
        </>
      }
    />
  );
}
