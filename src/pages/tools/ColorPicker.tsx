import { useState } from "react";
import { Palette, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToolLayout from "@/components/tools/ToolLayout";
import { toast } from "sonner";

const ColorPicker = () => {
  const [color, setColor] = useState("#0ea5e9");
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      };
    }
    return { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const colorFormats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "CSS Variable", value: `--color: ${color};` },
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolLayout
      title="Color Picker"
      description="Pick colors and get color codes"
      icon={Palette}
      toolSlug="color-picker"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Color Picker */}
          <div className="space-y-4">
            <Label>Select Color</Label>
            <div className="relative">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-48 rounded-2xl cursor-pointer border-2 border-border"
              />
            </div>
            <Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-12 text-center font-mono text-lg"
            />
          </div>

          {/* Color Formats */}
          <div className="space-y-4">
            <Label>Color Codes</Label>
            {colorFormats.map((format) => (
              <div 
                key={format.label}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
              >
                <div>
                  <span className="text-sm text-muted-foreground">{format.label}</span>
                  <p className="font-mono">{format.value}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(format.value, format.label)}
                >
                  {copied === format.label ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Color Preview */}
        <div className="space-y-4">
          <Label>Preview</Label>
          <div className="grid grid-cols-5 gap-4">
            {[0.2, 0.4, 0.6, 0.8, 1].map((opacity) => (
              <div
                key={opacity}
                className="h-20 rounded-xl border border-border"
                style={{ backgroundColor: color, opacity }}
              />
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ColorPicker;
