import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RATES = [0, 3, 5, 12, 18, 28];

export default function GstCalculatorWidget() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<"add" | "remove">("add");

  const { gst, net, gross, cgst } = useMemo(() => {
    const a = Number(amount) || 0;
    const r = Number(rate) || 0;
    let n: number, g: number, t: number;
    if (mode === "add") {
      n = a;
      t = (a * r) / 100;
      g = a + t;
    } else {
      g = a;
      n = (a * 100) / (100 + r);
      t = g - n;
    }
    return { net: n, gst: t, gross: g, cgst: t / 2 };
  }, [amount, rate, mode]);

  const fmt = (v: number) =>
    "₹" + v.toLocaleString("en-IN", { maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Amount (₹)</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="h-12 text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label>GST Rate (%)</Label>
          <div className="flex flex-wrap gap-2">
            {RATES.map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={`px-3 h-12 rounded-lg border text-sm font-semibold transition-colors ${
                  rate === r
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary"
                }`}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 rounded-lg bg-muted p-1">
        {(["add", "remove"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
              mode === m ? "bg-card shadow-sm" : "text-muted-foreground"
            }`}
          >
            {m === "add" ? "Add GST" : "Remove GST"}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Row label="Net Amount" value={fmt(net)} />
        <Row label={`GST @ ${rate}%`} value={fmt(gst)} />
        <Row label="CGST" value={fmt(cgst)} />
        <Row label="SGST" value={fmt(cgst)} />
        <div className="sm:col-span-2 p-4 rounded-xl bg-primary text-primary-foreground">
          <p className="text-xs uppercase opacity-80">Gross / Total</p>
          <p className="text-3xl font-bold">{fmt(gross)}</p>
        </div>
      </div>
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
