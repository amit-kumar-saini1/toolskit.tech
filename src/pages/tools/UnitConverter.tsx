import { useState } from "react";
import { Ruler, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolLayout from "@/components/tools/ToolLayout";

const unitCategories = {
  length: {
    name: "Length",
    units: {
      meter: { name: "Meter (m)", factor: 1 },
      kilometer: { name: "Kilometer (km)", factor: 1000 },
      centimeter: { name: "Centimeter (cm)", factor: 0.01 },
      millimeter: { name: "Millimeter (mm)", factor: 0.001 },
      mile: { name: "Mile", factor: 1609.344 },
      yard: { name: "Yard", factor: 0.9144 },
      foot: { name: "Foot", factor: 0.3048 },
      inch: { name: "Inch", factor: 0.0254 },
    },
  },
  weight: {
    name: "Weight",
    units: {
      kilogram: { name: "Kilogram (kg)", factor: 1 },
      gram: { name: "Gram (g)", factor: 0.001 },
      milligram: { name: "Milligram (mg)", factor: 0.000001 },
      pound: { name: "Pound (lb)", factor: 0.453592 },
      ounce: { name: "Ounce (oz)", factor: 0.0283495 },
      ton: { name: "Ton", factor: 1000 },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      celsius: { name: "Celsius (°C)", factor: 1 },
      fahrenheit: { name: "Fahrenheit (°F)", factor: 1 },
      kelvin: { name: "Kelvin (K)", factor: 1 },
    },
  },
  area: {
    name: "Area",
    units: {
      sqmeter: { name: "Square Meter (m²)", factor: 1 },
      sqkilometer: { name: "Square Kilometer (km²)", factor: 1000000 },
      hectare: { name: "Hectare", factor: 10000 },
      acre: { name: "Acre", factor: 4046.86 },
      sqfoot: { name: "Square Foot (ft²)", factor: 0.092903 },
    },
  },
  volume: {
    name: "Volume",
    units: {
      liter: { name: "Liter (L)", factor: 1 },
      milliliter: { name: "Milliliter (mL)", factor: 0.001 },
      cubicmeter: { name: "Cubic Meter (m³)", factor: 1000 },
      gallon: { name: "Gallon (US)", factor: 3.78541 },
      quart: { name: "Quart", factor: 0.946353 },
    },
  },
};

type Category = keyof typeof unitCategories;

const UnitConverter = () => {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number;
    
    // Convert to Celsius first
    switch (from) {
      case "fahrenheit":
        celsius = (value - 32) * 5 / 9;
        break;
      case "kelvin":
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }
    
    // Convert from Celsius to target
    switch (to) {
      case "fahrenheit":
        return celsius * 9 / 5 + 32;
      case "kelvin":
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const convert = (value: string, from: string, to: string) => {
    if (!value) {
      setToValue("");
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    if (category === "temperature") {
      const result = convertTemperature(numValue, from, to);
      setToValue(result.toFixed(4).replace(/\.?0+$/, ""));
      return;
    }

    const units = unitCategories[category].units as Record<string, { name: string; factor: number }>;
    const fromFactor = units[from].factor;
    const toFactor = units[to].factor;
    
    const result = (numValue * fromFactor) / toFactor;
    setToValue(result.toFixed(6).replace(/\.?0+$/, ""));
  };

  const handleFromChange = (value: string) => {
    setFromValue(value);
    convert(value, fromUnit, toUnit);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    const units = Object.keys(unitCategories[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setFromValue("");
    setToValue("");
  };

  const currentUnits = unitCategories[category].units as Record<string, { name: string; factor: number }>;

  return (
    <ToolLayout
      title="Unit Converter"
      description="Convert between different units"
      icon={Ruler}
      toolSlug="unit-converter"
    >
      <div className="space-y-6">
        {/* Category Selection */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(unitCategories).map(([key, { name }]) => (
            <Button
              key={key}
              variant={category === key ? "gradient" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(key as Category)}
            >
              {name}
            </Button>
          ))}
        </div>

        {/* Converter */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div className="space-y-2">
            <Label>From</Label>
            <Select value={fromUnit} onValueChange={(v) => { setFromUnit(v); convert(fromValue, v, toUnit); }}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(currentUnits).map(([key, { name }]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={fromValue}
              onChange={(e) => handleFromChange(e.target.value)}
              placeholder="Enter value"
              className="h-14 text-xl font-medium"
            />
          </div>

          <Button variant="ghost" size="icon" onClick={handleSwap} className="mb-4">
            <ArrowRightLeft className="w-5 h-5" />
          </Button>

          <div className="space-y-2">
            <Label>To</Label>
            <Select value={toUnit} onValueChange={(v) => { setToUnit(v); convert(fromValue, fromUnit, v); }}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(currentUnits).map(([key, { name }]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="text"
              value={toValue}
              readOnly
              placeholder="Result"
              className="h-14 text-xl font-medium bg-muted/50"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default UnitConverter;
