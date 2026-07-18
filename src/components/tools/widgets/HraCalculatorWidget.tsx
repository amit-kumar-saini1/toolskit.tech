import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HraCalculatorWidget() {
  const [basic, setBasic] = useState(50000);
  const [da, setDa] = useState(0);
  const [hra, setHra] = useState(20000);
  const [rent, setRent] = useState(18000);
  const [metro, setMetro] = useState(true);

  const result = useMemo(() => {
    const salary = (Number(basic) + Number(da)) * 12;
    const hraReceived = Number(hra) * 12;
    const rentPaid = Number(rent) * 12;
    const a = hraReceived;
    const b = (metro ? 0.5 : 0.4) * salary;
    const c = Math.max(0, rentPaid - 0.1 * salary);
    const exempt = Math.max(0, Math.min(a, b, c));
    const taxable = Math.max(0, hraReceived - exempt);
    return { a, b, c, exempt, taxable, hraReceived };
  }, [basic, da, hra, rent, metro]);

  const fmt = (v: number) =>
    "₹" + Math.round(v).toLocaleString("en-IN");

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Basic Salary (monthly)" value={basic} onChange={setBasic} />
        <Field label="Dearness Allowance (monthly)" value={da} onChange={setDa} />
        <Field label="HRA Received (monthly)" value={hra} onChange={setHra} />
        <Field label="Rent Paid (monthly)" value={rent} onChange={setRent} />
      </div>

      <div className="flex gap-2 rounded-lg bg-muted p-1">
        {[
          { v: true, l: "Metro City (50%)" },
          { v: false, l: "Non-Metro (40%)" },
        ].map((o) => (
          <button
            key={String(o.v)}
            onClick={() => setMetro(o.v)}
            className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
              metro === o.v ? "bg-card shadow-sm" : "text-muted-foreground"
            }`}
          >
            {o.l}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Row label="Actual HRA Received" value={fmt(result.a)} />
        <Row label={metro ? "50% of (Basic+DA)" : "40% of (Basic+DA)"} value={fmt(result.b)} />
        <Row label="Rent − 10% of Salary" value={fmt(result.c)} />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-primary text-primary-foreground">
          <p className="text-xs uppercase opacity-80">HRA Exempt (Tax-Free)</p>
          <p className="text-3xl font-bold">{fmt(result.exempt)}</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-xs uppercase text-muted-foreground">Taxable HRA</p>
          <p className="text-3xl font-bold">{fmt(result.taxable)}</p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label} (₹)</Label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="h-12 text-lg"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl border border-border bg-card">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}