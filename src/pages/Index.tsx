import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ToolsGrid from "@/components/home/ToolsGrid";
import SEO from "@/components/SEO";

const Index = () => {
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ToolsKit.tech",
    "alternateName": ["ToolsKit", "Tools Kit", "ToolsKit Tech"],
    "url": "https://toolskit.tech",
    "description": "Best free online tools website with 50+ free tools including PDF converter, image compressor, background remover, QR generator, and more.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://toolskit.tech/tools?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ToolsKit.tech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://storage.googleapis.com/gpt-engineer-file-uploads/di7j8UAQsIVOsCbK58eG1NP3xrh2/uploads/1765097322356-mast logo.png"
      }
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ToolsKit.tech",
    "url": "https://toolskit.tech",
    "logo": "https://storage.googleapis.com/gpt-engineer-file-uploads/di7j8UAQsIVOsCbK58eG1NP3xrh2/uploads/1765097322356-mast logo.png",
    "sameAs": [
      "https://x.com/AmitSaini184544",
      "https://www.linkedin.com/in/amit-kumar-saini-38b6143a0/",
      "https://github.com/amit-kumar-saini"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "url": "https://toolskit.tech/contact"
    }
  };

  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Free Online Tools",
    "description": "Collection of free online tools for everyday use",
    "numberOfItems": 13,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Image Compressor", "url": "https://toolskit.tech/tools/image-compressor" },
      { "@type": "ListItem", "position": 2, "name": "Image to PDF", "url": "https://toolskit.tech/tools/image-to-pdf" },
      { "@type": "ListItem", "position": 3, "name": "Remove Background", "url": "https://toolskit.tech/tools/remove-background" },
      { "@type": "ListItem", "position": 4, "name": "QR Code Generator", "url": "https://toolskit.tech/tools/qr-generator" },
      { "@type": "ListItem", "position": 5, "name": "Age Calculator", "url": "https://toolskit.tech/tools/age-calculator" },
      { "@type": "ListItem", "position": 6, "name": "BMI Calculator", "url": "https://toolskit.tech/tools/bmi-calculator" },
      { "@type": "ListItem", "position": 7, "name": "Image Cropper", "url": "https://toolskit.tech/tools/image-cropper" },
      { "@type": "ListItem", "position": 8, "name": "Color Picker", "url": "https://toolskit.tech/tools/color-picker" },
      { "@type": "ListItem", "position": 9, "name": "Unit Converter", "url": "https://toolskit.tech/tools/unit-converter" },
      { "@type": "ListItem", "position": 10, "name": "PDF to Image", "url": "https://toolskit.tech/tools/pdf-to-image" },
      { "@type": "ListItem", "position": 11, "name": "KB Converter", "url": "https://toolskit.tech/tools/kb-converter" },
      { "@type": "ListItem", "position": 12, "name": "Text on Photo", "url": "https://toolskit.tech/tools/text-on-photo" },
      { "@type": "ListItem", "position": 13, "name": "Number Converter", "url": "https://toolskit.tech/tools/number-converter" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="ToolsKit.tech - 100% Free Online Tools | No Signup | PDF, Image, QR & More"
        description="ToolsKit.tech - Best free online tools website. 50+ free tools: PDF converter, image compressor, background remover, QR generator, age calculator. 100% free, no signup, fast & secure. Use unlimited!"
        keywords="free online tools, free pdf converter online, free image compressor, free background remover, free qr code generator, free age calculator, free unit converter, online tools free, best free tools"
        canonicalUrl="/"
        structuredData={homeStructuredData}
      />
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(itemListData)}
      </script>
      <Header />
      <main>
        <HeroSection />
        <ToolsGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
