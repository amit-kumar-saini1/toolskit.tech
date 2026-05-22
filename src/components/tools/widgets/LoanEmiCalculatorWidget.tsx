import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoanEmiCalculatorWidget() {
  const [amount, setAmount] = useState("500000");
  const [rate, setRate] = useState("9.5");
  const [years, setYears] = useState("5");

  const result = useMemo(() => {
    const P = parseFloat(amount);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(years) * 12;
    if (!P || !r || !n) return null;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - P;
    return {
      emi: Math.round(emi).toLocaleString("en-IN"),
      total: Math.round(total).toLocaleString("en-IN"),
      interest: Math.round(interest).toLocaleString("en-IN"),
      principal: Math.round(P).toLocaleString("en-IN"),
    };
  }, [amount, rate, years]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div><Label>Loan Amount (₹)</Label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
        <div><Label>Interest Rate (% p.a.)</Label><Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} /></div>
        <div><Label>Tenure (Years)</Label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} /></div>
      </div>
      {result && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Stat label="Monthly EMI" value={`₹${result.emi}`} highlight />
          <Stat label="Principal" value={`₹${result.principal}`} />
          <Stat label="Total Interest" value={`₹${result.interest}`} />
          <Stat label="Total Payment" value={`₹${result.total}`} />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`border rounded-lg p-3 text-center ${highlight ? "bg-primary/10 border-primary" : "bg-muted/50 border-border"}`}>
      <div className={`font-bold ${highlight ? "text-2xl text-primary" : "text-lg"}`}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}