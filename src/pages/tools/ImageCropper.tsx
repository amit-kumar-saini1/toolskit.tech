import { useState, useRef, useCallback } from "react";
import { Crop, Upload, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToolLayout from "@/components/tools/ToolLayout";
import { AdDownloadModal } from "@/components/AdDownloadModal";
import { toast } from "sonner";

const ImageCropper = () => {
  const [image, setImage] = useState<string | null>(null);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [fileName, setFileName] = useState("cropped-image");
  const [showAdModal, setShowAdModal] = useState(false);
  const [pendingCropData, setPendingCropData] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setFileName(nameWithoutExt + "-cropped");
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setCropArea({ x: 50, y: 50, width: 200, height: 200 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, type: "drag" | "resize") => {
    e.preventDefault();
    if (type === "drag") {
      setIsDragging(true);
    } else {
      setIsResizing(true);
    }
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || (!isDragging && !isResizing)) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    if (isDragging) {
      setCropArea(prev => ({
        ...prev,
        x: Math.max(0, prev.x + deltaX),
        y: Math.max(0, prev.y + deltaY),
      }));
    } else if (isResizing) {
      setCropArea(prev => ({
        ...prev,
        width: Math.max(50, prev.width + deltaX),
        height: Math.max(50, prev.height + deltaY),
      }));
    }
    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isDragging, isResizing, dragStart]);

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const prepareCrop = () => {
    if (!imageRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imageRef.current;
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = cropArea.width * scaleX;
    canvas.height = cropArea.height * scaleY;

    ctx.drawImage(
      img,
      cropArea.x * scaleX,
      cropArea.y * scaleY,
      cropArea.width * scaleX,
      cropArea.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    setPendingCropData(canvas.toDataURL("image/png"));
    setShowAdModal(true);
  };

  const handleDownload = () => {
    if (!pendingCropData) return;
    const link = document.createElement("a");
    const finalName = fileName.trim() || "cropped-image";
    link.download = `${finalName}.png`;
    link.href = pendingCropData;
    link.click();
    toast.success("Image cropped and downloaded!");
  };

  const handleReset = () => {
    setImage(null);
    setCropArea({ x: 0, y: 0, width: 200, height: 200 });
    setFileName("cropped-image");
    setShowAdModal(false);
    setPendingCropData(null);
  };

  return (
    <ToolLayout
      title="Image Cropper"
      description="Crop and resize your images easily"
      icon={Crop}
      toolSlug="image-cropper"
    >
      {!image ? (
        <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
          <Upload className="w-12 h-12 text-muted-foreground mb-4" />
          <span className="text-muted-foreground">Click to upload image</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4">
          <div 
            ref={containerRef}
            className="relative inline-block max-w-full overflow-hidden bg-muted/50 rounded-xl"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img 
              ref={imageRef}
              src={image} 
              alt="To crop" 
              className="max-w-full h-auto"
              draggable={false}
            />
            {/* Crop overlay */}
            <div 
              className="absolute border-2 border-primary bg-primary/10 cursor-move"
              style={{
                left: cropArea.x,
                top: cropArea.y,
                width: cropArea.width,
                height: cropArea.height,
              }}
              onMouseDown={(e) => handleMouseDown(e, "drag")}
            >
              {/* Resize handle */}
              <div 
                className="absolute bottom-0 right-0 w-4 h-4 bg-primary cursor-se-resize"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleMouseDown(e, "resize");
                }}
              />
            </div>
          </div>

          {/* Filename Input */}
          <div className="space-y-2">
            <Label htmlFor="crop-filename">File Name</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="crop-filename"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
                className="flex-1"
              />
              <span className="text-muted-foreground">.png</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button variant="gradient" onClick={prepareCrop}>
              <Download className="w-4 h-4 mr-2" />
              Download Cropped
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <AdDownloadModal
            isOpen={showAdModal}
            onClose={() => setShowAdModal(false)}
            onDownload={handleDownload}
            fileName={`${fileName.trim() || "cropped-image"}.png`}
          />
        </div>
      )}
    </ToolLayout>
  );
};

export default ImageCropper;
