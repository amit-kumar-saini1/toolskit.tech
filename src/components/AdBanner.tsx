import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
}

const AdBanner = ({ slot, format = "auto", responsive = true, className = "" }: AdBannerProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;

    let attempts = 0;
    const maxAttempts = 12;

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
        window.setTimeout(tryLoadAd, 300);
      }
    };

    const initialTimer = window.setTimeout(tryLoadAd, 600);
    return () => window.clearTimeout(initialTimer);
  }, []);

  return (
    <div className={`ad-container overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1909827564331292"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};

export default AdBanner;
