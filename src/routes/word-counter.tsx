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
          <p>
            Unlike desktop word processors that bury the word count behind a menu, this online word counter shows every metric on one screen and updates the moment you stop typing. There's no install, no signup, and no upload — paste a paragraph or a 50,000-word manuscript and the numbers appear instantly. Because all processing happens locally in your browser using plain JavaScript, your text never touches our servers, which makes it safe for confidential client work, unpublished fiction, legal drafts, and academic submissions.
          </p>

          <h2>Why Word Count Matters</h2>
          <ul>
            <li><b>SEO content:</b> Blog posts of 1,500–2,500 words tend to rank better on Google.</li>
            <li><b>Social media:</b> Twitter/X limits posts to 280 characters; Instagram captions to 2,200.</li>
            <li><b>Academic essays:</b> Most assignments specify a strict word range.</li>
            <li><b>Meta descriptions:</b> Should stay under 160 characters to display fully in search results.</li>
          </ul>
          <p>
            Word count is more than vanity metric — it's a proxy for depth, scannability, and platform fit. Search engines reward comprehensive content because it tends to satisfy more user intents in a single visit, which lowers pogo-sticking back to the SERP. Social platforms, on the other hand, reward brevity: a tight 120-character tweet outperforms a 280-character one, and a 90-word LinkedIn hook beats a 300-word wall of text. Knowing where you stand against the ideal range for your channel is the difference between content that gets read and content that gets skimmed.
          </p>

          <h2>Common Word Count Targets</h2>
          <ul>
            <li><b>Tweet / X post:</b> up to 280 characters (~50 words)</li>
            <li><b>SMS:</b> 160 characters per segment</li>
            <li><b>Instagram caption:</b> up to 2,200 characters, but engagement peaks around 138–150 characters</li>
            <li><b>Meta description:</b> 150–160 characters</li>
            <li><b>Title tag:</b> 50–60 characters</li>
            <li><b>LinkedIn post:</b> 1,300 characters max; 50–100 words performs best</li>
            <li><b>Email subject line:</b> 30–50 characters for mobile inboxes</li>
            <li><b>Short blog post:</b> 500–800 words</li>
            <li><b>SEO blog post:</b> 1,500–2,500 words</li>
            <li><b>Pillar / cornerstone article:</b> 3,000–5,000 words</li>
            <li><b>College essay:</b> 500 words (Common App)</li>
            <li><b>Master's dissertation:</b> 15,000–20,000 words</li>
            <li><b>PhD thesis:</b> 70,000–100,000 words</li>
            <li><b>Novel:</b> 70,000–100,000 words; novella 17,500–40,000</li>
          </ul>

          <h2>How Reading Time Is Calculated</h2>
          <p>
            We use 200 words per minute for reading time (the average adult silent reading speed) and 130 words per minute for speaking time (the recommended public speaking pace). These match the defaults used by Medium and most blogging platforms.
          </p>
          <p>
            Reading speed varies by content type: technical or academic prose drops to 150–180 wpm, while light fiction climbs to 250–300 wpm. Speaking pace is even more sensitive — TED Talk speakers average 163 wpm, news anchors hit 150–170 wpm, and auctioneers can exceed 250 wpm. If you're writing a script, multiply your target duration (in minutes) by 130 to find your ideal word count. A five-minute conference talk should land around 650 words; a thirty-second radio ad lives in 70–80 words.
          </p>

          <h2>Word Counter for SEO Writers</h2>
          <p>
            Google does not have a hard minimum word count, but data from Backlinko, Ahrefs, and SEMrush consistently shows that pages ranking in the top three positions average between 1,400 and 2,000 words. Long-form content earns more backlinks, ranks for more long-tail keywords, and gives you more surface area to embed internal links, schema markup, and FAQs. Use this word counter alongside your editor to keep an eye on three numbers: total words (aim for 1,500+ on commercial pages), characters in your meta description (cap at 160), and characters in your title tag (cap at 60). If you publish in WordPress or Webflow, paste your draft here before hitting publish to catch overlong titles that would otherwise be truncated in search results.
          </p>

          <h2>Word Counter for Students</h2>
          <p>
            Most universities deduct marks for going more than 10% over or under the assigned word limit. Paste your draft into the counter to confirm you're inside the window before submitting through Turnitin or Moodle. If you're trimming an essay, focus on adverbs ("very", "really", "extremely"), throat-clearing phrases ("it is important to note that", "in order to"), and passive constructions — each rewrite typically shaves 8–15% without losing meaning. For dissertations, watch the per-chapter balance, not just the total; an introduction that swells past 12% of the word budget usually means the literature review is bleeding into it.
          </p>

          <h2>Word Counter for Authors & Copywriters</h2>
          <p>
            Professional novelists track daily word count the way runners track miles. Stephen King famously writes 2,000 words a day; NaNoWriMo participants average 1,667 to hit 50,000 in November. Copywriters use word count to price work — most freelancers charge per 100 or per 1,000 words. Keep this tab open while you draft so you can see momentum build, and use the character count to fit headlines into ad platforms like Google Ads (30 characters per headline, 90 per description) and Meta Ads (40 characters for primary text in feeds).
          </p>

          <h2>Tips for Writing Better, Tighter Content</h2>
          <ul>
            <li>Cut filler words like "very", "really", "just" and "actually".</li>
            <li>Aim for sentences under 20 words for better readability.</li>
            <li>Break long paragraphs — ideally 2–4 sentences each.</li>
            <li>Use active voice; it's shorter and stronger.</li>
            <li>Replace "in order to" with "to", "due to the fact that" with "because", and "at this point in time" with "now".</li>
            <li>Delete the first sentence of every paragraph — drafts usually warm up before the real point.</li>
            <li>Read your text aloud; anywhere you stumble is a sentence to shorten.</li>
            <li>Use the Hemingway test: if a sentence runs over two lines on your screen, split it.</li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <h3>Is there a word limit?</h3>
          <p>
            No. The word counter handles anything from a single tweet to a 200,000-word novel manuscript. Because counting runs in your browser, performance depends only on your device, not on our servers.
          </p>
          <h3>Does it work offline?</h3>
          <p>
            Yes — once the page has loaded once, you can disconnect from the internet and the word counter will keep working. Bookmark it for travel or for writing in places with patchy Wi-Fi.
          </p>
          <h3>Does it count hyphenated words as one or two?</h3>
          <p>
            Hyphenated words like "well-known" or "state-of-the-art" are counted as a single word, matching the default behaviour of Microsoft Word and Google Docs.
          </p>
          <h3>Can I count words in PDFs or Word documents?</h3>
          <p>
            Open the document in your usual app, select all (Ctrl/Cmd + A), copy, and paste into the box above. The counter will tally everything you pasted.
          </p>
          <h3>Is my text really private?</h3>
          <p>
            Yes. There is no server call when you type — the JavaScript on this page calculates every statistic locally. You can verify by opening DevTools, switching to the Network tab, and typing into the box; nothing is sent.
          </p>

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