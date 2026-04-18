import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { seoMeta, seoLinks } from "@/components/SEO";
import { blogPosts } from "./blog.index";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? seoMeta({
          title: loaderData.post.title,
          description: loaderData.post.excerpt,
          canonicalUrl: `/blog/${loaderData.post.slug}`,
          ogType: "article",
          ogImage: typeof loaderData.post.image === "string" ? loaderData.post.image : undefined,
        })
      : [],
    links: loaderData ? seoLinks(`/blog/${loaderData.post.slug}`) : [],
  }),
  component: BlogPost,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </main>
      <Footer />
    </div>
  ),
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Link>
          </Button>

          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
          </div>

          <div className="aspect-video overflow-hidden rounded-2xl bg-muted mb-8">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="glass-card rounded-2xl p-8 prose prose-sm max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
            <p className="text-muted-foreground mt-6">
              Full article content coming soon. In the meantime, explore our{" "}
              <Link to="/tools" className="text-primary hover:underline">
                free online tools
              </Link>{" "}
              to put these tips into practice.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
