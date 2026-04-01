import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ToolCard from "@/components/home/ToolCard";
import { 
  FileImage, FileText, Crop, Minimize2, Eraser, 
  Calendar, QrCode, Palette, ArrowRightLeft, Type,
  Binary, Heart, FileDown, Clock, TrendingUp, Bitcoin, MapPin
} from "lucide-react";

const tools = [
  {
    title: "Image to PDF",
    description: "Convert images to PDF documents",
    icon: FileImage,
    path: "/tools/image-to-pdf",
    color: "#3B82F6"
  },
  {
    title: "PDF to Image",
    description: "Convert PDF pages to images",
    icon: FileText,
    path: "/tools/pdf-to-image",
    color: "#EF4444"
  },
  {
    title: "Image Cropper",
    description: "Crop and resize your images easily",
    icon: Crop,
    path: "/tools/image-cropper",
    color: "#10B981"
  },
  {
    title: "KB Converter",
    description: "Reduce to specific KB size",
    icon: FileDown,
    path: "/tools/kb-converter",
    color: "#F59E0B"
  },
  {
    title: "Image Compressor",
    description: "Reduce image file size without losing quality",
    icon: Minimize2,
    path: "/tools/image-compressor",
    color: "#8B5CF6"
  },
  {
    title: "Background Remover",
    description: "Remove background from images instantly",
    icon: Eraser,
    path: "/tools/remove-background",
    color: "#EC4899"
  },
  {
    title: "Age Calculator",
    description: "Calculate exact age from date of birth",
    icon: Calendar,
    path: "/tools/age-calculator",
    color: "#F59E0B"
  },
  {
    title: "QR Code Generator",
    description: "Create QR codes for any text or URL",
    icon: QrCode,
    path: "/tools/qr-generator",
    color: "#06B6D4"
  },
  {
    title: "Color Picker",
    description: "Pick colors and get HEX, RGB, HSL values",
    icon: Palette,
    path: "/tools/color-picker",
    color: "#F97316"
  },
  {
    title: "Unit Converter",
    description: "Convert between different units",
    icon: ArrowRightLeft,
    path: "/tools/unit-converter",
    color: "#14B8A6"
  },
  {
    title: "Text on Photo",
    description: "Add custom text to your photos",
    icon: Type,
    path: "/tools/text-on-photo",
    color: "#6366F1"
  },
  {
    title: "Number System",
    description: "Convert between binary, decimal, hex",
    icon: Binary,
    path: "/tools/number-converter",
    color: "#84CC16"
  },
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index",
    icon: Heart,
    path: "/tools/bmi-calculator",
    color: "#EF4444"
  },
  {
    title: "Time Zone Converter",
    description: "Convert time between different zones",
    icon: Clock,
    path: "/tools/time-zone-converter",
    color: "#0EA5E9"
  },
  {
    title: "Currency Converter",
    description: "Convert currencies with live rates",
    icon: TrendingUp,
    path: "/tools/currency-converter",
    color: "#EAB308"
  },
  {
    title: "Crypto Converter",
    description: "Live crypto prices & converter",
    icon: Bitcoin,
    path: "/tools/crypto-converter",
    color: "#F7931A"
  },
];

const AllTools = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">All Tools</h1>
        <p className="text-muted-foreground mb-8">Browse our complete collection of free online tools</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.path} {...tool} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllTools;
