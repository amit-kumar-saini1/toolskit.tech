import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { seoMeta, seoLinks } from "@/components/SEO";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: seoMeta({
      title: "Terms of Service - ToolsKit.tech",
      description: "Terms of service for using ToolsKit.tech free online tools.",
      canonicalUrl: "/terms",
    }),
    links: seoLinks("/terms"),
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold gradient-text mb-6">Terms of Service</h1>
          <div className="glass-card rounded-2xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using ToolsKit.tech, you accept and agree to be bound by these
                Terms of Service.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Use of Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our tools are provided free of charge for personal and commercial use. You agree
                to use our services responsibly and not for any illegal purposes.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are provided "as is" without any warranties. While we strive to
                provide accurate and reliable tools, we cannot guarantee error-free operation.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                ToolsKit.tech shall not be liable for any damages arising from the use or
                inability to use our services.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
