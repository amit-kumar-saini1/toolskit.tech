import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Lazy load all pages except Index (homepage loads instantly)
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Contact = lazy(() => import("./pages/Contact"));
const AllTools = lazy(() => import("./pages/AllTools"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// Tool Pages - lazy loaded (each becomes its own chunk)
const ImageCropper = lazy(() => import("./pages/tools/ImageCropper"));
const ImageCompressor = lazy(() => import("./pages/tools/ImageCompressor"));
const AgeCalculator = lazy(() => import("./pages/tools/AgeCalculator"));
const QRGenerator = lazy(() => import("./pages/tools/QRGenerator"));
const ColorPicker = lazy(() => import("./pages/tools/ColorPicker"));
const UnitConverter = lazy(() => import("./pages/tools/UnitConverter"));
const BMICalculator = lazy(() => import("./pages/tools/BMICalculator"));
const TextOnPhoto = lazy(() => import("./pages/tools/TextOnPhoto"));
const NumberConverter = lazy(() => import("./pages/tools/NumberConverter"));
const ImageToPDF = lazy(() => import("./pages/tools/ImageToPDF"));
const PDFToImage = lazy(() => import("./pages/tools/PDFToImage"));
const RemoveBackground = lazy(() => import("./pages/tools/RemoveBackground"));
const KBConverter = lazy(() => import("./pages/tools/KBConverter"));
const TimeZoneConverter = lazy(() => import("./pages/tools/TimeZoneConverter"));
const CurrencyConverter = lazy(() => import("./pages/tools/CurrencyConverter"));
const CryptoConverter = lazy(() => import("./pages/tools/CryptoConverter"));
const PincodeLookup = lazy(() => import("./pages/tools/PincodeLookup"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Static Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tools" element={<AllTools />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* Tool Routes */}
            <Route path="/tools/image-cropper" element={<ImageCropper />} />
            <Route path="/tools/image-compressor" element={<ImageCompressor />} />
            <Route path="/tools/kb-converter" element={<KBConverter />} />
            <Route path="/tools/age-calculator" element={<AgeCalculator />} />
            <Route path="/tools/qr-generator" element={<QRGenerator />} />
            <Route path="/tools/color-picker" element={<ColorPicker />} />
            <Route path="/tools/unit-converter" element={<UnitConverter />} />
            <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
            <Route path="/tools/text-on-photo" element={<TextOnPhoto />} />
            <Route path="/tools/number-converter" element={<NumberConverter />} />
            <Route path="/tools/image-to-pdf" element={<ImageToPDF />} />
            <Route path="/tools/pdf-to-image" element={<PDFToImage />} />
            <Route path="/tools/remove-background" element={<RemoveBackground />} />
            <Route path="/tools/time-zone-converter" element={<TimeZoneConverter />} />
            <Route path="/tools/currency-converter" element={<CurrencyConverter />} />
            <Route path="/tools/crypto-converter" element={<CryptoConverter />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
