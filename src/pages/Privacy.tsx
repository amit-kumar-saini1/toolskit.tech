import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold gradient-text mb-6">Privacy Policy</h1>
          
          <div className="glass-card rounded-2xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                At AllTool.tech, we take your privacy seriously. This policy explains how we handle your data when you use our tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Data Processing</h2>
              <p className="text-muted-foreground leading-relaxed">
                All file processing happens locally in your browser. We do not upload, store, or have access to any files you process using our tools. Your data never leaves your device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may use cookies to improve your browsing experience and for analytics purposes. These cookies do not contain any personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may use third-party advertising services. These services may collect anonymous data about your visit for advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our contact page.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
