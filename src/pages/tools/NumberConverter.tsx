import { useState } from "react";
import { Hash, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToolLayout from "@/components/tools/ToolLayout";
import { toast } from "sonner";

const NumberConverter = () => {
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");
  const [octal, setOctal] = useState("");
  const [hex, setHex] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const convertFromDecimal = (value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) {
      setBinary("");
      setOctal("");
      setHex("");
      return;
    }
    setBinary(num.toString(2));
    setOctal(num.toString(8));
    setHex(num.toString(16).toUpperCase());
  };

  const convertFromBinary = (value: string) => {
    const num = parseInt(value, 2);
    if (isNaN(num)) {
      setDecimal("");
      setOctal("");
      setHex("");
      return;
    }
    setDecimal(num.toString(10));
    setOctal(num.toString(8));
    setHex(num.toString(16).toUpperCase());
  };

  const convertFromOctal = (value: string) => {
    const num = parseInt(value, 8);
    if (isNaN(num)) {
      setDecimal("");
      setBinary("");
      setHex("");
      return;
    }
    setDecimal(num.toString(10));
    setBinary(num.toString(2));
    setHex(num.toString(16).toUpperCase());
  };

  const convertFromHex = (value: string) => {
    const num = parseInt(value, 16);
    if (isNaN(num)) {
      setDecimal("");
      setBinary("");
      setOctal("");
      return;
    }
    setDecimal(num.toString(10));
    setBinary(num.toString(2));
    setOctal(num.toString(8));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopied(null), 2000);
  };

  const fields = [
    { 
      label: "Decimal (Base 10)", 
      value: decimal, 
      onChange: (v: string) => { setDecimal(v); convertFromDecimal(v); },
      placeholder: "Enter decimal number",
    },
    { 
      label: "Binary (Base 2)", 
      value: binary, 
      onChange: (v: string) => { setBinary(v); convertFromBinary(v); },
      placeholder: "Enter binary number",
    },
    { 
      label: "Octal (Base 8)", 
      value: octal, 
      onChange: (v: string) => { setOctal(v); convertFromOctal(v); },
      placeholder: "Enter octal number",
    },
    { 
      label: "Hexadecimal (Base 16)", 
      value: hex, 
      onChange: (v: string) => { setHex(v); convertFromHex(v); },
      placeholder: "Enter hex number",
    },
  ];

  return (
    <ToolLayout
      title="Number System Converter"
      description="Convert between decimal, binary, octal, and hexadecimal"
      icon={Hash}
      toolSlug="number-converter"
    >
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Enter a value in any field to convert to other number systems.
        </p>

        <div className="grid gap-4">
          {fields.map((field) => (
            <div key={field.label} className="space-y-2">
              <Label>{field.label}</Label>
              <div className="flex gap-2">
                <Input
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  className="h-12 font-mono"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => copyToClipboard(field.value, field.label)}
                  disabled={!field.value}
                >
                  {copied === field.label ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 rounded-xl p-4">
          <h4 className="font-medium mb-2">Quick Reference</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Decimal:</span>
              <p>0-9</p>
            </div>
            <div>
              <span className="text-muted-foreground">Binary:</span>
              <p>0, 1</p>
            </div>
            <div>
              <span className="text-muted-foreground">Octal:</span>
              <p>0-7</p>
            </div>
            <div>
              <span className="text-muted-foreground">Hex:</span>
              <p>0-9, A-F</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default NumberConverter;
