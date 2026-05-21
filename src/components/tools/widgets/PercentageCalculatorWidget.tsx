import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Mode = "of" | "isWhat" | "change";

export default function PercentageCalculatorWidget() {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState(20);
  const [b, setB] = useState(150);

  const result = useMemo(() => {
    const x = Number(a) || 0;
    const y = Number(b) || 0;
    if (mode === "of") return { value: (x * y) / 100, label: `${x}% of ${y}` };
    if (mode === "isWhat") return { value: y === 0 ? 0 : (x / y) * 100, label: `${x} is what % of ${y}`, suffix: "%" };
    // change
    return {
      value: x === 0 ? 0 : ((y - x) / x) * 100,
      label: `% change from ${x} to ${y}`,
      suffix: "%",
    };
  }, [a, b, mode]);

  const fmt = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 2 });

  const labelA = mode === "of" ? "Percentage (%)" : mode === "isWhat" ? "Value" : "Original Value";
  const labelB = mode === "of" ? "Of Number" : mode === "isWhat" ? "Total" : "New Value";

  return (
    <div className="space-y-5">
      <div className="flex gap-2 rounded-lg bg-muted p-1 flex-wrap">
        {([
          { v: "of", l: "X% of Y" },
          { v: "isWhat", l: "X is what % of Y" },
          { v: "change", l: "% Increase / Decrease" },
        ] as { v: Mode; l: string }[]).map((o) => (
          <button
            key={o.v}
            onClick={() => setMode(o.v)}
            className={`flex-1 min-w-[8rem] py-2 px-3 rounded-md text-sm font-semibold transition-colors ${
              mode === o.v ? "bg-card shadow-sm" : "text-muted-foreground"
            }`}
          >
            {o.l}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{labelA}</Label>
          <Input type="number" value={a} onChange={(e) => setA(parseFloat(e.target.value) || 0)} className="h-12 text-lg" />
        </div>
        <div className="space-y-2">
          <Label>{labelB}</Label>
          <Input type="number" value={b} onChange={(e) => setB(parseFloat(e.target.value) || 0)} className="h-12 text-lg" />
        </div>
      </div>

      <div className="p-5 rounded-xl bg-primary text-primary-foreground">
        <p className="text-xs uppercase opacity-80">{result.label}</p>
        <p className="text-4xl font-bold mt-1">
          {fmt(result.value)}
          {("suffix" in result && result.suffix) || ""}
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        Quick formulas: X% of Y = (X × Y) / 100 · X is what % of Y = (X / Y) × 100 · % change = ((New − Old) / Old) × 100.
      </p>
    </div>
  );
}