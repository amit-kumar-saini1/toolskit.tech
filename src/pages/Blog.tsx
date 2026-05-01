import Header from "@/components/layout/Header";
import blogInvestmentImage from "@/assets/blog-investment-plans-2026.webp";
import Footer from "@/components/layout/Footer";
import { Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    id: 30,
    slug: "ozempic-vs-mounjaro-weight-loss-2026",
    title: "Ozempic vs Mounjaro vs Wegovy 2026: Which Weight Loss Drug Actually Works? (Doctor-Reviewed Guide for US, UK, Canada & Australia)",
    excerpt: "Ozempic, Wegovy, Mounjaro, Zepbound — which GLP-1 weight loss medication is right for you in 2026? Compare cost, side effects, results, insurance coverage, and BMI eligibility for the US, UK, Canada & Australia.",
    category: "Health",
    date: "2026-04-28",
    readTime: "24 min read",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&h=630&fit=crop"
  },
  {
    id: 29,
    slug: "intermittent-fasting-weight-loss-guide-2026",
    title: "Intermittent Fasting for Weight Loss in 2026: The Complete Science-Backed Guide (16:8, OMAD & 5:2)",
    excerpt: "Lose 1-2 lbs per week with intermittent fasting in 2026. Doctor-reviewed guide to 16:8, OMAD, 5:2 schedules, what to eat, BMI tracking, and avoiding the biggest mistakes — for the US, UK, Canada & Australia.",
    category: "Health",
    date: "2026-04-26",
    readTime: "20 min read",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop"
  },
  {
    id: 28,
    slug: "best-investment-plans-india-2026",
    title: "Best Investment Plans in India 2026: SIP, FD, PPF, Mutual Funds — कहाँ लगाएं पैसा? (Complete Guide)",
    excerpt: "2026 में सबसे अच्छा Investment Plan कौन सा है? SIP, FD, PPF, Mutual Funds, Gold, NPS — सभी की तुलना, रिटर्न, और फ्री कैलकुलेटर। पैसा कहाँ लगाएं — पूरी जानकारी हिंदी में।",
    category: "Finance",
    date: "2026-04-13",
    readTime: "22 min read",
    image: blogInvestmentImage
  },
  {
    id: 27,
    slug: "optimize-product-images-etsy-ebay-amazon-2026",
    title: "How to Optimize Product Images for Etsy, eBay & Amazon: Free Guide to Boost Sales (2026)",
    excerpt: "Learn how to compress, crop, remove backgrounds, and resize product photos for Etsy, eBay, and Amazon listings — completely free. Increase clicks, rank higher, and sell more with optimized images.",
    category: "E-commerce",
    date: "2026-04-07",
    readTime: "20 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
  },
  {
    id: 26,
    slug: "sip-se-crorepati-kaise-bane-2026",
    title: "SIP से Crorepati कैसे बनें 2026 — ₹5000 Monthly SIP से करोड़पति बनने का पूरा प्लान",
    excerpt: "जानिए कैसे सिर्फ ₹5000 की Monthly SIP से आप 20-25 साल में करोड़पति बन सकते हैं। Nifty 50 रिटर्न, SIP Calculator, स्टेप-बाय-स्टेप गाइड हिंदी में।",
    category: "Finance",
    date: "2026-04-02",
    readTime: "18 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop"
  },
  {
    id: 25,
    slug: "edit-photos-like-pro-free-ai-tools-2026",
    title: "How to Edit Photos Like a Pro Without Photoshop: 10 Free AI Tools in 2026",
    excerpt: "Stop paying for Photoshop! Discover 10 incredible free AI-powered photo editing tools in 2026 — remove backgrounds, compress images, crop photos, add text & more. No skills needed, works on any device.",
    category: "AI Tools",
    date: "2026-03-10",
    readTime: "20 min read",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop"
  },
  {
    id: 24,
    slug: "how-to-convert-foreign-currency-online-free-2026",
    title: "How to Convert Foreign Currency Online for Free in 2026: Complete Guide (USD, EUR, INR, GBP)",
    excerpt: "Learn how to convert any foreign currency to your local currency online — for free! Step-by-step guide covering USD to INR, EUR to GBP, live exchange rates, and the best free currency converter tools in 2026.",
    category: "Finance",
    date: "2026-03-08",
    readTime: "16 min read",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&h=400&fit=crop"
  },
  {
    id: 23,
    slug: "crypto-converter-guide-bitcoin-ethereum-2026",
    title: "Free Crypto Converter: How to Convert Bitcoin, Ethereum & 20+ Coins to INR, USD in 2026",
    excerpt: "Complete guide to cryptocurrency conversion in 2026. Learn how to convert Bitcoin to INR, Ethereum to USD, check live crypto prices, understand market cap & 24h trends — all free with ToolsKit.tech Crypto Converter.",
    category: "Crypto",
    date: "2026-03-08",
    readTime: "18 min read",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop"
  },
  {
    id: 22,
    slug: "how-to-make-money-online-2026",
    title: "How to Make Money Online in 2026: 20 Proven Ways Without Investment (USA, UK, Australia)",
    excerpt: "Discover 20 legitimate ways to earn money online in 2026 — from freelancing to AI side hustles, passive income & remote jobs. Real methods used by millions in the US, UK & Australia. Start today with $0!",
    category: "Make Money Online",
    date: "2026-03-08",
    readTime: "25 min read",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop"
  },
  {
    id: 21,
    slug: "best-free-ai-tools-2026",
    title: "15 Best Free AI Tools in 2026 That Will Save You Hours Every Day (USA, UK, Australia)",
    excerpt: "Discover the most powerful free AI tools of 2026 — from AI website builders to image generators, writing assistants & productivity apps. Used by millions in the US, UK & Australia. No signup needed for most!",
    category: "AI Tools",
    date: "2026-03-07",
    readTime: "22 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
  },
  {
    id: 20,
    slug: "how-to-make-website-without-coding",
    title: "How to Make a Website Without Coding in 2026: Free Step-by-Step Guide (USA, UK, Australia)",
    excerpt: "Build a professional website without writing a single line of code! Complete 2026 guide using Lovable AI, WordPress & free tools. Includes 10+ proven ways to earn money from your website.",
    category: "Tech Guide",
    date: "2026-03-05",
    readTime: "20 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
  },
  {
    id: 19,
    slug: "how-to-make-passport-photo-at-home-usa",
    title: "How to Make a Passport Photo at Home (USA): Free DIY Guide 2026",
    excerpt: "Save $15+ by making your own US passport photo at home. Step-by-step guide with exact size requirements (2x2 inches), background removal, cropping, and free online tools — accepted by USPS & State Department.",
    category: "Image Tools",
    date: "2026-01-28",
    readTime: "18 min read",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=400&fit=crop"
  },
  {
    id: 1,
    slug: "how-to-compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality in 2026",
    excerpt: "Learn the best techniques to reduce image file size while maintaining visual quality. Updated guide for 2026.",
    category: "Image Tools",
    date: "2026-01-25",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    slug: "complete-guide-to-qr-codes",
    title: "Complete Guide to QR Codes: Creation, Usage & Best Practices",
    excerpt: "Everything you need to know about QR codes - from creating your first code to implementing them in marketing campaigns.",
    category: "QR Tools",
    date: "2026-01-22",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    slug: "remove-background-from-images-free",
    title: "How to Remove Background from Images for Free - Step by Step Guide",
    excerpt: "Discover the easiest ways to remove backgrounds from your photos without any design skills or expensive software.",
    category: "Image Tools",
    date: "2026-01-19",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    slug: "understanding-bmi-health-guide",
    title: "Understanding BMI: A Complete Health Guide for Everyone",
    excerpt: "Learn what BMI means, how to calculate it, and what your results indicate about your overall health and fitness.",
    category: "Health Tools",
    date: "2026-01-16",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    slug: "pdf-image-conversion-tips",
    title: "PDF to Image & Image to PDF: Tips for Perfect Conversions",
    excerpt: "Master the art of converting between PDF and image formats with our expert tips and tricks.",
    category: "PDF Tools",
    date: "2026-01-13",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=400&fit=crop"
  },
  {
    id: 6,
    slug: "color-theory-web-design",
    title: "Color Theory for Web Design: Picking Perfect Color Palettes",
    excerpt: "Understand color theory basics and learn how to choose color combinations that make your website stand out.",
    category: "Design Tools",
    date: "2026-01-10",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop"
  },
  {
    id: 8,
    slug: "best-image-tools-for-social-media",
    title: "Best Image Tools for Social Media: Create Stunning Posts in 2026",
    excerpt: "Master social media visuals with these free image tools. Learn to crop, compress, add text, and remove backgrounds for Instagram, Facebook, and more.",
    category: "Image Tools",
    date: "2026-01-07",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop"
  },
  {
    id: 9,
    slug: "essential-calculators-for-daily-life",
    title: "Essential Online Calculators for Daily Life: Complete Guide 2026",
    excerpt: "From BMI to age calculations, discover the most useful free online calculators that simplify your everyday tasks and health tracking.",
    category: "Calculator Tools",
    date: "2026-01-04",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
  },
  {
    id: 7,
    slug: "top-5-pdf-tools-for-students",
    title: "Top 5 PDF Tools for Students: Ultimate Guide for 2026",
    excerpt: "Discover the best free PDF tools every student needs. From converting PDFs to images to creating PDFs from photos - complete guide with rankings and tips.",
    category: "PDF Tools",
    date: "2026-01-01",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop"
  },
  {
    id: 18,
    slug: "reduce-image-size-kb-government-forms",
    title: "How to Reduce Image Size to 20KB, 50KB, 100KB for Government Forms (2026 Guide)",
    excerpt: "Step-by-step guide to reduce photo & signature size to exact KB for SSC, UPSC, Railway, Agniveer, Bank, and all government exam forms. Free online tool — no signup needed.",
    category: "Image Tools",
    date: "2025-12-29",
    readTime: "16 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop"
  },
  {
    id: 10,
    slug: "ssc-form-photo-size-compressor",
    title: "SSC Form Photo Size Compressor – SSC फॉर्म के लिए फोटो साइज कैसे कम करें (2026 गाइड)",
    excerpt: "SSC CGL, CHSL, MTS फॉर्म भरते समय फोटो साइज की समस्या? जानिए कैसे फ्री में फोटो को सही KB साइज में कंप्रेस करें बिना क्वालिटी खोए।",
    category: "Image Tools",
    date: "2025-12-26",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop"
  },
  {
    id: 17,
    slug: "best-free-online-tools-us-college-students",
    title: "Best Free Online Tools for US College Students & Job Seekers (2026)",
    excerpt: "Discover the top free online tools every American college student and job seeker needs in 2026 — from resume photo editors to PDF converters, GPA tools, and more.",
    category: "US Tools Guide",
    date: "2025-12-23",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
  },
  {
    id: 16,
    slug: "12th-ke-baad-kya-kare",
    title: "12th के बाद क्या करें? – Complete Career Guide After 12th (2026)",
    excerpt: "12th पास करने के बाद कौन सा कोर्स करें? Science, Commerce, Arts सभी स्ट्रीम के लिए बेस्ट करियर ऑप्शन्स, टॉप कोर्सेज, और फ्री ऑनलाइन टूल्स की पूरी जानकारी।",
    category: "Career Guide",
    date: "2025-12-20",
    readTime: "18 min read",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&h=400&fit=crop"
  },
  {
    id: 15,
    slug: "metric-vs-imperial-unit-conversion-guide-usa",
    title: "Metric vs. Imperial: The Ultimate Unit Conversion Guide for Moving to the USA (2026)",
    excerpt: "Moving to America? Master the US measurement system with this complete guide covering miles, Fahrenheit, pounds, gallons, and more — with easy conversion tips and free tools.",
    category: "Converter Tools",
    date: "2025-12-17",
    readTime: "16 min read",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop"
  },
  {
    id: 14,
    slug: "time-zone-converter-complete-guide",
    title: "Time Zone Converter: The Complete Guide to Converting Time Between Zones (2026)",
    excerpt: "Learn how to convert time between time zones accurately. Complete guide covering IST to EST, GMT to PST, DST handling, and tips for international scheduling.",
    category: "Converter Tools",
    date: "2025-12-14",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=400&fit=crop"
  },
  {
    id: 13,
    slug: "resizing-documents-uk-visa-applications",
    title: "Resizing Documents for UK Visa Applications: Step-by-Step Guide (2026)",
    excerpt: "Learn how to resize your photos, documents, and supporting files to meet UK visa application requirements. Complete step-by-step guide for all UK visa types.",
    category: "Image Tools",
    date: "2025-12-11",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=600&h=400&fit=crop"
  },
  {
    id: 12,
    slug: "resizing-identity-documents-australian-rental-applications",
    title: "Resizing Identity Documents for Australian Rental Applications (1Form/2Apply Guide)",
    excerpt: "Learn how to resize your identity documents like passport, driver's licence, and bank statements to meet 1Form and 2Apply upload requirements for Australian rental applications.",
    category: "Image Tools",
    date: "2025-12-08",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
  },
  {
    id: 11,
    slug: "army-agniveer-photo-signature-size",
    title: "Army Agniveer Recruitment 2026: Photo और Signature का Size कैसे कम करें?",
    excerpt: "Army Agniveer भर्ती 2026 का फॉर्म भर रहे हैं? जानिए Photo और Signature को सही KB साइज में कैसे कम करें – स्टेप बाय स्टेप गाइड हिंदी में।",
    category: "Image Tools",
    date: "2025-12-05",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?w=600&h=400&fit=crop"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            ToolsKit Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tips, tutorials, and guides to help you get the most out of our free online tools. 
            Learn new techniques and stay updated with the latest features.
          </p>
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden glass-card border-border/50 hover:shadow-xl transition-shadow">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-video md:aspect-auto">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title}
                width={1200}
                height={630}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-4">
                <Tag className="w-3 h-3 mr-1" />
                {blogPosts[0].category}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-primary transition-colors">
                <Link to="/blog/$slug" params={{ slug: blogPosts[0].slug }}>
                  {blogPosts[0].title}
                </Link>
              </h2>
              <p className="text-muted-foreground mb-4">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(blogPosts[0].date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {blogPosts[0].readTime}
                </span>
              </div>
              <Link 
                to="/blog/$slug"
                params={{ slug: blogPosts[0].slug }}
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                Read Article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Card>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden glass-card border-border/50 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="aspect-video">
                <img 
                  src={post.image} 
                  alt={post.title}
                  width={1200}
                  height={630}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit mb-2">
                  <Tag className="w-3 h-3 mr-1" />
                  {post.category}
                </Badge>
                <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    {post.title}
                  </Link>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-border/50">
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            New tools and tutorials coming soon! Bookmark this page to stay updated.
          </p>
          <Link 
            to="/tools" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Explore All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
