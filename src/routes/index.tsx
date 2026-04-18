import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ToolsGrid from "@/components/home/ToolsGrid";
import { seoMeta, seoLinks, StructuredData } from "@/components/SEO";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seoMeta({
      title: "ToolsKit.tech - 100% Free Online Tools | No Signup | PDF, Image, QR & More",
      description:
        "ToolsKit.tech - Best free online tools website. 50+ free tools: PDF converter, image compressor, background remover, QR generator, age calculator. 100% free, no signup, fast & secure.",
      keywords:
        "free online tools, free pdf converter, free image compressor, free background remover, free qr code generator, free age calculator, free unit converter, online tools free",
      canonicalUrl: "/",
    }),
    links: seoLinks("/"),
  }),
  component: Index,
});

function Index() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ToolsKit.tech",
    url: "https://toolskit.tech",
    description:
      "Best free online tools website with 50+ free tools including PDF converter, image compressor, background remover, QR generator, and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://toolskit.tech/tools?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ToolsKit.tech",
    url: "https://toolskit.tech",
    sameAs: [
      "https://x.com/AmitSaini184544",
      "https://www.linkedin.com/in/amit-kumar-saini-38b6143a0/",
      "https://github.com/amit-kumar-saini",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <StructuredData data={[websiteData, orgData]} />
      <Header />
      <main>
        <HeroSection />
        <ToolsGrid />
      </main>
      <Footer />
    </div>
  );
}
