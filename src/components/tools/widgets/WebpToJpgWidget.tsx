import { useRef, useState } from "react";
import { Download, Upload, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Item = { id: string; name: string; src: string; out?: string };

interface Props {
  /** source mime to display ("image/webp", "image/jpeg", "image/png") */
  fromLabel: string;
  /** target mime ("image/jpeg" or "image/png") */
  targetMime: "image/jpeg" | "image/png";
  /** download extension without dot */
  targetExt: "jpg" | "png";
  /** input accept attr */
  accept: string;
}

export default function ImageConvertWidget({ fromLabel, targetMime, targetExt, accept }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [quality, setQuality] = useState(0.92);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          if (targetMime === "image/jpeg") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          ctx.drawImage(img, 0, 0);
          const out = canvas.toDataURL(targetMime, quality);
          setItems((prev) => [
            ...prev,
            { id: crypto.randomUUID(), name: file.name, src, out },
          ]);
        };
        img.src = src;
      };
      reader.readAsDataURL(file);
    });
  };

  const downloadOne = (it: Item) => {
    if (!it.out) return;
    const a = document.createElement("a");
    a.href = it.out;
    a.download = `${it.name.replace(/\.[^.]+$/, "")}.${targetExt}`;
    a.click();
    toast.success("Downloaded!");
  };

  const downloadAll = () => {
    items.forEach((it, i) => setTimeout(() => downloadOne(it), i * 200));
  };

  const reset = () => setItems([]);

  return (
    <div className="space-y-5">
      <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
        <Upload className="w-10 h-10 text-muted-foreground mb-3" />
        <span className="text-muted-foreground text-center px-3">
          Click or drop {fromLabel} files to convert to {targetExt.toUpperCase()}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </label>

      {targetMime === "image/jpeg" && (
        <div className="space-y-2">
          <Label>JPG Quality: {Math.round(quality * 100)}%</Label>
          <input
            type="range"
            min={0.3}
            max={1}
            step={0.01}
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {items.map((it) => (
              <div key={it.id} className="border border-border rounded-lg p-2 bg-card">
                <img src={it.out || it.src} alt={it.name} className="w-full h-28 object-cover rounded" />
                <p className="text-xs truncate mt-1">{it.name}</p>
                <Button variant="outline" size="sm" className="w-full mt-1.5" onClick={() => downloadOne(it)}>
                  <Download className="w-3 h-3 mr-1" /> {targetExt.toUpperCase()}
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="gradient" className="flex-1" onClick={downloadAll}>
              <Download className="w-4 h-4 mr-2" /> Download All
            </Button>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
