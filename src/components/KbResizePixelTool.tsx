import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, RotateCcw, Wand2 } from "lucide-react";

interface Preset {
  label: string;
  width: number;
  height: number;
  kb: number;
}

const PRESETS: Preset[] = [
  { label: "US Passport (600×600, 240KB)", width: 600, height: 600, kb: 240 },
  { label: "USCIS Green Card (600×600, 240KB)", width: 600, height: 600, kb: 240 },
  { label: "DMV ID (1200×900, 1024KB)", width: 1200, height: 900, kb: 1024 },
  { label: "SAT / College Board (640×480, 200KB)", width: 640, height: 480, kb: 200 },
  { label: "LinkedIn (400×400, 100KB)", width: 400, height: 400, kb: 100 },
  { label: "SAVE / E-Verify (300×300, 50KB)", width: 300, height: 300, kb: 50 },
];

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const KbResizePixelTool = () => {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  const [targetKb, setTargetKb] = useState(240);
  const [fileName, setFileName] = useState("resized-image");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<File | null>(null);
  const { toast } = useToast();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 15 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 15 MB", variant: "destructive" });
      return;
    }
    fileRef.current = f;
    setOriginalSize(f.size);
    setOriginalUrl(URL.createObjectURL(f));
    setResultUrl(null);
    setResultSize(0);
    setFileName(f.name.replace(/\.[^/.]+$/, "") + "-resized");
  };

  const applyPreset = (p: Preset) => {
    setWidth(p.width);
    setHeight(p.height);
    setTargetKb(p.kb);
  };

  const process = useCallback(async () => {
    if (!fileRef.current) return;
    setBusy(true);
    setProgress(5);
    try {
      const bitmap = await createImageBitmap(fileRef.current);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unsupported");
      // cover-fit crop to target dimensions
      const scale = Math.max(width / bitmap.width, height / bitmap.height);
      const sw = width / scale;
      const sh = height / scale;
      const sx = (bitmap.width - sw) / 2;
      const sy = (bitmap.height - sh) / 2;
      ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, width, height);
      setProgress(35);

      const targetBytes = targetKb * 1024;
      let lo = 0.3,
        hi = 0.95,
        bestBlob: Blob | null = null;

      const toBlob = (q: number): Promise<Blob> =>
        new Promise((resolve, reject) =>
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error("blob failed"))),
            "image/jpeg",
            q
          )
        );

      // bisection
      for (let i = 0; i < 8; i++) {
        const q = (lo + hi) / 2;
        // eslint-disable-next-line no-await-in-loop
        const b = await toBlob(q);
        setProgress(35 + i * 7);
        if (b.size > targetBytes) {
          hi = q;
        } else {
          bestBlob = b;
          lo = q;
        }
      }
      if (!bestBlob) bestBlob = await toBlob(lo);

      setResultUrl(URL.createObjectURL(bestBlob));
      setResultSize(bestBlob.size);
      setProgress(100);
      toast({
        title: "Done",
        description: `${width}×${height} • ${formatSize(bestBlob.size)}`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  }, [width, height, targetKb, toast]);

  const reset = () => {
    fileRef.current = null;
    setOriginalUrl(null);
    setResultUrl(null);
    setOriginalSize(0);
    setResultSize(0);
    setProgress(0);
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${fileName}.jpg`;
    a.click();
  };

  return (
    <div className="space-y-5">
      {!originalUrl ? (
        <label className="block border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:bg-muted/30 transition">
          <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Upload an image</p>
          <p className="text-xs text-muted-foreground">JPG, PNG, WebP • up to 15 MB</p>
          <Input type="file" accept="image/*" onChange={onFile} className="hidden" />
        </label>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <Button
                key={p.label}
                size="sm"
                variant="outline"
                onClick={() => applyPreset(p)}
                type="button"
              >
                {p.label}
              </Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label>Width (px)</Label>
              <Input
                type="number"
                value={width}
                onChange={(e) => setWidth(Math.max(16, Number(e.target.value)))}
              />
            </div>
            <div className="space-y-1">
              <Label>Height (px)</Label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(Math.max(16, Number(e.target.value)))}
              />
            </div>
            <div className="space-y-1">
              <Label>Target size (KB)</Label>
              <Input
                type="number"
                value={targetKb}
                onChange={(e) => setTargetKb(Math.max(5, Number(e.target.value)))}
              />
            </div>
          </div>

          {busy && <Progress value={progress} className="h-2" />}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Original • {formatSize(originalSize)}
              </p>
              <img
                src={originalUrl}
                alt="Original upload"
                className="w-full rounded-lg border border-border"
              />
            </div>
            {resultUrl && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Resized • {width}×{height} • {formatSize(resultSize)}
                </p>
                <img
                  src={resultUrl}
                  alt="Resized result"
                  className="w-full rounded-lg border border-border"
                />
              </div>
            )}
          </div>

          {resultUrl && (
            <div className="space-y-1">
              <Label>File name</Label>
              <Input value={fileName} onChange={(e) => setFileName(e.target.value)} />
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {!resultUrl ? (
              <Button onClick={process} disabled={busy} className="flex-1">
                <Wand2 className="w-4 h-4 mr-2" />
                {busy ? "Processing…" : `Resize to ${width}×${height} • ${targetKb} KB`}
              </Button>
            ) : (
              <Button onClick={download} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download JPG
              </Button>
            )}
            <Button variant="outline" onClick={reset} disabled={busy}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default KbResizePixelTool;