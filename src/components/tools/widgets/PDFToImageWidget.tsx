import { useState } from "react";
import { Upload, Download, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdDownloadModal } from "@/components/AdDownloadModal";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const PDFToImageWidget = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [baseFileName, setBaseFileName] = useState("page");
  const [showAdModal, setShowAdModal] = useState(false);
  const [pending, setPending] = useState<{ type: "single"; index: number } | { type: "all" } | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") return toast.error("Upload a PDF");
    setIsProcessing(true);
    setPdfName(file.name);
    setBaseFileName(file.name.replace(/\.[^/.]+$/, "") + "-page");
    setImages([]);
    try {
      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      const out: string[] = [];
      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
        out.push(canvas.toDataURL("image/png"));
      }
      setImages(out);
      toast.success(`Converted ${out.length} page(s)!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to process PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadOne = (url: string, i: number) => {
    const a = document.createElement("a");
    a.download = `${baseFileName.trim() || "page"}-${i + 1}.png`;
    a.href = url;
    a.click();
  };

  const onModalDownload = () => {
    if (!pending) return;
    if (pending.type === "single") downloadOne(images[pending.index], pending.index);
    else images.forEach((img, i) => setTimeout(() => downloadOne(img, i), i * 400));
  };

  return (
    <div className="space-y-6">
      {images.length === 0 ? (
        <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
          {isProcessing ? (
            <>
              <Loader2 className="w-12 h-12 text-primary mb-4 animate-spin" />
              <span className="text-muted-foreground">Processing PDF...</span>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-muted-foreground mb-4" />
              <span className="text-muted-foreground">Click to upload PDF</span>
            </>
          )}
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" disabled={isProcessing} />
        </label>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{pdfName}</h3>
              <p className="text-sm text-muted-foreground">{images.length} page(s)</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => { setPending({ type: "all" }); setShowAdModal(true); }}>
                <Download className="w-4 h-4 mr-2" /> Download All
              </Button>
              <Button variant="outline" onClick={() => setImages([])}>
                <X className="w-4 h-4 mr-2" /> Clear
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pi">Base File Name</Label>
            <div className="flex gap-2 items-center">
              <Input id="pi" value={baseFileName} onChange={(e) => setBaseFileName(e.target.value)} className="flex-1" />
              <span className="text-muted-foreground">-1.png ...</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <div key={i} className="group relative">
                <img src={img} alt={`Page ${i + 1}`} className="w-full rounded-xl border border-border" />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <Button size="sm" onClick={() => { setPending({ type: "single", index: i }); setShowAdModal(true); }}>
                    <Download className="w-4 h-4 mr-2" /> Page {i + 1}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <AdDownloadModal isOpen={showAdModal} onClose={() => setShowAdModal(false)} onDownload={onModalDownload} fileName={pending?.type === "single" ? `${baseFileName}-${pending.index + 1}.png` : `${baseFileName}-all.zip`} />
        </>
      )}
    </div>
  );
};

export default PDFToImageWidget;