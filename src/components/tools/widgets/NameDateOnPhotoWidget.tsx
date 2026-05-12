import { useEffect, useRef, useState } from "react";
import { Download, Upload, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function NameDateOnPhotoWidget() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("LARA MULLER");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [textColor, setTextColor] = useState("#111111");
  const [bgColor, setBgColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        setImage(ev.target?.result as string);
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const targetW = 800;
    const ratio = img.height / img.width;
    const photoW = targetW;
    const photoH = Math.round(targetW * ratio);
    const padding = 32;
    const captionH = 200;

    canvas.width = photoW + padding * 2;
    canvas.height = photoH + padding * 2 + captionH;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, padding, padding, photoW, photoH);

    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = `bold 56px Arial, sans-serif`;
    ctx.fillText(name || "", canvas.width / 2, photoH + padding + 70);

    ctx.font = `bold 44px Arial, sans-serif`;
    ctx.fillText(date || "", canvas.width / 2, photoH + padding + 140);
  };

  useEffect(() => {
    if (image) draw();
  }, [image, name, date, textColor, bgColor]);

  const handleDownload = () => {
    if (!canvasRef.current || !image) return;
    const link = document.createElement("a");
    link.download = `${(name || "photo").replace(/\s+/g, "-").toLowerCase()}-${date}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    toast.success("Image downloaded!");
  };

  const handleReset = () => {
    setImage(null);
    setName("LARA MULLER");
    setDate(new Date().toISOString().split("T")[0]);
    imageRef.current = null;
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center h-56 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
          <Upload className="w-10 h-10 text-muted-foreground mb-3" />
          <span className="text-muted-foreground">Click to upload your photo</span>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Preview</Label>
            <canvas ref={canvasRef} className="w-full rounded-xl border border-border bg-white" />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ndp-name">Name</Label>
              <Input id="ndp-name" value={name} onChange={(e) => setName(e.target.value)} className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ndp-date">Date</Label>
              <Input id="ndp-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-12" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Text Color</Label>
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full h-12 rounded-lg cursor-pointer" />
              </div>
              <div className="space-y-2">
                <Label>Background</Label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-12 rounded-lg cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="gradient" onClick={handleDownload} className="flex-1">
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" /> Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
