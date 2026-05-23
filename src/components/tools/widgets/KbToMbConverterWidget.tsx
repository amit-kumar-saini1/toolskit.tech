import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Unit = "B" | "KB" | "MB" | "GB" | "TB";
const FACTORS: Record<Unit, number> = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 };

function fmt(n: number) {
  if (!isFinite(n)) return "0";
  if (n === 0) return "0";
  if (n < 0.0001) return n.toExponential(4);
  return n.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export default function KbToMbConverterWidget() {
  const [value, setValue] = useState("1024");
  const [from, setFrom] = useState<Unit>("KB");

  const num = parseFloat(value) || 0;
  const bytes = num * FACTORS[from];

  const results = useMemo(
    () => (["B", "KB", "MB", "GB", "TB"] as Unit[]).map((u) => ({ u, v: bytes / FACTORS[u] })),
    [bytes],
  );

  const Pill = ({ u }: { u: Unit }) => (
    <Button
      type="button"
      variant={from === u ? "gradient" : "outline"}
      size="sm"
      onClick={() => setFrom(u)}
    >
      {u}
    </Button>
  );

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="kb-input">Enter value</Label>
        <Input
          id="kb-input"
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-12 text-lg"
          placeholder="e.g. 1024"
        />
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-sm text-muted-foreground mr-2 self-center">From:</span>
          {(["B", "KB", "MB", "GB", "TB"] as Unit[]).map((u) => (
            <Pill key={u} u={u} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {results.map((r) => (
          <div
            key={r.u}
            className={`rounded-xl border p-3 text-center ${
              from === r.u ? "border-primary bg-primary/5" : "border-border bg-card"
            }`}
          >
            <div className="text-xs text-muted-foreground">{r.u}</div>
            <div className="font-semibold text-foreground break-all">{fmt(r.v)}</div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Uses binary units (1 KB = 1024 B), the standard for file size on Windows, Linux and macOS finder.
      </p>
    </div>
  );
}