import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, Zap, Shield, Heart } from "lucide-react";
import { seoMeta, seoLinks } from "@/components/SEO";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: seoMeta({
      title: "About Us - ToolsKit.tech | Free Online Tools",
      description:
        "Learn about ToolsKit.tech - your destination for 50+ free online tools. Our mission is to provide fast, free, and accessible utilities for everyone.",
      canonicalUrl: "/about",
    }),
    links: seoLinks("/about"),
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold gradient-text mb-6">About ToolsKit.tech</h1>

          <div className="glass-card rounded-2xl p-8 mb-8">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              ToolsKit.tech is your go-to destination for free online tools that make your daily
              tasks easier. We provide a collection of powerful, easy-to-use utilities for image
              editing, PDF conversion, calculations, and much more.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our mission is to provide high-quality, free tools that are accessible to everyone.
              No sign-up required, no hidden fees – just powerful tools at your fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { icon: Zap, title: "Fast & Free", desc: "All tools are completely free with no limitations. Quick processing in your browser." },
              { icon: Shield, title: "Privacy First", desc: "Files processed locally in your browser. We never upload or store your data." },
              { icon: Users, title: "User Friendly", desc: "Simple intuitive interface for everyone, from beginners to professionals." },
              { icon: Heart, title: "Made with Love", desc: "We continuously improve and add new tools based on user feedback." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
