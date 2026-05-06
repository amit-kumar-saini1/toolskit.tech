import { useState, useRef } from "react";
import { ImageMinus, Upload, Download, RotateCcw, Loader2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
];

const RemoveBackgroundWidget = () => {
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
    setFileName(file.name.replace(/\.[^/.]+$/, "") + "-no-bg");
    const reader = new FileReader();
    reader.onload = (ev) => {
      setOriginalImage(ev.target?.result as string);
      setProcessedImage(null);
      setProcessedBlob(null);
    };
    reader.readAsDataURL(file);
  };

  const processBackground = async () => {
    if (!originalFile) return;
    setIsProcessing(true);
    setProgress("Loading AI model... (first time may take 30-60s)");
    try {
      const img = await loadImage(originalFile);
      setProgress("Removing background...");
      const blob = await removeBackground(img);
      setProcessedBlob(blob);
      if (selectedColor !== "transparent") {
        const color = selectedColor === "custom" ? customColor : selectedColor;
        const colored = await applyBackgroundColor(blob, color);
        setProcessedImage(URL.createObjectURL(colored));
      } else {
        setProcessedImage(URL.createObjectURL(blob));
      }
      toast.success("Background removed!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to process");
    } finally {
      setProgress("");
      setIsProcessing(false);
    }
  };

  const applyNewBackground = async () => {
    if (!processedBlob) return;
    if (selectedColor === "transparent") {
      setProcessedImage(URL.createObjectURL(processedBlob));
    } else {
      const color = selectedColor === "custom" ? customColor : selectedColor;
      const colored = await applyBackgroundColor(processedBlob, color);
      setProcessedImage(URL.createObjectURL(colored));
    }
  };

  const handleDownload = async () => {
    if (!processedImage) return;
    const res = await fetch(processedImage);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.download = `${fileName.trim() || "removed-background"}.png`;
    a.href = URL.createObjectURL(blob);
    a.click();
  };

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalFile(null);
    setProcessedImage(null);
    setProcessedBlob(null);
    setSelectedColor("transparent");
    setFileName("removed-background");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      {!originalImage ? (
        <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
          <Upload className="w-12 h-12 text-muted-foreground mb-4" />
          <span className="text-muted-foreground">Click to upload image</span>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Original</h3>
              <img src={originalImage} alt="Original" className="w-full rounded-xl border border-border" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Processed</h3>
              {processedImage ? (
                <div
                  className="rounded-xl border border-border overflow-hidden"
                  style={{
                    background:
                      selectedColor === "transparent"
                        ? "repeating-conic-gradient(#80808033 0% 25%, transparent 0% 50%) 50% / 20px 20px"
                        : selectedColor === "custom"
                        ? customColor
                        : selectedColor,
                  }}
                >
                  <img src={processedImage} alt="Processed" className="w-full" />
                </div>
              ) : (
                <div className="w-full h-64 rounded-xl border border-border bg-muted/50 flex items-center justify-center">
                  {isProcessing ? (
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
                      <span className="text-muted-foreground text-sm">{progress}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Click "Remove Background"</span>
                  )}
                </div>
              )}
            </div>
          </div>
          {processedBlob && (
            <div className="bg-muted/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                <h4 className="font-medium">Background Color</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setSelectedColor(c.value)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${selectedColor === c.value ? "border-primary scale-110" : "border-border hover:border-primary/50"}`}
                    style={{
                      background:
                        c.value === "transparent"
                          ? "repeating-conic-gradient(#80808033 0% 25%, transparent 0% 50%) 50% / 10px 10px"
                          : c.value,
                    }}
                    title={c.name}
                  />
                ))}
                <Input type="color" value={customColor} onChange={(e) => { setCustomColor(e.target.value); setSelectedColor("custom"); }} className="w-12 h-10 p-1" />
              </div>
              <Button variant="outline" size="sm" onClick={applyNewBackground}>Apply Color</Button>
            </div>
          )}
          {processedImage && (
            <div className="space-y-2">
              <Label htmlFor="rf">File Name</Label>
              <div className="flex gap-2 items-center">
                <Input id="rf" value={fileName} onChange={(e) => setFileName(e.target.value)} className="flex-1" />
                <span className="text-muted-foreground">.png</span>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            {!processedImage && !isProcessing && (
              <Button onClick={processBackground}>
                <ImageMinus className="w-4 h-4 mr-2" /> Remove Background
              </Button>
            )}
            {isProcessing && (
              <Button disabled>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
              </Button>
            )}
            {processedImage && (
              <Button onClick={() => setShowAdModal(true)}>
                <Download className="w-4 h-4 mr-2" /> Download PNG
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

export default RemoveBackgroundWidget;