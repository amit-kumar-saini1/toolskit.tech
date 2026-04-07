import { useState, useMemo } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { toolsSEO } from "@/lib/seoData";
import FAQ from "@/components/FAQ";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DollarSign, TrendingUp, ShoppingBag, Percent, Info } from "lucide-react";

interface CurrencyConfig {
  symbol: string;
  processingRate: number;
  processingFixed: number;
  listingFee: number;
}

const currencies: Record<string, CurrencyConfig> = {
  USD: { symbol: "$", processingRate: 0.03, processingFixed: 0.25, listingFee: 0.20 },
  GBP: { symbol: "£", processingRate: 0.04, processingFixed: 0.20, listingFee: 0.15 },
  EUR: { symbol: "€", processingRate: 0.04, processingFixed: 0.30, listingFee: 0.17 },
  CAD: { symbol: "C$", processingRate: 0.03, processingFixed: 0.25, listingFee: 0.27 },
  AUD: { symbol: "A$", processingRate: 0.04, processingFixed: 0.25, listingFee: 0.30 },
  INR: { symbol: "₹", processingRate: 0.0345, processingFixed: 7, listingFee: 15 },
};

const TRANSACTION_FEE_RATE = 0.065;
const OFFSITE_ADS_RATE = 0.15;

const quickPrices = [10, 25, 50, 100, 250, 500];

const EtsyFeeCalculator = () => {
  const seo = toolsSEO["etsy-fee-calculator"];
  const [currency, setCurrency] = useState("USD");
  const [itemPrice, setItemPrice] = useState(25);
  const [shippingCharge, setShippingCharge] = useState(5);
  const [itemCost, setItemCost] = useState(8);
  const [quantity, setQuantity] = useState(1);
  const [offsiteAds, setOffsiteAds] = useState(false);

  const config = currencies[currency];

  const fees = useMemo(() => {
    const saleTotal = (itemPrice + shippingCharge) * quantity;
    const listingFee = config.listingFee * quantity;
    const transactionFee = saleTotal * TRANSACTION_FEE_RATE;
    const processingFee = saleTotal * config.processingRate + config.processingFixed;
    const adsFee = offsiteAds ? saleTotal * OFFSITE_ADS_RATE : 0;
    const totalFees = listingFee + transactionFee + processingFee + adsFee;
    const totalCost = itemCost * quantity;
    const revenue = saleTotal;
    const profit = revenue - totalFees - totalCost;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

    return { saleTotal, listingFee, transactionFee, processingFee, adsFee, totalFees, totalCost, revenue, profit, margin };
  }, [itemPrice, shippingCharge, itemCost, quantity, offsiteAds, config]);

  const fmt = (n: number) => `${config.symbol}${n.toFixed(2)}`;

  return (
    <ToolLayout
      title={seo.h1Title}
      description={seo.description}
      icon={ShoppingBag}
    >
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="breakdown">Fee Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Inputs */}
            <Card className="p-6 space-y-5">
              <div>
                <Label className="text-sm font-medium mb-2 block">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(currencies).map(([code, c]) => (
                      <SelectItem key={code} value={code}>{c.symbol} {code}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1 block">Item Price ({config.symbol})</Label>
                <Slider value={[itemPrice]} onValueChange={([v]) => setItemPrice(v)} min={1} max={1000} step={1} className="mb-2" />
                <Input type="number" value={itemPrice} onChange={e => setItemPrice(+e.target.value || 0)} min={0} />
              </div>

              <div>
                <Label className="text-sm font-medium mb-1 block">Shipping Charge ({config.symbol})</Label>
                <Input type="number" value={shippingCharge} onChange={e => setShippingCharge(+e.target.value || 0)} min={0} />
              </div>

              <div>
                <Label className="text-sm font-medium mb-1 block">Item Cost / COGS ({config.symbol})</Label>
                <Input type="number" value={itemCost} onChange={e => setItemCost(+e.target.value || 0)} min={0} />
              </div>

              <div>
                <Label className="text-sm font-medium mb-1 block">Quantity</Label>
                <Input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, +e.target.value || 1))} min={1} />
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <Label className="text-sm font-medium">Offsite Ads (15%)</Label>
                  <p className="text-xs text-muted-foreground">For shops earning &lt; $10K/year</p>
                </div>
                <Switch checked={offsiteAds} onCheckedChange={setOffsiteAds} />
              </div>
            </Card>

            {/* Results */}
            <div className="space-y-4">
              {/* Profit highlight */}
              <Card className={`p-6 border-2 ${fees.profit >= 0 ? "border-green-500/50 bg-green-500/5" : "border-red-500/50 bg-red-500/5"}`}>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Net Profit</p>
                  <p className={`text-4xl font-bold ${fees.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {fmt(fees.profit)}
                  </p>
                  <p className="text-sm mt-1 text-muted-foreground">
                    Margin: <span className={`font-semibold ${fees.margin >= 0 ? "text-green-500" : "text-red-500"}`}>{fees.margin.toFixed(1)}%</span>
                  </p>
                </div>
              </Card>

              {/* Fee cards */}
              <div className="grid grid-cols-2 gap-3">
                <FeeCard icon={<ShoppingBag className="w-4 h-4" />} label="Listing Fee" value={fmt(fees.listingFee)} color="text-blue-500" />
                <FeeCard icon={<Percent className="w-4 h-4" />} label="Transaction Fee (6.5%)" value={fmt(fees.transactionFee)} color="text-orange-500" />
                <FeeCard icon={<DollarSign className="w-4 h-4" />} label="Processing Fee" value={fmt(fees.processingFee)} color="text-purple-500" />
                <FeeCard icon={<TrendingUp className="w-4 h-4" />} label="Offsite Ads" value={offsiteAds ? fmt(fees.adsFee) : "—"} color="text-pink-500" />
              </div>

              <Card className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Revenue</span><span className="font-medium">{fmt(fees.revenue)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Etsy Fees</span><span className="font-medium text-red-500">−{fmt(fees.totalFees)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Item Cost</span><span className="font-medium text-red-500">−{fmt(fees.totalCost)}</span></div>
                  <div className="flex justify-between border-t pt-2"><span className="font-semibold">Net Profit</span><span className={`font-bold ${fees.profit >= 0 ? "text-green-500" : "text-red-500"}`}>{fmt(fees.profit)}</span></div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="breakdown">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Fee Reference ({currency})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 pr-4">Price</th>
                    <th className="pb-2 pr-4">Listing</th>
                    <th className="pb-2 pr-4">Transaction</th>
                    <th className="pb-2 pr-4">Processing</th>
                    <th className="pb-2 pr-4">Total Fees</th>
                    <th className="pb-2">You Keep</th>
                  </tr>
                </thead>
                <tbody>
                  {quickPrices.map(price => {
                    const listing = config.listingFee;
                    const transaction = price * TRANSACTION_FEE_RATE;
                    const processing = price * config.processingRate + config.processingFixed;
                    const total = listing + transaction + processing;
                    return (
                      <tr key={price} className="border-b last:border-0">
                        <td className="py-2 pr-4 font-medium">{config.symbol}{price}</td>
                        <td className="py-2 pr-4">{fmt(listing)}</td>
                        <td className="py-2 pr-4">{fmt(transaction)}</td>
                        <td className="py-2 pr-4">{fmt(processing)}</td>
                        <td className="py-2 pr-4 text-red-500">{fmt(total)}</td>
                        <td className="py-2 font-semibold text-green-500">{fmt(price - total)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold">Etsy Fee Structure (2026)</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <InfoCard title="Listing Fee" desc={`${config.symbol}${config.listingFee.toFixed(2)} per listing. Renews every 4 months or when item sells.`} />
                <InfoCard title="Transaction Fee" desc="6.5% of the total sale price including shipping. Applied to every sale." />
                <InfoCard title="Payment Processing" desc={`${(config.processingRate * 100).toFixed(1)}% + ${config.symbol}${config.processingFixed.toFixed(2)} per transaction. Varies by country.`} />
                <InfoCard title="Offsite Ads" desc="15% fee when a buyer clicks an Etsy offsite ad and purchases within 30 days. Mandatory for shops with $10K+ annual revenue (12%)." />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

    </ToolLayout>
  );
};

const FeeCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) => (
  <Card className="p-3">
    <div className="flex items-center gap-2 mb-1">
      <span className={color}>{icon}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <p className="text-lg font-bold">{value}</p>
  </Card>
);

const InfoCard = ({ title, desc }: { title: string; desc: string }) => (
  <Card className="p-4">
    <div className="flex items-start gap-2">
      <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      </div>
    </div>
  </Card>
);

export default EtsyFeeCalculator;
