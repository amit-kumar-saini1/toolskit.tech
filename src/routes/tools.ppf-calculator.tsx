import { createFileRoute } from "@tanstack/react-router";
import ToolLayout from "@/components/tools/ToolLayout";
import { Wrench } from "lucide-react";
import { seoMeta, seoLinks } from "@/components/SEO";
import { toolsSEO } from "@/lib/seoData";

const SLUG = "ppf-calculator";
const seo = toolsSEO[SLUG];

export const Route = createFileRoute("/tools/ppf-calculator")({
  head: () => ({
    meta: seoMeta({
      title: seo?.title || "ppf-calculator",
      description: seo?.description || "Free online ppf-calculator tool",
      keywords: seo?.keywords,
      canonicalUrl: `/tools/${SLUG}`,
    }),
    links: seoLinks(`/tools/${SLUG}`),
  }),
  component: ToolPage,
});

function ToolPage() {
  return (
    <ToolLayout title="ppf-calculator" description="Coming soon" icon={Wrench} toolSlug={SLUG}>
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          This tool is being migrated. Full functionality coming in the next update.
        </p>
      </div>
    </ToolLayout>
  );
}
