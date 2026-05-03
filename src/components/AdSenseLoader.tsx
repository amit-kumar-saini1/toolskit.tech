import { useEffect } from "react";

/**
 * Client-side AdSense script loader.
 * Injects the adsbygoogle script after hydration so it never blocks SSR
 * and only runs in the browser.
 */
const AdSenseLoader = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.querySelector('script[data-adsbygoogle-loader="true"]')) return;
    const s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1909827564331292";
    s.setAttribute("data-adsbygoogle-loader", "true");
    document.head.appendChild(s);
  }, []);
  return null;
};

export default AdSenseLoader;