import { useState, useRef, useCallback } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { FileDown, Upload, Download, RotateCcw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AdDownloadModal } from "@/components/AdDownloadModal";

const KBConverter = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [targetSize, setTargetSize] = useState<number>(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [fileName, setFileName] = useState("converted-image");
  const [showAdModal, setShowAdModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalFileRef = useRef<File | null>(null);
  const { toast } = useToast();

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Warn if file > 10MB
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 10MB for best performance.",
          variant: "destructive",
        });
        return;
      }
      originalFileRef.current = file;
      setOriginalSize(file.size);
      setFileName(file.name.replace(/\.[^/.]+$/, "") + "-reduced");

      // Use createObjectURL instead of readAsDataURL for large files — much faster
      const url = URL.createObjectURL(file);
      setOriginalImage(url);
      setConvertedImage(null);
      setConvertedSize(0);
    }
  };

  const convertToTargetSize = useCallback(async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    setProgress("Loading image...");

    try {
      const img = new Image();
      img.src = originalImage;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const targetBytes = targetSize * 1024;

      // Smart starting scale — bigger images need more reduction upfront
      const megapixels = (img.width * img.height) / 1_000_000;
      let startScale = megapixels > 8 ? 0.5 : megapixels > 4 ? 0.7 : 1.0;

      let resultBlob: Blob | null = null;

      // Binary search on quality first at a fixed scale — much faster than nested loops
      const tryQualityBinarySearch = async (scale: number): Promise<Blob | null> => {
        const w = Math.max(1, Math.floor(img.width * scale));
        const h = Math.max(1, Math.floor(img.height * scale));
        canvas.width = w;
        canvas.height = h;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        let lo = 0.1, hi = 0.95, bestBlob: Blob | null = null;

        for (let i = 0; i < 8; i++) {
          const mid = (lo + hi) / 2;
          const blob = await new Promise<Blob | null>((res) =>
            canvas.toBlob(res, "image/jpeg", mid)
          );
          if (!blob) break;

          if (blob.size <= targetBytes) {
            bestBlob = blob;
            lo = mid; // try higher quality
          } else {
            hi = mid; // reduce quality
          }
        }
        return bestBlob;
      };

      // Try scales from startScale down to 0.2
      const scales = [];
      for (let s = startScale; s >= 0.2; s -= 0.15) {
        scales.push(parseFloat(s.toFixed(2)));
      }
      if (!scales.includes(0.2)) scales.push(0.2);

      for (let i = 0; i < scales.length; i++) {
        const s = scales[i];
        setProgress(`Processing... (${Math.round((i / scales.length) * 100)}%)`);

        // Yield to browser so UI stays responsive
        await new Promise((r) => setTimeout(r, 0));

        const blob = await tryQualityBinarySearch(s);
        if (blob) {
          resultBlob = blob;
          break;
        }
      }

      // Last resort: 0.15 scale at lowest quality
      if (!resultBlob) {
        setProgress("Finalizing...");
        const w = Math.max(1, Math.floor(img.width * 0.15));
        const h = Math.max(1, Math.floor(img.height * 0.15));
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        resultBlob = await new Promise<Blob | null>((res) =>
          canvas.toBlob(res, "image/jpeg", 0.3)
        );
      }

      if (resultBlob) {
        const url = URL.createObjectURL(resultBlob);
        setConvertedImage(url);
        setConvertedSize(resultBlob.size);
        toast({
          title: "Conversion Complete!",
          description: `Reduced from ${formatSize(originalSize)} to ${formatSize(resultBlob.size)}`,
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to convert image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress("");
    }
  }, [originalImage, targetSize, originalSize, toast]);

  const handleDownloadClick = () => {
    if (convertedImage) setShowAdModal(true);
  };

  const handleActualDownload = () => {
    if (convertedImage) {
      const a = document.createElement("a");
      a.href = convertedImage;
      a.download = `${fileName}.jpg`;
      a.click();
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setConvertedImage(null);
    setOriginalSize(0);
    setConvertedSize(0);
    setTargetSize(100);
    setFileName("converted-image");
    setProgress("");
    originalFileRef.current = null;
  };

  return (
    <ToolLayout
      title="KB Converter"
      description="Reduce image size to specific KB without losing quality"
      icon={FileDown}
      toolSlug="kb-converter"
    >
      <canvas ref={canvasRef} className="hidden" />

      {!originalImage ? (
        <div className="border-2 border-dashed border-border rounded-xl p-12 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">Upload an Image</p>
          <p className="text-sm text-muted-foreground mb-4">
            Supports JPG, PNG, WebP • Max 10MB
          </p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="max-w-xs mx-auto"
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Size Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground">Original Size</p>
              <p className="text-2xl font-bold text-foreground">{formatSize(originalSize)}</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground">Converted Size</p>
              <p className="text-2xl font-bold text-primary">
                {convertedSize ? formatSize(convertedSize) : "—"}
              </p>
            </div>
          </div>

          {/* Target Size Input */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Target Size (KB)
            </Label>
            <Input
              type="number"
              value={targetSize}
              onChange={(e) => setTargetSize(Number(e.target.value))}
              min={10}
              max={5000}
              className="max-w-[200px]"
            />
            <p className="text-xs text-muted-foreground">
              Enter your desired file size in KB (minimum 10 KB)
            </p>
          </div>

          {/* Image Preview */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Original</p>
              <img
                src={originalImage}
                alt="Original"
                className="w-full rounded-lg border border-border"
                loading="lazy"
              />
            </div>
            {convertedImage && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Converted</p>
                <img
                  src={convertedImage}
                  alt="Converted"
                  className="w-full rounded-lg border border-border"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* Filename Input */}
          {convertedImage && (
            <div className="space-y-2">
              <Label>File Name</Label>
              <Input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {!convertedImage ? (
              <Button
                onClick={convertToTargetSize}
                className="flex-1"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                    {progress || "Converting..."}
                  </>
                ) : (
                  <>
                    <FileDown className="w-4 h-4 mr-2" />
                    Convert to {targetSize} KB
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={handleDownloadClick} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      )}

      <AdDownloadModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onDownload={handleActualDownload}
        fileName={`${fileName}.jpg`}
      />
    </ToolLayout>
  );
};

export default KBConverter;
