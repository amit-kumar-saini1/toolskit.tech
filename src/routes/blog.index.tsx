import { createFileRoute, Link } from "@tanstack/react-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { seoMeta, seoLinks } from "@/components/SEO";
import blogInvestmentImage from "@/assets/blog-investment-plans-2026.jpg";

export const blogPosts = [
  {
    slug: "best-investment-plans-india-2026",
    title: "Best Investment Plans in India 2026: SIP, FD, PPF, Mutual Funds Guide",
    excerpt:
      "2026 mein sabse acha Investment Plan kaunsa hai? SIP, FD, PPF, Mutual Funds, Gold, NPS — sab ki tulna, returns aur free calculators.",
    category: "Finance",
    date: "2026-04-13",
    readTime: "22 min read",
    image: blogInvestmentImage,
  },
  {
    slug: "how-to-compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality in 2026",
    excerpt:
      "Learn the best techniques to reduce image file size while maintaining visual quality. Updated guide for 2026.",
    category: "Image Tools",
    date: "2026-01-25",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
  {
    slug: "complete-guide-to-qr-codes",
    title: "Complete Guide to QR Codes: Creation, Usage & Best Practices",
    excerpt:
      "Everything you need to know about QR codes - from creating your first code to implementing them in marketing campaigns.",
    category: "QR Tools",
    date: "2026-01-22",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&h=400&fit=crop",
  },
  {
    slug: "remove-background-from-images-free",
    title: "How to Remove Background from Images for Free - Step by Step Guide",
    excerpt:
      "Discover the easiest ways to remove backgrounds from your photos without any design skills or expensive software.",
    category: "Image Tools",
    date: "2026-01-19",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
  },
  {
    slug: "understanding-bmi-health-guide",
    title: "Understanding BMI: A Complete Health Guide for Everyone",
    excerpt:
      "Learn what BMI means, how to calculate it, and what your results indicate about your overall health.",
    category: "Health Tools",
    date: "2026-01-16",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
  },
  {
    slug: "color-theory-web-design",
    title: "Color Theory for Web Design: Picking Perfect Color Palettes",
    excerpt:
      "Understand color theory basics and learn how to choose color combinations that make your website stand out.",
    category: "Design Tools",
    date: "2026-01-10",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop",
  },
];

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: seoMeta({
      title: "Blog - ToolsKit.tech | Tutorials, Guides & Tips",
      description:
        "Read the latest tutorials, guides and tips on free online tools, image editing, PDF conversion, calculators and more.",
      canonicalUrl: "/blog",
    }),
    links: seoLinks("/blog"),
  }),
  component: Blog,
});

function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold gradient-text mb-2">ToolsKit Blog</h1>
          <p className="text-muted-foreground mb-8">
            Tutorials, guides and tips for using our free online tools
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }}>
                <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {post.category}
                    </Badge>
                    <h2 className="text-lg font-bold leading-tight line-clamp-2">{post.title}</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
