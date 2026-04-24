import { useState, useRef, useEffect } from "react";
import { Type, Upload, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ToolLayout from "@/components/tools/ToolLayout";
import { toast } from "sonner";
import { AdDownloadModal } from "@/components/AdDownloadModal";

const TextOnPhoto = () => {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("Your Text Here");
  const [fontSize, setFontSize] = useState([48]);
  const [textColor, setTextColor] = useState("#ffffff");
  const [textX, setTextX] = useState([50]);
  const [textY, setTextY] = useState([50]);
  const [fileName, setFileName] = useState("text-on-photo");
  const [showAdModal, setShowAdModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setFileName(nameWithoutExt + "-text");
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          imageRef.current = img;
          setImage(e.target?.result as string);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const drawCanvas = () => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imageRef.current;
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    ctx.font = `bold ${fontSize[0]}px Arial`;
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Add text shadow for better visibility
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    const x = (textX[0] / 100) * img.width;
    const y = (textY[0] / 100) * img.height;

    ctx.fillText(text, x, y);
  };

  // Redraw canvas whenever image or settings change
  useEffect(() => {
    if (image) {
      drawCanvas();
    }
  }, [image, text, fontSize, textColor, textX, textY]);
  const handleDownloadClick = () => {
    if (!canvasRef.current) return;
    setShowAdModal(true);
  };

  const handleActualDownload = () => {
    if (!canvasRef.current) return;
    drawCanvas();
    
    const link = document.createElement("a");
    const finalName = fileName.trim() || "text-on-photo";
    link.download = `${finalName}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    toast.success("Image downloaded!");
  };

  const handleReset = () => {
    setImage(null);
    setText("Your Text Here");
    setFontSize([48]);
    setTextColor("#ffffff");
    setTextX([50]);
    setTextY([50]);
    setFileName("text-on-photo");
  };


  return (
    <ToolLayout
      title="Text on Photo"
      description="Add text watermark to images"
      icon={Type}
      toolSlug="text-on-photo"
    >
      {!image ? (
        <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
          <Upload className="w-12 h-12 text-muted-foreground mb-4" />
          <span className="text-muted-foreground">Click to upload image</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <canvas 
                ref={canvasRef} 
                className="w-full rounded-xl border border-border"
              />
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Text</Label>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your text"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>Font Size: {fontSize[0]}px</Label>
                <Slider
                  value={fontSize}
                  onValueChange={(v) => setFontSize(v)}
                  min={12}
                  max={120}
                  step={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Text Color</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <Input
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Horizontal Position: {textX[0]}%</Label>
                <Slider
                  value={textX}
                  onValueChange={(v) => setTextX(v)}
                  min={0}
                  max={100}
                />
              </div>

              <div className="space-y-2">
                <Label>Vertical Position: {textY[0]}%</Label>
                <Slider
                  value={textY}
                  onValueChange={(v) => setTextY(v)}
                  min={0}
                  max={100}
                />
              </div>
            </div>
          </div>

          {/* Filename Input */}
          <div className="space-y-2">
            <Label htmlFor="text-filename">File Name</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="text-filename"
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
            <Button variant="gradient" onClick={handleDownloadClick}>
              <Download className="w-4 h-4 mr-2" />
              Download Image
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      )}

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

export default TextOnPhoto;
