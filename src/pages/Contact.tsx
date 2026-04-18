import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:toolskit.tech@outlook.com?subject=${subject}&body=${body}`;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ToolsKit.tech",
    "description": "Contact ToolsKit.tech for support, feedback, or inquiries about our free online tools.",
    "url": "https://toolskit.tech/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "ToolsKit.tech",
      "email": "toolskit.tech@outlook.com",
      "url": "https://toolskit.tech",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "toolskit.tech@outlook.com",
        "contactType": "customer support",
        "availableLanguage": ["English", "Hindi"]
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Us - ToolsKit.tech | Get Support & Feedback"
        description="Contact ToolsKit.tech for support, feedback, or inquiries. We're here to help with our free online tools including image compressor, PDF converter, QR generator, and more."
        keywords="contact toolskit, toolskit support, toolskit help, toolskit feedback, online tools support, free tools contact"
        canonicalUrl="/contact"
        structuredData={structuredData}
      />
      <Header />
      
      <main className="container py-12">
        <article className="max-w-2xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">Contact Us - Get in Touch with ToolsKit.tech</h1>
            <p className="text-lg text-muted-foreground">
              Have questions, feedback, or need assistance? We'd love to hear from you. Fill out the form below or reach us directly via email.
            </p>
          </header>
          
          <section className="glass-card rounded-2xl p-8 mb-8" aria-label="Contact Form">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Send Us a Message</h2>
                <p className="text-sm text-muted-foreground">We typically respond within 24-48 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium mb-2 block">Full Name <span className="text-destructive">*</span></label>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="text-sm font-medium mb-2 block">Email Address <span className="text-destructive">*</span></label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="text-sm font-medium mb-2 block">Your Message <span className="text-destructive">*</span></label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Describe your question, feedback, or inquiry in detail..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  aria-required="true"
                />
              </div>

              <Button type="submit" variant="gradient" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message via Email
              </Button>
            </form>
          </section>

          <section className="grid md:grid-cols-2 gap-6" aria-label="Contact Information">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-sm text-muted-foreground">Direct email support</p>
                </div>
              </div>
              <a 
                href="mailto:toolskit.tech@outlook.com" 
                className="text-primary hover:underline break-all"
              >
                toolskit.tech@outlook.com
              </a>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Response Time</h3>
                  <p className="text-sm text-muted-foreground">We're here to help</p>
                </div>
              </div>
              <p className="text-foreground">Usually within 24-48 hours</p>
            </div>
          </section>

          <section className="mt-8 glass-card rounded-xl p-6" aria-label="FAQ">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground">What can I contact you about?</h3>
                <p className="text-sm text-muted-foreground mt-1">You can reach us for tool suggestions, bug reports, feature requests, partnership inquiries, or any general questions about ToolsKit.tech.</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Is ToolsKit.tech free to use?</h3>
                <p className="text-sm text-muted-foreground mt-1">Yes! All our online tools are completely free with no hidden charges, watermarks, or signup requirements.</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Are my files safe?</h3>
                <p className="text-sm text-muted-foreground mt-1">Absolutely. All file processing happens directly in your browser. Your files are never uploaded to our servers, ensuring complete privacy.</p>
              </div>
            </div>
          </section>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
