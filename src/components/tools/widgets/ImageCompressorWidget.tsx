import { useState } from "react";
import { Upload, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AdDownloadModal } from "@/components/AdDownloadModal";
import { toast } from "sonner";

const ImageCompressorWidget = () => {
  const [image, setImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [quality, setQuality] = useState([80]);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("compressed-image");
  const [showAdModal, setShowAdModal] = useState(false);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const compressImage = (imgSrc: string, qual: number) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const url = canvas.toDataURL("image/jpeg", qual / 100);
      setCompressedImage(url);
      const base64Length = url.length - "data:image/jpeg;base64,".length;
      setCompressedSize(Math.ceil((base64Length * 3) / 4));
    };
    img.src = imgSrc;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalSize(file.size);
    setFileName(file.name.replace(/\.[^/.]+$/, "") + "-compressed");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImage(result);
      compressImage(result, quality[0]);
    };
    reader.readAsDataURL(file);
  };

  const handleQualityChange = (v: number[]) => {
    setQuality(v);
    if (image) compressImage(image, v[0]);
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    const link = document.createElement("a");
    link.download = `${fileName.trim() || "compressed-image"}.jpg`;
    link.href = compressedImage;
    link.click();
    toast.success("Downloaded!");
  };

  const handleReset = () => {
    setImage(null);
    setCompressedImage(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setQuality([80]);
    setFileName("compressed-image");
  };

  const savings = originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0;

  return !image ? (
    <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
      <Upload className="w-12 h-12 text-muted-foreground mb-4" />
      <span className="text-muted-foreground">Click to upload image</span>
      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </label>
  ) : (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="font-medium">Original</h3>
          <img src={image} alt="Original" className="w-full rounded-xl" />
          <p className="text-sm text-muted-foreground">Size: {formatSize(originalSize)}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">Compressed</h3>
          {compressedImage && (
            <>
              <img src={compressedImage} alt="Compressed" className="w-full rounded-xl" />
              <p className="text-sm text-muted-foreground">Size: {formatSize(compressedSize)}</p>
            </>
          )}
        </div>
      </div>
      {savings > 0 && (
        <div className="bg-primary/10 rounded-xl p-4 text-center">
          <span className="text-2xl font-bold text-primary">{savings}%</span>
          <p className="text-sm text-muted-foreground">File size reduced</p>
        </div>
      )}
      <div className="space-y-4">
        <label className="font-medium">Quality: {quality[0]}%</label>
        <Slider value={quality} onValueChange={handleQualityChange} min={10} max={100} step={5} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cf">File Name</Label>
        <div className="flex gap-2 items-center">
          <Input id="cf" value={fileName} onChange={(e) => setFileName(e.target.value)} className="flex-1" />
          <span className="text-muted-foreground">.jpg</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setShowAdModal(true)} size="lg">
          <Download className="w-4 h-4 mr-2" /> Download
        </Button>
        <Button variant="outline" onClick={handleReset} size="lg">
          <RotateCcw className="w-4 h-4 mr-2" /> Reset
        </Button>
      </div>
      <AdDownloadModal isOpen={showAdModal} onClose={() => setShowAdModal(false)} onDownload={handleDownload} fileName={`${fileName.trim() || "compressed-image"}.jpg`} />
    </div>
  );
};

export default ImageCompressorWidget;