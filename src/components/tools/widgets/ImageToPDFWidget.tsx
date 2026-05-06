import { useState } from "react";
import { Download, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdDownloadModal } from "@/components/AdDownloadModal";
import { toast } from "sonner";

const ImageToPDFWidget = () => {
  const [images, setImages] = useState<{ id: string; src: string; name: string }[]>([]);
  const [fileName, setFileName] = useState("converted");
  const [showAdModal, setShowAdModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), src: ev.target?.result as string, name: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => setImages((prev) => prev.filter((i) => i.id !== id));

  const generatePDF = async () => {
    if (images.length === 0) return toast.error("Add an image first");
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF();
      for (let i = 0; i < images.length; i++) {
        const data = images[i].src;
        const img = new Image();
        img.src = data;
        await new Promise<void>((resolve) => {
          img.onload = () => {
            const w = 190;
            const h = (img.height * w) / img.width;
            if (i > 0) pdf.addPage();
            pdf.addImage(data, "JPEG", 10, 10, w, h);
            resolve();
          };
        });
      }
      pdf.save(`${fileName.trim() || "converted"}.pdf`);
      toast.success("PDF created!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to create PDF");
    }
  };

  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center py-16 px-8 border-2 border-dashed border-accent/50 rounded-xl cursor-pointer hover:border-accent transition-colors">
        <p className="text-muted-foreground mb-4 text-base">Select Or Drag & Drop Image Here</p>
        <span className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg text-sm hover:bg-secondary/90 transition-colors">
          Select Image
        </span>
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
      </label>
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{images.length} image(s) selected</h3>
            <label className="cursor-pointer">
              <Button variant="outline" size="sm" asChild>
                <span><Plus className="w-4 h-4 mr-2" />Add More</span>
              </Button>
              <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
            </label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img src={image.src} alt={image.name} className="w-full h-32 object-cover rounded-xl border border-border" />
                <button onClick={() => removeImage(image.id)} className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pf">File Name</Label>
            <div className="flex gap-2 items-center">
              <Input id="pf" value={fileName} onChange={(e) => setFileName(e.target.value)} className="flex-1" />
              <span className="text-muted-foreground">.pdf</span>
            </div>
          </div>
          <Button onClick={() => setShowAdModal(true)} className="w-full" size="lg">
            <Download className="w-4 h-4 mr-2" /> Convert to PDF
          </Button>
          <AdDownloadModal isOpen={showAdModal} onClose={() => setShowAdModal(false)} onDownload={generatePDF} fileName={`${fileName.trim() || "converted"}.pdf`} />
        </div>
      )}
    </div>
  );
};

export default ImageToPDFWidget;