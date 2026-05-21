import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const WordCounterWidget = lazy(
  () => import("@/components/tools/widgets/WordCounterWidget"),
);

export const Route = createFileRoute("/word-counter")({
  head: () => {
    const base = buildPageHead({
      title: "Word Counter — Free Online Word & Character Counter",
      description:
        "Free online word counter: instantly count words, characters, sentences, paragraphs and reading time. Perfect for essays, blogs, SEO and social media posts.",
      keywords:
        "word counter, character counter, word count tool, words per minute, online word counter, character count",
      path: "/word-counter",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How does the word counter work?", acceptedAnswer: { "@type": "Answer", text: "Just paste or type your text in the box. The tool counts words, characters (with and without spaces), sentences, paragraphs and estimates reading time in real time — fully in your browser, nothing is uploaded." } },
        { "@type": "Question", name: "Is the word counter free?", acceptedAnswer: { "@type": "Answer", text: "Yes. ToolsKit.tech word counter is 100% free, with no signup or limits on text length." } },
        { "@type": "Question", name: "How is reading time calculated?", acceptedAnswer: { "@type": "Answer", text: "Reading time uses an average reading speed of 200 words per minute. Speaking time uses 130 words per minute, the average public speaking pace." } },
        { "@type": "Question", name: "Is my text stored anywhere?", acceptedAnswer: { "@type": "Answer", text: "No. All counting happens locally in your browser. Your text is never sent to a server." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/word-counter"
      h1="Word Counter"
      subtitle="Instantly count words, characters, sentences and reading time — free, online, and 100% private."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <WordCounterWidget />
        </Suspense>
      }
      content={
        <>
          <h2>About the Word Counter</h2>
          <p>
            The ToolsKit.tech Word Counter is a free, real-time tool that counts <b>words, characters, sentences, paragraphs, reading time</b> and <b>speaking time</b> as you type. It's ideal for students writing essays, bloggers hitting an SEO word target, copywriters working with Twitter/X or Instagram character limits, and authors tracking daily output.
          </p>

          <h2>Why Word Count Matters</h2>
          <ul>
            <li><b>SEO content:</b> Blog posts of 1,500–2,500 words tend to rank better on Google.</li>
            <li><b>Social media:</b> Twitter/X limits posts to 280 characters; Instagram captions to 2,200.</li>
            <li><b>Academic essays:</b> Most assignments specify a strict word range.</li>
            <li><b>Meta descriptions:</b> Should stay under 160 characters to display fully in search results.</li>
          </ul>

          <h2>How Reading Time Is Calculated</h2>
          <p>
            We use 200 words per minute for reading time (the average adult silent reading speed) and 130 words per minute for speaking time (the recommended public speaking pace). These match the defaults used by Medium and most blogging platforms.
          </p>

          <h2>Tips for Writing Better, Tighter Content</h2>
          <ul>
            <li>Cut filler words like "very", "really", "just" and "actually".</li>
            <li>Aim for sentences under 20 words for better readability.</li>
            <li>Break long paragraphs — ideally 2–4 sentences each.</li>
            <li>Use active voice; it's shorter and stronger.</li>
          </ul>

          <p className="mt-6">
            More free tools you might like:
            <Link to="/qr-generator" className="text-primary underline mx-1">QR Generator</Link>,
            <Link to="/image-compressor" className="text-primary underline mx-1">Image Compressor</Link>,
            <Link to="/percentage-calculator" className="text-primary underline mx-1">Percentage Calculator</Link>.
          </p>
        </>
      }
    />
  );
}