import { Link } from "@tanstack/react-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ImageIcon,
  FileText,
  Calculator,
  Wrench,
  TrendingUp,
  Sparkles,
} from "lucide-react";

type Tool = { title: string; to: string; desc: string; kw?: string };

const categories: {
  id: string;
  title: string;
  icon: typeof ImageIcon;
  intro: string;
  tools: Tool[];
}[] = [
  {
    id: "image-tools",
    title: "Image Tools",
    icon: ImageIcon,
    intro:
      "Free online image tools to compress, crop, resize and edit photos directly in your browser — no upload to a server, no signup.",
    tools: [
      { title: "Image Compressor", to: "/tools/image-compressor", desc: "Compress JPG, PNG & WebP without losing quality." },
      { title: "Image Cropper", to: "/tools/image-cropper", desc: "Free online photo cropping tool with custom ratios." },
      { title: "KB Converter — Resize Image in KB", to: "/tools/kb-converter", desc: "Compress image to 20kb, 50kb, 100kb or any target size." },
      { title: "KB Resize Pixel", to: "/kb-resize-pixel", desc: "Resize image in KB & pixel dimensions together." },
      { title: "Background Remover", to: "/tools/remove-background", desc: "Cut the background out of a picture online free." },
      { title: "Text on Photo", to: "/tools/text-on-photo", desc: "Add text to photo online free with custom fonts." },
      { title: "Name and Date on Photo", to: "/name-and-date-on-photo", desc: "Add name & date stamp on photo for documents." },
      { title: "Color Picker", to: "/tools/color-picker", desc: "Pick HEX, RGB, HSL color values from anywhere." },
    ],
  },
  {
    id: "pdf-tools",
    title: "PDF Tools",
    icon: FileText,
    intro:
      "Convert between images and PDF instantly. All conversion happens locally in your browser for full privacy.",
    tools: [
      { title: "Image to PDF Converter", to: "/tools/image-to-pdf", desc: "Convert JPG, PNG images to a single PDF file." },
      { title: "PDF to Image Converter", to: "/tools/pdf-to-image", desc: "Extract every PDF page as high-quality JPG/PNG." },
    ],
  },
  {
    id: "finance-calculators",
    title: "Finance Calculators",
    icon: TrendingUp,
    intro:
      "Plan your money smartly with free finance calculators for SIP, FD, PPF, EMI, mortgage and Etsy seller fees.",
    tools: [
      { title: "SIP Calculator", to: "/tools/sip-calculator", desc: "Calculate mutual fund SIP returns & wealth gain." },
      { title: "FD Calculator", to: "/tools/fd-calculator", desc: "Fixed deposit maturity amount & interest calculator." },
      { title: "PPF Calculator", to: "/tools/ppf-calculator", desc: "Public Provident Fund maturity calculator for 15 years." },
      { title: "Loan EMI Calculator", to: "/tools/loan-emi-calculator", desc: "Calculate monthly EMI for home, car & personal loans." },
      { title: "Mortgage Calculator", to: "/tools/mortgage-calculator", desc: "Estimate home loan payments, PMI, taxes & interest." },
      { title: "Etsy Fee Calculator", to: "/tools/etsy-fee-calculator", desc: "Calculate Etsy seller fees & profit instantly." },
    ],
  },
  {
    id: "everyday-calculators",
    title: "Everyday Calculators",
    icon: Calculator,
    intro:
      "Quick everyday calculators for health, age and daily numeric tasks — accurate, fast and 100% free.",
    tools: [
      { title: "Age Calculator", to: "/tools/age-calculator", desc: "Find age with date of birth in years, months & days." },
      { title: "BMI Calculator", to: "/tools/bmi-calculator", desc: "Calculate your Body Mass Index in metric or imperial." },
      { title: "Number System Converter", to: "/tools/number-converter", desc: "Convert binary, decimal, octal & hexadecimal numbers." },
    ],
  },
  {
    id: "converters",
    title: "Converters & Utilities",
    icon: Wrench,
    intro:
      "Convert units, currencies, crypto and time zones with live rates and accurate formulas.",
    tools: [
      { title: "Unit Converter", to: "/tools/unit-converter", desc: "Convert length, weight, temperature & more." },
      { title: "Currency Converter", to: "/tools/currency-converter", desc: "Live currency exchange rates for 150+ currencies." },
      { title: "Crypto Converter", to: "/tools/crypto-converter", desc: "Live crypto prices & converter for BTC, ETH and more." },
      { title: "Time Zone Converter", to: "/tools/time-zone-converter", desc: "Convert time between cities & global time zones." },
      { title: "Pincode Lookup", to: "/tools/pincode-lookup", desc: "Find post office & area details by Indian pincode." },
      { title: "QR Code Generator", to: "/tools/qr-generator", desc: "Create free QR code for URL, text, WiFi & UPI." },
    ],
  },
];

export default function ToolsHub() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10 md:py-14" role="main">
        <header className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> 25+ free online tools · No signup
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4">
            All Pages — Free Online Tools Hub
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Every ToolsKit.tech page in one place. Browse image tools, PDF
            converters, finance calculators and everyday utilities — all 100%
            free, browser-based and privacy-friendly.
          </p>
        </header>

        {/* Quick jump nav — internal links boost crawl depth */}
        <nav
          aria-label="Categories"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="px-3 py-1.5 rounded-full text-sm font-semibold border border-border bg-card hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {c.title}
            </a>
          ))}
        </nav>

        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <section
              key={cat.id}
              id={cat.id}
              className="mb-12 scroll-mt-24"
              aria-labelledby={`${cat.id}-h`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h2
                  id={`${cat.id}-h`}
                  className="text-2xl md:text-3xl font-bold"
                >
                  {cat.title}
                </h2>
              </div>
              <p className="text-muted-foreground mb-5 max-w-3xl">
                {cat.intro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.tools.map((t) => (
                  <Link
                    key={t.to}
                    to={t.to}
                    className="block p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {t.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{t.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* SEO copy block — natural keyword usage */}
        <section className="prose prose-sm md:prose-base max-w-3xl mx-auto mt-14 text-foreground">
          <h2>Why use ToolsKit.tech free online tools?</h2>
          <p>
            ToolsKit.tech is a growing collection of free online tools built for
            students, creators, sellers and everyday users. Every tool runs in
            your browser — your files never leave your device, so you can
            compress an image to 20kb, crop a photo, or convert a PDF to image
            with complete privacy.
          </p>
          <h3>Popular categories</h3>
          <ul>
            <li>
              <strong>Image tools</strong> — image compressor, image cropper, KB
              converter, background remover and text on photo.
            </li>
            <li>
              <strong>PDF tools</strong> — image to PDF and PDF to image
              converters, no watermark, no signup.
            </li>
            <li>
              <strong>Finance calculators</strong> — SIP, FD, PPF, EMI, mortgage
              and Etsy fee calculator for accurate planning.
            </li>
            <li>
              <strong>Converters</strong> — unit converter, currency converter,
              crypto converter and time zone converter.
            </li>
          </ul>
          <p>
            Bookmark this page as your single hub for every ToolsKit.tech tool.
            We add new free online tools every month — explore, use and share.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
