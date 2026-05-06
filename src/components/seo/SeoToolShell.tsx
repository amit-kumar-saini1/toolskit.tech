import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export type RelatedTool = { label: string; to: string; hot?: boolean };

export const DEFAULT_RELATED_TOOLS: RelatedTool[] = [
  { label: "QR Code Generator", to: "/qr-generator", hot: true },
  { label: "Increase Image Size In KB", to: "/tools/kb-converter", hot: true },
  { label: "PDF To Images", to: "/pdf-to-image" },
  { label: "Remove Background", to: "/remove-background" },
  { label: "KB Resize Pixel", to: "/kb-resize-pixel", hot: true },
  { label: "Images To PDF", to: "/image-to-pdf" },
  { label: "Image Compressor", to: "/image-compressor", hot: true },
  { label: "Image Cropper", to: "/tools/image-cropper" },
  { label: "Text On Photo", to: "/tools/text-on-photo" },
  { label: "Color Picker", to: "/tools/color-picker" },
];

export function AutorelaxedAd() {
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

export function SidebarAd() {
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

interface SeoToolShellProps {
  /** H1 title shown above the tool */
  h1: string;
  /** Subtitle below H1 */
  subtitle: string;
  /** Tool widget (the interactive part) */
  tool: ReactNode;
  /** Long-form SEO content (no ads in between, 800+ words) */
  content: ReactNode;
  /** Optional override for related tools (defaults exclude current page) */
  currentPath?: string;
  related?: RelatedTool[];
}

export default function SeoToolShell({
  h1,
  subtitle,
  tool,
  content,
  currentPath,
  related,
}: SeoToolShellProps) {
  const list = (related ?? DEFAULT_RELATED_TOOLS).filter((t) => t.to !== currentPath);
  return (
    <>
      <Header />
      <main className="min-h-screen py-6 bg-muted/20" role="main">
        <div className="container max-w-6xl px-3 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            <article>
              <section
                aria-label={h1}
                className="bg-card border-2 border-dashed border-primary/40 rounded-2xl p-5 md:p-8"
              >
                <header className="text-center space-y-2 mb-6">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
                    {h1}
                  </h1>
                  <p className="text-muted-foreground">{subtitle}</p>
                </header>
                <div className="max-w-3xl mx-auto">{tool}</div>
              </section>

              <AutorelaxedAd />

              <section className="prose prose-sm md:prose-base max-w-none text-foreground bg-card rounded-2xl p-5 md:p-8 border border-border mt-6">
                {content}
              </section>
            </article>

            <aside aria-label="Related tools" className="space-y-3">
              <div className="sticky top-4 space-y-3">
                <div className="bg-card border border-border rounded-xl p-2 grid grid-cols-2 gap-1.5">
                  {list.map((t) => (
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