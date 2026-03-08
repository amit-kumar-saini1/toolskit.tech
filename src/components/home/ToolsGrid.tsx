import { Link } from "react-router-dom";
import { 
  FileImage, 
  FileText, 
  Crop, 
  ImageMinus, 
  Palette,
  Calculator,
  QrCode,
  Ruler,
  FileDown,
  Type,
  Calendar,
  Hash,
  ArrowRight,
  Clock
} from "lucide-react";
import ToolCard from "./ToolCard";
import { Button } from "@/components/ui/button";

const tools = [
  {
    title: "Image to PDF",
    description: "Convert images to PDF documents instantly",
    icon: FileImage,
    path: "/tools/image-to-pdf",
    color: "#0ea5e9",
  },
  {
    title: "PDF to Image",
    description: "Extract images from PDF files",
    icon: FileText,
    path: "/tools/pdf-to-image",
    color: "#14b8a6",
  },
  {
    title: "Image Cropper",
    description: "Crop and resize your images easily",
    icon: Crop,
    path: "/tools/image-cropper",
    color: "#8b5cf6",
  },
  {
    title: "KB Converter",
    description: "Reduce to specific KB without quality loss",
    icon: FileDown,
    path: "/tools/kb-converter",
    color: "#f59e0b",
  },
  {
    title: "Image Compressor",
    description: "Reduce image size in KB/MB",
    icon: FileDown,
    path: "/tools/image-compressor",
    color: "#fb923c",
  },
  {
    title: "Remove Background",
    description: "Remove image background with AI",
    icon: ImageMinus,
    path: "/tools/remove-background",
    color: "#ec4899",
  },
  {
    title: "Age Calculator",
    description: "Calculate exact age from birthdate",
    icon: Calendar,
    path: "/tools/age-calculator",
    color: "#06b6d4",
  },
  {
    title: "QR Code Generator",
    description: "Create QR codes for any text or URL",
    icon: QrCode,
    path: "/tools/qr-generator",
    color: "#10b981",
  },
  {
    title: "Color Picker",
    description: "Pick colors and get color codes",
    icon: Palette,
    path: "/tools/color-picker",
    color: "#f43f5e",
  },
  {
    title: "Unit Converter",
    description: "Convert between different units",
    icon: Ruler,
    path: "/tools/unit-converter",
    color: "#6366f1",
  },
  {
    title: "Text on Photo",
    description: "Add text watermark to images",
    icon: Type,
    path: "/tools/text-on-photo",
    color: "#84cc16",
  },
  {
    title: "Number System",
    description: "Convert between number systems",
    icon: Hash,
    path: "/tools/number-converter",
    color: "#a855f7",
  },
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index",
    icon: Calculator,
    path: "/tools/bmi-calculator",
    color: "#22c55e",
  },
  {
    title: "Time Zone Converter",
    description: "Convert time between global zones",
    icon: Clock,
    path: "/tools/time-zone-converter",
    color: "#0891b2",
  },
];

const ToolsGrid = () => {
  return (
    <section className="py-16" id="tools">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular <span className="gradient-text">Tools</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most used tools. All free, fast, and easy to use.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.path} {...tool} />
          ))}
        </div>
        
        {/* View All Tools CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/tools">
              View All Tools
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        {/* SEO Content Section */}
        <div className="mt-16 prose prose-sm max-w-4xl mx-auto text-muted-foreground">
          <h3 className="text-xl font-semibold text-foreground mb-4">Why Choose ToolsKit.tech?</h3>
          <p>
            ToolsKit.tech is your one-stop destination for <strong>free online tools</strong>. Whether you need to 
            <Link to="/tools/image-compressor" className="text-primary hover:underline mx-1">compress images</Link>, 
            <Link to="/tools/image-to-pdf" className="text-primary hover:underline mx-1">convert images to PDF</Link>, 
            <Link to="/tools/remove-background" className="text-primary hover:underline mx-1">remove backgrounds with AI</Link>, or 
            <Link to="/tools/qr-generator" className="text-primary hover:underline mx-1">generate QR codes</Link> - 
            we've got you covered. All tools are 100% free, require no signup, and process everything locally in your browser for maximum privacy.
          </p>
          <p className="mt-4">
            Our tools include <Link to="/tools/age-calculator" className="text-primary hover:underline">age calculator</Link>, 
            <Link to="/tools/bmi-calculator" className="text-primary hover:underline mx-1">BMI calculator</Link>, 
            <Link to="/tools/color-picker" className="text-primary hover:underline mx-1">color picker</Link>, 
            <Link to="/tools/unit-converter" className="text-primary hover:underline mx-1">unit converter</Link>, and many more. 
            Bookmark this page and use our tools anytime, anywhere!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;
