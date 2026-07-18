import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TipCalculatorWidget() {
  const [bill, setBill] = useState(1000);
  const [tipPct, setTipPct] = useState(15);
  const [people, setPeople] = useState(2);

  const { tip, total, perPerson, tipPerPerson } = useMemo(() => {
    const b = Number(bill) || 0;
    const t = (b * Number(tipPct)) / 100;
    const tot = b + t;
    const p = Math.max(1, Number(people) || 1);
    return { tip: t, total: tot, perPerson: tot / p, tipPerPerson: t / p };
  }, [bill, tipPct, people]);

  const fmt = (v: number) =>
    "₹" + v.toLocaleString("en-IN", { maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Bill Amount</Label>
          <Input type="number" value={bill} onChange={(e) => setBill(parseFloat(e.target.value) || 0)} className="h-12 text-lg" />
        </div>
        <div className="space-y-2">
          <Label>Number of People</Label>
          <Input type="number" min={1} value={people} onChange={(e) => setPeople(parseInt(e.target.value) || 1)} className="h-12 text-lg" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tip Percentage: {tipPct}%</Label>
        <input type="range" min={0} max={30} step={1} value={tipPct} onChange={(e) => setTipPct(parseInt(e.target.value))} className="w-full" />
        <div className="flex flex-wrap gap-2">
          {[10, 12, 15, 18, 20, 25].map((p) => (
            <button key={p} onClick={() => setTipPct(p)} className={`px-3 py-1.5 rounded-lg border text-sm font-semibold ${tipPct === p ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>{p}%</button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Row label="Tip Amount" value={fmt(tip)} />
        <Row label="Total Bill" value={fmt(total)} />
        <Row label="Tip per Person" value={fmt(tipPerPerson)} />
        <Row label="Total per Person" value={fmt(perPerson)} highlight />
      </div>
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