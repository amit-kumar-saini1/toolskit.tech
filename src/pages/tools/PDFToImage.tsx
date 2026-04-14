import { useState } from "react";
import { FileText, Upload, Download, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToolLayout from "@/components/tools/ToolLayout";
import { AdDownloadModal } from "@/components/AdDownloadModal";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";
import { version } from "pdfjs-dist";

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`;

const PDFToImage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfName, setPdfName] = useState<string>("");
  const [baseFileName, setBaseFileName] = useState("page");
  const [showAdModal, setShowAdModal] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<{ type: "single"; index: number } | { type: "all" } | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") {
      toast.error("Please upload a valid PDF file");
      return;
    }

    setIsProcessing(true);
    setPdfName(file.name);
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
    setBaseFileName(nameWithoutExt + "-page");
    setImages([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const extractedImages: string[] = [];

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const scale = 2;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
          canvas,
        } as any).promise;

        extractedImages.push(canvas.toDataURL("image/png"));
      }

      setImages(extractedImages);
      toast.success(`Converted ${totalPages} page(s) to images!`);
    } catch (error) {
      console.error("PDF processing error:", error);
      toast.error("Failed to process PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement("a");
    const finalName = baseFileName.trim() || "page";
    link.download = `${finalName}-${index + 1}.png`;
    link.href = imageUrl;
    link.click();
    toast.success(`Page ${index + 1} downloaded!`);
  };

  const downloadAll = () => {
    images.forEach((img, index) => {
      setTimeout(() => {
        downloadImage(img, index);
      }, index * 500);
    });
  };

  const openDownloadModal = (type: "single" | "all", index?: number) => {
    if (type === "single" && index !== undefined) {
      setPendingDownload({ type: "single", index });
    } else {
      setPendingDownload({ type: "all" });
    }
    setShowAdModal(true);
  };

  const handleModalDownload = () => {
    if (!pendingDownload) return;
    if (pendingDownload.type === "single") {
      downloadImage(images[pendingDownload.index], pendingDownload.index);
    } else {
      downloadAll();
    }
  };

  const handleReset = () => {
    setImages([]);
    setPdfName("");
    setBaseFileName("page");
    setShowAdModal(false);
    setPendingDownload(null);
  };

  return (
    <ToolLayout
      title="PDF to Image"
      description="Convert PDF pages to high-quality images"
      icon={FileText}
      toolSlug="pdf-to-image"
    >
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
                <span className="text-sm text-muted-foreground mt-1">Supports PDF files</span>
              </>
            )}
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              disabled={isProcessing}
            />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{pdfName}</h3>
                <p className="text-sm text-muted-foreground">{images.length} page(s) converted</p>
              </div>
              <div className="flex gap-2">
                <Button variant="gradient" onClick={() => openDownloadModal("all")}>
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>

            {/* Filename Input */}
            <div className="space-y-2">
              <Label htmlFor="pdf-image-filename">Base File Name</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="pdf-image-filename"
                  type="text"
                  value={baseFileName}
                  onChange={(e) => setBaseFileName(e.target.value)}
                  placeholder="Enter base file name"
                  className="flex-1"
                />
                <span className="text-muted-foreground">-1.png, -2.png...</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div key={index} className="group relative">
                  <img
                    src={img}
                    alt={`Page ${index + 1}`}
                    className="w-full rounded-xl border border-border"
                  />
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <Button
                      variant="gradient"
                      size="sm"
                      onClick={() => openDownloadModal("single", index)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Page {index + 1}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <AdDownloadModal
              isOpen={showAdModal}
              onClose={() => setShowAdModal(false)}
              onDownload={handleModalDownload}
              fileName={pendingDownload?.type === "single" 
                ? `${baseFileName.trim() || "page"}-${(pendingDownload as { type: "single"; index: number }).index + 1}.png`
                : `${baseFileName.trim() || "page"}-all.zip`
              }
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PDFToImage;
