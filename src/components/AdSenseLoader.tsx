import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * Client-side AdSense script loader.
 * Injects the adsbygoogle script after hydration so it never blocks SSR
 * and only runs in the browser.
 */
const AdSenseLoader = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let loaded = false;
    const loadScripts = () => {
      if (loaded) return;
      loaded = true;

      // AdSense
      if (!document.querySelector('script[data-adsbygoogle-loader="true"]')) {
        const ads = document.createElement("script");
        ads.async = true;
        ads.crossOrigin = "anonymous";
        ads.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1909827564331292";
        ads.setAttribute("data-adsbygoogle-loader", "true");
        document.head.appendChild(ads);
      }

      // Google Analytics (gtag.js) — GA4 ID G-8FFBL49HVN
      const GA_ID = "G-8FFBL49HVN";
      if (!document.querySelector('script[data-ga-loader="true"]')) {
        const ga = document.createElement("script");
        ga.async = true;
        ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        ga.setAttribute("data-ga-loader", "true");
        document.head.appendChild(ga);

        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        function gtag(...args: any[]) {
          w.dataLayer.push(args);
        }
        w.gtag = gtag;
        gtag("js", new Date());
        gtag("config", GA_ID, { send_page_view: true });
      }
    };

    // Defer until browser is idle OR first user interaction, whichever first.
    // Hard cap at 6s so analytics still fires on bounce.
    const events: (keyof WindowEventMap)[] = [
      "scroll",
      "pointerdown",
      "keydown",
      "touchstart",
    ];
    const onInteract = () => {
      events.forEach((e) => window.removeEventListener(e, onInteract));
      loadScripts();
    };
    events.forEach((e) =>
      window.addEventListener(e, onInteract, { once: true, passive: true }),
    );

    const w = window as any;
    const idleId =
      typeof w.requestIdleCallback === "function"
        ? w.requestIdleCallback(loadScripts, { timeout: 4000 })
        : window.setTimeout(loadScripts, 3500);
    const hardCap = window.setTimeout(loadScripts, 6000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, onInteract));
      window.clearTimeout(hardCap);
      if (typeof w.cancelIdleCallback === "function") {
        try {
          w.cancelIdleCallback(idleId);
        } catch {
          /* ignore */
        }
      } else {
        window.clearTimeout(idleId as number);
      }
    };
  }, []);

  // Fire GA page_view on every client-side route change
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as any;
    if (typeof w.gtag === "function") {
      w.gtag("event", "page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname]);

  return null;
};

export default AdSenseLoader;