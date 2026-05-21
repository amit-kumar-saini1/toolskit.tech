import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NpsCalculatorWidget() {
  const [monthly, setMonthly] = useState(5000);
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [rate, setRate] = useState(10);
  const [annuityPct, setAnnuityPct] = useState(40);
  const [annuityRate, setAnnuityRate] = useState(6);

  const result = useMemo(() => {
    const years = Math.max(0, Number(retireAge) - Number(age));
    const n = years * 12;
    const r = Number(rate) / 100 / 12;
    const M = Number(monthly) || 0;
    const corpus = n > 0 && r > 0 ? M * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) : M * n;
    const invested = M * n;
    const gains = corpus - invested;
    const annuityCorpus = (corpus * Number(annuityPct)) / 100;
    const lumpSum = corpus - annuityCorpus;
    const monthlyPension = (annuityCorpus * (Number(annuityRate) / 100)) / 12;
    return { corpus, invested, gains, annuityCorpus, lumpSum, monthlyPension, years };
  }, [monthly, age, retireAge, rate, annuityPct, annuityRate]);

  const fmt = (v: number) => "₹" + Math.round(v).toLocaleString("en-IN");

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Monthly Investment (₹)" value={monthly} set={setMonthly} />
        <Field label="Expected Return (% p.a.)" value={rate} set={setRate} step="0.1" />
        <Field label="Your Current Age" value={age} set={setAge} />
        <Field label="Retirement Age" value={retireAge} set={setRetireAge} />
        <Field label="Annuity Purchase (%)" value={annuityPct} set={setAnnuityPct} />
        <Field label="Annuity Return (% p.a.)" value={annuityRate} set={setAnnuityRate} step="0.1" />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Row label="Total Invested" value={fmt(result.invested)} />
        <Row label="Wealth Gained" value={fmt(result.gains)} />
        <Row label={`Maturity (in ${result.years} yrs)`} value={fmt(result.corpus)} highlight />
        <Row label="Lump Sum Withdrawal" value={fmt(result.lumpSum)} />
        <Row label="Annuity Corpus" value={fmt(result.annuityCorpus)} />
        <Row label="Monthly Pension" value={fmt(result.monthlyPension)} highlight />
      </div>

      <p className="text-xs text-muted-foreground">
        At retirement, NPS rules require at least 40% of the corpus to be used to buy an annuity (pension). The rest can be withdrawn tax-free as lump sum.
      </p>
    </div>
  );
}

function Field({ label, value, set, step }: { label: string; value: number; set: (n: number) => void; step?: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type="number" step={step} value={value} onChange={(e) => set(parseFloat(e.target.value) || 0)} className="h-12 text-lg" />
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