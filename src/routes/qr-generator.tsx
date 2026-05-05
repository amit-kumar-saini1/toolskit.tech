import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { QrCode, Download, Copy, X } from "lucide-react";
import QRCode from "qrcode";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildPageHead } from "@/lib/toolHead";

export const Route = createFileRoute("/qr-generator")({
  head: () => {
    const base = buildPageHead({
      title:
        "QR Code Generator – Free Online QR Maker for URL, Text, WiFi | ToolsKit.tech",
      description:
        "Free online QR code generator. Create high-quality QR codes for URLs, text, WiFi, UPI, business cards and more. Instant download as PNG, no signup, no watermark.",
      keywords:
        "qr code generator, free qr code maker, online qr generator, qr code for url, qr code for text, wifi qr code, upi qr code, generate qr code online, qr maker free, png qr code download",
      path: "/qr-generator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is this QR code generator free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, the ToolsKit.tech QR code generator is 100% free, unlimited, and requires no signup. Generated QR codes never expire.",
          },
        },
        {
          "@type": "Question",
          name: "Do generated QR codes expire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. We create static QR codes that encode your data directly, so they work forever without any subscription.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use these QR codes commercially?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. QR codes generated here can be printed on business cards, posters, packaging, menus and used for any commercial purpose royalty-free.",
          },
        },
      ],
    };
    return {
      ...base,
      scripts: [
        ...base.scripts,
        { type: "application/ld+json", children: JSON.stringify(faqLd) },
      ],
    };
  },
  component: QRGeneratorPage,
});

const RELATED_TOOLS: { label: string; to: string; hot?: boolean }[] = [
  { label: "Increase Image Size In KB", to: "/tools/kb-converter", hot: true },
  { label: "PDF To Images", to: "/tools/pdf-to-image" },
  { label: "Remove Background", to: "/tools/remove-background" },
  { label: "KB Resize Pixel", to: "/kb-resize-pixel", hot: true },
  { label: "Images To PDF", to: "/tools/image-to-pdf" },
  { label: "Image Compressor", to: "/tools/image-compressor" },
  { label: "Image Cropper", to: "/tools/image-cropper" },
  { label: "Text On Photo", to: "/tools/text-on-photo" },
  { label: "Color Picker", to: "/tools/color-picker" },
];

function AutorelaxedAd() {
  const ref = useRef<HTMLModElement>(null);
  const loaded = useRef(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted || loaded.current) return;
    const tryPush = (n = 0) => {
      if (loaded.current) return;
      const ag = (window as any).adsbygoogle;
      if (ag && ref.current && ref.current.offsetWidth > 0) {
        try {
          ag.push({});
          loaded.current = true;
        } catch {
          /* ignore */
        }
        return;
      }
      if (n < 12) window.setTimeout(() => tryPush(n + 1), 500);
    };
    tryPush();
  }, [mounted]);
  return (
    <div className="my-6">
      <p className="text-xs text-muted-foreground text-center mb-2">Advertisement</p>
      {mounted && (
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-1909827564331292"
          data-ad-slot="6789447857"
        />
      )}
    </div>
  );
}

function SidebarAd() {
  const ref = useRef<HTMLModElement>(null);
  const loaded = useRef(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted || loaded.current) return;
    const tryPush = (n = 0) => {
      if (loaded.current) return;
      const ag = (window as any).adsbygoogle;
      if (ag && ref.current && ref.current.offsetWidth > 0) {
        try {
          ag.push({});
          loaded.current = true;
        } catch {
          /* ignore */
        }
        return;
      }
      if (n < 12) window.setTimeout(() => tryPush(n + 1), 500);
    };
    tryPush();
  }, [mounted]);
  return (
    <div className="bg-card border border-border rounded-xl p-2">
      <p className="text-[10px] text-muted-foreground text-center mb-1">Advertisement</p>
      {mounted && (
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: "block", minHeight: "500px" }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-1909827564331292"
          data-ad-slot="6789447857"
        />
      )}
    </div>
  );
}

function QRGeneratorPage() {
  const [text, setText] = useState("https://toolskit.tech");
  const [fileName, setFileName] = useState("qrcode");
  const [dataUrl, setDataUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generate = async () => {
      if (!text.trim() || !canvasRef.current) {
        setDataUrl("");
        return;
      }
      try {
        await QRCode.toCanvas(canvasRef.current, text, {
          width: 280,
          margin: 2,
          color: { dark: "#000000", light: "#ffffff" },
        });
        setDataUrl(canvasRef.current.toDataURL("image/png"));
      } catch (e) {
        console.error(e);
      }
    };
    generate();
  }, [text]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${fileName.trim() || "qrcode"}.png`;
    a.click();
    toast.success("QR Code downloaded!");
  };

  const handleCopy = async () => {
    if (!canvasRef.current) return;
    try {
      const blob = await new Promise<Blob>((res, rej) =>
        canvasRef.current!.toBlob((b) => (b ? res(b) : rej()), "image/png"),
      );
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      toast.success("QR Code copied!");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen py-6 bg-muted/20" role="main">
        <div className="container max-w-6xl px-3 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            {/* Main tool column */}
            <article>
              <section
                aria-label="QR Code Generator Tool"
                className="bg-card border-2 border-dashed border-primary/40 rounded-2xl p-5 md:p-8"
              >
                <header className="text-center space-y-2 mb-6">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-foreground flex items-center justify-center gap-2">
                    <QrCode className="w-8 h-8 text-primary" />
                    QR Code Generator
                  </h1>
                  <p className="text-muted-foreground">
                    Create a free QR code for any URL, text, WiFi, UPI or contact card.
                  </p>
                </header>

                <div className="space-y-4 max-w-xl mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="qr-text">Enter URL or Text</Label>
                    <div className="relative">
                      <Input
                        id="qr-text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="https://example.com or any text"
                        className="h-12 pr-12"
                      />
                      {text && (
                        <button
                          type="button"
                          onClick={() => setText("")}
                          aria-label="Clear input"
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 pt-2">
                    <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
                      <canvas ref={canvasRef} width={280} height={280} className="w-[280px] h-[280px]" />
                    </div>

                    {text && (
                      <div className="w-full space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="qr-filename">File Name</Label>
                          <div className="flex gap-2 items-center">
                            <Input
                              id="qr-filename"
                              value={fileName}
                              onChange={(e) => setFileName(e.target.value)}
                              className="flex-1"
                            />
                            <span className="text-muted-foreground">.png</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center">
                          <Button onClick={handleDownload} size="lg">
                            <Download className="w-4 h-4 mr-2" /> Download PNG
                          </Button>
                          <Button variant="outline" onClick={handleCopy} size="lg">
                            <Copy className="w-4 h-4 mr-2" /> Copy
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Single autorelaxed ad — like in screenshot */}
              <AutorelaxedAd />

              {/* 800+ words SEO content, no ads in between */}
              <section className="prose prose-sm md:prose-base max-w-none text-foreground bg-card rounded-2xl p-5 md:p-8 border border-border mt-6">
                <h2>Free QR Code Generator – Create Unlimited QR Codes Online</h2>
                <p>
                  ToolsKit.tech QR Code Generator is a fast, secure, and 100% free
                  online tool that lets you create high-resolution QR codes for any
                  URL, plain text, phone number, email, WiFi password, UPI ID, or
                  vCard contact in seconds. Whether you run a small business, manage
                  marketing campaigns, teach in a classroom, or just want to share a
                  link without typing it out, our generator gives you a clean,
                  scannable PNG image you can download instantly and use anywhere —
                  no signup, no watermark, and no expiry.
                </p>

                <h2>Why use our QR code generator?</h2>
                <p>
                  Most online QR generators either limit how many codes you can
                  create per day, force you to register an account, or stamp a logo
                  across your code that lowers scan reliability. We do none of that.
                  Every QR code generated on this page is a static QR code, which
                  means the data is encoded directly inside the image. Once you
                  download it, the code will keep working forever — even if our
                  website ever goes down. There is no tracking server, no redirect,
                  and no privacy risk for whoever scans your code.
                </p>

                <h2>What can you encode in a QR code?</h2>
                <ul>
                  <li>
                    <strong>Website URLs:</strong> Send users straight to a landing
                    page, product listing, YouTube video, social media profile, or
                    Google review form.
                  </li>
                  <li>
                    <strong>Plain text:</strong> Share serial numbers, coupon codes,
                    or short instructions on packaging and posters.
                  </li>
                  <li>
                    <strong>WiFi credentials:</strong> Print a QR for your café or
                    office so guests connect without typing the password.
                  </li>
                  <li>
                    <strong>UPI payments:</strong> Encode <code>upi://pay?pa=yourid@bank&amp;pn=YourName</code>{" "}
                    so customers can pay you directly with Google Pay, PhonePe or
                    Paytm.
                  </li>
                  <li>
                    <strong>Phone &amp; SMS:</strong> Use <code>tel:+1...</code> or
                    <code> sms:+1...</code> to launch a call or text message.
                  </li>
                  <li>
                    <strong>Email:</strong> Use{" "}
                    <code>mailto:hello@example.com?subject=Hello</code> so scanners
                    open a pre-filled email.
                  </li>
                  <li>
                    <strong>Business cards:</strong> Encode a vCard so customers can
                    save your contact details with one tap.
                  </li>
                </ul>

                <h2>How to generate a QR code in 3 steps</h2>
                <ol>
                  <li>
                    Type or paste your URL, text, WiFi string, or UPI link in the
                    input box above. The QR code on the right updates live as you
                    type.
                  </li>
                  <li>
                    Pick a clear, descriptive file name — for example
                    <em> menu-october-2026 </em> or <em> wifi-cafe </em> — so you
                    can find it later.
                  </li>
                  <li>
                    Click <strong>Download PNG</strong>. You can also click{" "}
                    <strong>Copy</strong> to paste the QR code straight into Google
                    Docs, Slides, Canva, or a chat message.
                  </li>
                </ol>

                <h2>Privacy &amp; security</h2>
                <p>
                  Your text never leaves your device. The QR code is rendered
                  entirely in your browser using the HTML5 Canvas API and a small
                  open-source library, so nothing is uploaded, logged, or stored on
                  our servers. That makes ToolsKit.tech a safer choice than free
                  generators that send your link through an analytics redirect.
                </p>

                <h2>Tips for QR codes that always scan</h2>
                <ul>
                  <li>
                    Print the QR code at least <strong>2 × 2 cm</strong> (0.8 × 0.8
                    inch) for hand-held scanning, and <strong>5 × 5 cm</strong> for
                    posters seen from a few meters away.
                  </li>
                  <li>
                    Keep a quiet zone of white space around the code — at least 4
                    times the size of one black square.
                  </li>
                  <li>
                    Maintain a strong contrast: dark code on a light background scans
                    best. Avoid inverted (white on black) codes when possible.
                  </li>
                  <li>
                    Test the QR with several phones — iPhone Camera, Google Lens,
                    and a third-party scanner — before printing thousands of copies.
                  </li>
                  <li>
                    Shorten very long URLs first using a service you trust, so the
                    QR has fewer modules and stays readable at small sizes.
                  </li>
                </ul>

                <h2>Common use cases</h2>
                <p>
                  Restaurant menus, real-estate yard signs, wedding invitations,
                  museum exhibits, classroom worksheets, retail packaging, event
                  badges, business cards, podcast cover art, gym equipment
                  tutorials, product manuals, payment counters, attendance
                  registers, app download pages — anywhere you need to bridge the
                  physical and digital world, a free QR code from ToolsKit.tech
                  does the job.
                </p>

                <h2>Frequently asked questions</h2>
                <h3>Will my QR code expire?</h3>
                <p>
                  No. We generate static QR codes, so the data is permanently
                  encoded inside the image. As long as your destination URL stays
                  live, the QR will keep working — for years.
                </p>
                <h3>Can I add a logo in the middle?</h3>
                <p>
                  Not directly here. Download the PNG, then drop a small logo in
                  the centre using Canva, Figma, or Photoshop. Keep the logo under
                  20% of the QR width so the error correction can still recover the
                  data.
                </p>
                <h3>What size image do I get?</h3>
                <p>
                  The downloaded PNG is 280 × 280 pixels with a transparent margin,
                  which scales cleanly up to A4 print size without losing
                  sharpness.
                </p>
                <h3>Is there a limit on how many QR codes I can make?</h3>
                <p>
                  No daily limit, no monthly cap. Generate as many as you need,
                  free forever.
                </p>

                <p className="mt-6">
                  Need to resize a logo or photo before adding it inside your QR
                  code? Try our free
                  <Link to="/tools/image-compressor" className="text-primary underline mx-1">Image Compressor</Link>
                  or
                  <Link to="/tools/image-cropper" className="text-primary underline mx-1">Image Cropper</Link>
                  — also 100% browser-based.
                </p>
              </section>
            </article>

            {/* Right sidebar — related tool links like screenshot */}
            <aside aria-label="Related tools" className="space-y-3">
              <div className="sticky top-4 space-y-3">
                <div className="bg-card border border-border rounded-xl p-2 grid grid-cols-2 gap-1.5">
                  {RELATED_TOOLS.map((t) => (
                    <Link
                      key={t.to}
                      to={t.to}
                      className="block text-center text-xs md:text-sm font-semibold text-primary hover:bg-primary/5 border border-border rounded-lg px-1.5 py-1.5 transition-colors leading-tight"
                    >
                      {t.hot && <span className="text-destructive mr-1">●</span>}
                      {t.label}
                    </Link>
                  ))}
                </div>
                <SidebarAd />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}