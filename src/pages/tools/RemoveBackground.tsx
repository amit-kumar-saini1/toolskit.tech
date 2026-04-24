import { useState, useRef } from "react";
import { ImageMinus, Upload, Download, RotateCcw, Loader2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToolLayout from "@/components/tools/ToolLayout";
import { toast } from "sonner";
import { removeBackground, loadImage, applyBackgroundColor } from "@/lib/removeBackground";
import { AdDownloadModal } from "@/components/AdDownloadModal";

const PRESET_COLORS = [
  { name: "Transparent", value: "transparent" },
  { name: "White", value: "#FFFFFF" },
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#EF4444" },
  { name: "Green", value: "#22C55E" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Purple", value: "#A855F7" },
  { name: "Pink", value: "#EC4899" },
  { name: "Orange", value: "#F97316" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Gray", value: "#6B7280" },
];

const RemoveBackground = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("transparent");
  const [customColor, setCustomColor] = useState("#FFFFFF");
  const [progress, setProgress] = useState("");
  const [fileName, setFileName] = useState("removed-background");
  const [showAdModal, setShowAdModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalFile(file);
    // Set default filename from uploaded file (without extension)
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
    setFileName(nameWithoutExt + "-no-bg");
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setProcessedImage(null);
      setProcessedBlob(null);
    };
    reader.readAsDataURL(file);
  };

  const processBackground = async () => {
    if (!originalFile) return;

    setIsProcessing(true);
    setProgress("Loading AI model... (first time may take 30-60 seconds)");
    
    try {
      const img = await loadImage(originalFile);
      setProgress("Removing background...");
      
      const resultBlob = await removeBackground(img);
      setProcessedBlob(resultBlob);
      
      // Apply background color if not transparent
      if (selectedColor !== "transparent") {
        const colorToApply = selectedColor === "custom" ? customColor : selectedColor;
        const coloredBlob = await applyBackgroundColor(resultBlob, colorToApply);
        setProcessedImage(URL.createObjectURL(coloredBlob));
      } else {
        setProcessedImage(URL.createObjectURL(resultBlob));
      }
      
      setProgress("");
      toast.success("Background removed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to process image. Please try again.");
      setProgress("");
    } finally {
      setIsProcessing(false);
    }
  };

  const applyNewBackground = async () => {
    if (!processedBlob) return;
    
    try {
      if (selectedColor === "transparent") {
        setProcessedImage(URL.createObjectURL(processedBlob));
      } else {
        const colorToApply = selectedColor === "custom" ? customColor : selectedColor;
        const coloredBlob = await applyBackgroundColor(processedBlob, colorToApply);
        setProcessedImage(URL.createObjectURL(coloredBlob));
      }
      toast.success("Background color applied!");
    } catch (error) {
      toast.error("Failed to apply background color");
    }
  };

  const handleDownloadClick = () => {
    if (processedImage) {
      setShowAdModal(true);
    }
  };

  const handleActualDownload = async () => {
    if (!processedImage) return;
    
    const response = await fetch(processedImage);
    const blob = await response.blob();
    const link = document.createElement("a");
    const finalName = fileName.trim() || "removed-background";
    link.download = `${finalName}.png`;
    link.href = URL.createObjectURL(blob);
    link.click();
    toast.success("Image downloaded!");
  };

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalFile(null);
    setProcessedImage(null);
    setProcessedBlob(null);
    setSelectedColor("transparent");
    setProgress("");
    setFileName("removed-background");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Remove Background"
      description="Remove image background using AI and add custom background colors"
      icon={ImageMinus}
      toolSlug="remove-background"
    >
      <div className="space-y-6">
        {!originalImage ? (
          <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
            <Upload className="w-12 h-12 text-muted-foreground mb-4" />
            <span className="text-muted-foreground">Click to upload image</span>
            <span className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, WebP</span>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
            />
          </label>
        ) : (
          <div className="space-y-6">
            {/* Image Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium">Original</h3>
                <img 
                  src={originalImage} 
                  alt="Original" 
                  className="w-full rounded-xl border border-border"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Processed</h3>
                {processedImage ? (
                  <div 
                    className="rounded-xl border border-border overflow-hidden" 
                    style={{ 
                      background: selectedColor === "transparent" 
                        ? "repeating-conic-gradient(#80808033 0% 25%, transparent 0% 50%) 50% / 20px 20px" 
                        : selectedColor === "custom" ? customColor : selectedColor
                    }}
                  >
                    <img 
                      src={processedImage} 
                      alt="Processed" 
                      className="w-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 rounded-xl border border-border bg-muted/50 flex items-center justify-center">
                    {isProcessing ? (
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
                        <span className="text-muted-foreground text-sm">{progress}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Click "Remove Background" to process</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Background Color Selection */}
            {processedBlob && (
              <div className="bg-muted/30 rounded-xl p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">Background Color</h4>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-10 h-10 rounded-lg border-2 transition-all ${
                        selectedColor === color.value 
                          ? "border-primary scale-110" 
                          : "border-border hover:border-primary/50"
                      }`}
                      style={{ 
                        background: color.value === "transparent" 
                          ? "repeating-conic-gradient(#80808033 0% 25%, transparent 0% 50%) 50% / 10px 10px"
                          : color.value 
                      }}
                      title={color.name}
                    />
                  ))}
                  
                  {/* Custom Color Picker */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedColor("custom")}
                      className={`w-10 h-10 rounded-lg border-2 transition-all ${
                        selectedColor === "custom" 
                          ? "border-primary scale-110" 
                          : "border-border hover:border-primary/50"
                      }`}
                      style={{ background: customColor }}
                      title="Custom Color"
                    />
                    <Input
                      type="color"
                      value={customColor}
                      onChange={(e) => {
                        setCustomColor(e.target.value);
                        setSelectedColor("custom");
                      }}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={applyNewBackground}
                >
                  Apply Background Color
                </Button>
              </div>
            )}

            {/* Filename Input */}
            {processedImage && (
              <div className="bg-muted/30 rounded-xl p-4 space-y-2">
                <Label htmlFor="filename">File Name</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="filename"
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="Enter file name"
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">.png</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              {!processedImage && !isProcessing && (
                <Button 
                  variant="gradient" 
                  onClick={processBackground}
                  disabled={isProcessing}
                >
                  <ImageMinus className="w-4 h-4 mr-2" />
                  Remove Background
                </Button>
              )}
              
              {isProcessing && (
                <Button variant="gradient" disabled>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </Button>
              )}
              
              {processedImage && (
                <Button variant="gradient" onClick={handleDownloadClick}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
              )}
              
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        )}

        <div className="bg-muted/50 rounded-xl p-4">
          <h4 className="font-medium mb-2">Features:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• AI-powered background removal using machine learning</li>
            <li>• Add custom background colors or keep transparent</li>
            <li>• First-time use downloads the AI model (~30-60 seconds)</li>
            <li>• Works best with clear subject in the image</li>
          </ul>
        </div>
      </div>

      {/* Ad Download Modal */}
      <AdDownloadModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onDownload={handleActualDownload}
        fileName={`${fileName}.png`}
      />
    </ToolLayout>
  );
};

export default RemoveBackground;
