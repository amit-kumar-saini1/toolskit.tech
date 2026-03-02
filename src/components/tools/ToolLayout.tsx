import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LucideIcon, Heart, BookOpen, ListChecks, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import { toolsSEO, getToolStructuredData, ToolArticle } from "@/lib/seoData";
import donateQr from "@/assets/donate-qr.png";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
  toolSlug?: string;
}

const DonateBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
      <div className="bg-white rounded-lg p-1.5 shrink-0">
        <img src={donateQr} alt="Donate QR Code" className="w-20 h-20 rounded" />
      </div>
      <div className="text-center sm:text-left">
        <h3 className="font-semibold flex items-center justify-center sm:justify-start gap-2 text-foreground">
          <Heart className="w-4 h-4 text-destructive" />
          Love this tool? Support us!
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Support to keep this free & secure. Scan QR to donate via UPI.
        </p>
      </div>
    </div>);

};

const ToolArticleSection = ({ article, toolName }: {article: ToolArticle;toolName: string;}) => {
  // Parse howToUse into numbered steps
  const howToUseSteps = article.howToUse.
  split(/(?:First,|Second,|Next,|Then,|After|Finally,|Once|Begin by|Start by)/gi).
  filter((step) => step.trim().length > 20).
  map((step) => step.trim().replace(/^[,.\s]+/, '').replace(/[.]\s*$/, ''));

  return (
    <div className="glass-card rounded-2xl p-6 space-y-8">
      {/* Section Header - Like Government Forms */}
      <div className="border-b-2 border-primary pb-4">
        <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            i
          </div>
          Complete Guide: {toolName}
        </h2>
        <p className="text-sm text-muted-foreground mt-2">Read the instructions carefully before using this tool</p>
      </div>
      
      {/* Section 1: Introduction */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-4 py-3 border-b border-border">
          <h3 className="font-bold text-foreground flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
            परिचय / Introduction
          </h3>
        </div>
        <div className="p-4">
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{article.introduction}</p>
        </div>
      </div>
      
      {/* Section 2: How to Use - Step by Step */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-4 py-3 border-b border-border">
          <h3 className="font-bold text-foreground flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
            उपयोग कैसे करें / How to Use
          </h3>
        </div>
        <div className="p-4">
          {howToUseSteps.length > 1 ?
          <ol className="space-y-3">
              {howToUseSteps.map((step, index) =>
            <li key={index} className="flex gap-3 text-sm md:text-base">
                  <span className="shrink-0 w-6 h-6 rounded bg-secondary/20 text-secondary-foreground flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground leading-relaxed">{step}.</span>
                </li>
            )}
            </ol> :

          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{article.howToUse}</p>
          }
        </div>
      </div>
      
      {/* Section 3: Key Features */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-4 py-3 border-b border-border">
          <h3 className="font-bold text-foreground flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
            मुख्य विशेषताएं / Key Features
          </h3>
        </div>
        <div className="p-4">
          <div className="grid gap-2">
            {article.keyFeatures.map((feature, index) =>
            <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <span className="shrink-0 w-5 h-5 rounded bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span className="text-muted-foreground text-sm md:text-base">{feature}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Important Notice - Like Government Forms */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 flex items-center gap-2 mb-2">
          <span>⚠️</span> महत्वपूर्ण सूचना / Important Notice
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• यह टूल 100% मुफ्त है और कोई पंजीकरण आवश्यक नहीं है।</li>
          <li>• This tool is 100% free and no registration is required.</li>
          <li>• आपकी फाइलें आपके ब्राउज़र में प्रोसेस होती हैं, कोई डेटा अपलोड नहीं होता।</li>
          <li>• Your files are processed in your browser, no data is uploaded.</li>
        </ul>
      </div>
    </div>);

};

const ToolLayout = ({ title, description, icon: Icon, children, toolSlug }: ToolLayoutProps) => {
  // Get SEO data for this tool
  const slug = toolSlug || title.toLowerCase().replace(/\s+/g, "-");
  const seoData = toolsSEO[slug];
  const structuredData = getToolStructuredData(slug, seoData?.h1Title || title, seoData?.description || description);

  // Use SEO-optimized H1 title if available
  const h1Title = seoData?.h1Title || title;

  return (
    <>
      {seoData &&
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl={`/tools/${slug}`}
        structuredData={structuredData} />

      }
      
      <div className="min-h-screen py-8">
        <div className="container">
          {/* Breadcrumbs */}
          <Breadcrumbs />
          
          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          {/* Main Content */}
          <article className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <header className="glass-card rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">{h1Title}</h1>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1">{seoData?.description || description}</p>
                </div>
              </div>
            </header>

            {/* H2 Sub-headings for keyword spreading */}
            {seoData?.h2Headings && seoData.h2Headings.length > 0













            }

            {/* Tool Content */}
            <section className="glass-card rounded-2xl p-6">
              {children}
            </section>

            {/* Donate Banner */}
            <DonateBanner />

            {/* FAQ Section */}
            {seoData?.faqs && seoData.faqs.length > 0 &&
            <section className="glass-card rounded-2xl p-6">
                <FAQ faqs={seoData.faqs} toolName={title} />
              </section>
            }


            {/* SEO Article Section */}
            {seoData?.article &&
            <ToolArticleSection article={seoData.article} toolName={title} />
            }
          </article>
        </div>
      </div>
    </>);

};

export default ToolLayout;