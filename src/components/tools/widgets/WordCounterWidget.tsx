import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function WordCounterWidget() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed ? (trimmed.match(/[^.!?]+[.!?]+/g) || [trimmed]).length : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim()).length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    const speakingTime = Math.max(1, Math.ceil(words / 130));
    return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime, speakingTime };
  }, [text]);

  const items = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading time (min)", value: stats.readingTime },
    { label: "Speaking time (min)", value: stats.speakingTime },
  ];

  return (
    <div className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="min-h-[240px] text-base"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {items.map((it) => (
          <div key={it.label} className="bg-muted/50 border border-border rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-primary">{it.value.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">{it.label}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => navigator.clipboard.writeText(text)} disabled={!text}>
          Copy text
        </Button>
        <Button variant="outline" onClick={() => setText("")} disabled={!text}>
          Clear
        </Button>
      </div>
    </div>
  );
}