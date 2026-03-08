import { useState } from "react";
import { FileImage, Upload, Download, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToolLayout from "@/components/tools/ToolLayout";
import { AdDownloadModal } from "@/components/AdDownloadModal";
import { toast } from "sonner";
import { jsPDF } from "jspdf";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ImageToPDF = () => {
  const [images, setImages] = useState<{id: string;src: string;name: string;}[]>([]);
  const [fileName, setFileName] = useState("converted");
  const [showAdModal, setShowAdModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          src: e.target?.result as string,
          name: file.name
        }]
        );
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const generatePDF = async () => {
    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    try {
      const pdf = new jsPDF();

      for (let i = 0; i < images.length; i++) {
        const imgData = images[i].src;

        // Create image element to get dimensions
        const img = new Image();
        img.src = imgData;

        await new Promise<void>((resolve) => {
          img.onload = () => {
            const imgWidth = 190; // A4 width with margins
            const imgHeight = img.height * imgWidth / img.width;

            if (i > 0) {
              pdf.addPage();
            }

            pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight);
            resolve();
          };
        });
      }

      const finalName = fileName.trim() || "converted";
      pdf.save(`${finalName}.pdf`);
      toast.success("PDF created successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to create PDF. Please try again.");
    }
  };

  const openDownloadModal = () => {
    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }
    setShowAdModal(true);
  };

  return (
    <ToolLayout
      title="Image to PDF"
      description="Convert images to PDF documents instantly"
      icon={FileImage}
      toolSlug="image-to-pdf">
      
      <div className="space-y-6">
        {/* Upload Area */}
        <label className="flex flex-col items-center justify-center py-16 px-8 border-2 border-dashed border-accent/50 rounded-xl cursor-pointer hover:border-accent transition-colors">
          <p className="text-muted-foreground mb-4 text-base">      Select Or Drag & Drop                   Image Here</p>
          <span className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg text-sm hover:bg-secondary/90 transition-colors">
            Select Image
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden" />
          
        </label>

        {/* Image Preview Grid */}
        {images.length > 0 &&
        <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{images.length} image(s) selected</h3>
              <label className="cursor-pointer">
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Plus className="w-4 h-4 mr-2" />
                    Add More
                  </span>
                </Button>
                <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden" />
              
              </label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image) =>
            <div key={image.id} className="relative group">
                  <img
                src={image.src}
                alt={image.name}
                className="w-full h-32 object-cover rounded-xl border border-border" />
              
                  <button
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                
                    <X className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{image.name}</p>
                </div>
            )}
            </div>

            {/* Filename Input */}
            <div className="space-y-2">
              <Label htmlFor="pdf-filename">File Name</Label>
              <div className="flex gap-2 items-center">
                <Input
                id="pdf-filename"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
                className="flex-1" />
              
                <span className="text-muted-foreground">.pdf</span>
              </div>
            </div>

            <Button variant="gradient" onClick={openDownloadModal} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Convert to PDF
            </Button>

            <AdDownloadModal
            isOpen={showAdModal}
            onClose={() => setShowAdModal(false)}
            onDownload={generatePDF}
            fileName={`${fileName.trim() || "converted"}.pdf`} />
          
          </div>
        }
      </div>
    </ToolLayout>);

};

export default ImageToPDF;