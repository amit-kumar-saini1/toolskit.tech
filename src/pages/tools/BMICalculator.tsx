import { useState } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToolLayout from "@/components/tools/ToolLayout";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // cm to m
    const w = parseFloat(weight);

    if (!h || !w) return;

    const bmi = w / (h * h);
    
    let category = "";
    let color = "";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "hsl(200, 90%, 50%)";
    } else if (bmi < 25) {
      category = "Normal Weight";
      color = "hsl(142, 70%, 45%)";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "hsl(45, 90%, 50%)";
    } else {
      category = "Obese";
      color = "hsl(0, 84%, 60%)";
    }

    setResult({ bmi, category, color });
  };

  const bmiRanges = [
    { range: "< 18.5", category: "Underweight", color: "hsl(200, 90%, 50%)" },
    { range: "18.5 - 24.9", category: "Normal", color: "hsl(142, 70%, 45%)" },
    { range: "25 - 29.9", category: "Overweight", color: "hsl(45, 90%, 50%)" },
    { range: "> 30", category: "Obese", color: "hsl(0, 84%, 60%)" },
  ];

  return (
    <ToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index"
      icon={Calculator}
      toolSlug="bmi-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 175"
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 70"
              className="h-12"
            />
          </div>
        </div>

        <Button variant="gradient" onClick={calculateBMI} className="w-full h-12">
          <Calculator className="w-4 h-4 mr-2" />
          Calculate BMI
        </Button>

        {result && (
          <div className="animate-fade-in space-y-6">
            {/* Result Display */}
            <div 
              className="rounded-2xl p-8 text-center"
              style={{ backgroundColor: `${result.color}15` }}
            >
              <h3 className="text-lg text-muted-foreground mb-2">Your BMI</h3>
              <div className="text-6xl font-bold mb-2" style={{ color: result.color }}>
                {result.bmi.toFixed(1)}
              </div>
              <div 
                className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: `${result.color}20`, color: result.color }}
              >
                {result.category}
              </div>
            </div>

            {/* BMI Scale */}
            <div className="space-y-3">
              <h4 className="font-medium">BMI Categories</h4>
              {bmiRanges.map((range) => (
                <div 
                  key={range.category}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ 
                    backgroundColor: result.category === range.category ? `${range.color}15` : undefined,
                    borderLeft: `4px solid ${range.color}`,
                  }}
                >
                  <span className="font-medium">{range.category}</span>
                  <span className="text-muted-foreground">{range.range}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default BMICalculator;
