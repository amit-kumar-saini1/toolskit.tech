import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// FY 2025-26 New Tax Regime slabs
const NEW_SLABS: { upTo: number; rate: number }[] = [
  { upTo: 400000, rate: 0 },
  { upTo: 800000, rate: 0.05 },
  { upTo: 1200000, rate: 0.10 },
  { upTo: 1600000, rate: 0.15 },
  { upTo: 2000000, rate: 0.20 },
  { upTo: 2400000, rate: 0.25 },
  { upTo: Infinity, rate: 0.30 },
];

// FY 2025-26 Old Tax Regime slabs (under 60)
const OLD_SLABS: { upTo: number; rate: number }[] = [
  { upTo: 250000, rate: 0 },
  { upTo: 500000, rate: 0.05 },
  { upTo: 1000000, rate: 0.20 },
  { upTo: Infinity, rate: 0.30 },
];

function computeTax(taxable: number, slabs: { upTo: number; rate: number }[]) {
  let tax = 0;
  let last = 0;
  for (const s of slabs) {
    if (taxable > s.upTo) {
      tax += (s.upTo - last) * s.rate;
      last = s.upTo;
    } else {
      tax += (taxable - last) * s.rate;
      break;
    }
  }
  return Math.max(0, tax);
}

export default function IncomeTaxCalculatorWidget() {
  const [income, setIncome] = useState(1200000);
  const [deductions, setDeductions] = useState(150000);
  const [regime, setRegime] = useState<"new" | "old">("new");

  const result = useMemo(() => {
    const gross = Number(income) || 0;
    if (regime === "new") {
      const standardDed = 75000;
      const taxable = Math.max(0, gross - standardDed);
      // Sec 87A rebate up to ₹12L taxable income in new regime FY25-26
      let tax = computeTax(taxable, NEW_SLABS);
      if (taxable <= 1200000) tax = 0;
      const cess = tax * 0.04;
      return { taxable, tax, cess, total: tax + cess, takeHome: gross - tax - cess };
    } else {
      const standardDed = 50000;
      const taxable = Math.max(0, gross - standardDed - (Number(deductions) || 0));
      let tax = computeTax(taxable, OLD_SLABS);
      if (taxable <= 500000) tax = 0; // 87A rebate
      const cess = tax * 0.04;
      return { taxable, tax, cess, total: tax + cess, takeHome: gross - tax - cess };
    }
  }, [income, deductions, regime]);

  const fmt = (v: number) =>
    "₹" + Math.round(v).toLocaleString("en-IN");

  return (
    <div className="space-y-5">
      <div className="flex gap-2 rounded-lg bg-muted p-1">
        {(["new", "old"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRegime(r)}
            className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
              regime === r ? "bg-card shadow-sm" : "text-muted-foreground"
            }`}
          >
            {r === "new" ? "New Regime (FY 2025-26)" : "Old Regime"}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Annual Gross Income (₹)</Label>
        <Input
          type="number"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
          className="h-12 text-lg"
        />
      </div>

      {regime === "old" && (
        <div className="space-y-2">
          <Label>Total Deductions — 80C, 80D, HRA etc. (₹)</Label>
          <Input
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(parseFloat(e.target.value) || 0)}
            className="h-12 text-lg"
          />
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        <Row label="Taxable Income" value={fmt(result.taxable)} />
        <Row label="Income Tax" value={fmt(result.tax)} />
        <Row label="Health & Education Cess (4%)" value={fmt(result.cess)} />
        <Row label="Estimated Take-Home" value={fmt(result.takeHome)} />
      </div>

      <div className="p-4 rounded-xl bg-primary text-primary-foreground">
        <p className="text-xs uppercase opacity-80">Total Tax Payable</p>
        <p className="text-3xl font-bold">{fmt(result.total)}</p>
      </div>

      <p className="text-xs text-muted-foreground">
        Disclaimer: Estimates based on FY 2025-26 slabs. Standard deduction of
        ₹75,000 (new) / ₹50,000 (old) auto-applied for salaried individuals.
        Consult a CA for final figures.
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl border border-border bg-card">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}