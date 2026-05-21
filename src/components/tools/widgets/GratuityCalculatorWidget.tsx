import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GratuityCalculatorWidget() {
  const [basic, setBasic] = useState(50000);
  const [da, setDa] = useState(0);
  const [years, setYears] = useState(10);
  const [covered, setCovered] = useState(true);

  const result = useMemo(() => {
    const salary = (Number(basic) || 0) + (Number(da) || 0);
    const y = Number(years) || 0;
    let gratuity = 0;
    let eligible = false;
    if (covered) {
      // Payment of Gratuity Act: (15/26) × last salary × years
      eligible = y >= 5;
      const yrs = Math.round(y); // act rounds 6+ months as full year
      gratuity = eligible ? (15 / 26) * salary * yrs : 0;
    } else {
      // Non-covered: (15/30) × avg salary × completed years
      eligible = y >= 5;
      const yrs = Math.floor(y);
      gratuity = eligible ? (15 / 30) * salary * yrs : 0;
    }
    const taxFree = Math.min(gratuity, 2000000);
    return { gratuity, eligible, taxFree, taxable: Math.max(0, gratuity - taxFree) };
  }, [basic, da, years, covered]);

  const fmt = (v: number) => "₹" + Math.round(v).toLocaleString("en-IN");

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Last Basic Salary (monthly)</Label>
          <Input type="number" value={basic} onChange={(e) => setBasic(parseFloat(e.target.value) || 0)} className="h-12 text-lg" />
        </div>
        <div className="space-y-2">
          <Label>Dearness Allowance (monthly)</Label>
          <Input type="number" value={da} onChange={(e) => setDa(parseFloat(e.target.value) || 0)} className="h-12 text-lg" />
        </div>
        <div className="space-y-2">
          <Label>Years of Service</Label>
          <Input type="number" step="0.5" value={years} onChange={(e) => setYears(parseFloat(e.target.value) || 0)} className="h-12 text-lg" />
        </div>
        <div className="space-y-2">
          <Label>Employer Type</Label>
          <div className="flex gap-2 rounded-lg bg-muted p-1">
            {[
              { v: true, l: "Covered by Act" },
              { v: false, l: "Not Covered" },
            ].map((o) => (
              <button
                key={String(o.v)}
                onClick={() => setCovered(o.v)}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
                  covered === o.v ? "bg-card shadow-sm" : "text-muted-foreground"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!result.eligible && (
        <div className="p-3 rounded-lg border border-border bg-muted text-sm">
          You need at least <b>5 years</b> of continuous service to be eligible for gratuity.
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-3">
        <Row label="Total Gratuity" value={fmt(result.gratuity)} highlight />
        <Row label="Tax-Free (max ₹20L)" value={fmt(result.taxFree)} />
        <Row label="Taxable Portion" value={fmt(result.taxable)} />
      </div>

      <p className="text-xs text-muted-foreground">
        Formula (covered): Gratuity = (15 / 26) × Last drawn (Basic + DA) × Years of service. The maximum tax-free gratuity under the Payment of Gratuity Act is ₹20,00,000.
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