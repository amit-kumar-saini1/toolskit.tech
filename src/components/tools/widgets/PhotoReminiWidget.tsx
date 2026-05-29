import { useRef, useState } from "react";
import { Upload, Download, RotateCcw, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { AdDownloadModal } from "@/components/AdDownloadModal";

/**
 * Photo Remini — Free in-browser AI-style photo enhancer.
 * Uses high-quality canvas upscaling + unsharp mask + brightness/contrast/
 * saturation correction to dramatically improve old, blurry or low-res
 * photos without any upload. 100% private.
 */
const PhotoReminiWidget = () => {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [scale, setScale] = useState(2);
  const [sharpness, setSharpness] = useState(60);
  const [brightness, setBrightness] = useState(8);
  const [contrast, setContrast] = useState(15);
  const [saturation, setSaturation] = useState(20);
  const [fileName, setFileName] = useState("photo-enhanced");
  const [showAdModal, setShowAdModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name.replace(/\.[^.]+$/, "") + "-enhanced");
    const r = new FileReader();
    r.onload = (ev) => {
      setOriginalUrl(ev.target?.result as string);
      setResultUrl(null);
    };
    r.readAsDataURL(f);
  };

  const unsharpMask = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    amount: number,
  ) => {
    if (amount <= 0) return;
    const src = ctx.getImageData(0, 0, w, h);
    const out = ctx.createImageData(w, h);
    const s = src.data;
    const o = out.data;
    const a = amount / 100;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = (y * w + x) * 4;
        for (let c = 0; c < 3; c++) {
          const center = s[i + c];
          const neighbors =
            s[i - 4 + c] +
            s[i + 4 + c] +
            s[i - w * 4 + c] +
            s[i + w * 4 + c];
          const avg = neighbors / 4;
          const sharp = center + (center - avg) * a;
          o[i + c] = Math.max(0, Math.min(255, sharp));
        }
        o[i + 3] = s[i + 3];
      }
    }
    // copy edges
    for (let i = 0; i < s.length; i++) if (o[i] === 0 && s[i] !== 0 && i % 4 !== 3 === false) o[i] = s[i];
    ctx.putImageData(out, 0, 0);
  };

  const enhance = async () => {
    if (!originalUrl) return;
    setProcessing(true);
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = rej;
        img.src = originalUrl;
      });
      // cap final dimension to keep browser stable
      const maxDim = 4000;
      let s = scale;
      if (img.width * s > maxDim || img.height * s > maxDim) {
        s = Math.min(maxDim / img.width, maxDim / img.height);
      }
      const w = Math.round(img.width * s);
      const h = Math.round(img.height * s);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      // apply color filter for brightness/contrast/saturation
      ctx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%) saturate(${100 + saturation}%)`;
      ctx.drawImage(img, 0, 0, w, h);
      ctx.filter = "none";
      // unsharp mask for clarity
      unsharpMask(ctx, w, h, sharpness);
      const blob: Blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b!), "image/png", 1),
      );
      setResultUrl(URL.createObjectURL(blob));
      toast.success("Photo enhanced!");
    } catch (err) {
      console.error(err);
      toast.error("Could not enhance this image.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${fileName.trim() || "photo-enhanced"}.png`;
    a.click();
  };

  const handleReset = () => {
    setOriginalUrl(null);
    setResultUrl(null);
    setFileName("photo-enhanced");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      {!originalUrl ? (
        <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
          <Upload className="w-12 h-12 text-muted-foreground mb-4" />
          <span className="text-muted-foreground">Click to upload a blurry or old photo</span>
          <span className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP — processed locally</span>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Before</h3>
              <img src={originalUrl} alt="Original blurry photo" className="w-full rounded-xl border border-border" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm">After (HD Enhanced)</h3>
              {resultUrl ? (
                <img src={resultUrl} alt="AI-enhanced HD photo" className="w-full rounded-xl border border-border" />
              ) : (
                <div className="w-full h-64 rounded-xl border border-border bg-muted/40 flex items-center justify-center text-sm text-muted-foreground">
                  {processing ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Enhancing…</span>
                  ) : (
                    'Click "Enhance Photo" to start'
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-4 space-y-4">
            <div>
              <Label>Upscale: {scale}x</Label>
              <Slider value={[scale]} min={1} max={4} step={1} onValueChange={(v) => setScale(v[0])} />
            </div>
            <div>
              <Label>Sharpness / Clarity: {sharpness}</Label>
              <Slider value={[sharpness]} min={0} max={150} step={5} onValueChange={(v) => setSharpness(v[0])} />
            </div>
            <div>
              <Label>Brightness: +{brightness}%</Label>
              <Slider value={[brightness]} min={-30} max={50} step={1} onValueChange={(v) => setBrightness(v[0])} />
            </div>
            <div>
              <Label>Contrast: +{contrast}%</Label>
              <Slider value={[contrast]} min={-30} max={60} step={1} onValueChange={(v) => setContrast(v[0])} />
            </div>
            <div>
              <Label>Color Pop (Saturation): +{saturation}%</Label>
              <Slider value={[saturation]} min={-30} max={80} step={1} onValueChange={(v) => setSaturation(v[0])} />
            </div>
          </div>

          {resultUrl && (
            <div className="space-y-2">
              <Label htmlFor="pr-name">File Name</Label>
              <div className="flex gap-2 items-center">
                <Input id="pr-name" value={fileName} onChange={(e) => setFileName(e.target.value)} className="flex-1" />
                <span className="text-muted-foreground">.png</span>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button onClick={enhance} disabled={processing}>
              {processing ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enhancing…</>
              ) : (
                <><Sparkles className="w-4 h-4 mr-2" /> Enhance Photo</>
              )}
            </Button>
            {resultUrl && (
              <Button variant="default" onClick={() => setShowAdModal(true)}>
                <Download className="w-4 h-4 mr-2" /> Download HD
              </Button>
            )}
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>
        </>
      )}
      <AdDownloadModal isOpen={showAdModal} onClose={() => setShowAdModal(false)} onDownload={handleDownload} fileName={`${fileName}.png`} />
    </div>
  );
};

export default PhotoReminiWidget;