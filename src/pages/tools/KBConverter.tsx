import { useState, useRef, useCallback, useEffect } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { FileDown, Upload, Download, RotateCcw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { AdDownloadModal } from "@/components/AdDownloadModal";
import ImageCompressorWorker from "@/workers/imageCompressor.worker?worker";

const KBConverter = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [targetSize, setTargetSize] = useState<number>(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [progressText, setProgressText] = useState<string>("");
  const [fileName, setFileName] = useState("converted-image");
  const [showAdModal, setShowAdModal] = useState(false);
  const originalFileRef = useRef<File | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const { toast } = useToast();

  // Initialize worker
  useEffect(() => {
    workerRef.current = new ImageCompressorWorker();
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      const url = URL.createObjectURL(file);
      setOriginalImage(url);
      setConvertedImage(null);
      setConvertedSize(0);
      setProgress(0);
    }
  };

  const convertToTargetSize = useCallback(async () => {
    if (!originalImage || !workerRef.current) return;

    setIsProcessing(true);
    setProgress(0);
    setProgressText("Preparing image...");

    try {
      // Create ImageBitmap from the file (transferable to worker)
      const response = await fetch(originalImage);
      const blob = await response.blob();
      const imageBitmap = await createImageBitmap(blob);

      const targetBytes = targetSize * 1024;

      // Set up worker message handler
      const worker = workerRef.current;
      
      const handleMessage = (e: MessageEvent) => {
        const { type } = e.data;
        
        if (type === 'progress') {
          setProgress(e.data.percent);
          setProgressText(e.data.status);
        } else if (type === 'result') {
          const resultBlob: Blob = e.data.blob;
          const url = URL.createObjectURL(resultBlob);
          setConvertedImage(url);
          setConvertedSize(resultBlob.size);
          setIsProcessing(false);
          setProgress(100);
          setProgressText("");
          toast({
            title: "Conversion Complete!",
            description: `Reduced from ${formatSize(originalSize)} to ${formatSize(resultBlob.size)}`,
          });
          worker.removeEventListener('message', handleMessage);
        } else if (type === 'error') {
          toast({
            title: "Error",
            description: e.data.message || "Failed to convert image",
            variant: "destructive",
          });
          setIsProcessing(false);
          setProgress(0);
          setProgressText("");
          worker.removeEventListener('message', handleMessage);
        }
      };

      worker.addEventListener('message', handleMessage);

      // Send ImageBitmap to worker (transferable object — zero-copy)
      worker.postMessage(
        { type: 'compress', imageBitmap, targetBytes },
        [imageBitmap] // Transfer ownership
      );

    } catch {
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
      setProgress(0);
      setProgressText("");
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
    setProgress(0);
    setProgressText("");
    originalFileRef.current = null;
  };

  return (
    <ToolLayout
      title="KB Converter"
      description="Reduce image size to specific KB without losing quality"
      icon={FileDown}
      toolSlug="kb-converter"
    >
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

          {/* Progress Bar */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{progressText}</span>
                <span className="text-primary font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

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
                    Processing...
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
            <Button variant="outline" onClick={handleReset} disabled={isProcessing}>
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
