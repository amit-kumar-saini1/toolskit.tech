import { useRef, useState } from "react";
import { Upload, Download, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { AdDownloadModal } from "@/components/AdDownloadModal";

/**
 * CompressTo50kbWidget — compress any JPG/PNG/WebP to a user-chosen target KB
 * (default 50 KB). Uses an iterative quality + dimension search entirely in
 * the browser. 100% private, no uploads.
 */
const CompressTo50kbWidget = () => {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [targetKb, setTargetKb] = useState(50);
  const [processing, setProcessing] = useState(false);
  const [fileName, setFileName] = useState("compressed-50kb");
  const [showAdModal, setShowAdModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatSize = (b: number) =>
    b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(2)} MB`;

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = src;
    });

  const toBlob = (canvas: HTMLCanvasElement, q: number): Promise<Blob> =>
    new Promise((res) => canvas.toBlob((b) => res(b!), "image/jpeg", q));

  const compress = async () => {
    if (!originalUrl) return;
    setProcessing(true);
    try {
      const img = await loadImage(originalUrl);
      const targetBytes = targetKb * 1024;
      let scale = 1;
      let best: Blob | null = null;
      // Try progressively smaller dimensions if quality alone can't hit target
      for (let pass = 0; pass < 6; pass++) {
        const w = Math.max(80, Math.round(img.width * scale));
        const h = Math.max(80, Math.round(img.height * scale));
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const ctx = c.getContext("2d")!;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, w, h);
        // Binary search quality
        let lo = 0.05, hi = 0.95;
        let candidate: Blob | null = null;
        for (let i = 0; i < 8; i++) {
          const q = (lo + hi) / 2;
          const blob = await toBlob(c, q);
          if (blob.size > targetBytes) hi = q;
          else {
            candidate = blob;
            lo = q;
          }
        }
        if (candidate && candidate.size <= targetBytes) {
          best = candidate;
          break;
        }
        // Lowest quality blob, if still too big, shrink
        const minBlob = await toBlob(c, 0.05);
        if (minBlob.size <= targetBytes) {
          best = minBlob;
          break;
        }
        scale *= 0.75;
      }
      if (!best) {
        toast.error("Couldn't reach target size — try a larger KB value.");
        return;
      }
      const url = URL.createObjectURL(best);
      setResultUrl(url);
      setResultSize(best.size);
      toast.success(`Compressed to ${(best.size / 1024).toFixed(1)} KB`);
    } catch (e) {
      console.error(e);
      toast.error("Compression failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setOriginalSize(f.size);
    setFileName(f.name.replace(/\.[^.]+$/, "") + `-${targetKb}kb`);
    const r = new FileReader();
    r.onload = (ev) => {
      setOriginalUrl(ev.target?.result as string);
      setResultUrl(null);
      setResultSize(0);
    };
    r.readAsDataURL(f);
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${fileName.trim() || "compressed"}.jpg`;
    a.click();
  };

  const handleReset = () => {
    setOriginalUrl(null);
    setResultUrl(null);
    setOriginalSize(0);
    setResultSize(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const savings = originalSize > 0 && resultSize > 0 ? Math.round((1 - resultSize / originalSize) * 100) : 0;

  return (
    <div className="space-y-6">
      {!originalUrl ? (
        <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
          <Upload className="w-12 h-12 text-muted-foreground mb-4" />
          <span className="text-muted-foreground">Click to upload a JPG, PNG or WebP image</span>
          <span className="text-xs text-muted-foreground mt-1">Processed locally — never uploaded</span>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Original — {formatSize(originalSize)}</h3>
              <img src={originalUrl} alt="Original image before compression" className="w-full rounded-xl border border-border" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm">
                Compressed {resultSize > 0 && `— ${formatSize(resultSize)}`}
              </h3>
              {resultUrl ? (
                <img src={resultUrl} alt={`Image compressed to ${targetKb} KB`} className="w-full rounded-xl border border-border" />
              ) : (
                <div className="w-full h-64 rounded-xl border border-border bg-muted/40 flex items-center justify-center text-sm text-muted-foreground">
                  {processing ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Compressing…</span>
                  ) : (
                    `Click "Compress to ${targetKb} KB" to start`
                  )}
                </div>
              )}
            </div>
          </div>

          {savings > 0 && (
            <div className="bg-primary/10 rounded-xl p-4 text-center">
              <span className="text-2xl font-bold text-primary">{savings}%</span>
              <p className="text-sm text-muted-foreground">file size reduced</p>
            </div>
          )}

          <div className="bg-muted/30 rounded-xl p-4 space-y-3">
            <Label>Target Size: {targetKb} KB</Label>
            <Slider value={[targetKb]} min={10} max={500} step={5} onValueChange={(v) => setTargetKb(v[0])} />
            <div className="flex flex-wrap gap-2 text-xs">
              {[20, 50, 100, 200, 300].map((kb) => (
                <button
                  key={kb}
                  onClick={() => setTargetKb(kb)}
                  className={`px-3 py-1 rounded-full border ${targetKb === kb ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}
                >
                  {kb} KB
                </button>
              ))}
            </div>
          </div>

          {resultUrl && (
            <div className="space-y-2">
              <Label htmlFor="cf-name">File Name</Label>
              <div className="flex gap-2 items-center">
                <Input id="cf-name" value={fileName} onChange={(e) => setFileName(e.target.value)} className="flex-1" />
                <span className="text-muted-foreground">.jpg</span>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button onClick={compress} disabled={processing}>
              {processing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Compressing…</> : <>Compress to {targetKb} KB</>}
            </Button>
            {resultUrl && (
              <Button onClick={() => setShowAdModal(true)}>
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
            )}
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>
        </>
      )}
      <AdDownloadModal isOpen={showAdModal} onClose={() => setShowAdModal(false)} onDownload={handleDownload} fileName={`${fileName}.jpg`} />
    </div>
  );
};

export default CompressTo50kbWidget;