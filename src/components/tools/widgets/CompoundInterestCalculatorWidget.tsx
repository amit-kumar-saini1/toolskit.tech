import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FREQS = [
  { label: "Yearly", n: 1 },
  { label: "Half-Yearly", n: 2 },
  { label: "Quarterly", n: 4 },
  { label: "Monthly", n: 12 },
  { label: "Daily", n: 365 },
];

export default function CompoundInterestCalculatorWidget() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);
  const [n, setN] = useState(1);

  const result = useMemo(() => {
    const P = Number(principal) || 0;
    const r = Number(rate) / 100;
    const t = Number(years) || 0;
    const A = P * Math.pow(1 + r / n, n * t);
    const interest = A - P;
    return { A, interest, P };
  }, [principal, rate, years, n]);

  const fmt = (v: number) => "₹" + Math.round(v).toLocaleString("en-IN");

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Principal Amount (₹)</Label>
          <Input type="number" value={principal} onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)} className="h-12 text-lg" />
        </div>
        <div className="space-y-2">
          <Label>Annual Interest Rate (%)</Label>
          <Input type="number" step="0.01" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} className="h-12 text-lg" />
        </div>
        <div className="space-y-2">
          <Label>Time Period (Years)</Label>
          <Input type="number" value={years} onChange={(e) => setYears(parseFloat(e.target.value) || 0)} className="h-12 text-lg" />
        </div>
        <div className="space-y-2">
          <Label>Compounding Frequency</Label>
          <select
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="h-12 w-full rounded-md border border-input bg-background px-3 text-lg"
          >
            {FREQS.map((f) => (
              <option key={f.n} value={f.n}>{f.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Row label="Principal" value={fmt(result.P)} />
        <Row label="Interest Earned" value={fmt(result.interest)} />
        <Row label="Maturity Amount" value={fmt(result.A)} highlight />
      </div>

      <p className="text-xs text-muted-foreground">
        Formula: A = P × (1 + r/n)<sup>n·t</sup> — where r is the annual rate as decimal, n is the compounding frequency per year, and t is years.
      </p>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-xl border ${highlight ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>
      <p className={`text-xs ${highlight ? "opacity-80" : "text-muted-foreground"}`}>{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}