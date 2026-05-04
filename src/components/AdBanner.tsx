import { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
  showLabel?: boolean;
  wrapperClassName?: string;
}

const AdBanner = ({ slot, format = "auto", responsive = true, className = "", showLabel = false, wrapperClassName = "" }: AdBannerProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);
  const [mounted, setMounted] = useState(false);

  // Render <ins> only on client to ensure AdSense always initialises
  // after hydration (fully client-side rendering for ads).
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isLoaded.current) return;

    // Use IntersectionObserver to lazy-load ads only when visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          loadAd();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [mounted]);

  const loadAd = () => {
    if (isLoaded.current) return;
    let attempts = 0;
    const maxAttempts = 10;

    const tryLoadAd = () => {
      if (isLoaded.current) return;
      try {
        const adsbygoogle = (window as any).adsbygoogle;
        const hasWidth = !!adRef.current && adRef.current.offsetWidth > 0;
        if (adsbygoogle && hasWidth) {
          adsbygoogle.push({});
          isLoaded.current = true;
          return;
        }
      } catch (error) {
        console.error("AdSense error:", error);
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        window.setTimeout(tryLoadAd, 500);
      }
    };

    window.setTimeout(tryLoadAd, 300);
  };

  return (
    <div ref={containerRef} className={`${wrapperClassName}`}>
      {showLabel && <p className="text-xs text-muted-foreground text-center mb-2">Advertisement</p>}
      <div className={`ad-container overflow-hidden min-h-[100px] sm:min-h-[250px] bg-white dark:bg-white/10 rounded-lg ${className}`}>
        {mounted && (
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1909827564331292"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? "true" : "false"}
          />
        )}
      </div>
    </div>
  );
};

export default AdBanner;
