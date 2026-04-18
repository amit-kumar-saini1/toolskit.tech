import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ToolCard from "@/components/home/ToolCard";
import { tools } from "@/lib/toolsList";
import { seoMeta, seoLinks } from "@/components/SEO";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: seoMeta({
      title: "All Free Online Tools - ToolsKit.tech",
      description:
        "Browse 50+ free online tools: image compressor, PDF converter, QR generator, calculators, color picker and more. No signup required.",
      keywords: "all online tools, free tools list, online utilities, free web tools",
      canonicalUrl: "/tools",
    }),
    links: seoLinks("/tools"),
  }),
  component: AllTools,
});

function AllTools() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">All Tools</h1>
        <p className="text-muted-foreground mb-8">
          Browse our complete collection of free online tools
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.path} {...tool} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
