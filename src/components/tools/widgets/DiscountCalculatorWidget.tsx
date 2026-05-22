import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DiscountCalculatorWidget() {
  const [price, setPrice] = useState("1999");
  const [discount, setDiscount] = useState("25");

  const r = useMemo(() => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (!p || isNaN(d)) return null;
    const save = (p * d) / 100;
    const final = p - save;
    return {
      save: save.toFixed(2),
      final: final.toFixed(2),
    };
  }, [price, discount]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Original Price (₹)</Label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
        <div><Label>Discount (%)</Label><Input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} /></div>
      </div>
      {r && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 border border-border rounded-xl p-4 text-center">
            <div className="text-xs text-muted-foreground">You Save</div>
            <div className="text-3xl font-bold text-red-600 mt-1">₹{r.save}</div>
          </div>
          <div className="bg-primary/10 border border-primary rounded-xl p-4 text-center">
            <div className="text-xs text-muted-foreground">Final Price</div>
            <div className="text-3xl font-bold text-primary mt-1">₹{r.final}</div>
          </div>
        </div>
      )}
    </div>
  );
}