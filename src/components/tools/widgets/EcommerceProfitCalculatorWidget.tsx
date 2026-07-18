import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type PlatformKey =
  | "amazon_fba"
  | "amazon_fbm"
  | "shopify"
  | "ebay"
  | "etsy"
  | "walmart"
  | "flipkart"
  | "meesho"
  | "custom";

interface Platform {
  label: string;
  feePct: number; // referral / commission
  paymentPct: number; // payment gateway
  paymentFixed: number;
  fulfillmentFlat: number; // shipping / pick-pack per unit
  monthlyFlat: number; // subscription
}

const PLATFORMS: Record<PlatformKey, Platform> = {
  amazon_fba: { label: "Amazon FBA (US)", feePct: 15, paymentPct: 0, paymentFixed: 0, fulfillmentFlat: 3.86, monthlyFlat: 39.99 },
  amazon_fbm: { label: "Amazon FBM (US)", feePct: 15, paymentPct: 0, paymentFixed: 0, fulfillmentFlat: 0, monthlyFlat: 39.99 },
  shopify: { label: "Shopify (Basic)", feePct: 0, paymentPct: 2.9, paymentFixed: 0.3, fulfillmentFlat: 0, monthlyFlat: 39 },
  ebay: { label: "eBay (US)", feePct: 13.25, paymentPct: 0, paymentFixed: 0.3, fulfillmentFlat: 0, monthlyFlat: 0 },
  etsy: { label: "Etsy", feePct: 6.5, paymentPct: 3, paymentFixed: 0.25, fulfillmentFlat: 0, monthlyFlat: 0 },
  walmart: { label: "Walmart Marketplace", feePct: 15, paymentPct: 0, paymentFixed: 0, fulfillmentFlat: 0, monthlyFlat: 0 },
  flipkart: { label: "Flipkart (IN)", feePct: 12, paymentPct: 2, paymentFixed: 0, fulfillmentFlat: 45, monthlyFlat: 0 },
  meesho: { label: "Meesho (IN)", feePct: 5, paymentPct: 1.8, paymentFixed: 0, fulfillmentFlat: 35, monthlyFlat: 0 },
  custom: { label: "Custom / Other", feePct: 10, paymentPct: 2.5, paymentFixed: 0.3, fulfillmentFlat: 0, monthlyFlat: 0 },
};

export default function EcommerceProfitCalculatorWidget() {
  const [platform, setPlatform] = useState<PlatformKey>("amazon_fba");
  const [currency, setCurrency] = useState("$");
  const [sellingPrice, setSellingPrice] = useState(29.99);
  const [productCost, setProductCost] = useState(8);
  const [shippingIn, setShippingIn] = useState(1.5);
  const [shippingOut, setShippingOut] = useState(4.99);
  const [shippingCharged, setShippingCharged] = useState(4.99);
  const [adsPerUnit, setAdsPerUnit] = useState(2);
  const [unitsPerMonth, setUnitsPerMonth] = useState(100);
  const [extraPctInput, setExtraPctInput] = useState(0);

  const p = PLATFORMS[platform];

  const result = useMemo(() => {
    const revenuePerUnit = sellingPrice + shippingCharged;
    const platformFee = (sellingPrice * p.feePct) / 100;
    const payment = (revenuePerUnit * p.paymentPct) / 100 + p.paymentFixed;
    const fulfillment = p.fulfillmentFlat;
    const extraPct = (sellingPrice * extraPctInput) / 100;
    const cogs = productCost + shippingIn;
    const variableCost = cogs + shippingOut + adsPerUnit + platformFee + payment + fulfillment + extraPct;
    const profitPerUnit = revenuePerUnit - variableCost;
    const margin = revenuePerUnit > 0 ? (profitPerUnit / revenuePerUnit) * 100 : 0;
    const roi = cogs > 0 ? (profitPerUnit / cogs) * 100 : 0;
    const breakEven = profitPerUnit > 0 ? Math.ceil(p.monthlyFlat / profitPerUnit) : Infinity;
    const monthlyProfit = profitPerUnit * unitsPerMonth - p.monthlyFlat;
    return { revenuePerUnit, platformFee, payment, fulfillment, extraPct, variableCost, profitPerUnit, margin, roi, breakEven, monthlyProfit };
  }, [sellingPrice, productCost, shippingIn, shippingOut, shippingCharged, adsPerUnit, unitsPerMonth, extraPctInput, p]);

  const fmt = (n: number) =>
    isFinite(n) ? `${currency}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—";

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Platform</Label>
            <Select value={platform} onValueChange={(v) => setPlatform(v as PlatformKey)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(PLATFORMS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="$">$ USD</SelectItem>
                <SelectItem value="£">£ GBP</SelectItem>
                <SelectItem value="€">€ EUR</SelectItem>
                <SelectItem value="₹">₹ INR</SelectItem>
                <SelectItem value="C$">C$ CAD</SelectItem>
                <SelectItem value="A$">A$ AUD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Field label={`Selling Price (${currency})`} value={sellingPrice} setValue={setSellingPrice} />
        <Field label={`Product Cost / COGS (${currency})`} value={productCost} setValue={setProductCost} />
        <Field label={`Inbound Shipping (${currency})`} value={shippingIn} setValue={setShippingIn} />
        <Field label={`Outbound Shipping You Pay (${currency})`} value={shippingOut} setValue={setShippingOut} />
        <Field label={`Shipping Charged to Buyer (${currency})`} value={shippingCharged} setValue={setShippingCharged} />
        <Field label={`Ads / PPC Per Unit (${currency})`} value={adsPerUnit} setValue={setAdsPerUnit} />
        <Field label="Units Sold Per Month" value={unitsPerMonth} setValue={setUnitsPerMonth} />
        <Field label="Other % Fees (tax, returns)" value={extraPctInput} setValue={setExtraPctInput} />
      </Card>

      <div className="space-y-3">
        <Card className={`p-5 border-2 ${result.profitPerUnit >= 0 ? "border-green-500/50 bg-green-500/5" : "border-red-500/50 bg-red-500/5"}`}>
          <p className="text-xs text-muted-foreground">Net Profit Per Unit</p>
          <p className={`text-3xl font-bold ${result.profitPerUnit >= 0 ? "text-green-600" : "text-red-600"}`}>{fmt(result.profitPerUnit)}</p>
          <div className="flex justify-between mt-2 text-sm">
            <span>Margin: <b>{result.margin.toFixed(1)}%</b></span>
            <span>ROI: <b>{result.roi.toFixed(1)}%</b></span>
          </div>
        </Card>

        <Card className="p-4 space-y-1.5 text-sm">
          <Row label="Revenue / unit" value={fmt(result.revenuePerUnit)} />
          <Row label={`${p.label} fee (${p.feePct}%)`} value={`−${fmt(result.platformFee)}`} red />
          <Row label="Payment processing" value={`−${fmt(result.payment)}`} red />
          <Row label="Fulfillment / FBA" value={`−${fmt(result.fulfillment)}`} red />
          {result.extraPct > 0 && <Row label="Other %" value={`−${fmt(result.extraPct)}`} red />}
          <Row label="Product + inbound" value={`−${fmt(productCost + shippingIn)}`} red />
          <Row label="Outbound shipping" value={`−${fmt(shippingOut)}`} red />
          <Row label="Ads / PPC" value={`−${fmt(adsPerUnit)}`} red />
          <div className="border-t pt-1.5 flex justify-between font-semibold">
            <span>Profit / unit</span>
            <span className={result.profitPerUnit >= 0 ? "text-green-600" : "text-red-600"}>{fmt(result.profitPerUnit)}</span>
          </div>
        </Card>

        <Card className="p-4 text-sm space-y-1.5">
          <Row label={`Monthly subscription (${p.label})`} value={fmt(p.monthlyFlat)} />
          <Row label={`Profit × ${unitsPerMonth} units`} value={fmt(result.profitPerUnit * unitsPerMonth)} />
          <div className="border-t pt-1.5 flex justify-between font-semibold">
            <span>Estimated monthly profit</span>
            <span className={result.monthlyProfit >= 0 ? "text-green-600" : "text-red-600"}>{fmt(result.monthlyProfit)}</span>
          </div>
          <Row label="Break-even units / month" value={isFinite(result.breakEven) ? `${result.breakEven} units` : "Not profitable"} />
        </Card>
      </div>
    </div>
  );
}

function Field({ label, value, setValue }: { label: string; value: number; setValue: (n: number) => void }) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <Input type="number" value={value} onChange={(e) => setValue(+e.target.value || 0)} min={0} step="0.01" />
    </div>
  );
}

function Row({ label, value, red }: { label: string; value: string; red?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={red ? "text-red-600" : ""}>{value}</span>
    </div>
  );
}