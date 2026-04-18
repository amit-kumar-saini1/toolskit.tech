import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send } from "lucide-react";
import { seoMeta, seoLinks } from "@/components/SEO";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: seoMeta({
      title: "Contact Us - ToolsKit.tech | Get Support & Feedback",
      description:
        "Contact ToolsKit.tech for support, feedback, or inquiries about our free online tools.",
      canonicalUrl: "/contact",
    }),
    links: seoLinks("/contact"),
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    );
    window.location.href = `mailto:toolskit.tech@outlook.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold gradient-text mb-2">Get in Touch</h1>
          <p className="text-muted-foreground mb-8">
            Have questions or feedback? We'd love to hear from you.
          </p>

          <div className="glass-card rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <Button type="submit" variant="gradient" size="lg" className="w-full">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <a href="mailto:toolskit.tech@outlook.com" className="hover:text-primary">
                toolskit.tech@outlook.com
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
