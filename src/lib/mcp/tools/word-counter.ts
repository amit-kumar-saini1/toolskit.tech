import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "word_counter",
  title: "Word Counter",
  description:
    "Count words, characters (with and without spaces), sentences, paragraphs, and estimated reading time for a block of text.",
  inputSchema: {
    text: z.string().min(1).describe("Text to analyze."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ text }) => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s+/g, "").length;
    const sentences = trimmed ? (trimmed.match(/[^.!?]+[.!?]+/g)?.length ?? 1) : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(Boolean).length : 0;
    const readingMinutes = Math.max(1, Math.round(words / 200));
    return {
      content: [{
        type: "text",
        text: `Words: ${words} | Characters: ${chars} (${charsNoSpaces} without spaces) | Sentences: ${sentences} | Paragraphs: ${paragraphs} | Reading time: ~${readingMinutes} min.`,
      }],
      structuredContent: { words, chars, charsNoSpaces, sentences, paragraphs, readingMinutes },
    };
  },
});