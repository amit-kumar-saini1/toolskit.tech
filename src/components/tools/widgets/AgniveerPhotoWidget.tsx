import { useEffect, useRef, useState } from "react";
import { Download, Upload, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// IAF Agniveervayu 02/2027 photo spec:
// - Passport size colour photo, light background, front portrait
// - Candidate holding a BLACK SLATE with NAME + DATE in WHITE CHALK, CAPITAL letters
// - Output: .jpg / .jpeg, size 100 KB – 200 KB
export default function AgniveerPhotoWidget() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("CANDIDATE NAME");
  const [date, setDate] = useState(() => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}/${d.getFullYear()}`;
  });
  const [sizeKB, setSizeKB] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image");
      return;
    }
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

    // Passport-ish aspect. Photo area 600x750, slate strip 600x180 below.
    const W = 600;
    const photoH = 750;
    const slateH = 180;
    canvas.width = W;
    canvas.height = photoH + slateH;

    // Photo area: cover fit
    const ir = img.width / img.height;
    const pr = W / photoH;
    let sx = 0, sy = 0, sw = img.width, sh = img.height;
    if (ir > pr) {
      sw = img.height * pr;
      sx = (img.width - sw) / 2;
    } else {
      sh = img.width / pr;
      sy = (img.height - sh) / 2;
    }
    ctx.fillStyle = "#f4f4f4";
    ctx.fillRect(0, 0, W, photoH);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, photoH);

    // Slate (black chalkboard)
    const grd = ctx.createLinearGradient(0, photoH, 0, photoH + slateH);
    grd.addColorStop(0, "#111");
    grd.addColorStop(1, "#1a1a1a");
    ctx.fillStyle = grd;
    ctx.fillRect(0, photoH, W, slateH);

    // Subtle chalk dust
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * W;
      const y = photoH + Math.random() * slateH;
      ctx.fillRect(x, y, 1, 1);
    }

    // Wooden-ish border for slate
    ctx.strokeStyle = "#3a2a1a";
    ctx.lineWidth = 6;
    ctx.strokeRect(3, photoH + 3, W - 6, slateH - 6);

    // Chalk text
    ctx.fillStyle = "#fdfdfd";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(255,255,255,0.35)";
    ctx.shadowBlur = 2;

    const cleanName = (name || "").toUpperCase().slice(0, 32);
    ctx.font = `bold 42px "Bradley Hand", "Comic Sans MS", "Chalkboard SE", cursive`;
    ctx.fillText(cleanName, W / 2, photoH + 60);

    ctx.font = `bold 36px "Bradley Hand", "Comic Sans MS", "Chalkboard SE", cursive`;
    ctx.fillText(date || "", W / 2, photoH + 125);

    ctx.shadowBlur = 0;

    // Measure JPG size preview at q=0.85
    canvas.toBlob(
      (blob) => {
        if (blob) setSizeKB(Math.round(blob.size / 1024));
      },
      "image/jpeg",
      0.85,
    );
  };

  useEffect(() => {
    if (image) draw();
  }, [image, name, date]);

  const dataUrlToBlob = (url: string) =>
    fetch(url).then((r) => r.blob());

  const encodeInRange = async (): Promise<Blob> => {
    const canvas = canvasRef.current!;
    // Binary-search JPG quality so output size lands in 100–200 KB
    let lo = 0.3;
    let hi = 0.98;
    let best: Blob | null = null;
    for (let i = 0; i < 8; i++) {
      const q = (lo + hi) / 2;
      const blob: Blob = await new Promise((res) =>
        canvas.toBlob((b) => res(b!), "image/jpeg", q),
      );
      const kb = blob.size / 1024;
      best = blob;
      if (kb < 100) lo = q;
      else if (kb > 200) hi = q;
      else return blob;
    }
    return best!;
  };

  const handleDownload = async () => {
    if (!canvasRef.current || !image) return;
    const blob = await encodeInRange();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${(name || "agniveer").replace(/\s+/g, "-").toLowerCase()}.jpg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded (${Math.round(blob.size / 1024)} KB)`);
  };

  const handleReset = () => {
    setImage(null);
    setName("CANDIDATE NAME");
    imageRef.current = null;
    setSizeKB(null);
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center h-56 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
          <Upload className="w-10 h-10 text-muted-foreground mb-3" />
          <span className="text-muted-foreground">Click to upload passport-size photo</span>
          <span className="text-xs text-muted-foreground mt-1">JPG/JPEG, light background, front face</span>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Preview (Agniveervayu 02/2027 format)</Label>
            <canvas ref={canvasRef} className="w-full rounded-xl border border-border bg-white" />
            {sizeKB !== null && (
              <p className="text-xs text-muted-foreground">
                Preview size ~{sizeKB} KB · Download auto-fits 100–200 KB (IAF requirement).
              </p>
            )}
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="afv-name">Full Name (CAPITAL letters)</Label>
              <Input
                id="afv-name"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                className="h-12 uppercase tracking-wider"
                maxLength={32}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="afv-date">Date of Photo (DD/MM/YYYY)</Label>
              <Input
                id="afv-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="DD/MM/YYYY"
                className="h-12"
              />
              <p className="text-[11px] text-muted-foreground">
                Must be within 1 month of registration (per IAF advertisement).
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="gradient" onClick={handleDownload} className="flex-1">
                <Download className="w-4 h-4 mr-2" /> Download JPG
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" /> Reset
              </Button>
            </div>

            <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-3 space-y-1">
              <p className="font-semibold text-foreground">IAF Photo Rules (Agniveervayu 02/2027):</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Passport size colour photo, light background</li>
                <li>Front portrait, no facemask / headgear (Sikhs exempt)</li>
                <li>Name & date on black slate in white chalk, CAPITALS</li>
                <li>Format .jpg / .jpeg, size 100 KB – 200 KB</li>
                <li>Photo not older than 1 month from registration date</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
