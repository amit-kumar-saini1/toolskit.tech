import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Unit = "metric" | "imperial";

export default function BmiCalculatorWidget() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [heightCm, setHeightCm] = useState("170");
  const [weightKg, setWeightKg] = useState("65");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("7");
  const [weightLb, setWeightLb] = useState("145");

  const result = useMemo(() => {
    let hM = 0;
    let wKg = 0;
    if (unit === "metric") {
      hM = parseFloat(heightCm) / 100;
      wKg = parseFloat(weightKg);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      hM = (ft * 12 + inch) * 0.0254;
      wKg = (parseFloat(weightLb) || 0) * 0.453592;
    }
    if (!hM || !wKg) return null;
    const bmi = wKg / (hM * hM);
    let category = "";
    let color = "";
    if (bmi < 18.5) { category = "Underweight"; color = "text-blue-600"; }
    else if (bmi < 25) { category = "Normal weight"; color = "text-green-600"; }
    else if (bmi < 30) { category = "Overweight"; color = "text-yellow-600"; }
    else { category = "Obese"; color = "text-red-600"; }
    return { bmi: bmi.toFixed(1), category, color };
  }, [unit, heightCm, weightKg, heightFt, heightIn, weightLb]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant={unit === "metric" ? "default" : "outline"} onClick={() => setUnit("metric")}>Metric (kg/cm)</Button>
        <Button variant={unit === "imperial" ? "default" : "outline"} onClick={() => setUnit("imperial")}>Imperial (lb/ft)</Button>
      </div>
      {unit === "metric" ? (
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Height (cm)</Label><Input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} /></div>
          <div><Label>Weight (kg)</Label><Input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} /></div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Feet</Label><Input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} /></div>
          <div><Label>Inches</Label><Input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} /></div>
          <div><Label>Weight (lb)</Label><Input type="number" value={weightLb} onChange={(e) => setWeightLb(e.target.value)} /></div>
        </div>
      )}
      {result && (
        <div className="bg-muted/50 border border-border rounded-xl p-5 text-center">
          <div className="text-sm text-muted-foreground">Your BMI</div>
          <div className="text-5xl font-extrabold text-primary my-2">{result.bmi}</div>
          <div className={`text-lg font-semibold ${result.color}`}>{result.category}</div>
        </div>
      )}
      <div className="text-xs text-muted-foreground">
        BMI ranges: Underweight &lt;18.5 · Normal 18.5–24.9 · Overweight 25–29.9 · Obese ≥30
      </div>
    </div>
  );
}