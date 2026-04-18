import { createFileRoute } from "@tanstack/react-router";
import ToolLayout from "@/components/tools/ToolLayout";
import { Wrench } from "lucide-react";
import { seoMeta, seoLinks } from "@/components/SEO";
import { toolsSEO } from "@/lib/seoData";

const SLUG = "image-compressor";
const seo = toolsSEO[SLUG];

export const Route = createFileRoute("/tools/image-compressor")({
  head: () => ({
    meta: seoMeta({
      title: seo?.title || "image-compressor",
      description: seo?.description || "Free online image-compressor tool",
      keywords: seo?.keywords,
      canonicalUrl: `/tools/${SLUG}`,
    }),
    links: seoLinks(`/tools/${SLUG}`),
  }),
  component: ToolPage,
});

function ToolPage() {
  return (
    <ToolLayout title="image-compressor" description="Coming soon" icon={Wrench} toolSlug={SLUG}>
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          This tool is being migrated. Full functionality coming in the next update.
        </p>
      </div>
    </ToolLayout>
  );
}
